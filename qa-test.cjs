const { chromium } = require('playwright-core');

const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';
const BASE_URL = 'https://timbarash.github.io/nexus-retail-v3/';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runDesktopQA(browser) {
  console.log('\n=== DESKTOP PROTOTYPE QA ===\n');

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Track network errors
  const networkErrors = [];
  const brokenImages = [];

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push({ url: response.url(), status: response.status() });
    }
  });

  // 1. Homepage
  console.log('--- 1. Homepage ---');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(2000);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/01-desktop-homepage.png`, fullPage: false });
  console.log('Screenshot: 01-desktop-homepage.png');

  // Check sidebar
  const sidebar = await page.$('aside, [class*="sidebar"], nav[class*="side"]');
  if (sidebar) {
    const sidebarBox = await sidebar.boundingBox();
    const sidebarStyles = await sidebar.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        width: styles.width,
        display: styles.display,
        visibility: styles.visibility
      };
    });
    console.log('Sidebar found:', JSON.stringify(sidebarStyles));
    console.log('Sidebar dimensions:', JSON.stringify(sidebarBox));
  } else {
    console.log('WARNING: No sidebar element found with standard selectors');
    // Try broader search
    const allNavs = await page.$$('nav');
    console.log(`Found ${allNavs.length} nav elements`);
    for (let i = 0; i < allNavs.length; i++) {
      const box = await allNavs[i].boundingBox();
      const styles = await allNavs[i].evaluate(el => {
        const cs = window.getComputedStyle(el);
        return { bg: cs.backgroundColor, w: cs.width, h: cs.height, classes: el.className };
      });
      console.log(`  Nav ${i}: box=${JSON.stringify(box)}, styles=${JSON.stringify(styles)}`);
    }
  }

  // Check for green sidebar color
  const greenElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const greens = [];
    for (const el of elements) {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && (bg.includes('rgb(') || bg.includes('rgba('))) {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [_, r, g, b] = match.map(Number);
          // Check if it's greenish (g > r and g > b by some margin)
          if (g > r + 20 && g > b + 20 && g > 60) {
            greens.push({
              tag: el.tagName,
              class: el.className.substring(0, 80),
              bg,
              rect: el.getBoundingClientRect()
            });
          }
        }
      }
    }
    return greens.slice(0, 10);
  });
  console.log('Green-ish background elements:', JSON.stringify(greenElements, null, 2));

  // Get page structure
  const pageStructure = await page.evaluate(() => {
    const body = document.body;
    const children = Array.from(body.children).map(c => ({
      tag: c.tagName,
      class: c.className.substring(0, 100),
      id: c.id,
      rect: c.getBoundingClientRect(),
      bg: window.getComputedStyle(c).backgroundColor
    }));
    return children;
  });
  console.log('Page structure (body children):', JSON.stringify(pageStructure, null, 2));

  // 2. Navigate to Inventory & Reordering
  console.log('\n--- 2. Inventory & Reordering ---');
  // Try clicking sidebar link
  const invLink = await page.$('a[href*="inventory"], a[href*="reorder"], [data-route*="inventory"]');
  if (invLink) {
    await invLink.click();
    await sleep(2000);
  } else {
    // Try by text
    const links = await page.$$('a, button, [role="link"], [role="button"]');
    for (const link of links) {
      const text = await link.textContent().catch(() => '');
      if (text && text.toLowerCase().includes('inventory')) {
        await link.click();
        await sleep(2000);
        break;
      }
    }
  }
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-desktop-inventory.png`, fullPage: false });
  console.log('Screenshot: 02-desktop-inventory.png');
  console.log('Current URL:', page.url());

  // 3. Navigate to Pricing & Margins
  console.log('\n--- 3. Pricing & Margins ---');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);
  const pricingLink = await page.$('a[href*="pricing"], a[href*="margin"]');
  if (pricingLink) {
    await pricingLink.click();
    await sleep(2000);
  } else {
    const links2 = await page.$$('a, button, [role="link"], [role="button"]');
    for (const link of links2) {
      const text = await link.textContent().catch(() => '');
      if (text && text.toLowerCase().includes('pricing')) {
        await link.click();
        await sleep(2000);
        break;
      }
    }
  }
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/03-desktop-pricing.png`, fullPage: false });
  console.log('Screenshot: 03-desktop-pricing.png');
  console.log('Current URL:', page.url());

  // 4. Navigate to Marketing Campaigns
  console.log('\n--- 4. Marketing Campaigns ---');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);
  const mktLink = await page.$('a[href*="marketing"], a[href*="campaign"]');
  if (mktLink) {
    await mktLink.click();
    await sleep(2000);
  } else {
    const links3 = await page.$$('a, button, [role="link"], [role="button"]');
    for (const link of links3) {
      const text = await link.textContent().catch(() => '');
      if (text && (text.toLowerCase().includes('marketing') || text.toLowerCase().includes('campaign'))) {
        await link.click();
        await sleep(2000);
        break;
      }
    }
  }
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-desktop-marketing.png`, fullPage: false });
  console.log('Screenshot: 04-desktop-marketing.png');
  console.log('Current URL:', page.url());

  // 5. Check for broken images across all visited pages
  console.log('\n--- 5. Broken Images Check ---');
  // Navigate through main pages and check images
  const pagesToCheck = [
    { name: 'Home', url: BASE_URL },
    { name: 'Inventory', url: BASE_URL + '#/inventory' },
    { name: 'Pricing', url: BASE_URL + '#/pricing' },
    { name: 'Marketing', url: BASE_URL + '#/marketing' },
    { name: 'Connect', url: BASE_URL + '#/connect' },
  ];

  for (const pg of pagesToCheck) {
    await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1500);

    const imgResults = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        broken: img.complete && img.naturalWidth === 0,
        display: window.getComputedStyle(img).display,
        visible: img.offsetParent !== null
      }));
    });

    const broken = imgResults.filter(i => i.broken);
    if (broken.length > 0) {
      console.log(`BROKEN IMAGES on ${pg.name}:`, JSON.stringify(broken, null, 2));
      brokenImages.push(...broken.map(b => ({ page: pg.name, ...b })));
    } else {
      console.log(`${pg.name}: ${imgResults.length} images, all OK`);
    }
  }

  // Network errors summary
  if (networkErrors.length > 0) {
    console.log('\n--- Network Errors ---');
    console.log(JSON.stringify(networkErrors, null, 2));
  }

  await page.close();
  return { networkErrors, brokenImages };
}

async function runMobileQA(browser) {
  console.log('\n\n=== MOBILE APP QA ===\n');

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  const networkErrors = [];
  const brokenImages = [];

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push({ url: response.url(), status: response.status() });
    }
  });

  // Navigate to mobile view
  console.log('--- 1. Mobile Home Tab ---');
  await page.goto(BASE_URL + '#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(2000);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/05-mobile-home.png`, fullPage: false });
  console.log('Screenshot: 05-mobile-home.png');
  console.log('URL:', page.url());

  // Check background colors for warm palette
  const mobileColors = await page.evaluate(() => {
    const body = document.body;
    const bodyBg = window.getComputedStyle(body).backgroundColor;

    // Check various elements
    const results = {};
    const elements = document.querySelectorAll('*');
    const colorMap = {};

    for (const el of elements) {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        if (!colorMap[bg]) colorMap[bg] = [];
        if (colorMap[bg].length < 3) {
          colorMap[bg].push({
            tag: el.tagName,
            class: el.className.toString().substring(0, 60)
          });
        }
      }
    }

    return { bodyBg, colorMap };
  });
  console.log('Body background:', mobileColors.bodyBg);
  console.log('Color palette used:', JSON.stringify(mobileColors.colorMap, null, 2));

  // Check warm palette verification
  const paletteCheck = await page.evaluate(() => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const expectedColors = {
      background: '#141210',
      surfaces: '#1C1B1A',
      borders: '#38332B'
    };

    const allElements = document.querySelectorAll('*');
    const foundColors = { background: false, surfaces: false, borders: false };

    for (const el of allElements) {
      const cs = window.getComputedStyle(el);
      const bg = cs.backgroundColor;
      const border = cs.borderColor;

      // Check for #141210 (rgb(20, 18, 16))
      if (bg === 'rgb(20, 18, 16)') foundColors.background = true;
      // Check for #1C1B1A (rgb(28, 27, 26))
      if (bg === 'rgb(28, 27, 26)') foundColors.surfaces = true;
      // Check for #38332B (rgb(56, 51, 43))
      if (border && border.includes('rgb(56, 51, 43)')) foundColors.borders = true;
    }

    return { expectedColors, foundColors };
  });
  console.log('Warm palette check:', JSON.stringify(paletteCheck, null, 2));

  // Find tab navigation
  console.log('\n--- 2. Finding Mobile Tabs ---');
  const tabInfo = await page.evaluate(() => {
    // Look for bottom navigation / tabs
    const navs = document.querySelectorAll('nav, [role="tablist"], [class*="tab"], [class*="nav"], [class*="bottom"]');
    return Array.from(navs).map(n => ({
      tag: n.tagName,
      class: n.className.toString().substring(0, 100),
      role: n.getAttribute('role'),
      children: Array.from(n.children).map(c => ({
        tag: c.tagName,
        text: c.textContent?.trim().substring(0, 50),
        class: c.className.toString().substring(0, 60)
      }))
    }));
  });
  console.log('Navigation elements:', JSON.stringify(tabInfo, null, 2));

  // Try to find and click each tab
  const tabNames = ['Home', 'Alerts', 'Floor', 'Chat', 'Actions'];

  for (let i = 0; i < tabNames.length; i++) {
    const tabName = tabNames[i];
    console.log(`\n--- Tab: ${tabName} ---`);

    // Try multiple strategies to find tabs
    let clicked = false;

    // Strategy 1: text-based search
    const elements = await page.$$('button, a, [role="tab"], [role="button"], div, span, li');
    for (const el of elements) {
      const text = await el.textContent().catch(() => '');
      if (text && text.trim().toLowerCase() === tabName.toLowerCase()) {
        const box = await el.boundingBox();
        if (box && box.y > 700) { // Bottom nav area
          await el.click();
          clicked = true;
          break;
        }
      }
    }

    if (!clicked) {
      // Strategy 2: broader text match
      for (const el of elements) {
        const text = await el.textContent().catch(() => '');
        if (text && text.trim().toLowerCase().includes(tabName.toLowerCase())) {
          const box = await el.boundingBox();
          if (box && box.y > 600) {
            await el.click();
            clicked = true;
            break;
          }
        }
      }
    }

    if (!clicked) {
      // Strategy 3: aria-label
      const ariaEl = await page.$(`[aria-label*="${tabName}" i]`);
      if (ariaEl) {
        await ariaEl.click();
        clicked = true;
      }
    }

    await sleep(1500);
    const screenshotNum = String(5 + i + 1).padStart(2, '0');
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/${screenshotNum}-mobile-${tabName.toLowerCase()}.png`, fullPage: false });
    console.log(`Screenshot: ${screenshotNum}-mobile-${tabName.toLowerCase()}.png (clicked: ${clicked})`);
  }

  // 3. Chat tab - verify action tiles
  console.log('\n--- 3. Chat Tab - Action Tiles ---');
  // Navigate to chat tab
  const chatElements = await page.$$('button, a, [role="tab"], div, span');
  for (const el of chatElements) {
    const text = await el.textContent().catch(() => '');
    if (text && text.trim().toLowerCase() === 'chat') {
      const box = await el.boundingBox();
      if (box && box.y > 600) {
        await el.click();
        break;
      }
    }
  }
  await sleep(1500);

  // Check for action tiles grid
  const tilesInfo = await page.evaluate(() => {
    // Look for grid containers or tile-like elements
    const grids = document.querySelectorAll('[class*="grid"], [class*="tile"], [class*="card"], [class*="action"]');
    return Array.from(grids).map(g => ({
      tag: g.tagName,
      class: g.className.toString().substring(0, 100),
      children: g.children.length,
      text: g.textContent?.trim().substring(0, 200),
      rect: g.getBoundingClientRect()
    })).filter(g => g.rect.width > 0 && g.rect.height > 0);
  });
  console.log('Action tiles/grid elements:', JSON.stringify(tilesInfo.slice(0, 10), null, 2));

  await page.screenshot({ path: `${SCREENSHOTS_DIR}/11-mobile-chat-tiles.png`, fullPage: false });
  console.log('Screenshot: 11-mobile-chat-tiles.png');

  // Try tapping a tile
  console.log('\n--- 4. Tapping a Tile ---');
  const tiles = await page.$$('[class*="tile"], [class*="card"], [class*="action-item"], [class*="suggestion"]');
  if (tiles.length > 0) {
    const firstTile = tiles[0];
    const tileText = await firstTile.textContent().catch(() => 'unknown');
    console.log(`Tapping tile: "${tileText.trim().substring(0, 50)}"`);
    await firstTile.click();
    await sleep(2000);
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/12-mobile-chat-response.png`, fullPage: false });
    console.log('Screenshot: 12-mobile-chat-response.png');

    // Check if chat responded with rich content
    const chatContent = await page.evaluate(() => {
      const messages = document.querySelectorAll('[class*="message"], [class*="chat"], [class*="response"], [class*="bubble"]');
      return Array.from(messages).map(m => ({
        class: m.className.toString().substring(0, 80),
        text: m.textContent?.trim().substring(0, 200),
        hasImages: m.querySelectorAll('img').length,
        hasCharts: m.querySelectorAll('canvas, svg, [class*="chart"]').length,
        hasRichContent: m.querySelectorAll('table, [class*="card"], [class*="metric"]').length
      }));
    });
    console.log('Chat response content:', JSON.stringify(chatContent.slice(0, 5), null, 2));
  } else {
    console.log('WARNING: No tile elements found to tap');
  }

  // 5. Touch target check
  console.log('\n--- 5. Touch Target Check ---');
  const touchTargets = await page.evaluate(() => {
    const clickables = document.querySelectorAll('button, a, [role="button"], [role="tab"], input, select, textarea');
    const smallTargets = [];
    for (const el of clickables) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        smallTargets.push({
          tag: el.tagName,
          text: el.textContent?.trim().substring(0, 40),
          class: el.className.toString().substring(0, 60),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
      }
    }
    return smallTargets;
  });
  if (touchTargets.length > 0) {
    console.log(`WARNING: ${touchTargets.length} elements with touch targets < 44px:`);
    console.log(JSON.stringify(touchTargets.slice(0, 15), null, 2));
  } else {
    console.log('All touch targets are >= 44px - PASS');
  }

  // 6. Overlapping text check
  console.log('\n--- 6. Overlapping Text Check ---');
  const overlapCheck = await page.evaluate(() => {
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, label, div');
    const issues = [];
    const rects = [];

    for (const el of textElements) {
      const text = el.textContent?.trim();
      if (!text || text.length < 2) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      // Check for text overflow
      if (el.scrollWidth > el.clientWidth + 5) {
        const cs = window.getComputedStyle(el);
        if (cs.overflow !== 'hidden' && cs.textOverflow !== 'ellipsis') {
          issues.push({
            type: 'overflow',
            text: text.substring(0, 50),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            tag: el.tagName,
            class: el.className.toString().substring(0, 60)
          });
        }
      }
    }

    return issues.slice(0, 10);
  });
  if (overlapCheck.length > 0) {
    console.log('Text overflow issues:', JSON.stringify(overlapCheck, null, 2));
  } else {
    console.log('No text overflow issues detected - PASS');
  }

  // Check broken images on mobile
  console.log('\n--- 7. Mobile Broken Images ---');
  const mobileImgs = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    return Array.from(images).map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      broken: img.complete && img.naturalWidth === 0
    }));
  });
  const brokenMobile = mobileImgs.filter(i => i.broken);
  if (brokenMobile.length > 0) {
    console.log('BROKEN IMAGES on mobile:', JSON.stringify(brokenMobile, null, 2));
  } else {
    console.log(`Mobile: ${mobileImgs.length} images, all OK`);
  }

  if (networkErrors.length > 0) {
    console.log('\n--- Mobile Network Errors ---');
    console.log(JSON.stringify(networkErrors, null, 2));
  }

  await page.close();
  return { networkErrors, brokenImages: brokenMobile };
}

async function checkBrokenImagesDeep(browser) {
  console.log('\n\n=== DEEP BROKEN IMAGES CHECK ===\n');

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const allBroken = [];
  const all404s = [];

  page.on('response', response => {
    if (response.status() >= 400) {
      all404s.push({ url: response.url(), status: response.status() });
    }
  });

  // Check more pages that may have product images
  const routes = [
    '#/', '#/inventory', '#/pricing', '#/marketing', '#/connect',
    '#/analytics', '#/compliance', '#/operations', '#/mobile'
  ];

  for (const route of routes) {
    const url = BASE_URL + route;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await sleep(1500);

      const imgs = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        return Array.from(images).map(img => ({
          src: img.src,
          alt: img.alt || '',
          naturalWidth: img.naturalWidth,
          broken: img.complete && img.naturalWidth === 0
        }));
      });

      const broken = imgs.filter(i => i.broken);
      if (broken.length > 0) {
        console.log(`BROKEN on ${route}: ${broken.length} images`);
        broken.forEach(b => console.log(`  - ${b.src} (alt: ${b.alt})`));
        allBroken.push(...broken.map(b => ({ route, ...b })));
      } else {
        console.log(`${route}: ${imgs.length} images OK`);
      }
    } catch (e) {
      console.log(`${route}: Error - ${e.message.substring(0, 80)}`);
    }
  }

  if (all404s.length > 0) {
    console.log('\nAll 404 / Error responses:');
    // Deduplicate
    const seen = new Set();
    for (const err of all404s) {
      const key = `${err.status}:${err.url}`;
      if (!seen.has(key)) {
        seen.add(key);
        console.log(`  ${err.status}: ${err.url}`);
      }
    }
  }

  await page.close();
  return { allBroken, all404s };
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  try {
    const desktopResults = await runDesktopQA(browser);
    const mobileResults = await runMobileQA(browser);
    const imageResults = await checkBrokenImagesDeep(browser);

    console.log('\n\n========================================');
    console.log('QA SUMMARY');
    console.log('========================================');
    console.log(`Desktop network errors: ${desktopResults.networkErrors.length}`);
    console.log(`Desktop broken images: ${desktopResults.brokenImages.length}`);
    console.log(`Mobile network errors: ${mobileResults.networkErrors.length}`);
    console.log(`Mobile broken images: ${mobileResults.brokenImages.length}`);
    console.log(`Deep scan broken images: ${imageResults.allBroken.length}`);
    console.log(`Total 404s: ${imageResults.all404s.length}`);
  } finally {
    await browser.close();
  }
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
