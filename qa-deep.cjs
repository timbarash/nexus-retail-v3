const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';

  // ==== PART 1: Direct URL navigation test ====
  console.log('=== DIRECT URL NAVIGATION TEST ===');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Test direct hash URL navigation (some routes seem to not load content directly)
  const directRoutes = [
    '#/locations', '#/overview', '#/brands', '#/reviews', '#/competitive',
    '#/agents/connect', '#/agents/pricing', '#/agents/marketing', '#/agents/bridge',
    '#/portal', '#/nexus-landing'
  ];

  for (const route of directRoutes) {
    await page.goto('https://timbarash.github.io/nexus-retail-v3/' + route, { waitUntil: 'networkidle', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    const bodyTextLen = await page.evaluate(() => document.body.innerText.length);
    const mainTextLen = await page.evaluate(() => {
      const main = document.querySelector('main');
      return main ? main.innerText.trim().length : -1;
    });
    const hasActiveLink = await page.evaluate(() => {
      const links = document.querySelectorAll('aside a');
      for (const l of links) {
        if (l.className.includes('active') || l.className.includes('bg-')) {
          return l.textContent.trim();
        }
      }
      return 'none';
    });

    console.log(`${route}: bodyText=${bodyTextLen}, mainText=${mainTextLen}, activeLink="${hasActiveLink}"`);
  }

  await page.close();

  // ==== PART 2: Mobile - scroll test ====
  console.log('\n=== MOBILE SCROLL TEST ===');
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Full page scroll screenshot of Home tab
  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/24-mobile-home-full.png`, fullPage: true });
  console.log('Mobile home full page screenshot');

  // Navigate to Chat tab and get full page
  const chatTabBtn = await mobile.locator('text=Chat').last();
  await chatTabBtn.click();
  await new Promise(r => setTimeout(r, 1500));

  // Now tap Restock Inventory tile
  const restockTile = await mobile.locator('text=Restock Inventory').first();
  const tileBox = await restockTile.boundingBox();
  console.log('Restock tile box:', JSON.stringify(tileBox));

  // Click the parent container of the tile
  const parentEl = await restockTile.evaluateHandle(el => el.closest('[class*="rounded"]') || el.parentElement);
  await parentEl.asElement().click();
  await new Promise(r => setTimeout(r, 3000));

  // Check what happened
  const chatState = await mobile.evaluate(() => {
    const bodyText = document.body.innerText;
    return {
      length: bodyText.length,
      hasInventoryData: bodyText.includes('Floor:') || bodyText.includes('Vault:'),
      hasTransferButton: bodyText.includes('Transfer') || bodyText.includes('Restock'),
      lastSection: bodyText.substring(bodyText.length - 300)
    };
  });
  console.log('After tapping tile:', JSON.stringify(chatState, null, 2));

  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/25-mobile-chat-after-tap.png`, fullPage: false });

  // Scroll up to see the chat response from the top
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/26-mobile-chat-response-top.png`, fullPage: false });

  // Full page screenshot of chat response
  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/27-mobile-chat-response-full.png`, fullPage: true });
  console.log('Chat response full page screenshot');

  // ==== PART 3: Mobile Actions tab deep test ====
  console.log('\n=== MOBILE ACTIONS TAB ===');
  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const actionsTab = await mobile.locator('text=Actions').last();
  await actionsTab.click();
  await new Promise(r => setTimeout(r, 1500));

  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/28-mobile-actions-full.png`, fullPage: true });
  console.log('Actions tab full page screenshot');

  // ==== PART 4: Mobile Alerts tab deep test ====
  console.log('\n=== MOBILE ALERTS TAB ===');
  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const alertsTab = await mobile.locator('text=Alerts').last();
  await alertsTab.click();
  await new Promise(r => setTimeout(r, 1500));

  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/29-mobile-alerts-full.png`, fullPage: true });
  console.log('Alerts tab full page screenshot');

  // ==== PART 5: Check border color verification ====
  console.log('\n=== BORDER COLOR CHECK ===');
  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const borderCheck = await mobile.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const borderColors = {};
    for (const el of allElements) {
      const cs = window.getComputedStyle(el);
      ['borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor'].forEach(prop => {
        const val = cs[prop];
        if (val && val !== 'rgb(0, 0, 0)' && val !== 'rgba(0, 0, 0, 0)') {
          if (!borderColors[val]) borderColors[val] = 0;
          borderColors[val]++;
        }
      });
    }
    return borderColors;
  });
  console.log('Border colors found:', JSON.stringify(borderCheck, null, 2));

  // ==== PART 6: Desktop Nexus Landing page ====
  console.log('\n=== NEXUS LANDING PAGE ===');
  const desktopLanding = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopLanding.goto('https://timbarash.github.io/nexus-retail-v3/#/nexus-landing', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await desktopLanding.screenshot({ path: `${SCREENSHOTS_DIR}/30-desktop-nexus-landing.png`, fullPage: false });
  await desktopLanding.screenshot({ path: `${SCREENSHOTS_DIR}/31-desktop-nexus-landing-full.png`, fullPage: true });
  console.log('Nexus landing screenshots');

  // Check console errors
  console.log('\n=== CONSOLE ERRORS CHECK ===');
  const consolePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  consolePage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await consolePage.goto('https://timbarash.github.io/nexus-retail-v3/', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Navigate through a few pages to collect console errors
  const pagesToCheck = ['#/locations', '#/agents/connect', '#/agents/pricing', '#/mobile'];
  for (const p of pagesToCheck) {
    await consolePage.goto('https://timbarash.github.io/nexus-retail-v3/' + p, { waitUntil: 'networkidle', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
  }

  if (consoleErrors.length > 0) {
    console.log('Console errors found:');
    const unique = [...new Set(consoleErrors)];
    unique.forEach(e => console.log('  - ' + e.substring(0, 200)));
  } else {
    console.log('No console errors');
  }

  await consolePage.close();
  await mobile.close();
  await desktopLanding.close();
  await browser.close();
  console.log('\nDONE');
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
