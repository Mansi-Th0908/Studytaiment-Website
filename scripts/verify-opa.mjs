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

// 1) Route + sections directly opened
{
  const page = await browser.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[opa] console.error: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[opa] pageerror: ${err.message}`))
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/own-pace-academy`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 2500))
  const title = await page.title()
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim().slice(0, 70) ?? null)
  const sections = await page.evaluate(() =>
    ['opa-overview', 'opa-whole-person', 'opa-worlds', 'opa-world-foundation', 'opa-world-rising', 'opa-world-career', 'opa-pillars', 'opa-guidance', 'opa-begin', 'opa-family', 'opa-faq', 'opa-start']
      .map((id) => [id, Boolean(document.getElementById(id))]),
  )
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  console.log(`[opa-desktop] title="${title}" h1=${JSON.stringify(h1)} overflowPx=${overflow}`)
  const missing = sections.filter(([, ok]) => !ok).map(([id]) => id)
  console.log(`[opa-desktop] sections present=${sections.filter(([, ok]) => ok).length}/12 missing=${missing.join(',') || 'none'}`)
  await page.close()
}

// 2) Mobile 360px overflow + no console errors
{
  const page = await browser.newPage()
  page.on('pageerror', (err) => errors.push(`[opa-mobile] pageerror: ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[opa-mobile] console.error: ${msg.text()}`)
  })
  await page.setViewport({ width: 360, height: 740 })
  await page.goto(`${BASE}/own-pace-academy`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 2000))
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  console.log(`[opa-mobile] overflowPx=${overflow}`)
  await page.close()
}

// 3) Interactions: FAQ accordion, interest cards click-to-reveal, header/footer links
{
  const page = await browser.newPage()
  page.on('pageerror', (err) => errors.push(`[opa-interact] pageerror: ${err.message}`))
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/own-pace-academy`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1500))

  // header link self-check (we are already on the page)
  const headerLink = await page.evaluate(() => Boolean(document.querySelector('header a[href="/own-pace-academy"]')))
  const footerLink = await page.evaluate(() => Boolean(document.querySelector('footer a[href="/own-pace-academy"]')))

  // FAQ accordion: open the last question of the first column, check aria-expanded
  const faqButtons = await page.$$('#opa-faq button[aria-controls]')
  const faqCount = faqButtons.length
  await faqButtons[faqCount - 1].click()
  await new Promise((r) => setTimeout(r, 500))
  const lastExpanded = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('#opa-faq button[aria-controls]'))
    const btn = buttons[buttons.length - 1]
    return btn?.getAttribute('aria-expanded')
  })

  // Interest chip: click 3rd chip (sports) in Rising world and check selected description updates
  const risingDescBefore = await page.evaluate(() =>
    document.querySelector('#opa-world-rising .rounded-2xl.bg-white\\/85 p')?.textContent?.slice(0, 40) ?? null,
  )
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('#opa-world-rising button'))
    const sports = chips.find((b) => b.textContent?.includes('Sports & performance'))
    sports?.click()
  })
  await new Promise((r) => setTimeout(r, 500))
  const risingDescAfter = await page.evaluate(() =>
    document.querySelector('#opa-world-rising .rounded-2xl.bg-white\\/85 p')?.textContent?.slice(0, 40) ?? null,
  )
  const descChanged = risingDescBefore !== risingDescAfter && risingDescAfter !== null

  // finale CTAs point to real destinations
  const finaleLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#opa-start a')).map((a) => a.getAttribute('href')),
  )

  console.log(`[opa-interact] headerLink=${headerLink} footerLink=${footerLink} faqButtons=${faqCount} lastFaqExpanded=${lastExpanded} interestCardUpdates=${descChanged} finaleHrefs=${JSON.stringify(finaleLinks)}`)
  await page.close()
}

// 4) Reduced motion: content immediately visible, no errors
{
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  const errs = []
  page.on('pageerror', (err) => errs.push(err.message))
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/own-pace-academy`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1200))
  const heroVisible = await page.evaluate(() => {
    const el = document.querySelector('#opa-overview h1')
    return el ? getComputedStyle(el).opacity === '1' : false
  })
  console.log(`[opa-reduced-motion] heroOpacity=1: ${heroVisible ? 'yes' : 'NO'} pageErrors=${errs.length}`)
  await page.close()
}

// 5) Nav from home → /own-pace-academy via header link
{
  const page = await browser.newPage()
  page.on('pageerror', (err) => errors.push(`[nav] pageerror: ${err.message}`))
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1000))
  await page.click('header a[href="/own-pace-academy"]')
  await new Promise((r) => setTimeout(r, 1500))
  const onOpa = await page.evaluate(() => {
    const el = document.querySelector('h1')
    return el?.textContent?.includes('Potential')
  })
  console.log(`[nav] home→/own-pace-academy via header link: ${onOpa ? 'yes' : 'NO'}`)
  await page.close()
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no console/page errors')
await browser.close()
console.log('done')
