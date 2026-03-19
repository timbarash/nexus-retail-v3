import React, { useState } from 'react';

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
    bg: '#FFFFFF',
    cardBg: '#F8F7F5',
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

/* ------------------------------------------------------------------ */
/*  Chat Bubble                                                        */
/* ------------------------------------------------------------------ */
function ChatBubble({ from, text, isAI, accent, t }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isAI ? 'flex-start' : 'flex-end',
        marginBottom: 12,
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isAI ? accent : t.textFaint,
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {from}
      </span>
      <div
        style={{
          background: isAI ? `${accent}18` : `${t.textFaint}15`,
          border: `1px solid ${isAI ? `${accent}40` : t.border}`,
          borderRadius: isAI ? '2px 14px 14px 14px' : '14px 14px 2px 14px',
          padding: '12px 16px',
          maxWidth: '92%',
          fontSize: 14,
          lineHeight: 1.55,
          color: t.text,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Header                                                     */
/* ------------------------------------------------------------------ */
function SectionHeader({ number, label, t }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 28,
        marginTop: 64,
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `${t.accentGold}20`,
          border: `1.5px solid ${t.accentGold}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          fontWeight: 700,
          color: t.accentGold,
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: t.accentGold,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, ${t.accentGold}40, transparent)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Option Card for Section 4                                          */
/* ------------------------------------------------------------------ */
function OptionCard({ option, title, desc, pros, cons, riskLevel, riskColor, precedent, children, t }) {
  return (
    <div
      style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 28,
        marginBottom: 24,
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            background: `${t.accentGold}20`,
            border: `1px solid ${t.accentGold}50`,
            fontSize: 13,
            fontWeight: 700,
            color: t.accentGold,
            letterSpacing: '0.04em',
          }}
        >
          {option}
        </div>
        <h4 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.text }}>{title}</h4>
      </div>
      <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginBottom: 18 }}>{desc}</p>
      {children}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 18 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accentGreen }}>
            Pros
          </span>
          <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            {pros.map((p, i) => (
              <li key={i} style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>{p}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E0584E' }}>
            Cons
          </span>
          <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            {cons.map((c, i) => (
              <li key={i} style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px solid ${t.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Risk:
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: riskColor }}>{riskLevel}</span>
        </div>
        {precedent && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Precedent:
            </span>
            <span style={{ fontSize: 12, color: t.textMuted }}>{precedent}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav Header Mockup                                                  */
/* ------------------------------------------------------------------ */
function NavMockup({ appName, accent, subtitle, icon, t }) {
  return (
    <div
      style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: '"DM Sans", sans-serif',
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: `${accent}22`,
          border: `1.5px solid ${accent}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.text, letterSpacing: '-0.01em' }}>
          <span style={{ color: accent }}>{appName}</span>
        </div>
        {subtitle && (
          <div style={{ fontSize: 11, color: t.textFaint, marginTop: 1 }}>{subtitle}</div>
        )}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
        {['Dashboard', 'Insights', 'Settings'].map((item) => (
          <span
            key={item}
            style={{
              fontSize: 13,
              color: t.textMuted,
              cursor: 'pointer',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust Matrix Cell                                                  */
/* ------------------------------------------------------------------ */
function MatrixCell({ label, description, highlighted, t }) {
  return (
    <div
      style={{
        background: highlighted ? `${t.accentGold}12` : t.cardBg,
        border: `1.5px solid ${highlighted ? t.accentGold : t.border}`,
        borderRadius: 10,
        padding: 18,
        fontFamily: '"DM Sans", sans-serif',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: highlighted ? t.accentGold : t.text,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.55 }}>{description}</div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export function DexB2CvsB2BSection({ theme = 'dark' }) {
  const t = themes[theme];
  const [activeOption, setActiveOption] = useState('A');

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: '"DM Sans", sans-serif',
        minHeight: '100vh',
        padding: '48px 0',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* ======================================================= */}
        {/* SECTION 1 — THE QUESTION                                 */}
        {/* ======================================================= */}
        <SectionHeader number="1" label="The Question" t={t} />

        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 12px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          One Dex or{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGoldLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Two?
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: t.textMuted,
            lineHeight: 1.65,
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          Dex helps budtenders sell flower. Dex also helps brands negotiate wholesale deals.
          Is that confusing?
        </p>

        {/* Visual Split — B2C vs B2B */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginBottom: 48,
          }}
        >
          {/* LEFT — Dex for Retail */}
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: `${t.accentGold}15`,
                borderBottom: `1px solid ${t.accentGold}30`,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: t.accentGold,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.accentGold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Dex for Retail
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 16,
                  padding: '10px 14px',
                  background: `${t.textFaint}10`,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${t.accentGold}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  B
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Budtender</div>
                  <div style={{ fontSize: 11, color: t.textFaint }}>Dispensary counter</div>
                </div>
              </div>
              <ChatBubble
                from="Budtender"
                text="Hey Dex, what should I recommend for someone who wants to sleep better?"
                isAI={false}
                accent={t.accentGold}
                t={t}
              />
              <ChatBubble
                from="Dex"
                text="Based on what's in stock, Granddaddy Purple has great reviews for sleep. It's also on promo this week."
                isAI={true}
                accent={t.accentGold}
                t={t}
              />
            </div>
          </div>

          {/* RIGHT — Dex for Brands */}
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: `${t.accentGreen}15`,
                borderBottom: `1px solid ${t.accentGreen}30`,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: t.accentGreen,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.accentGreen,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Dex for Brands
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 16,
                  padding: '10px 14px',
                  background: `${t.textFaint}10`,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${t.accentGreen}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  A
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Account Manager</div>
                  <div style={{ fontSize: 11, color: t.textFaint }}>Brand wholesale team</div>
                </div>
              </div>
              <ChatBubble
                from="Account Manager"
                text="Dex, which retailers should I pitch our new edible line to?"
                isAI={false}
                accent={t.accentGreen}
                t={t}
              />
              <ChatBubble
                from="Dex"
                text="Based on ordering patterns, Green Leaf Dispensary and Emerald City both index high on edibles and haven't stocked your brand yet."
                isAI={true}
                accent={t.accentGreen}
                t={t}
              />
            </div>
          </div>
        </div>

        {/* Dividing observation */}
        <div
          style={{
            background: `${t.accentGold}08`,
            border: `1px solid ${t.accentGold}25`,
            borderRadius: 12,
            padding: '20px 24px',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 15, color: t.textMuted, margin: 0, lineHeight: 1.6 }}>
            These are <strong style={{ color: t.text }}>very different contexts</strong>.
            Different users, different goals, different trust dynamics.{' '}
            <span style={{ color: t.accentGold, fontWeight: 600 }}>
              Does one name cover both?
            </span>
          </p>
        </div>

        {/* ======================================================= */}
        {/* SECTION 2 — THE CASE FOR ONE DEX                         */}
        {/* ======================================================= */}
        <SectionHeader number="2" label="The Case for ONE Dex" t={t} />

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Unified Brand, Compounding Intelligence
        </h2>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 28, maxWidth: 650 }}>
          Arguments for keeping Dex as a single AI brand across both B2C and B2B contexts.
        </p>

        {/* Argument cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            {
              title: 'Simplicity',
              body: 'One AI brand to build, market, and invest in. No fragmented messaging, no brand confusion in sales decks.',
              icon: '1',
            },
            {
              title: 'Intelligence Compounds',
              body: 'Dex learns from BOTH sides -- it knows what retailers want AND what brands offer, making it smarter everywhere.',
              icon: '2',
            },
            {
              title: 'Microsoft Copilot Model',
              body: '"Copilot in Word" vs "Copilot in Excel" -- same brand, different capabilities. Nobody questions this.',
              icon: '3',
            },
            {
              title: '"Dex Knows the Whole Market"',
              body: 'Powerful positioning -- Dex sees both supply and demand. No other cannabis AI can claim full-market intelligence.',
              icon: '4',
            },
          ].map((arg) => (
            <div
              key={arg.title}
              style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: 22,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: `${t.accentGreen}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: t.accentGreen,
                  }}
                >
                  {arg.icon}
                </div>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>{arg.title}</h4>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{arg.body}</p>
            </div>
          ))}
        </div>

        {/* Additional argument — Engineering */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: 22,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: `${t.accentGreen}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: t.accentGreen,
              flexShrink: 0,
            }}
          >
            5
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: t.text }}>
              Engineering Efficiency
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
              One AI system, one model, one training pipeline. Shared infrastructure means faster iteration on both surfaces.
            </p>
          </div>
        </div>

        {/* Visual Diagram — Single Dex Brain */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: 36,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
            Unified Architecture
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            {/* B2C hemisphere */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '60px 0 0 60px',
                  background: `linear-gradient(135deg, ${t.accentGold}30, ${t.accentGold}10)`,
                  border: `2px solid ${t.accentGold}50`,
                  borderRight: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>B2C</div>
                <div style={{ fontSize: 10, color: t.accentGold, fontWeight: 600, textTransform: 'uppercase' }}>Retail</div>
              </div>
              <div style={{ fontSize: 11, color: t.textFaint, marginTop: 10 }}>Budtenders</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>Dispensary Staff</div>
            </div>
            {/* Center — Dex */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGreen})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px 0',
                  boxShadow: `0 0 30px ${t.accentGold}30`,
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 800, color: '#0A0908', letterSpacing: '-0.02em' }}>
                  Dex
                </span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>One Brain</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>Full-market intelligence</div>
            </div>
            {/* B2B hemisphere */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '0 60px 60px 0',
                  background: `linear-gradient(135deg, ${t.accentGreen}10, ${t.accentGreen}30)`,
                  border: `2px solid ${t.accentGreen}50`,
                  borderLeft: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>B2B</div>
                <div style={{ fontSize: 10, color: t.accentGreen, fontWeight: 600, textTransform: 'uppercase' }}>Commerce</div>
              </div>
              <div style={{ fontSize: 11, color: t.textFaint, marginTop: 10 }}>Brand Reps</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>Account Managers</div>
            </div>
          </div>
        </div>

        {/* Analogy card — Google Assistant */}
        <div
          style={{
            background: `${t.accentGreen}08`,
            border: `1px solid ${t.accentGreen}30`,
            borderRadius: 12,
            padding: '22px 26px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: `${t.accentGreen}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                flexShrink: 0,
                marginTop: 2,
                color: t.accentGreen,
                fontWeight: 700,
              }}
            >
              =
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>The Google Assistant Analogy</div>
              <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>
                Google Assistant works in your phone, your car, your kitchen, your TV.
                Same name. Different contexts. Nobody is confused.
                The context tells the user what to expect -- the name just says{' '}
                <em style={{ color: t.accentGreen }}>"Google is helping you here."</em>
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* SECTION 3 — THE CASE FOR TWO NAMES                       */}
        {/* ======================================================= */}
        <SectionHeader number="3" label="The Case for TWO Names" t={t} />

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Different Users, Different Trust
        </h2>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 28, maxWidth: 650 }}>
          Arguments for giving the B2B agent a separate identity from retail Dex.
        </p>

        {/* Argument cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 32 }}>
          {[
            {
              title: 'Different Users, Different Expectations',
              body: 'A budtender wants a friendly helper. A brand manager wants a sharp business tool. The personality needs of these users diverge significantly.',
              tag: 'AUDIENCE',
            },
            {
              title: 'Trust Dynamics Differ',
              body: 'In B2C, trust = "Dex knows what\'s good for the customer." In B2B, trust = "Dex helps me close deals fairly." These are fundamentally different trust relationships.',
              tag: 'TRUST',
            },
            {
              title: 'Brand Perception Risk',
              body: 'If a retailer uses Dex and then sees the brand they\'re negotiating with also uses Dex... does it feel like Dex is playing both sides? "Wait, Dex told me to buy this product AND told the brand to pitch it to me?"',
              tag: 'RISK',
            },
            {
              title: 'Sales Simplicity',
              body: 'Easier to sell "Dex for your store" vs "Our B2B intelligence tool" as separate products to separate buyers. Different sales teams, different pitch decks.',
              tag: 'GO-TO-MARKET',
            },
            {
              title: 'Different Product Cycles',
              body: 'Retail AI and B2B AI might evolve at different speeds. Tying them to one brand means one holds the other back -- or forces confusing versioning.',
              tag: 'ROADMAP',
            },
          ].map((arg) => (
            <div
              key={arg.title}
              style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: `${t.textFaint}18`,
                  fontSize: 10,
                  fontWeight: 700,
                  color: t.textFaint,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                  marginTop: 3,
                }}
              >
                {arg.tag}
              </div>
              <div>
                <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: t.text }}>{arg.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{arg.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WARNING — The Conflict Question */}
        <div
          style={{
            background: '#E0584E12',
            border: '1.5px solid #E0584E40',
            borderRadius: 14,
            padding: 28,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>&#x26A0;</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#E0584E', letterSpacing: '-0.01em' }}>
              The Conflict Question
            </span>
          </div>
          <div
            style={{
              background: `${t.bg}`,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              padding: 20,
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.8,
              color: t.textMuted,
              marginBottom: 16,
            }}
          >
            <div>
              <span style={{ color: t.accentGold, fontWeight: 700 }}>Retailer:</span>{' '}
              "Dex, should I stock Brand X's new gummies?"
            </div>
            <div style={{ marginTop: 4 }}>
              <span style={{ color: t.accentGreen, fontWeight: 700 }}>Brand X:</span>{' '}
              "Dex, how do I get my gummies into this retailer?"
            </div>
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: `1px dashed ${t.border}`,
                color: t.text,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
              }}
            >
              If the same AI is advising BOTH sides of a transaction...
              <br />
              is that a feature or a trust problem?
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
            This is the strongest argument for separation. Even if Dex's recommendations are algorithmically
            independent, the <em>perception</em> of conflict could erode trust with sophisticated buyers.
          </p>
        </div>

        {/* ======================================================= */}
        {/* SECTION 4 — THREE NAMING MODELS                          */}
        {/* ======================================================= */}
        <SectionHeader number="4" label="Three Naming Models" t={t} />

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          How to Brand the Split
        </h2>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 12, maxWidth: 650 }}>
          Three concrete approaches, each with different trade-offs for brand clarity, trust, and engineering.
        </p>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, marginTop: 20 }}>
          {['A', 'B', 'C'].map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveOption(opt)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: `1.5px solid ${activeOption === opt ? t.accentGold : t.border}`,
                background: activeOption === opt ? `${t.accentGold}15` : 'transparent',
                color: activeOption === opt ? t.accentGold : t.textMuted,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '0.02em',
                transition: 'all 0.15s ease',
              }}
            >
              Option {opt}
            </button>
          ))}
        </div>

        {/* OPTION A */}
        {activeOption === 'A' && (
          <OptionCard
            option="Option A"
            title="One Dex, Different Modes"
            desc="Dex is always Dex. In retail it's 'the assistant'; in B2B it's 'the advisor.' Differentiation happens in UI, not naming."
            pros={[
              'One AI brand to build, market, and invest in',
              'Intelligence compounds across both contexts',
              '"Dex knows the whole market" is powerful positioning',
              'Most users only see one side anyway',
            ]}
            cons={[
              'Potential trust perception issue if users see both sides',
              'Harder to tailor personality per audience',
            ]}
            riskLevel="LOW"
            riskColor={t.accentGreen}
            precedent="Slack, Copilot, Google Assistant"
            t={t}
          >
            {/* Marketing line */}
            <div
              style={{
                background: `${t.accentGold}10`,
                border: `1px solid ${t.accentGold}30`,
                borderRadius: 8,
                padding: '12px 18px',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 15, fontStyle: 'italic', color: t.accentGoldLight, fontWeight: 600 }}>
                "Dex. Smart on every side of the counter."
              </span>
            </div>
            {/* UI differentiation visual */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              UI Differentiation
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${t.accentGold}40`, background: `${t.accentGold}08` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, marginBottom: 4 }}>Retail Mode</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Gold accent, chat-first UI, casual tone</div>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${t.accentGreen}40`, background: `${t.accentGreen}08` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGreen, marginBottom: 4 }}>B2B Mode</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>Green accent, dashboard-first, professional tone</div>
              </div>
            </div>
            {/* Nav mockups */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 18 }}>
              Product Nav Mockup
            </div>
            <NavMockup appName="Dex" accent={t.accentGold} subtitle="Retail Assistant" icon="D" t={t} />
            <NavMockup appName="Dex" accent={t.accentGreen} subtitle="Commerce Advisor" icon="D" t={t} />
          </OptionCard>
        )}

        {/* OPTION B */}
        {activeOption === 'B' && (
          <OptionCard
            option="Option B"
            title="Dex + a B2B Sibling"
            desc="Dex stays as the B2C retail agent (the hero product). B2B gets its own name, distinct but still in the Dutchie family."
            pros={[
              'Clean separation -- no trust conflict',
              'Each brand can develop its own personality',
              'Easier to sell to different buyer personas',
            ]}
            cons={[
              'Two AI brands to build and market',
              'Diluted brand investment',
              'Users who cross contexts must learn two names',
            ]}
            riskLevel="MEDIUM"
            riskColor={t.accentGoldLight}
            precedent="Meta (Facebook + Instagram AI)"
            t={t}
          >
            {/* Sibling name candidates */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              B2B Agent Name Candidates
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
              {[
                { name: 'Max', reason: 'Maximize deals, ambitious, direct', star: false },
                { name: 'Quinn', reason: 'Query intelligence, sharp, gender-neutral', star: true },
                { name: 'Pace', reason: 'Pacing the market, timing, rhythm', star: false },
                { name: 'Cade', reason: 'Trade/cascade, business-like', star: false },
                { name: 'Silo', reason: 'Supply chain, organized', star: false },
              ].map((n) => (
                <div
                  key={n.name}
                  style={{
                    background: n.star ? `${t.accentGreen}10` : t.cardBg,
                    border: `1.5px solid ${n.star ? t.accentGreen : t.border}`,
                    borderRadius: 10,
                    padding: '14px 16px',
                    position: 'relative',
                  }}
                >
                  {n.star && (
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      right: 10,
                      fontSize: 9,
                      fontWeight: 700,
                      color: t.accentGreen,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: `${t.accentGreen}18`,
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}>
                      Top pick
                    </div>
                  )}
                  <div style={{ fontSize: 20, fontWeight: 800, color: n.star ? t.accentGreen : t.text, marginBottom: 4 }}>
                    {n.name}
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>{n.reason}</div>
                </div>
              ))}
            </div>
            {/* Nav mockups */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 8 }}>
              Product Nav Mockup
            </div>
            <NavMockup appName="Dex" accent={t.accentGold} subtitle="Retail Intelligence" icon="D" t={t} />
            <NavMockup appName="Quinn" accent={t.accentGreen} subtitle="Commerce Intelligence" icon="Q" t={t} />
          </OptionCard>
        )}

        {/* OPTION C */}
        {activeOption === 'C' && (
          <OptionCard
            option="Option C"
            title="Dex Family -- Dex Retail & Dex Commerce"
            desc="'Dex' is the parent AI brand. Sub-brands differentiate context: Dex Retail for dispensary staff, Dex Commerce for brand reps."
            pros={[
              'One brand, clear differentiation',
              'Leverages existing Dex brand equity',
              'Room for future extensions (Dex Analytics, Dex Compliance, etc.)',
            ]}
            cons={[
              'Longer names, sub-brand complexity',
              'Could feel corporate/heavy to users',
              'May still trigger the "both sides" concern',
            ]}
            riskLevel="MEDIUM"
            riskColor={t.accentGoldLight}
            precedent="Adobe Creative Cloud (Photoshop, Illustrator, etc.)"
            t={t}
          >
            {/* Variant pairs */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Sub-brand Variants to Explore
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {[
                { retail: 'Dex Retail', b2b: 'Dex Commerce' },
                { retail: 'Dex Shop', b2b: 'Dex Trade' },
                { retail: 'Dex Counter', b2b: 'Dex Connect' },
                { retail: 'Dex In-Store', b2b: 'Dex Wholesale' },
                { retail: 'Dex Retail', b2b: 'Dex Market' },
              ].map((pair, i) => (
                <div
                  key={i}
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: 8,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.accentGold }}>{pair.retail}</span>
                  <span style={{ fontSize: 11, color: t.textFaint }}>/</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.accentGreen }}>{pair.b2b}</span>
                </div>
              ))}
            </div>
            {/* Nav mockups */}
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 8 }}>
              Product Nav Mockup
            </div>
            <NavMockup appName="Dex Retail" accent={t.accentGold} subtitle="Dispensary Intelligence" icon="DR" t={t} />
            <NavMockup appName="Dex Commerce" accent={t.accentGreen} subtitle="Wholesale Intelligence" icon="DC" t={t} />
          </OptionCard>
        )}

        {/* ======================================================= */}
        {/* SECTION 5 — THE TRUST FRAMEWORK                          */}
        {/* ======================================================= */}
        <SectionHeader number="5" label="The Trust Framework" t={t} />

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Who Sees Both Sides?
        </h2>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 32, maxWidth: 650 }}>
          A deeper analysis of when the trust question actually matters -- and for whom.
        </p>

        {/* 2x2 Trust Matrix */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: 32,
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, textAlign: 'center' }}>
            Trust Conflict Matrix
          </div>

          {/* Y-axis label */}
          <div style={{ display: 'flex', gap: 0 }}>
            <div
              style={{
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 600,
                color: t.textFaint,
                paddingRight: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.05em',
              }}
            >
              TRANSACTION CONTEXT
            </div>
            <div style={{ flex: 1 }}>
              {/* X-axis label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 4, paddingRight: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint }}>Same User</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint }}>Different Users</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  USER OVERLAP
                </span>
              </div>
              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10 }}>
                {/* Top-left: Same user, Same transaction */}
                <MatrixCell
                  label="HIGH CONFLICT"
                  description="Same person advised on both sides of the same deal. Rare in cannabis, but dispensary owners who also purchase could experience this."
                  highlighted={false}
                  t={t}
                />
                {/* Top-right: Different users, Same transaction */}
                <MatrixCell
                  label="PERCEIVED CONFLICT"
                  description="Different people, but negotiating the same deal. If both learn they use 'Dex,' trust may erode. The 'playing both sides' scenario."
                  highlighted={true}
                  t={t}
                />
                {/* Bottom-left: Same user, Different transactions */}
                <MatrixCell
                  label="LOW CONFLICT"
                  description="Same person uses Dex in different contexts, but never on the same transaction. Easy to manage with transparency."
                  highlighted={false}
                  t={t}
                />
                {/* Bottom-right: Different users, Different transactions */}
                <MatrixCell
                  label="NO CONFLICT"
                  description="Different people, different deals. This is 95% of usage. Budtenders never interact with brand reps' Dex."
                  highlighted={false}
                  t={t}
                />
              </div>
              {/* Axis labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingLeft: 4, paddingRight: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint }}>Same Transaction</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint }}>Different Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div
          style={{
            background: `${t.accentGold}08`,
            border: `1px solid ${t.accentGold}25`,
            borderRadius: 12,
            padding: '22px 26px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `${t.accentGold}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                color: t.accentGold,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              !
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>Key Insight</div>
              <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>
                Most users will <strong style={{ color: t.text }}>never use both sides</strong>.
                Budtenders don't manage wholesale. Brand managers don't work the counter.
                The "conflict" is theoretical for{' '}
                <strong style={{ color: t.accentGold }}>95% of users</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* The 5% concern */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '22px 26px',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}>
            But What About the 5%?
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>
            Dispensary owners who also manage purchasing DO see both sides.
            They need to trust that Dex isn't biased -- that it doesn't favor one party over another.
          </p>
          <div
            style={{
              background: `${t.accentGreen}08`,
              border: `1px solid ${t.accentGreen}25`,
              borderRadius: 8,
              padding: '14px 18px',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGreen, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Solution: Transparency
            </div>
            <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
              "Dex Retail recommends products based on <strong style={{ color: t.text }}>YOUR</strong> customer data
              and margin goals. Dex Commerce recommends accounts based on <strong style={{ color: t.text }}>YOUR</strong> sales
              targets. Neither side sees the other's strategy."
            </p>
          </div>
        </div>

        {/* Trust comparison — B2C vs B2B */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.accentGold}30`,
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              B2C Trust Model
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>
              "Dex knows what's good for my customer"
            </div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
              Trust is built on recommendation quality, product knowledge, and helping the budtender
              look smart in front of the customer.
            </p>
            <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Product expertise', 'Customer empathy', 'Friendly tone'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: `${t.accentGold}12`,
                    border: `1px solid ${t.accentGold}25`,
                    fontSize: 11,
                    color: t.accentGold,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.accentGreen}30`,
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              B2B Trust Model
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>
              "Dex helps me close deals fairly"
            </div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
              Trust is built on market intelligence accuracy, impartiality, and helping the brand rep
              find genuine opportunities.
            </p>
            <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Market data', 'Deal intelligence', 'Professional tone'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: `${t.accentGreen}12`,
                    border: `1px solid ${t.accentGreen}25`,
                    fontSize: 11,
                    color: t.accentGreen,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* SECTION 6 — RECOMMENDATION                               */}
        {/* ======================================================= */}
        <SectionHeader number="6" label="Recommendation" t={t} />

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Our Call
        </h2>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 28, maxWidth: 650 }}>
          After weighing all factors, here is the confident recommendation.
        </p>

        {/* Primary Recommendation Card */}
        <div
          style={{
            background: `linear-gradient(135deg, ${t.accentGold}10, ${t.accentGreen}08)`,
            border: `2px solid ${t.accentGold}40`,
            borderRadius: 16,
            padding: 36,
            marginBottom: 32,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: t.accentGold,
              color: '#0A0908',
              fontSize: 11,
              fontWeight: 800,
              padding: '6px 18px',
              borderRadius: '0 14px 0 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Recommended
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div
              style={{
                padding: '5px 14px',
                borderRadius: 6,
                background: `${t.accentGold}25`,
                border: `1px solid ${t.accentGold}50`,
                fontSize: 14,
                fontWeight: 700,
                color: t.accentGold,
              }}
            >
              Option A
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 800,
                color: t.text,
                letterSpacing: '-0.02em',
              }}
            >
              One Dex
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[
              {
                point: 'The trust conflict is addressable with transparency',
                detail: 'Clear data separation messaging resolves the "playing both sides" concern for the small % who see both.',
              },
              {
                point: 'Brand simplicity advantage is massive',
                detail: 'One name, one investment, one story. Marketing budgets stretch further. Developer experience stays unified.',
              },
              {
                point: 'Most users only see one context',
                detail: '95% of users are either retail OR brand-side. The conflict is theoretical for the vast majority.',
              },
              {
                point: '"Dex knows the whole market" is incredibly powerful',
                detail: 'No competitor can claim full-market intelligence. This positioning is worth protecting with a unified brand.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: `${t.bg}80`,
                  border: `1px solid ${t.border}`,
                  borderRadius: 10,
                  padding: 18,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>
                  {item.point}
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
                  {item.detail}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: `${t.accentGold}12`,
              border: `1px solid ${t.accentGold}30`,
              borderRadius: 8,
              padding: '14px 20px',
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: t.textMuted }}>
              Differentiate with <strong style={{ color: t.accentGold }}>UI</strong>,
              not <strong style={{ color: t.textFaint }}>naming</strong>.
            </span>
          </div>
        </div>

        {/* Final Concept — Side by Side */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: 32,
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, textAlign: 'center' }}>
            Final Concept: Same AI, Adapted Interface
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {/* Retail Dex */}
            <div
              style={{
                border: `1.5px solid ${t.accentGold}40`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: `${t.accentGold}15`,
                  borderBottom: `1px solid ${t.accentGold}30`,
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: `${t.accentGold}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: t.accentGold,
                  }}
                >
                  D
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: t.accentGold }}>Dex</span>
                <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 4 }}>Retail Assistant</span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600 }}>Accent</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: t.accentGold }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: t.accentGoldLight }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: t.accentGoldLighter }} />
                    <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 4 }}>Gold palette</span>
                  </div>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600, marginTop: 6 }}>Primary UI</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>Chat-first interface</div>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600, marginTop: 6 }}>Voice</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>Casual, helpful, approachable</div>
                </div>
              </div>
            </div>

            {/* B2B Dex */}
            <div
              style={{
                border: `1.5px solid ${t.accentGreen}40`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: `${t.accentGreen}15`,
                  borderBottom: `1px solid ${t.accentGreen}30`,
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: `${t.accentGreen}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: t.accentGreen,
                  }}
                >
                  D
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: t.accentGreen }}>Dex</span>
                <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 4 }}>Commerce Advisor</span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600 }}>Accent</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: t.accentGreen }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: `${t.accentGreen}CC` }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: `${t.accentGreen}88` }} />
                    <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 4 }}>Green palette</span>
                  </div>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600, marginTop: 6 }}>Primary UI</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>Dashboard-first interface</div>
                  <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600, marginTop: 6 }}>Voice</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>Professional, data-driven, concise</div>
                </div>
              </div>
            </div>
          </div>

          {/* Unified bottom bar */}
          <div
            style={{
              background: `linear-gradient(90deg, ${t.accentGold}20, ${t.accentGreen}20)`,
              borderRadius: 8,
              padding: '12px 20px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 13, color: t.text, fontWeight: 600 }}>
              Same AI engine. Same name. Same brand investment.{' '}
              <span style={{ color: t.accentGold }}>Different accent.</span>{' '}
              <span style={{ color: t.accentGreen }}>Different context.</span>
            </span>
          </div>
        </div>

        {/* Fallback Plan */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: 28,
            marginBottom: 48,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                background: `${t.textFaint}18`,
                fontSize: 11,
                fontWeight: 700,
                color: t.textFaint,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Fallback
            </div>
            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.text }}>
              If Trust Becomes an Issue
            </h4>
          </div>
          <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.65, marginBottom: 18 }}>
            If market feedback indicates the "playing both sides" concern is real and harming adoption,
            pivot to <strong style={{ color: t.text }}>Option B</strong> with a B2B sibling name.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            <div
              style={{
                border: `1.5px solid ${t.accentGold}40`,
                borderRadius: 10,
                padding: 20,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: t.accentGold, marginBottom: 6 }}>Dex</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>Stays as retail AI</div>
              <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>Budtenders, dispensary staff</div>
            </div>
            <div
              style={{
                border: `1.5px solid ${t.accentGreen}40`,
                borderRadius: 10,
                padding: 20,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: t.accentGreen, marginBottom: 6 }}>Quinn</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>Becomes B2B agent</div>
              <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>Professional, sharp, gender-neutral</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: `1px solid ${t.border}`,
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: t.text }}>Why Quinn?</strong> It pairs well with Dex phonetically
            (both short, punchy, single-syllable). "Quinn" evokes query intelligence and has a professional,
            gender-neutral quality that fits the B2B context. The Dex/Quinn pairing feels like siblings -- related
            but distinct.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: 32,
            borderTop: `1px solid ${t.border}`,
            paddingBottom: 24,
          }}
        >
          <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Dex B2C vs B2B Brand Analysis
          </div>
        </div>
      </div>
    </div>
  );
}

export default DexB2CvsB2BSection;
