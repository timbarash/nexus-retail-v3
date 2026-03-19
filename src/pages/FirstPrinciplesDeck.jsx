import React, { useState } from 'react';

// ============================================================================
// FirstPrinciplesDeck — Three deeply thought-through slide concepts
// for showing Dutchie's product hierarchy with Dex/AI as central.
//
// Each concept includes:
//   A. The 30-Second Script (what the rep actually says)
//   B. The "Aha" Moment (the insight that clicks)
//   C. The Visual (presentation-quality CSS diagram, 16:9)
//   D. Why This Works / Why It Might Not
//   E. "Say This, Not That" language guidance
//
// Export: FirstPrinciplesDeck({ theme = 'dark' })
// ============================================================================

const themes = {
  dark: {
    bg: '#0A0908',
    cardBg: '#141210',
    border: '#282724',
    text: '#F0EDE8',
    textMuted: '#ADA599',
    textFaint: '#6B6359',
    accentGold: '#D4A03A',
    accentGoldLight: '#FFC02A',
    accentGoldLighter: '#FFD666',
    accentGreen: '#00C27C',
  },
  light: {
    bg: '#F5F4F2',
    cardBg: '#FAFAF9',
    border: '#E8E5E0',
    text: '#1C1917',
    textMuted: '#57534E',
    textFaint: '#A8A29E',
    accentGold: '#A17A1A',
    accentGoldLight: '#C49A2A',
    accentGoldLighter: '#D4A03A',
    accentGreen: '#047857',
  },
};

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ============================================================================
// Slide colors — the actual Dutchie palette for slide backgrounds
// ============================================================================
const SLIDE = {
  forestGreen: '#1B3D2F',
  forestGreenLight: '#234D3C',
  forestGreenDark: '#142E23',
  cream: '#F5EFE3',
  creamMuted: '#D9D0C1',
  burgundy: '#5C2434',
  burgundyLight: '#7A3348',
  gold: '#D4A03A',
  goldBright: '#FFC02A',
  goldLight: '#FFD666',
  darkPremium: '#0C0B0A',
  darkPremiumCard: '#1A1814',
  white: '#FFFFFF',
  whiteAlpha80: 'rgba(255,255,255,0.80)',
  whiteAlpha60: 'rgba(255,255,255,0.60)',
  whiteAlpha40: 'rgba(255,255,255,0.40)',
  whiteAlpha20: 'rgba(255,255,255,0.20)',
  whiteAlpha10: 'rgba(255,255,255,0.10)',
  whiteAlpha05: 'rgba(255,255,255,0.05)',
  greenAccent: '#00C27C',
  blue: '#64A8E0',
  coral: '#E07B6B',
};

// ============================================================================
// Dex Spiral Logo (inline SVG)
// ============================================================================
function DexSpiral({ size = 48, color1, color2, color3 }) {
  const c0 = color1 || SLIDE.gold;
  const c1 = color2 || SLIDE.goldBright;
  const c2 = color3 || SLIDE.goldLight;
  const id = `dex-fp-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c0} />
          <stop offset="50%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <path
        d="M50 95 A45 45 0 0 1 5 50 A27.8 27.8 0 0 1 32.8 22.2 A17.2 17.2 0 0 1 50 39.4 A10.6 10.6 0 0 1 39.4 50 A6.6 6.6 0 0 1 46 56.6 A4 4 0 0 1 50 52.6 A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}


// ============================================================================
// Section-level writing components
// ============================================================================

function ConceptHeader({ number, title, subtitle, t }) {
  return (
    <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: `2px solid ${t.accentGold}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: '50%',
          background: t.accentGold, color: '#0A0908',
          fontWeight: 700, fontSize: 18, fontFamily: FONT, flexShrink: 0,
        }}>
          {number}
        </span>
        <h2 style={{
          margin: 0, fontSize: 28, fontWeight: 700,
          color: t.text, fontFamily: FONT, lineHeight: 1.2, letterSpacing: '-0.01em',
        }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{
          margin: 0, fontSize: 16, color: t.accentGold, fontStyle: 'italic',
          paddingLeft: 56, fontFamily: FONT, lineHeight: 1.5,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function WritingSection({ label, children, t, gold }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: gold ? t.accentGold : t.textFaint, marginBottom: 10, fontFamily: FONT,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {gold && <span style={{ width: 16, height: 2, background: t.accentGold, borderRadius: 1 }} />}
        {label}
      </div>
      <div style={{ fontSize: 15, color: t.text, lineHeight: 1.7, fontFamily: FONT }}>
        {children}
      </div>
    </div>
  );
}

function ScriptBlock({ children, t }) {
  return (
    <div style={{
      background: `${t.accentGold}08`,
      border: `1px solid ${t.accentGold}30`,
      borderRadius: 12, padding: 24, marginBottom: 32,
      borderLeft: `3px solid ${t.accentGold}`,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: t.accentGold, marginBottom: 12, fontFamily: FONT,
      }}>
        The 30-Second Script
      </div>
      <div style={{
        fontSize: 16, color: t.text, lineHeight: 1.8, fontFamily: FONT, fontStyle: 'italic',
      }}>
        {children}
      </div>
    </div>
  );
}

function AhaBlock({ children, t }) {
  return (
    <div style={{
      background: `${t.accentGreen}08`,
      border: `1px solid ${t.accentGreen}30`,
      borderRadius: 12, padding: 20, marginBottom: 32,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: t.accentGreen, marginBottom: 8, fontFamily: FONT,
      }}>
        The "Aha" Moment
      </div>
      <div style={{
        fontSize: 15, color: t.text, lineHeight: 1.7, fontFamily: FONT, fontWeight: 500,
      }}>
        {children}
      </div>
    </div>
  );
}

function ProConBlock({ pros, cons, t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
      <div style={{
        background: `${t.accentGreen}08`, border: `1px solid ${t.accentGreen}25`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: t.accentGreen, marginBottom: 12, fontFamily: FONT,
        }}>
          Why This Works
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: t.text, lineHeight: 1.8, fontFamily: FONT }}>
          {pros.map((p, i) => <li key={i} style={{ marginBottom: 6 }}>{p}</li>)}
        </ul>
      </div>
      <div style={{
        background: `${SLIDE.coral}08`, border: `1px solid ${SLIDE.coral}25`,
        borderRadius: 12, padding: 20,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: SLIDE.coral, marginBottom: 12, fontFamily: FONT,
        }}>
          Why It Might Not
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: t.text, lineHeight: 1.8, fontFamily: FONT }}>
          {cons.map((c, i) => <li key={i} style={{ marginBottom: 6 }}>{c}</li>)}
        </ul>
      </div>
    </div>
  );
}

function SayThisBlock({ items, t }) {
  return (
    <div style={{
      background: t.cardBg, border: `1px solid ${t.border}`,
      borderRadius: 12, padding: 24, marginBottom: 32,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: t.accentGold, marginBottom: 16, fontFamily: FONT,
      }}>
        Say This, Not That
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 20px 1fr', gap: 12, alignItems: 'start' }}>
            <div style={{
              background: `${t.accentGreen}10`, borderRadius: 8, padding: '10px 14px',
              fontSize: 14, color: t.accentGreen, fontFamily: FONT, fontWeight: 500, lineHeight: 1.5,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: 4 }}>Say</span>
              "{item.say}"
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 22, color: t.textFaint, fontSize: 16 }}>
              vs
            </div>
            <div style={{
              background: `${SLIDE.coral}08`, borderRadius: 8, padding: '10px 14px',
              fontSize: 14, color: SLIDE.coral, fontFamily: FONT, fontWeight: 500, lineHeight: 1.5, opacity: 0.85,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: 4 }}>Not</span>
              "{item.not}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================================
// CONCEPT 1: "The Intelligent Platform" (Three-Layer Sandwich)
// ============================================================================

function Slide1_IntelligentPlatform() {
  // Three-layer sandwich on forest green
  // Top: Product cards (POS, E-Commerce, Loyalty+Marketing, Connect)
  // Middle: Dex intelligence layer — wide golden band with capabilities
  // Bottom: Nexus data platform — the infrastructure foundation

  return (
    <div style={{
      width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden',
      background: `radial-gradient(ellipse 80% 70% at 50% 35%, #1E4535, #1B3D2F 50%, #142E23)`,
      fontFamily: FONT, position: 'relative', display: 'flex', flexDirection: 'column',
      padding: '48px 56px 40px',
      boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
    }}>
      {/* Subtle grid texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: SLIDE.whiteAlpha40, marginBottom: 8,
          }}>
            The Dutchie Platform
          </div>
          <div style={{
            fontSize: 32, fontWeight: 700, color: SLIDE.white, lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            One Intelligent Platform.<br />
            <span style={{ color: SLIDE.gold }}>Every Touchpoint.</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: SLIDE.whiteAlpha40, textAlign: 'right', lineHeight: 1.6 }}>
          dutchie
        </div>
      </div>

      {/* Three-layer stack — grows to fill remaining space */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', zIndex: 1 }}>

        {/* LAYER 1: Products (top) */}
        <div style={{ flex: '0 0 auto', marginBottom: 0 }}>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: SLIDE.whiteAlpha40, marginBottom: 10,
          }}>
            Products
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            {/* E-Commerce */}
            <div style={{
              background: SLIDE.cream, borderRadius: 10, padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: SLIDE.forestGreen, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" fill={SLIDE.cream} />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" fill={SLIDE.cream} />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" fill={SLIDE.cream} />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" fill={SLIDE.cream} />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: SLIDE.forestGreenDark }}>E-Commerce</span>
              </div>
              <div style={{ fontSize: 10, color: '#6B7B6E', lineHeight: 1.4 }}>
                Menus, marketplace, payments, kiosk
              </div>
            </div>

            {/* Retail / POS */}
            <div style={{
              background: SLIDE.cream, borderRadius: 10, padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: SLIDE.burgundy, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="14" rx="2" stroke={SLIDE.cream} strokeWidth="2" fill="none" />
                    <line x1="2" y1="10" x2="22" y2="10" stroke={SLIDE.cream} strokeWidth="1.5" />
                    <rect x="6" y="18" width="12" height="3" rx="1" fill={SLIDE.cream} />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: SLIDE.forestGreenDark }}>Retail (POS)</span>
              </div>
              <div style={{ fontSize: 10, color: '#6B7B6E', lineHeight: 1.4 }}>
                Point of sale, inventory, compliance
              </div>
            </div>

            {/* Loyalty + Marketing */}
            <div style={{
              background: SLIDE.cream, borderRadius: 10, padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={SLIDE.cream} />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: SLIDE.forestGreenDark }}>Loyalty</span>
              </div>
              <div style={{ fontSize: 10, color: '#6B7B6E', lineHeight: 1.4 }}>
                Rewards, profiles, promotions, CRM
              </div>
            </div>

            {/* Connect */}
            <div style={{
              background: SLIDE.cream, borderRadius: 10, padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: '#1A5276', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="8" cy="12" r="3" stroke={SLIDE.cream} strokeWidth="2" fill="none" />
                    <circle cx="16" cy="12" r="3" stroke={SLIDE.cream} strokeWidth="2" fill="none" />
                    <line x1="11" y1="12" x2="13" y2="12" stroke={SLIDE.cream} strokeWidth="2" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: SLIDE.forestGreenDark }}>Connect</span>
              </div>
              <div style={{ fontSize: 10, color: '#6B7B6E', lineHeight: 1.4 }}>
                B2B wholesale, partner network
              </div>
            </div>
          </div>
        </div>

        {/* Visual connectors — vertical lines down from products into Dex */}
        <div style={{
          display: 'flex', justifyContent: 'space-around', padding: '0 60px',
          height: 18, position: 'relative',
        }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 1, height: '100%',
              background: `linear-gradient(to bottom, ${SLIDE.whiteAlpha20}, ${SLIDE.gold}60)`,
            }} />
          ))}
        </div>

        {/* LAYER 2: Dex Intelligence Layer (middle) — the golden band */}
        <div style={{
          flex: '0 0 auto',
          background: `linear-gradient(135deg, ${SLIDE.gold}18, ${SLIDE.goldBright}12, ${SLIDE.gold}18)`,
          border: `1.5px solid ${SLIDE.gold}50`,
          borderRadius: 12,
          padding: '18px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle shimmer effect */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            background: `linear-gradient(90deg, transparent 0%, ${SLIDE.goldBright} 50%, transparent 100%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <DexSpiral size={36} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: SLIDE.gold, letterSpacing: '-0.01em' }}>
                  Powered by Dex
                </div>
                <div style={{ fontSize: 11, color: SLIDE.whiteAlpha60, marginTop: 2 }}>
                  Intelligence that connects every product and every customer interaction
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Agentic Commerce', 'Voice AI', 'Intelligent Summaries', 'AI Sales Assistant', 'Sentiment'].map((cap, i) => (
                <div key={i} style={{
                  fontSize: 10, fontWeight: 600, color: SLIDE.gold, letterSpacing: '0.04em',
                  padding: '5px 10px', borderRadius: 6,
                  background: `${SLIDE.gold}15`, border: `1px solid ${SLIDE.gold}25`,
                  whiteSpace: 'nowrap',
                }}>
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual connectors — vertical lines down from Dex into Nexus */}
        <div style={{
          display: 'flex', justifyContent: 'space-around', padding: '0 120px',
          height: 18, position: 'relative',
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 1, height: '100%',
              background: `linear-gradient(to bottom, ${SLIDE.gold}40, ${SLIDE.greenAccent}40)`,
            }} />
          ))}
        </div>

        {/* LAYER 3: Nexus Data Platform (bottom) — the infrastructure */}
        <div style={{
          flex: '0 0 auto',
          background: `linear-gradient(135deg, ${SLIDE.whiteAlpha05}, ${SLIDE.whiteAlpha05})`,
          border: `1px solid ${SLIDE.whiteAlpha10}`,
          borderRadius: 10,
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="6" rx="8" ry="3" stroke={SLIDE.greenAccent} strokeWidth="1.5" fill="none" />
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke={SLIDE.greenAccent} strokeWidth="1.5" fill="none" />
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke={SLIDE.greenAccent} strokeWidth="1.5" fill="none" />
            </svg>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: SLIDE.whiteAlpha80 }}>Nexus Data Platform</div>
              <div style={{ fontSize: 10, color: SLIDE.whiteAlpha40 }}>Cannabis-specific data foundation: integrations, APIs, compliance, analytics</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Integrations', 'APIs', 'Webhooks', 'Analytics'].map((item, i) => (
              <span key={i} style={{
                fontSize: 10, color: SLIDE.whiteAlpha40, fontWeight: 500,
                padding: '4px 8px', borderRadius: 4, background: SLIDE.whiteAlpha05,
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontSize: 10, color: SLIDE.whiteAlpha20 }}>
          Confidential
        </div>
        <div style={{ fontSize: 10, color: SLIDE.whiteAlpha20 }}>
          dutchie.com
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// CONCEPT 2: "The Transformation" (Before -> After)
// ============================================================================

function Slide2_Transformation() {
  // Left: "Before" — disconnected silos, greyed out
  // Right: "After" — connected, illuminated by Dex, golden energy lines

  const siloProducts = [
    { name: 'E-Commerce', icon: 'EC', sub: 'Menus, marketplace' },
    { name: 'POS', icon: 'POS', sub: 'Point of sale' },
    { name: 'Loyalty', icon: 'LY', sub: 'Rewards, CRM' },
    { name: 'Connect', icon: 'CN', sub: 'Wholesale' },
  ];

  return (
    <div style={{
      width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden',
      background: SLIDE.darkPremium,
      fontFamily: FONT, position: 'relative', display: 'flex', flexDirection: 'column',
      boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
    }}>
      {/* Subtle radial glow on the right side only */}
      <div style={{
        position: 'absolute', right: 0, top: 0, width: '55%', height: '100%',
        background: `radial-gradient(ellipse 80% 60% at 60% 50%, ${SLIDE.gold}08, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ padding: '44px 56px 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: SLIDE.whiteAlpha40, marginBottom: 10,
        }}>
          The Dex Difference
        </div>
        <div style={{
          fontSize: 30, fontWeight: 700, color: SLIDE.white, lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          From Disconnected Tools to <span style={{ color: SLIDE.gold }}>Intelligent Platform</span>
        </div>
      </div>

      {/* Two-panel comparison */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 56px 1fr',
        padding: '28px 56px 40px', gap: 0, position: 'relative', zIndex: 1,
        alignItems: 'center',
      }}>

        {/* LEFT: Before — disconnected */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '28px 24px',
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)', marginBottom: 20,
          }}>
            Without Dex
          </div>

          <div style={{
            flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            alignContent: 'center',
          }}>
            {siloProducts.map((prod, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '14px 14px',
                opacity: 0.5,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)',
                  marginBottom: 8,
                }}>
                  {prod.icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
                  {prod.name}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', marginTop: 2 }}>
                  {prod.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Pain points */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Data silos between systems', 'Manual reporting across tools', 'No unified customer view'].map((pain, i) => (
              <div key={i} style={{
                fontSize: 10, color: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ color: SLIDE.coral, fontSize: 12 }}>--</span>
                {pain}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Arrow/transition indicator */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke={SLIDE.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <DexSpiral size={28} />
        </div>

        {/* RIGHT: After — connected with Dex */}
        <div style={{
          background: `linear-gradient(135deg, ${SLIDE.gold}08, ${SLIDE.gold}04)`,
          border: `1.5px solid ${SLIDE.gold}30`,
          borderRadius: 14, padding: '28px 24px',
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Subtle gold radial glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '80%', height: '80%', borderRadius: '50%',
            background: `radial-gradient(circle, ${SLIDE.gold}08, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: SLIDE.gold, marginBottom: 20, position: 'relative', zIndex: 1,
          }}>
            With Dex
          </div>

          <div style={{
            flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            alignContent: 'center', position: 'relative', zIndex: 1,
          }}>
            {siloProducts.map((prod, i) => (
              <div key={i} style={{
                background: SLIDE.cream,
                border: 'none',
                borderRadius: 10, padding: '14px 14px',
                boxShadow: `0 2px 12px ${SLIDE.gold}15`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: i === 0 ? SLIDE.forestGreen : i === 1 ? SLIDE.burgundy : i === 2 ? '#2D6A4F' : '#1A5276',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: SLIDE.cream,
                  marginBottom: 8,
                }}>
                  {prod.icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: SLIDE.forestGreenDark }}>
                  {prod.name}
                </div>
                <div style={{ fontSize: 9, color: '#6B7B6E', marginTop: 2 }}>
                  {prod.sub}
                </div>
              </div>
            ))}
          </div>

          {/* SVG connection lines between the 4 product cards */}
          <svg style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 0,
          }}>
            <line x1="35%" y1="42%" x2="65%" y2="42%" stroke={SLIDE.gold} strokeWidth="1" opacity="0.2" strokeDasharray="4 3" />
            <line x1="35%" y1="62%" x2="65%" y2="62%" stroke={SLIDE.gold} strokeWidth="1" opacity="0.2" strokeDasharray="4 3" />
            <line x1="35%" y1="42%" x2="35%" y2="62%" stroke={SLIDE.gold} strokeWidth="1" opacity="0.15" strokeDasharray="4 3" />
            <line x1="65%" y1="42%" x2="65%" y2="62%" stroke={SLIDE.gold} strokeWidth="1" opacity="0.15" strokeDasharray="4 3" />
            <line x1="35%" y1="42%" x2="65%" y2="62%" stroke={SLIDE.gold} strokeWidth="0.75" opacity="0.1" strokeDasharray="4 3" />
            <line x1="65%" y1="42%" x2="35%" y2="62%" stroke={SLIDE.gold} strokeWidth="0.75" opacity="0.1" strokeDasharray="4 3" />
          </svg>

          {/* Benefits */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', zIndex: 1 }}>
            {['Unified intelligence across every touchpoint', 'AI-driven insights from all your data', 'One customer view, one source of truth'].map((benefit, i) => (
              <div key={i} style={{
                fontSize: 10, color: SLIDE.gold, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
              }}>
                <span style={{ fontSize: 12 }}>+</span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom caption */}
      <div style={{
        padding: '0 56px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontSize: 13, color: SLIDE.whiteAlpha40, fontStyle: 'italic' }}>
          Dex transforms your tools into a platform that thinks.
        </div>
        <div style={{ fontSize: 10, color: SLIDE.whiteAlpha20 }}>
          dutchie.com
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// CONCEPT 3: "The Orbit" (Dex at the Center)
// ============================================================================

function Slide3_Orbit() {
  // Dex at center, products orbiting around it
  // Solar system metaphor: Dex is the sun, products are planets
  // Each product has its own orbital ring

  const products = [
    { name: 'E-Commerce', sub: 'Menus, marketplace,\npayments, kiosk', color: SLIDE.forestGreen, angle: -30, orbit: 1, icon: 'EC' },
    { name: 'Retail (POS)', sub: 'Point of sale, inventory,\ncompliance, reporting', color: SLIDE.burgundy, angle: 55, orbit: 1, icon: 'POS' },
    { name: 'Loyalty', sub: 'Rewards, profiles,\npromotions, CRM', color: '#2D6A4F', angle: 145, orbit: 1, icon: 'LY' },
    { name: 'Connect', sub: 'B2B wholesale,\npartner network', color: '#1A5276', angle: 230, orbit: 1, icon: 'CN' },
    { name: 'Nexus', sub: 'Data platform,\nAPIs, analytics', color: '#1E4535', angle: 320, orbit: 1, icon: 'NX' },
  ];

  // Calculate positions on a circle
  const centerX = 50; // percentage
  const centerY = 52; // percentage
  const orbitRadiusX = 34; // percentage
  const orbitRadiusY = 30; // percentage

  return (
    <div style={{
      width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden',
      background: SLIDE.darkPremium,
      fontFamily: FONT, position: 'relative',
      boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
    }}>
      {/* Deep radial glow from center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60%', height: '70%', borderRadius: '50%',
        background: `radial-gradient(circle, ${SLIDE.gold}0C, ${SLIDE.gold}04 40%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 40, left: 52, zIndex: 2,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: SLIDE.whiteAlpha40, marginBottom: 8,
        }}>
          Platform Architecture
        </div>
        <div style={{
          fontSize: 28, fontWeight: 700, color: SLIDE.white, lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          Intelligence at the Core
        </div>
      </div>

      {/* Orbital ring (SVG) */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Main orbital ellipse */}
        <ellipse
          cx={centerX} cy={centerY} rx={orbitRadiusX} ry={orbitRadiusY}
          stroke={SLIDE.gold} strokeWidth="0.15" fill="none" opacity="0.25"
          strokeDasharray="0.8 0.6"
        />
        {/* Inner ring */}
        <ellipse
          cx={centerX} cy={centerY} rx={orbitRadiusX * 0.45} ry={orbitRadiusY * 0.45}
          stroke={SLIDE.gold} strokeWidth="0.1" fill="none" opacity="0.15"
          strokeDasharray="0.5 0.5"
        />

        {/* Connection lines from center to each product */}
        {products.map((prod, i) => {
          const rad = (prod.angle * Math.PI) / 180;
          const px = centerX + orbitRadiusX * Math.cos(rad);
          const py = centerY + orbitRadiusY * Math.sin(rad);
          return (
            <line key={i}
              x1={centerX} y1={centerY} x2={px} y2={py}
              stroke={SLIDE.gold} strokeWidth="0.1" opacity="0.12"
            />
          );
        })}
      </svg>

      {/* Center: Dex */}
      <div style={{
        position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%, -50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Outer glow ring */}
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: `radial-gradient(circle, ${SLIDE.gold}15, ${SLIDE.gold}05 60%, transparent)`,
          border: `1.5px solid ${SLIDE.gold}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 4,
        }}>
          <DexSpiral size={38} />
          <div style={{ fontSize: 16, fontWeight: 700, color: SLIDE.gold, letterSpacing: '0.02em' }}>
            Dex
          </div>
        </div>
        <div style={{
          marginTop: 6, fontSize: 9, color: SLIDE.whiteAlpha40, textAlign: 'center', maxWidth: 120, lineHeight: 1.4,
        }}>
          AI Intelligence Layer
        </div>
      </div>

      {/* Orbiting products */}
      {products.map((prod, i) => {
        const rad = (prod.angle * Math.PI) / 180;
        const px = centerX + orbitRadiusX * Math.cos(rad);
        const py = centerY + orbitRadiusY * Math.sin(rad);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${px}%`, top: `${py}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}>
            <div style={{
              background: SLIDE.cream,
              borderRadius: 12,
              padding: '12px 16px',
              minWidth: 110,
              boxShadow: `0 2px 16px rgba(0,0,0,0.3), 0 0 20px ${SLIDE.gold}08`,
              textAlign: 'center',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: prod.color, margin: '0 auto 6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: SLIDE.cream,
              }}>
                {prod.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: SLIDE.forestGreenDark }}>
                {prod.name}
              </div>
              <div style={{ fontSize: 8, color: '#6B7B6E', marginTop: 2, lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                {prod.sub}
              </div>
            </div>
          </div>
        );
      })}

      {/* AI capabilities scattered as small tags near the center */}
      {[
        { label: 'Voice AI', x: 38, y: 38 },
        { label: 'Agentic Commerce', x: 57, y: 37 },
        { label: 'AI Sales Assist', x: 61, y: 64 },
        { label: 'Sentiment', x: 37, y: 65 },
        { label: 'Summaries', x: 50, y: 72 },
      ].map((cap, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${cap.x}%`, top: `${cap.y}%`,
          transform: 'translate(-50%, -50%)', zIndex: 1,
          fontSize: 8, fontWeight: 600, color: SLIDE.gold, letterSpacing: '0.04em',
          padding: '3px 7px', borderRadius: 4,
          background: `${SLIDE.gold}10`, border: `1px solid ${SLIDE.gold}18`,
          whiteSpace: 'nowrap', opacity: 0.7,
        }}>
          {cap.label}
        </div>
      ))}

      {/* Bottom */}
      <div style={{
        position: 'absolute', bottom: 24, left: 52, right: 52,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2,
      }}>
        <div style={{ fontSize: 10, color: SLIDE.whiteAlpha20 }}>Confidential</div>
        <div style={{ fontSize: 10, color: SLIDE.whiteAlpha20 }}>dutchie.com</div>
      </div>
    </div>
  );
}


// ============================================================================
// MAIN EXPORT
// ============================================================================

export function FirstPrinciplesDeck({ theme = 'dark' }) {
  const t = themes[theme] || themes.dark;

  return (
    <div style={{
      background: t.bg, minHeight: '100vh', padding: '48px 0',
      fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: t.accentGold, marginBottom: 12,
          }}>
            First Principles Deck Design
          </div>
          <h1 style={{
            fontSize: 38, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Three Concepts for the Product Hierarchy Slide
          </h1>
          <p style={{
            fontSize: 16, color: t.textMuted, marginTop: 12, marginBottom: 0,
            maxWidth: 720, lineHeight: 1.7,
          }}>
            How do we show Dutchie's product hierarchy on ONE slide in a way that makes AI/Dex feel central, not bolted on? Each concept below has been developed from the perspective of what the sales rep says, what the prospect remembers, and how the visual supports both.
          </p>
        </div>

        {/* Framing questions */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 32, marginBottom: 56,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.accentGold, marginBottom: 20,
          }}>
            The Questions That Shaped These Concepts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              {
                q: 'What is the PURPOSE of this slide?',
                a: 'It appears 10-15 minutes into a 45-minute pitch to a dispensary operator or MSO. They know Dutchie exists. This slide must show scope, create the "it all fits together" moment, and make AI/Dex the reason Dutchie is different from Treez, Flowhub, and Blaze.',
              },
              {
                q: 'What does the sales rep SAY?',
                a: 'The slide is a prop for a 30-60 second spoken narrative. The visual supports a story arc — it does not replace it. Every element on the slide should be something the rep can point to while talking.',
              },
              {
                q: 'What should the prospect REMEMBER?',
                a: 'After 45 slides, they will remember maybe 3 things. The one takeaway from this slide: "Dutchie is not a collection of tools — it is an intelligent platform, and the intelligence (Dex) is what makes it work."',
              },
              {
                q: 'What does "Dex" need to BE?',
                a: 'Not a product (too small). Not just a layer (too passive). Dex needs to be the STORY — the organizing principle that explains why all the products are more valuable together than apart.',
              },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>
                  {item.q}
                </div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* CONCEPT 1: The Intelligent Platform (Three-Layer Sandwich) */}
        {/* ================================================================ */}

        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
          margin: '64px 0',
        }} />

        <ConceptHeader
          number="1"
          title={'"The Intelligent Platform" \u2014 Three-Layer Sandwich'}
          subtitle="Dex as Option B+C hybrid: an intelligence layer that IS the story"
          t={t}
        />

        <WritingSection label="Design Thesis" t={t} gold>
          <p style={{ margin: '0 0 12px' }}>
            The best platform companies (HubSpot, ServiceNow, Salesforce) all use a visual language of <strong style={{ color: t.accentGold }}>layered architecture</strong> in their sales materials. It communicates sophistication, integration, and engineering depth in a way that a grid of logos cannot. The three-layer sandwich is the most proven format for this message.
          </p>
          <p style={{ margin: 0 }}>
            The key design decision here is <strong>relative sizing</strong>. In a naive version, all three layers get equal space. That is wrong. The Dex intelligence layer should be the <em>visually dominant</em> middle band — wider, more colorful, more detailed than the product cards above or the infrastructure below. The products are familiar (the prospect already knows what a POS is). The data layer is expected (every SaaS company has an API). Dex is the surprise. It gets the most visual weight.
          </p>
        </WritingSection>

        <ScriptBlock t={t}>
          <p style={{ margin: '0 0 14px' }}>
            "So let me show you what makes Dutchie fundamentally different from anyone else in this space."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to top layer]</em> "You probably know us for one or two of these — maybe our POS, maybe our e-commerce platform. And yes, each of these is best-in-class on its own."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to middle golden band]</em> "But here is what nobody else has. This is Dex — our AI intelligence layer. It sits between every product and every customer interaction you have. When a customer browses your online menu, Dex learns what they want. When they check out at the register, Dex connects that to their online behavior. When you run a promotion, Dex tells you which customers will actually respond — before you spend a dollar."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to bottom layer]</em> "And it all runs on our cannabis-specific data platform. Not generic SaaS data — actual cannabis retail intelligence built from thousands of dispensaries."
          </p>
          <p style={{ margin: 0 }}>
            "The difference is not that we have more products. It is that our products are <em>intelligent</em>. They learn, they connect, they get smarter every day. That is what Dex does."
          </p>
        </ScriptBlock>

        <AhaBlock t={t}>
          The prospect realizes that Dutchie's advantage is not breadth (having lots of products) but <strong>depth of connection between products</strong>. The intelligence layer is what turns a collection of tools into a competitive moat. Without Dex, you are buying separate tools. With Dex, every tool makes every other tool smarter.
        </AhaBlock>

        {/* The actual slide mockup */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.textFaint, marginBottom: 12,
          }}>
            Slide Mockup
          </div>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <Slide1_IntelligentPlatform />
          </div>
        </div>

        <WritingSection label="Design Decisions Explained" t={t}>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why four product cards, not five?</strong> Nexus goes at the bottom as infrastructure, not in the product row. This is deliberate. Prospects buy E-Commerce, POS, Loyalty, and Connect. They do not "buy" Nexus — they get it. Putting Nexus alongside POS diminishes both. Nexus as the foundation gives it gravity without forcing a purchase decision.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why cream cards on forest green?</strong> The cream-on-green creates the look of the existing Dutchie brand system. The product cards feel tangible — things you can touch and buy. The green background is premium and calming. It says "we are established, not a startup."
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why does the Dex layer have the gold treatment?</strong> Gold = intelligence in Dutchie's visual system. The golden band is the only warm color on the slide. Your eye is drawn to it. The rep points to it. It is the thing you remember.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Why the vertical connection lines?</strong> They show data flowing from products through Dex into the data platform and back. The visual metaphor is a nervous system — intelligence flowing up and down through the stack. Without them, the layers look stacked but separate. With them, they look integrated.
          </p>
        </WritingSection>

        <ProConBlock
          pros={[
            'Proven format — HubSpot, ServiceNow, and Salesforce all use three-layer diagrams. Prospects in B2B SaaS subconsciously recognize this as "enterprise-grade."',
            'Clean hierarchy — products at top (what you buy), intelligence in middle (why it is better), data at bottom (how it works). No confusion about what goes where.',
            'Easy to present — the rep can point top, middle, bottom and the story tells itself in 30 seconds.',
            'Scales well — if Dutchie adds a sixth product, it just becomes a fifth card in the top row. The architecture does not change.',
            'Dex gets its own visual band — it is not a product and it is not infrastructure. It occupies a unique, prominent position.',
          ]}
          cons={[
            'Can feel static or corporate — "three-layer stack" is familiar precisely because everyone uses it. A prospect who has seen the Salesforce deck might think "oh, another one of these."',
            'Passive Dex — even though the golden band is prominent, it is still a layer that sits between things. It does not feel active or dynamic. Dex as a "band" is less exciting than Dex as a "brain."',
            'Overemphasizes architecture — dispensary operators may not care about how the stack works. They care about outcomes. This slide explains structure, not value.',
            'The AI capabilities (Voice AI, Agentic Commerce, etc.) are squeezed into small pills. A competitor deep in AI could argue their capabilities deserve more space.',
          ]}
          t={t}
        />

        <SayThisBlock
          items={[
            {
              say: 'This is what makes our products intelligent.',
              not: 'We also have AI features.',
            },
            {
              say: 'Dex connects every interaction across your entire operation.',
              not: 'Dex is our AI product.',
            },
            {
              say: 'When a customer browses online and then walks in-store, Dex already knows what they want.',
              not: 'Dex uses machine learning to optimize recommendations.',
            },
            {
              say: 'Built on the largest cannabis data platform in the industry.',
              not: 'We have APIs and integrations.',
            },
          ]}
          t={t}
        />


        {/* ================================================================ */}
        {/* CONCEPT 2: The Transformation (Before -> After) */}
        {/* ================================================================ */}

        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
          margin: '64px 0',
        }} />

        <ConceptHeader
          number="2"
          title={'"The Transformation" \u2014 Before \u2192 After'}
          subtitle="Dex as Option C: the story itself. The reason the whole slide exists."
          t={t}
        />

        <WritingSection label="Design Thesis" t={t} gold>
          <p style={{ margin: '0 0 12px' }}>
            Architecture diagrams explain structure. But dispensary operators do not buy structure — they buy <strong style={{ color: t.accentGold }}>outcomes</strong>. The Before/After format is the oldest persuasion tool in sales: show the world without your product (painful), then show the world with it (beautiful). The gap between the two is your value proposition.
          </p>
          <p style={{ margin: '0 0 12px' }}>
            What makes this concept powerful is that Dex is not shown as a product or a layer. Dex is the <em>transformation agent</em>. It is the thing that turns the "before" into the "after." You do not buy Dex — you experience what Dex does. This is Option C from the brief: Dex as the story.
          </p>
          <p style={{ margin: 0 }}>
            The dark premium background (near-black) creates maximum contrast between the greyed-out "before" side and the illuminated "after" side. The gold glow on the right side is not decoration — it is the visual representation of intelligence activating.
          </p>
        </WritingSection>

        <ScriptBlock t={t}>
          <p style={{ margin: '0 0 14px' }}>
            "Let me ask you something. How many systems are you running your dispensary on right now? Three? Four? More?"
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to left side]</em> "This is what most operators look like today. You have got your POS doing one thing. Your online menu doing another. Your loyalty program somewhere else. Maybe a wholesale platform on top of that. They all have their own logins, their own data, their own reports. And the person connecting all of them? That is you. Manually. Every single day."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to right side]</em> "Now here is what it looks like with Dutchie and Dex. Same products. Same functionality. But now they talk to each other. Your online shopper walks into the store and your budtender already knows what they browsed, what they bought last time, and what they are most likely to buy today. Your promotion targets the right customers automatically. Your inventory reorders before you run out — because the system learned your patterns."
          </p>
          <p style={{ margin: 0 }}>
            "The difference is not more software. It is <em>intelligent</em> software."
          </p>
        </ScriptBlock>

        <AhaBlock t={t}>
          The prospect sees their <em>current reality</em> on the left — disconnected tools they are already frustrated with — and their <em>possible future</em> on the right. The emotional shift is powerful: "That left side is my life right now. I want the right side." Dex is not a feature to evaluate; it is the bridge from pain to relief.
        </AhaBlock>

        {/* The actual slide mockup */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.textFaint, marginBottom: 12,
          }}>
            Slide Mockup
          </div>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <Slide2_Transformation />
          </div>
        </div>

        <WritingSection label="Design Decisions Explained" t={t}>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why dark premium background instead of forest green?</strong> The dark background serves the Before/After narrative better. The greyed-out left side needs near-black to look truly dim and painful. Forest green is too "warm" — it would make the "before" side look okay. The darkness also makes the gold glow on the right side more dramatic.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why dashed borders on the left, solid on the right?</strong> Dashed = tentative, uncertain, fragile. Solid with warm fills = established, integrated, confident. This is a subconscious signal. The prospect does not think "oh, dashed borders." They <em>feel</em> that the left side is fragile.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why pain points and benefits as bullets?</strong> This gives the rep explicit talking points. Most architecture slides leave the rep to figure out what to say. Here, the bullets on each side are literally the script. "Data silos between systems" — the rep reads it, the prospect nods, they both look at the right side.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Where is Dex?</strong> Dex is the arrow between the two sides. Not a box, not a logo — a transformation. The small Dex spiral sits at the center transition point. This is intentionally subtle. Dex is not selling itself; it is showing what it does. The prospect sees the outcome and asks "how?" — then the rep says "That is Dex."
          </p>
          <p style={{ margin: 0 }}>
            <strong>Why connection lines only on the right side?</strong> The golden dashed lines between product cards on the "With Dex" side show data flowing between products. The left side has no connections. This is the single most important visual detail: the same four products, but one side is connected and the other is not.
          </p>
        </WritingSection>

        <ProConBlock
          pros={[
            'Emotionally compelling — Before/After is the most proven persuasion format in sales, advertising, and design. It creates desire, not just understanding.',
            'Prospect sees themselves — the "before" side literally describes their current tech stack. This creates instant recognition and trust ("they understand my problem").',
            'Dex is the hero — it transforms the experience. This is stronger than "Dex is a layer" or "Dex is a product."',
            'Easy to remember — after 45 slides, the prospect will remember "disconnected tools on the left, connected platform on the right." That is the whole message.',
            'Naturally sets up a demo — the rep can say "Let me show you what that right side looks like in practice" and transition to a product deep-dive.',
          ]}
          cons={[
            'Does not show full product hierarchy — five products become four card icons per side. Nuance is lost. Nexus disappears entirely or gets folded in.',
            'Can feel manipulative — if done poorly, Before/After feels like an infomercial. The premium visual treatment mitigates this, but the risk exists.',
            'Less "impressive" to technical buyers — a CTO or VP of Engineering may want to see the actual architecture, not an emotional comparison. This slide is optimized for operators and GMs, not CTOs.',
            'Dex capabilities are hidden — Voice AI, Agentic Commerce, etc. are not explicitly shown. The slide says "Dex makes things better" without showing how.',
            'Competitors can copy this format — replace "Dex" with any AI name and it works the same way. The format does not inherently differentiate.',
          ]}
          t={t}
        />

        <SayThisBlock
          items={[
            {
              say: 'How many systems are you running today? Does it feel like this left side?',
              not: 'Our competitors leave you with disconnected tools.',
            },
            {
              say: 'The same products, but now they think together.',
              not: 'We have integrated our products with AI.',
            },
            {
              say: 'Your budtender already knows what the customer wants before they walk in.',
              not: 'Dex provides real-time customer intelligence.',
            },
            {
              say: 'The difference is not more software. It is intelligent software.',
              not: 'We leverage AI and machine learning across our product suite.',
            },
          ]}
          t={t}
        />


        {/* ================================================================ */}
        {/* CONCEPT 3: The Orbit (Dex at the Center) */}
        {/* ================================================================ */}

        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
          margin: '64px 0',
        }} />

        <ConceptHeader
          number="3"
          title={'"The Orbit" \u2014 Dex at the Center'}
          subtitle="Dex as Option D elevated: the connector that becomes the core"
          t={t}
        />

        <WritingSection label="Design Thesis" t={t} gold>
          <p style={{ margin: '0 0 12px' }}>
            What if Dex is not a layer, not a transformation agent, but the literal <strong style={{ color: t.accentGold }}>center of gravity</strong>? The solar system metaphor is bold: Dex is the sun, and every product orbits around it. The visual implies that without Dex at the center, the products would drift apart. Dex is not just connecting things — it is the force that holds everything together.
          </p>
          <p style={{ margin: '0 0 12px' }}>
            This is the most aggressive concept. It declares that Dutchie is an AI company that happens to have a POS, not a POS company that added AI. For current Dutchie, this may be aspirational. But for the Dutchie of 2027, this is the target state — and a sales deck should sell the future, not just the present.
          </p>
          <p style={{ margin: 0 }}>
            The dark premium background creates a "space" feeling. The gold glow at the center looks like a star. The cream product cards floating in space look like they are being held in orbit by Dex's gravitational pull. AI capabilities float in the inner ring — closer to Dex because they are part of its intelligence, not standalone features.
          </p>
        </WritingSection>

        <ScriptBlock t={t}>
          <p style={{ margin: '0 0 14px' }}>
            "I want to show you how we think about our platform — because I think it explains why our customers see 20 to 30 percent higher engagement than they did before."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[points to center]</em> "At the core of everything we do is Dex — our AI intelligence. It is not a separate product you buy. It is the brain that powers every product you use."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <em>[gestures around the orbit]</em> "Your e-commerce platform, your point of sale, your loyalty program, your wholesale marketplace, your data and analytics — they all orbit around this central intelligence. And because they are all connected through Dex, every product makes every other product smarter."
          </p>
          <p style={{ margin: '0 0 14px' }}>
            "When a customer orders online, your POS knows. When they earn loyalty points, your marketing knows who to target next. When a product is trending on your menu, your wholesale ordering adjusts. All of this happens automatically."
          </p>
          <p style={{ margin: 0 }}>
            "This is not five separate tools. This is one intelligence with five faces."
          </p>
        </ScriptBlock>

        <AhaBlock t={t}>
          The prospect grasps a genuinely new mental model: Dutchie is not a software vendor with a list of products. It is an <strong>intelligence platform that manifests as different tools depending on what you need</strong>. The POS, the online menu, the loyalty program — they are all expressions of the same underlying intelligence. That reframe is the most powerful competitive positioning Dutchie could claim, because no competitor can credibly make it.
        </AhaBlock>

        {/* The actual slide mockup */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.textFaint, marginBottom: 12,
          }}>
            Slide Mockup
          </div>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <Slide3_Orbit />
          </div>
        </div>

        <WritingSection label="Design Decisions Explained" t={t}>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why a circle/ellipse instead of a grid or stack?</strong> The orbit is a spatial hierarchy. Center = most important. Periphery = derived from center. No other layout communicates "Dex is the core" as clearly. A grid says "these are equal." A stack says "these are layers." An orbit says "this is what everything revolves around."
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why include Nexus as a product in the orbit?</strong> Unlike Concept 1 where Nexus is infrastructure at the bottom, here Nexus is a product card in the orbit — because in this framing, everything is equally "powered by Dex." Nexus is the data/analytics product, just as POS is the retail product. They are all expressions of the central intelligence.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why are AI capabilities in the inner ring?</strong> Voice AI, Agentic Commerce, etc. are not products — they are capabilities of Dex itself. Placing them between the Dex center and the product orbit shows that these capabilities flow outward from Dex into every product.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Why the near-black background?</strong> The space metaphor requires darkness. This also makes it the most visually distinct slide in the deck — while every other slide might be on forest green, this one is on black. That contrast signals "pay attention, this is different."
          </p>
          <p style={{ margin: 0 }}>
            <strong>Why connection lines from center to each product?</strong> Each faint line shows that Dex is actively connected to every product. Not through a shared database — through active intelligence. The lines imply real-time data flow and decision-making.
          </p>
        </WritingSection>

        <ProConBlock
          pros={[
            'Most differentiated — no competitor would dare put their AI at the center of their product slide. This is a bold claim that immediately separates Dutchie from the pack.',
            '"One intelligence, five faces" is a memorable line — prospects will repeat this. It is the kind of phrase that shows up in board presentations when the operator is justifying the purchase.',
            'Future-proof — as Dutchie adds more AI capabilities, they naturally cluster closer to the Dex center. The architecture expands gracefully.',
            'Visually striking — on a dark background with gold glow, this slide will stand out in a deck of typical SaaS screenshots. Prospects remember unusual visuals.',
            'Makes Dex feel inevitable — it is not a feature you can skip. It is the core. This is exactly the positioning AI needs to avoid being treated as "nice to have."',
          ]}
          cons={[
            'May overclaim — if a prospect uses only the POS, they might wonder "why do I need this AI brain?" The orbit makes Dex seem essential even for single-product buyers.',
            'Could intimidate smaller operators — a single-location dispensary might see this and think "this is too sophisticated for me." The orbit screams enterprise.',
            'Hard to present linearly — the rep cannot just point top-to-bottom. They need to gesture around a circle, which requires more spatial skill and confidence.',
            'Nexus gets lost — as one of five products in the orbit, Nexus loses the special "infrastructure" status it has in Concept 1. For technical buyers, this may feel wrong.',
            'Risk of eye-chart syndrome — five product cards plus five AI capability pills plus connection lines plus the center element. If not carefully designed, it becomes cluttered.',
          ]}
          t={t}
        />

        <SayThisBlock
          items={[
            {
              say: 'At the core of everything we do is intelligence.',
              not: 'We have an AI layer across our products.',
            },
            {
              say: 'One intelligence with five faces.',
              not: 'Five products powered by AI.',
            },
            {
              say: 'Every product makes every other product smarter.',
              not: 'Our products are integrated.',
            },
            {
              say: 'Your e-commerce, your POS, your loyalty — they are all the same brain in different contexts.',
              not: 'Dex connects our suite of products.',
            },
          ]}
          t={t}
        />


        {/* ================================================================ */}
        {/* RECOMMENDATION */}
        {/* ================================================================ */}

        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${t.accentGold}40, transparent)`,
          margin: '64px 0',
        }} />

        <div style={{
          background: `${t.accentGold}08`, border: `1.5px solid ${t.accentGold}30`,
          borderRadius: 16, padding: 40, marginBottom: 64,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.accentGold, marginBottom: 16,
          }}>
            Recommendation
          </div>
          <h3 style={{
            fontSize: 24, fontWeight: 700, color: t.text, margin: '0 0 20px',
            fontFamily: FONT, letterSpacing: '-0.01em', lineHeight: 1.3,
          }}>
            Ship Concept 2 Now. Build Toward Concept 3.
          </h3>
          <div style={{
            fontSize: 15, color: t.text, lineHeight: 1.8, fontFamily: FONT, maxWidth: 800,
          }}>
            <p style={{ margin: '0 0 14px' }}>
              <strong>Concept 2 (The Transformation)</strong> is the right choice for today's sales motion. It is the most emotionally compelling, the easiest to present, and it directly addresses the prospect's current pain. The Before/After format requires zero explanation — every prospect immediately understands what they are looking at. The rep asks "Does your world look like the left side?" and the deal starts.
            </p>
            <p style={{ margin: '0 0 14px' }}>
              <strong>Concept 1 (Three-Layer Sandwich)</strong> is the safe backup. It is corporate, proven, and works well for larger MSOs or technical buyers who want to understand the architecture. Consider having Concept 1 as a "deep dive" slide later in the deck, after the emotional hook of Concept 2.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Concept 3 (The Orbit)</strong> is the aspirational future. As Dex capabilities mature and become the primary differentiator (not just a value-add), the orbit visual will feel earned. For now, it risks overclaiming. But in 12-18 months, when Dex is undeniably the core — that is when you switch to the orbit. It becomes the slide that makes everyone else look like they are playing catch-up.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FirstPrinciplesDeck;
