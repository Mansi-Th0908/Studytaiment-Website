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
    try {
      // eslint-disable-next-line no-await-in-loop
      await import('node:fs').then((fs) => fs.existsSync(path))
      return path
    } catch {
      continue
    }
  }
  return null
}

const executablePath = await findChrome()
if (!executablePath) {
  console.error('no chrome found')
  process.exit(1)
}

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const errors = []
async function checkPage(path, { expectSelectors = [], label }) {
  const page = await browser.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${label}] console.error: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[${label}] pageerror: ${err.message}`))

  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((resolve) => setTimeout(resolve, 2500))
  const title = await page.title()
  const missing = []
  for (const selector of expectSelectors) {
    // eslint-disable-next-line no-await-in-loop
    const count = await page.$$eval(selector, (els) => els.length).catch(() => -1)
    if (!count) missing.push(selector)
  }
  // horizontal overflow check
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim().slice(0, 60) ?? null)
  console.log(
    `[${label}] title="${title}" h1=${JSON.stringify(h1)} missingSelectors=${JSON.stringify(missing)} overflowPx=${overflow}`,
  )
  await page.close()
}

// Story page: hero h1 + all 8 chapters' key content
await checkPage('/our-story', {
  label: 'story',
  expectSelectors: [
    'main#our-story',
    '#story-problem',
    '#story-mission',
    '#story-universe',
    '#story-belief',
    '#story-mascots',
    '#story-finale',
    'svg', // illustrations render
  ],
})

// Home page sanity: original sections intact
await checkPage('/', {
  label: 'home',
  expectSelectors: ['#ecosystem', '#the-4-modes', '#3-30-continuum', '#impact', '#stories', 'footer#footer'],
})

// Mobile story layout (360px wide) — overflow check
{
  const page = await browser.newPage()
  page.on('pageerror', (err) => errors.push(`[story-mobile] pageerror: ${err.message}`))
  await page.setViewport({ width: 360, height: 740 })
  await page.goto(`${BASE}/our-story`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((resolve) => setTimeout(resolve, 2500))
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  console.log(`[story-mobile] overflowPx=${overflow}`)
  await page.close()
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no console/page errors')

await browser.close()
