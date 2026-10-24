import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'
import { MaterialIcon } from '../common/MaterialIcon'

type SceneMaterial = THREE.MeshPhongMaterial | THREE.MeshBasicMaterial

interface FloatTarget {
  x: number
  y: number
  z: number
}

interface FloatObject {
  mesh: THREE.Object3D
  rotSpeed: FloatTarget
  floatSpeed: number
  offset: number
  basePos: FloatTarget
}

const DOCK_BUTTON_CLASS =
  'px-space-sm py-1 rounded-full text-label-sm font-label-sm text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1'

/**
 * The hero's interactive "Floating Learning Sculpture & Particle Nebula",
 * ported from the original ANIMATION_5 scene into a lifecycle-managed React
 * component: geometry/material/texture disposal, rAF cancellation, listener
 * cleanup, visibility pausing, DPR limiting, mobile cost reduction, WebGL
 * failure fallback and reduced-motion support.
 */
export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<SceneMaterial[]>([])
  const resetPivotRef = useRef<() => void>(() => { })
  const [webglFailed, setWebglFailed] = useState(false)
  const [wireframe, setWireframe] = useState(false)

  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 1023px)')

  // Keep the latest wireframe flag reachable by the scene-building effect
  // without adding it to that effect's dependencies.
  const wireframeRef = useRef(wireframe)
  useEffect(() => {
    wireframeRef.current = wireframe
    for (const material of materialsRef.current) {
      material.wireframe = wireframe
    }
  }, [wireframe])

  useEffect(() => {
    if (webglFailed) return

    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // Deferred so a synchronous WebGL failure does not cascade renders
      // directly inside the effect.
      queueMicrotask(() => setWebglFailed(true))
      return
    }

    const textures: THREE.Texture[] = []
    const materials: SceneMaterial[] = []
    const trackMaterial = <T extends SceneMaterial>(material: T): T => {
      materials.push(material)
      return material
    }

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    // Lighting setup — warm sunlight + cool fill + ambient.
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xff5733, 2.2)
    dirLight.position.set(6, 8, 6)
    scene.add(dirLight)

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.6)
    blueRimLight.position.set(-6, -4, -3)
    scene.add(blueRimLight)

    const pointLight = new THREE.PointLight(0xfbbf24, 2.5, 12)
    pointLight.position.set(0, 1, 2)
    scene.add(pointLight)

    // Master interactive group.
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    const floatObjects: FloatObject[] = []

    // 1. Floating Open Book / Portal of Curiosity.
    const bookGroup = new THREE.Group()
    const coverMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({ color: 0xff5733, shininess: 90, specular: 0xffaa88 }),
    )
    const leftCover = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.3, 0.08), coverMaterial)
    leftCover.position.set(-0.43, 0, 0.08)
    leftCover.rotation.y = 0.35
    bookGroup.add(leftCover)

    const rightCover = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.3, 0.08), coverMaterial)
    rightCover.position.set(0.43, 0, 0.08)
    rightCover.rotation.y = -0.35
    bookGroup.add(rightCover)

    const pageMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({ color: 0xfdfaf3, shininess: 30 }),
    )
    const pageGeometry = new THREE.BoxGeometry(0.8, 1.25, 0.015)
    for (let i = 0; i < 5; i += 1) {
      const angle = (i / 4 - 0.5) * 0.5

      const leftPage = new THREE.Mesh(pageGeometry, pageMaterial)
      leftPage.position.set(-0.4, 0, 0.03 + i * 0.01)
      leftPage.rotation.y = 0.28 + angle * 0.3
      bookGroup.add(leftPage)

      const rightPage = new THREE.Mesh(pageGeometry, pageMaterial)
      rightPage.position.set(0.4, 0, 0.03 + i * 0.01)
      rightPage.rotation.y = -0.28 - angle * 0.3
      bookGroup.add(rightPage)
    }

    bookGroup.position.set(-1.1, 0.5, 0.6)
    bookGroup.rotation.set(0.2, 0.4, -0.15)
    masterGroup.add(bookGroup)
    floatObjects.push({
      mesh: bookGroup,
      rotSpeed: { x: 0.005, y: 0.008, z: 0.003 },
      floatSpeed: 1.6,
      offset: 0,
      basePos: { x: -1.1, y: 0.5, z: 0.6 },
    })

    // 2. Crystalline Discovery Prism with glowing golden core.
    const prismGroup = new THREE.Group()
    const prismMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
        shininess: 100,
        transparent: true,
        opacity: 0.88,
        flatShading: true,
      }),
    )
    prismGroup.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), prismMaterial))

    const coreMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({ color: 0xfef08a, wireframe: true }),
    )
    prismGroup.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), coreMaterial))

    prismGroup.position.set(1.5, 0.8, 0.4)
    prismGroup.rotation.set(-0.3, 0.5, 0.2)
    masterGroup.add(prismGroup)
    floatObjects.push({
      mesh: prismGroup,
      rotSpeed: { x: -0.009, y: 0.014, z: 0.006 },
      floatSpeed: 2.1,
      offset: 1.8,
      basePos: { x: 1.5, y: 0.8, z: 0.4 },
    })

    // 3. Golden Spark of Mastery with orbiting halo.
    const sparkGroup = new THREE.Group()
    const starMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.5,
        shininess: 95,
      }),
    )
    sparkGroup.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), starMaterial))

    const haloMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.75 }),
    )
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.03, 16, 40), haloMaterial)
    halo.rotation.x = Math.PI / 2.5
    sparkGroup.add(halo)

    sparkGroup.position.set(1.6, -1.2, 0.8)
    masterGroup.add(sparkGroup)
    floatObjects.push({
      mesh: sparkGroup,
      rotSpeed: { x: 0.015, y: 0.022, z: -0.01 },
      floatSpeed: 2.4,
      offset: 3.2,
      basePos: { x: 1.6, y: -1.2, z: 0.8 },
    })

    // 4. Stylus / Creative Wand.
    const stylusGroup = new THREE.Group()
    const shaftMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({ color: 0x1e293b, shininess: 80 }),
    )
    stylusGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8), shaftMaterial))

    const nibMaterial = trackMaterial(new THREE.MeshPhongMaterial({ color: 0xff5733, shininess: 100 }))
    const nib = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 8), nibMaterial)
    nib.position.y = 1.05
    stylusGroup.add(nib)

    const capMaterial = trackMaterial(new THREE.MeshPhongMaterial({ color: 0xfbbf24, shininess: 100 }))
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.3, 8), capMaterial)
    cap.position.y = -0.8
    stylusGroup.add(cap)

    stylusGroup.position.set(-1.6, -1.1, 0.3)
    stylusGroup.rotation.set(0.6, -0.4, 0.8)
    masterGroup.add(stylusGroup)
    floatObjects.push({
      mesh: stylusGroup,
      rotSpeed: { x: 0.01, y: -0.015, z: 0.007 },
      floatSpeed: 1.8,
      offset: 4.5,
      basePos: { x: -1.6, y: -1.1, z: 0.3 },
    })

    // 5. Gyroscopic Continuum Torus Rings.
    const gyroGroup = new THREE.Group()
    const ringOneMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({ color: 0x10b981, shininess: 80 }),
    )
    gyroGroup.add(new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.04, 16, 50), ringOneMaterial))

    const ringTwoMaterial = trackMaterial(
      new THREE.MeshPhongMaterial({ color: 0x6366f1, shininess: 80 }),
    )
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.035, 16, 40), ringTwoMaterial)
    ringTwo.rotation.x = Math.PI / 3
    gyroGroup.add(ringTwo)

    gyroGroup.position.set(0.1, -1.8, -0.5)
    masterGroup.add(gyroGroup)
    floatObjects.push({
      mesh: gyroGroup,
      rotSpeed: { x: 0.012, y: 0.018, z: 0.014 },
      floatSpeed: 1.9,
      offset: 2.1,
      basePos: { x: 0.1, y: -1.8, z: -0.5 },
    })

    // Vibrant ambient particle constellation (reduced count on mobile).
    const particleCount = isMobile ? 70 : 140
    const partPositions = new Float32Array(particleCount * 3)
    const partColors = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color(0xff5733),
      new THREE.Color(0xfbbf24),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x10b981),
      new THREE.Color(0xa855f7),
    ]

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3
      partPositions[i3] = (Math.random() - 0.5) * 14
      partPositions[i3 + 1] = (Math.random() - 0.5) * 12
      partPositions[i3 + 2] = (Math.random() - 0.5) * 7 - 0.5

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      partColors[i3] = color.r
      partColors[i3 + 1] = color.g
      partColors[i3 + 2] = color.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(partPositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(partColors, 3))

    // Soft circular glow sprite canvas.
    const spriteCanvas = document.createElement('canvas')
    spriteCanvas.width = 64
    spriteCanvas.height = 64
    const spriteContext = spriteCanvas.getContext('2d')
    let particleMaterial: THREE.PointsMaterial
    if (spriteContext) {
      const gradient = spriteContext.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.6)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      spriteContext.fillStyle = gradient
      spriteContext.beginPath()
      spriteContext.arc(32, 32, 32, 0, Math.PI * 2)
      spriteContext.fill()

      const spriteTexture = new THREE.CanvasTexture(spriteCanvas)
      textures.push(spriteTexture)
      particleMaterial = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        map: spriteTexture,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      })
    } else {
      particleMaterial = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      })
    }

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    materialsRef.current = materials
    for (const material of materials) {
      material.wireframe = wireframeRef.current
    }

    // Smooth pointer physics.
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handlePointer = (event: PointerEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2
    }

    // Reset Pivot: ease the pointer-driven orientation back to the default.
    resetPivotRef.current = () => {
      targetMouseX = 0
      targetMouseY = 0
      if (reducedMotion) {
        masterGroup.rotation.set(0, 0, 0)
        masterGroup.position.set(0, 0, 0)
        renderer.render(scene, camera)
      }
    }

    // Animation loop — kept entirely outside React's render cycle.
    const clock = new THREE.Clock()
    let rafId = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Damped pointer follow.
      mouseX += (targetMouseX - mouseX) * 0.055
      mouseY += (targetMouseY - mouseY) * 0.055

      masterGroup.rotation.y = mouseX * 0.55
      masterGroup.rotation.x = -mouseY * 0.4
      masterGroup.position.x = mouseX * 0.25
      masterGroup.position.y = -mouseY * 0.2

      for (const object of floatObjects) {
        object.mesh.rotation.x += object.rotSpeed.x
        object.mesh.rotation.y += object.rotSpeed.y
        object.mesh.rotation.z += object.rotSpeed.z
        object.mesh.position.y =
          object.basePos.y + Math.sin(elapsedTime * object.floatSpeed + object.offset) * 0.12
      }

      particleSystem.rotation.y = elapsedTime * 0.025
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08

      renderer.render(scene, camera)
    }

    const startLoop = () => {
      if (rafId === 0) rafId = requestAnimationFrame(animate)
    }
    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop()
      else startLoop()
    }

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reducedMotion) renderer.render(scene, camera)
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      stopLoop()
      setWebglFailed(true)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    if (reducedMotion) {
      renderer.render(scene, camera)
    } else {
      window.addEventListener('pointermove', handlePointer, { passive: true })
      document.addEventListener('visibilitychange', handleVisibilityChange)
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost)
      startLoop()
    }

    return () => {
      stopLoop()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost)

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          const { material } = object
          if (Array.isArray(material)) {
            for (const entry of material) entry.dispose()
          } else {
            material.dispose()
          }
        }
      })
      for (const texture of textures) texture.dispose()

      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }

      materialsRef.current = []
      resetPivotRef.current = () => { }
    }
  }, [isMobile, reducedMotion, webglFailed])

  return (
    <>
      {webglFailed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_72%_32%,rgba(255,87,51,0.18),transparent_55%),radial-gradient(circle_at_28%_72%,rgba(253,195,80,0.16),transparent_55%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.12),transparent_50%)]"
        />
      ) : (
        <div
          ref={containerRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
        />
      )}

      {!webglFailed ? (
        <div
          role="group"
          aria-label="3D scene controls"
          className="absolute bottom-space-lg right-margin-lg hidden lg:flex items-center gap-space-xs p-space-xs bg-surface-container-lowest/80 backdrop-blur-md rounded-full shadow-md z-20"
        >
          <button
            type="button"
            aria-pressed={wireframe}
            onClick={() => setWireframe((current) => !current)}
            className={cn(DOCK_BUTTON_CLASS, wireframe && 'bg-primary-container text-on-primary')}
          >
            <MaterialIcon name="grid_4x4" className="text-[14px]" />
            Wireframe
          </button>
          <button
            type="button"
            onClick={() => resetPivotRef.current()}
            className={DOCK_BUTTON_CLASS}
          >
            <MaterialIcon name="restart_alt" className="text-[14px]" />
            Reset Pivot
          </button>
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse mx-1"
          />
          <span className="text-label-sm font-label-sm text-on-surface-variant pr-space-xs">
            Interactive Orbit
          </span>
        </div>
      ) : null}
    </>
  )
}
