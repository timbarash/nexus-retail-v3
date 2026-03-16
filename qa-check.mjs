import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'http://localhost:5173/nexus-retail-v3';
const SCREENSHOTS_DIR = '/root/workspace/nexus-retail-v3/qa-screenshots';

import { mkdirSync } from 'fs';
mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const results = [];
function log(check, status, detail) {
  const entry = { check, status, detail };
  results.push(entry);
  console.log(`[${status}] ${check}: ${detail}`);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Collect console errors and network failures
  const consoleErrors = [];
  const networkFailures = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      networkFailures.push({ url: resp.url(), status: resp.status() });
    }
  });

  // ===== CHECK 1: Homepage / Sidebar green =====
  console.log('\n=== CHECK 1: Homepage & Sidebar ===');
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/01-homepage.png`, fullPage: false });

  // Check sidebar background color
  try {
    const sidebarColor = await page.evaluate(() => {
      // Try various sidebar selectors
      const selectors = ['aside', '[class*="sidebar"]', '[class*="Sidebar"]', 'nav', '[class*="side-nav"]'];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const style = window.getComputedStyle(el);
          return { selector: sel, bg: style.backgroundColor, found: true };
        }
      }
      return { found: false };
    });

    if (sidebarColor.found) {
      // Convert rgb to hex for comparison
      const rgbMatch = sidebarColor.bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const hex = '#' + [rgbMatch[1], rgbMatch[2], rgbMatch[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        const isDeepGreen = hex === '#042017' || hex === '#041f17' || hex === '#042018';
        log('Sidebar green (#042017)', isDeepGreen ? 'PASS' : 'WARN', `Found bg: ${sidebarColor.bg} (${hex}) on <${sidebarColor.selector}>`);
      } else {
        log('Sidebar green (#042017)', 'INFO', `Background: ${sidebarColor.bg} on <${sidebarColor.selector}>`);
      }
    } else {
      log('Sidebar green (#042017)', 'WARN', 'No sidebar element found');
    }
  } catch (e) {
    log('Sidebar green (#042017)', 'ERROR', e.message);
  }

  // ===== CHECK 2: Nexus Chat page - Brand images =====
  console.log('\n=== CHECK 2: Brand Images on Chat Page ===');
  await page.goto(BASE + '/agents/bridge', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-chat-page.png`, fullPage: false });

  // Check if there are any images from /brands/ directory
  const brandImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({ src: img.src, alt: img.alt, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, displayed: img.offsetWidth > 0 }));
  });

  const brandImgs = brandImages.filter(i => i.src.includes('brand'));
  if (brandImgs.length > 0) {
    const broken = brandImgs.filter(i => i.naturalWidth === 0);
    log('Brand images on chat page', broken.length === 0 ? 'PASS' : 'FAIL',
      `Found ${brandImgs.length} brand images, ${broken.length} broken. Sources: ${brandImgs.map(i => i.src.split('/').pop()).join(', ')}`);
  } else {
    log('Brand images on chat page', 'INFO', 'No brand images visible on initial load (may need chat interaction)');
  }

  // Try to interact with chat - find input and type a query
  try {
    const chatInput = await page.$('input[type="text"], textarea, [contenteditable="true"], [class*="chat"] input, [class*="Chat"] input');
    if (chatInput) {
      await chatInput.fill('Show me top selling flower products');
      // Try to find and click send button
      const sendBtn = await page.$('button[type="submit"], [class*="send"], [class*="Send"], button:has(svg)');
      if (sendBtn) {
        await sendBtn.click();
        await page.waitForTimeout(3000);
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/02b-chat-response.png`, fullPage: false });

        // Check for brand images in response
        const responseImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.map(img => ({ src: img.src, naturalWidth: img.naturalWidth }));
        });
        const respBrandImgs = responseImages.filter(i => i.src.includes('brand'));
        const broken = respBrandImgs.filter(i => i.naturalWidth === 0);
        log('Brand images in chat response', respBrandImgs.length > 0 ? (broken.length === 0 ? 'PASS' : 'FAIL') : 'INFO',
          `Found ${respBrandImgs.length} brand images in response, ${broken.length} broken`);
      }
    } else {
      log('Chat input', 'INFO', 'No chat input found on /agents/bridge');
    }
  } catch (e) {
    log('Chat interaction', 'ERROR', e.message);
  }

  // Check all images on page for 404s
  const all404Images = networkFailures.filter(f => f.url.includes('brand') || f.url.includes('.png') || f.url.includes('.jpg') || f.url.includes('.webp'));
  if (all404Images.length > 0) {
    log('Image 404s', 'FAIL', `${all404Images.length} broken image(s): ${all404Images.map(i => `${i.url.split('/').pop()} (${i.status})`).join(', ')}`);
  } else {
    log('Image 404s (so far)', 'PASS', 'No image 404s detected');
  }

  // ===== CHECK 3: Desktop Chat warm colors =====
  console.log('\n=== CHECK 3: Desktop Chat Warm Colors ===');
  // Check user message and send button colors
  try {
    const chatColors = await page.evaluate(() => {
      // Find user messages
      const msgs = Array.from(document.querySelectorAll('[class*="user"], [class*="User"], [class*="message"]'));
      const userMsgColors = [];
      for (const m of msgs) {
        const style = window.getComputedStyle(m);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          userMsgColors.push(style.backgroundColor);
        }
      }

      // Find send button
      const btns = Array.from(document.querySelectorAll('button'));
      const sendBtns = btns.filter(b => {
        const text = b.textContent.toLowerCase();
        const cls = (b.className || '').toLowerCase();
        return text.includes('send') || cls.includes('send') || b.querySelector('svg');
      });
      const sendBtnColors = sendBtns.map(b => {
        const style = window.getComputedStyle(b);
        return { bg: style.backgroundColor, text: b.textContent.trim().substring(0, 20), class: (b.className || '').substring(0, 50) };
      });

      return { userMsgColors, sendBtnColors };
    });

    log('Desktop chat colors', 'INFO', `User msg colors: ${JSON.stringify(chatColors.userMsgColors.slice(0, 3))}. Send buttons: ${JSON.stringify(chatColors.sendBtnColors.slice(0, 3))}`);
  } catch (e) {
    log('Desktop chat colors', 'ERROR', e.message);
  }

  // ===== CHECK 4: NexusChat FAB overlay =====
  console.log('\n=== CHECK 4: NexusChat FAB Overlay ===');
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Find FAB button
  try {
    const fabButton = await page.$('[class*="fab"], [class*="Fab"], [class*="FAB"], button[class*="float"], [class*="nexus-chat-fab"], [class*="overlay-trigger"], [class*="chat-trigger"]');
    if (!fabButton) {
      // Try finding a floating button at the bottom right
      const fabByPosition = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        for (const b of btns) {
          const style = window.getComputedStyle(b);
          const rect = b.getBoundingClientRect();
          if (style.position === 'fixed' && rect.bottom > 800 && rect.right > 1300) {
            return { found: true, text: b.textContent.trim(), class: b.className, rect: { bottom: rect.bottom, right: rect.right } };
          }
        }
        // Also check for any fixed positioned elements that look like FABs
        const fixed = Array.from(document.querySelectorAll('*')).filter(el => {
          const s = window.getComputedStyle(el);
          return s.position === 'fixed' && el.tagName !== 'SCRIPT';
        });
        return { found: false, fixedElements: fixed.map(el => ({ tag: el.tagName, class: el.className?.substring?.(0, 60), text: el.textContent?.substring?.(0, 30) })).slice(0, 5) };
      });

      if (fabByPosition.found) {
        log('FAB button found', 'PASS', `Text: "${fabByPosition.text}", Class: ${fabByPosition.class}`);
      } else {
        log('FAB button found', 'INFO', `No FAB found. Fixed elements: ${JSON.stringify(fabByPosition.fixedElements)}`);
      }
    }

    // Try clicking any FAB-like button
    const allButtons = await page.$$('button');
    let fabClicked = false;
    for (const btn of allButtons) {
      const info = await btn.evaluate(b => {
        const s = window.getComputedStyle(b);
        const r = b.getBoundingClientRect();
        return {
          position: s.position,
          borderRadius: s.borderRadius,
          bottom: r.bottom,
          right: r.right,
          width: r.width,
          height: r.height,
          text: b.textContent.trim().substring(0, 30),
          class: (b.className || '').substring(0, 60)
        };
      });
      // FABs are typically fixed, circular (border-radius ~50%), bottom-right
      if (info.position === 'fixed' || (info.bottom > 700 && info.right > 1200 && info.borderRadius.includes('50%'))) {
        await btn.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-fab-overlay.png`, fullPage: false });
        fabClicked = true;
        log('FAB overlay opened', 'PASS', `Clicked button: "${info.text}" (${info.class})`);

        // Check for suggestion tiles with warm colors
        const tiles = await page.evaluate(() => {
          const tileEls = Array.from(document.querySelectorAll('[class*="tile"], [class*="Tile"], [class*="suggestion"], [class*="Suggestion"], [class*="chip"], [class*="Chip"]'));
          return tileEls.map(t => {
            const s = window.getComputedStyle(t);
            return { text: t.textContent.trim().substring(0, 50), bg: s.backgroundColor, border: s.borderColor, class: (t.className || '').substring(0, 60) };
          });
        });

        if (tiles.length > 0) {
          log('Suggestion tiles in overlay', 'PASS', `Found ${tiles.length} tiles. Colors: ${tiles.slice(0, 3).map(t => t.bg).join(', ')}`);
        } else {
          log('Suggestion tiles in overlay', 'WARN', 'No tile elements found in overlay');
        }
        break;
      }
    }

    if (!fabClicked) {
      log('FAB overlay', 'WARN', 'Could not find/click FAB button');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-no-fab.png`, fullPage: false });
    }
  } catch (e) {
    log('FAB overlay', 'ERROR', e.message);
  }

  // ===== CHECK 5: Mobile Web App =====
  console.log('\n=== CHECK 5: Mobile Web App ===');

  // Create mobile context
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  const mobileNetworkFailures = [];
  mobilePage.on('response', resp => {
    if (resp.status() >= 400) {
      mobileNetworkFailures.push({ url: resp.url(), status: resp.status() });
    }
  });

  await mobilePage.goto(BASE + '/mobile', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: `${SCREENSHOTS_DIR}/05-mobile-home.png`, fullPage: false });

  // Check tabs
  const tabs = await mobilePage.evaluate(() => {
    // Look for tab-like navigation elements
    const navItems = Array.from(document.querySelectorAll('[class*="tab"], [class*="Tab"], [role="tab"], [class*="nav"] button, [class*="Nav"] button, [class*="bottom"] button, [class*="Bottom"] button, nav button, nav a'));
    return navItems.map(el => ({
      text: el.textContent.trim().substring(0, 30),
      class: (el.className || '').substring(0, 60),
      visible: el.offsetWidth > 0,
    }));
  });

  const expectedTabs = ['Home', 'Alerts', 'Floor', 'Chat', 'Actions'];
  const foundTabNames = tabs.map(t => t.text);
  const missingTabs = expectedTabs.filter(t => !foundTabNames.some(f => f.toLowerCase().includes(t.toLowerCase())));

  if (missingTabs.length === 0) {
    log('Mobile tabs (all 5)', 'PASS', `Found all tabs: ${foundTabNames.join(', ')}`);
  } else {
    log('Mobile tabs', missingTabs.length < 3 ? 'WARN' : 'FAIL', `Missing: ${missingTabs.join(', ')}. Found: ${foundTabNames.join(', ')}`);
  }

  // Test each tab
  for (const tabName of expectedTabs) {
    try {
      const tabEl = await mobilePage.$(`text=${tabName}`);
      if (!tabEl) {
        // Try alternative selectors
        const altTab = await mobilePage.$(`[aria-label="${tabName}"], button:has-text("${tabName}"), a:has-text("${tabName}")`);
        if (altTab) {
          await altTab.click();
        } else {
          log(`Mobile tab: ${tabName}`, 'WARN', 'Tab element not found');
          continue;
        }
      } else {
        await tabEl.click();
      }
      await mobilePage.waitForTimeout(1500);
      await mobilePage.screenshot({ path: `${SCREENSHOTS_DIR}/05-mobile-${tabName.toLowerCase()}.png`, fullPage: false });
      log(`Mobile tab: ${tabName}`, 'PASS', 'Tab navigated and screenshot taken');

      // Special checks for Chat tab
      if (tabName === 'Chat') {
        const chatTiles = await mobilePage.evaluate(() => {
          const tiles = Array.from(document.querySelectorAll('[class*="tile"], [class*="Tile"], [class*="grid"] > *, [class*="Grid"] > *, [class*="chip"], [class*="card"]'));
          return tiles.map(t => ({
            text: t.textContent.trim().substring(0, 60),
            class: (t.className || '').substring(0, 60)
          })).filter(t => t.text.length > 0);
        });

        if (chatTiles.length > 0) {
          log('Mobile chat tiles grid', 'PASS', `Found ${chatTiles.length} tiles: ${chatTiles.slice(0, 3).map(t => t.text).join(', ')}`);

          // Tap first tile to send query
          try {
            const firstTile = await mobilePage.$('[class*="tile"], [class*="Tile"], [class*="grid"] > :first-child, [class*="Grid"] > :first-child, [class*="chip"]:first-of-type');
            if (firstTile) {
              await firstTile.click();
              await mobilePage.waitForTimeout(3000);
              await mobilePage.screenshot({ path: `${SCREENSHOTS_DIR}/05-mobile-chat-response.png`, fullPage: false });
              log('Mobile chat tile tap', 'PASS', 'Tapped tile and waited for response');
            }
          } catch (e) {
            log('Mobile chat tile tap', 'WARN', e.message);
          }
        } else {
          log('Mobile chat tiles grid', 'WARN', 'No chat tiles found');
        }
      }
    } catch (e) {
      log(`Mobile tab: ${tabName}`, 'ERROR', e.message);
    }
  }

  // Check for inventory cards with product images
  try {
    // Navigate to Home or a page with inventory cards
    const homeTab = await mobilePage.$('text=Home');
    if (homeTab) await homeTab.click();
    await mobilePage.waitForTimeout(1500);

    const inventoryCards = await mobilePage.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[class*="card"], [class*="Card"], [class*="inventory"], [class*="Inventory"], [class*="product"], [class*="Product"]'));
      const imgs = Array.from(document.querySelectorAll('img'));
      return {
        cardCount: cards.length,
        imgCount: imgs.length,
        images: imgs.map(i => ({ src: i.src, natural: i.naturalWidth, alt: i.alt })).filter(i => i.src),
      };
    });

    log('Mobile inventory cards', inventoryCards.cardCount > 0 ? 'PASS' : 'INFO',
      `${inventoryCards.cardCount} cards, ${inventoryCards.imgCount} images. Sample: ${inventoryCards.images.slice(0, 3).map(i => i.src.split('/').pop()).join(', ')}`);

    // Check for broken images
    const brokenMobileImgs = inventoryCards.images.filter(i => i.natural === 0);
    if (brokenMobileImgs.length > 0) {
      log('Mobile broken images', 'FAIL', `${brokenMobileImgs.length} broken: ${brokenMobileImgs.map(i => i.src.split('/').pop()).join(', ')}`);
    }
  } catch (e) {
    log('Mobile inventory cards', 'ERROR', e.message);
  }

  // Check transfer buttons
  try {
    // Navigate to a page that might have transfer buttons
    const floorTab = await mobilePage.$('text=Floor');
    if (floorTab) {
      await floorTab.click();
      await mobilePage.waitForTimeout(1500);
    }

    const transferBtns = await mobilePage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.filter(b => {
        const text = b.textContent.toLowerCase();
        return text.includes('transfer') || text.includes('move') || text.includes('send');
      }).map(b => ({
        text: b.textContent.trim().substring(0, 50),
        class: (b.className || '').substring(0, 60),
        disabled: b.disabled,
      }));
    });

    if (transferBtns.length > 0) {
      log('Transfer buttons found', 'PASS', `${transferBtns.length} buttons: ${transferBtns.map(b => b.text).join(', ')}`);

      // Try clicking first transfer button
      const btn = await mobilePage.$('button:has-text("Transfer"), button:has-text("transfer")');
      if (btn) {
        await btn.click();
        await mobilePage.waitForTimeout(1500);
        await mobilePage.screenshot({ path: `${SCREENSHOTS_DIR}/05-mobile-transfer-confirm.png`, fullPage: false });

        // Check for confirmation dialog
        const confirmDialog = await mobilePage.evaluate(() => {
          const dialogs = Array.from(document.querySelectorAll('[class*="modal"], [class*="Modal"], [class*="dialog"], [class*="Dialog"], [class*="confirm"], [class*="Confirm"], [role="dialog"], [class*="overlay"]'));
          return dialogs.map(d => ({
            text: d.textContent.trim().substring(0, 100),
            class: (d.className || '').substring(0, 60),
            visible: d.offsetWidth > 0,
          })).filter(d => d.visible);
        });

        if (confirmDialog.length > 0) {
          log('Transfer confirmation', 'PASS', `Confirmation shown: "${confirmDialog[0].text.substring(0, 60)}"`);
        } else {
          log('Transfer confirmation', 'WARN', 'No confirmation dialog detected after clicking transfer');
        }
      }
    } else {
      // Also check on Actions tab
      const actionsTab = await mobilePage.$('text=Actions');
      if (actionsTab) {
        await actionsTab.click();
        await mobilePage.waitForTimeout(1500);

        const actionTransferBtns = await mobilePage.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          return btns.filter(b => b.textContent.toLowerCase().includes('transfer')).map(b => b.textContent.trim().substring(0, 50));
        });
        log('Transfer buttons (Actions tab)', actionTransferBtns.length > 0 ? 'PASS' : 'INFO',
          actionTransferBtns.length > 0 ? `Found: ${actionTransferBtns.join(', ')}` : 'No transfer buttons on Actions tab either');
      }
    }
  } catch (e) {
    log('Transfer buttons', 'ERROR', e.message);
  }

  // Check mobile 404s
  const mobile404s = mobileNetworkFailures.filter(f => f.url.includes('.png') || f.url.includes('.jpg') || f.url.includes('.webp') || f.url.includes('brand'));
  if (mobile404s.length > 0) {
    log('Mobile image 404s', 'FAIL', `${mobile404s.length}: ${mobile404s.map(f => `${f.url.split('/').pop()} (${f.status})`).join(', ')}`);
  } else {
    log('Mobile image 404s', 'PASS', 'No image 404s on mobile');
  }

  // ===== FINAL SUMMARY =====
  console.log('\n\n========== QA CHECK SUMMARY ==========');
  const passes = results.filter(r => r.status === 'PASS').length;
  const fails = results.filter(r => r.status === 'FAIL').length;
  const warns = results.filter(r => r.status === 'WARN').length;
  const infos = results.filter(r => r.status === 'INFO').length;
  const errors = results.filter(r => r.status === 'ERROR').length;

  console.log(`PASS: ${passes}  |  FAIL: ${fails}  |  WARN: ${warns}  |  INFO: ${infos}  |  ERROR: ${errors}`);
  console.log('');

  for (const r of results) {
    const icon = r.status === 'PASS' ? 'OK' : r.status === 'FAIL' ? 'XX' : r.status === 'WARN' ? '??' : r.status === 'ERROR' ? '!!' : '--';
    console.log(`  [${icon}] ${r.check}: ${r.detail}`);
  }

  // Network failures summary
  const allNetworkFails = [...networkFailures, ...mobileNetworkFailures];
  if (allNetworkFails.length > 0) {
    console.log('\nAll Network Failures:');
    for (const f of allNetworkFails) {
      console.log(`  ${f.status} ${f.url}`);
    }
  }

  await browser.close();
  console.log('\nScreenshots saved to: ' + SCREENSHOTS_DIR);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
