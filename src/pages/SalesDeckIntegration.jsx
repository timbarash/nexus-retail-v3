import React from 'react';

// ============================================================================
// SalesDeckIntegration Component
// Polished presentation-quality recreation of Dutchie sales deck slides,
// exploring how AI/Dex integrates into the product hierarchy.
// ============================================================================

const themes = {
  dark: {
    bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8',
    textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A',
    accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C'
  },
  light: {
    bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917',
    textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A',
    accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857'
  }
};

// ============================================================================
// Deck Color Palettes (these are slide-internal, NOT theme-dependent)
// ============================================================================
const deck = {
  forestGreen: '#1A3A2A',
  forestGreenDeep: '#142E22',
  forestGreenDark: '#0F2119',
  forestGreenLight: '#2D6A4F',
  cream: '#F5F0E8',
  creamLight: '#FAF8F4',
  creamDark: '#E8E0D4',
  burgundy: '#5C2434',
  burgundyDeep: '#4A1C2A',
  white: '#FFFFFF',
  textDark: '#1C1917',
  textMedium: '#44403A',
  textGreen: '#2D6A4F',
  checkGreen: '#40916C',
  gold: '#D4A03A',
  goldLight: '#FFC02A',
  goldBright: '#FFD666',
  gradientStart: '#FF6B6B',
  gradientMid1: '#FFA500',
  gradientMid2: '#FFD700',
  gradientMid3: '#40916C',
  gradientEnd: '#4A90D9',
};

// ============================================================================
// SVG Icons — clean, professional, 20-24px stroked outlines
// ============================================================================
const Icons = {
  ecommerce: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6h18" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  loyalty: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8v4M10 10h4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  retail: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="1.6"/>
      <path d="M16 7V5a4 4 0 00-8 0v2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M2 11h20" stroke={color} strokeWidth="1.2" opacity="0.5"/>
      <rect x="9" y="13" width="6" height="4" rx="1" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  nexus: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="6" r="2" stroke={color} strokeWidth="1.4"/>
      <circle cx="18" cy="12" r="2" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="18" r="2" stroke={color} strokeWidth="1.4"/>
      <circle cx="6" cy="12" r="2" stroke={color} strokeWidth="1.4"/>
      <path d="M12 8v2.5M12 13.5V16M14 6.8l2.5 3.5M8 13.7l-0.5.6M14 17.2l2.5-3.5M8 10.3l-0.5-.6" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.2"/>
    </svg>
  ),
  connect: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8.5" cy="12" r="4.5" stroke={color} strokeWidth="1.6" fill="none"/>
      <circle cx="15.5" cy="12" r="4.5" stroke={color} strokeWidth="1.6" fill="none"/>
    </svg>
  ),
  intelligence: (color = '#fff', size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a7 7 0 017 7c0 2.5-1.2 4.7-3 6v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2c-1.8-1.3-3-3.5-3-6a7 7 0 017-7z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21h6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M10 17v-3.5c0-.3-.2-.5-.5-.7l-1-1" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M14 17v-3.5c0-.3.2-.5.5-.7l1-1" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  brain: (color = '#fff', size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a7 7 0 017 7c0 2.5-1.2 4.7-3 6v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2c-1.8-1.3-3-3.5-3-6a7 7 0 017-7z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// ============================================================================
// Dutchie Logo (simplified leaf/swirl)
// ============================================================================
function DutchieLogo({ color = '#40916C', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4C10 4 4 10 4 16s6 12 12 12c0-4 1-8 3-12S22 8 16 4z" fill={color} opacity="0.8"/>
      <path d="M16 4c6 0 12 6 12 12s-6 12-12 12c0-4-1-8-3-12S10 8 16 4z" fill={color} opacity="0.5"/>
    </svg>
  );
}

// ============================================================================
// Data
// ============================================================================
const pillarsBase = [
  {
    id: 'ecommerce', name: 'E-Commerce', icon: 'ecommerce',
    features: ['Collections + Outlets', 'Branded Mobile App', 'Digital Payments', 'Sponsored Placement', 'Kiosk'],
  },
  {
    id: 'loyalty', name: 'Loyalty + Marketing', icon: 'loyalty',
    features: ['Marketing Automation', 'Dynamic Segments', 'Email / Text / Push', 'Refer A Friend', 'IRL Events'],
  },
  {
    id: 'retail', name: 'Retail', icon: 'retail', highlighted: true,
    features: ['Register', 'Dynamic Pricing', 'Compliance', 'Discount Engine', 'Reporting'],
  },
  {
    id: 'nexus', name: 'Nexus', icon: 'nexus',
    features: ['AI Command Center', 'Pricing Insights', 'Loyalty Score', 'Inventory Alerts', 'Brand Leaderboard'],
  },
  {
    id: 'connect', name: 'Connect', icon: 'connect',
    features: ['Global Catalog', 'Brand Discounts', 'POs + Invoices', 'Brand Intelligence', 'Cultivation & Mfg'],
  },
];

const intelligenceItemsBase = [
  'Agentic Commerce', 'Voice AI', 'Intelligent Summaries',
  'Intelligence Everywhere', 'AI Sales Assistant', 'Consumer Sentiment', 'Dutchie Agent'
];


// ============================================================================
// Shared: Slide Frame
// Wraps each slide in a 16:10 frame with shadow and border
// ============================================================================
function SlideFrame({ children, style = {} }) {
  return (
    <div style={{
      maxWidth: 920,
      margin: '0 auto',
      aspectRatio: '16 / 10',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 4px 32px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ============================================================================
// Shared: Slide Caption (below each slide)
// ============================================================================
function SlideCaption({ children, t }) {
  return (
    <div style={{
      maxWidth: 920,
      margin: '16px auto 0',
      textAlign: 'center',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      color: t.textMuted,
      fontStyle: 'italic',
      lineHeight: 1.6,
      padding: '0 20px',
    }}>
      {children}
    </div>
  );
}

// ============================================================================
// Shared: Section Header (above each slide)
// ============================================================================
function SlideHeader({ number, title, t }) {
  return (
    <div style={{ maxWidth: 920, margin: '0 auto 24px', padding: '0 4px' }}>
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 12,
        fontWeight: 700,
        color: t.accentGold,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: 6,
      }}>
        Slide {number}
      </div>
      <h2 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 26,
        fontWeight: 700,
        color: t.text,
        margin: 0,
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
    </div>
  );
}

// ============================================================================
// Shared: Pillar Card (the cream/colored product card inside a slide)
// ============================================================================
function PillarCard({
  name,
  icon,
  features,
  highlighted = false,
  cardBg,
  textColor,
  checkColor,
  iconBg,
  iconColor,
  badge,
  badgeBg,
  badgeColor,
  featureDecorator,
  minH = 220,
  style = {},
}) {
  const bg = cardBg || (highlighted ? deck.burgundy : deck.cream);
  const txt = textColor || (highlighted ? '#FAFAF4' : deck.textDark);
  const chk = checkColor || (highlighted ? deck.goldLight : deck.checkGreen);
  const iBg = iconBg || (highlighted ? 'rgba(255,215,0,0.18)' : deck.forestGreenLight);
  const iClr = iconColor || '#FFFFFF';
  const IconFn = Icons[icon];

  return (
    <div style={{
      background: bg,
      borderRadius: 14,
      padding: '22px 18px 20px',
      flex: '1 1 0',
      minWidth: 0,
      minHeight: minH,
      position: 'relative',
      boxShadow: highlighted
        ? '0 6px 24px rgba(92,36,52,0.35)'
        : '0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}>
      {/* Badge */}
      {badge && (
        <div style={{
          position: 'absolute',
          top: -8,
          right: 10,
          background: badgeBg || deck.goldLight,
          color: badgeColor || deck.textDark,
          fontSize: 9,
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: 8,
          fontFamily: 'DM Sans, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: '16px',
        }}>
          {badge}
        </div>
      )}

      {/* Icon Circle */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: iBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 14px',
        flexShrink: 0,
      }}>
        {IconFn && IconFn(iClr, 22)}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 15,
        fontWeight: 700,
        color: txt,
        textAlign: 'center',
        marginBottom: 14,
        lineHeight: 1.2,
      }}>
        {name}
      </div>

      {/* Features */}
      <div style={{ flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 7,
            marginBottom: 5,
            lineHeight: 1.35,
          }}>
            <span style={{
              color: chk,
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
              marginTop: 0,
              lineHeight: 1.35,
            }}>
              {featureDecorator ? featureDecorator(f, i) : '\u2713'}
            </span>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12.5,
              color: highlighted ? 'rgba(255,255,255,0.88)' : deck.textMedium,
              lineHeight: 1.35,
            }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Shared: Intelligence Bar
// ============================================================================
function IntelBar({
  items = intelligenceItemsBase,
  label = 'Intelligence',
  labelIcon,
  sublabel,
  highlightItem,
  highlightColor = deck.goldLight,
  barBg = 'rgba(255,255,255,0.06)',
  textColor = 'rgba(255,255,255,0.85)',
  gradient,
  style = {},
}) {
  const grad = gradient || `linear-gradient(to right, ${deck.gradientStart}, ${deck.gradientMid1}, ${deck.gradientMid2}, ${deck.gradientMid3}, ${deck.gradientEnd})`;

  return (
    <div style={{ ...style }}>
      {/* Rainbow gradient strip */}
      <div style={{
        height: 3,
        background: grad,
        borderRadius: '3px 3px 0 0',
      }} />
      <div style={{
        background: barBg,
        borderRadius: '0 0 12px 12px',
        padding: '14px 20px 16px',
      }}>
        {/* Label row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}>
          {labelIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{labelIcon}</span>}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: 0.75,
          }}>
            {label}
          </span>
          {sublabel && (
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              color: highlightColor,
              fontWeight: 600,
              marginLeft: 4,
              opacity: 0.9,
            }}>
              {sublabel}
            </span>
          )}
        </div>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px' }}>
          {items.map((item, i) => {
            const isHL = highlightItem === item;
            return (
              <span key={i} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11.5,
                fontWeight: isHL ? 700 : 500,
                color: isHL ? highlightColor : textColor,
                background: isHL ? `${highlightColor}22` : 'rgba(255,255,255,0.06)',
                padding: '4px 10px',
                borderRadius: 7,
                border: isHL ? `1px solid ${highlightColor}44` : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// SLIDE 1: The Current Deck (faithful recreation)
// ============================================================================
function Slide1({ t }) {
  return (
    <div>
      <SlideHeader number={1} title="The Current Deck" t={t} />
      <SlideFrame style={{ background: deck.forestGreen }}>
        <div style={{ padding: '48px 48px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: deck.checkGreen,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 6,
            }}>
              Introducing Dutchie:
            </div>
          </div>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <DutchieLogo color={deck.checkGreen} size={36} />
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: deck.cream,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Industry Standard for a Reason
            </h3>
          </div>

          {/* 5 Pillar Cards */}
          <div style={{
            display: 'flex',
            gap: 14,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {pillarsBase.map((p) => (
              <PillarCard
                key={p.id}
                name={p.name}
                icon={p.icon}
                features={p.features}
                highlighted={p.highlighted}
                minH={0}
                style={{ flex: '1 1 0' }}
              />
            ))}
          </div>

          {/* Intelligence Bar */}
          <div style={{ marginTop: 16 }}>
            <IntelBar
              labelIcon={Icons.brain('rgba(255,255,255,0.6)', 16)}
            />
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        The current Dutchie sales deck: forest green background, cream cards, burgundy Retail highlight,
        rainbow Intelligence bar along the bottom. This is the baseline we are evolving from.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// SLIDE 2: With Dex Integrated (minimal change)
// ============================================================================
function Slide2({ t }) {
  return (
    <div>
      <SlideHeader number={2} title="With Dex Integrated" t={t} />
      <SlideFrame style={{ background: deck.forestGreen }}>
        <div style={{ padding: '48px 48px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: deck.checkGreen,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 6,
            }}>
              Introducing Dutchie:
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <DutchieLogo color={deck.checkGreen} size={36} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: deck.cream,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Industry Standard for a Reason
            </h3>
          </div>

          {/* 5 Pillar Cards — Nexus gets a subtle badge */}
          <div style={{
            display: 'flex',
            gap: 14,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {pillarsBase.map((p) => (
              <PillarCard
                key={p.id}
                name={p.name}
                icon={p.icon}
                features={p.features}
                highlighted={p.highlighted}
                badge={p.id === 'nexus' ? 'AI-Powered' : undefined}
                minH={0}
                style={{ flex: '1 1 0' }}
              />
            ))}
          </div>

          {/* Intelligence Bar — "Dutchie Agent" highlighted, "Powered by Dex" */}
          <div style={{ marginTop: 16 }}>
            <IntelBar
              labelIcon={Icons.brain('rgba(255,255,255,0.6)', 16)}
              sublabel="Powered by Dex"
              highlightItem="Dutchie Agent"
              highlightColor={deck.goldLight}
            />
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        Minimal change: "Dutchie Agent" is highlighted with a gold accent and branded as "Powered by Dex."
        The Nexus card gets an "AI-Powered" badge. Everything else is identical to the current deck.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// SLIDE 3: Intelligence Elevated (6th pillar)
// ============================================================================
function Slide3({ t }) {
  const sixPillars = [
    ...pillarsBase,
    {
      id: 'intelligence', name: 'Intelligence', icon: 'intelligence',
      features: ['Agentic Commerce', 'Voice AI', 'Smart Summaries', 'Sales Assistant', 'Consumer Sentiment'],
    },
  ];

  return (
    <div>
      <SlideHeader number={3} title="Intelligence Elevated" t={t} />
      <SlideFrame style={{ background: deck.forestGreen }}>
        <div style={{ padding: '48px 44px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: deck.checkGreen,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 6,
            }}>
              Introducing Dutchie:
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <DutchieLogo color={deck.checkGreen} size={36} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 23,
              fontWeight: 400,
              fontStyle: 'italic',
              color: deck.cream,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Industry Standard for a Reason
            </h3>
          </div>

          {/* 6 Pillar Cards */}
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {sixPillars.map((p) => {
              const isIntel = p.id === 'intelligence';
              return (
                <PillarCard
                  key={p.id}
                  name={p.name}
                  icon={p.icon}
                  features={p.features}
                  highlighted={p.highlighted}
                  cardBg={isIntel ? '#C49A2A' : undefined}
                  textColor={isIntel ? '#1C1917' : undefined}
                  checkColor={isIntel ? '#5C4A10' : undefined}
                  iconBg={isIntel ? 'rgba(0,0,0,0.15)' : undefined}
                  iconColor={isIntel ? '#FFFFFF' : undefined}
                  badge={isIntel ? 'NEW' : undefined}
                  badgeBg={isIntel ? '#1C1917' : undefined}
                  badgeColor={isIntel ? deck.goldBright : undefined}
                  minH={0}
                  style={{ flex: '1 1 0' }}
                />
              );
            })}
          </div>

          {/* No intelligence bar — it is now a pillar */}
          <div style={{
            marginTop: 14,
            textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em',
          }}>
            Intelligence is no longer a layer -- it is a pillar
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        AI gets a seat at the table as a first-class product. The Intelligence bar is removed;
        its capabilities are promoted to a 6th gold pillar alongside the original five.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// SLIDE 4: The AI-First Deck
// ============================================================================
function Slide4({ t }) {
  const aiFirstPillars = [
    {
      id: 'ecommerce', name: 'E-Commerce', icon: 'ecommerce',
      features: ['AI-Powered Recommendations', 'Collections + Outlets', 'Branded Mobile App', 'Digital Payments', 'Kiosk'],
    },
    {
      id: 'loyalty', name: 'Loyalty + Marketing', icon: 'loyalty',
      features: ['AI Audience Builder', 'Marketing Automation', 'Dynamic Segments', 'Email / Text / Push', 'Refer A Friend'],
    },
    {
      id: 'retail', name: 'Retail', icon: 'retail', highlighted: true,
      features: ['AI Sales Assistant', 'Register', 'Dynamic Pricing', 'Compliance', 'Discount Engine'],
    },
    {
      id: 'nexus', name: 'Nexus', icon: 'nexus',
      features: ['AI Command Center', 'Intelligent Insights', 'Pricing Optimization', 'Inventory Alerts', 'Brand Leaderboard'],
    },
    {
      id: 'connect', name: 'Connect', icon: 'connect',
      features: ['AI Catalog Matching', 'Global Catalog', 'Brand Discounts', 'POs + Invoices', 'Brand Intelligence'],
    },
  ];

  return (
    <div>
      <SlideHeader number={4} title="The AI-First Deck" t={t} />
      <SlideFrame style={{ background: deck.forestGreen }}>
        <div style={{ padding: '40px 48px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* TOP: Intelligence Bar (moved to top) */}
          <div style={{ marginBottom: 20 }}>
            <IntelBar
              label="Dex Intelligence"
              labelIcon={Icons.brain(deck.goldLight, 16)}
              sublabel="Powering Every Product"
              highlightItem="Dutchie Agent"
              highlightColor={deck.goldLight}
              barBg="rgba(255,255,255,0.08)"
              gradient={`linear-gradient(to right, ${deck.gold}, ${deck.goldLight}, ${deck.goldBright}, ${deck.goldLight}, ${deck.gold})`}
            />
          </div>

          {/* Gold banner headline */}
          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <div style={{
              display: 'inline-block',
              background: `linear-gradient(135deg, ${deck.gold}, ${deck.goldLight})`,
              padding: '4px 16px',
              borderRadius: 6,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              fontWeight: 800,
              color: deck.textDark,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 8,
            }}>
              Powered by Dex Intelligence
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'italic',
              color: deck.cream,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Industry Standard. Now with AI.
            </h3>
          </div>

          {/* 5 Pillar Cards with AI badges */}
          <div style={{
            display: 'flex',
            gap: 14,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {aiFirstPillars.map((p) => (
              <PillarCard
                key={p.id}
                name={p.name}
                icon={p.icon}
                features={p.features}
                highlighted={p.highlighted}
                badge={'\u2726 AI'}
                badgeBg={deck.gold}
                badgeColor="#fff"
                minH={0}
                style={{ flex: '1 1 0' }}
              />
            ))}
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        AI-first positioning: the Intelligence bar moves to the top, each card gets an AI badge,
        and every pillar leads with an AI feature. Intelligence leads, products follow.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// SLIDE 5: The Premium Dark Variant
// ============================================================================
function Slide5({ t }) {
  const darkSlide = {
    bg: '#0A0908',
    cardBg: '#141210',
    cardBorder: `1px solid ${deck.gold}33`,
    iconBg: `linear-gradient(135deg, ${deck.gold}, ${deck.goldLight})`,
    retailBg: '#2A1F0A',
    retailBorder: `1px solid ${deck.gold}55`,
    textLight: '#F0EDE8',
    textMuted: '#ADA599',
    barBg: '#0E0D0B',
  };

  return (
    <div>
      <SlideHeader number={5} title="The Premium Dark Variant" t={t} />
      <SlideFrame style={{ background: darkSlide.bg, border: `1px solid ${deck.gold}22` }}>
        <div style={{ padding: '48px 48px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: deck.gold,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 6,
            }}>
              Introducing Dutchie:
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <DutchieLogo color={deck.gold} size={36} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: darkSlide.textLight,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Industry Standard for a Reason
            </h3>
          </div>

          {/* 5 Dark Pillar Cards */}
          <div style={{
            display: 'flex',
            gap: 14,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {pillarsBase.map((p) => {
              const isRetail = p.highlighted;
              return (
                <div key={p.id} style={{
                  background: isRetail ? darkSlide.retailBg : darkSlide.cardBg,
                  borderRadius: 14,
                  padding: '22px 18px 20px',
                  flex: '1 1 0',
                  minWidth: 0,
                  position: 'relative',
                  border: isRetail ? darkSlide.retailBorder : darkSlide.cardBorder,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Dex badge on Nexus */}
                  {p.id === 'nexus' && (
                    <div style={{
                      position: 'absolute',
                      top: -8,
                      right: 10,
                      background: `linear-gradient(135deg, ${deck.gold}, ${deck.goldLight})`,
                      color: '#0A0908',
                      fontSize: 9,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 8,
                      fontFamily: 'DM Sans, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      lineHeight: '16px',
                    }}>
                      Dex Inside
                    </div>
                  )}

                  {/* Gold gradient icon circle */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${deck.gold}, ${deck.goldLight})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px',
                    flexShrink: 0,
                  }}>
                    {Icons[p.icon] && Icons[p.icon]('#0A0908', 20)}
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 15,
                    fontWeight: 700,
                    color: isRetail ? deck.goldLight : darkSlide.textLight,
                    textAlign: 'center',
                    marginBottom: 14,
                    lineHeight: 1.2,
                  }}>
                    {p.name}
                  </div>

                  {/* Features */}
                  <div style={{ flex: 1 }}>
                    {p.features.map((f, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 7,
                        marginBottom: 5,
                        lineHeight: 1.35,
                      }}>
                        <span style={{
                          color: isRetail ? deck.goldLight : deck.gold,
                          fontWeight: 700,
                          fontSize: 13,
                          flexShrink: 0,
                          lineHeight: 1.35,
                        }}>
                          {'\u2713'}
                        </span>
                        <span style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 12.5,
                          color: isRetail ? 'rgba(255,225,150,0.85)' : darkSlide.textMuted,
                          lineHeight: 1.35,
                        }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Intelligence Bar — dark with gold gradient */}
          <div style={{ marginTop: 16 }}>
            <IntelBar
              label="Intelligence"
              sublabel="Powered by Dex"
              labelIcon={Icons.brain(deck.gold, 16)}
              highlightItem="Dutchie Agent"
              highlightColor={deck.goldLight}
              barBg={darkSlide.barBg}
              textColor="rgba(240,237,232,0.75)"
              gradient={`linear-gradient(to right, ${deck.gold}88, ${deck.goldLight}, ${deck.goldBright}, ${deck.goldLight}, ${deck.gold}88)`}
            />
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        What if the deck matched the premium dark brand direction? Near-black background, gold accents,
        dark amber Retail highlight. Same hierarchy, dramatically different feel.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// SLIDE 6: Recommended Final Version
// ============================================================================
function Slide6({ t }) {
  const sixPillarsRec = [
    ...pillarsBase,
    {
      id: 'dex', name: 'Dex', icon: 'intelligence',
      features: ['Agentic Commerce', 'Voice AI', 'Smart Summaries', 'Sales Assistant', 'Consumer Sentiment'],
    },
  ];

  // Features that should show the AI sparkle marker
  const aiFeatures = new Set([
    'AI Command Center', 'Pricing Insights', 'Loyalty Score',
    'Marketing Automation', 'Dynamic Segments',
    'Dynamic Pricing', 'Discount Engine',
    'Brand Intelligence', 'Sponsored Placement',
  ]);

  return (
    <div>
      <SlideHeader number={6} title="Recommended Final Version" t={t} />
      <SlideFrame style={{ background: deck.forestGreen }}>
        <div style={{ padding: '44px 44px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: deck.checkGreen,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 6,
            }}>
              Dutchie
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <DutchieLogo color={deck.checkGreen} size={34} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 23,
              fontWeight: 400,
              fontStyle: 'italic',
              color: deck.cream,
              margin: 0,
              lineHeight: 1.3,
            }}>
              The Complete Dutchie Platform
            </h3>
          </div>

          {/* 6 Cards: 5 original + Dex */}
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            {sixPillarsRec.map((p) => {
              const isDex = p.id === 'dex';
              return (
                <PillarCard
                  key={p.id}
                  name={p.name}
                  icon={p.icon}
                  features={p.features}
                  highlighted={p.highlighted}
                  cardBg={isDex ? '#B8860B' : undefined}
                  textColor={isDex ? '#FFFFFF' : undefined}
                  checkColor={isDex ? '#FFF8E1' : undefined}
                  iconBg={isDex ? 'rgba(255,255,255,0.2)' : undefined}
                  iconColor={isDex ? '#FFFFFF' : undefined}
                  badge={isDex ? 'NEW' : undefined}
                  badgeBg={isDex ? '#1C1917' : undefined}
                  badgeColor={isDex ? deck.goldBright : undefined}
                  featureDecorator={!isDex && !p.highlighted ? (f) => {
                    if (aiFeatures.has(f)) {
                      return (
                        <span>
                          <span style={{ color: deck.checkGreen }}>{'\u2713'}</span>
                          <span style={{ color: deck.goldLight, fontSize: 10, marginLeft: 2 }}>{'\u2726'}</span>
                        </span>
                      );
                    }
                    return '\u2713';
                  } : undefined}
                  minH={0}
                  style={{ flex: '1 1 0' }}
                />
              );
            })}
          </div>

          {/* Intelligence Bar with "Powered by Dex" */}
          <div style={{ marginTop: 14 }}>
            <IntelBar
              label="Intelligence"
              sublabel="Powered by Dex"
              labelIcon={Icons.brain('rgba(255,255,255,0.6)', 16)}
              highlightItem="Dutchie Agent"
              highlightColor={deck.goldLight}
            />
          </div>
        </div>
      </SlideFrame>
      <SlideCaption t={t}>
        Our recommendation: keep the iconic forest green, add Dex as a warm gold 6th pillar,
        brand the Intelligence layer as "Powered by Dex," and mark AI-relevant features with a sparkle indicator.
      </SlideCaption>
    </div>
  );
}


// ============================================================================
// Summary: What Changed Card
// ============================================================================
function WhatChangedSummary({ t }) {
  const changes = [
    {
      num: '1',
      title: 'Added Dex as a 6th product pillar',
      desc: 'Intelligence is no longer hidden in a bottom bar. Dex stands alongside E-Commerce, Retail, and the rest as a first-class product with its own distinct gold card.',
    },
    {
      num: '2',
      title: 'Branded the Intelligence layer',
      desc: 'The rainbow gradient Intelligence bar now reads "Powered by Dex," giving the AI capabilities a clear identity and connecting them to the new pillar.',
    },
    {
      num: '3',
      title: 'AI indicators on existing features',
      desc: 'Existing AI-relevant features across all pillars get a subtle sparkle marker, showing that intelligence runs through the entire platform, not just one product.',
    },
  ];

  return (
    <div style={{
      maxWidth: 920,
      margin: '80px auto 0',
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: '36px 40px',
    }}>
      <h3 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: t.text,
        margin: '0 0 8px 0',
        textAlign: 'center',
      }}>
        What Changed: Current to Recommended
      </h3>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        color: t.textMuted,
        margin: '0 0 28px 0',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        Three key changes from the current sales deck to our recommended version
      </p>

      <div style={{
        display: 'flex',
        gap: 20,
      }}>
        {changes.map((c) => (
          <div key={c.num} style={{
            flex: '1 1 0',
            position: 'relative',
            padding: '20px 20px 18px',
            background: `${t.accentGold}08`,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
          }}>
            {/* Number badge */}
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGoldLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: 14,
            }}>
              {c.num}
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
              lineHeight: 1.3,
            }}>
              {c.title}
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              margin: 0,
              lineHeight: 1.55,
            }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================================
// MAIN EXPORT
// ============================================================================
export function SalesDeckIntegration({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{
      fontFamily: 'DM Sans, sans-serif',
      background: t.bg,
      minHeight: '100vh',
      padding: '60px 32px 80px',
      color: t.text,
    }}>
      {/* Page Title */}
      <div style={{
        maxWidth: 920,
        margin: '0 auto 20px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          color: t.accentGold,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          marginBottom: 12,
        }}>
          Brand Study
        </div>
        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 38,
          fontWeight: 700,
          color: t.text,
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}>
          Sales Deck Integration
        </h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          color: t.textMuted,
          marginTop: 14,
          lineHeight: 1.6,
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Exploring how Dex and AI capabilities integrate into the Dutchie sales deck's
          product hierarchy, from minimal changes to a full rethink.
        </p>
      </div>

      {/* Divider */}
      <div style={{
        maxWidth: 920,
        margin: '48px auto',
        height: 1,
        background: `linear-gradient(to right, transparent, ${t.border}, transparent)`,
      }} />

      {/* Slide 1 */}
      <Slide1 t={t} />

      <div style={{ height: 72 }} />

      {/* Slide 2 */}
      <Slide2 t={t} />

      <div style={{ height: 72 }} />

      {/* Slide 3 */}
      <Slide3 t={t} />

      <div style={{ height: 72 }} />

      {/* Slide 4 */}
      <Slide4 t={t} />

      <div style={{ height: 72 }} />

      {/* Slide 5 */}
      <Slide5 t={t} />

      <div style={{ height: 72 }} />

      {/* Slide 6 */}
      <Slide6 t={t} />

      {/* Summary */}
      <WhatChangedSummary t={t} />

      {/* Footer spacer */}
      <div style={{ height: 40 }} />
    </div>
  );
}
