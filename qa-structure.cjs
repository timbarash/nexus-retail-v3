const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://timbarash.github.io/nexus-retail-v3/', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Get full DOM structure
  const structure = await page.evaluate(() => {
    function getTree(el, depth) {
      if (depth > 4) return null;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id || undefined,
        class: el.className ? el.className.toString().substring(0, 120) : undefined,
        bg: cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? cs.backgroundColor : undefined,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        textLen: el.innerText ? el.innerText.length : 0,
        children: Array.from(el.children).slice(0, 8).map(c => getTree(c, depth + 1)).filter(Boolean)
      };
    }

    const root = document.getElementById('root');
    return getTree(root, 0);
  });

  console.log(JSON.stringify(structure, null, 2));

  // Now check the routes we can see correctly
  const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';

  // Navigate through sidebar links by clicking them
  const routes = [
    'Store Performance',
    'Sentiment & Reviews',
    'Brand Perception',
    'Review Explorer',
    'Competitive Intel',
  ];

  for (const routeName of routes) {
    await page.goto('https://timbarash.github.io/nexus-retail-v3/', { waitUntil: 'networkidle', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Click sidebar link
    const link = await page.locator(`aside a:has-text("${routeName}")`).first();
    if (link) {
      await link.click();
      await new Promise(r => setTimeout(r, 2000));

      const url = page.url();
      const bodyText = await page.evaluate(() => document.body.innerText.length);
      console.log(`\n${routeName}: URL=${url}, bodyTextLen=${bodyText}`);

      const safeFileName = routeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/nav-${safeFileName}.png`, fullPage: false });
    }
  }

  await page.close();
  await browser.close();
  console.log('\nDONE');
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
