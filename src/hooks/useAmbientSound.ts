import { useCallback, useEffect, useRef, useState } from 'react'

const AMBIENT_GAIN = 0.035
const FADE_SECONDS = 0.6

/**
 * Drives the header "Focus Sound" toggle with a softly filtered noise pad
 * generated through the Web Audio API, so the control has real behavior
 * without shipping an audio asset. The context is created lazily on first
 * enable and fully torn down when toggled off or unmounted.
 */
export function useAmbientSound(): { enabled: boolean; toggle: () => void } {
  const [enabled, setEnabled] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{ source: AudioBufferSourceNode; gain: GainNode } | null>(null)

  const stop = useCallback(() => {
    const nodes = nodesRef.current
    const context = contextRef.current
    if (nodes && context) {
      const now = context.currentTime
      nodes.gain.gain.cancelScheduledValues(now)
      nodes.gain.gain.setValueAtTime(nodes.gain.gain.value, now)
      nodes.gain.gain.linearRampToValueAtTime(0, now + FADE_SECONDS)
      nodes.source.stop(now + FADE_SECONDS)
    }
    nodesRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      stop()
      const context = contextRef.current
      contextRef.current = null
      if (context) void context.close()
    }
  }, [stop])

  const toggle = useCallback(() => {
    if (enabled) {
      stop()
      setEnabled(false)
      return
    }

    try {
      const AudioContextCtor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextCtor) return

      const context = contextRef.current ?? new AudioContextCtor()
      contextRef.current = context
      void context.resume()

      const bufferSize = context.sampleRate * 2
      const buffer = context.createBuffer(1, bufferSize, context.sampleRate)
      const channel = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i += 1) {
        channel[i] = Math.random() * 2 - 1
      }

      const source = context.createBufferSource()
      source.buffer = buffer
      source.loop = true

      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 420

      const gain = context.createGain()
      gain.gain.setValueAtTime(0, context.currentTime)
      gain.gain.linearRampToValueAtTime(AMBIENT_GAIN, context.currentTime + FADE_SECONDS)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)
      source.start()

      nodesRef.current = { source, gain }
      setEnabled(true)
    } catch {
      setEnabled(false)
    }
  }, [enabled, stop])

  return { enabled, toggle }
}
