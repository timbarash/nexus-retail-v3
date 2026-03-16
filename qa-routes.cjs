const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const routes = [
    { name: 'command-center', url: '#/' },
    { name: 'store-performance', url: '#/locations' },
    { name: 'sentiment-reviews', url: '#/overview' },
    { name: 'brand-perception', url: '#/brands' },
    { name: 'review-explorer', url: '#/reviews' },
    { name: 'competitive-intel', url: '#/competitive' },
    { name: 'inventory', url: '#/agents/connect' },
    { name: 'pricing', url: '#/agents/pricing' },
    { name: 'marketing', url: '#/agents/marketing' },
    { name: 'nexus-chat', url: '#/agents/bridge' },
    { name: 'customer-portal', url: '#/portal' },
    { name: 'nexus-landing', url: '#/nexus-landing' },
  ];

  for (const route of routes) {
    await page.goto('https://timbarash.github.io/nexus-retail-v3/' + route.url, { waitUntil: 'networkidle', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    const contentInfo = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root) return { mainTextLength: 0, mainTextPreview: 'NO ROOT' };

      // Try to find the main content area (not the sidebar)
      const aside = root.querySelector('aside');
      const allChildren = Array.from(root.querySelectorAll('*'));

      let mainText = '';
      // Get text from elements not inside the aside
      const mainEl = root.querySelector('main, [class*="flex-1"], [class*="ml-"]');
      if (mainEl) {
        mainText = mainEl.innerText || '';
      } else {
        // Fallback: get all text and subtract sidebar text
        const sidebarText = aside ? aside.innerText : '';
        mainText = (root.innerText || '').replace(sidebarText, '');
      }

      return {
        mainTextLength: mainText.trim().length,
        mainTextPreview: mainText.trim().substring(0, 200)
      };
    });

    const hasContent = contentInfo.mainTextLength > 100;
    const status = hasContent ? 'HAS CONTENT' : 'EMPTY/MINIMAL';
    console.log(`${route.name} (${route.url}): ${status} | ${contentInfo.mainTextLength} chars`);
    if (!hasContent) {
      console.log(`  Preview: "${contentInfo.mainTextPreview}"`);
    }

    await page.screenshot({ path: `${SCREENSHOTS_DIR}/route-${route.name}.png`, fullPage: false });
  }

  await page.close();
  await browser.close();
  console.log('DONE');
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
