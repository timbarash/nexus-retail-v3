// ============================================================================
// BrandShowcase — Premium Brand Identity Hero Component
//
// The first thing anyone sees on the design study page. An elite brand agency
// deliverable showcasing the full Dutchie product suite with premium iconography,
// detailed specimen layouts, and a cohesive visual family presentation.
//
// Export: BrandShowcase({ theme = 'dark' })
// ============================================================================

import { useId } from 'react';

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857' },
};

const productColors = {
  dex: { primary: '#D4A03A', light: '#FFC02A', lighter: '#FFD666', glow: 'rgba(212,160,58,0.3)' },
  nexus: { primary: '#1A7A5A', light: '#2A9A6A', lighter: '#3ABA7A', glow: 'rgba(26,122,90,0.3)' },
  connect: { primary: '#0891B2', light: '#06B6D4', lighter: '#22D3EE', glow: 'rgba(8,145,178,0.3)' },
  ecommerce: { primary: '#00C27C', light: '#34D399', lighter: '#6EE7B7', glow: 'rgba(0,194,124,0.3)' },
  loyalty: { primary: '#D97706', light: '#F59E0B', lighter: '#FCD34D', glow: 'rgba(217,119,6,0.3)' },
  retail: { primary: '#059669', light: '#10B981', lighter: '#34D399', glow: 'rgba(5,150,105,0.3)' },
};

// ── SVG Icon Components ──────────────────────────────────────────────────────

function DexIcon({ size = 48 }) {
  const id = useId();
  const gId = `dex-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      <path
        d="M50 95 A45 45 0 0 1 5 50 A27.8 27.8 0 0 1 32.8 22.2 A17.2 17.2 0 0 1 50 39.4 A10.6 10.6 0 0 1 39.4 50 A6.6 6.6 0 0 1 46 56.6 A4 4 0 0 1 50 52.6 A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${gId})`} strokeWidth="3" strokeLinecap="round" fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${gId})`} />
    </svg>
  );
}

function NexusIcon({ size = 48 }) {
  const id = useId();
  const gId = `nexus-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={productColors.nexus.primary} />
          <stop offset="50%" stopColor={productColors.nexus.light} />
          <stop offset="100%" stopColor={productColors.nexus.lighter} />
        </linearGradient>
      </defs>
      {/* Central hexagon */}
      <polygon points="50,18 72,32 72,60 50,74 28,60 28,32" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      {/* Top-right hexagon */}
      <polygon points="72,8 88,18 88,38 72,48 56,38 56,18" stroke={`url(#${gId})`} strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.7" />
      {/* Bottom-left hexagon */}
      <polygon points="28,52 44,62 44,82 28,92 12,82 12,62" stroke={`url(#${gId})`} strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.7" />
      {/* Connection nodes */}
      <circle cx="50" cy="46" r="3" fill={productColors.nexus.light} />
      <circle cx="72" cy="33" r="2.5" fill={productColors.nexus.light} opacity="0.7" />
      <circle cx="28" cy="67" r="2.5" fill={productColors.nexus.light} opacity="0.7" />
      {/* Neural connection lines */}
      <line x1="52" y1="44" x2="70" y2="35" stroke={productColors.nexus.light} strokeWidth="1.5" opacity="0.4" />
      <line x1="48" y1="48" x2="30" y2="65" stroke={productColors.nexus.light} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function ConnectIcon({ size = 48 }) {
  const id = useId();
  const gId = `connect-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="0" y1="30" x2="100" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={productColors.connect.primary} />
          <stop offset="100%" stopColor={productColors.connect.lighter} />
        </linearGradient>
      </defs>
      {/* Two interlocking rings */}
      <circle cx="38" cy="50" r="24" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" />
      <circle cx="62" cy="50" r="24" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" />
      {/* Bridge bar in overlap zone */}
      <rect x="44" y="44" width="12" height="12" rx="3" fill={productColors.connect.primary} opacity="0.25" />
      {/* Connection dots */}
      <circle cx="38" cy="50" r="3" fill={productColors.connect.light} />
      <circle cx="62" cy="50" r="3" fill={productColors.connect.lighter} />
      <circle cx="50" cy="50" r="2" fill="#fff" opacity="0.6" />
    </svg>
  );
}

function EcommerceIcon({ size = 48 }) {
  const id = useId();
  const gId = `ecom-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={productColors.ecommerce.primary} />
          <stop offset="100%" stopColor={productColors.ecommerce.lighter} />
        </linearGradient>
      </defs>
      {/* Storefront body */}
      <rect x="20" y="42" width="60" height="44" rx="4" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" />
      {/* Awning */}
      <path d="M16 42 L50 14 L84 42" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Scalloped awning detail */}
      <path d="M22 42 Q33 52 44 42 Q55 52 66 42 Q77 52 78 42" stroke={productColors.ecommerce.light} strokeWidth="2" fill="none" opacity="0.5" />
      {/* Door */}
      <rect x="40" y="62" width="20" height="24" rx="3" stroke={`url(#${gId})`} strokeWidth="2" fill="none" />
      {/* Window */}
      <rect x="26" y="50" width="12" height="10" rx="2" stroke={productColors.ecommerce.light} strokeWidth="1.5" fill="none" opacity="0.6" />
      <rect x="62" y="50" width="12" height="10" rx="2" stroke={productColors.ecommerce.light} strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Door handle */}
      <circle cx="55" cy="74" r="1.5" fill={productColors.ecommerce.light} />
    </svg>
  );
}

function LoyaltyIcon({ size = 48 }) {
  const id = useId();
  const gId = `loyalty-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={productColors.loyalty.primary} />
          <stop offset="50%" stopColor={productColors.loyalty.light} />
          <stop offset="100%" stopColor={productColors.loyalty.lighter} />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M50 12 L82 28 L82 58 C82 72 68 84 50 92 C32 84 18 72 18 58 L18 28 Z"
        stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" strokeLinejoin="round"
      />
      {/* Star inside shield */}
      <polygon
        points="50,30 56,44 72,46 60,56 64,72 50,64 36,72 40,56 28,46 44,44"
        stroke={productColors.loyalty.light} strokeWidth="2" fill="none" strokeLinejoin="round"
      />
      {/* Center fill dot */}
      <circle cx="50" cy="52" r="3" fill={productColors.loyalty.light} opacity="0.5" />
    </svg>
  );
}

function RetailIcon({ size = 48 }) {
  const id = useId();
  const gId = `retail-bs-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={productColors.retail.primary} />
          <stop offset="100%" stopColor={productColors.retail.lighter} />
        </linearGradient>
      </defs>
      {/* Terminal body */}
      <rect x="18" y="22" width="64" height="50" rx="6" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" />
      {/* Screen */}
      <rect x="26" y="30" width="48" height="24" rx="3" stroke={productColors.retail.light} strokeWidth="2" fill="none" opacity="0.6" />
      {/* Screen content lines */}
      <line x1="32" y1="38" x2="56" y2="38" stroke={productColors.retail.light} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      <line x1="32" y1="44" x2="48" y2="44" stroke={productColors.retail.light} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
      <line x1="32" y1="50" x2="42" y2="50" stroke={productColors.retail.lighter} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      {/* Amount display */}
      <circle cx="64" cy="44" r="5" stroke={productColors.retail.light} strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Card slot */}
      <rect x="32" y="60" width="36" height="6" rx="2" stroke={`url(#${gId})`} strokeWidth="2" fill="none" />
      {/* Base / stand */}
      <path d="M38 72 L38 82 L62 82 L62 72" stroke={`url(#${gId})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="34" y1="82" x2="66" y2="82" stroke={`url(#${gId})`} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Product Data ─────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    key: 'dex',
    name: 'Dex',
    tagline: 'The AI Agent',
    descriptor: 'Intelligence that learns your business and acts on your behalf',
    voice: '"Blue Dream is your top seller this week -- up 23%. Want me to reorder?"',
    Icon: DexIcon,
    colors: productColors.dex,
  },
  {
    key: 'nexus',
    name: 'Nexus',
    tagline: 'Intelligent POS',
    descriptor: 'The connected data platform powering every transaction',
    voice: '"All systems connected. 12 integrations active, zero sync failures."',
    Icon: NexusIcon,
    colors: productColors.nexus,
  },
  {
    key: 'connect',
    name: 'Connect',
    tagline: 'Integration Hub',
    descriptor: 'Bridges brands, retailers, and the supply chain',
    voice: '"3 new brand partners matched to your top-selling categories."',
    Icon: ConnectIcon,
    colors: productColors.connect,
  },
  {
    key: 'ecommerce',
    name: 'E-Commerce',
    tagline: 'Online Ordering',
    descriptor: 'Menus, marketplace, and payments that convert',
    voice: '"Online orders up 34% this month. Your Express Pickup flow converts at 82%."',
    Icon: EcommerceIcon,
    colors: productColors.ecommerce,
  },
  {
    key: 'loyalty',
    name: 'Loyalty',
    tagline: 'Customer Retention',
    descriptor: 'Rewards, profiles, and promotions that bring people back',
    voice: '"Your VIP tier drove 3x repeat visits. 420 members earned gold status."',
    Icon: LoyaltyIcon,
    colors: productColors.loyalty,
  },
  {
    key: 'retail',
    name: 'Retail',
    tagline: 'In-Store Operations',
    descriptor: 'The register, the floor, the full in-store experience',
    voice: '"Checkout time averaged 47 seconds today. Fastest in your region."',
    Icon: RetailIcon,
    colors: productColors.retail,
  },
];

// ── Section Divider ──────────────────────────────────────────────────────────

function SectionDivider({ t }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
      margin: '80px 0',
    }} />
  );
}

// ── Section Header ───────────────────────────────────────────────────────────

function SectionLabel({ children, t }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: t.accentGold, marginBottom: 12,
      fontFamily: FONT,
    }}>
      {children}
    </div>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function BrandShowcase({ theme = 'dark' }) {
  const t = themes[theme];
  const isDark = theme === 'dark';

  return (
    <div style={{
      fontFamily: FONT, color: t.text, maxWidth: 960, margin: '0 auto',
      padding: '60px 0 40px',
    }}>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: BRAND HERO
          ══════════════════════════════════════════════════════════════════ */}

      {/* Overline */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '6px 20px', borderRadius: 100,
          background: `${t.accentGold}10`,
          border: `1px solid ${t.accentGold}25`,
          marginBottom: 28,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: `linear-gradient(135deg, ${productColors.dex.primary}, ${productColors.dex.lighter})`,
            boxShadow: `0 0 8px ${productColors.dex.glow}`,
          }} />
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: t.accentGold,
          }}>
            Brand Identity System
          </span>
        </div>

        <h1 style={{
          fontSize: 44, fontWeight: 300, color: t.text, margin: '0 0 16px',
          letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>
          Dutchie Product Suite
        </h1>

        <p style={{
          fontSize: 16, color: t.textMuted, lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 8px',
          fontWeight: 400, letterSpacing: '0.01em',
        }}>
          Intelligence woven through every touchpoint
        </p>

        <p style={{
          fontSize: 12, color: t.textFaint, lineHeight: 1.6,
          maxWidth: 520, margin: '0 auto',
        }}>
          Six products. One design language. A unified family with individual character, <br />
          anchored by Dex -- the AI that powers it all.
        </p>
      </div>

      {/* ── Product Constellation ── */}
      {/* Dex at center with products radiating outward, connected by flow lines */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 520,
        marginBottom: 24,
      }}>
        {/* Background radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300, height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${productColors.dex.glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Orbit rings */}
        {[160, 230].map((r, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: r * 2, height: r * 2,
            borderRadius: '50%',
            border: `1px solid ${t.border}`,
            opacity: i === 0 ? 0.6 : 0.3,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Center: Dex */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          zIndex: 3,
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: isDark
              ? `radial-gradient(circle at 40% 40%, #1A1710, #0E0D0A)`
              : `radial-gradient(circle at 40% 40%, #FFF9EE, #F5F0E4)`,
            border: `2px solid ${productColors.dex.primary}40`,
            boxShadow: `0 0 40px ${productColors.dex.glow}, 0 0 80px ${productColors.dex.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
          }}>
            <DexIcon size={56} />
          </div>
          <span style={{
            fontSize: 18, fontWeight: 700, color: productColors.dex.light,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            Dex
          </span>
          <span style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>
            The AI Agent
          </span>
        </div>

        {/* Surrounding products positioned in a constellation */}
        {(() => {
          const positions = [
            { top: '8%', left: '50%', tx: '-50%', ty: '0' },     // Nexus - top center
            { top: '30%', left: '88%', tx: '-50%', ty: '-50%' },  // Connect - right
            { top: '72%', left: '84%', tx: '-50%', ty: '-50%' },  // E-Commerce - bottom-right
            { top: '88%', left: '50%', tx: '-50%', ty: '-50%' },  // Loyalty - bottom center
            { top: '72%', left: '16%', tx: '-50%', ty: '-50%' },  // Retail - bottom-left
          ];
          const surrounding = PRODUCTS.filter(p => p.key !== 'dex');

          return surrounding.map((product, i) => {
            const pos = positions[i];
            return (
              <div key={product.key} style={{
                position: 'absolute',
                top: pos.top, left: pos.left,
                transform: `translate(${pos.tx}, ${pos.ty})`,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                zIndex: 2,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: isDark ? t.cardBg : t.cardBg,
                  border: `1.5px solid ${product.colors.primary}30`,
                  boxShadow: `0 0 20px ${product.colors.glow}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <product.Icon size={36} />
                </div>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: product.colors.light,
                  letterSpacing: '0.02em',
                }}>
                  {product.name}
                </span>
                <span style={{ fontSize: 10, color: t.textFaint, marginTop: 1 }}>
                  {product.tagline}
                </span>
              </div>
            );
          });
        })()}

        {/* Connection lines from Dex to each product (SVG overlay) */}
        <svg style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 1,
        }} viewBox="0 0 960 520" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="conn-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={productColors.dex.primary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={productColors.dex.primary} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Lines from center (480, 260) to approximate product positions */}
          {[
            { x: 480, y: 70 },   // Nexus
            { x: 845, y: 170 },  // Connect
            { x: 807, y: 374 },  // E-Commerce
            { x: 480, y: 448 },  // Loyalty
            { x: 153, y: 374 },  // Retail
          ].map((end, i) => (
            <line key={i}
              x1="480" y1="260" x2={end.x} y2={end.y}
              stroke="url(#conn-grad-gold)"
              strokeWidth="1"
              strokeDasharray="4,6"
            />
          ))}
        </svg>
      </div>

      {/* Product descriptor row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 0,
      }}>
        {PRODUCTS.filter(p => p.key !== 'dex').slice(0, 3).map(product => (
          <div key={product.key} style={{
            padding: '16px 20px',
            borderRadius: 10,
            background: `${product.colors.primary}08`,
            border: `1px solid ${product.colors.primary}18`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <product.Icon size={20} />
              <span style={{ fontSize: 13, fontWeight: 600, color: product.colors.light }}>{product.name}</span>
            </div>
            <p style={{ fontSize: 11, color: t.textFaint, margin: 0, lineHeight: 1.5 }}>
              {product.descriptor}
            </p>
          </div>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginTop: 12,
      }}>
        {PRODUCTS.filter(p => p.key !== 'dex').slice(3).map(product => (
          <div key={product.key} style={{
            padding: '16px 20px',
            borderRadius: 10,
            background: `${product.colors.primary}08`,
            border: `1px solid ${product.colors.primary}18`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <product.Icon size={20} />
              <span style={{ fontSize: 13, fontWeight: 600, color: product.colors.light }}>{product.name}</span>
            </div>
            <p style={{ fontSize: 11, color: t.textFaint, margin: 0, lineHeight: 1.5 }}>
              {product.descriptor}
            </p>
          </div>
        ))}
      </div>


      <SectionDivider t={t} />


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2: ICONOGRAPHY SYSTEM
          ══════════════════════════════════════════════════════════════════ */}

      <SectionLabel t={t}>Iconography System</SectionLabel>
      <h2 style={{
        fontSize: 28, fontWeight: 300, color: t.text, margin: '0 0 8px',
        letterSpacing: '-0.02em',
      }}>
        Icon Specimens
      </h2>
      <p style={{
        fontSize: 13, color: t.textMuted, lineHeight: 1.7, maxWidth: 560,
        marginBottom: 48,
      }}>
        Each icon is built from clean geometric shapes with consistent 2px stroke widths
        and rounded caps. Recognizable at 24px, detailed at 64px.
      </p>

      {/* Size specimens on dark and light backgrounds */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            display: 'grid', gridTemplateColumns: '140px 1fr 1fr',
            gap: 16, alignItems: 'stretch',
          }}>
            {/* Label column */}
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              paddingRight: 16,
              borderRight: `1px solid ${t.border}`,
            }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: product.colors.light }}>
                {product.name}
              </span>
              <span style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                {product.tagline}
              </span>
            </div>

            {/* Dark background specimen */}
            <div style={{
              background: '#0A0908',
              borderRadius: 12,
              padding: '20px 24px',
              border: '1px solid #282724',
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              {[64, 48, 32, 24].map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <product.Icon size={s} />
                  <span style={{ fontSize: 9, color: '#6B6359', fontFamily: 'monospace' }}>{s}px</span>
                </div>
              ))}
            </div>

            {/* Light background specimen */}
            <div style={{
              background: '#F5F4F2',
              borderRadius: 12,
              padding: '20px 24px',
              border: '1px solid #E8E5E0',
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              {[64, 48, 32, 24].map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <product.Icon size={s} />
                  <span style={{ fontSize: 9, color: '#A8A29E', fontFamily: 'monospace' }}>{s}px</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Icon with and without label */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        With &amp; Without Label
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12,
        marginBottom: 48,
      }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: '20px 12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}>
            {/* Without label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
              <product.Icon size={40} />
            </div>
            {/* Divider */}
            <div style={{ width: '80%', height: 1, background: t.border }} />
            {/* With label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <product.Icon size={32} />
              <span style={{ fontSize: 11, fontWeight: 600, color: product.colors.light, letterSpacing: '0.02em' }}>
                {product.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* In-context: Navigation bar mockup */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        In Context: Navigation Bar
      </div>

      <div style={{
        background: isDark ? '#0E0D0B' : '#FAFAF9',
        borderRadius: 14,
        padding: '14px 24px',
        border: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 16,
      }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 24 }}>
          <DexIcon size={22} />
          <span style={{ fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: '0.02em' }}>
            Dutchie
          </span>
        </div>
        {/* Separator */}
        <div style={{ width: 1, height: 24, background: t.border, marginRight: 16 }} />
        {/* Nav items */}
        {PRODUCTS.filter(p => p.key !== 'dex').map((product, i) => (
          <div key={product.key} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 8,
            background: i === 0 ? `${product.colors.primary}12` : 'transparent',
            cursor: 'default',
          }}>
            <product.Icon size={18} />
            <span style={{
              fontSize: 12, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? product.colors.light : t.textMuted,
            }}>
              {product.name}
            </span>
          </div>
        ))}
      </div>

      {/* In-context: Card headers */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
        marginTop: 32,
      }}>
        In Context: Card Headers
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        marginBottom: 0,
      }}>
        {PRODUCTS.slice(0, 3).map(product => (
          <div key={product.key} style={{
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 12, overflow: 'hidden',
          }}>
            {/* Card header with product accent */}
            <div style={{
              padding: '14px 18px',
              borderBottom: `1px solid ${t.border}`,
              background: `linear-gradient(135deg, ${product.colors.primary}08, transparent)`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <product.Icon size={24} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{product.name}</div>
                <div style={{ fontSize: 10, color: t.textFaint }}>{product.tagline}</div>
              </div>
            </div>
            {/* Placeholder card body */}
            <div style={{ padding: '14px 18px' }}>
              <div style={{
                height: 8, width: '80%', borderRadius: 4,
                background: `${t.textFaint}18`, marginBottom: 8,
              }} />
              <div style={{
                height: 8, width: '60%', borderRadius: 4,
                background: `${t.textFaint}12`,
              }} />
            </div>
          </div>
        ))}
      </div>


      <SectionDivider t={t} />


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3: COLOR & IDENTITY CARDS
          ══════════════════════════════════════════════════════════════════ */}

      <SectionLabel t={t}>Color &amp; Identity</SectionLabel>
      <h2 style={{
        fontSize: 28, fontWeight: 300, color: t.text, margin: '0 0 8px',
        letterSpacing: '-0.02em',
      }}>
        Brand Cards
      </h2>
      <p style={{
        fontSize: 13, color: t.textMuted, lineHeight: 1.7, maxWidth: 560,
        marginBottom: 48,
      }}>
        Each product carries its own color identity, gradient treatment, and voice --
        unified by DM Sans typography and the warm-dark design language.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              minHeight: 200,
            }}>

              {/* Left: Icon & color swatch */}
              <div style={{
                background: `linear-gradient(180deg, ${product.colors.primary}12, ${product.colors.primary}04)`,
                borderRight: `1px solid ${t.border}`,
                padding: 28,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 16,
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: isDark
                    ? `radial-gradient(circle at 40% 40%, ${product.colors.primary}15, transparent)`
                    : `radial-gradient(circle at 40% 40%, ${product.colors.primary}12, transparent)`,
                  border: `1.5px solid ${product.colors.primary}30`,
                  boxShadow: `0 0 30px ${product.colors.glow}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <product.Icon size={48} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 18, fontWeight: 700, color: product.colors.light,
                    letterSpacing: '0.02em',
                  }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>
                    {product.tagline}
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Color swatches */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: t.textFaint, marginBottom: 10,
                  }}>
                    Color Palette
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { label: 'Primary', hex: product.colors.primary },
                      { label: 'Light', hex: product.colors.light },
                      { label: 'Lighter', hex: product.colors.lighter },
                    ].map((c, ci) => (
                      <div key={ci} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 8,
                          background: c.hex,
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                          boxShadow: `0 2px 8px ${product.colors.glow}`,
                        }} />
                        <span style={{ fontSize: 9, color: t.textFaint, fontWeight: 500 }}>{c.label}</span>
                        <span style={{ fontSize: 8, color: t.textFaint, fontFamily: 'monospace', opacity: 0.7 }}>{c.hex}</span>
                      </div>
                    ))}
                    {/* Gradient swatch */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: 80, height: 44, borderRadius: 8,
                        background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.lighter})`,
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      }} />
                      <span style={{ fontSize: 9, color: t.textFaint, fontWeight: 500 }}>Gradient</span>
                    </div>
                  </div>
                </div>

                {/* Mini UI mockup */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: t.textFaint, marginBottom: 10,
                  }}>
                    Usage Example
                  </div>
                  <div style={{
                    background: isDark ? '#0A0908' : '#F5F4F2',
                    borderRadius: 10,
                    padding: '12px 16px',
                    border: `1px solid ${isDark ? '#282724' : '#E8E5E0'}`,
                  }}>
                    {/* Mini notification / card example */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: `${product.colors.primary}15`,
                        border: `1px solid ${product.colors.primary}25`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <product.Icon size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 12, fontWeight: 600, color: isDark ? '#F0EDE8' : '#1C1917',
                        }}>
                          {product.name} Update
                        </div>
                        <div style={{
                          fontSize: 10, color: isDark ? '#6B6359' : '#A8A29E',
                          marginTop: 1,
                        }}>
                          {product.descriptor}
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 10px', borderRadius: 6,
                        background: `${product.colors.primary}15`,
                        border: `1px solid ${product.colors.primary}25`,
                        fontSize: 10, fontWeight: 600,
                        color: product.colors.light,
                      }}>
                        View
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand voice */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: t.textFaint, marginBottom: 8,
                  }}>
                    Brand Voice
                  </div>
                  <div style={{
                    fontSize: 13, color: t.text, fontStyle: 'italic',
                    lineHeight: 1.6, paddingLeft: 12,
                    borderLeft: `2px solid ${product.colors.primary}40`,
                  }}>
                    {product.voice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <SectionDivider t={t} />


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4: THE FAMILY TOGETHER
          ══════════════════════════════════════════════════════════════════ */}

      <SectionLabel t={t}>Visual Cohesion</SectionLabel>
      <h2 style={{
        fontSize: 28, fontWeight: 300, color: t.text, margin: '0 0 8px',
        letterSpacing: '-0.02em',
      }}>
        The Family Together
      </h2>
      <p style={{
        fontSize: 13, color: t.textMuted, lineHeight: 1.7, maxWidth: 560,
        marginBottom: 48,
      }}>
        Consistent style language with individual personality. Every product shares
        the same stroke weight, border radius vocabulary, and typographic treatment.
      </p>

      {/* Unified icon lineup */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        Unified Icon Lineup
      </div>

      <div style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: '40px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 40,
        marginBottom: 40,
      }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            <product.Icon size={48} />
            <span style={{
              fontSize: 12, fontWeight: 600, color: product.colors.light,
              letterSpacing: '0.02em',
            }}>
              {product.name}
            </span>
          </div>
        ))}
      </div>

      {/* Color spectrum bar */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        Color Spectrum
      </div>

      <div style={{
        display: 'flex', borderRadius: 12, overflow: 'hidden',
        height: 48, marginBottom: 8,
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            flex: 1,
            background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.lighter})`,
          }} />
        ))}
      </div>
      <div style={{
        display: 'flex',
        marginBottom: 40,
      }}>
        {PRODUCTS.map(product => (
          <div key={product.key} style={{
            flex: 1, textAlign: 'center',
            fontSize: 9, color: t.textFaint, fontFamily: 'monospace',
            paddingTop: 6,
          }}>
            {product.colors.primary}
          </div>
        ))}
      </div>

      {/* Mock Navigation Bar (full sidebar style) */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        Mock Dashboard Sidebar
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '240px 1fr',
        gap: 0,
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${t.border}`,
        minHeight: 360,
        marginBottom: 40,
      }}>
        {/* Sidebar */}
        <div style={{
          background: isDark ? '#0E0D0B' : '#FAFAF9',
          borderRight: `1px solid ${t.border}`,
          padding: '24px 0',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Brand mark */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 20px', marginBottom: 28,
          }}>
            <DexIcon size={24} />
            <span style={{ fontSize: 16, fontWeight: 600, color: t.text, letterSpacing: '0.02em' }}>
              Dutchie
            </span>
          </div>

          {/* Divider */}
          <div style={{
            height: 1, background: t.border,
            margin: '0 16px 12px',
          }} />

          {/* Section label */}
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: t.textFaint,
            padding: '8px 20px 6px',
          }}>
            Products
          </div>

          {/* Nav items */}
          {PRODUCTS.map((product, i) => (
            <div key={product.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 20px',
              background: i === 0 ? `${product.colors.primary}10` : 'transparent',
              borderLeft: i === 0 ? `3px solid ${product.colors.primary}` : '3px solid transparent',
              cursor: 'default',
            }}>
              <product.Icon size={20} />
              <span style={{
                fontSize: 13, fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? product.colors.light : t.textMuted,
              }}>
                {product.name}
              </span>
              {product.key === 'dex' && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 9, fontWeight: 700,
                  padding: '2px 7px', borderRadius: 4,
                  background: `${productColors.dex.primary}20`,
                  color: productColors.dex.light,
                  letterSpacing: '0.04em',
                }}>
                  AI
                </span>
              )}
            </div>
          ))}

          {/* Bottom section */}
          <div style={{ marginTop: 'auto', padding: '0 16px' }}>
            <div style={{ height: 1, background: t.border, marginBottom: 12 }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 4px',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: `linear-gradient(135deg, ${productColors.dex.primary}30, ${productColors.nexus.primary}30)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: t.textMuted,
              }}>
                JD
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.text }}>Jane Doe</div>
                <div style={{ fontSize: 9, color: t.textFaint }}>Multi-Location Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div style={{
          background: isDark ? '#0A0908' : '#F5F4F2',
          padding: 28,
        }}>
          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: t.text, letterSpacing: '-0.01em' }}>
              Dashboard
            </div>
            <div style={{ fontSize: 12, color: t.textFaint, marginTop: 4 }}>
              Overview of your dispensary network
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12, marginBottom: 20,
          }}>
            {[
              { label: 'Today\'s Revenue', value: '$12,847', product: PRODUCTS[3], change: '+14%' },
              { label: 'Active Customers', value: '1,234', product: PRODUCTS[4], change: '+8%' },
              { label: 'Avg Checkout', value: '47s', product: PRODUCTS[5], change: '-12%' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: isDark ? '#141210' : '#FAFAF9',
                border: `1px solid ${isDark ? '#282724' : '#E8E5E0'}`,
                borderRadius: 10,
                padding: '16px 18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <stat.product.Icon size={16} />
                  <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: t.text }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: stat.change.startsWith('+') ? productColors.ecommerce.primary : productColors.loyalty.primary,
                  }}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dex insight card */}
          <div style={{
            background: `linear-gradient(135deg, ${productColors.dex.primary}08, ${productColors.dex.primary}03)`,
            border: `1px solid ${productColors.dex.primary}25`,
            borderRadius: 10,
            padding: '14px 18px',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: `${productColors.dex.primary}15`,
              border: `1px solid ${productColors.dex.primary}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <DexIcon size={18} />
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 600, color: productColors.dex.light, marginBottom: 4,
              }}>
                Dex Insight
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.6 }}>
                Blue Dream is trending up 23% this week across your locations.
                Your South Portland store is running low -- reorder recommended by Thursday.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full navigation bar variant */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        Mock Top Navigation
      </div>

      <div style={{
        background: isDark ? '#0E0D0B' : '#FAFAF9',
        borderRadius: 14,
        border: `1px solid ${t.border}`,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 0,
        marginBottom: 40,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 28 }}>
          <DexIcon size={20} />
          <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Dutchie</span>
        </div>
        <div style={{ width: 1, height: 24, background: t.border, marginRight: 12 }} />
        {/* Products as tabs */}
        {PRODUCTS.map((product, i) => (
          <div key={product.key} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8,
            background: i === 0 ? `${product.colors.primary}12` : 'transparent',
            borderBottom: i === 0 ? `2px solid ${product.colors.primary}` : '2px solid transparent',
            marginBottom: i === 0 ? -2 : 0,
          }}>
            <product.Icon size={16} />
            <span style={{
              fontSize: 12, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? product.colors.light : t.textMuted,
            }}>
              {product.name}
            </span>
          </div>
        ))}
        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${t.textFaint}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.textFaint} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${productColors.dex.primary}15`,
            border: `1px solid ${productColors.dex.primary}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: productColors.dex.light,
          }}>
            JD
          </div>
        </div>
      </div>

      {/* Unified composition card */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: t.textFaint, marginBottom: 16,
      }}>
        Unified Composition
      </div>

      <div style={{
        background: isDark
          ? 'radial-gradient(ellipse 70% 60% at 50% 40%, #141210, #0A0908)'
          : 'radial-gradient(ellipse 70% 60% at 50% 40%, #FAFAF9, #F5F4F2)',
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: '48px 40px',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        {/* Tagline */}
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: t.accentGold, marginBottom: 20,
        }}>
          The Dutchie Platform
        </div>

        <h3 style={{
          fontSize: 32, fontWeight: 300, color: t.text,
          margin: '0 0 32px', letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Everything You Need.{' '}
          <span style={{
            background: `linear-gradient(90deg, ${productColors.dex.primary}, ${productColors.dex.lighter})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Powered by Intelligence.
          </span>
        </h3>

        {/* Product icon row with connecting line */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 32 }}>
          {/* Connecting line behind icons */}
          <div style={{
            position: 'absolute',
            top: '50%', left: 24, right: 24,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${t.border}, ${productColors.dex.primary}30, ${t.border}, transparent)`,
            transform: 'translateY(-50%)',
          }} />

          {PRODUCTS.map(product => (
            <div key={product.key} style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              zIndex: 1,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: isDark ? t.cardBg : t.cardBg,
                border: `1.5px solid ${product.colors.primary}30`,
                boxShadow: `0 0 16px ${product.colors.glow}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <product.Icon size={32} />
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: product.colors.light,
                letterSpacing: '0.02em',
              }}>
                {product.name}
              </span>
            </div>
          ))}
        </div>

        {/* Dex powered bar */}
        <div style={{
          marginTop: 32,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 24px', borderRadius: 100,
          background: `linear-gradient(90deg, ${productColors.dex.primary}12, ${productColors.dex.lighter}08)`,
          border: `1px solid ${productColors.dex.primary}30`,
        }}>
          <DexIcon size={18} />
          <span style={{
            fontSize: 12, fontWeight: 600, color: productColors.dex.light,
            letterSpacing: '0.04em',
          }}>
            Powered by Dex
          </span>
          <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 8 }}>
            AI intelligence woven through every product
          </span>
        </div>
      </div>


      {/* ── Footer ── */}
      <div style={{
        marginTop: 56, paddingTop: 24, borderTop: `1px solid ${t.border}`,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 12, color: t.textFaint, lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto',
        }}>
          Dutchie Brand Identity System -- six products, one design language.
          Built with DM Sans, geometric iconography, and the warm-dark palette.
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16,
        }}>
          {PRODUCTS.map(product => (
            <div key={product.key} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: product.colors.primary,
              boxShadow: `0 0 6px ${product.colors.glow}`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandShowcase;
