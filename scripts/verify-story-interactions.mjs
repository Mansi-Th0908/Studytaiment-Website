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
      await import('node:fs').then((fs) => fs.existsSync(path))
      return path
    } catch {
      continue
    }
  }
  return null
}

const executablePath = await findChrome()
const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

// 1) Reduced motion: no page errors, content immediately visible (opacity 1)
{
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  const errs = []
  page.on('pageerror', (err) => errs.push(err.message))
  await page.goto(`${BASE}/our-story`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1200))
  const heroVisible = await page.evaluate(() => {
    const el = document.querySelector('main#our-story h1')
    if (!el) return false
    return getComputedStyle(el).opacity === '1'
  })
  console.log(`[reduced-motion] heroOpacity=1: ${heroVisible ? 'yes' : 'NO'} pageErrors=${errs.length}`)

  // 2) Header "Our Story" link from home navigates to /our-story without reload errors
  const page2 = await browser.newPage()
  await page2.setViewport({ width: 1440, height: 900 })
  await page2.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1000))
  await page2.click('a[href="/our-story"]')
  await new Promise((r) => setTimeout(r, 1200))
  const onStory = await page2.evaluate(
    () => Boolean(document.querySelector('main#our-story')),
  )
  console.log(`[nav] home→/our-story via header link: ${onStory ? 'yes' : 'NO'}`)

  // 3) Story final CTA goes back to home target anchor
  const href = await page2.evaluate(
    () => Array.from(document.querySelectorAll('#story-finale a[href="/#explore-pathways"]')).length,
  )
  console.log(`[nav] finale CTA target link present: ${href > 0 ? 'yes' : 'NO'}`)
}

await browser.close()
console.log('done')
