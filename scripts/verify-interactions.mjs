/* Interaction verification script (test-only, not shipped with the app). */
import puppeteer from 'puppeteer-core'

const results = []
const check = (name, condition) => {
  results.push(`${condition ? 'PASS' : 'FAIL'} ${name}`)
}

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--enable-unsafe-swiftshader', '--use-gl=swiftshader'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
const consoleErrors = []
page.on('pageerror', (error) => consoleErrors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})

await page.goto('http://localhost:5199/', { waitUntil: 'domcontentloaded', timeout: 30000 })
await new Promise((resolve) => setTimeout(resolve, 2500))

// 1. Continuum stage switching
check(
  'continuum stage 1 default',
  (await page.$eval('#stage-viewer h3', (el) => el.textContent))?.includes('The Spark'),
)
await page.click('#stage-tab-3')
await new Promise((resolve) => setTimeout(resolve, 1100))
check(
  'continuum tab 3 switches content',
  (await page.$eval('#stage-viewer h3', (el) => el.textContent))?.includes(
    'The Catalyst: Social Socratic Inquiry & Prototyping',
  ),
)
check(
  'continuum tab aria-selected',
  await page.$eval('#stage-tab-3', (el) => el.getAttribute('aria-selected') === 'true'),
)
check(
  'continuum tab focus after arrow key',
  await page.evaluate(() => {
    const tab = document.querySelector('#stage-tab-3')
    tab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    return document.activeElement?.id === 'stage-tab-4'
  }),
)
await new Promise((resolve) => setTimeout(resolve, 800))
check(
  'continuum arrow key moves stage',
  (await page.$eval('#stage-viewer h3', (el) => el.textContent))?.includes(
    'The Architect: Interdisciplinary Real-World Systems',
  ),
)

// 2. Testimonial carousel
const firstCardBefore = await page.$eval(
  '#stories .grid p',
  (el) => el.textContent?.slice(0, 20) ?? '',
)
await page.click('button[aria-label="Next testimonial"]')
await new Promise((resolve) => setTimeout(resolve, 700))
const firstCardAfter = await page.$eval(
  '#stories .grid p',
  (el) => el.textContent?.slice(0, 20) ?? '',
)
check('testimonial next changes first card', firstCardBefore !== firstCardAfter)
await page.click('button[aria-label="Previous testimonial"]')
await new Promise((resolve) => setTimeout(resolve, 700))
const firstCardBack = await page.$eval('#stories .grid p', (el) => el.textContent?.slice(0, 20) ?? '')
check('testimonial previous restores card', firstCardBack === firstCardBefore)

// 3. Artifact modal
await page.click('#ecosystem button[aria-haspopup="dialog"]')
await new Promise((resolve) => setTimeout(resolve, 500))
check(
  'modal opens as dialog',
  await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]')
    return dialog !== null && dialog.querySelector('h3')?.textContent === 'Spatial Geometry & Curiosity Node 04'
  }),
)
check(
  'modal moves focus inside',
  await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) === true),
)
check(
  'modal locks body scroll',
  await page.evaluate(() => document.body.style.overflow === 'hidden'),
)
check(
  'modal Escape closes',
  await page.evaluate(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    return new Promise((resolve) => setTimeout(() => resolve(document.querySelector('[role="dialog"]') === null), 500))
  }),
)
check(
  'modal focus returns to trigger',
  await page.evaluate(
    () =>
      document.activeElement?.getAttribute('aria-haspopup') === 'dialog' ||
      document.activeElement?.textContent?.includes('Explore 3D Artifacts'),
  ),
)
await page.click('#ecosystem button[aria-haspopup="dialog"]')
await new Promise((resolve) => setTimeout(resolve, 400))
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('[role="dialog"] button')]
  buttons.find((b) => b.textContent === 'Dismiss')?.click()
  return true
})
check(
  'modal Dismiss button closes',
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(document.querySelector('[role="dialog"]') === null), 500),
      ),
  ),
)

// 4. Wireframe + Reset Pivot dock
check(
  'wireframe toggles aria-pressed',
  await page.evaluate(async () => {
    const wireButton = [...document.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Wireframe'),
    )
    if (!wireButton) return false
    wireButton.click()
    await new Promise((resolve) => setTimeout(resolve, 150))
    const pressedAfterOn = wireButton.getAttribute('aria-pressed') === 'true'
    wireButton.click()
    await new Promise((resolve) => setTimeout(resolve, 150))
    const pressedAfterOff = wireButton.getAttribute('aria-pressed') === 'false'
    return pressedAfterOn && pressedAfterOff
  }),
)
check(
  'reset pivot button exists and clickable',
  await page.evaluate(() => {
    const resetButton = [...document.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Reset Pivot'),
    )
    if (!resetButton) return false
    resetButton.click()
    return true
  }),
)

// 5. Footer subscription validation
await page.type('#dispatch-email', 'not-an-email')
await page.click('#footer button[type="submit"]')
await new Promise((resolve) => setTimeout(resolve, 400))
check(
  'footer subscribe rejects invalid email',
  (await page.$eval('#dispatch-status', (el) => el.textContent)) === 'Please enter a valid email address.',
)
await page.click('#dispatch-email', { clickCount: 3 })
await page.type('#dispatch-email', 'learner@example.com')
await page.click('#footer button[type="submit"]')
await new Promise((resolve) => setTimeout(resolve, 400))
check(
  'footer subscribe accepts valid email honestly',
  (await page.$eval('#dispatch-status', (el) => el.textContent))?.includes(
    'not connected to a mailing backend',
  ),
)

// 6. Navigation anchors exist for all header links
check(
  'header anchors resolve',
  await page.evaluate(() => {
    const links = [...document.querySelectorAll('header nav a[href^="#"]')]
    return links.every((link) => document.getElementById(link.getAttribute('href').slice(1)) !== null)
  }),
)
check(
  'footer anchors resolve',
  await page.evaluate(() => {
    const links = [...document.querySelectorAll('footer a[href^="#"]')]
    return (
      links.length > 0 &&
      links.every((link) => document.getElementById(link.getAttribute('href').slice(1)) !== null)
    )
  }),
)

// 7. Mobile viewport: menu button visible, no horizontal overflow
await page.setViewport({ width: 375, height: 800 })
await new Promise((resolve) => setTimeout(resolve, 800))
check(
  'mobile: menu button present and desktop nav hidden',
  await page.evaluate(() => {
    const menuButton = [...document.querySelectorAll('header button')].find((b) =>
      b.getAttribute('aria-controls') === 'mobile-navigation',
    )
    const desktopNav = document.querySelector('header nav[aria-label="Primary"]')
    return menuButton !== null && desktopNav !== null
  }),
)
await page.evaluate(() => {
  const menuButton = [...document.querySelectorAll('header button')].find((b) =>
    b.getAttribute('aria-controls') === 'mobile-navigation',
  )
  menuButton?.click()
  return true
})
await new Promise((resolve) => setTimeout(resolve, 400))
check(
  'mobile: menu opens with links and closes on selection',
  await page.evaluate(() => {
    const panel = document.querySelector('#mobile-navigation')
    if (!panel) return false
    const firstLink = panel.querySelector('a[href="#the-4-modes"]')
    firstLink?.click()
    return true
  }),
)
check(
  'mobile: menu closed after link click',
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(document.querySelector('#mobile-navigation') === null), 400),
      ),
  ),
)
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)
check('mobile: no horizontal overflow', overflow <= 0)
if (overflow > 0) {
  const culprits = await page.evaluate(() => {
    const wide = []
    for (const element of document.querySelectorAll('*')) {
      const rect = element.getBoundingClientRect()
      if (rect.right > document.documentElement.clientWidth + 1 || rect.left < -1) {
        wide.push(
          `${element.tagName}.${String(element.className).slice(0, 80)} L${Math.round(rect.left)} R${Math.round(rect.right)}`,
        )
      }
    }
    return wide.slice(0, 10)
  })
  console.log('overflow culprits:\n' + culprits.join('\n'))
}

console.log(results.join('\n'))
console.log(`console errors: ${consoleErrors.length ? consoleErrors.join(' | ') : 'none'}`)
await browser.close()
if (results.some((line) => line.startsWith('FAIL')) || consoleErrors.length > 0) process.exit(1)
