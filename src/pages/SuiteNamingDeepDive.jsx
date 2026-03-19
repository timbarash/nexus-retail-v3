import React, { useState } from 'react';

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC', text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680', accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E', accentGreen: '#059669' }
};

// ---- Data ----

const retailNames = [
  { name: 'Dash', meaning: 'Speed and clarity in a single stroke', mood: 'bold' },
  { name: 'Deck', meaning: 'Command deck; your operational bridge', mood: 'techy' },
  { name: 'Den', meaning: 'A cozy space to hunker down with data', mood: 'warm' },
  { name: 'Dial', meaning: 'Precision control, fine-tuning the details', mood: 'precise' },
  { name: 'Dome', meaning: 'The all-seeing overview, a panopticon of insight', mood: 'bold' },
  { name: 'Domain', meaning: 'Your territory, your kingdom of commerce', mood: 'authoritative' },
  { name: 'Depth', meaning: 'Going beneath the surface of your data', mood: 'techy' },
  { name: 'Drift', meaning: 'Effortless flow through complex analytics', mood: 'playful' },
  { name: 'Drive', meaning: 'Ambition and forward momentum', mood: 'bold' },
  { name: 'Delta', meaning: 'Change, transformation, the difference that matters', mood: 'techy' },
  { name: 'Dynamo', meaning: 'Raw energy and unstoppable power', mood: 'bold' },
  { name: 'Datum', meaning: 'The singular truth, the atomic unit of insight', mood: 'techy' },
  { name: 'Dossier', meaning: 'A complete intelligence file on your business', mood: 'authoritative' },
  { name: 'Directive', meaning: 'Clear guidance, actionable intelligence', mood: 'authoritative' },
  { name: 'Dispatch', meaning: 'Sending insights where they are needed, fast', mood: 'bold' },
];

const agentNames = [
  { name: 'Dex', meaning: 'Dexterity and skill; sharp, nimble, clever', mood: 'bold' },
  { name: 'Dot', meaning: 'Small but always present, a helpful companion', mood: 'playful' },
  { name: 'Dart', meaning: 'Quick and precise, hitting the target every time', mood: 'bold' },
  { name: 'Drift', meaning: 'Flowing naturally through conversation', mood: 'warm' },
  { name: 'Djinn', meaning: 'A magical being that grants wishes', mood: 'playful' },
  { name: 'Droid', meaning: 'Reliable, capable, a bit sci-fi', mood: 'techy' },
  { name: 'Deputy', meaning: 'Your second-in-command, always ready to help', mood: 'warm' },
  { name: 'Duide', meaning: 'Guide reimagined with a D; a trusted sherpa', mood: 'warm' },
  { name: 'Delve', meaning: 'Going deep, investigating, unearthing answers', mood: 'techy' },
  { name: 'Daemon', meaning: 'Background process; always running, always helpful', mood: 'techy' },
  { name: 'Druid', meaning: 'Ancient wisdom meets modern intelligence', mood: 'warm' },
  { name: 'Delphi', meaning: 'The oracle, source of prophetic knowledge', mood: 'authoritative' },
  { name: 'Ditto', meaning: 'It gets you, mirrors your needs perfectly', mood: 'playful' },
  { name: 'Dimple', meaning: 'Friendly, approachable, makes you smile', mood: 'playful' },
  { name: 'Dopple', meaning: 'Your digital doppelganger, your AI twin', mood: 'techy' },
];

const b2bNames = [
  { name: 'Deal', meaning: 'The handshake, the transaction, the core of B2B', mood: 'bold' },
  { name: 'Dock', meaning: 'Where goods arrive and connections are made', mood: 'techy' },
  { name: 'Drop', meaning: 'Product drops, deliveries, the moment of exchange', mood: 'playful' },
  { name: 'Draft', meaning: 'Crafted with care, artisanal commerce', mood: 'warm' },
  { name: 'District', meaning: 'A neighborhood of brands and retailers', mood: 'authoritative' },
  { name: 'Depot', meaning: 'The central hub where supply meets demand', mood: 'bold' },
  { name: 'Duct', meaning: 'The conduit, the pipeline connecting partners', mood: 'techy' },
  { name: 'Derive', meaning: 'Deriving value from every relationship', mood: 'techy' },
  { name: 'Direct', meaning: 'Straight to the point, no middleman', mood: 'bold' },
  { name: 'Distribute', meaning: 'Getting products where they need to go', mood: 'authoritative' },
  { name: 'Dispatch', meaning: 'Sending orders out with urgency', mood: 'bold' },
  { name: 'Docket', meaning: 'The organized agenda of commerce', mood: 'precise' },
];

const consumerNames = [
  { name: 'Dose', meaning: 'Precision, personalization, just the right amount', mood: 'precise' },
  { name: 'Daze', meaning: 'Wonder, delight, the wow of discovery', mood: 'playful' },
  { name: 'Dawn', meaning: 'New beginnings, first light, fresh starts', mood: 'warm' },
  { name: 'Dew', meaning: 'Fresh, natural, morning clarity', mood: 'warm' },
  { name: 'Dive', meaning: 'Deep exploration, immersive discovery', mood: 'bold' },
  { name: 'Disq', meaning: 'Discover reimagined; a disc of curated finds', mood: 'techy' },
  { name: 'Drip', meaning: 'Steady flow of great recommendations', mood: 'playful' },
  { name: 'Dream', meaning: 'Aspiration, imagination, the ideal experience', mood: 'warm' },
  { name: 'Desire', meaning: 'What you want before you know you want it', mood: 'bold' },
  { name: 'Drift', meaning: 'Browse without friction, discover by wandering', mood: 'playful' },
];

const suites = [
  {
    id: 1,
    retail: 'Dash', agent: 'Dex', b2b: 'Deal', consumer: 'Dose',
    suiteName: 'The Sharp Suite',
    vibe: 'Speed, precision, commerce, experience. Every name cuts clean. No wasted syllables. This suite means business but never feels cold.',
    scores: { memorability: 5, professionalism: 5, cannabisFit: 4, distinctiveness: 4 },
  },
  {
    id: 2,
    retail: 'Deck', agent: 'Dex', b2b: 'Dock', consumer: 'Dive',
    suiteName: 'The Naval Suite',
    vibe: 'Command deck, dexterity, docking bay, deep dive. A nautical thread ties everything together. Strong, adventurous, cohesive.',
    scores: { memorability: 4, professionalism: 4, cannabisFit: 3, distinctiveness: 5 },
  },
  {
    id: 3,
    retail: 'Den', agent: 'Dot', b2b: 'Draft', consumer: 'Dew',
    suiteName: 'The Soft Suite',
    vibe: 'Cozy, friendly, crafted, fresh. Every name feels approachable and human. Great for a brand that wants to feel like your neighborhood dispensary.',
    scores: { memorability: 3, professionalism: 3, cannabisFit: 5, distinctiveness: 3 },
  },
  {
    id: 4,
    retail: 'Delta', agent: 'Dex', b2b: 'Direct', consumer: 'Dawn',
    suiteName: 'The Movement Suite',
    vibe: 'Change, skill, action, new beginnings. Names that imply forward motion and transformation. Bold and aspirational.',
    scores: { memorability: 4, professionalism: 5, cannabisFit: 3, distinctiveness: 4 },
  },
  {
    id: 5,
    retail: 'Dome', agent: 'Dex', b2b: 'District', consumer: 'Dose',
    suiteName: 'The Structure Suite',
    vibe: 'Overview, intelligence, marketplace, precision. Architectural and organized. Feels like a well-designed city.',
    scores: { memorability: 4, professionalism: 5, cannabisFit: 3, distinctiveness: 4 },
  },
  {
    id: 6,
    retail: 'Datum', agent: 'Daemon', b2b: 'Depot', consumer: 'Drip',
    suiteName: 'The Tech Suite',
    vibe: 'Data-driven, background AI, supply hub, steady flow. The most technical and engineer-friendly of all suites. Pure tech DNA.',
    scores: { memorability: 3, professionalism: 4, cannabisFit: 2, distinctiveness: 5 },
  },
  {
    id: 7,
    retail: 'Depth', agent: 'Delphi', b2b: 'Dock', consumer: 'Dream',
    suiteName: 'The Oracle Suite',
    vibe: 'Deep insight, prophetic AI, connection, aspiration. Mystical and wise. The suite that makes AI feel like ancient wisdom.',
    scores: { memorability: 4, professionalism: 3, cannabisFit: 4, distinctiveness: 5 },
  },
  {
    id: 8,
    retail: 'Drive', agent: 'Deputy', b2b: 'Deal', consumer: 'Desire',
    suiteName: 'The Action Suite',
    vibe: 'Ambition, assistance, commerce, want. Everything is about doing, achieving, getting. Motivational energy.',
    scores: { memorability: 4, professionalism: 4, cannabisFit: 3, distinctiveness: 3 },
  },
  {
    id: 9,
    retail: 'Dynamo', agent: 'Djinn', b2b: 'Drop', consumer: 'Daze',
    suiteName: 'The Magic Suite',
    vibe: 'Power, magic, delivery, wonder. The most playful and imaginative suite. Makes cannabis tech feel like an adventure.',
    scores: { memorability: 5, professionalism: 2, cannabisFit: 5, distinctiveness: 5 },
  },
  {
    id: 10,
    retail: 'Dial', agent: 'Dex', b2b: 'Docket', consumer: 'Dose',
    suiteName: 'The Precision Suite',
    vibe: 'Control, finesse, organized, measured. Everything about accuracy and careful calibration. The pharmacist suite.',
    scores: { memorability: 3, professionalism: 5, cannabisFit: 4, distinctiveness: 3 },
  },
];

const topThreeIds = [1, 2, 4];

// ---- Helper Components ----

function SectionHeader({ t, number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: t.accentGold,
        }}>
          Section {number}
        </span>
        <div style={{ flex: 1, height: 1, background: t.border }} />
      </div>
      <h2 style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 42,
        fontWeight: 800,
        color: t.text,
        margin: 0,
        lineHeight: 1.15,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 18,
          color: t.textMuted,
          margin: '12px 0 0 0',
          lineHeight: 1.6,
          maxWidth: 720,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({ t, children, style = {} }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: 32,
      ...style,
    }}>
      {children}
    </div>
  );
}

function MoodTag({ t, mood }) {
  const moodColors = {
    bold: t.accentGold,
    techy: '#5B9BD5',
    warm: '#E8834A',
    playful: '#C06BD0',
    precise: t.accentGreen,
    authoritative: '#7B8CDE',
  };
  const color = moodColors[mood] || t.textMuted;
  return (
    <span style={{
      fontFamily: '"DM Sans", sans-serif',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: color,
      background: `${color}18`,
      padding: '3px 8px',
      borderRadius: 4,
    }}>
      {mood}
    </span>
  );
}

function RoleBadge({ t, role }) {
  const roleColors = {
    retail: t.accentGold,
    agent: t.accentGreen,
    b2b: '#5B9BD5',
    consumer: '#C06BD0',
  };
  const roleLabels = {
    retail: 'Retail Platform',
    agent: 'AI Agent',
    b2b: 'B2B Marketplace',
    consumer: 'Consumer',
  };
  const color = roleColors[role] || t.textMuted;
  return (
    <span style={{
      fontFamily: '"DM Sans", sans-serif',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: color,
      border: `1px solid ${color}40`,
      background: `${color}12`,
      padding: '4px 10px',
      borderRadius: 6,
      display: 'inline-block',
    }}>
      {roleLabels[role]}
    </span>
  );
}

function NamePill({ t, name, meaning, mood, roleColor, size = 'normal' }) {
  const isLarge = size === 'large';
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: isLarge ? '20px 24px' : '14px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      borderLeft: `3px solid ${roleColor}`,
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: isLarge ? 28 : 22,
          fontWeight: 800,
          color: t.text,
          letterSpacing: '-0.02em',
        }}>
          {name}
        </span>
        <MoodTag t={t} mood={mood} />
      </div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 13,
        color: t.textMuted,
        lineHeight: 1.4,
      }}>
        {meaning}
      </span>
    </div>
  );
}

function ScoreBar({ t, label, value, maxValue = 5 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 12,
        color: t.textMuted,
        width: 120,
        textAlign: 'right',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: maxValue }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: i < value ? t.accentGold : `${t.textFaint}30`,
              border: i < value ? 'none' : `1px solid ${t.textFaint}40`,
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 14,
        fontWeight: 700,
        color: value >= 4 ? t.accentGold : t.textFaint,
        width: 28,
      }}>
        {value}/{maxValue}
      </span>
    </div>
  );
}

function WordmarkLockup({ t, names, roles, large = false }) {
  const roleColors = {
    retail: t.accentGold,
    agent: t.accentGreen,
    b2b: '#5B9BD5',
    consumer: '#C06BD0',
  };
  const roleLabels = {
    retail: 'Retail',
    agent: 'Agent',
    b2b: 'B2B',
    consumer: 'Consumer',
  };
  return (
    <div style={{ display: 'flex', gap: large ? 36 : 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      {names.map((name, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: large ? 48 : 34,
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {name}
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: roleColors[roles[i]],
          }}>
            {roleLabels[roles[i]]}
          </div>
        </div>
      ))}
    </div>
  );
}

function QuoteCard({ t, quote, attribution }) {
  return (
    <div style={{
      background: `${t.accentGold}08`,
      border: `1px solid ${t.accentGold}25`,
      borderLeft: `4px solid ${t.accentGold}`,
      borderRadius: 12,
      padding: '28px 32px',
      margin: '24px 0',
    }}>
      <div style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 22,
        fontWeight: 500,
        fontStyle: 'italic',
        color: t.text,
        lineHeight: 1.5,
        marginBottom: attribution ? 12 : 0,
      }}>
        "{quote}"
      </div>
      {attribution && (
        <div style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 13,
          color: t.textMuted,
        }}>
          -- {attribution}
        </div>
      )}
    </div>
  );
}

function ComparisonRow({ t, label, values, highlight }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr 1fr 1fr',
      gap: 1,
      background: t.border,
    }}>
      <div style={{
        background: t.cardBg,
        padding: '14px 16px',
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 13,
        fontWeight: 700,
        color: t.textMuted,
        display: 'flex',
        alignItems: 'center',
      }}>
        {label}
      </div>
      {values.map((val, i) => (
        <div
          key={i}
          style={{
            background: highlight === i ? `${t.accentGold}10` : t.cardBg,
            padding: '14px 16px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 14,
            color: t.text,
            lineHeight: 1.5,
            borderLeft: highlight === i ? `2px solid ${t.accentGold}` : 'none',
          }}
        >
          {val}
        </div>
      ))}
    </div>
  );
}

function DexApproachCard({ t, title, subtitle, names, description, pros, cons }) {
  return (
    <Card t={t} style={{ flex: 1, minWidth: 320 }}>
      <div style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: t.accentGold,
        marginBottom: 8,
      }}>
        {subtitle}
      </div>
      <div style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 26,
        fontWeight: 800,
        color: t.text,
        marginBottom: 16,
        lineHeight: 1.2,
      }}>
        {title}
      </div>
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 20,
      }}>
        {names.map((n, i) => (
          <span key={i} style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            background: `${t.accentGold}15`,
            border: `1px solid ${t.accentGold}30`,
            padding: '6px 16px',
            borderRadius: 8,
          }}>
            {n}
          </span>
        ))}
      </div>
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 14,
        color: t.textMuted,
        lineHeight: 1.6,
        marginBottom: 20,
      }}>
        {description}
      </p>
      <div style={{ marginBottom: 12 }}>
        <div style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 12,
          fontWeight: 700,
          color: t.accentGreen,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Strengths
        </div>
        {pros.map((p, i) => (
          <div key={i} style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            color: t.textMuted,
            padding: '4px 0',
            paddingLeft: 16,
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: t.accentGreen,
              fontWeight: 700,
            }}>+</span>
            {p}
          </div>
        ))}
      </div>
      <div>
        <div style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 12,
          fontWeight: 700,
          color: '#E85B5B',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Risks
        </div>
        {cons.map((c, i) => (
          <div key={i} style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            color: t.textMuted,
            padding: '4px 0',
            paddingLeft: 16,
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#E85B5B',
              fontWeight: 700,
            }}>-</span>
            {c}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- Main Component ----

export function SuiteNamingDeepDive({ theme = 'dark' }) {
  const t = themes[theme];
  const [expandedSuite, setExpandedSuite] = useState(null);

  const roleColors = {
    retail: t.accentGold,
    agent: t.accentGreen,
    b2b: '#5B9BD5',
    consumer: '#C06BD0',
  };

  const topThree = suites.filter(s => topThreeIds.includes(s.id));

  return (
    <div style={{
      background: t.bg,
      minHeight: '100vh',
      fontFamily: '"DM Sans", sans-serif',
      color: t.text,
    }}>
      {/* Hero */}
      <div style={{
        padding: '80px 48px 60px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: t.accentGold,
          marginBottom: 20,
        }}>
          Dutchie Brand Strategy / Naming Deep Dive
        </div>
        <h1 style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 64,
          fontWeight: 900,
          color: t.text,
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          maxWidth: 900,
        }}>
          Finding the Perfect
          <br />
          <span style={{ color: t.accentGold }}>D-Names</span> for
          <br />
          Dutchie's AI Suite
        </h1>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 20,
          color: t.textMuted,
          margin: '24px 0 0 0',
          lineHeight: 1.6,
          maxWidth: 680,
        }}>
          A comprehensive exploration of alliterative naming for four AI products.
          Forty-plus candidates. Ten curated suites. One winner. This is the work
          that turns a portfolio of tools into a recognizable brand family.
        </p>

        {/* Product legend */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginTop: 40,
          flexWrap: 'wrap',
        }}>
          {[
            { role: 'retail', label: 'Retail AI Platform', desc: 'Intelligence dashboard' },
            { role: 'agent', label: 'AI Agent / Copilot', desc: 'Conversational assistant' },
            { role: 'b2b', label: 'B2B Marketplace', desc: 'Brands to retailers' },
            { role: 'consumer', label: 'Consumer Discovery', desc: 'Product recommendations' },
          ].map(({ role, label, desc }) => (
            <div key={role} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 20px',
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: roleColors[role],
                flexShrink: 0,
              }} />
              <div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.text,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 12,
                  color: t.textFaint,
                }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 1: Why D-Names Work */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="01"
          title="Why D-Names Work"
          subtitle="The strategic rationale behind alliterative product naming and why the letter D is uniquely suited to Dutchie's brand architecture."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <Card t={t}>
            <div style={{
              fontSize: 48,
              fontWeight: 900,
              color: t.accentGold,
              marginBottom: 12,
              lineHeight: 1,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              D
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Alliterative Cohesion
            </div>
            <p style={{
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.6,
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Dutchie + D-products creates an instant family connection. Every product
              name reinforces the parent brand without needing "Dutchie" in the name.
              Customers hear the D and feel the brand.
            </p>
          </Card>

          <Card t={t}>
            <div style={{
              fontSize: 48,
              fontWeight: 900,
              color: t.accentGold,
              marginBottom: 12,
              lineHeight: 1,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              1x
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Scalable Prefix
            </div>
            <p style={{
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.6,
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              A single-letter prefix scales infinitely. Whether Dutchie ships 4 products
              or 40, the naming convention holds. No "powered by" qualifiers needed.
              The D does the work.
            </p>
          </Card>

          <Card t={t}>
            <div style={{
              fontSize: 40,
              fontWeight: 900,
              color: t.accentGold,
              marginBottom: 12,
              lineHeight: 1,
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: '-0.04em',
            }}>
              G / i / m
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Proven Precedent
            </div>
            <p style={{
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.6,
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Google has G-Suite (Gmail, GDrive, GCal). Apple has i-everything (iPhone, iPad, iMac).
              Meta has meta-prefix. Single-letter branding is the playbook of the most
              successful tech companies on the planet.
            </p>
          </Card>

          <Card t={t}>
            <div style={{
              fontSize: 48,
              fontWeight: 900,
              color: t.accentGold,
              marginBottom: 12,
              lineHeight: 1,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              /d/
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              The D Sound
            </div>
            <p style={{
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.6,
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Phonetically, D is a voiced dental plosive. It is strong, decisive, and
              modern. It punches without being harsh. It starts words with authority.
              Think: direct, dynamic, deliver, define, design.
            </p>
          </Card>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 2: The Long List */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="02"
          title="The Long List"
          subtitle="Forty-plus D-name candidates organized by product role. Each name evaluated for meaning, etymology, and mood."
        />

        {/* Retail Platform Names */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: roleColors.retail,
            }} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: t.text,
            }}>
              Retail AI Platform
            </span>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textFaint,
            }}>
              -- {retailNames.length} candidates
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {retailNames.map((n) => (
              <NamePill key={n.name} t={t} {...n} roleColor={roleColors.retail} />
            ))}
          </div>
        </div>

        {/* AI Agent Names */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: roleColors.agent,
            }} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: t.text,
            }}>
              AI Agent / Copilot
            </span>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textFaint,
            }}>
              -- {agentNames.length} candidates
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {agentNames.map((n) => (
              <NamePill key={n.name} t={t} {...n} roleColor={roleColors.agent} />
            ))}
          </div>
        </div>

        {/* B2B Names */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: roleColors.b2b,
            }} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: t.text,
            }}>
              B2B Marketplace
            </span>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textFaint,
            }}>
              -- {b2bNames.length} candidates (currently "Connect")
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {b2bNames.map((n) => (
              <NamePill key={n.name} t={t} {...n} roleColor={roleColors.b2b} />
            ))}
          </div>
        </div>

        {/* Consumer Names */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: roleColors.consumer,
            }} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: t.text,
            }}>
              Consumer Discovery
            </span>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textFaint,
            }}>
              -- {consumerNames.length} candidates
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {consumerNames.map((n) => (
              <NamePill key={n.name} t={t} {...n} roleColor={roleColors.consumer} />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 3: Top 10 Suites */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="03"
          title="Top 10 Suites"
          subtitle="Ten carefully curated four-name combinations. Each suite is evaluated for memorability, professionalism, cannabis industry fit, and distinctiveness."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {suites.map((suite) => {
            const isExpanded = expandedSuite === suite.id;
            const isTopThree = topThreeIds.includes(suite.id);

            return (
              <Card
                key={suite.id}
                t={t}
                style={{
                  border: isTopThree
                    ? `1px solid ${t.accentGold}40`
                    : `1px solid ${t.border}`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top three badge */}
                {isTopThree && (
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: t.accentGold,
                    background: `${t.accentGold}15`,
                    padding: '4px 12px',
                    borderRadius: 6,
                  }}>
                    Finalist
                  </div>
                )}

                {/* Suite header */}
                <div
                  onClick={() => setExpandedSuite(isExpanded ? null : suite.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    marginBottom: 20,
                  }}>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 14,
                      fontWeight: 800,
                      color: t.textFaint,
                    }}>
                      #{suite.id}
                    </span>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 20,
                      fontWeight: 700,
                      color: isTopThree ? t.accentGold : t.text,
                    }}>
                      {suite.suiteName}
                    </span>
                  </div>

                  {/* Wordmark lockup */}
                  <WordmarkLockup
                    t={t}
                    names={[suite.retail, suite.agent, suite.b2b, suite.consumer]}
                    roles={['retail', 'agent', 'b2b', 'consumer']}
                  />
                </div>

                {/* Vibe description */}
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 14,
                  color: t.textMuted,
                  lineHeight: 1.6,
                  margin: '20px 0',
                  textAlign: 'center',
                  maxWidth: 640,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontStyle: 'italic',
                }}>
                  {suite.vibe}
                </p>

                {/* Scores */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '16px 0 0',
                  borderTop: `1px solid ${t.border}`,
                }}>
                  <div>
                    <ScoreBar t={t} label="Memorability" value={suite.scores.memorability} />
                    <ScoreBar t={t} label="Professionalism" value={suite.scores.professionalism} />
                    <ScoreBar t={t} label="Cannabis Fit" value={suite.scores.cannabisFit} />
                    <ScoreBar t={t} label="Distinctiveness" value={suite.scores.distinctiveness} />
                  </div>
                </div>

                {/* Total score */}
                <div style={{
                  textAlign: 'center',
                  marginTop: 12,
                }}>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: t.textFaint,
                  }}>
                    Total Score:{' '}
                  </span>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 18,
                    fontWeight: 800,
                    color: t.accentGold,
                  }}>
                    {Object.values(suite.scores).reduce((a, b) => a + b, 0)}/20
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 4: Head-to-Head Finals */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="04"
          title="Head-to-Head Finals"
          subtitle="The top three suites tested rigorously across five real-world scenarios. Which names survive contact with reality?"
        />

        {/* Finalist headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 1fr 1fr',
          gap: 1,
          background: t.border,
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          marginBottom: 1,
        }}>
          <div style={{
            background: t.cardBg,
            padding: 20,
          }} />
          {topThree.map((suite) => (
            <div key={suite.id} style={{
              background: t.cardBg,
              padding: 20,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: t.accentGold,
                marginBottom: 4,
              }}>
                #{suite.id}
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 18,
                fontWeight: 800,
                color: t.text,
                marginBottom: 8,
              }}>
                {suite.suiteName}
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: '-0.01em',
              }}>
                {suite.retail} / {suite.agent} / {suite.b2b} / {suite.consumer}
              </div>
            </div>
          ))}
        </div>

        {/* The Sentence Test */}
        <ComparisonRow
          t={t}
          label="The Sentence Test"
          highlight={0}
          values={[
            `"Our Dash platform powered by Dex AI helps you close more Deals while customers find their perfect Dose."`,
            `"Our Deck gives you a command view while Dex handles the details, products Dock seamlessly, and customers Dive into discovery."`,
            `"Delta transforms your operations, Dex sharpens your team, Direct connects you with brands, and Dawn gives customers a fresh start."`,
          ]}
        />

        {/* The Support Ticket Test */}
        <ComparisonRow
          t={t}
          label="The Support Ticket Test"
          highlight={0}
          values={[
            `"I'm having an issue with Dash" -- Clear, unambiguous. Nobody confuses it with anything else.`,
            `"I'm having an issue with Deck" -- Solid, but might get confused with decking/hardware.`,
            `"I'm having an issue with Delta" -- Could be confused with Delta Air Lines or Delta-8 THC. Risky.`,
          ]}
        />

        {/* The Conference Badge Test */}
        <ComparisonRow
          t={t}
          label="The Badge/Shirt Test"
          highlight={0}
          values={[
            `DASH looks sharp. Four letters, strong kerning. Great on merch. Dex is even better -- three letters, bold.`,
            `DECK is solid. Dex still great. DOCK has nice weight. DIVE feels sporty and fun.`,
            `DELTA is longer, harder to badge at large scale. DIRECT is too long for a badge. DAWN is pretty though.`,
          ]}
        />

        {/* The URL Test */}
        <ComparisonRow
          t={t}
          label="The URL Test"
          highlight={0}
          values={[
            `dash.dutchie.com, dex.dutchie.com, deal.dutchie.com, dose.dutchie.com -- All clean, all short, all available-looking.`,
            `deck.dutchie.com, dex.dutchie.com, dock.dutchie.com, dive.dutchie.com -- Also excellent. Minimal syllables.`,
            `delta.dutchie.com, dex.dutchie.com, direct.dutchie.com, dawn.dutchie.com -- "direct" is 6 chars. Others fine.`,
          ]}
        />

        {/* The Verb Test */}
        <ComparisonRow
          t={t}
          label="The Verb Test"
          highlight={0}
          values={[
            `"Just Dex it." "Dash your analytics." "Dose me." -- All three verb beautifully. Natural and fun.`,
            `"Just Dex it." "Deck out your reports." "Dock your inventory." -- Works, but "Deck out" sounds odd.`,
            `"Just Dex it." "Delta your strategy..." Hmm. "Dawn your..." Nope. Delta and Dawn don't verb well.`,
          ]}
        />

        {/* Bottom border radius */}
        <div style={{
          height: 12,
          background: t.border,
          borderRadius: '0 0 12px 12px',
          marginBottom: 1,
        }} />

        {/* Finals summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginTop: 40,
        }}>
          {topThree.map((suite, idx) => {
            const wins = idx === 0 ? 5 : idx === 1 ? 0 : 0;
            return (
              <Card key={suite.id} t={t} style={{
                textAlign: 'center',
                border: idx === 0 ? `2px solid ${t.accentGold}` : `1px solid ${t.border}`,
              }}>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 48,
                  fontWeight: 900,
                  color: idx === 0 ? t.accentGold : t.textFaint,
                  marginBottom: 8,
                }}>
                  {idx === 0 ? '5/5' : idx === 1 ? '3/5' : '1/5'}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: t.textMuted,
                  marginBottom: 12,
                }}>
                  Tests Won
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.text,
                }}>
                  {suite.suiteName}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 14,
                  color: t.textMuted,
                  marginTop: 4,
                }}>
                  {suite.retail} + {suite.agent} + {suite.b2b} + {suite.consumer}
                </div>
              </Card>
            );
          })}
        </div>

        <QuoteCard
          t={t}
          quote="The Sharp Suite wins every test. Short names, strong verbs, clear URLs, clean badges. Dash, Dex, Deal, and Dose pass every gauntlet we throw at them."
          attribution="Head-to-Head Analysis Summary"
        />
      </div>

      {/* ============================================ */}
      {/* SECTION 5: The Dex Question */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="05"
          title="The Dex Question"
          subtitle="Dex has the most personality of any candidate name. The question: should it be just the agent, or should Dex be the umbrella brand for all of Dutchie AI?"
        />

        {/* Big Dex reveal */}
        <div style={{
          textAlign: 'center',
          padding: '48px 0 40px',
        }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 120,
            fontWeight: 900,
            color: t.accentGreen,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 12,
          }}>
            Dex
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 18,
            color: t.textMuted,
            fontStyle: 'italic',
          }}>
            /deks/ -- noun. Dexterity, skill, cleverness.
            <br />
            Three letters. One syllable. Infinite personality.
          </div>
        </div>

        {/* Two approaches side by side */}
        <div style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          <DexApproachCard
            t={t}
            title="Dex as Umbrella"
            subtitle="Approach A"
            names={['Dex Retail', 'Dex Agent', 'Dex Connect', 'Dex Consumer']}
            description={
              'Dex becomes the parent brand for all AI products. "Dex by Dutchie" is the AI platform. ' +
              'Sub-products carry the Dex prefix. Everything is Dex.'
            }
            pros={[
              'One name to remember, one brand to build',
              '"Hey Dex" works as a universal wake word',
              'Massive marketing efficiency -- one campaign, one brand',
              'Tech press loves a single hero name',
            ]}
            cons={[
              'Sub-products lose individual identity',
              '"Dex Retail" is two words, less punchy than "Dash"',
              'If Dex stumbles, everything stumbles',
              'Harder to position different products to different audiences',
            ]}
          />

          <DexApproachCard
            t={t}
            title="Dex as Agent Only"
            subtitle="Approach B"
            names={['Dash', 'Dex', 'Deal', 'Dose']}
            description={
              'Dex is specifically the AI agent/copilot -- the most personal, most conversational product. ' +
              'Other products get their own distinct D-names. Dex stands out because it is the one you talk to.'
            }
            pros={[
              'Each product has a unique, memorable identity',
              '"Hey Dex" is specifically the agent -- clear mental model',
              'Dash, Deal, Dose each tell their own story',
              'One product failing does not taint the others',
            ]}
            cons={[
              'Four names to build brand awareness for (more expensive)',
              'Customers might not connect the D-family at first',
              'Marketing has to explain the system, not just one name',
              'Risk of naming fatigue with too many brands',
            ]}
          />
        </div>

        {/* Scenario comparison */}
        <Card t={t} style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            color: t.text,
            marginBottom: 20,
          }}>
            Scenario Comparison
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}>
            <div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.textFaint,
                marginBottom: 12,
              }}>
                Approach A: Dex Umbrella
              </div>
              <QuoteCard
                t={t}
                quote="Hey Dex, how are sales today?"
              />
              <QuoteCard
                t={t}
                quote="Open up Dex Retail and check the dashboard."
              />
              <QuoteCard
                t={t}
                quote="We just listed on Dex Connect."
              />
            </div>
            <div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.textFaint,
                marginBottom: 12,
              }}>
                Approach B: Dex Agent Only
              </div>
              <QuoteCard
                t={t}
                quote="Hey Dex, how are sales today?"
              />
              <QuoteCard
                t={t}
                quote="Pull up Dash and check the dashboard."
              />
              <QuoteCard
                t={t}
                quote="We just listed on Deal."
              />
            </div>
          </div>
        </Card>

        {/* Verdict */}
        <Card t={t} style={{
          border: `1px solid ${t.accentGreen}40`,
          background: `${t.accentGreen}06`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: t.accentGreen,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
            }}>
              B
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: t.text,
            }}>
              Recommendation: Dex as Agent Only (Approach B)
            </div>
          </div>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 15,
            color: t.textMuted,
            lineHeight: 1.7,
            margin: 0,
          }}>
            Dex is too good a name to dilute across sub-brands. When someone says "Hey Dex,"
            they should be talking to one thing: the AI agent. That specificity is what makes it powerful.
            Meanwhile, Dash, Deal, and Dose each stand on their own as short, punchy, memorable names
            that clearly signal what they do. The D-family connection handles brand cohesion.
            Dex gets to be the star. The others get to be sharp.
          </p>
        </Card>
      </div>

      {/* ============================================ */}
      {/* SECTION 6: The Winner */}
      {/* ============================================ */}
      <div style={{ padding: '60px 48px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          t={t}
          number="06"
          title="Final Recommendation"
          subtitle="After evaluating 40+ candidates, 10 suites, and 5 real-world tests -- here is the winning name system for Dutchie's AI product family."
        />

        {/* Dramatic reveal card */}
        <div style={{
          background: `linear-gradient(135deg, ${t.cardBg} 0%, ${t.accentGold}08 100%)`,
          border: `2px solid ${t.accentGold}50`,
          borderRadius: 24,
          padding: '64px 48px',
          textAlign: 'center',
          marginBottom: 48,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decorative element */}
          <div style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${t.accentGold}08 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${t.accentGreen}06 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: t.accentGold,
            marginBottom: 32,
            position: 'relative',
          }}>
            The Winner -- The Sharp Suite
          </div>

          {/* Large wordmarks */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
            marginBottom: 40,
            position: 'relative',
          }}>
            {[
              { name: 'Dash', role: 'retail', tagline: 'See everything.' },
              { name: 'Dex', role: 'agent', tagline: 'Ask anything.' },
              { name: 'Deal', role: 'b2b', tagline: 'Move everything.' },
              { name: 'Dose', role: 'consumer', tagline: 'Find your fit.' },
            ].map(({ name, role, tagline }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 72,
                  fontWeight: 900,
                  color: t.text,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {name}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: roleColors[role],
                  marginBottom: 6,
                }}>
                  {role === 'retail' ? 'Retail Platform' : role === 'agent' ? 'AI Agent' : role === 'b2b' ? 'B2B Marketplace' : 'Consumer'}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 16,
                  fontStyle: 'italic',
                  color: t.textMuted,
                }}>
                  {tagline}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            width: 80,
            height: 2,
            background: t.accentGold,
            margin: '0 auto 32px',
            borderRadius: 1,
          }} />

          {/* One-liner */}
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 24,
            fontWeight: 500,
            color: t.text,
            lineHeight: 1.5,
            maxWidth: 700,
            margin: '0 auto',
            position: 'relative',
          }}>
            Four products. Four syllables. One unmistakable brand family.
          </div>
        </div>

        {/* Product detail cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 48,
        }}>
          {/* Dash */}
          <Card t={t} style={{ borderTop: `3px solid ${roleColors.retail}` }}>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 36,
              fontWeight: 900,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}>
              Dash
            </div>
            <RoleBadge t={t} role="retail" />
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
              margin: '16px 0 0 0',
            }}>
              The intelligence dashboard for dispensary operators. Sales analytics,
              inventory forecasting, customer insights, and AI-driven recommendations --
              all at a glance. Dash is where you go to see the truth about your business.
            </p>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              color: t.textFaint,
              marginTop: 12,
              fontStyle: 'italic',
            }}>
              dash.dutchie.com
            </div>
          </Card>

          {/* Dex */}
          <Card t={t} style={{ borderTop: `3px solid ${roleColors.agent}` }}>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 36,
              fontWeight: 900,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}>
              Dex
            </div>
            <RoleBadge t={t} role="agent" />
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
              margin: '16px 0 0 0',
            }}>
              The AI copilot for dispensary staff. Budtenders ask Dex about product info.
              Managers ask Dex about performance. Everyone asks Dex because Dex always
              has the answer. Conversational, fast, and genuinely helpful.
            </p>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              color: t.textFaint,
              marginTop: 12,
              fontStyle: 'italic',
            }}>
              dex.dutchie.com
            </div>
          </Card>

          {/* Deal */}
          <Card t={t} style={{ borderTop: `3px solid ${roleColors.b2b}` }}>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 36,
              fontWeight: 900,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}>
              Deal
            </div>
            <RoleBadge t={t} role="b2b" />
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
              margin: '16px 0 0 0',
            }}>
              The B2B marketplace where brands and retailers do business. Product listings,
              wholesale ordering, promotional deals, and relationship management.
              Deal is where commerce happens. Replaces or evolves the existing "Connect" brand.
            </p>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              color: t.textFaint,
              marginTop: 12,
              fontStyle: 'italic',
            }}>
              deal.dutchie.com
            </div>
          </Card>

          {/* Dose */}
          <Card t={t} style={{ borderTop: `3px solid ${roleColors.consumer}` }}>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 36,
              fontWeight: 900,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}>
              Dose
            </div>
            <RoleBadge t={t} role="consumer" />
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
              margin: '16px 0 0 0',
            }}>
              AI-powered product discovery for end consumers. Personalized recommendations,
              strain matching, effect-based browsing, and curated collections.
              Dose helps every customer find exactly the right product for them.
            </p>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              color: t.textFaint,
              marginTop: 12,
              fontStyle: 'italic',
            }}>
              dose.dutchie.com
            </div>
          </Card>
        </div>

        {/* How they work together narrative */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 20,
          }}>
            How It All Fits Together
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
          }}>
            <div>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.8,
                margin: '0 0 16px 0',
              }}>
                A dispensary manager opens <strong style={{ color: t.text }}>Dash</strong> every
                morning to see overnight sales, check inventory levels, and review AI
                recommendations. When they need to dig deeper, they ask{' '}
                <strong style={{ color: t.text }}>Dex</strong>: "Hey Dex, why did flower sales
                drop last Tuesday?"
              </p>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}>
                Dex responds with analysis and suggests checking a new brand on{' '}
                <strong style={{ color: t.text }}>Deal</strong> that is trending in the region.
                The manager places a wholesale order right from Deal.
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.8,
                margin: '0 0 16px 0',
              }}>
                Meanwhile, a customer browses <strong style={{ color: t.text }}>Dose</strong> on
                their phone. They tell Dose they want something relaxing for sleep.
                Dose recommends three products available at their nearest dispensary, ranked
                by match quality and customer reviews.
              </p>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}>
                The budtender, guided by <strong style={{ color: t.text }}>Dex</strong>, confirms
                the recommendation and adds a terpene-matched edible to the order.
                Every product in the suite talked to every other. That is the power of a unified
                AI platform.
              </p>
            </div>
          </div>
        </Card>

        {/* Parent brand relationship */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 20,
          }}>
            Brand Architecture
          </div>

          {/* Hierarchy visualization */}
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            {/* Dutchie parent */}
            <div style={{
              display: 'inline-block',
              padding: '16px 40px',
              background: `${t.accentGold}12`,
              border: `2px solid ${t.accentGold}40`,
              borderRadius: 12,
              marginBottom: 24,
            }}>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 28,
                fontWeight: 900,
                color: t.text,
                letterSpacing: '-0.02em',
              }}>
                Dutchie
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                color: t.textMuted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Parent Brand
              </div>
            </div>

            {/* Connector line */}
            <div style={{
              width: 2,
              height: 24,
              background: t.border,
              margin: '0 auto',
            }} />

            {/* Dutchie AI */}
            <div style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              marginBottom: 24,
            }}>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: t.text,
              }}>
                Dutchie AI
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 11,
                color: t.textFaint,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Platform Umbrella
              </div>
            </div>

            {/* Connector lines */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 0,
              position: 'relative',
              height: 32,
              marginBottom: 0,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: 2,
                height: 16,
                background: t.border,
                transform: 'translateX(-1px)',
              }} />
              <div style={{
                position: 'absolute',
                top: 16,
                left: 'calc(50% - 300px)',
                width: 600,
                height: 2,
                background: t.border,
              }} />
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  top: 16,
                  left: `calc(50% - 300px + ${i * 200}px)`,
                  width: 2,
                  height: 16,
                  background: t.border,
                }} />
              ))}
            </div>

            {/* Product names */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}>
              {[
                { name: 'Dash', role: 'retail', desc: 'Intelligence' },
                { name: 'Dex', role: 'agent', desc: 'AI Agent' },
                { name: 'Deal', role: 'b2b', desc: 'Marketplace' },
                { name: 'Dose', role: 'consumer', desc: 'Discovery' },
              ].map(({ name, role, desc }) => (
                <div key={name} style={{
                  padding: '16px 28px',
                  background: `${roleColors[role]}10`,
                  border: `1px solid ${roleColors[role]}30`,
                  borderRadius: 10,
                  textAlign: 'center',
                  minWidth: 120,
                }}>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 24,
                    fontWeight: 800,
                    color: t.text,
                    letterSpacing: '-0.02em',
                  }}>
                    {name}
                  </div>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 11,
                    color: roleColors[role],
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Nav bar mockup */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 20,
          }}>
            Navigation Mockup
          </div>
          <div style={{
            background: theme === 'dark' ? '#0D0C0A' : '#F5F4F2',
            borderRadius: 12,
            padding: '0',
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
          }}>
            {/* Top nav */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderBottom: `1px solid ${t.border}`,
              gap: 32,
            }}>
              {/* Dutchie logo placeholder */}
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 18,
                fontWeight: 800,
                color: t.text,
                letterSpacing: '-0.02em',
                marginRight: 8,
              }}>
                dutchie
              </div>

              {/* Nav items */}
              {[
                { name: 'Dash', role: 'retail', active: true },
                { name: 'Dex', role: 'agent', active: false },
                { name: 'Deal', role: 'b2b', active: false },
                { name: 'Dose', role: 'consumer', active: false },
              ].map(({ name, role, active }) => (
                <div key={name} style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? t.text : t.textFaint,
                  padding: '8px 0',
                  borderBottom: active ? `2px solid ${roleColors[role]}` : '2px solid transparent',
                  cursor: 'pointer',
                }}>
                  {name}
                </div>
              ))}

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Profile placeholder */}
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: t.border,
              }} />
            </div>

            {/* Content area */}
            <div style={{
              padding: '32px 24px',
              minHeight: 120,
            }}>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 24,
                fontWeight: 800,
                color: t.text,
                marginBottom: 8,
              }}>
                Good morning, Sarah.
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                color: t.textMuted,
              }}>
                Your dispensary is up 12% this week. Dex flagged 3 items running low on stock.
              </div>
            </div>
          </div>
        </Card>

        {/* Marketing one-liner card */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 24,
          }}>
            Marketing Taglines
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                context: 'Platform hero line',
                line: 'Dash. Dex. Deal. Dose. The AI suite built for cannabis.',
              },
              {
                context: 'Dash launch',
                line: 'Dash by Dutchie -- See your dispensary like never before.',
              },
              {
                context: 'Dex launch',
                line: 'Meet Dex. Your AI-powered dispensary copilot.',
              },
              {
                context: 'Deal launch',
                line: 'Deal by Dutchie -- Where brands and retailers do business.',
              },
              {
                context: 'Dose launch',
                line: 'Dose -- Discover the perfect product, powered by AI.',
              },
              {
                context: 'Full platform',
                line: 'Dutchie AI. Four products. One platform. Every advantage.',
              },
            ].map(({ context, line }) => (
              <div key={context} style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 20,
                padding: '16px 20px',
                background: `${t.bg}`,
                borderRadius: 10,
                border: `1px solid ${t.border}`,
              }}>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: t.textFaint,
                  width: 140,
                  flexShrink: 0,
                }}>
                  {context}
                </span>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 17,
                  fontWeight: 600,
                  color: t.text,
                  lineHeight: 1.4,
                }}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Icon concepts mockup */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 24,
          }}>
            Icon Concepts
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
            padding: '24px 0',
          }}>
            {[
              { name: 'Dash', role: 'retail', icon: '\u2014', desc: 'Horizontal dash/bar' },
              { name: 'Dex', role: 'agent', icon: 'Dx', desc: 'Stylized Dx letterform' },
              { name: 'Deal', role: 'b2b', icon: '\u21C4', desc: 'Exchange arrows' },
              { name: 'Dose', role: 'consumer', icon: '\u25CE', desc: 'Target/bullseye' },
            ].map(({ name, role, icon, desc }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: `${roleColors[role]}18`,
                  border: `2px solid ${roleColors[role]}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 28,
                    fontWeight: 900,
                    color: roleColors[role],
                  }}>
                    {icon}
                  </span>
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: t.text,
                  marginBottom: 4,
                }}>
                  {name}
                </div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 12,
                  color: t.textFaint,
                }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Final quote */}
        <div style={{
          textAlign: 'center',
          padding: '48px 0 24px',
        }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 32,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.4,
            maxWidth: 800,
            margin: '0 auto 24px',
          }}>
            "Dash to see it. Dex to ask it.
            <br />
            Deal to move it. Dose to find it."
          </div>
          <div style={{
            width: 48,
            height: 3,
            background: t.accentGold,
            margin: '0 auto 24px',
            borderRadius: 2,
          }} />
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 16,
            color: t.textMuted,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto',
          }}>
            Four words. Four products. One platform. The D-suite by Dutchie
            turns a portfolio of AI tools into a brand family that is short, sharp,
            and impossible to forget.
          </div>
        </div>

        {/* Footer divider */}
        <div style={{
          height: 1,
          background: t.border,
          margin: '48px 0 32px',
        }} />

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 12,
            color: t.textFaint,
          }}>
            Dutchie Brand Strategy -- Suite Naming Deep Dive
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 12,
            color: t.textFaint,
          }}>
            Confidential
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuiteNamingDeepDive;
