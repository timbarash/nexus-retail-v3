import { useEffect, useRef } from 'react';
import NexusIcon from '../components/NexusIcon';

/* ─── DexSpiral (copied from DesignStudy for standalone use) ─── */
function DexSpiral({ size = 48, style = {} }) {
  const id = `dex-spiral-cts-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      <path
        d="M50 95 A45 45 0 0 1 5 50 A27.8 27.8 0 0 1 32.8 22.2 A17.2 17.2 0 0 1 50 39.4 A10.6 10.6 0 0 1 39.4 50 A6.6 6.6 0 0 1 46 56.6 A4 4 0 0 1 50 52.6 A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── ConnectIcon (copied from DesignStudy for standalone use) ─── */
function ConnectIcon({ size = 48, style = {} }) {
  const id = `connect-grad-cts-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <rect x="12" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <rect x="48" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <circle cx="32" cy="50" r="4" fill="#00C27C" />
      <circle cx="68" cy="50" r="4" fill="#64A8E0" />
    </svg>
  );
}

/* ─── Relative luminance helper (WCAG 2.1) ─── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ─── SubTitle (matching DesignStudy convention) ─── */
function SubTitle({ children, color = '#6B6359' }) {
  return (
    <h3 style={{
      fontSize: 14, fontWeight: 600, color,
      textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24,
    }}>
      {children}
    </h3>
  );
}

/* ─── Theme Palette Card ─── */
function ThemePalette({ name, description, colors, labelColor = '#ADA599', labelFaintColor = '#6B6359' }) {
  return (
    <div style={{
      background: colors.background, borderRadius: 16, padding: 28,
      border: `1px solid ${colors.border}`, marginBottom: 24,
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: colors.textPrimary, marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 13, color: colors.textSecondary }}>{description}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 12 }}>
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 10, background: value,
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }} />
            <span style={{ fontSize: 10, color: labelColor, fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span style={{ fontSize: 9, color: labelFaintColor, fontFamily: 'monospace' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export function ColorTypographySection({ theme = 'dark' }) {
  const themes = {
    dark: {
      bg: '#0A0908', cardBg: '#141210', border: '#282724',
      text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359',
      accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666',
      accentGreen: '#00C27C',
    },
    light: {
      bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC',
      text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680',
      accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E',
      accentGreen: '#059669',
    }
  };
  const t = themes[theme];

  const orbitRef = useRef(null);

  /* Load additional Google Fonts */
  useEffect(() => {
    const fonts = [
      { id: 'font-space-grotesk', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap' },
      { id: 'font-playfair', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
      { id: 'font-jetbrains', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' },
      { id: 'font-inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      { id: 'font-dm-sans', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap' },
    ];
    fonts.forEach(f => {
      if (!document.getElementById(f.id)) {
        const link = document.createElement('link');
        link.id = f.id;
        link.rel = 'stylesheet';
        link.href = f.href;
        document.head.appendChild(link);
      }
    });
  }, []);

  /* Inject keyframes for orbital animation */
  useEffect(() => {
    if (!document.getElementById('cts-keyframes')) {
      const style = document.createElement('style');
      style.id = 'cts-keyframes';
      style.textContent = `
        @keyframes cts-orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes cts-orbit-reverse {
          from { transform: rotate(120deg) translateX(120px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(120px) rotate(-480deg); }
        }
        @keyframes cts-orbit-offset {
          from { transform: rotate(240deg) translateX(120px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(120px) rotate(-600deg); }
        }
        @keyframes cts-pulse-ring {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  /* ─── Theme definitions ─── */
  const themeExplorations = [
    {
      name: 'Current Warm Dark',
      description: 'The established palette: warm blacks with gold and green accents',
      colors: {
        background: '#0A0908', surface: '#141210', card: '#1C1B1A', border: '#38332B',
        textPrimary: '#F0EDE8', textSecondary: '#ADA599',
        accent1: '#D4A03A', accent2: '#00C27C',
        success: '#00C27C', warning: '#FFC02A', error: '#E87068',
      },
    },
    {
      name: 'Cool Dark',
      description: 'Ice blue with silver: a colder, more clinical tech feel',
      colors: {
        background: '#0A0B10', surface: '#12131A', card: '#1A1B24', border: '#2A2C3A',
        textPrimary: '#E8ECF0', textSecondary: '#9AA0AD',
        accent1: '#7CB9E8', accent2: '#C0C0C0',
        success: '#4ADE80', warning: '#FBBF24', error: '#F87171',
      },
    },
    {
      name: 'Midnight',
      description: 'GitHub-inspired deep blue with violet and cyan accents',
      colors: {
        background: '#0D1117', surface: '#161B22', card: '#1C2128', border: '#30363D',
        textPrimary: '#E6EDF3', textSecondary: '#8B949E',
        accent1: '#8B5CF6', accent2: '#06B6D4',
        success: '#3FB950', warning: '#D29922', error: '#F85149',
      },
    },
    {
      name: 'Forest',
      description: 'Deep green base with emerald and warm white: organic and grounded',
      colors: {
        background: '#0A1208', surface: '#121A10', card: '#1A2218', border: '#2A3628',
        textPrimary: '#FFF8F0', textSecondary: '#B0A898',
        accent1: '#10B981', accent2: '#FFF8F0',
        success: '#34D399', warning: '#F59E0B', error: '#EF4444',
      },
    },
  ];

  /* ─── Gradient definitions ─── */
  const gradients = [
    { name: 'Gold Sunset', colors: '#D4A03A, #FFC02A, #FFD666' },
    { name: 'Green Energy', colors: '#00C27C, #00E08E, #A7F3D0' },
    { name: 'Ocean Depth', colors: '#64A8E0, #3B82F6, #1E40AF' },
    { name: 'Warm Ember', colors: '#E87068, #F97316, #FFC02A' },
    { name: 'Purple Haze', colors: '#B598E8, #8B5CF6, #6D28D9' },
    { name: 'Northern Lights', colors: '#00C27C, #64A8E0, #B598E8' },
    { name: 'Monochrome', colors: '#F0EDE8, #ADA599, #6B6359' },
    { name: 'Brand Trio', colors: '#D4A03A, #00C27C, #64A8E0' },
  ];

  /* ─── Contrast pairs ─── */
  const contrastTests = [
    { fg: '#F0EDE8', fgName: 'Primary Text', bgs: ['#0A0908', '#141210', '#1C1B1A'] },
    { fg: '#ADA599', fgName: 'Secondary Text', bgs: ['#0A0908', '#141210', '#1C1B1A'] },
    { fg: '#6B6359', fgName: 'Muted Text', bgs: ['#0A0908', '#141210', '#1C1B1A'] },
    { fg: '#D4A03A', fgName: 'Gold Accent', bgs: ['#0A0908', '#141210'] },
    { fg: '#00C27C', fgName: 'Green Accent', bgs: ['#0A0908', '#141210'] },
  ];

  /* ─── Font pairings ─── */
  const fontPairings = [
    {
      name: 'DM Sans + Inter',
      tag: 'Current geometric pairing',
      headingFamily: "'DM Sans', sans-serif",
      headingWeight: 600,
      bodyFamily: "'Inter', sans-serif",
      bodyWeight: 400,
    },
    {
      name: 'Space Grotesk + DM Sans',
      tag: 'Tech-forward',
      headingFamily: "'Space Grotesk', sans-serif",
      headingWeight: 600,
      bodyFamily: "'DM Sans', sans-serif",
      bodyWeight: 400,
    },
    {
      name: 'Playfair Display + DM Sans',
      tag: 'Luxury / premium feel',
      headingFamily: "'Playfair Display', serif",
      headingWeight: 600,
      bodyFamily: "'DM Sans', sans-serif",
      bodyWeight: 400,
    },
    {
      name: 'JetBrains Mono + DM Sans',
      tag: 'Developer / technical',
      headingFamily: "'JetBrains Mono', monospace",
      headingWeight: 600,
      bodyFamily: "'DM Sans', sans-serif",
      bodyWeight: 400,
    },
  ];

  /* ─── Type scale ─── */
  const typeScale = [
    { name: 'Display', size: 56, lineHeight: 1.1, letterSpacing: '-0.03em', weight: 300 },
    { name: 'H1', size: 40, lineHeight: 1.15, letterSpacing: '-0.02em', weight: 300 },
    { name: 'H2', size: 32, lineHeight: 1.2, letterSpacing: '-0.01em', weight: 400 },
    { name: 'H3', size: 24, lineHeight: 1.3, letterSpacing: '0em', weight: 500 },
    { name: 'H4', size: 18, lineHeight: 1.4, letterSpacing: '0.01em', weight: 600 },
    { name: 'Body', size: 15, lineHeight: 1.6, letterSpacing: '0.01em', weight: 400 },
    { name: 'Small', size: 13, lineHeight: 1.5, letterSpacing: '0.01em', weight: 400 },
    { name: 'Caption', size: 11, lineHeight: 1.4, letterSpacing: '0.04em', weight: 500 },
  ];

  /* ─── Product items for hierarchy displays ─── */
  const products = [
    { icon: <NexusIcon size={28} />, name: 'Nexus', sub: 'Platform', accent: '#D4A03A', fontWeight: 300, letterSpacing: '0.06em' },
    { icon: <DexSpiral size={28} />, name: 'Dex', sub: 'Intelligence', accent: '#FFC02A', fontWeight: 500, letterSpacing: '0.04em' },
    { icon: <ConnectIcon size={28} />, name: 'Connect', sub: 'Network', accent: '#00C27C', fontWeight: 600, letterSpacing: '0.02em' },
  ];

  const divider = {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
    margin: '64px 0',
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', -apple-system, sans-serif" }}>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — EXPANDED COLOR SYSTEM
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: t.text, marginBottom: 12 }}>
          Expanded Color System
        </h2>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 560, marginBottom: 56 }}>
          A comprehensive exploration of color themes, gradients, and accessibility to guide the evolution of the brand palette.
        </p>

        {/* ─── Theme Explorations ─── */}
        <SubTitle color={t.textFaint}>Theme Explorations</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          Four complete palette options showing how different background temperatures and accent choices shift the brand personality.
        </p>

        {themeExplorations.map((te, i) => (
          <ThemePalette key={i} name={te.name} description={te.description} colors={te.colors} labelColor={t.textMuted} labelFaintColor={t.textFaint} />
        ))}

        <div style={divider} />

        {/* ─── Gradient Studies ─── */}
        <SubTitle color={t.textFaint}>Gradient Studies</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          Eight gradient combinations for use in accent bars, progress indicators, hero backgrounds, and decorative elements.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
          {gradients.map((g, i) => (
            <div key={i}>
              <div style={{
                width: '100%', height: 48, borderRadius: 12,
                background: `linear-gradient(90deg, ${g.colors})`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: t.textMuted }}>{i + 1}. {g.name}</span>
                <span style={{ fontSize: 11, color: t.textFaint, fontFamily: 'monospace' }}>{g.colors}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* ─── Contrast & Accessibility ─── */}
        <SubTitle color={t.textFaint}>Contrast &amp; Accessibility</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          WCAG AA compliance requires a contrast ratio of at least 4.5:1 for normal text. Each pair is tested below.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
          {contrastTests.map((test, ti) => (
            <div key={ti}>
              <div style={{ fontSize: 12, fontWeight: 600, color: test.fg, marginBottom: 10 }}>
                {test.fgName}
                <span style={{ fontFamily: 'monospace', fontWeight: 400, color: t.textFaint, marginLeft: 8 }}>{test.fg}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {test.bgs.map((bg, bi) => {
                  const ratio = contrastRatio(test.fg, bg);
                  const pass = ratio >= 4.5;
                  return (
                    <div key={bi} style={{
                      background: bg, borderRadius: 12, padding: '16px 20px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      minWidth: 200, flex: 1,
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 500, color: test.fg, marginBottom: 8 }}>
                        The quick brown fox
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6B6359' }}>
                          on {bg}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#ADA599' }}>
                            {ratio.toFixed(1)}:1
                          </span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                            padding: '2px 8px', borderRadius: 6,
                            color: pass ? '#0A0908' : '#F0EDE8',
                            background: pass ? '#00C27C' : '#E87068',
                          }}>
                            {pass ? 'PASS' : 'FAIL'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — TYPOGRAPHY DEEP DIVE
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: t.text, marginBottom: 12 }}>
          Typography Deep Dive
        </h2>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 560, marginBottom: 56 }}>
          Font pairings, type scale, and specimen explorations for the full design system.
        </p>

        {/* ─── Font Pairing Explorations ─── */}
        <SubTitle color={t.textFaint}>Font Pairing Explorations</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          Four heading + body combinations, each shifting the brand voice: geometric, tech, luxury, or developer.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginBottom: 56 }}>
          {fontPairings.map((pair, i) => (
            <div key={i} style={{
              background: t.cardBg, borderRadius: 16, padding: 28,
              border: `1px solid ${t.border}`,
            }}>
              {/* Pairing label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: t.accentGold,
                  background: 'rgba(212,160,58,0.1)', padding: '3px 10px',
                  borderRadius: 6, letterSpacing: '0.06em',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{pair.name}</span>
                <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 'auto' }}>{pair.tag}</span>
              </div>

              {/* Heading specimen */}
              <div style={{
                fontFamily: pair.headingFamily, fontWeight: pair.headingWeight,
                fontSize: 32, color: t.text, letterSpacing: '-0.01em',
                lineHeight: 1.2, marginBottom: 12,
              }}>
                Retail Intelligence
              </div>

              {/* Body specimen */}
              <div style={{
                fontFamily: pair.bodyFamily, fontWeight: pair.bodyWeight,
                fontSize: 15, color: t.textMuted, lineHeight: 1.65,
              }}>
                The next generation of cannabis retail analytics, powered by AI agents that monitor inventory,
                predict demand, and optimize pricing across your entire dispensary network in real time.
              </div>

              {/* Font metadata */}
              <div style={{
                marginTop: 16, paddingTop: 12,
                borderTop: `1px solid ${t.border}`,
                display: 'flex', gap: 24,
              }}>
                <div>
                  <div style={{ fontSize: 10, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Heading</div>
                  <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{pair.headingFamily.split("'")[1]} {pair.headingWeight}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Body</div>
                  <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{pair.bodyFamily.split("'")[1]} {pair.bodyWeight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* ─── Type Scale ─── */}
        <SubTitle color={t.textFaint}>Type Scale</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          Complete typographic hierarchy with pixel sizes, line heights, and letter spacing values for the DM Sans family.
        </p>

        <div style={{
          background: t.cardBg, borderRadius: 16, padding: 32,
          border: `1px solid ${t.border}`, marginBottom: 56,
          overflow: 'hidden',
        }}>
          {typeScale.map((ts, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 24,
              padding: '16px 0',
              borderBottom: i < typeScale.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              {/* Metadata column */}
              <div style={{ minWidth: 160, flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 4 }}>{ts.name}</div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: t.textFaint, lineHeight: 1.6 }}>
                  {ts.size}px / {ts.lineHeight} / {ts.letterSpacing}
                  <br />
                  weight: {ts.weight}
                </div>
              </div>

              {/* Specimen */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ts.size > 40 ? `clamp(24px, 4vw, ${ts.size}px)` : ts.size,
                fontWeight: ts.weight,
                lineHeight: ts.lineHeight,
                letterSpacing: ts.letterSpacing,
                color: t.text,
                whiteSpace: ts.size > 24 ? 'nowrap' : 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {ts.size >= 24 ? 'Retail Intelligence' : 'The quick brown fox jumps over the lazy dog'}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Scale visual representation ─── */}
        <SubTitle color={t.textFaint}>Scale Visualization</SubTitle>
        <div style={{
          background: t.cardBg, borderRadius: 16, padding: 32,
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'flex-end', gap: 12, justifyContent: 'center',
          minHeight: 200,
        }}>
          {typeScale.map((ts, i) => {
            const barHeight = (ts.size / 56) * 160;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, color: t.textFaint, fontFamily: 'monospace' }}>{ts.size}px</span>
                <div style={{
                  width: 40, height: barHeight, borderRadius: 6,
                  background: `linear-gradient(180deg, ${t.accentGold}, rgba(212,160,58,${0.2 + (i * 0.1)}))`,
                  transition: 'height 0.3s ease',
                }} />
                <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{ts.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — PRODUCT FAMILY DEEP DIVE
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: t.text, marginBottom: 12 }}>
          Product Family Deep Dive
        </h2>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 560, marginBottom: 56 }}>
          Hierarchy explorations and parent brand lockups for the Dutchie AI product suite.
        </p>

        {/* ─── Hierarchy Exploration 1: Horizontal Bar ─── */}
        <SubTitle color={t.textFaint}>Hierarchy 1 — Horizontal Bar</SubTitle>
        <div style={{
          background: t.cardBg, borderRadius: 16, padding: 32,
          border: `1px solid ${t.border}`, marginBottom: 40, textAlign: 'center',
        }}>
          {/* Parent brand */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 24,
          }}>
            <NexusIcon size={20} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 16, color: t.text, letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
          </div>

          {/* Connecting line */}
          <div style={{
            width: '60%', height: 1, margin: '0 auto 24px',
            background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
          }} />

          {/* Three products in a row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {products.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {p.icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: p.fontWeight, fontSize: 18,
                    letterSpacing: p.letterSpacing, color: t.text,
                  }}>
                    {p.name.toLowerCase()}
                  </div>
                  <div style={{ fontSize: 11, color: p.accent }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Hierarchy Exploration 2: Pyramid ─── */}
        <SubTitle color={t.textFaint}>Hierarchy 2 — Pyramid</SubTitle>
        <div style={{
          background: t.cardBg, borderRadius: 16, padding: 40,
          border: `1px solid ${t.border}`, marginBottom: 40, textAlign: 'center',
        }}>
          {/* Top tier: Dutchie AI */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(212,160,58,0.06)', border: '1px solid rgba(212,160,58,0.15)',
            borderRadius: 12, padding: '12px 24px', marginBottom: 32,
          }}>
            <NexusIcon size={24} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 20, color: t.text, letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
          </div>

          {/* Connector lines (visual) */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            marginBottom: 8, position: 'relative', height: 32,
          }}>
            <div style={{ width: 1, height: 16, background: t.border }} />
            {/* Horizontal bar */}
            <div style={{
              position: 'absolute', top: 16,
              width: '60%', height: 1, background: t.border,
            }} />
            {/* Three vertical drops */}
            {[-1, 0, 1].map(offset => (
              <div key={offset} style={{
                position: 'absolute', top: 16,
                left: `${50 + offset * 30}%`, transform: 'translateX(-50%)',
                width: 1, height: 16, background: t.border,
              }} />
            ))}
          </div>

          {/* Bottom tier: three products */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {products.map((p, i) => (
              <div key={i} style={{
                background: t.bg, borderRadius: 12, padding: '16px 24px',
                border: `1px solid ${p.accent}22`,
                minWidth: 140, textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{p.icon}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: p.fontWeight, fontSize: 16,
                  letterSpacing: p.letterSpacing, color: t.text,
                }}>
                  {p.name.toLowerCase()}
                </div>
                <div style={{ fontSize: 11, color: p.accent, marginTop: 2 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Hierarchy Exploration 3: Orbital ─── */}
        <SubTitle color={t.textFaint}>Hierarchy 3 — Orbital</SubTitle>
        <div style={{
          background: t.cardBg, borderRadius: 16, padding: 40,
          border: `1px solid ${t.border}`, marginBottom: 56,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          minHeight: 340,
        }}>
          <div ref={orbitRef} style={{ position: 'relative', width: 280, height: 280 }}>
            {/* Orbit ring */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 240, height: 240, borderRadius: '50%',
              border: `1px solid ${t.border}`,
              animation: 'cts-pulse-ring 4s ease-in-out infinite',
            }} />

            {/* Center: Dutchie AI */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              zIndex: 2,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: t.bg, border: `2px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(212,160,58,0.15)',
              }}>
                <NexusIcon size={28} />
              </div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                fontSize: 11, color: t.textMuted, letterSpacing: '0.04em',
              }}>
                Dutchie AI
              </span>
            </div>

            {/* Orbiting products */}
            {[
              { icon: <NexusIcon size={20} />, name: 'Nexus', accent: '#D4A03A', anim: 'cts-orbit 12s linear infinite' },
              { icon: <DexSpiral size={20} />, name: 'Dex', accent: '#FFC02A', anim: 'cts-orbit-reverse 12s linear infinite' },
              { icon: <ConnectIcon size={20} />, name: 'Connect', accent: '#00C27C', anim: 'cts-orbit-offset 12s linear infinite' },
            ].map((item, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: '50%',
                marginTop: -22, marginLeft: -22,
                animation: item.anim,
                zIndex: 3,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: t.bg, border: `2px solid ${item.accent}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 16px ${item.accent}22`,
                }}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={divider} />

        {/* ─── Parent Brand Lockups ─── */}
        <SubTitle color={t.textFaint}>Parent Brand Lockups</SubTitle>
        <p style={{ fontSize: 13, color: t.textFaint, marginBottom: 24, marginTop: -12, lineHeight: 1.6 }}>
          Four presentation styles for the Dutchie AI parent brand — text only, logo + text, stacked, and monogram badge.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 56 }}>

          {/* Lockup 1: Text Only */}
          <div style={{
            background: t.cardBg, borderRadius: 16, padding: 32,
            border: `1px solid ${t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 160,
          }}>
            <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Text Only
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 28, color: t.text, letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
          </div>

          {/* Lockup 2: Logo + Text */}
          <div style={{
            background: t.cardBg, borderRadius: 16, padding: 32,
            border: `1px solid ${t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 160,
          }}>
            <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Logo + Text
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <NexusIcon size={32} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                fontSize: 24, color: t.text, letterSpacing: '0.02em',
              }}>
                Dutchie AI
              </span>
            </div>
          </div>

          {/* Lockup 3: Stacked */}
          <div style={{
            background: t.cardBg, borderRadius: 16, padding: 32,
            border: `1px solid ${t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 160,
          }}>
            <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Stacked
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <NexusIcon size={40} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                fontSize: 20, color: t.text, letterSpacing: '0.02em',
              }}>
                Dutchie AI
              </span>
            </div>
          </div>

          {/* Lockup 4: Badge / Monogram */}
          <div style={{
            background: t.cardBg, borderRadius: 16, padding: 32,
            border: `1px solid ${t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 160,
          }}>
            <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Monogram Badge
            </div>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(212,160,58,0.12), rgba(0,194,124,0.06))',
              border: '2px solid rgba(212,160,58,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(212,160,58,0.15), inset 0 0 20px rgba(0,0,0,0.3)',
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 32, color: t.accentGold,
                lineHeight: 1,
              }}>
                D
              </span>
            </div>
          </div>
        </div>

        {/* ─── Lockup on various backgrounds ─── */}
        <SubTitle color={t.textFaint}>Lockup Context Tests</SubTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {/* On pure black */}
          <div style={{
            background: '#0A0908', borderRadius: 16, padding: 32,
            border: '1px solid #282724',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <NexusIcon size={24} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 20, color: '#F0EDE8', letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
            <span style={{ fontSize: 10, color: '#6B6359', marginLeft: 8, fontFamily: 'monospace' }}>on #0A0908</span>
          </div>

          {/* On card surface */}
          <div style={{
            background: '#1C1B1A', borderRadius: 16, padding: 32,
            border: '1px solid #38332B',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <NexusIcon size={24} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 20, color: '#F0EDE8', letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
            <span style={{ fontSize: 10, color: '#6B6359', marginLeft: 8, fontFamily: 'monospace' }}>on #1C1B1A</span>
          </div>

          {/* On white (inverse) */}
          <div style={{
            background: '#F0EDE8', borderRadius: 16, padding: 32,
            border: '1px solid #E0DDD8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <NexusIcon size={24} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 20, color: '#141210', letterSpacing: '0.02em',
            }}>
              Dutchie AI
            </span>
            <span style={{ fontSize: 10, color: '#ADA599', marginLeft: 8, fontFamily: 'monospace' }}>on #F0EDE8</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorTypographySection;
