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
if (!exe) {
  console.error('no chrome')
  process.exit(1)
}
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })

const shots = [
  { route: '/', out: '/tmp/home.png', width: 1440 },
  { route: '/our-story', out: '/tmp/story.png', width: 1440 },
  { route: '/own-pace-academy', out: '/tmp/opa.png', width: 1440 },
]

for (const shot of shots) {
  const page = await browser.newPage()
  await page.setViewport({ width: shot.width, height: 900, deviceScaleFactor: 0.6 })
  await page.goto(`${BASE}${shot.route}`, { waitUntil: 'load', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 3000))
  // scroll through to trigger whileInView content, then back to top
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 900))
  await page.screenshot({ path: shot.out, fullPage: true })
  console.log(`saved ${shot.out}`)
  await page.close()
}

await browser.close()
console.log('done')
