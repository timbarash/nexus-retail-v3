import React, { useState } from 'react';

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857' }
};

// ─── Reusable styled primitives ──────────────────────────────────────────────

const SectionHeader = ({ number, title, subtitle, t }) => (
  <div style={{ marginBottom: 40, paddingBottom: 20, borderBottom: `2px solid ${t.accentGold}` }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accentGold, background: `${t.accentGold}18`, padding: '4px 10px', borderRadius: 4 }}>
        Section {number}
      </span>
      <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 30, fontWeight: 700, color: t.text, margin: 0 }}>{title}</h2>
    </div>
    {subtitle && (
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: t.textMuted, marginTop: 8, marginBottom: 0, maxWidth: 700 }}>{subtitle}</p>
    )}
  </div>
);

const Card = ({ children, t, style = {} }) => (
  <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 28, fontFamily: 'DM Sans, sans-serif', ...style }}>
    {children}
  </div>
);

const InsightCard = ({ title, body, t }) => (
  <div style={{ background: `${t.accentGold}0C`, border: `1px solid ${t.accentGold}40`, borderRadius: 10, padding: 22, fontFamily: 'DM Sans, sans-serif' }}>
    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 8 }}>Key Insight</div>
    {title && <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>{title}</div>}
    <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6 }}>{body}</div>
  </div>
);

const Tag = ({ children, color, t }) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: `${color}18`, color: color, fontFamily: 'DM Sans, sans-serif' }}>
    {children}
  </span>
);

const ArrowRight = ({ t }) => (
  <span style={{ color: t.accentGold, fontSize: 20, fontWeight: 700, margin: '0 6px' }}>&rarr;</span>
);

const ArrowDown = ({ t }) => (
  <span style={{ display: 'block', textAlign: 'center', color: t.accentGold, fontSize: 22, fontWeight: 700, margin: '6px 0' }}>&darr;</span>
);

// ─── Decision Tree Renderer ──────────────────────────────────────────────────

const DecisionNode = ({ question, t, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ background: `${t.accentGold}15`, border: `2px solid ${t.accentGold}60`, borderRadius: 10, padding: '12px 20px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, color: t.text, textAlign: 'center', maxWidth: 300 }}>
      {question}
    </div>
    {children && (
      <>
        <div style={{ width: 2, height: 20, background: t.accentGold, opacity: 0.4 }} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {children}
        </div>
      </>
    )}
  </div>
);

const DecisionLeaf = ({ label, outcome, isRecommended, t }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <div style={{ width: 2, height: 16, background: t.border }} />
    <div style={{ fontSize: 11, fontWeight: 700, color: isRecommended ? t.accentGreen : t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
    <div style={{
      background: isRecommended ? `${t.accentGreen}12` : t.cardBg,
      border: `1px solid ${isRecommended ? t.accentGreen : t.border}`,
      borderRadius: 8, padding: '10px 16px', fontSize: 13, color: t.textMuted, textAlign: 'center', maxWidth: 220, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.5
    }}>
      {outcome}
      {isRecommended && (
        <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: t.accentGreen }}>RECOMMENDED</div>
      )}
    </div>
  </div>
);

// ─── Mini Hierarchy Diagram ─────────────────────────────────────────────────

const HierarchyBox = ({ label, sublabel, color, t, small, style = {} }) => (
  <div style={{
    background: `${color}12`, border: `1px solid ${color}50`, borderRadius: 8,
    padding: small ? '6px 12px' : '10px 18px', fontFamily: 'DM Sans, sans-serif',
    textAlign: 'center', ...style
  }}>
    <div style={{ fontSize: small ? 12 : 14, fontWeight: 600, color: t.text }}>{label}</div>
    {sublabel && <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{sublabel}</div>}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────

export function HierarchyPMMAnalysis({ theme = 'dark' }) {
  const t = themes[theme];
  const [activeFramework, setActiveFramework] = useState(0);

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: '48px 32px', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ══════════════════════════════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Tag color={t.accentGold} t={t}>Product Marketing</Tag>
            <Tag color={t.accentGreen} t={t}>Strategic Analysis</Tag>
            <Tag color={t.textMuted} t={t}>Internal</Tag>
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 40, fontWeight: 800, color: t.text, margin: 0, lineHeight: 1.15 }}>
            Dutchie Product Hierarchy<br />
            <span style={{ color: t.accentGold }}>PMM Strategic Analysis</span>
          </h1>
          <p style={{ fontSize: 16, color: t.textMuted, marginTop: 14, maxWidth: 780, lineHeight: 1.65 }}>
            How should Dutchie structure its product hierarchy as it adds AI capabilities? This analysis examines the real strategic decisions around Nexus, Dex, Intelligence, and the existing product pillars. Not design exploration — positioning and packaging strategy.
          </p>

          {/* Current hierarchy snapshot */}
          <Card t={t} style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 14 }}>Current Product Hierarchy (as sold today)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { name: 'E-Commerce', items: 'Collections, Outlets, Mobile App, Payments, Kiosk', color: '#4A90D9' },
                { name: 'Loyalty + Marketing', items: 'Automation, Segments, Email/Text/Push, Referrals, Events', color: '#D94A8E' },
                { name: 'Retail', items: 'Register, Dynamic Pricing, Compliance, Discounts, Reporting', color: '#4AD99A' },
                { name: 'Nexus', items: 'AI Command Center, Pricing, Loyalty Score, Inventory, Brands', color: t.accentGold },
                { name: 'Connect', items: 'Catalog, Brand Discounts, POs, Brand Intel, Cultivation', color: '#D9764A' },
              ].map((pillar, i) => (
                <div key={i} style={{ background: `${pillar.color}10`, border: `1px solid ${pillar.color}35`, borderRadius: 8, padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: pillar.color, marginBottom: 6 }}>{pillar.name}</div>
                  <div style={{ fontSize: 11, color: t.textFaint, lineHeight: 1.5 }}>{pillar.items}</div>
                </div>
              ))}
            </div>
            <div style={{ background: `${t.accentGold}08`, border: `1px dashed ${t.accentGold}40`, borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em' }}>INTELLIGENCE LAYER</span>
              <span style={{ fontSize: 12, color: t.textFaint, marginLeft: 12 }}>Agentic Commerce, Voice AI, Summaries, Intelligence Everywhere, AI Sales Assistant, Consumer Sentiment, Dutchie Agent</span>
            </div>
          </Card>

          {/* Observations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
            {[
              { text: 'Nexus is ALREADY branded as the AI product — "AI Command Center"', color: t.accentGold },
              { text: '"Dutchie Agent" exists in the Intelligence layer but has no distinct brand identity', color: '#D94A8E' },
              { text: 'No consumer-facing AI product exists yet — entire AI stack is operator-facing', color: '#4A90D9' },
            ].map((obs, i) => (
              <div key={i} style={{ background: `${obs.color}08`, borderLeft: `3px solid ${obs.color}`, padding: '10px 14px', borderRadius: '0 6px 6px 0', fontSize: 13, color: t.textMuted, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>
                {obs.text}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1: The Real Strategic Questions
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="1" title="The Real Strategic Questions" subtitle="These are the actual hard decisions that determine everything else — hierarchy, packaging, naming, and go-to-market." t={t} />

        {/* Q1: Is Nexus the AI brand or a product? */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ background: t.accentGold, color: t.bg, fontSize: 13, fontWeight: 800, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q1</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Is Nexus the AI brand or is it a product?</h3>
          </div>
          <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
            Today, Nexus = "AI Command Center" with specific features (Pricing Insights, Inventory Alerts, Brand Leaderboard). But Intelligence is a separate horizontal layer that spans everything. This creates a fundamental ambiguity: Is Nexus a product you buy, or is it the brand name for all of Dutchie's AI?
          </p>

          {/* Decision tree */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
            <DecisionNode question="Does Nexus = all AI at Dutchie?" t={t}>
              <DecisionLeaf
                label="Yes — Nexus is the AI brand"
                outcome="All AI features live under Nexus. Intelligence layer becomes 'Nexus Intelligence.' Agent becomes 'Nexus Agent.' Risk: Nexus becomes overloaded and loses meaning."
                t={t}
              />
              <DecisionLeaf
                label="No — Nexus is one product"
                outcome="Nexus stays as the dashboard product alongside Retail, E-Commerce, etc. Intelligence stays separate. Agent gets its own brand. Cleaner separation."
                isRecommended
                t={t}
              />
            </DecisionNode>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ background: `${t.accentGold}08`, border: `1px solid ${t.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGold, marginBottom: 8 }}>If Nexus IS the AI brand</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
                <li>Everything AI = "Nexus _____" (Nexus Agent, Nexus Intelligence, Nexus Voice)</li>
                <li>The 5-pillar model breaks — Nexus becomes a super-category</li>
                <li>Marketing gets simpler: "Dutchie for operations, Nexus for intelligence"</li>
                <li>But: customers already bought "Nexus" as a specific product with specific features</li>
              </ul>
            </div>
            <div style={{ background: `${t.accentGreen}08`, border: `1px solid ${t.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGreen, marginBottom: 8 }}>If Nexus is just a product</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
                <li>Nexus = "AI Command Center" dashboard, period</li>
                <li>Agent gets its own name (Dex) and identity</li>
                <li>Intelligence stays as the platform layer that powers everything</li>
                <li>Cleaner: 5 products + 1 agent + 1 platform layer</li>
                <li>But: miss the brand leverage of a unified AI story</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Q2: Where does the agent live? */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ background: t.accentGold, color: t.bg, fontSize: 13, fontWeight: 800, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q2</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Where does the agent live organizationally?</h3>
          </div>
          <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.65, marginBottom: 24 }}>
            "Dutchie Agent" currently sits in the Intelligence layer without a distinct brand. Three organizational models are possible, each with different GTM implications.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {/* Option A */}
            <div style={{ border: `1px solid ${t.border}`, borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', marginBottom: 8 }}>OPTION A</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Agent is a feature of Nexus</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 16, padding: '16px 0' }}>
                <HierarchyBox label="Nexus" sublabel="AI Command Center" color={t.accentGold} t={t} />
                <ArrowDown t={t} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <HierarchyBox label="Dashboard" color={t.border} t={t} small />
                  <HierarchyBox label="Dex Agent" color={t.accentGold} t={t} small />
                  <HierarchyBox label="Insights" color={t.border} t={t} small />
                </div>
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, flex: 1 }}>
                Agent is just one feature inside Nexus. Simple to sell: "Buy Nexus, get everything." But limits the agent's identity.
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: t.textFaint }}>Best if: Agent is complementary, not transformative</div>
            </div>

            {/* Option B */}
            <div style={{ border: `1px solid ${t.accentGreen}50`, borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', background: `${t.accentGreen}06` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em' }}>OPTION B</div>
                <Tag color={t.accentGreen} t={t}>Recommended</Tag>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Agent is a peer product</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 16, padding: '16px 0' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <HierarchyBox label="Nexus" sublabel="Command Center" color={t.accentGold} t={t} small />
                  <HierarchyBox label="Dex" sublabel="AI Agent" color={t.accentGreen} t={t} small />
                </div>
                <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>Siblings — both AI, both distinct</div>
                <div style={{ width: '80%', height: 1, background: `${t.border}`, margin: '4px 0' }} />
                <div style={{ fontSize: 11, color: t.textFaint }}>Intelligence Platform (powers both)</div>
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, flex: 1 }}>
                Nexus and Dex are sibling products. Nexus is the dashboard, Dex is the conversational AI. Both powered by the Intelligence layer. Can sell separately or together.
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: t.accentGreen, fontWeight: 600 }}>Best if: Agent is the hero product and needs its own GTM motion</div>
            </div>

            {/* Option C */}
            <div style={{ border: `1px solid ${t.border}`, borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', marginBottom: 8 }}>OPTION C</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>Agent IS the Intelligence UI</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 16, padding: '16px 0' }}>
                <HierarchyBox label="Intelligence Layer" sublabel="Platform" color={'#4A90D9'} t={t} />
                <ArrowDown t={t} />
                <HierarchyBox label="Dex" sublabel="The user interface for Intelligence" color={t.accentGold} t={t} />
                <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>Nexus dashboard feeds into Dex</div>
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, flex: 1 }}>
                The agent IS how you interact with the Intelligence layer. Nexus becomes a visual dashboard within the broader Dex experience. Ambitious but risky.
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: t.textFaint }}>Best if: You believe conversational AI replaces dashboards</div>
            </div>
          </div>
        </Card>

        {/* Q3: Intelligence — product or platform? */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ background: t.accentGold, color: t.bg, fontSize: 13, fontWeight: 800, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q3</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Is "Intelligence" a product or a platform capability?</h3>
          </div>
          <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
            Today Intelligence is a horizontal bar that powers everything. But it also has specific features (Voice AI, Summaries, Consumer Sentiment). Is it a product customers buy, or infrastructure they benefit from?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ padding: 20, border: `1px solid ${t.border}`, borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 }}>The Google "Search" Model</div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
                Intelligence is both a product AND infrastructure. Like Google Search — it's a product you use directly (the Nexus dashboard, the Dex agent) AND it powers features in every other product (smart pricing in Retail, automated segments in Marketing).
              </div>
              <div style={{ background: `${t.accentGold}08`, padding: 12, borderRadius: 6, fontSize: 12, color: t.textFaint }}>
                Implication: Market Intelligence features within each product. "Retail, now with Intelligence" rather than "buy Intelligence separately."
              </div>
            </div>
            <div style={{ padding: 20, border: `1px solid ${t.accentGreen}40`, borderRadius: 10, background: `${t.accentGreen}06` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>The AWS "Cloud" Model</div>
                <Tag color={t.accentGreen} t={t}>Recommended</Tag>
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
                Intelligence is pure infrastructure. Customers never "buy Intelligence" — they buy Nexus, Dex, Retail, E-Commerce, and Intelligence powers everything behind the scenes. Like how AWS is infrastructure — you buy EC2, S3, Lambda, not "the cloud."
              </div>
              <div style={{ background: `${t.accentGreen}08`, padding: 12, borderRadius: 6, fontSize: 12, color: t.accentGreen }}>
                Implication: Never sell Intelligence as a line item. It's the platform capability that justifies premium pricing on everything else.
              </div>
            </div>
          </div>
        </Card>

        {/* Q4: What happens to Connect? */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ background: t.accentGold, color: t.bg, fontSize: 13, fontWeight: 800, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Q4</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>What happens to Connect as AI gets bigger?</h3>
          </div>
          <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
            Connect is the B2B marketplace — brands selling to retailers. AI could transform Connect into a demand-prediction, automated-ordering, smart-pricing engine. The question is whether Connect maintains its own identity or gets absorbed.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div style={{ padding: 16, border: `1px solid ${t.border}`, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#D9764A', marginBottom: 8 }}>Status Quo: Connect stays independent</div>
              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
                Connect keeps its own identity. AI features get added to Connect as "Connect Intelligence." Brands already know the Connect brand; don't break it.
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: t.textFaint }}>Risk: Two-sided marketplace needs different AI than retail. May under-invest.</div>
            </div>
            <div style={{ padding: 16, border: `1px solid ${t.accentGreen}40`, borderRadius: 8, background: `${t.accentGreen}06` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGreen, marginBottom: 8 }}>Recommended: Connect + Dex for B2B</div>
              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
                Connect keeps its brand. Dex gets a B2B mode that works within Connect. "Ask Dex about your brand performance" for brand managers, "Ask Dex what to order" for retailers.
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: t.accentGreen }}>Dex becomes the bridge between Connect and the rest of the platform.</div>
            </div>
            <div style={{ padding: 16, border: `1px solid ${t.border}`, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#4A90D9', marginBottom: 8 }}>Aggressive: Merge into "Commerce"</div>
              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>
                Combine E-Commerce, Connect, and Payments into a single "Commerce" pillar. Retail stays separate. Creates a cleaner 4-pillar model. But destroys Connect brand equity.
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: t.textFaint }}>Risk: Alienates brand customers who identify with Connect specifically.</div>
            </div>
          </div>
        </Card>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2: Four Strategic Frameworks
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="2" title="Four Strategic Frameworks" subtitle="Not just hierarchy models. Each framework implies a different sales narrative, a different ideal buyer, and a different competitive position." t={t} />

        {/* Framework selector tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['The Stack', 'The Workflows', 'The Inside/Outside', 'The Today/Tomorrow'].map((name, i) => (
            <button
              key={i}
              onClick={() => setActiveFramework(i)}
              style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '8px 18px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: activeFramework === i ? t.accentGold : `${t.border}60`,
                color: activeFramework === i ? t.bg : t.textMuted,
                transition: 'all 0.2s'
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Framework 1: The Stack */}
        {activeFramework === 0 && (
          <Card t={t} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>Framework 1: "The Stack"</h3>
                <p style={{ fontSize: 13, color: t.textFaint, marginTop: 4 }}>Horizontal layers from data to surface</p>
              </div>
              <Tag color={t.accentGold} t={t}>Horizontal Layers</Tag>
            </div>

            {/* Stack diagram */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
              {[
                { label: 'Surface Layer', items: ['Retail POS', 'E-Commerce', 'Connect', 'Loyalty + Marketing'], color: '#4A90D9', desc: 'What customers interact with' },
                { label: 'Intelligence', items: ['Nexus AI Command Center'], color: t.accentGold, desc: 'Analytics, insights, predictions' },
                { label: 'Agent Layer', items: ['Dex — conversational AI across all surfaces'], color: t.accentGreen, desc: 'Ask anything, take action' },
                { label: 'Data Layer', items: ['Unified cannabis data platform'], color: '#8B5CF6', desc: 'Foundation of everything' },
              ].map((layer, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 200px', gap: 12, alignItems: 'center', padding: '14px 18px', background: `${layer.color}08`, border: `1px solid ${layer.color}25`, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: layer.color, letterSpacing: '0.04em' }}>{layer.label}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {layer.items.map((item, j) => (
                      <span key={j} style={{ fontSize: 13, color: t.text, background: `${layer.color}15`, padding: '4px 10px', borderRadius: 4 }}>{item}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: t.textFaint, textAlign: 'right' }}>{layer.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <div style={{ padding: 14, background: `${t.accentGreen}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, letterSpacing: '0.06em', marginBottom: 6 }}>BEST FOR SELLING TO</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>CTO / COO who wants a single vendor for their entire tech stack. Enterprises doing RFPs.</div>
              </div>
              <div style={{ padding: 14, background: `${t.accentGold}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em', marginBottom: 6 }}>KEY RISK</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>Feels too abstract. Hard to sell individual pieces. Small dispensaries don't think in "layers" — they think in problems.</div>
              </div>
              <div style={{ padding: 14, background: `${'#4A90D9'}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.06em', marginBottom: 6 }}>ELEVATOR PITCH</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontStyle: 'italic' }}>"Dutchie is the full-stack cannabis technology platform. From your data to your customer, every layer is connected."</div>
              </div>
            </div>
          </Card>
        )}

        {/* Framework 2: The Workflows */}
        {activeFramework === 1 && (
          <Card t={t} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>Framework 2: "The Workflows"</h3>
                <p style={{ fontSize: 13, color: t.textFaint, marginTop: 4 }}>Organized by what you DO, not what the technology is</p>
              </div>
              <Tag color={t.accentGreen} t={t}>Recommended for Sales</Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { verb: 'SELL', products: ['Retail', 'E-Commerce', 'Kiosk'], color: '#4AD99A', icon: '$' },
                { verb: 'GROW', products: ['Loyalty', 'Marketing', 'Segments'], color: '#D94A8E', icon: '+' },
                { verb: 'KNOW', products: ['Nexus', 'Intelligence', 'Analytics'], color: t.accentGold, icon: '?' },
                { verb: 'BUY', products: ['Connect', 'Supply Chain'], color: '#D9764A', icon: '<>' },
                { verb: 'ASK', products: ['Dex Agent', '(works across all)'], color: t.accentGreen, icon: '>' },
              ].map((wf, i) => (
                <div key={i} style={{ background: `${wf.color}08`, border: `1px solid ${wf.color}30`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: wf.color, marginBottom: 4, fontFamily: 'DM Sans, sans-serif' }}>{wf.verb}</div>
                  <div style={{ width: 30, height: 2, background: wf.color, margin: '8px auto', opacity: 0.4 }} />
                  {wf.products.map((p, j) => (
                    <div key={j} style={{ fontSize: 12, color: t.textMuted, padding: '3px 0' }}>{p}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Connection arrows */}
            <div style={{ textAlign: 'center', padding: '8px 0 20px', fontSize: 13, color: t.textFaint }}>
              <span style={{ color: t.accentGreen, fontWeight: 600 }}>ASK (Dex)</span> connects to every workflow — "Ask Dex to help you SELL, GROW, KNOW, or BUY"
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <div style={{ padding: 14, background: `${t.accentGreen}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, letterSpacing: '0.06em', marginBottom: 6 }}>BEST FOR SELLING TO</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>VP of Operations or GM who thinks in workflows, not technology. Mid-market multi-location operators.</div>
              </div>
              <div style={{ padding: 14, background: `${t.accentGold}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em', marginBottom: 6 }}>KEY RISK</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>"ASK" feels awkward as a category. Dex could feel like an add-on rather than transformative. Verbs may feel gimmicky.</div>
              </div>
              <div style={{ padding: 14, background: `${'#4A90D9'}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.06em', marginBottom: 6 }}>ELEVATOR PITCH</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontStyle: 'italic' }}>"Whatever you need to do in cannabis — sell, grow your customer base, understand your business, manage supply — Dutchie has a purpose-built product. And Dex is the AI that connects it all."</div>
              </div>
            </div>
          </Card>
        )}

        {/* Framework 3: The Inside/Outside */}
        {activeFramework === 2 && (
          <Card t={t} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>Framework 3: "The Inside/Outside"</h3>
                <p style={{ fontSize: 13, color: t.textFaint, marginTop: 4 }}>Organized by audience and context</p>
              </div>
              <Tag color={t.textMuted} t={t}>Audience-Based</Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { zone: 'Inside the Store', desc: 'Customer-facing operations', products: ['Retail POS', 'E-Commerce', 'Loyalty + Marketing', 'Kiosk', 'Digital Payments'], color: '#4AD99A', audience: 'Budtenders, managers, shoppers' },
                { zone: 'Behind the Scenes', desc: 'Operator intelligence', products: ['Nexus AI Command Center', 'Intelligence Layer', 'Dex Agent', 'Reporting + Analytics'], color: t.accentGold, audience: 'Owners, GMs, data teams' },
                { zone: 'Between Businesses', desc: 'B2B marketplace & supply', products: ['Connect Marketplace', 'Brand Intelligence', 'POs + Invoices', 'Supply Chain'], color: '#D9764A', audience: 'Brand managers, buyers, distributors' },
              ].map((zone, i) => (
                <div key={i} style={{ background: `${zone.color}06`, border: `1px solid ${zone.color}30`, borderRadius: 10, padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: zone.color, marginBottom: 2 }}>{zone.zone}</div>
                  <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 14 }}>{zone.desc}</div>
                  {zone.products.map((p, j) => (
                    <div key={j} style={{ fontSize: 13, color: t.textMuted, padding: '4px 0', borderBottom: j < zone.products.length - 1 ? `1px solid ${t.border}40` : 'none' }}>{p}</div>
                  ))}
                  <div style={{ marginTop: 12, fontSize: 11, color: zone.color, fontWeight: 600 }}>Audience: {zone.audience}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <div style={{ padding: 14, background: `${t.accentGreen}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, letterSpacing: '0.06em', marginBottom: 6 }}>BEST FOR SELLING TO</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>Multi-location operators who need clarity on what solves what. Especially those running 10+ stores with distinct roles.</div>
              </div>
              <div style={{ padding: 14, background: `${t.accentGold}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em', marginBottom: 6 }}>KEY RISK</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>"Behind the scenes" undersells AI massively. Intelligence IS customer-facing too (personalization, smart recommendations). The metaphor breaks.</div>
              </div>
              <div style={{ padding: 14, background: `${'#4A90D9'}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.06em', marginBottom: 6 }}>ELEVATOR PITCH</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontStyle: 'italic' }}>"Dutchie covers every angle of your cannabis business — from the customer experience inside your store, to the intelligence driving your decisions, to the marketplace connecting you with brands."</div>
              </div>
            </div>
          </Card>
        )}

        {/* Framework 4: The Today/Tomorrow */}
        {activeFramework === 3 && (
          <Card t={t} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>Framework 4: "The Today/Tomorrow"</h3>
                <p style={{ fontSize: 13, color: t.textFaint, marginTop: 4 }}>Organized by AI maturity and readiness</p>
              </div>
              <Tag color={t.textFaint} t={t}>Maturity-Based</Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
              <div style={{ background: `${'#4AD99A'}08`, border: `1px solid ${'#4AD99A'}30`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4AD99A', letterSpacing: '0.08em', marginBottom: 4 }}>TODAY</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 10 }}>Proven & Deployed</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 14 }}>Thousands of dispensaries use these daily</div>
                {['Retail POS', 'E-Commerce + Kiosk', 'Loyalty + Marketing', 'Connect Marketplace'].map((p, i) => (
                  <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '5px 0', borderBottom: `1px solid ${t.border}30` }}>{p}</div>
                ))}
              </div>
              <div style={{ background: `${t.accentGold}08`, border: `1px solid ${t.accentGold}30`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.08em', marginBottom: 4 }}>TOMORROW</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 10 }}>AI-Powered & Emerging</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 14 }}>The next generation of cannabis tech</div>
                {['Nexus AI Command Center', 'Dex Agent', 'AI Commerce', 'Intelligence Suite'].map((p, i) => (
                  <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '5px 0', borderBottom: `1px solid ${t.border}30` }}>{p}</div>
                ))}
              </div>
              <div style={{ background: `${'#8B5CF6'}08`, border: `1px solid ${'#8B5CF6'}30`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8B5CF6', letterSpacing: '0.08em', marginBottom: 4 }}>ALWAYS</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 10 }}>Platform Foundation</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 14 }}>Required infrastructure regardless of AI</div>
                {['Payments Processing', 'Compliance Engine', 'Data Platform', 'Reporting'].map((p, i) => (
                  <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '5px 0', borderBottom: `1px solid ${t.border}30` }}>{p}</div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <div style={{ padding: 14, background: `${t.accentGreen}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, letterSpacing: '0.06em', marginBottom: 6 }}>BEST FOR SELLING TO</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>Pragmatic buyers skeptical of AI hype. CFOs and finance-minded operators who want proven ROI before investing in "tomorrow."</div>
              </div>
              <div style={{ padding: 14, background: `${t.accentGold}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em', marginBottom: 6 }}>KEY RISK</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>Creates a two-tier perception. "Tomorrow" products seem experimental and unproven. Customers may wait to buy AI products, hurting Nexus/Dex adoption.</div>
              </div>
              <div style={{ padding: 14, background: `${'#4A90D9'}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4A90D9', letterSpacing: '0.06em', marginBottom: 6 }}>ELEVATOR PITCH</div>
                <div style={{ fontSize: 13, color: t.textMuted, fontStyle: 'italic' }}>"Start with what works today — the most trusted cannabis POS and e-commerce platform. When you're ready, unlock AI with Nexus and Dex. The platform grows with you."</div>
              </div>
            </div>
          </Card>
        )}

        {/* Framework comparison summary */}
        <Card t={t} style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Framework Comparison Matrix</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Framework', 'Ideal Buyer', 'Dex Positioning', 'Sales Complexity', 'AI Story Strength', 'Verdict'].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${t.border}`, color: t.textFaint, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['The Stack', 'CTO/COO', 'One layer in the stack', 'High', 'Medium', 'Too abstract'],
                  ['The Workflows', 'VP Ops / GM', 'Cross-cutting agent', 'Medium', 'High', 'Best for sales'],
                  ['Inside/Outside', 'Multi-loc operator', 'Behind the scenes', 'Low', 'Low', 'Undersells AI'],
                  ['Today/Tomorrow', 'Pragmatic CFO', 'Tomorrow product', 'Medium', 'Medium', 'Hurts adoption'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i === 1 ? `${t.accentGreen}06` : 'transparent' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '10px 12px', borderBottom: `1px solid ${t.border}40`,
                        color: j === 0 ? t.text : t.textMuted,
                        fontWeight: j === 0 || j === 5 ? 600 : 400,
                        ...(j === 5 && i === 1 ? { color: t.accentGreen } : {}),
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3: The Packaging Question
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="3" title="The Packaging Question" subtitle="How you bundle determines how you sell. And how you sell determines the hierarchy. Packaging is the forcing function for organizational decisions." t={t} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {/* Starter */}
          <div style={{ border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `${t.border}40`, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textFaint, letterSpacing: '0.1em', marginBottom: 4 }}>BUNDLE A</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Starter</div>
              <div style={{ fontSize: 12, color: t.textFaint, marginTop: 4 }}>Single-store dispensaries</div>
            </div>
            <div style={{ padding: '20px 18px', flex: 1 }}>
              {['Retail POS', 'E-Commerce Storefront', 'Digital Payments', 'Basic Reporting', 'Compliance Engine'].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '6px 0', borderBottom: `1px solid ${t.border}20`, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: t.accentGreen, fontWeight: 700, fontSize: 14 }}>+</span> {f}
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '8px 0' }}>
                {['Nexus AI', 'Dex Agent', 'Loyalty', 'Connect'].map((f, i) => (
                  <div key={i} style={{ fontSize: 12, color: t.textFaint, padding: '4px 0', textDecoration: 'line-through', opacity: 0.5 }}>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 18px', borderTop: `1px solid ${t.border}`, fontSize: 12, color: t.textFaint, textAlign: 'center' }}>
              No AI. No loyalty. Just the basics done right.
            </div>
          </div>

          {/* Growth */}
          <div style={{ border: `1px solid ${'#D94A8E'}40`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `${'#D94A8E'}12`, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D94A8E', letterSpacing: '0.1em', marginBottom: 4 }}>BUNDLE B</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Growth</div>
              <div style={{ fontSize: 12, color: t.textFaint, marginTop: 4 }}>Dispensaries focused on retention</div>
            </div>
            <div style={{ padding: '20px 18px', flex: 1 }}>
              <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 8 }}>Everything in Starter, plus:</div>
              {['Loyalty Program', 'Marketing Automation', 'Dynamic Segments', 'Email + Text + Push', 'Refer A Friend', 'IRL Events'].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '6px 0', borderBottom: `1px solid ${t.border}20`, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#D94A8E', fontWeight: 700, fontSize: 14 }}>+</span> {f}
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '8px 0' }}>
                {['Nexus AI', 'Dex Agent', 'Connect'].map((f, i) => (
                  <div key={i} style={{ fontSize: 12, color: t.textFaint, padding: '4px 0', textDecoration: 'line-through', opacity: 0.5 }}>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 18px', borderTop: `1px solid ${t.border}`, fontSize: 12, color: t.textFaint, textAlign: 'center' }}>
              The retention stack. Most popular bundle.
            </div>
          </div>

          {/* Enterprise */}
          <div style={{ border: `2px solid ${t.accentGold}60`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: `${t.accentGold}04` }}>
            <div style={{ background: `${t.accentGold}15`, padding: '18px 20px', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 8, right: 10 }}>
                <Tag color={t.accentGold} t={t}>Most Strategic</Tag>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.1em', marginBottom: 4 }}>BUNDLE C</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Enterprise</div>
              <div style={{ fontSize: 12, color: t.textFaint, marginTop: 4 }}>Multi-location operators</div>
            </div>
            <div style={{ padding: '20px 18px', flex: 1 }}>
              <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 8 }}>Everything in Growth, plus:</div>
              {['Nexus AI Command Center', 'Dex AI Agent', 'Pricing Insights', 'Inventory Alerts', 'Loyalty Score AI', 'Brand Leaderboard', 'Advanced Analytics'].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '6px 0', borderBottom: `1px solid ${t.border}20`, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: t.accentGold, fontWeight: 700, fontSize: 14 }}>+</span> {f}
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '8px 0' }}>
                {['Connect B2B'].map((f, i) => (
                  <div key={i} style={{ fontSize: 12, color: t.textFaint, padding: '4px 0', textDecoration: 'line-through', opacity: 0.5 }}>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 18px', borderTop: `1px solid ${t.accentGold}30`, fontSize: 12, color: t.accentGold, textAlign: 'center', fontWeight: 600 }}>
              This is where Dex gets introduced. The "wow" moment.
            </div>
          </div>

          {/* Full Platform */}
          <div style={{ border: `1px solid ${'#8B5CF6'}40`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `${'#8B5CF6'}12`, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#8B5CF6', letterSpacing: '0.1em', marginBottom: 4 }}>BUNDLE D</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Full Platform</div>
              <div style={{ fontSize: 12, color: t.textFaint, marginTop: 4 }}>Large operators + brand relationships</div>
            </div>
            <div style={{ padding: '20px 18px', flex: 1 }}>
              <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 8 }}>Everything in Enterprise, plus:</div>
              {['Connect Marketplace', 'Global Catalog Access', 'Brand Discounts', 'POs + Invoices', 'Brand Intelligence', 'Cultivation + Mfg Intel', 'Consumer Sentiment AI', 'Voice AI', 'Agentic Commerce'].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '6px 0', borderBottom: `1px solid ${t.border}20`, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 14 }}>+</span> {f}
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 18px', borderTop: `1px solid ${t.border}`, fontSize: 12, color: t.textFaint, textAlign: 'center' }}>
              Everything Dutchie makes. The partnership tier.
            </div>
          </div>
        </div>

        <InsightCard
          title="The packaging question answers the hierarchy question."
          body="If Dex is always bundled with Nexus (as in Enterprise), they should be one product. If Dex can be sold separately as an add-on to Growth customers, it needs its own identity. The current recommendation: Dex is a peer to Nexus but they enter together at the Enterprise tier. This means they need distinct brands but a shared narrative."
          t={t}
        />

        {/* Packaging implications table */}
        <Card t={t} style={{ marginTop: 20, marginBottom: 48 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 }}>Packaging Implications for Hierarchy</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
            <thead>
              <tr>
                {['If we package like this...', 'Then the hierarchy should be...', 'And the GTM motion is...'].map((h, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${t.border}`, color: t.textFaint, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Dex bundled only with Nexus', 'Dex is a Nexus feature', 'Sell Nexus as the AI product; Dex is the interaction layer'],
                ['Dex as a standalone add-on', 'Dex is its own product', 'Sell Dex as "AI assistant for any Dutchie product"'],
                ['Dex in every bundle (freemium)', 'Dex is a platform capability', 'Use Dex as a trial hook; monetize through upsell to full features'],
                ['Dex only in Enterprise+', 'Dex is a premium differentiator', 'Land with POS, expand to AI as the premium play'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i === 3 ? `${t.accentGreen}06` : 'transparent' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, color: j === 0 ? t.text : t.textMuted, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, fontSize: 12, color: t.accentGreen, fontWeight: 600 }}>Recommended: Row 4 — Dex as a premium Enterprise differentiator with its own brand identity</div>
        </Card>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4: Cross-Sell & Expansion Paths
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="4" title="Cross-Sell & Expansion Paths" subtitle="The natural upgrade journey from first purchase to full platform adoption. This is the land-and-expand playbook." t={t} />

        {/* Main expansion flow */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 20 }}>Primary Expansion Path (Retailer Journey)</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 24, padding: '16px 0' }}>
            {[
              { label: 'Retail POS', sub: 'Land', color: '#4AD99A' },
              null,
              { label: 'E-Commerce', sub: 'Quick add', color: '#4A90D9' },
              null,
              { label: 'Loyalty', sub: 'Retention play', color: '#D94A8E' },
              null,
              { label: 'Nexus', sub: 'AI upsell', color: t.accentGold },
              null,
              { label: 'Dex Agent', sub: 'The wow moment', color: t.accentGreen },
            ].map((item, i) => item === null ? (
              <ArrowRight key={i} t={t} />
            ) : (
              <div key={i} style={{ background: `${item.color}10`, border: `1px solid ${item.color}40`, borderRadius: 8, padding: '10px 16px', textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.label}</div>
                <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Secondary path */}
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Secondary Entry Point (Brand Journey)</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '12px 0', marginBottom: 20 }}>
            {[
              { label: 'Connect', sub: 'B2B entry', color: '#D9764A' },
              null,
              { label: 'Brand Intel', sub: 'See what sells', color: t.accentGold },
              null,
              { label: 'Dex for Brands', sub: 'AI-powered B2B', color: t.accentGreen },
            ].map((item, i) => item === null ? (
              <ArrowRight key={i} t={t} />
            ) : (
              <div key={i} style={{ background: `${item.color}10`, border: `1px solid ${item.color}40`, borderRadius: 8, padding: '10px 16px', textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.label}</div>
                <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGold, marginBottom: 8 }}>Where the paths converge:</div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
              Both paths end at Dex. The retailer path goes POS &rarr; E-Com &rarr; Loyalty &rarr; Nexus &rarr; Dex. The brand path goes Connect &rarr; Brand Intel &rarr; Dex for Brands. Dex is the common destination. This is why Dex needs to work across both B2C (retailer) and B2B (brand) contexts.
            </div>
          </div>
        </Card>

        {/* Land and Expand Strategy */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 20 }}>Land & Expand Strategy — Five Phases</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                phase: 1, title: 'Land with Retail POS', desc: 'Bread and butter. Easy sale. Solves an immediate, tangible problem. Every dispensary needs a POS.',
                signal: 'Buyer signal: "We need to replace our POS"',
                acv: 'Smallest ACV, highest volume',
                color: '#4AD99A'
              },
              {
                phase: 2, title: 'Expand to E-Commerce + Loyalty', desc: 'Natural add-ons 60-90 days after POS go-live. Online ordering is expected. Loyalty drives repeat visits.',
                signal: 'Buyer signal: "We want online ordering" or "How do we get customers back?"',
                acv: 'Medium ACV, high attach rate (~70%)',
                color: '#4A90D9'
              },
              {
                phase: 3, title: 'Introduce Dex as "your AI assistant"', desc: 'This is the "wow" moment. Dex surfaces insights the customer didn\'t know they needed. Demo-driven sale — once they see Dex answer a question about their business, they\'re hooked.',
                signal: 'Buyer signal: "I wish I knew what was working and what\'s not"',
                acv: 'Premium upsell, high expansion revenue',
                color: t.accentGreen
              },
              {
                phase: 4, title: 'Dex surfaces Nexus insights', desc: 'Dex keeps referencing dashboards and analytics they can\'t fully access yet. Customer realizes they need the full Nexus command center to see the complete picture.',
                signal: 'Buyer signal: "Show me the full dashboard Dex keeps referencing"',
                acv: 'Large ACV, consultative sale',
                color: t.accentGold
              },
              {
                phase: 5, title: 'Full platform + Connect', desc: 'Customer is all-in. They add Connect for brand relationships, supply chain, and B2B marketplace. They\'re now a platform customer with high switching costs.',
                signal: 'Buyer signal: "We want to manage our brand relationships through Dutchie too"',
                acv: 'Largest ACV, lowest churn',
                color: '#8B5CF6'
              },
            ].map((phase, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16 }}>
                {/* Phase number and connector line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${phase.color}20`, border: `2px solid ${phase.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: phase.color, fontFamily: 'DM Sans, sans-serif', flexShrink: 0 }}>
                    {phase.phase}
                  </div>
                  {i < 4 && <div style={{ width: 2, flex: 1, background: `${t.border}60`, minHeight: 20 }} />}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: i < 4 ? 20 : 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>{phase.title}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 8 }}>{phase.desc}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 12, color: phase.color, background: `${phase.color}10`, padding: '3px 8px', borderRadius: 4 }}>{phase.signal}</span>
                    <span style={{ fontSize: 12, color: t.textFaint, background: `${t.border}40`, padding: '3px 8px', borderRadius: 4 }}>{phase.acv}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <InsightCard
          title="Dex is the expansion wedge."
          body="The critical insight: Dex is not just a product — it's the primary mechanism for expansion revenue. Once a Growth-tier customer experiences Dex in a demo, they want it. Once they have Dex, it keeps surfacing insights from Nexus they can't access yet. Dex creates demand for Nexus. This is why Dex needs its own brand and its own sales motion, even if it ships alongside Nexus in the Enterprise bundle."
          t={t}
        />

        {/* Revenue model visual */}
        <Card t={t} style={{ marginBottom: 48, marginTop: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Revenue Expansion Model</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, textAlign: 'center' }}>
            {[
              { tier: 'Starter', pct: '20%', bar: 20, color: '#4AD99A' },
              { tier: 'Growth', pct: '45%', bar: 45, color: '#D94A8E' },
              { tier: 'Enterprise', pct: '75%', bar: 75, color: t.accentGold },
              { tier: 'Full Platform', pct: '100%', bar: 100, color: '#8B5CF6' },
              { tier: 'Avg LTV Uplift', pct: '3.2x', bar: 80, color: t.accentGreen },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.color, fontFamily: 'DM Sans, sans-serif' }}>{item.pct}</div>
                <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 8 }}>{item.tier}</div>
                <div style={{ height: 6, borderRadius: 3, background: `${t.border}40`, overflow: 'hidden' }}>
                  <div style={{ width: `${item.bar}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 10, color: t.textFaint, marginTop: 4 }}>of total platform ACV</div>
              </div>
            ))}
          </div>
        </Card>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5: Competitive Positioning
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="5" title="Competitive Positioning" subtitle="Where Dutchie stands in the cannabis technology landscape, and how each framework positions Dutchie's AI differentiation." t={t} />

        {/* Competitive Matrix */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Competitive Capability Matrix</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif', fontSize: 13, minWidth: 700 }}>
              <thead>
                <tr>
                  {['', 'POS', 'E-Commerce', 'Loyalty', 'B2B Marketplace', 'AI Agent', 'Intelligence Platform'].map((h, i) => (
                    <th key={i} style={{ textAlign: i === 0 ? 'left' : 'center', padding: '10px 12px', borderBottom: `2px solid ${t.border}`, color: t.textFaint, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Dutchie', vals: ['full', 'full', 'full', 'full', 'full', 'full'], highlight: true },
                  { name: 'Treez', vals: ['full', 'full', 'partial', 'none', 'none', 'none'] },
                  { name: 'Flowhub', vals: ['full', 'partial', 'none', 'none', 'none', 'none'] },
                  { name: 'LeafLink', vals: ['none', 'none', 'none', 'full', 'none', 'partial'] },
                  { name: 'Nabis', vals: ['none', 'none', 'none', 'partial', 'none', 'none'] },
                  { name: 'Meadow', vals: ['full', 'full', 'none', 'none', 'none', 'none'] },
                  { name: 'Blaze', vals: ['full', 'partial', 'none', 'none', 'none', 'none'] },
                ].map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? `${t.accentGold}08` : 'transparent' }}>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, fontWeight: 700, color: row.highlight ? t.accentGold : t.text }}>
                      {row.name}
                    </td>
                    {row.vals.map((val, j) => (
                      <td key={j} style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, textAlign: 'center' }}>
                        {val === 'full' && <span style={{ color: t.accentGreen, fontWeight: 700, fontSize: 16 }}>&#10003;</span>}
                        {val === 'partial' && <span style={{ color: t.accentGoldLight, fontWeight: 700, fontSize: 14 }}>~</span>}
                        {val === 'none' && <span style={{ color: `${t.textFaint}60`, fontWeight: 700, fontSize: 14 }}>&#10005;</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 16, padding: 14, background: `${t.accentGold}08`, borderRadius: 8, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: t.accentGold }}>The gap is massive.</span> No cannabis technology competitor has AI agent capabilities. No competitor has a unified intelligence platform. LeafLink competes on B2B marketplace but has zero retail presence. Treez competes on POS/E-Commerce but has no AI story. Dutchie is the only company that can credibly claim "full-stack cannabis technology with AI."
          </div>
        </Card>

        {/* Competitive positioning by segment */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Competitive Positioning by Market Segment</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              {
                segment: 'Single-Store Dispensaries',
                competitors: 'Treez, Flowhub, Meadow, Blaze',
                dutchieAdvantage: 'Price competitive on POS, with upgrade path to AI that no competitor offers',
                risk: 'Competitors may be cheaper at this tier; Dutchie needs a lean Starter bundle',
                color: '#4AD99A'
              },
              {
                segment: 'Multi-Location Operators (5-50)',
                competitors: 'Treez (main competitor)',
                dutchieAdvantage: 'Nexus + Dex completely differentiate. No competitor has AI analytics or agents for this segment.',
                risk: 'Treez has strong POS loyalty. Need to win on AI story.',
                color: t.accentGold
              },
              {
                segment: 'Enterprise / MSOs (50+)',
                competitors: 'Custom / in-house solutions',
                dutchieAdvantage: 'Full platform beats building in-house. Intelligence platform + Dex agent would cost millions to build.',
                risk: 'Largest operators may want to build AI in-house. Need to prove Dex is better than DIY.',
                color: '#8B5CF6'
              },
            ].map((seg, i) => (
              <div key={i} style={{ border: `1px solid ${seg.color}30`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: seg.color, marginBottom: 10 }}>{seg.segment}</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>Competes with:</span> {seg.competitors}
                </div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, color: t.accentGreen }}>Dutchie advantage:</span> {seg.dutchieAdvantage}
                </div>
                <div style={{ fontSize: 12, color: t.textFaint, lineHeight: 1.5, borderTop: `1px solid ${t.border}30`, paddingTop: 8 }}>
                  <span style={{ fontWeight: 600 }}>Risk:</span> {seg.risk}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Differentiator callout */}
        <div style={{ background: `${t.accentGold}0A`, border: `2px solid ${t.accentGold}30`, borderRadius: 12, padding: 28, textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>The Key Differentiator</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3, maxWidth: 600, margin: '0 auto' }}>
            "We're the only full-stack platform with AI."
          </div>
          <div style={{ fontSize: 14, color: t.textMuted, marginTop: 12, fontFamily: 'DM Sans, sans-serif', maxWidth: 500, margin: '12px auto 0' }}>
            No competitor has the breadth (POS + E-Commerce + Loyalty + B2B) AND the depth (AI Agent + Intelligence Platform). That combination is Dutchie's moat.
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6: The PMM Recommendation
        ══════════════════════════════════════════════════════════════════ */}
        <SectionHeader number="6" title="The PMM Recommendation" subtitle="A clear, confident recommendation based on the analysis above. This is the decision we should make and how to execute it." t={t} />

        {/* The one-liner */}
        <div style={{ background: `linear-gradient(135deg, ${t.accentGold}12, ${t.accentGreen}08)`, border: `2px solid ${t.accentGold}40`, borderRadius: 14, padding: '36px 40px', marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'DM Sans, sans-serif' }}>The One-Liner</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: t.text, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3, maxWidth: 700, margin: '0 auto' }}>
            "Dutchie is the complete cannabis platform.<br />
            <span style={{ color: t.accentGreen }}>Dex is the AI that makes it smart.</span>"
          </div>
        </div>

        {/* Six recommendations */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 20 }}>Six Recommendations</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                num: 1,
                title: 'Keep the current 5 pillars',
                detail: 'E-Commerce, Loyalty + Marketing, Retail, Nexus, Connect. They work. Customers know them. Sales is trained on them. Don\'t break what\'s working to chase a reorganization.',
                rationale: 'Reorgs confuse customers, confuse sales, and rarely produce enough value to justify the transition cost. The 5-pillar model accurately represents the product surface area.',
                color: '#4AD99A'
              },
              {
                num: 2,
                title: 'Brand the agent as "Dex"',
                detail: 'Give the agent a distinct name, identity, and visual language. Dex is the hero AI product — the thing you demo, the thing that makes people say "wow." It needs its own brand equity.',
                rationale: '"Dutchie Agent" is generic. "Dex" is memorable, short, and can carry its own marketing weight. Every major AI player has a named product (Copilot, Gemini, Claude). Dex is Dutchie\'s.',
                color: t.accentGreen
              },
              {
                num: 3,
                title: 'Keep Nexus as "AI Command Center"',
                detail: 'Nexus is the visual dashboard — charts, alerts, leaderboards, pricing insights. Dex is the conversational interface. They\'re siblings: Nexus shows, Dex tells.',
                rationale: 'Not everyone wants to talk to an AI. Some operators prefer dashboards. Nexus and Dex serve different interaction paradigms. Both are needed.',
                color: t.accentGold
              },
              {
                num: 4,
                title: 'Position Intelligence as platform infrastructure',
                detail: 'Intelligence is not a product customers buy. It\'s the layer that powers Nexus, Dex, smart pricing in Retail, personalization in E-Commerce, and automated segments in Marketing.',
                rationale: 'Trying to sell "Intelligence" as a product creates confusion. Customers don\'t buy infrastructure — they buy outcomes. Intelligence justifies premium pricing on everything else.',
                color: '#4A90D9'
              },
              {
                num: 5,
                title: 'Don\'t add a 6th pillar yet',
                detail: 'Resist the temptation to create a "Dex" pillar or an "AI" pillar. Let Dex live in the Intelligence bar but with prominent branding. It spans all pillars — that\'s its power.',
                rationale: 'Adding a 6th pillar makes the hierarchy more complex without adding clarity. Dex is most powerful as a cross-cutting product, not a silo. Keep the 5 + Intelligence structure.',
                color: '#D94A8E'
              },
              {
                num: 6,
                title: 'Use the Workflows framework for sales narratives',
                detail: 'When talking to customers, frame the product as SELL, GROW, KNOW, BUY — with Dex as the AI that connects everything. This resonates with operators who think in terms of what they need to accomplish.',
                rationale: 'The internal hierarchy (5 pillars) doesn\'t need to match the sales narrative. Internally we organize by product; externally we organize by value delivered.',
                color: '#8B5CF6'
              },
            ].map((rec, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, padding: 20, background: `${rec.color}06`, border: `1px solid ${rec.color}25`, borderRadius: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${rec.color}20`, border: `2px solid ${rec.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: rec.color, fontFamily: 'DM Sans, sans-serif', flexShrink: 0 }}>
                  {rec.num}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>{rec.title}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 10 }}>{rec.detail}</div>
                  <div style={{ fontSize: 12, color: t.textFaint, lineHeight: 1.5, borderTop: `1px solid ${t.border}30`, paddingTop: 8 }}>
                    <span style={{ fontWeight: 600, color: rec.color }}>Rationale:</span> {rec.rationale}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended hierarchy visual */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 20 }}>Recommended Hierarchy — Final State</div>

          {/* 5 pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 12 }}>
            {[
              { name: 'E-Commerce', color: '#4A90D9' },
              { name: 'Loyalty + Marketing', color: '#D94A8E' },
              { name: 'Retail', color: '#4AD99A' },
              { name: 'Nexus', sub: 'AI Command Center', color: t.accentGold },
              { name: 'Connect', color: '#D9764A' },
            ].map((p, i) => (
              <div key={i} style={{ background: `${p.color}10`, border: `1px solid ${p.color}40`, borderRadius: 8, padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.name}</div>
                {p.sub && <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{p.sub}</div>}
              </div>
            ))}
          </div>

          {/* Intelligence + Dex bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
            <div style={{ background: `${t.accentGold}08`, border: `1px dashed ${t.accentGold}30`, borderRadius: 8, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.06em' }}>INTELLIGENCE PLATFORM</span>
                <span style={{ fontSize: 12, color: t.textFaint, marginLeft: 10 }}>Powers everything above. Not sold separately.</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Voice AI', 'Summaries', 'Agentic Commerce', 'Sentiment'].map((f, i) => (
                  <span key={i} style={{ fontSize: 10, color: t.textFaint, background: `${t.border}40`, padding: '2px 6px', borderRadius: 3 }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ background: `${t.accentGreen}12`, border: `2px solid ${t.accentGreen}50`, borderRadius: 8, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.accentGreen }}>Dex</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>AI Agent<br />spans all pillars</div>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.6, textAlign: 'center' }}>
            5 product pillars + 1 Intelligence platform layer + 1 named agent (Dex). Clean, clear, scalable.
          </div>
        </Card>

        {/* Phasing */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 20 }}>Implementation Phasing</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              {
                phase: 'Phase 1', timeline: 'Q2 2026', title: 'Brand & Launch Dex',
                actions: ['Name the agent "Dex" publicly', 'Add Dex to Nexus dashboard', 'Create Dex brand assets (logo, voice, personality)', 'Launch at industry event or webinar'],
                color: t.accentGreen
              },
              {
                phase: 'Phase 2', timeline: 'Q3 2026', title: 'Dex Everywhere',
                actions: ['Dex appears in Retail POS sidebar', 'Dex appears in E-Commerce admin', 'Dex appears in Loyalty + Marketing', '"Ask Dex" becomes the universal AI entry point'],
                color: t.accentGold
              },
              {
                phase: 'Phase 3', timeline: 'Q4 2026', title: 'Dex for B2B',
                actions: ['Dex enters Connect for brand managers', 'B2B-specific intelligence (demand prediction, ordering)', 'Dex bridges retailer and brand data', 'Connect Intelligence becomes a selling point'],
                color: '#D9764A'
              },
              {
                phase: 'Phase 4', timeline: '2027', title: 'Consumer-Facing AI',
                actions: ['Evaluate consumer-facing Dex (for shoppers)', 'Potential: "Ask Dex" on e-commerce storefronts', 'Budtender assist via Dex in-store', 'Only if/when the market is ready'],
                color: '#8B5CF6'
              },
            ].map((p, i) => (
              <div key={i} style={{ border: `1px solid ${p.color}35`, borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ background: `${p.color}12`, padding: '12px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: '0.08em' }}>{p.phase}</div>
                  <div style={{ fontSize: 11, color: t.textFaint }}>{p.timeline}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginTop: 4 }}>{p.title}</div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  {p.actions.map((a, j) => (
                    <div key={j} style={{ fontSize: 12, color: t.textMuted, padding: '4px 0', display: 'flex', gap: 6, alignItems: 'flex-start', lineHeight: 1.5 }}>
                      <span style={{ color: p.color, fontSize: 8, marginTop: 5 }}>&#9679;</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk register */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Risk Register</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
            <thead>
              <tr>
                {['Risk', 'Likelihood', 'Impact', 'Mitigation'].map((h, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${t.border}`, color: t.textFaint, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  risk: 'Dex brand cannibalize Nexus',
                  likelihood: 'Medium',
                  impact: 'High',
                  mitigation: 'Clear positioning: Nexus = see, Dex = ask. Different interaction modes, not competing products.',
                  lColor: t.accentGoldLight,
                  iColor: '#E5534B'
                },
                {
                  risk: 'Customer confusion about Intelligence layer',
                  likelihood: 'High',
                  impact: 'Medium',
                  mitigation: 'Never market Intelligence directly. It\'s always described as "what powers" a specific feature in a specific product.',
                  lColor: '#E5534B',
                  iColor: t.accentGoldLight
                },
                {
                  risk: 'Competitors launch AI agents',
                  likelihood: 'Medium',
                  impact: 'High',
                  mitigation: 'First-mover advantage + depth of data. Dutchie has the most cannabis data — AI is only as good as its data. Race to market with Dex.',
                  lColor: t.accentGoldLight,
                  iColor: '#E5534B'
                },
                {
                  risk: 'Sales team confused by new framework',
                  likelihood: 'High',
                  impact: 'Medium',
                  mitigation: 'Phase rollout. Start with existing 5 pillars, add Dex name. Don\'t change internal structure — change the sales narrative.',
                  lColor: '#E5534B',
                  iColor: t.accentGoldLight
                },
                {
                  risk: 'Dex underperforms at launch',
                  likelihood: 'Medium',
                  impact: 'Very High',
                  mitigation: 'Soft launch to Enterprise customers first. Build case studies before broad rollout. Under-promise, over-deliver.',
                  lColor: t.accentGoldLight,
                  iColor: '#E5534B'
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, color: t.text, fontWeight: 600 }}>{row.risk}</td>
                  <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, color: row.lColor, fontWeight: 600 }}>{row.likelihood}</td>
                  <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, color: row.iColor, fontWeight: 600 }}>{row.impact}</td>
                  <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}30`, color: t.textMuted }}>{row.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Success metrics */}
        <Card t={t} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 }}>Success Metrics — How We Know This Is Working</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { metric: 'Dex trial-to-paid', target: '>40%', desc: 'Of customers who demo Dex, what % convert to Enterprise?', color: t.accentGreen },
              { metric: 'Nexus attach rate', target: '>60%', desc: 'Of Enterprise customers, what % actively use Nexus dashboard?', color: t.accentGold },
              { metric: 'Expansion revenue', target: '+25% YoY', desc: 'Revenue from existing customers upgrading tiers', color: '#4A90D9' },
              { metric: 'Brand awareness', target: 'Top 3', desc: 'Dex recognized as a top 3 AI tool in cannabis industry surveys', color: '#8B5CF6' },
            ].map((m, i) => (
              <div key={i} style={{ border: `1px solid ${m.color}30`, borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: m.color, fontFamily: 'DM Sans, sans-serif' }}>{m.target}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 4 }}>{m.metric}</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginTop: 6, lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Final summary box */}
        <div style={{
          background: `linear-gradient(135deg, ${t.cardBg}, ${t.accentGold}06)`,
          border: `2px solid ${t.accentGold}30`,
          borderRadius: 16,
          padding: '40px 44px',
          marginBottom: 40
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>
            Executive Summary
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>
            Don't reorganize. Rename, reframe, and roll out.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}>What changes:</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                <li>"Dutchie Agent" becomes <strong style={{ color: t.accentGreen }}>Dex</strong></li>
                <li>Intelligence becomes invisible infrastructure, not a product</li>
                <li>Sales narrative shifts to Workflows framework (SELL, GROW, KNOW, BUY, ASK)</li>
                <li>Enterprise tier leads with Nexus + Dex as the AI differentiator</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}>What stays the same:</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                <li>5 product pillars (E-Commerce, Loyalty + Marketing, Retail, Nexus, Connect)</li>
                <li>Nexus as "AI Command Center" (dashboard, not the whole AI brand)</li>
                <li>Connect as independent B2B product</li>
                <li>Starter and Growth bundles (no AI confusion at lower tiers)</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.accentGold, marginBottom: 6 }}>The bottom line:</div>
            <div style={{ fontSize: 15, color: t.text, lineHeight: 1.65 }}>
              The hierarchy doesn't need surgery. It needs a name (Dex), a framework (Workflows), and a phasing plan (Dex in Nexus first, then everywhere, then B2B, then consumer). Ship the brand in Q2, expand through Q3-Q4, and let Dex become the expansion wedge that drives customers from Growth to Enterprise to Full Platform.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px 0 40px', borderTop: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, color: t.textFaint, fontFamily: 'DM Sans, sans-serif' }}>
            Dutchie Product Hierarchy PMM Analysis &middot; Internal Strategy Document &middot; March 2026
          </div>
        </div>

      </div>
    </div>
  );
}

export default HierarchyPMMAnalysis;
