import { useState } from 'react';

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
    accentGreen: '#047857',
  },
};

// ─── Shared sub-components ────────────────────────────────────────────

function SectionHeader({ number, title, thesis, t }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: t.accentGold,
            color: '#0A0908',
            fontWeight: 700,
            fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: t.text,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {title}
        </h2>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 16,
          fontStyle: 'italic',
          color: t.accentGold,
          paddingLeft: 50,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {thesis}
      </p>
    </div>
  );
}

function NarrativeBlock({ narrative, strengths, weaknesses, bestFor, t }) {
  const pillStyle = (color) => ({
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    marginRight: 6,
    marginBottom: 4,
    background: color + '18',
    color: color,
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        marginTop: 28,
      }}
    >
      <div
        style={{
          padding: 20,
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          gridColumn: '1 / -1',
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: t.textFaint,
            marginBottom: 8,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Sales Narrative
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: t.textMuted,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          "{narrative}"
        </p>
      </div>

      <div
        style={{
          padding: 20,
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: t.accentGreen,
            marginBottom: 10,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Strengths
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {strengths.map((s, i) => (
            <li
              key={i}
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: t.textMuted,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          padding: 20,
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: '#E05252',
            marginBottom: 10,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Weaknesses
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {weaknesses.map((w, i) => (
            <li
              key={i}
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: t.textMuted,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          padding: 16,
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          gridColumn: '1 / -1',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: t.textFaint,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            marginRight: 4,
          }}
        >
          Best For:
        </span>
        {bestFor.map((b, i) => (
          <span key={i} style={pillStyle(t.accentGold)}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductBlock({ label, items, t, style = {} }) {
  return (
    <div
      style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: '14px 16px',
        minWidth: 0,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: t.text,
          marginBottom: 6,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </div>
      {items && (
        <div
          style={{
            fontSize: 11,
            color: t.textFaint,
            lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {items.join(' · ')}
        </div>
      )}
    </div>
  );
}

function DexBlock({ label, t, style = {} }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${t.accentGold}22, ${t.accentGold}08)`,
        border: `2px solid ${t.accentGold}`,
        borderRadius: 10,
        padding: '14px 18px',
        textAlign: 'center',
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: t.accentGold,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label || 'Dex Intelligence'}
      </div>
    </div>
  );
}

function ConnectorLine({ t, vertical = false, style = {} }) {
  if (vertical) {
    return (
      <div
        style={{
          width: 2,
          height: 24,
          background: t.accentGold + '55',
          margin: '0 auto',
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        height: 2,
        flex: 1,
        background: t.accentGold + '55',
        alignSelf: 'center',
        ...style,
      }}
    />
  );
}

function ArrowDown({ t, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <div style={{ width: 2, height: 18, background: t.accentGold + '66' }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `8px solid ${t.accentGold}88`,
        }}
      />
    </div>
  );
}

function ArrowRight({ t, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <div style={{ height: 2, width: 24, background: t.accentGold + '66' }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: `8px solid ${t.accentGold}88`,
        }}
      />
    </div>
  );
}

// ─── Structure 1: AI is the Foundation ────────────────────────────────

function Structure1({ t }) {
  const products = [
    { label: 'E-Commerce', items: ['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk'] },
    { label: 'Loyalty + Marketing', items: ['Rewards', 'Profiles', 'Promotions', 'Engagement'] },
    { label: 'Retail', items: ['POS', 'Inventory', 'Compliance', 'Reporting', 'Staff'] },
    { label: 'Nexus', items: ['Data Platform', 'Integrations', 'API', 'Webhooks'] },
    { label: 'Connect', items: ['B2B Marketplace', 'Partners', 'Onboarding', 'Growth'] },
  ];

  return (
    <div>
      <SectionHeader
        number={1}
        title='"AI is the Foundation" — Inversion'
        thesis="You're not buying 5 products. You're buying one intelligent platform."
        t={t}
      />

      {/* Diagram */}
      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        {/* Dex Foundation at TOP */}
        <DexBlock
          label="Dex Intelligence — The Foundation"
          t={t}
          style={{
            padding: '22px 24px',
            borderRadius: 12,
            marginBottom: 0,
          }}
        />

        {/* Upward connectors */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 20px' }}>
          {products.map((_, i) => (
            <ArrowDown key={i} t={t} />
          ))}
        </div>

        {/* Product blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {products.map((p, i) => (
            <ProductBlock key={i} label={p.label} items={p.items} t={t} />
          ))}
        </div>

        {/* Capabilities ribbon */}
        <div
          style={{
            marginTop: 20,
            padding: '10px 16px',
            background: t.accentGold + '0A',
            border: `1px dashed ${t.accentGold}33`,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {['Agentic Commerce', 'Voice AI', 'Intelligent Summaries', 'AI Sales Assistant', 'Consumer Sentiment', 'Dutchie Agent'].map(
            (cap) => (
              <span
                key={cap}
                style={{
                  fontSize: 11,
                  color: t.accentGold,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {cap}
              </span>
            )
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Every product is powered by Dex. Intelligence flows up from the foundation.
        </div>
      </div>

      <NarrativeBlock
        narrative="Let me start with the most important thing about Dutchie — it's not five separate products. It's one intelligent platform. Dex Intelligence sits beneath everything you'll use, learning from every transaction, every customer interaction, every inventory movement across our entire network. When you turn on E-Commerce, it's already smart. When you launch Loyalty, it already knows your customers. That's because Dex has been watching, learning, and optimizing from day one."
        strengths={[
          'Immediately positions AI as core, not add-on — justifies premium pricing',
          'Creates psychological anchoring: every feature feels AI-powered',
          'Differentiates sharply from competitors who bolt AI on top',
          'Makes "intelligence" feel inevitable and embedded, not optional',
          'Strong for investors: shows platform vision, not feature soup',
        ]}
        weaknesses={[
          'Risks overselling Dex capabilities if AI features are still maturing',
          'May confuse buyers who just want a POS — feels abstract before seeing products',
          'If Dex goes down or underperforms, the entire positioning collapses',
          'Competitors can claim similar "AI-powered" language without substance',
        ]}
        bestFor={['Enterprise dispensary chains', 'Investor decks', 'Platform-oriented buyers', 'Strategic partnership pitches']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 2: Hub and Spokes ──────────────────────────────────────

function Structure2({ t }) {
  const spokes = [
    { label: 'E-Commerce', angle: -60, items: ['Menus', 'Marketplace', 'Payments'] },
    { label: 'Loyalty', angle: -20, items: ['Rewards', 'Profiles', 'Promotions'] },
    { label: 'Retail', angle: 20, items: ['POS', 'Inventory', 'Compliance'] },
    { label: 'Connect', angle: 60, items: ['B2B', 'Partners', 'Growth'] },
  ];

  return (
    <div>
      <SectionHeader
        number={2}
        title='"The Hub and Spokes" — Nexus-Centric'
        thesis="Nexus is the brain. Everything else is a limb."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        {/* Hub and spokes using flexbox */}
        <div style={{ position: 'relative', minHeight: 420 }}>
          {/* Center hub */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${t.accentGold}22, ${t.accentGold}08)`,
              border: `3px solid ${t.accentGold}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: t.accentGold,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Nexus
            </div>
            <div
              style={{
                fontSize: 11,
                color: t.accentGold,
                fontFamily: "'DM Sans', sans-serif",
                opacity: 0.7,
                marginTop: 2,
              }}
            >
              + Dex Intelligence
            </div>
            <div
              style={{
                width: 40,
                height: 2,
                background: t.accentGold + '44',
                margin: '8px 0',
                borderRadius: 1,
              }}
            />
            <div
              style={{
                fontSize: 10,
                color: t.textFaint,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'center',
                padding: '0 16px',
              }}
            >
              Data Platform · API · Integrations · Analytics
            </div>
          </div>

          {/* Spoke connections and product nodes */}
          {/* Top-left: E-Commerce */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              zIndex: 2,
            }}
          >
            <ProductBlock
              label="E-Commerce"
              items={['Menus', 'Marketplace', 'Payments', 'Checkout']}
              t={t}
              style={{ width: 170 }}
            />
          </div>
          {/* Connection line top-left */}
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 85,
              width: 100,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGold}55, ${t.accentGold}22)`,
              transform: 'rotate(30deg)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />

          {/* Top-right: Loyalty */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              zIndex: 2,
            }}
          >
            <ProductBlock
              label="Loyalty + Marketing"
              items={['Rewards', 'Profiles', 'Promotions']}
              t={t}
              style={{ width: 170 }}
            />
          </div>
          {/* Connection line top-right */}
          <div
            style={{
              position: 'absolute',
              right: 190,
              top: 85,
              width: 100,
              height: 2,
              background: `linear-gradient(270deg, ${t.accentGold}55, ${t.accentGold}22)`,
              transform: 'rotate(-30deg)',
              transformOrigin: 'right center',
              zIndex: 1,
            }}
          />

          {/* Bottom-left: Retail */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              zIndex: 2,
            }}
          >
            <ProductBlock
              label="Retail"
              items={['POS', 'Inventory', 'Compliance', 'Reporting']}
              t={t}
              style={{ width: 170 }}
            />
          </div>
          {/* Connection line bottom-left */}
          <div
            style={{
              position: 'absolute',
              left: 190,
              bottom: 85,
              width: 100,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGold}55, ${t.accentGold}22)`,
              transform: 'rotate(-30deg)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />

          {/* Bottom-right: Connect */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              bottom: 20,
              zIndex: 2,
            }}
          >
            <ProductBlock
              label="Connect"
              items={['B2B Marketplace', 'Partners', 'Growth']}
              t={t}
              style={{ width: 170 }}
            />
          </div>
          {/* Connection line bottom-right */}
          <div
            style={{
              position: 'absolute',
              right: 190,
              bottom: 85,
              width: 100,
              height: 2,
              background: `linear-gradient(270deg, ${t.accentGold}55, ${t.accentGold}22)`,
              transform: 'rotate(30deg)',
              transformOrigin: 'right center',
              zIndex: 1,
            }}
          />

          {/* Outer ring */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 340,
              height: 340,
              borderRadius: '50%',
              border: `1px dashed ${t.accentGold}22`,
              zIndex: 0,
            }}
          />
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Data flows inward to Nexus. Intelligence flows outward through Dex.
        </div>
      </div>

      <NarrativeBlock
        narrative="Think of Nexus as the nervous system of your dispensary operation. Every transaction from your POS, every click on your online menu, every loyalty interaction — it all flows into Nexus. And Dex, living inside Nexus, turns that data into intelligence that flows back out. Your E-Commerce menus automatically optimize. Your loyalty offers get smarter. Your B2B purchasing decisions improve. Nexus is the brain. Every other product is a limb that gets stronger because of it."
        strengths={[
          'Elevates Nexus (data platform) as the hero — great for data-driven buyers',
          'Natural upsell path: start with one spoke, the brain makes the others better',
          'Explains cross-product intelligence intuitively — data flows in, insights flow out',
          'Makes network effects tangible: more spokes = smarter brain',
          'Resonates with CTOs and technical decision-makers',
        ]}
        weaknesses={[
          'May overwhelm SMB buyers who just want POS + menus',
          'Nexus is Dutchie\'s least-understood product — risky to lead with it',
          'Downplays standalone product value: "You need the hub to get value from spokes"',
          'Could feel like vendor lock-in to skeptical buyers',
        ]}
        bestFor={['Multi-location operators', 'Technical buyers / CTOs', 'Data-driven organizations', 'Expansion-stage companies']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 3: The Customer Journey ────────────────────────────────

function Structure3({ t }) {
  const stages = [
    {
      stage: 'Discover',
      desc: 'Customer finds you',
      products: ['E-Commerce', 'Marketplace'],
      dex: 'AI-optimized menus & search ranking',
    },
    {
      stage: 'Engage',
      desc: 'Customer connects',
      products: ['Loyalty', 'Marketing'],
      dex: 'Personalized offers & messaging',
    },
    {
      stage: 'Transact',
      desc: 'Customer buys',
      products: ['Retail POS', 'Payments', 'Kiosk'],
      dex: 'Smart upsells & checkout optimization',
    },
    {
      stage: 'Optimize',
      desc: 'You improve operations',
      products: ['Nexus', 'Analytics', 'Compliance'],
      dex: 'Intelligent summaries & forecasting',
    },
    {
      stage: 'Grow',
      desc: 'You scale the business',
      products: ['Connect', 'B2B', 'Partners'],
      dex: 'Market intelligence & expansion signals',
    },
  ];

  return (
    <div>
      <SectionHeader
        number={3}
        title='"The Customer Journey" — Linear Flow'
        thesis="From first click to repeat customer, Dex guides the journey."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
          overflowX: 'auto',
        }}
      >
        {/* Dex throughline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 12,
            padding: '10px 16px',
            background: `linear-gradient(90deg, ${t.accentGold}18, ${t.accentGold}08, ${t.accentGold}18)`,
            borderRadius: 8,
            border: `1px solid ${t.accentGold}33`,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: t.accentGold,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
              marginRight: 12,
            }}
          >
            Dex Intelligence
          </span>
          <div
            style={{
              flex: 1,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGold}66, ${t.accentGold}22, ${t.accentGold}66)`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: t.accentGold,
              fontFamily: "'DM Sans', sans-serif",
              opacity: 0.6,
              whiteSpace: 'nowrap',
              marginLeft: 12,
            }}
          >
            Continuous intelligence across every stage
          </span>
        </div>

        {/* Vertical connectors from Dex to stages */}
        <div style={{ display: 'flex', gap: 12, padding: '0 8px' }}>
          {stages.map((_, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <ConnectorLine t={t} vertical style={{ height: 16 }} />
            </div>
          ))}
        </div>

        {/* Stage flow */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
          {stages.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div
                style={{
                  flex: 1,
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 10,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Stage number + name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: t.accentGold + '22',
                      color: t.accentGold,
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: t.text,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {s.stage}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: t.textFaint,
                    marginBottom: 12,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s.desc}
                </div>

                {/* Products */}
                <div style={{ marginBottom: 12 }}>
                  {s.products.map((p) => (
                    <div
                      key={p}
                      style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        background: t.border + '88',
                        borderRadius: 4,
                        fontSize: 11,
                        color: t.textMuted,
                        marginRight: 4,
                        marginBottom: 4,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>

                {/* Dex contribution */}
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '8px 10px',
                    background: t.accentGold + '0A',
                    borderRadius: 6,
                    border: `1px solid ${t.accentGold}22`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: t.accentGold,
                      fontWeight: 600,
                      marginBottom: 2,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Dex
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: t.accentGold,
                      opacity: 0.7,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {s.dex}
                  </div>
                </div>
              </div>

              {/* Arrow between stages */}
              {i < stages.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2px',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: `7px solid ${t.accentGold}44`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Customer lifecycle: left to right. Dex intelligence: top to bottom at every stage.
        </div>
      </div>

      <NarrativeBlock
        narrative="Let me walk you through what a customer's experience actually looks like. They discover you on the Dutchie marketplace — and Dex has already optimized your menu placement. They engage with personalized loyalty offers — Dex chose those offers based on their purchase patterns. They transact at your POS — Dex suggested the upsell. After the sale, you optimize your operations with AI-powered summaries and forecasts. And when you're ready to grow, Dex shows you exactly where your next opportunity is. The point? At every single stage, intelligence is working in the background."
        strengths={[
          'Tells a natural story — mirrors how dispensary operators actually think',
          'Shows Dex value at each stage, not just generically',
          'Easy for sales reps to walk through linearly in a meeting',
          'Customer-centric framing resonates with operators focused on experience',
          'Natural expansion path: "start with Transact, grow into Discover and Grow"',
        ]}
        weaknesses={[
          'Downplays Nexus and Connect which don\'t map cleanly to customer journey',
          'Linear framing oversimplifies — dispensary operations are not sequential',
          'Dex feels like a sidekick, not the hero — it\'s a throughline, not the star',
          'B2B (Connect) feels awkwardly shoehorned into a B2C customer journey',
        ]}
        bestFor={['Single-location dispensaries', 'Operators focused on customer experience', 'Sales reps who prefer storytelling', 'SMB audiences']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 4: Two Worlds, One Brain ───────────────────────────────

function Structure4({ t }) {
  return (
    <div>
      <SectionHeader
        number={4}
        title='"Two Worlds, One Brain" — B2C + B2B Split'
        thesis="Dex sees both sides of cannabis — retail AND wholesale."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'stretch' }}>
          {/* Left hemisphere: Consumer-facing */}
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: '12px 0 0 12px',
              padding: 28,
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: t.accentGreen,
                fontWeight: 700,
                marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Consumer World
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: t.text,
                marginBottom: 20,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              B2C
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProductBlock
                label="E-Commerce"
                items={['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk']}
                t={t}
              />
              <ProductBlock
                label="Loyalty + Marketing"
                items={['Rewards', 'Customer Profiles', 'Promotions', 'Engagement']}
                t={t}
              />
              <ProductBlock
                label="Retail"
                items={['POS', 'Inventory', 'Compliance', 'Reporting', 'Staff']}
                t={t}
              />
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 10,
                background: t.accentGreen + '0A',
                borderRadius: 6,
                border: `1px dashed ${t.accentGreen}33`,
                fontSize: 11,
                color: t.accentGreen,
                textAlign: 'center',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Consumer data: purchases, preferences, behavior, sentiment
            </div>
          </div>

          {/* Center: Dex bridge */}
          <div
            style={{
              width: 120,
              background: `linear-gradient(180deg, ${t.accentGold}18, ${t.accentGold}30, ${t.accentGold}18)`,
              borderTop: `1px solid ${t.accentGold}44`,
              borderBottom: `1px solid ${t.accentGold}44`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 12px',
              position: 'relative',
            }}
          >
            {/* Left-pointing arrows */}
            <div
              style={{
                position: 'absolute',
                left: -6,
                top: '30%',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `8px solid ${t.accentGold}55`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -6,
                top: '60%',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `8px solid ${t.accentGold}55`,
              }}
            />
            {/* Right-pointing arrows */}
            <div
              style={{
                position: 'absolute',
                right: -6,
                top: '40%',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `8px solid ${t.accentGold}55`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -6,
                top: '70%',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `8px solid ${t.accentGold}55`,
              }}
            />

            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: t.accentGold,
                fontFamily: "'DM Sans', sans-serif",
                writingMode: 'vertical-lr',
                textOrientation: 'mixed',
                letterSpacing: 4,
                marginBottom: 12,
              }}
            >
              DEX
            </div>
            <div
              style={{
                width: 2,
                height: 30,
                background: t.accentGold + '44',
                margin: '4px 0',
              }}
            />
            <div
              style={{
                fontSize: 10,
                color: t.accentGold,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'center',
                lineHeight: 1.4,
                opacity: 0.7,
              }}
            >
              Intelligence Bridge
            </div>
          </div>

          {/* Right hemisphere: Business-facing */}
          <div
            style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: '0 12px 12px 0',
              padding: 28,
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: t.accentGold,
                fontWeight: 700,
                marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Business World
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: t.text,
                marginBottom: 20,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              B2B
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProductBlock
                label="Connect"
                items={['B2B Marketplace', 'Partner Network', 'Onboarding', 'Growth Tools']}
                t={t}
              />
              <ProductBlock
                label="Nexus"
                items={['Data Platform', 'Integrations', 'API Access', 'Webhooks']}
                t={t}
              />
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 10,
                background: t.accentGold + '0A',
                borderRadius: 6,
                border: `1px dashed ${t.accentGold}33`,
                fontSize: 11,
                color: t.accentGold,
                textAlign: 'center',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Business data: supply chain, pricing, market trends, partner performance
            </div>

            <div
              style={{
                marginTop: 12,
                padding: 12,
                background: t.bg,
                borderRadius: 8,
                border: `1px solid ${t.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.textFaint,
                  marginBottom: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Dex B2B Capabilities
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {['Market Intelligence', 'Pricing Optimization', 'Demand Forecasting', 'Partner Matching'].map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: 10,
                      padding: '2px 7px',
                      borderRadius: 3,
                      background: t.accentGold + '15',
                      color: t.accentGold,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Consumer intelligence on the left. Business intelligence on the right. Dex bridges both.
        </div>
      </div>

      <NarrativeBlock
        narrative="Cannabis operates in two worlds simultaneously. There's the consumer world — your customers browsing menus, earning loyalty points, buying at the register. And there's the business world — your brands, distributors, purchasing, and supply chain. Most platforms serve one side. Dutchie serves both. And here's what makes us different: Dex sits in the middle, connecting these worlds. When consumer demand shifts, your B2B purchasing adjusts automatically. When new products come in from brands, your consumer menus optimize instantly. One brain, two worlds."
        strengths={[
          'Uniquely positions Dutchie as full-stack (B2C + B2B) — few competitors can claim this',
          'Makes Dex\'s cross-platform intelligence tangible and valuable',
          'Creates natural story arc: "We connect two worlds most vendors only see one of"',
          'Easy visual — hemispheres are intuitive and memorable',
          'Strong differentiation against pure-play POS or pure-play marketplace competitors',
        ]}
        weaknesses={[
          'Oversimplifies — Retail/POS is both B2C and operational/B2B',
          'Connect and Nexus may feel like afterthoughts with fewer visual blocks',
          'Asymmetric: 3 consumer products vs 2 business products creates visual imbalance',
          'May not resonate with single-location operators who don\'t think in B2B terms',
        ]}
        bestFor={['MSOs (multi-state operators)', 'Vertically integrated companies', 'Strategic buyers evaluating full-stack platforms', 'Board/investor presentations']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 5: The Stack ───────────────────────────────────────────

function Structure5({ t }) {
  const layers = [
    {
      name: 'Intelligence Layer',
      color: t.accentGold,
      items: ['Dex AI Engine', 'Agentic Commerce', 'Voice AI', 'Intelligent Summaries', 'Consumer Sentiment', 'Dutchie Agent'],
      desc: 'AI capabilities that make every layer smarter',
    },
    {
      name: 'Application Layer',
      color: t.accentGreen,
      items: ['POS', 'Online Menus', 'Loyalty + Rewards', 'Marketing Campaigns', 'Kiosk', 'B2B Marketplace'],
      desc: 'The products dispensaries and brands interact with daily',
    },
    {
      name: 'Platform Layer',
      color: '#5B8DEF',
      items: ['Nexus Data Platform', 'API Access', 'Webhooks', 'Integrations Hub', 'Analytics Engine'],
      desc: 'Data infrastructure connecting everything',
    },
    {
      name: 'Foundation Layer',
      color: t.textMuted,
      items: ['Compliance Engine', 'State Regulations', 'Seed-to-Sale Tracking', 'Tax Calculation', 'Reporting'],
      desc: 'Cannabis-specific regulatory and compliance infrastructure',
    },
  ];

  return (
    <div>
      <SectionHeader
        number={5}
        title='"The Stack" — Technical / Platform View'
        thesis="A complete technology stack for cannabis, with intelligence at every layer."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {layers.map((layer, i) => (
            <div key={i}>
              <div
                style={{
                  background: layer.color + '0C',
                  border: `1px solid ${layer.color}33`,
                  borderRadius: i === 0 ? '12px 12px 4px 4px' : i === layers.length - 1 ? '4px 4px 12px 12px' : 4,
                  padding: '20px 24px',
                  position: 'relative',
                }}
              >
                {/* Layer label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: layer.color,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {layer.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.textFaint,
                        marginTop: 2,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {layer.desc}
                    </div>
                  </div>
                  {i === 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        padding: '3px 8px',
                        borderRadius: 4,
                        background: t.accentGold + '22',
                        color: t.accentGold,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Dex-Powered
                    </span>
                  )}
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: '8px 14px',
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                        borderRadius: 6,
                        fontSize: 12,
                        color: t.textMuted,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Vertical connection indicator on left */}
                {i < layers.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 40,
                      bottom: -8,
                      width: 2,
                      height: 12,
                      background: layer.color + '44',
                      zIndex: 1,
                    }}
                  />
                )}
                {i < layers.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 40,
                      bottom: -8,
                      width: 2,
                      height: 12,
                      background: layer.color + '44',
                      zIndex: 1,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Intelligence permeation indicator */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            background: t.accentGold + '08',
            borderRadius: 8,
            border: `1px dashed ${t.accentGold}22`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.accentGold,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            Intelligence permeates down
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `6px solid ${t.accentGold}${['66', '44', '22'][i]}`,
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1, height: 1, background: t.accentGold + '22' }} />
          <div
            style={{
              fontSize: 11,
              color: t.textFaint,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            Data flows up
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: `6px solid ${t.textFaint}${['66', '44', '22'][i]}`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Like AWS for cannabis: compliance at the base, intelligence at the top, applications in between.
        </div>
      </div>

      <NarrativeBlock
        narrative="Think of Dutchie like the AWS of cannabis. At the foundation, we handle the hardest problem in the industry: compliance. Every state regulation, every seed-to-sale requirement, every tax calculation — it's all built in. On top of that sits our data platform, Nexus, connecting everything through APIs and integrations. Then come the applications — your POS, menus, loyalty, marketplace — the tools your team and customers actually touch. And at the top? Dex Intelligence. It reaches down into every layer, making your compliance smarter, your data more actionable, and your applications more intelligent."
        strengths={[
          'Speaks fluently to technical buyers — feels like a real platform architecture',
          'Compliance at the foundation is a STRONG cannabis-specific differentiator',
          'Layers create natural conversation about what comes first vs. what builds on top',
          'Positions Dutchie as infrastructure, not just apps — higher perceived value',
          'Dex at the top feels like the "crown" — premium positioning without being the foundation',
        ]}
        weaknesses={[
          'Too technical for non-technical buyers — dispensary managers may glaze over',
          'Stack metaphor implies you need all layers — bad for point-product sales',
          'Compliance and data platform are less "sexy" than AI and consumer features',
          'May make Dutchie feel complex and heavy when buyers want simple',
        ]}
        bestFor={['CTO / IT decision-makers', 'Enterprise evaluations', 'Platform comparison discussions', 'Technical due diligence']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 6: Outcomes, Not Products ──────────────────────────────

function Structure6({ t }) {
  const outcomes = [
    {
      outcome: 'Increase Revenue',
      metric: '+23% avg order value',
      products: ['E-Commerce', 'Loyalty', 'Dex Upsells'],
      icon: '$',
    },
    {
      outcome: 'Reduce Compliance Risk',
      metric: '99.8% audit pass rate',
      products: ['Retail POS', 'Nexus Reporting', 'Dex Monitoring'],
      icon: '\u2713',
    },
    {
      outcome: 'Grow Customer Base',
      metric: '+31% repeat customers',
      products: ['Marketplace', 'Loyalty', 'Dex Personalization'],
      icon: '\u2191',
    },
    {
      outcome: 'Streamline Operations',
      metric: '12 hrs/week saved',
      products: ['Retail', 'Nexus', 'Dex Summaries'],
      icon: '\u23F1',
    },
    {
      outcome: 'Expand Market Reach',
      metric: '3x brand partnerships',
      products: ['Connect', 'Nexus API', 'Dex Market Intel'],
      icon: '\u21C4',
    },
  ];

  return (
    <div>
      <SectionHeader
        number={6}
        title='"Outcomes, Not Products" — Results-First'
        thesis="Here's what you get. Here's how we do it."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        {/* Main outcomes grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
        >
          {outcomes.map((o, i) => (
            <div
              key={i}
              style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: t.accentGold + '18',
                  border: `2px solid ${t.accentGold}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: t.accentGold,
                  marginBottom: 14,
                }}
              >
                {o.icon}
              </div>

              {/* Outcome name */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.text,
                  marginBottom: 6,
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.3,
                }}
              >
                {o.outcome}
              </div>

              {/* Metric */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.accentGreen,
                  marginBottom: 14,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {o.metric}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '60%',
                  height: 1,
                  background: t.border,
                  marginBottom: 14,
                }}
              />

              {/* Enabling products */}
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color: t.textFaint,
                  marginBottom: 8,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Powered By
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                {o.products.map((p) => (
                  <div
                    key={p}
                    style={{
                      padding: '4px 8px',
                      background: p.startsWith('Dex') ? t.accentGold + '12' : t.bg,
                      borderRadius: 4,
                      fontSize: 11,
                      color: p.startsWith('Dex') ? t.accentGold : t.textMuted,
                      fontWeight: p.startsWith('Dex') ? 600 : 400,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dex callout */}
        <div
          style={{
            marginTop: 24,
            padding: '16px 24px',
            background: t.accentGold + '0A',
            border: `1px solid ${t.accentGold}22`,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: t.accentGold,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            Dex amplifies every outcome
          </div>
          <div style={{ flex: 1, height: 1, background: t.accentGold + '22' }} />
          <div
            style={{
              fontSize: 12,
              color: t.textFaint,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            AI appears in every column — not as a product, but as an accelerant
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Lead with outcomes. Products are proof points, not the headline.
        </div>
      </div>

      <NarrativeBlock
        narrative="Let me skip the product demo and talk about what you actually care about. You want to increase revenue — we've seen a 23% lift in average order value for dispensaries using our platform. You want to eliminate compliance risk — our customers pass audits at 99.8%. You want more repeat customers — our loyalty plus Dex personalization drives 31% more return visits. Notice I haven't even told you what product does what yet. Because honestly? You don't care about our product names. You care about results. Every outcome here is powered by a combination of our products and Dex intelligence."
        strengths={[
          'Most buyer-centric framing — leads with what matters to the customer',
          'Dex appears naturally in every outcome, not as a separate line item',
          'Metrics and ROI make the conversation immediately concrete',
          'Avoids product comparison trap — competitors can\'t easily counter "results"',
          'Perfect for executive presentations — CEOs/CFOs think in outcomes, not features',
        ]}
        weaknesses={[
          'Metrics must be defensible — fake numbers backfire catastrophically',
          'Makes it hard for buyers to understand what they\'re actually purchasing',
          'Procurement teams need product SKUs and line items, not outcomes',
          'If a buyer only needs one outcome, the other four feel like bloat',
          'Follow-up slides still need traditional product architecture',
        ]}
        bestFor={['Executive/C-suite presentations', 'CFO-involved buying processes', 'ROI-focused evaluations', 'Initial pitch decks (top of funnel)']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 7: The Ecosystem Map ───────────────────────────────────

function Structure7({ t }) {
  return (
    <div>
      <SectionHeader
        number={7}
        title='"The Ecosystem Map" — Network View'
        thesis="Dutchie connects every player in cannabis. Dex makes every connection smarter."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        <div style={{ position: 'relative', minHeight: 460 }}>
          {/* Consumer node — top left */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              width: 160,
              padding: 16,
              background: t.cardBg,
              border: `2px solid ${t.accentGreen}55`,
              borderRadius: 12,
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>&#x1F6D2;</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>
              Consumers
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              Browse, order, pick up, get rewards
            </div>
          </div>

          {/* Dispensary node — top right */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              width: 160,
              padding: 16,
              background: t.cardBg,
              border: `2px solid ${t.accentGreen}55`,
              borderRadius: 12,
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>&#x1F3EA;</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>
              Dispensaries
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              Sell, manage inventory, stay compliant
            </div>
          </div>

          {/* Brands node — bottom left */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              width: 160,
              padding: 16,
              background: t.cardBg,
              border: `2px solid ${t.accentGold}55`,
              borderRadius: 12,
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>&#x1F3F7;</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>
              Brands
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              Launch products, track performance
            </div>
          </div>

          {/* Distributors node — bottom right */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              bottom: 20,
              width: 160,
              padding: 16,
              background: t.cardBg,
              border: `2px solid ${t.accentGold}55`,
              borderRadius: 12,
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>&#x1F69A;</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>
              Distributors
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              Fulfill orders, manage logistics
            </div>
          </div>

          {/* Center Dex hub */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${t.accentGold}20, ${t.accentGold}05)`,
              border: `3px solid ${t.accentGold}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: t.accentGold, fontFamily: "'DM Sans', sans-serif" }}>
              Dex
            </div>
            <div style={{ fontSize: 10, color: t.accentGold, fontFamily: "'DM Sans', sans-serif", opacity: 0.7 }}>
              Intelligence Hub
            </div>
          </div>

          {/* Connection lines using absolute positioned divs */}
          {/* Top-left to center */}
          <div
            style={{
              position: 'absolute',
              left: 180,
              top: 80,
              width: 120,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGreen}44, ${t.accentGold}44)`,
              transform: 'rotate(35deg)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />
          {/* Product label on connection */}
          <div
            style={{
              position: 'absolute',
              left: 200,
              top: 110,
              zIndex: 4,
              padding: '3px 8px',
              background: t.bg,
              border: `1px solid ${t.accentGreen}33`,
              borderRadius: 4,
              fontSize: 10,
              color: t.accentGreen,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            E-Commerce + Loyalty
          </div>

          {/* Top-right to center */}
          <div
            style={{
              position: 'absolute',
              right: 180,
              top: 80,
              width: 120,
              height: 2,
              background: `linear-gradient(270deg, ${t.accentGreen}44, ${t.accentGold}44)`,
              transform: 'rotate(-35deg)',
              transformOrigin: 'right center',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 200,
              top: 110,
              zIndex: 4,
              padding: '3px 8px',
              background: t.bg,
              border: `1px solid ${t.accentGreen}33`,
              borderRadius: 4,
              fontSize: 10,
              color: t.accentGreen,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Retail + Nexus
          </div>

          {/* Bottom-left to center */}
          <div
            style={{
              position: 'absolute',
              left: 180,
              bottom: 80,
              width: 120,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGold}44, ${t.accentGold}44)`,
              transform: 'rotate(-35deg)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 200,
              bottom: 110,
              zIndex: 4,
              padding: '3px 8px',
              background: t.bg,
              border: `1px solid ${t.accentGold}33`,
              borderRadius: 4,
              fontSize: 10,
              color: t.accentGold,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Connect
          </div>

          {/* Bottom-right to center */}
          <div
            style={{
              position: 'absolute',
              right: 180,
              bottom: 80,
              width: 120,
              height: 2,
              background: `linear-gradient(270deg, ${t.accentGold}44, ${t.accentGold}44)`,
              transform: 'rotate(35deg)',
              transformOrigin: 'right center',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 200,
              bottom: 110,
              zIndex: 4,
              padding: '3px 8px',
              background: t.bg,
              border: `1px solid ${t.accentGold}33`,
              borderRadius: 4,
              fontSize: 10,
              color: t.accentGold,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Connect + Nexus API
          </div>

          {/* Horizontal connection: Consumer ↔ Dispensary */}
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 45,
              right: 190,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGreen}33, transparent, ${t.accentGreen}33)`,
              zIndex: 0,
            }}
          />

          {/* Horizontal connection: Brands ↔ Distributors */}
          <div
            style={{
              position: 'absolute',
              left: 190,
              bottom: 45,
              right: 190,
              height: 2,
              background: `linear-gradient(90deg, ${t.accentGold}33, transparent, ${t.accentGold}33)`,
              zIndex: 0,
            }}
          />

          {/* Vertical connections */}
          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 100,
              bottom: 100,
              width: 2,
              background: `linear-gradient(180deg, ${t.accentGreen}33, transparent, ${t.accentGold}33)`,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 95,
              top: 100,
              bottom: 100,
              width: 2,
              background: `linear-gradient(180deg, ${t.accentGreen}33, transparent, ${t.accentGold}33)`,
              zIndex: 0,
            }}
          />
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Every connection point is a Dutchie product. Dex is the intelligence flowing through every connection.
        </div>
      </div>

      <NarrativeBlock
        narrative="The cannabis industry isn't one business — it's an ecosystem. Consumers discover and buy from dispensaries. Dispensaries order from brands. Brands ship through distributors. And right now, most of these connections are manual, fragmented, and blind. Dutchie sits at every connection point. Our E-Commerce and Loyalty products connect consumers to dispensaries. Our Retail products run the dispensary. Connect links dispensaries to brands and distributors. And Dex? Dex is the intelligence flowing through every single one of these connections. When consumer demand shifts, Dex tells dispensaries to reorder. When a brand launches a product, Dex knows which dispensaries should carry it."
        strengths={[
          'Paints the biggest possible picture — Dutchie as the industry operating system',
          'Makes network effects visceral: more connections = more intelligence',
          'Strong for investors who want to see TAM and market position',
          'Products feel natural at connection points rather than arbitrary categories',
          'Dex as "flowing intelligence" is a powerful metaphor',
        ]}
        weaknesses={[
          'May feel too ambitious for a single dispensary looking for a POS',
          'Hard to simplify — the network is complex and hard to absorb quickly',
          'Claims of connecting the "whole ecosystem" are easy for competitors to challenge',
          'Where does a buyer start? No clear entry point in a network diagram',
        ]}
        bestFor={['Investor presentations', 'Industry conferences and keynotes', 'Strategic partnership discussions', 'Market positioning / analyst briefings']}
        t={t}
      />
    </div>
  );
}

// ─── Structure 8: Before / After Dex ──────────────────────────────────

function Structure8({ t }) {
  const comparisons = [
    {
      area: 'Online Ordering',
      before: 'Static menu, no personalization, manual updates',
      after: 'AI-optimized menus, personalized recommendations, auto-updated inventory',
      product: 'E-Commerce + Dex',
    },
    {
      area: 'Customer Loyalty',
      before: 'Generic points program, mass emails, low engagement',
      after: 'Individualized rewards, predictive offers, 3x engagement',
      product: 'Loyalty + Dex',
    },
    {
      area: 'Point of Sale',
      before: 'Manual upsells, slow checkout, paper compliance',
      after: 'Smart upsell suggestions, 30s checkout, automated compliance',
      product: 'Retail + Dex',
    },
    {
      area: 'Business Intelligence',
      before: 'Spreadsheets, weekly reports, backward-looking',
      after: 'Real-time dashboards, predictive forecasting, instant summaries',
      product: 'Nexus + Dex',
    },
    {
      area: 'Purchasing & Supply',
      before: 'Phone calls to reps, guessing demand, stockouts',
      after: 'AI-powered reordering, demand forecasting, automated procurement',
      product: 'Connect + Dex',
    },
  ];

  return (
    <div>
      <SectionHeader
        number={8}
        title='"Before Dex / After Dex" — Transformation'
        thesis="This is your dispensary today. This is your dispensary with Dex."
        t={t}
      />

      <div
        style={{
          padding: 40,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          minWidth: 600,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 40px 1fr',
            gap: 0,
            marginBottom: 16,
            padding: '0 4px',
          }}
        >
          <div />
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#E05252',
              textAlign: 'center',
              padding: '10px 0',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Before Dex
          </div>
          <div />
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: t.accentGreen,
              textAlign: 'center',
              padding: '10px 0',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            After Dex
          </div>
        </div>

        {/* Comparison rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {comparisons.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 40px 1fr',
                gap: 0,
                alignItems: 'stretch',
              }}
            >
              {/* Area label */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingRight: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.text,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {c.area}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: t.accentGold,
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 2,
                  }}
                >
                  {c.product}
                </div>
              </div>

              {/* Before */}
              <div
                style={{
                  background: '#E05252' + '08',
                  border: `1px solid #E0525222`,
                  borderRadius: 8,
                  padding: '12px 16px',
                  fontSize: 12,
                  color: t.textMuted,
                  lineHeight: 1.5,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {c.before}
              </div>

              {/* Arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 10, height: 2, background: t.accentGold + '55' }} />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: `7px solid ${t.accentGold}88`,
                    }}
                  />
                </div>
              </div>

              {/* After */}
              <div
                style={{
                  background: t.accentGreen + '08',
                  border: `1px solid ${t.accentGreen}22`,
                  borderRadius: 8,
                  padding: '12px 16px',
                  fontSize: 12,
                  color: t.textMuted,
                  lineHeight: 1.5,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {c.after}
              </div>
            </div>
          ))}
        </div>

        {/* Summary transformation bar */}
        <div
          style={{
            marginTop: 28,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              background: '#E05252' + '08',
              border: `1px solid #E0525222`,
              borderRadius: 10,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: '#E05252', fontFamily: "'DM Sans', sans-serif" }}>
              Fragmented. Manual. Reactive.
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              5+ disconnected tools, constant firefighting
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 20, height: 2, background: t.accentGold + '55' }} />
            <div
              style={{
                padding: '6px 12px',
                background: t.accentGold + '18',
                border: `2px solid ${t.accentGold}`,
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                color: t.accentGold,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              + Dex
            </div>
            <div style={{ width: 20, height: 2, background: t.accentGold + '55' }} />
          </div>

          <div
            style={{
              padding: '14px 18px',
              background: t.accentGreen + '08',
              border: `1px solid ${t.accentGreen}22`,
              borderRadius: 10,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGreen, fontFamily: "'DM Sans', sans-serif" }}>
              Integrated. Intelligent. Proactive.
            </div>
            <div style={{ fontSize: 11, color: t.textFaint, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              One platform, AI handling the complexity
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            color: t.textFaint,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Pain on the left. Transformation on the right. Dex is the catalyst.
        </div>
      </div>

      <NarrativeBlock
        narrative="Let me show you something. On the left is what most dispensaries look like today. Static menus nobody updates. Generic loyalty programs nobody uses. Budtenders guessing at upsells. Weekly spreadsheet reports that are already stale. Calling reps to place orders based on gut feel. On the right is the same dispensary — same team, same location — but with Dex. Your menus personalize themselves. Your loyalty offers adapt to each customer. Your POS suggests the right upsell at the right moment. Your reports write themselves. Your purchasing happens automatically based on real demand signals. Same dispensary. Completely different outcome."
        strengths={[
          'Most emotionally resonant — buyers see themselves in the "before" column',
          'Makes Dex the transformation catalyst — hero positioning',
          'Concrete and specific — not abstract platform architecture',
          'Works brilliantly as a live demo setup: "Let me show you the before and after"',
          'Easy for any audience to understand — no technical knowledge needed',
          'Naturally sets up competitive takeaway: "This is your current vendor vs. us"',
        ]}
        weaknesses={[
          'Risks insulting buyers whose current setup they\'re calling "fragmented"',
          'Binary framing oversimplifies — transformation is gradual, not instant',
          'Requires confidence in AI delivery — after column sets high expectations',
          'Doesn\'t clearly show the 5 product categories — transformation is the focus',
        ]}
        bestFor={['First-call sales presentations', 'Competitive displacement deals', 'Demo setup slides', 'Any audience (universal appeal)']}
        t={t}
      />
    </div>
  );
}

// ─── Recommendation Section ───────────────────────────────────────────

function RecommendationSection({ t }) {
  const rankings = [
    {
      rank: 1,
      name: 'Before Dex / After Dex',
      number: 8,
      why: 'Universal appeal. Every buyer sees themselves in the "before" column. Dex becomes the transformation hero naturally. Best opening slide for any audience. Pair with Structure 6 (Outcomes) for a devastatingly effective one-two punch.',
      use: 'Opening slide in any sales presentation',
    },
    {
      rank: 2,
      name: 'Outcomes, Not Products',
      number: 6,
      why: 'Buyers care about results, not your org chart. Leading with outcomes positions Dex as an embedded accelerant rather than a bolt-on. Pairs perfectly with Before/After as a follow-up: "Here are the results, here\'s the proof."',
      use: 'Second or third slide after Before/After opener',
    },
    {
      rank: 3,
      name: 'AI is the Foundation',
      number: 1,
      why: 'The strongest structural argument for AI centrality. Every product feels intelligent by default. Best for enterprise buyers and investors who need to understand the platform thesis, not just the features.',
      use: 'Enterprise and investor presentations',
    },
    {
      rank: 4,
      name: 'The Customer Journey',
      number: 3,
      why: 'Best narrative flow for live presentations. Sales reps can walk through it naturally. Dex at every stage is intuitive. Weakness: B2B products feel shoehorned in.',
      use: 'SMB sales presentations, customer experience-focused buyers',
    },
    {
      rank: 5,
      name: 'Two Worlds, One Brain',
      number: 4,
      why: 'Unique differentiator for Dutchie — few competitors can claim B2C+B2B. Best for MSOs and vertically integrated operators who actually live in both worlds.',
      use: 'Multi-state operator pitches, vertical integration discussions',
    },
    {
      rank: 6,
      name: 'The Stack',
      number: 5,
      why: 'Perfect for technical evaluations where the CTO needs to see the architecture. Compliance as the foundation is a killer differentiator in cannabis. Dex at the top is elegant.',
      use: 'Technical due diligence, CTO/IT presentations',
    },
    {
      rank: 7,
      name: 'Hub and Spokes',
      number: 2,
      why: 'Elegant concept but risks leading with Nexus, which is the least understood product. Better as a supplementary slide than the main architecture. Strong when the buyer already knows Nexus.',
      use: 'Existing Nexus customer upsell, data-first buyers',
    },
    {
      rank: 8,
      name: 'The Ecosystem Map',
      number: 7,
      why: 'Most ambitious framing — great for vision and investor narrative. But too complex for a sales call. Operators don\'t think about the whole ecosystem; they think about their store. Save for keynotes.',
      use: 'Conference keynotes, investor decks, analyst briefings',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            color: t.accentGold,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 8,
          }}
        >
          Strategic Recommendation
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: t.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          The right structure depends on the audience. But if forced to choose one default, the answer is clear:
          use <strong style={{ color: t.accentGold }}>Before/After</strong> as your opener
          and <strong style={{ color: t.accentGold }}>Outcomes</strong> as your follow-up.
          Then choose a third structure based on the buyer profile.
        </p>
      </div>

      {/* The "Deck Stack" recommendation */}
      <div
        style={{
          padding: 28,
          background: t.cardBg,
          border: `2px solid ${t.accentGold}44`,
          borderRadius: 12,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: t.accentGold,
            fontWeight: 700,
            marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Recommended Slide Sequence
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Slide 1', desc: 'Before / After Dex', color: t.accentGold },
            { label: 'Slide 2', desc: 'Outcomes, Not Products', color: t.accentGold },
            { label: 'Slide 3', desc: '(Audience-dependent)', color: t.textFaint },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  padding: '12px 20px',
                  background: s.color + '12',
                  border: `1px solid ${s.color}33`,
                  borderRadius: 10,
                  textAlign: 'center',
                  minWidth: 140,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: s.color,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 4,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.text,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s.desc}
                </div>
              </div>
              {i < 2 && <ArrowRight t={t} />}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div
            style={{
              padding: '10px 14px',
              background: t.bg,
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              fontSize: 12,
              color: t.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <strong style={{ color: t.text }}>Enterprise / CTO:</strong>
            <br />
            Use The Stack (#5)
          </div>
          <div
            style={{
              padding: '10px 14px',
              background: t.bg,
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              fontSize: 12,
              color: t.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <strong style={{ color: t.text }}>Investor / Board:</strong>
            <br />
            Use AI Foundation (#1)
          </div>
          <div
            style={{
              padding: '10px 14px',
              background: t.bg,
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              fontSize: 12,
              color: t.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <strong style={{ color: t.text }}>SMB / Operator:</strong>
            <br />
            Use Customer Journey (#3)
          </div>
        </div>
      </div>

      {/* Detailed rankings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rankings.map((r) => (
          <div
            key={r.rank}
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr',
              gap: 16,
              padding: '16px 20px',
              background: r.rank <= 2 ? t.accentGold + '06' : t.cardBg,
              border: `1px solid ${r.rank <= 2 ? t.accentGold + '33' : t.border}`,
              borderRadius: 10,
              alignItems: 'start',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 8,
                background: r.rank <= 2 ? t.accentGold + '22' : t.border + '44',
                color: r.rank <= 2 ? t.accentGold : t.textFaint,
                fontSize: 18,
                fontWeight: 800,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              #{r.rank}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: t.text,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: t.border + '66',
                    color: t.textFaint,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Structure #{r.number}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: t.textMuted,
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 6,
                }}
              >
                {r.why}
              </p>
              <div
                style={{
                  fontSize: 11,
                  color: t.accentGold,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Best used as: {r.use}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final insight */}
      <div
        style={{
          marginTop: 32,
          padding: '24px 28px',
          background: `linear-gradient(135deg, ${t.accentGold}0A, ${t.accentGold}05)`,
          border: `1px solid ${t.accentGold}22`,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: t.accentGold,
            marginBottom: 10,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          The Deeper Insight
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.7,
            color: t.textMuted,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          The current 5-column + AI bar structure treats products as equals and AI as an afterthought.
          But the real problem isn't where AI sits in the layout — it's that the structure doesn't tell a story.
          Five equal columns say "here's what we sell." A transformation narrative says "here's how we change your business."
          The best deck structures don't just reorganize the same boxes. They change the conversation from
          <strong style={{ color: t.text }}> "what do you sell?" </strong>
          to
          <strong style={{ color: t.accentGold }}> "what will my business look like with Dex?"</strong>
        </p>
        <p
          style={{
            margin: '12px 0 0',
            fontSize: 14,
            lineHeight: 1.7,
            color: t.textMuted,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          That's why Before/After wins. It doesn't reorganize the product hierarchy — it
          bypasses it entirely. The buyer never gets stuck comparing your POS to the competitor's POS.
          Instead, they're comparing their current reality to a better future.
          And Dex isn't a feature in that story. It's the reason the future is better.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export function DeckStructureExploration({ theme = 'dark' }) {
  const t = themes[theme] || themes.dark;
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, label: 'AI Foundation', short: 'Inversion' },
    { id: 2, label: 'Hub & Spokes', short: 'Nexus-Centric' },
    { id: 3, label: 'Customer Journey', short: 'Linear' },
    { id: 4, label: 'Two Worlds', short: 'B2C + B2B' },
    { id: 5, label: 'The Stack', short: 'Platform' },
    { id: 6, label: 'Outcomes First', short: 'Results' },
    { id: 7, label: 'Ecosystem Map', short: 'Network' },
    { id: 8, label: 'Before / After', short: 'Transform' },
  ];

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
        padding: '40px 48px',
      }}
    >
      {/* Page Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 48 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: t.accentGold,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Dutchie Product Marketing
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Deck Structure Exploration
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            color: t.textMuted,
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          Eight fundamentally different ways to organize and present Dutchie's product hierarchy
          with AI/Dex at the center of the narrative. The question isn't what color the cards should be —
          it's what story the structure tells.
        </p>

        {/* Navigation pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 24,
          }}
        >
          <button
            onClick={() => setActiveSection(null)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${activeSection === null ? t.accentGold : t.border}`,
              background: activeSection === null ? t.accentGold + '18' : 'transparent',
              color: activeSection === null ? t.accentGold : t.textMuted,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s ease',
            }}
          >
            All Structures
          </button>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `1px solid ${activeSection === s.id ? t.accentGold : t.border}`,
                background: activeSection === s.id ? t.accentGold + '18' : 'transparent',
                color: activeSection === s.id ? t.accentGold : t.textMuted,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.15s ease',
              }}
            >
              {s.id}. {s.label}
            </button>
          ))}
          <button
            onClick={() => setActiveSection('rec')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${activeSection === 'rec' ? t.accentGreen : t.border}`,
              background: activeSection === 'rec' ? t.accentGreen + '18' : 'transparent',
              color: activeSection === 'rec' ? t.accentGreen : t.textMuted,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s ease',
            }}
          >
            Recommendation
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {(activeSection === null || activeSection === 1) && <Structure1 t={t} />}
          {(activeSection === null || activeSection === 1) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 2) && <Structure2 t={t} />}
          {(activeSection === null || activeSection === 2) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 3) && <Structure3 t={t} />}
          {(activeSection === null || activeSection === 3) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 4) && <Structure4 t={t} />}
          {(activeSection === null || activeSection === 4) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 5) && <Structure5 t={t} />}
          {(activeSection === null || activeSection === 5) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 6) && <Structure6 t={t} />}
          {(activeSection === null || activeSection === 6) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 7) && <Structure7 t={t} />}
          {(activeSection === null || activeSection === 7) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 8) && <Structure8 t={t} />}
          {(activeSection === null || activeSection === 8) && activeSection === null && (
            <div style={{ height: 1, background: t.border, margin: '0 40px' }} />
          )}

          {(activeSection === null || activeSection === 'rec') && <RecommendationSection t={t} />}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 900,
          margin: '64px auto 0',
          paddingTop: 24,
          borderTop: `1px solid ${t.border}`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: t.textFaint,
          }}
        >
          Dutchie Product Marketing — Deck Structure Exploration — March 2026
        </p>
      </div>
    </div>
  );
}

export default DeckStructureExploration;
