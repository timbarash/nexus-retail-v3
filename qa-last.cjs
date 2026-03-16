const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Navigate to home first
  await page.goto('https://timbarash.github.io/nexus-retail-v3/', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll sidebar to make Team Chat and DTCH visible, then click
  await page.evaluate(() => {
    const sidebar = document.querySelector('aside nav') || document.querySelector('aside');
    if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 500));

  // Find Team Chat link by scrolling into view
  const teamChatLink = await page.evaluate(() => {
    const links = document.querySelectorAll('aside a');
    for (const l of links) {
      if (l.textContent.includes('Team Chat') && !l.textContent.includes('DTCH')) {
        l.scrollIntoView();
        return true;
      }
    }
    return false;
  });

  if (teamChatLink) {
    await new Promise(r => setTimeout(r, 500));
    await page.locator('aside a:has-text("Team Chat")').first().click({ timeout: 5000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/34-desktop-team-chat.png`, fullPage: false });
    console.log('Team Chat URL:', page.url());
  } else {
    console.log('Team Chat link not found');
  }

  // DTCH Team Chat
  await page.evaluate(() => {
    const links = document.querySelectorAll('aside a');
    for (const l of links) {
      if (l.textContent.includes('DTCH')) {
        l.scrollIntoView();
        l.click();
        return true;
      }
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/35-desktop-dtch-team-chat.png`, fullPage: false });
  console.log('DTCH Team Chat URL:', page.url());

  // ==== Mobile: Gray border investigation ====
  console.log('\n=== MOBILE GRAY BORDER CHECK ===');
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Check if gray-200 borders are visible or hidden by other styling
  const grayBorderCheck = await mobile.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const visibleGrayBorders = [];
    for (const el of allElements) {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      ['Top', 'Bottom', 'Left', 'Right'].forEach(side => {
        const color = cs['border' + side + 'Color'];
        const width = parseInt(cs['border' + side + 'Width']) || 0;
        const style = cs['border' + side + 'Style'];
        if (color === 'rgb(229, 231, 235)' && width > 0 && style !== 'none') {
          // Check if this border is actually visible (element is on screen)
          if (rect.y + rect.height > 0 && rect.y < 1000) {
            visibleGrayBorders.push({
              tag: el.tagName,
              class: el.className.toString().substring(0, 60),
              side,
              width,
              y: Math.round(rect.y),
              visible: cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0'
            });
          }
        }
      });
    }
    return visibleGrayBorders;
  });

  if (grayBorderCheck.length > 0) {
    const actuallyVisible = grayBorderCheck.filter(b => b.visible);
    console.log(`Gray borders: ${grayBorderCheck.length} total, ${actuallyVisible.length} visible`);
    if (actuallyVisible.length > 0) {
      console.log('Visible gray-200 borders (potential palette issue):');
      actuallyVisible.slice(0, 5).forEach(b => console.log(`  ${b.tag} .${b.class} ${b.side} at y=${b.y}`));
    }
  } else {
    console.log('No visible gray-200 borders - PASS');
  }

  // Mobile Floor tab - full screenshot
  const floorTab = await mobile.locator('text=Floor').last();
  await floorTab.click();
  await new Promise(r => setTimeout(r, 1500));
  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/36-mobile-floor-full.png`, fullPage: true });

  // Test the Log sub-tab on Floor
  const logTab = await mobile.locator('text=Log').first();
  if (logTab) {
    try {
      await logTab.click({ timeout: 3000 });
      await new Promise(r => setTimeout(r, 1500));
      await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/37-mobile-floor-log.png`, fullPage: false });
      console.log('Floor Log tab captured');
    } catch(e) {
      console.log('Floor Log tab not clickable');
    }
  }

  await mobile.close();
  await page.close();
  await browser.close();
  console.log('\nDONE');
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
