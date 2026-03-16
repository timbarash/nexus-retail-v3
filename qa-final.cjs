const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true
  });

  const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/screenshots';

  // ==== PART 1: Test sidebar active state on navigation ====
  console.log('=== SIDEBAR ACTIVE STATE ===');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://timbarash.github.io/nexus-retail-v3/', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Click each sidebar link and check if active state is correct
  const sidebarItems = [
    'Store Performance', 'Sentiment & Reviews', 'Brand Perception',
    'Review Explorer', 'Competitive Intel', 'Inventory & Reordering',
    'Pricing & Margins', 'Marketing Campaigns', 'Nexus Chat', 'Customer Portal'
  ];

  for (const item of sidebarItems) {
    const link = await page.locator(`aside a:has-text("${item}")`).first();
    await link.click();
    await new Promise(r => setTimeout(r, 1000));

    const activeState = await page.evaluate((targetText) => {
      const links = document.querySelectorAll('aside a');
      for (const l of links) {
        if (l.textContent.trim().includes(targetText)) {
          const bg = window.getComputedStyle(l).backgroundColor;
          const isActive = bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
          return { text: targetText, bg, isActive, classes: l.className.substring(0, 100) };
        }
      }
      return { text: targetText, found: false };
    }, item);

    console.log(`${item}: active=${activeState.isActive}, bg=${activeState.bg}`);
  }

  // ==== PART 2: Test Nexus Chat / Bridge agent ====
  console.log('\n=== NEXUS CHAT (Bridge Agent) ===');
  const bridgeLink = await page.locator('aside a:has-text("Nexus Chat")').first();
  await bridgeLink.click();
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/32-desktop-nexus-chat-bridge.png`, fullPage: false });
  console.log('URL:', page.url());

  // Check if it has a chat interface
  const chatUI = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input, textarea');
    const buttons = document.querySelectorAll('button');
    return {
      inputCount: inputs.length,
      buttonCount: buttons.length,
      hasSearchInput: Array.from(inputs).some(i => i.placeholder && (i.placeholder.toLowerCase().includes('search') || i.placeholder.toLowerCase().includes('ask') || i.placeholder.toLowerCase().includes('chat'))),
      mainText: (document.querySelector('main') || {}).innerText?.substring(0, 300) || 'NO MAIN'
    };
  });
  console.log('Chat UI:', JSON.stringify(chatUI, null, 2));

  // ==== PART 3: Test Customer Portal ====
  console.log('\n=== CUSTOMER PORTAL ===');
  const portalLink = await page.locator('aside a:has-text("Customer Portal")').first();
  await portalLink.click();
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/33-desktop-customer-portal.png`, fullPage: false });
  console.log('URL:', page.url());

  // ==== PART 4: Test Team Chat ====
  console.log('\n=== TEAM CHAT ===');
  const teamChatLink = await page.locator('aside a:has-text("Team Chat")').first();
  if (teamChatLink) {
    await teamChatLink.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/34-desktop-team-chat.png`, fullPage: false });
    console.log('URL:', page.url());
  }

  // ==== PART 5: DTCH Team Chat ====
  console.log('\n=== DTCH TEAM CHAT ===');
  const dtchLink = await page.locator('aside a:has-text("DTCH Team Chat")').first();
  if (dtchLink) {
    await dtchLink.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/35-desktop-dtch-team-chat.png`, fullPage: false });
    console.log('URL:', page.url());
  }

  // ==== PART 6: Mobile - verify border colors more precisely ====
  console.log('\n=== MOBILE BORDER DETAIL CHECK ===');
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Check for rgb(229, 231, 235) borders - this is Tailwind's default gray-200 border
  // This could be an issue if it doesn't match the warm palette
  const grayBorderElements = await mobile.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const results = [];
    for (const el of allElements) {
      const cs = window.getComputedStyle(el);
      ['borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor'].forEach(prop => {
        if (cs[prop] === 'rgb(229, 231, 235)') {
          const rect = el.getBoundingClientRect();
          // Only report visible elements with actual borders
          const borderWidth = parseInt(cs[prop.replace('Color', 'Width')]) || 0;
          if (borderWidth > 0 && rect.width > 0 && rect.height > 0) {
            results.push({
              tag: el.tagName,
              class: el.className.toString().substring(0, 80),
              borderWidth,
              rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) }
            });
          }
        }
      });
    }
    return results;
  });

  if (grayBorderElements.length > 0) {
    console.log(`WARNING: Found ${grayBorderElements.length} elements with gray-200 borders (rgb(229, 231, 235))`);
    console.log('These may be Tailwind defaults that should be warm palette borders (#38332B):');
    grayBorderElements.slice(0, 10).forEach(el => {
      console.log(`  ${el.tag} .${el.class.substring(0, 50)} (${el.rect.w}x${el.rect.h} at ${el.rect.x},${el.rect.y})`);
    });
  } else {
    console.log('No gray-200 default borders found - PASS');
  }

  // ==== PART 7: Check Floor tab for overlapping text ====
  console.log('\n=== MOBILE FLOOR TAB ===');
  await mobile.goto('https://timbarash.github.io/nexus-retail-v3/#/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const floorTab = await mobile.locator('text=Floor').last();
  await floorTab.click();
  await new Promise(r => setTimeout(r, 1500));

  await mobile.screenshot({ path: `${SCREENSHOTS_DIR}/36-mobile-floor-full.png`, fullPage: true });

  await mobile.close();
  await page.close();
  await browser.close();
  console.log('\nDONE');
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
