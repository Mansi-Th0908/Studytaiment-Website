import puppeteer from 'puppeteer-core'

const BASE = 'http://localhost:4173'

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  for (const path of candidates) {
    /* eslint-disable-next-line no-await-in-loop */
    if (await import('node:fs').then((fs) => fs.existsSync(path))) return path
  }
  return null
}

const exe = await findChrome()
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })

async function diagnose(route, anchors) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 2000))
  for (const anchor of anchors) {
    /* eslint-disable-next-line no-await-in-loop */
    const info = await page.evaluate((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      el.scrollIntoView({ behavior: 'instant', block: 'start' })
      return el.textContent.slice(0, 40)
    }, anchor)
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 1600))
    /* eslint-disable-next-line no-await-in-loop */
    const probe = await page.evaluate((id) => {
      const section = document.getElementById(id)
      if (!section) return null
      const h2 = section.querySelector('h2') ?? section.querySelector('h3')
      const style = h2 ? getComputedStyle(h2) : null
      const sectionRect = section.getBoundingClientRect()
      return {
        headlineOpacity: style?.opacity,
        headlineText: h2?.textContent?.slice(0, 40) ?? null,
        headlineVisible: style ? parseFloat(style.opacity) > 0.9 && style.visibility !== 'hidden' : null,
        sectionHeightPx: Math.round(sectionRect.height),
      }
    }, anchor)
    console.log(`[${route}] #${anchor} → ${JSON.stringify(info)} / ${JSON.stringify(probe)}`)
  }
  await page.close()
}

// Story page — probe every chapter
await diagnose('/our-story', ['story-problem', 'story-mission', 'story-universe', 'story-belief', 'story-mascots', 'story-finale'])
// OPA page — probe every section
await diagnose('/own-pace-academy', ['opa-whole-person', 'opa-world-foundation', 'opa-world-rising', 'opa-world-career', 'opa-pillars', 'opa-guidance', 'opa-begin', 'opa-family', 'opa-faq', 'opa-start'])

await browser.close()
console.log('done')
