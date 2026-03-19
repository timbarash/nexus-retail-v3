import React, { useState } from 'react';

// ============================================================================
// SalesDeckIntegration Component
// Recreates the Dutchie sales deck's product hierarchy and explores how
// AI/brand naming recommendations (Dex, Nexus) integrate with it.
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
// Sales Deck Color Palette (faithful to the original)
// ============================================================================
const deckColors = {
  forestGreen: '#1B4332',
  forestGreenLight: '#2D6A4F',
  forestGreenDark: '#143528',
  cream: '#F5F0E8',
  creamDark: '#E8E0D4',
  burgundy: '#5C2434',
  burgundyLight: '#7A3048',
  white: '#FFFFFF',
  offWhite: '#FAFAF5',
  textDark: '#1A1A18',
  textGreen: '#2D6A4F',
  checkGreen: '#40916C',
  gradientStart: '#FF6B6B',
  gradientMid1: '#FFA500',
  gradientMid2: '#FFD700',
  gradientMid3: '#40916C',
  gradientEnd: '#4A90D9',
};

// ============================================================================
// SVG Icons for Product Pillars
// ============================================================================
const PillarIcons = {
  ecommerce: (color = '#2D6A4F', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M4 4h2.5l1.2 2H24a1 1 0 0 1 .97 1.24l-2.5 10A1 1 0 0 1 21.5 18H9.5a1 1 0 0 1-.97-.76L5.8 6H4V4z" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="10" cy="22" r="2" fill={color} />
      <circle cx="20" cy="22" r="2" fill={color} />
    </svg>
  ),
  loyalty: (color = '#2D6A4F', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 24s-9-5.5-9-12c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2.1C16.6 6.8 18.2 6 20 6c3.3 0 6 2.7 6 6 0 6.5-9 12-9 12h-3z" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M10 14l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  retail: (color = '#2D6A4F', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="8" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="8" y="12" width="12" height="4" rx="1" stroke={color} strokeWidth="1.2" />
      <circle cx="19" cy="19" r="1.5" fill={color} />
      <path d="M4 8l2-4h16l2 4" stroke={color} strokeWidth="1.8" />
    </svg>
  ),
  nexus: (color = '#2D6A4F', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="9" stroke={color} strokeWidth="1.8" />
      <path d="M14 5v4M14 19v4M5 14h4M19 14h4" stroke={color} strokeWidth="1.2" />
      <circle cx="14" cy="14" r="3" fill={color} opacity="0.3" />
      <path d="M11 11l6 6M17 11l-6 6" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M14 8l2 3h-4l2-3z" fill={color} opacity="0.5" />
    </svg>
  ),
  connect: (color = '#2D6A4F', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="9" cy="14" r="4" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="19" cy="14" r="4" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M13 14h2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 7v3M19 7v3M9 18v3M19 18v3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  intelligence: (color = '#FFD700', size = 28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3l2 5h5l-4 3.5 1.5 5L14 13l-4.5 3.5L11 11.5 7 8h5l2-5z" fill={color} opacity="0.8" />
      <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  dex: (color = '#FFD700', size = 32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill={color} fontFamily="DM Sans">D</text>
    </svg>
  ),
};

// ============================================================================
// Product Pillar Data
// ============================================================================
const pillarsData = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: 'ecommerce',
    features: ['Collections + Outlets', 'Branded Mobile App', 'Digital Payments', 'Sponsored Placement', 'Kiosk'],
  },
  {
    id: 'loyalty',
    name: 'Loyalty + Marketing',
    icon: 'loyalty',
    features: ['Marketing Automation', 'Dynamic Segments', 'Email / Text / Push', 'Refer A Friend', 'IRL Events'],
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: 'retail',
    features: ['Register', 'Dynamic Pricing', 'Compliance', 'Discount Engine', 'Reporting'],
    highlighted: true,
  },
  {
    id: 'nexus',
    name: 'Nexus',
    icon: 'nexus',
    features: ['AI Command Center', 'Pricing Insights', 'Loyalty Score', 'Inventory Alerts', 'Brand Leaderboard'],
  },
  {
    id: 'connect',
    name: 'Connect',
    icon: 'connect',
    features: ['Global Catalog', 'Brand Discounts', 'POs + Invoices', 'Brand Intelligence', 'Cultivation & Mfg'],
  },
];

const intelligenceItems = [
  'Agentic Commerce', 'Voice AI', 'Intelligent Summaries',
  'Intelligence Everywhere', 'AI Sales Assistant', 'Consumer Sentiment', 'Dutchie Agent'
];

// ============================================================================
// Reusable Sub-Components
// ============================================================================

function SectionTitle({ children, subtitle, t }) {
  return (
    <div style={{ marginBottom: 48, textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 32, fontWeight: 700,
        color: t.text, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2
      }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: t.textMuted,
          marginTop: 12, lineHeight: 1.6, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto'
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SectionDivider({ t }) {
  return (
    <div style={{
      height: 1, background: `linear-gradient(to right, transparent, ${t.border}, transparent)`,
      margin: '80px 0'
    }} />
  );
}

// ============================================================================
// Deck Pillar Card
// ============================================================================
function DeckPillarCard({
  pillar,
  highlighted = false,
  customBg,
  customTextColor,
  customCheckColor,
  iconColor,
  badge,
  scale = 1,
  style = {},
}) {
  const bg = customBg || (highlighted ? deckColors.burgundy : deckColors.cream);
  const textColor = customTextColor || (highlighted ? '#FFFFFF' : deckColors.textDark);
  const checkColor = customCheckColor || (highlighted ? '#FFD700' : deckColors.checkGreen);
  const ic = iconColor || (highlighted ? '#FFD700' : deckColors.textGreen);

  const IconComponent = PillarIcons[pillar.icon];

  return (
    <div style={{
      background: bg,
      borderRadius: 16 * scale,
      padding: `${24 * scale}px ${20 * scale}px`,
      flex: 1,
      minWidth: 0,
      position: 'relative',
      boxShadow: highlighted
        ? '0 8px 32px rgba(92,36,52,0.3)'
        : '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s',
      ...style,
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -10 * scale, right: 12 * scale,
          background: '#FFD700', color: '#1A1A18', fontSize: 9 * scale,
          fontWeight: 700, padding: `${2 * scale}px ${8 * scale}px`,
          borderRadius: 10 * scale, fontFamily: 'DM Sans, sans-serif',
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {badge}
        </div>
      )}
      <div style={{
        width: 44 * scale, height: 44 * scale, borderRadius: '50%',
        background: highlighted ? 'rgba(255,215,0,0.15)' : 'rgba(45,106,79,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16 * scale,
      }}>
        {IconComponent && IconComponent(ic, 24 * scale)}
      </div>
      <h3 style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 17 * scale, fontWeight: 700,
        color: textColor, margin: 0, marginBottom: 14 * scale,
      }}>
        {pillar.name}
      </h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {pillar.features.map((f, i) => (
          <li key={i} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13 * scale,
            color: highlighted ? 'rgba(255,255,255,0.85)' : deckColors.textDark,
            marginBottom: 6 * scale, display: 'flex', alignItems: 'flex-start', gap: 6 * scale,
          }}>
            <span style={{ color: checkColor, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
              &#10003;
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// Intelligence Bar
// ============================================================================
function IntelligenceBar({
  items = intelligenceItems,
  highlightItem,
  customBg,
  customTextColor,
  gradientColors,
  label = 'Intelligence',
  scale = 1,
  style = {},
}) {
  const bg = customBg || 'rgba(255,255,255,0.06)';
  const textColor = customTextColor || 'rgba(255,255,255,0.85)';
  const gradient = gradientColors || `linear-gradient(to right, ${deckColors.gradientStart}, ${deckColors.gradientMid1}, ${deckColors.gradientMid2}, ${deckColors.gradientMid3}, ${deckColors.gradientEnd})`;

  return (
    <div style={{ marginTop: 24 * scale, ...style }}>
      <div style={{
        height: 3 * scale,
        background: gradient,
        borderRadius: 2 * scale,
        marginBottom: 12 * scale,
      }} />
      <div style={{
        background: bg,
        borderRadius: 12 * scale,
        padding: `${16 * scale}px ${20 * scale}px`,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 13 * scale, fontWeight: 700,
          color: textColor, marginBottom: 10 * scale, textTransform: 'uppercase',
          letterSpacing: '0.08em', opacity: 0.7,
        }}>
          {label}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${6 * scale}px ${10 * scale}px` }}>
          {items.map((item, i) => {
            const isHighlighted = highlightItem === item;
            return (
              <span key={i} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12 * scale,
                color: isHighlighted ? '#FFD700' : textColor,
                background: isHighlighted
                  ? 'rgba(255,215,0,0.15)'
                  : 'rgba(255,255,255,0.05)',
                padding: `${4 * scale}px ${10 * scale}px`,
                borderRadius: 8 * scale,
                fontWeight: isHighlighted ? 700 : 500,
                border: isHighlighted ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent',
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
// Full Deck Hierarchy
// ============================================================================
function DeckHierarchy({
  pillars = pillarsData,
  title,
  subtitle,
  intelligenceBarProps = {},
  cardOverrides = {},
  deckBg,
  titleColor,
  scale = 1,
  containerStyle = {},
  topBar,
  bottomNote,
}) {
  const bg = deckBg || deckColors.forestGreen;
  const tc = titleColor || '#FFFFFF';

  return (
    <div style={{
      background: bg,
      borderRadius: 20,
      padding: `${36 * scale}px ${32 * scale}px ${28 * scale}px`,
      ...containerStyle,
    }}>
      {topBar && <div style={{ marginBottom: 20 * scale }}>{topBar}</div>}
      {title && (
        <h3 style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 22 * scale, fontWeight: 700,
          color: tc, margin: 0, textAlign: 'center', marginBottom: 6 * scale,
        }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 13 * scale, color: 'rgba(255,255,255,0.6)',
          margin: 0, textAlign: 'center', marginBottom: 28 * scale,
        }}>
          {subtitle}
        </p>
      )}
      <div style={{
        display: 'flex', gap: 14 * scale, alignItems: 'stretch',
      }}>
        {pillars.map((p, i) => {
          const overrides = cardOverrides[p.id] || {};
          return (
            <DeckPillarCard
              key={p.id}
              pillar={p}
              highlighted={overrides.highlighted !== undefined ? overrides.highlighted : p.highlighted}
              customBg={overrides.bg}
              customTextColor={overrides.textColor}
              customCheckColor={overrides.checkColor}
              iconColor={overrides.iconColor}
              badge={overrides.badge}
              scale={scale}
              style={overrides.style || {}}
            />
          );
        })}
      </div>
      <IntelligenceBar scale={scale} {...intelligenceBarProps} />
      {bottomNote && <div style={{ marginTop: 16 * scale }}>{bottomNote}</div>}
    </div>
  );
}

// ============================================================================
// Dutchie Leaf Logo (simplified SVG)
// ============================================================================
function DutchieLogo({ color = '#40916C', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2-3 3-6.5 3-10S14 2 12 2z"
        fill={color} opacity="0.7"
      />
      <path
        d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10c2-3 3-6.5 3-10S14 2 12 2z"
        fill={color} opacity="0.5"
      />
      <path
        d="M12 4c0 5.5-2 10-5 14 1.5.7 3.2 1 5 1 5.5 0 10-4.5 10-10 0-3-1.3-5.6-3.4-7.4C16.6 3 14.4 4 12 4z"
        fill={color} opacity="0.3"
      />
    </svg>
  );
}

// ============================================================================
// Connection Line SVG for Section 2
// ============================================================================
function ConnectionLines({ scale = 1 }) {
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
          <stop offset="30%" stopColor="#FFD700" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Lines from bottom center (Dex) to each pillar card */}
      {[100, 280, 500, 720, 900].map((x, i) => (
        <line
          key={i}
          x1="500" y1="520" x2={x} y2="200"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.5"
        />
      ))}
      {/* Pulse circle at Dex */}
      <circle cx="500" cy="540" r="20" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" from="15" to="30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ============================================================================
// SECTION 1: The Current Deck
// ============================================================================
function Section1CurrentDeck({ t }) {
  return (
    <div>
      <SectionTitle t={t} subtitle="A faithful recreation of the Dutchie product hierarchy as shown in the current sales deck. Deep forest green background, cream cards, the Retail pillar highlighted in burgundy, and the Intelligence capability bar along the bottom.">
        Section 1: The Current Deck
      </SectionTitle>

      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        }}>
          <DutchieLogo color={deckColors.checkGreen} size={28} />
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
            color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            Dutchie Sales Deck -- Product Hierarchy
          </span>
        </div>

        <DeckHierarchy
          title="The Industry Standard for a Reason"
          subtitle="Powering 6,000+ dispensaries with the most complete cannabis technology platform"
        />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
      }}>
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
            color: t.accentGold, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Design Elements
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Deep forest green (#1B4332) background',
              'Cream (#F5F0E8) card backgrounds',
              'Rounded corners (16px) on all cards',
              'Circular green icon badges per pillar',
              'Checkmark bullet points for features',
            ].map((item, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
                marginBottom: 4, paddingLeft: 12, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
            color: t.accentGold, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Retail Highlight
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Burgundy background (#5C2434)',
              'White/light text instead of dark',
              'Gold checkmarks instead of green',
              'Signals "this is the core product"',
              'Intentional contrast draws eye center',
            ].map((item, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
                marginBottom: 4, paddingLeft: 12, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
            color: t.accentGold, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Intelligence Bar
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Rainbow gradient strip above the bar',
              '7 capability tags in flex layout',
              '"Dutchie Agent" sits alongside AI features',
              'Positioned below -- a platform layer',
              'Reads as "powers everything above"',
            ].map((item, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
                marginBottom: 4, paddingLeft: 12, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 2: Where Dex Lives
// ============================================================================
function Section2WhereDexLives({ t }) {
  return (
    <div>
      <SectionTitle t={t} subtitle="The same hierarchy slide, but now showing where the proposed Dex agent fits. Dex is not a new product -- it is the conversational face of the Intelligence layer, powering AI capabilities across every pillar.">
        Section 2: Where Dex Lives
      </SectionTitle>

      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{ position: 'relative' }}>
          <DeckHierarchy
            title="The Industry Standard -- Now with Dex"
            subtitle="Dex is the conversational interface to the Intelligence layer"
            intelligenceBarProps={{
              highlightItem: 'Dutchie Agent',
              label: 'Intelligence -- Powered by Dex',
            }}
            cardOverrides={{
              nexus: {
                badge: 'Dex Inside',
              },
            }}
          />
          <ConnectionLines />
        </div>
      </div>

      {/* Explanation cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
            color: t.text, marginBottom: 12,
          }}>
            What Dex Powers
          </div>
          {[
            { label: 'Agentic Commerce', desc: 'Dex handles customer queries, recommends products, processes returns' },
            { label: 'Voice AI', desc: 'Dex\'s voice interface for hands-free dispensary operations' },
            { label: 'AI Sales Assistant', desc: 'Dex helps budtenders with product knowledge and upsell suggestions' },
            { label: 'Intelligent Summaries', desc: 'Dex synthesizes data from across the platform into actionable insights' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: t.accentGold,
                flexShrink: 0, marginTop: 6,
              }} />
              <div>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
                  color: t.text,
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
                  marginLeft: 6,
                }}>
                  -- {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
            color: t.text, marginBottom: 12,
          }}>
            How Dex Connects to Each Pillar
          </div>
          {[
            { pillar: 'E-Commerce', connection: 'Dex handles storefront chat, product Q&A, order status' },
            { pillar: 'Loyalty + Marketing', connection: 'Dex personalizes outreach, triggers campaigns, manages segments' },
            { pillar: 'Retail', connection: 'Dex assists at register, manages pricing queries, compliance checks' },
            { pillar: 'Nexus', connection: 'Dex IS Nexus\'s interface -- the command center\'s voice' },
            { pillar: 'Connect', connection: 'Dex surfaces brand insights, negotiates pricing, manages catalog' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start',
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
                color: deckColors.forestGreenLight, background: 'rgba(45,106,79,0.1)',
                padding: '2px 8px', borderRadius: 6, flexShrink: 0, marginTop: 1,
              }}>
                {item.pillar}
              </div>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
              }}>
                {item.connection}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${deckColors.forestGreen}, ${deckColors.forestGreenDark})`,
        borderRadius: 12, padding: 24, textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700,
          color: '#FFFFFF', margin: 0, marginBottom: 8,
        }}>
          "Dex isn't a new product -- it's the face of the Intelligence layer"
        </p>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)',
          margin: 0,
        }}>
          Every capability in the Intelligence bar gets a name, a voice, and a personality
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 3: Three Evolution Paths
// ============================================================================
function Section3EvolutionPaths({ t }) {
  const [activeVersion, setActiveVersion] = useState('A');

  // Version A: Intelligence becomes a 6th pillar
  const versionAPillars = [
    ...pillarsData,
    {
      id: 'intelligence',
      name: 'Intelligence',
      icon: 'nexus',
      features: ['Dex Agent', 'Voice AI', 'Agentic Commerce', 'AI Sales Assistant', 'Consumer Sentiment'],
      highlighted: false,
    },
  ];

  // Version B: Nexus absorbs intelligence
  const versionBPillars = pillarsData.map(p => {
    if (p.id === 'nexus') {
      return {
        ...p,
        name: 'Nexus -- AI Command Center & Intelligence',
        features: ['Dex Agent', 'AI Command Center', 'Pricing Insights', 'Voice AI', 'Agentic Commerce', 'Consumer Sentiment', 'Brand Leaderboard'],
      };
    }
    return p;
  });

  // Version C: Platform flip (intelligence on top, pillars below)
  // Handled with custom layout

  const versions = {
    A: {
      title: 'Version A: "Intelligence Elevated"',
      desc: 'Intelligence moves from a bottom bar to a full 6th pillar, sitting alongside E-Commerce, Retail, and the rest. The other pillars get "AI-powered" badges. Intelligence is now a peer, not a layer.',
    },
    B: {
      title: 'Version B: "Nexus Absorbs Intelligence"',
      desc: 'Nexus grows larger, absorbing all Intelligence capabilities. The Intelligence bar disappears. Dex becomes a feature inside Nexus. The 5-pillar structure stays intact, but Nexus is clearly the AI brain.',
    },
    C: {
      title: 'Version C: "The Platform Flip"',
      desc: 'Intelligence moves to the TOP of the hierarchy. Products sit below, powered by the AI platform. This is the most dramatic repositioning -- AI becomes the foundation, not a feature.',
    },
  };

  return (
    <div>
      <SectionTitle t={t} subtitle="Three different visions of how the product hierarchy slide could evolve as AI becomes more central to Dutchie's value proposition. Each version uses the same forest green + cream visual language.">
        Section 3: Three Evolution Paths
      </SectionTitle>

      {/* Version Tabs */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center',
      }}>
        {['A', 'B', 'C'].map(v => (
          <button
            key={v}
            onClick={() => setActiveVersion(v)}
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
              background: activeVersion === v ? t.accentGold : t.cardBg,
              color: activeVersion === v ? '#0A0908' : t.textMuted,
              border: `1px solid ${activeVersion === v ? t.accentGold : t.border}`,
              borderRadius: 10, padding: '10px 24px', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Version {v}
          </button>
        ))}
      </div>

      {/* Version Description */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
        padding: 20, marginBottom: 24, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 700,
          color: t.text, marginBottom: 8,
        }}>
          {versions[activeVersion].title}
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted,
          margin: 0, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6,
        }}>
          {versions[activeVersion].desc}
        </p>
      </div>

      {/* Version A Render */}
      {activeVersion === 'A' && (
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
          padding: 32,
        }}>
          <DeckHierarchy
            pillars={versionAPillars}
            title="Intelligence Elevated"
            subtitle="AI is no longer just a layer -- it's a product pillar"
            intelligenceBarProps={{
              items: ['Orchestration', 'Data Pipeline', 'Model Training', 'Platform APIs'],
              label: 'Platform Infrastructure',
            }}
            cardOverrides={{
              ecommerce: { badge: 'AI-Powered' },
              loyalty: { badge: 'AI-Powered' },
              retail: { badge: 'AI-Powered' },
              nexus: { badge: 'AI-Powered' },
              connect: { badge: 'AI-Powered' },
              intelligence: {
                highlighted: true,
                bg: '#2D2066',
                textColor: '#FFFFFF',
                checkColor: '#A78BFA',
                iconColor: '#A78BFA',
                badge: 'NEW',
              },
            }}
            scale={0.9}
          />
          <div style={{
            marginTop: 20, textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
            fontStyle: 'italic',
          }}>
            Intelligence gets its own card. Every other pillar gets an "AI-Powered" badge. The platform bar shifts to infrastructure.
          </div>
        </div>
      )}

      {/* Version B Render */}
      {activeVersion === 'B' && (
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
          padding: 32,
        }}>
          <DeckHierarchy
            pillars={versionBPillars}
            title="Nexus Absorbs Intelligence"
            subtitle="The AI brain consolidates -- Nexus becomes the intelligence hub"
            intelligenceBarProps={{
              items: [],
              label: '',
              style: { display: 'none' },
            }}
            cardOverrides={{
              nexus: {
                highlighted: true,
                bg: '#1a1050',
                textColor: '#FFFFFF',
                checkColor: '#A78BFA',
                iconColor: '#A78BFA',
                badge: 'AI BRAIN',
                style: { flex: 1.6 },
              },
              retail: {
                highlighted: true,
              },
            }}
          />
          <div style={{
            marginTop: 16, background: 'rgba(45,106,79,0.08)', borderRadius: 10,
            padding: 16, textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
              fontStyle: 'italic',
            }}>
              The Intelligence bar is gone. Its capabilities now live inside Nexus. Dex is the "face" of Nexus -- the agent users interact with.
            </span>
          </div>
        </div>
      )}

      {/* Version C Render */}
      {activeVersion === 'C' && (
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
          padding: 32,
        }}>
          <div style={{
            background: deckColors.forestGreen,
            borderRadius: 20,
            padding: '36px 32px 28px',
          }}>
            <h3 style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 22, fontWeight: 700,
              color: '#FFFFFF', margin: 0, textAlign: 'center', marginBottom: 6,
            }}>
              The Platform Flip
            </h3>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)',
              margin: 0, textAlign: 'center', marginBottom: 20,
            }}>
              Everything is AI-powered. Intelligence is the foundation.
            </p>

            {/* Intelligence at TOP */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '20px 24px',
              marginBottom: 20,
              border: '1px solid rgba(255,215,0,0.2)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
              }}>
                {PillarIcons.dex('#FFD700', 36)}
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700,
                    color: '#FFD700',
                  }}>
                    Dex Intelligence Platform
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)',
                  }}>
                    The AI layer that powers every product
                  </div>
                </div>
              </div>
              <div style={{
                height: 3,
                background: `linear-gradient(to right, ${deckColors.gradientStart}, ${deckColors.gradientMid1}, ${deckColors.gradientMid2}, ${deckColors.gradientMid3}, ${deckColors.gradientEnd})`,
                borderRadius: 2, marginBottom: 14,
              }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
                {intelligenceItems.map((item, i) => (
                  <span key={i} style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                    color: 'rgba(255,255,255,0.8)',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '4px 10px', borderRadius: 8,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow down */}
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16M6 14l6 6 6-6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                Powers
              </div>
            </div>

            {/* Products below */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
              {pillarsData.map((p) => (
                <DeckPillarCard
                  key={p.id}
                  pillar={p}
                  highlighted={p.highlighted}
                  scale={0.85}
                />
              ))}
            </div>
          </div>

          <div style={{
            marginTop: 16, textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
            fontStyle: 'italic',
          }}>
            The most dramatic shift. Intelligence moves from the bottom to the top. Products are "powered by" the AI platform, not the other way around.
          </div>
        </div>
      )}

      {/* Comparison Matrix */}
      <div style={{
        marginTop: 32, background: t.cardBg, border: `1px solid ${t.border}`,
        borderRadius: 12, padding: 24,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
          color: t.text, marginBottom: 16,
        }}>
          Evolution Path Comparison
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif',
          }}>
            <thead>
              <tr>
                {['Dimension', 'Version A', 'Version B', 'Version C'].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left', padding: '10px 14px', fontSize: 12,
                    color: t.textFaint, fontWeight: 600, borderBottom: `1px solid ${t.border}`,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Disruption level', 'Low -- additive', 'Medium -- restructure', 'High -- repositioning'],
                ['Pillar count', '6 (adds Intelligence)', '5 (Nexus grows)', '5 (same, reordered)'],
                ['Intelligence bar', 'Becomes platform infra', 'Disappears into Nexus', 'Moves to top as hero'],
                ['Dex positioning', 'Inside Intelligence pillar', 'Feature of Nexus', 'Platform-level identity'],
                ['Sales motion change', 'Minimal -- "we added AI"', 'Moderate -- "Nexus evolved"', 'Major -- "AI-first platform"'],
                ['Best for', 'Near-term (Q1-Q2)', 'Mid-term (Q3-Q4)', 'Long-term vision (2027+)'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '10px 14px', fontSize: 13,
                      color: j === 0 ? t.text : t.textMuted,
                      fontWeight: j === 0 ? 600 : 400,
                      borderBottom: `1px solid ${t.border}`,
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 4: Design Language Exploration
// ============================================================================
function Section4DesignLanguage({ t }) {
  return (
    <div>
      <SectionTitle t={t} subtitle="Exploring how the sales deck's visual language could extend to AI-specific marketing. Three explorations: current palette applied to AI products, a darker premium theme, and an expanded Intelligence bar.">
        Section 4: Design Language Exploration
      </SectionTitle>

      {/* Exploration 1: Current Palette Applied to AI Products */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 700,
          color: t.text, marginBottom: 6,
        }}>
          Exploration 1: Current Palette Applied to AI Products
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted,
          marginBottom: 24,
        }}>
          Using the existing sales deck color language to style the AI-centric products.
        </p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          {/* Nexus in green accent style */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
              color: t.textFaint, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Nexus -- Green Accent Style
            </div>
            <DeckPillarCard
              pillar={{
                id: 'nexus',
                name: 'Nexus',
                icon: 'nexus',
                features: ['AI Command Center', 'Pricing Insights', 'Loyalty Score', 'Inventory Alerts', 'Brand Leaderboard'],
              }}
              customBg={deckColors.forestGreenLight}
              customTextColor="#FFFFFF"
              customCheckColor="#A8D8B9"
              iconColor="#A8D8B9"
            />
          </div>

          {/* Dex/Agent in burgundy highlight style */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
              color: t.textFaint, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Dex / Dutchie Agent -- Burgundy Highlight
            </div>
            <DeckPillarCard
              pillar={{
                id: 'dex',
                name: 'Dex',
                icon: 'nexus',
                features: ['Agentic Commerce', 'Voice AI', 'Intelligent Summaries', 'AI Sales Assistant', 'Consumer Sentiment'],
              }}
              highlighted
            />
          </div>

          {/* Connect in standard cream */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
              color: t.textFaint, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Connect -- Standard Cream Card
            </div>
            <DeckPillarCard
              pillar={pillarsData[4]}
            />
          </div>
        </div>

        <div style={{
          background: 'rgba(45,106,79,0.08)', borderRadius: 10, padding: 14,
          fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
          textAlign: 'center',
        }}>
          The current palette handles AI products naturally. Green accent for Nexus feels authoritative. Burgundy for Dex signals "special" -- the highlighted product. Cream for Connect keeps it grounded and approachable.
        </div>
      </div>

      {/* Exploration 2: What if the deck went darker? */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 700,
          color: t.text, marginBottom: 6,
        }}>
          Exploration 2: What If the Deck Went Darker?
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted,
          marginBottom: 24,
        }}>
          Same hierarchy, but with the premium dark theme from the design study. Gold accents replace green.
        </p>

        <DeckHierarchy
          pillars={pillarsData}
          title="The Industry Standard for a Reason"
          subtitle="Powering 6,000+ dispensaries with the most complete cannabis technology platform"
          deckBg="#0A0908"
          titleColor="#F0EDE8"
          cardOverrides={{
            ecommerce: {
              bg: '#1A1816', textColor: '#F0EDE8',
              checkColor: '#D4A03A', iconColor: '#D4A03A',
            },
            loyalty: {
              bg: '#1A1816', textColor: '#F0EDE8',
              checkColor: '#D4A03A', iconColor: '#D4A03A',
            },
            retail: {
              highlighted: true, bg: '#3D1A0A', textColor: '#F0EDE8',
              checkColor: '#FFC02A', iconColor: '#FFC02A',
            },
            nexus: {
              bg: '#1A1816', textColor: '#F0EDE8',
              checkColor: '#D4A03A', iconColor: '#D4A03A',
            },
            connect: {
              bg: '#1A1816', textColor: '#F0EDE8',
              checkColor: '#D4A03A', iconColor: '#D4A03A',
            },
          }}
          intelligenceBarProps={{
            customBg: 'rgba(212,160,58,0.08)',
            customTextColor: '#D4A03A',
            gradientColors: 'linear-gradient(to right, #D4A03A, #FFC02A, #FFD666, #D4A03A)',
          }}
        />

        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          <div style={{
            flex: 1, background: 'rgba(212,160,58,0.06)', borderRadius: 10, padding: 14,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700,
              color: t.accentGold, marginBottom: 6,
            }}>
              What changes
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted, margin: 0,
            }}>
              Dark backgrounds feel more premium, tech-forward, and sophisticated. Gold accents replace green, shifting the mood from "earthy cannabis" to "premium technology platform." The Retail highlight uses warm amber instead of burgundy.
            </p>
          </div>
          <div style={{
            flex: 1, background: 'rgba(212,160,58,0.06)', borderRadius: 10, padding: 14,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700,
              color: t.accentGold, marginBottom: 6,
            }}>
              The perception shift
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted, margin: 0,
            }}>
              This version reads less "cannabis industry leader" and more "enterprise intelligence platform." It would resonate with enterprise buyers and multi-state operators who care about sophistication. The AI story becomes more natural in this visual context.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration 3: Bigger Intelligence Bar */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 700,
          color: t.text, marginBottom: 6,
        }}>
          Exploration 3: What If the Intelligence Bar Was Bigger?
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted,
          marginBottom: 24,
        }}>
          Expanding the Intelligence bar from a small footer to the hero of the slide. This version sells "AI-first."
        </p>

        <div style={{
          background: deckColors.forestGreen, borderRadius: 20, padding: '36px 32px 28px',
        }}>
          <h3 style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700,
            color: '#FFFFFF', margin: 0, textAlign: 'center', marginBottom: 24,
          }}>
            The Industry Standard -- Now AI-First
          </h3>

          {/* Compact product row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'stretch' }}>
            {pillarsData.map(p => (
              <div key={p.id} style={{
                flex: 1, background: p.highlighted ? deckColors.burgundy : deckColors.cream,
                borderRadius: 12, padding: '14px 12px',
              }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
                  color: p.highlighted ? '#FFFFFF' : deckColors.textDark,
                  marginBottom: 6,
                }}>
                  {p.name}
                </div>
                {p.features.slice(0, 3).map((f, i) => (
                  <div key={i} style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                    color: p.highlighted ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,24,0.6)',
                    marginBottom: 2,
                  }}>
                    {f}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Huge Intelligence Section */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: '28px 24px',
            border: '1px solid rgba(255,215,0,0.15)',
          }}>
            <div style={{
              height: 4,
              background: `linear-gradient(to right, ${deckColors.gradientStart}, ${deckColors.gradientMid1}, ${deckColors.gradientMid2}, ${deckColors.gradientMid3}, ${deckColors.gradientEnd})`,
              borderRadius: 2, marginBottom: 20,
            }} />

            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20,
            }}>
              {PillarIcons.dex('#FFD700', 44)}
              <div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 24, fontWeight: 700,
                  color: '#FFD700', letterSpacing: '-0.01em',
                }}>
                  Intelligence
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  AI-powered intelligence woven into every product
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
            }}>
              {[
                { name: 'Agentic Commerce', desc: 'Autonomous AI-driven transactions' },
                { name: 'Voice AI', desc: 'Natural language for every workflow' },
                { name: 'Intelligent Summaries', desc: 'Data distilled into decisions' },
                { name: 'AI Sales Assistant', desc: 'Budtender copilot at the register' },
                { name: 'Consumer Sentiment', desc: 'Real-time market pulse analysis' },
                { name: 'Intelligence Everywhere', desc: 'AI embedded in every screen' },
                { name: 'Dutchie Agent', desc: 'Your AI-powered team member' },
                { name: 'Predictive Analytics', desc: 'Tomorrow\'s insights today' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12,
                }}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)', marginBottom: 4,
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                    color: 'rgba(255,255,255,0.45)',
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 16, textAlign: 'center',
          fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
          fontStyle: 'italic',
        }}>
          The Intelligence section now takes up roughly 60% of the slide. Products are summarized above. This version says: "AI is the headline."
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 5: The Naming Overlay
// ============================================================================
function Section5NamingOverlay({ t }) {
  const [activeScenario, setActiveScenario] = useState('A');

  // Scenario A: Keep current names, add Dex
  const scenarioAPillars = pillarsData.map(p => ({ ...p }));

  // Scenario B: Rename for AI era
  const scenarioBPillars = [
    { ...pillarsData[0], name: 'Dutchie Commerce' },
    { ...pillarsData[1], name: 'Dutchie Engage' },
    { ...pillarsData[2], name: 'Dutchie POS' },
    { ...pillarsData[3] },
    { ...pillarsData[4] },
  ];

  // Scenario C: Dex-centric
  const scenarioCPillars = pillarsData.map(p => ({ ...p }));

  const scenarios = {
    A: {
      title: 'Scenario A: Keep Current Names, Add Dex',
      tagline: 'Minimal change, maximum compatibility with existing sales motion',
      pillars: scenarioAPillars,
      deckTitle: 'The Industry Standard for a Reason',
      deckSubtitle: 'Now with Dex Intelligence across every product',
      intBarLabel: 'Dex Intelligence',
      intBarHighlight: 'Dutchie Agent',
      cardOverrides: {},
    },
    B: {
      title: 'Scenario B: Rename for the AI Era',
      tagline: 'Product names modernized for a platform-first positioning',
      pillars: scenarioBPillars,
      deckTitle: 'The Dutchie Platform',
      deckSubtitle: 'Powering the future of cannabis commerce',
      intBarLabel: 'Powered by Dex',
      intBarHighlight: null,
      cardOverrides: {
        ecommerce: { badge: 'Renamed' },
        loyalty: { badge: 'Renamed' },
        retail: { badge: 'Renamed' },
      },
    },
    C: {
      title: 'Scenario C: The Dex-Centric Deck',
      tagline: 'Dex becomes the hero. Products become where Dex shows up.',
      pillars: scenarioCPillars,
      deckTitle: 'Introducing Dex -- Intelligence Across Every Product',
      deckSubtitle: 'Meet Dex: your AI-powered dispensary intelligence agent',
      intBarLabel: 'Dex Capabilities',
      intBarHighlight: null,
      cardOverrides: {},
    },
  };

  const s = scenarios[activeScenario];

  return (
    <div>
      <SectionTitle t={t} subtitle="The same sales deck hierarchy slide with different naming strategies applied. Each scenario shows how the deck reads with varying degrees of AI branding integration.">
        Section 5: The Naming Overlay
      </SectionTitle>

      {/* Scenario Tabs */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center',
      }}>
        {['A', 'B', 'C'].map(v => (
          <button
            key={v}
            onClick={() => setActiveScenario(v)}
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
              background: activeScenario === v ? t.accentGold : t.cardBg,
              color: activeScenario === v ? '#0A0908' : t.textMuted,
              border: `1px solid ${activeScenario === v ? t.accentGold : t.border}`,
              borderRadius: 10, padding: '10px 24px', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Scenario {v}
          </button>
        ))}
      </div>

      {/* Scenario Description */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
        padding: 20, marginBottom: 24, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 700,
          color: t.text, marginBottom: 8,
        }}>
          {s.title}
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted,
          margin: 0,
        }}>
          {s.tagline}
        </p>
      </div>

      {/* Deck Render */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 24,
      }}>
        {activeScenario === 'C' ? (
          /* Scenario C: Dex-centric with top bar */
          <div style={{
            background: deckColors.forestGreen, borderRadius: 20,
            padding: '36px 32px 28px',
          }}>
            {/* Dex hero bar at top */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '16px 20px',
              marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16,
              border: '1px solid rgba(255,215,0,0.2)',
            }}>
              {PillarIcons.dex('#FFD700', 40)}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 18, fontWeight: 700,
                  color: '#FFD700', marginBottom: 4,
                }}>
                  Dex
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  Intelligence across every product
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 400 }}>
                {intelligenceItems.slice(0, 5).map((item, i) => (
                  <span key={i} style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 10,
                    color: '#FFD700', background: 'rgba(255,215,0,0.1)',
                    padding: '3px 8px', borderRadius: 6,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <h3 style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 22, fontWeight: 700,
              color: '#FFFFFF', margin: 0, textAlign: 'center', marginBottom: 6,
            }}>
              {s.deckTitle}
            </h3>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)',
              margin: 0, textAlign: 'center', marginBottom: 28,
            }}>
              {s.deckSubtitle}
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
              {s.pillars.map(p => (
                <DeckPillarCard
                  key={p.id}
                  pillar={p}
                  highlighted={p.highlighted}
                  badge={s.cardOverrides[p.id]?.badge}
                />
              ))}
            </div>
          </div>
        ) : (
          <DeckHierarchy
            pillars={s.pillars}
            title={s.deckTitle}
            subtitle={s.deckSubtitle}
            intelligenceBarProps={{
              label: s.intBarLabel,
              highlightItem: s.intBarHighlight,
            }}
            cardOverrides={s.cardOverrides}
          />
        )}
      </div>

      {/* Name Change Details */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
      }}>
        {[
          {
            scenario: 'A',
            changes: [
              { from: 'E-Commerce', to: 'E-Commerce', changed: false },
              { from: 'Loyalty + Marketing', to: 'Loyalty + Marketing', changed: false },
              { from: 'Retail', to: 'Retail', changed: false },
              { from: 'Nexus', to: 'Nexus', changed: false },
              { from: 'Connect', to: 'Connect', changed: false },
              { from: 'Intelligence', to: 'Dex Intelligence', changed: true },
            ],
          },
          {
            scenario: 'B',
            changes: [
              { from: 'E-Commerce', to: 'Dutchie Commerce', changed: true },
              { from: 'Loyalty + Marketing', to: 'Dutchie Engage', changed: true },
              { from: 'Retail', to: 'Dutchie POS', changed: true },
              { from: 'Nexus', to: 'Nexus', changed: false },
              { from: 'Connect', to: 'Connect', changed: false },
              { from: 'Intelligence', to: 'Powered by Dex', changed: true },
            ],
          },
          {
            scenario: 'C',
            changes: [
              { from: 'E-Commerce', to: 'E-Commerce', changed: false },
              { from: 'Loyalty + Marketing', to: 'Loyalty + Marketing', changed: false },
              { from: 'Retail', to: 'Retail', changed: false },
              { from: 'Nexus', to: 'Nexus', changed: false },
              { from: 'Connect', to: 'Connect', changed: false },
              { from: 'Headline', to: 'Introducing Dex', changed: true },
            ],
          },
        ].map((group, gi) => (
          <div key={gi} style={{
            background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
              color: t.text, marginBottom: 12,
            }}>
              Scenario {group.scenario} Changes
            </div>
            {group.changes.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                  color: t.textFaint, minWidth: 100,
                  textDecoration: c.changed ? 'line-through' : 'none',
                }}>
                  {c.from}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                  color: t.textFaint,
                }}>
                  {c.changed ? '\u2192' : '='}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
                  color: c.changed ? t.accentGold : t.textMuted,
                }}>
                  {c.to}
                </span>
              </div>
            ))}
            <div style={{
              marginTop: 10, padding: '6px 10px', borderRadius: 8,
              background: 'rgba(212,160,58,0.06)',
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: t.textMuted,
            }}>
              {gi === 0 && 'Only the Intelligence bar gets a name. Everything else stays.'}
              {gi === 1 && '4 name changes total. Products get "Dutchie" prefix for cohesion.'}
              {gi === 2 && 'Zero product renames. The headline does all the work.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 6: Slide Recommendations
// ============================================================================
function Section6Recommendations({ t }) {
  return (
    <div>
      <SectionTitle t={t} subtitle="A concise recommendation based on the analysis of evolution paths and naming scenarios. The goal: elevate AI in the sales story with minimal disruption to the existing motion.">
        Section 6: Slide Recommendations
      </SectionTitle>

      {/* Recommendation Card */}
      <div style={{
        background: `linear-gradient(135deg, ${t.cardBg}, ${t.bg})`,
        border: `2px solid ${t.accentGold}`,
        borderRadius: 16, padding: 36, marginBottom: 32,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGoldLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#0A0908" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="#0A0908" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
              color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Recommended Approach
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 22, fontWeight: 700,
              color: t.text,
            }}>
              Version A + Scenario A
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
              color: t.text, marginBottom: 8,
            }}>
              Evolution: "Intelligence Elevated"
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
              margin: 0, lineHeight: 1.6,
            }}>
              Intelligence moves from a bottom bar to a 6th product pillar. It sits alongside E-Commerce, Retail, and the rest. Every existing pillar gets an "AI-Powered" badge. This is additive, not disruptive. The existing sales story stays intact while AI gets a clear seat at the table.
            </p>
          </div>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
              color: t.text, marginBottom: 8,
            }}>
              Naming: "Keep Names, Add Dex"
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
              margin: 0, lineHeight: 1.6,
            }}>
              E-Commerce stays E-Commerce. Retail stays Retail. No relearning required for the sales team, no confusing existing customers. The only new name is "Dex" -- appearing in the Intelligence pillar and as a badge across other products. One new name, maximum impact.
            </p>
          </div>
        </div>

        <div style={{
          background: `rgba(212,160,58,0.08)`, borderRadius: 12, padding: 20,
          marginBottom: 24, borderLeft: `3px solid ${t.accentGold}`,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
            color: t.accentGold, marginBottom: 8,
          }}>
            Why This Combination
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Least disruptive to the existing sales motion -- reps can learn the new version in minutes',
              'Clearly elevates AI from a "feature bar" to a "product pillar" -- signals investment and commitment',
              '"AI-Powered" badges on existing pillars tell the story without changing the product names',
              'Dex gets introduced as the Intelligence pillar\'s star feature, not a jarring rebrand',
              'Compatible with further evolution -- if Version B or C becomes right later, the path is natural',
            ].map((item, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textMuted,
                marginBottom: 6, paddingLeft: 16, position: 'relative', lineHeight: 1.5,
              }}>
                <span style={{
                  position: 'absolute', left: 0, color: t.accentGreen, fontWeight: 700,
                }}>
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: t.cardBg, borderRadius: 12, padding: 20,
          border: `1px solid ${t.border}`, textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
            color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 10,
          }}>
            The One-Slide Pitch
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700,
            color: t.text, lineHeight: 1.4,
          }}>
            "Dutchie is the industry standard.{' '}
            <span style={{ color: t.accentGold }}>
              Now with Dex
            </span>{' '}
            -- AI intelligence across every product."
          </div>
        </div>
      </div>

      {/* Recommended Final Slide Mockup */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        }}>
          <DutchieLogo color={deckColors.checkGreen} size={28} />
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
            color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            Recommended Final Slide
          </span>
        </div>

        <DeckHierarchy
          pillars={[
            ...pillarsData,
            {
              id: 'intelligence',
              name: 'Intelligence',
              icon: 'nexus',
              features: ['Dex Agent', 'Voice AI', 'Agentic Commerce', 'AI Sales Assistant', 'Consumer Sentiment'],
            },
          ]}
          title="The Industry Standard for a Reason"
          subtitle="Powering 6,000+ dispensaries -- now with Dex AI intelligence across every product"
          intelligenceBarProps={{
            items: ['Platform APIs', 'Data Pipeline', 'Model Training', 'Orchestration Engine'],
            label: 'Platform Infrastructure',
          }}
          cardOverrides={{
            ecommerce: { badge: 'AI-Powered' },
            loyalty: { badge: 'AI-Powered' },
            retail: { badge: 'AI-Powered' },
            nexus: { badge: 'AI-Powered' },
            connect: { badge: 'AI-Powered' },
            intelligence: {
              highlighted: true,
              bg: '#2D2066',
              textColor: '#FFFFFF',
              checkColor: '#A78BFA',
              iconColor: '#A78BFA',
              badge: 'NEW',
            },
          }}
          scale={0.95}
        />
      </div>

      {/* Implementation Timeline */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
        padding: 24, marginBottom: 32,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
          color: t.text, marginBottom: 16,
        }}>
          Rollout Timeline
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            {
              phase: 'Phase 1 (Now)',
              title: 'Add Dex to deck',
              items: [
                'Add Intelligence as 6th pillar',
                'Add AI-Powered badges',
                'Update subtitle to mention Dex',
                'Keep all existing names',
              ],
            },
            {
              phase: 'Phase 2 (Q2)',
              title: 'Deepen the story',
              items: [
                'Add Dex demo video link to slide',
                'Create Dex-specific follow-up slides',
                'Develop "Dex in action" case studies',
                'Train sales team on AI narrative',
              ],
            },
            {
              phase: 'Phase 3 (Q3-Q4)',
              title: 'Evaluate & evolve',
              items: [
                'Measure deck engagement metrics',
                'Consider Version B if Nexus grows',
                'Evaluate name changes (Scenario B)',
                'Plan 2027 deck refresh',
              ],
            },
          ].map((phase, i) => (
            <div key={i} style={{
              flex: 1, background: `rgba(212,160,58,${0.04 + i * 0.02})`,
              borderRadius: 10, padding: 16,
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
                color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.06em',
                marginBottom: 6,
              }}>
                {phase.phase}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
                color: t.text, marginBottom: 10,
              }}>
                {phase.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {phase.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: t.textMuted,
                    marginBottom: 4, paddingLeft: 14, position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, color: t.accentGreen, fontSize: 10,
                    }}>
                      &#9679;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Matrix */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
        padding: 24,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 700,
          color: t.text, marginBottom: 16,
        }}>
          Decision Matrix: Why Version A + Scenario A Wins
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif',
          }}>
            <thead>
              <tr>
                {['Criterion', 'Weight', 'V.A + S.A (Rec.)', 'V.B + S.B', 'V.C + S.C'].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left', padding: '10px 14px', fontSize: 12,
                    color: t.textFaint, fontWeight: 600, borderBottom: `1px solid ${t.border}`,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Sales team adoption', 'High', '9/10', '6/10', '4/10'],
                ['Customer confusion risk', 'High', 'Low', 'Medium', 'High'],
                ['AI story clarity', 'Medium', '8/10', '9/10', '10/10'],
                ['Implementation speed', 'Medium', '< 1 week', '2-4 weeks', '6-8 weeks'],
                ['Future flexibility', 'Low', 'High', 'Medium', 'Low'],
                ['Brand consistency', 'Medium', 'Very high', 'Medium', 'Low'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '10px 14px', fontSize: 13,
                      color: j === 0 ? t.text : (j === 2 ? t.accentGreen : t.textMuted),
                      fontWeight: j === 0 || j === 2 ? 600 : 400,
                      borderBottom: `1px solid ${t.border}`,
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: SalesDeckIntegration
// ============================================================================
export function SalesDeckIntegration({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{
      background: t.bg,
      minHeight: '100vh',
      fontFamily: 'DM Sans, sans-serif',
      color: t.text,
    }}>
      {/* Google Fonts Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 40px 80px',
      }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: `rgba(212,160,58,0.08)`, borderRadius: 20,
            padding: '6px 16px', marginBottom: 20,
          }}>
            <DutchieLogo color={t.accentGold} size={18} />
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
              color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Sales Deck Integration Study
            </span>
          </div>
          <h1 style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 44, fontWeight: 700,
            color: t.text, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.15,
          }}>
            From Current Deck to<br />
            <span style={{ color: t.accentGold }}>AI-Powered Future</span>
          </h1>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 17, color: t.textMuted,
            marginTop: 16, lineHeight: 1.6, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Mapping the Dutchie product hierarchy from the current sales deck, exploring where
            Dex and AI intelligence fit, and recommending how the deck should evolve.
          </p>
        </div>

        {/* Table of Contents */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 28, marginBottom: 64,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
            color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 16,
          }}>
            Sections in This Study
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { num: '01', title: 'The Current Deck', desc: 'Faithful recreation of the product hierarchy slide' },
              { num: '02', title: 'Where Dex Lives', desc: 'Mapping the agent to the existing hierarchy' },
              { num: '03', title: 'Three Evolution Paths', desc: 'How the hierarchy could restructure for AI' },
              { num: '04', title: 'Design Language', desc: 'Visual explorations of the deck\'s look and feel' },
              { num: '05', title: 'The Naming Overlay', desc: 'Different naming strategies applied to the deck' },
              { num: '06', title: 'Slide Recommendations', desc: 'The recommended approach with final mockup' },
            ].map((section, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700,
                  color: t.accentGold, opacity: 0.4, flexShrink: 0, minWidth: 28,
                }}>
                  {section.num}
                </span>
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
                    color: t.text, marginBottom: 2,
                  }}>
                    {section.title}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: t.textFaint,
                  }}>
                    {section.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 1 */}
        <Section1CurrentDeck t={t} />
        <SectionDivider t={t} />

        {/* SECTION 2 */}
        <Section2WhereDexLives t={t} />
        <SectionDivider t={t} />

        {/* SECTION 3 */}
        <Section3EvolutionPaths t={t} />
        <SectionDivider t={t} />

        {/* SECTION 4 */}
        <Section4DesignLanguage t={t} />
        <SectionDivider t={t} />

        {/* SECTION 5 */}
        <Section5NamingOverlay t={t} />
        <SectionDivider t={t} />

        {/* SECTION 6 */}
        <Section6Recommendations t={t} />

        {/* Footer */}
        <div style={{
          marginTop: 80, paddingTop: 32,
          borderTop: `1px solid ${t.border}`, textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: t.textFaint,
          }}>
            Sales Deck Integration Study -- Dutchie AI Brand & Naming Initiative
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: t.textFaint,
            opacity: 0.5, marginTop: 4,
          }}>
            Based on current sales deck hierarchy as of Q1 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesDeckIntegration;
