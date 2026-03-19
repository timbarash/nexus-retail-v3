import React, { useState } from 'react';

export function PositioningDeepDive({ theme = 'dark' }) {
  const themes = {
    dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
    light: { bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC', text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680', accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E', accentGreen: '#059669' }
  };
  const t = themes[theme];

  const [expandedModel, setExpandedModel] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  // ── Shared Styles ──────────────────────────────────────────────────
  const pageStyle = {
    fontFamily: '"DM Sans", sans-serif',
    backgroundColor: t.bg,
    color: t.text,
    minHeight: '100vh',
    padding: '48px 24px',
    lineHeight: 1.6,
  };

  const containerStyle = {
    maxWidth: 1120,
    margin: '0 auto',
  };

  const sectionStyle = {
    marginBottom: 72,
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  };

  const sectionNumberStyle = {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: t.accentGold,
    padding: '4px 10px',
    border: `1px solid ${t.accentGold}44`,
    borderRadius: 4,
    background: `${t.accentGold}10`,
  };

  const sectionTitleStyle = {
    fontSize: 32,
    fontWeight: 700,
    color: t.text,
    margin: '8px 0 6px',
    letterSpacing: '-0.02em',
  };

  const sectionSubtitleStyle = {
    fontSize: 16,
    color: t.textMuted,
    marginBottom: 32,
    maxWidth: 720,
    lineHeight: 1.7,
  };

  const cardStyle = {
    backgroundColor: t.cardBg,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    padding: 28,
    marginBottom: 20,
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: t.textFaint,
    marginBottom: 6,
  };

  const getScoreColor = (score) => {
    if (score >= 4) return t.accentGreen;
    if (score === 3) return t.accentGoldLight;
    return '#E05252';
  };

  // ── Helper: Org Chart Node ─────────────────────────────────────────
  const OrgNode = ({ label, sublabel, isRoot, isAI, children, depth = 0 }) => {
    const nodeBg = isRoot
      ? `${t.accentGold}18`
      : isAI
        ? `${t.accentGreen}14`
        : `${t.border}44`;
    const nodeBorder = isRoot
      ? t.accentGold
      : isAI
        ? t.accentGreen
        : t.border;
    const nodeColor = isRoot
      ? t.accentGoldLight
      : isAI
        ? t.accentGreen
        : t.text;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          backgroundColor: nodeBg,
          border: `1px solid ${nodeBorder}`,
          borderRadius: 8,
          padding: '10px 18px',
          textAlign: 'center',
          minWidth: 120,
          position: 'relative',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: nodeColor }}>{label}</div>
          {sublabel && <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{sublabel}</div>}
        </div>
        {children && children.length > 0 && (
          <>
            <div style={{ width: 1, height: 20, backgroundColor: t.border }} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
              {children.length > 1 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: 1,
                  backgroundColor: t.border,
                }} />
              )}
              {children.map((child, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  {child}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // ── Helper: Score Dot ──────────────────────────────────────────────
  const ScoreDots = ({ score, max = 5 }) => (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: i < score ? getScoreColor(score) : `${t.border}88`,
          transition: 'background-color 0.2s',
        }} />
      ))}
      <span style={{ fontSize: 12, fontWeight: 600, color: getScoreColor(score), marginLeft: 6 }}>{score}</span>
    </div>
  );

  // ── Helper: Bar Chart ──────────────────────────────────────────────
  const ScoreBar = ({ label, score, maxScore = 30 }) => {
    const pct = (score / maxScore) * 100;
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: t.textMuted }}>{label}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.accentGoldLight }}>{score}</span>
        </div>
        <div style={{ height: 8, backgroundColor: `${t.border}66`, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${t.accentGold}, ${t.accentGoldLight})`,
            transition: 'width 0.6s ease-out',
          }} />
        </div>
      </div>
    );
  };

  // ── Helper: Quote Card ─────────────────────────────────────────────
  const QuoteCard = ({ audience, oneLiner, fullPitch, accentColor }) => (
    <div style={{
      ...cardStyle,
      borderLeft: `3px solid ${accentColor || t.accentGold}`,
      paddingLeft: 24,
    }}>
      <div style={{ ...labelStyle, color: accentColor || t.accentGold }}>For {audience}</div>
      <div style={{
        fontSize: 20,
        fontWeight: 600,
        color: t.text,
        marginBottom: 12,
        lineHeight: 1.4,
        fontStyle: 'italic',
      }}>
        "{oneLiner}"
      </div>
      <div style={{
        fontSize: 14,
        color: t.textMuted,
        lineHeight: 1.7,
        paddingTop: 12,
        borderTop: `1px solid ${t.border}`,
      }}>
        {fullPitch}
      </div>
    </div>
  );

  // ── Helper: Comparison Row ─────────────────────────────────────────
  const CompRow = ({ label, values, isHeader }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px repeat(5, 1fr)',
      gap: 1,
      backgroundColor: isHeader ? 'transparent' : 'transparent',
    }}>
      <div style={{
        padding: '12px 14px',
        fontSize: isHeader ? 11 : 13,
        fontWeight: isHeader ? 700 : 500,
        color: isHeader ? t.textFaint : t.text,
        textTransform: isHeader ? 'uppercase' : 'none',
        letterSpacing: isHeader ? '0.08em' : 'normal',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
      }}>
        {label}
      </div>
      {values.map((val, idx) => (
        <div key={idx} style={{
          padding: '12px 14px',
          borderBottom: `1px solid ${t.border}`,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {isHeader ? (
            <span style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{val}</span>
          ) : (
            <ScoreDots score={val} />
          )}
        </div>
      ))}
    </div>
  );

  // ── Data ────────────────────────────────────────────────────────────
  const analogies = [
    {
      company: 'Salesforce',
      aiName: 'Einstein AI',
      approach: 'AI as a Layer',
      description: 'Einstein is embedded across Sales Cloud, Service Cloud, Marketing Cloud. It\'s an intelligence layer that enhances each product without becoming a standalone product.',
      lesson: 'Customers don\'t buy "Einstein" — they buy Sales Cloud and get AI for free. This keeps AI as a value-add, not a revenue center.',
    },
    {
      company: 'Microsoft',
      aiName: 'Copilot',
      approach: 'AI as a Branded Product',
      description: 'Copilot is a single brand that appears in Word, Excel, Teams, GitHub, Windows, and Bing. One name, many surfaces.',
      lesson: 'Copilot IS a product you pay extra for. It has its own pricing, its own marketing, its own identity. This makes AI a revenue driver.',
    },
    {
      company: 'Google',
      aiName: 'Gemini',
      approach: 'AI as Platform Rebrand',
      description: 'Google replaced Bard with Gemini and is rebuilding its entire product identity around AI-first. Gemini is in Search, Workspace, Android, Cloud.',
      lesson: 'When AI IS the product, the company\'s identity shifts. Risky if the existing brand is strong, powerful if you\'re going all-in.',
    },
    {
      company: 'Adobe',
      aiName: 'Firefly / Sensei',
      approach: 'AI as Both',
      description: 'Sensei powers background AI across Adobe apps. Firefly is a named generative AI product. They have both a layer and a brand.',
      lesson: 'You can do both — invisible AI for existing features AND a named AI product for new capabilities. But managing two AI narratives is complex.',
    },
  ];

  const approachComparison = [
    {
      approach: 'Option A: AI as Feature',
      example: '"Dutchie POS with AI"',
      pros: ['No new names to learn', 'Immediate customer understanding', 'Easy upgrade story'],
      cons: ['AI feels invisible', 'Hard to charge premium', 'No AI brand identity', 'Competitors can claim same'],
    },
    {
      approach: 'Option B: AI as Product',
      example: '"Dex" / "Nexus"',
      pros: ['Strong identity', 'Can price independently', 'Memorable marketing', 'Platform potential'],
      cons: ['New name to establish', 'Potential confusion', 'Customers ask "do I need this?"'],
    },
    {
      approach: 'Option C: AI as Platform',
      example: '"Dutchie AI"',
      pros: ['Everything under one roof', 'Clear AI-first identity', 'Strong platform narrative'],
      cons: ['May dilute existing brands', 'Big naming transition', 'Customers may resist rebrand'],
    },
  ];

  const scoringData = {
    criteria: ['Simplicity', 'Differentiation', 'Sales Story', 'Brand Equity', 'Scalability', 'Cross-sell'],
    models: [
      { name: 'AI as Feature', scores: [5, 1, 4, 5, 2, 3], total: 20 },
      { name: 'Copilot Model', scores: [4, 3, 5, 4, 3, 5], total: 24 },
      { name: 'Suite Model', scores: [2, 4, 3, 2, 4, 4], total: 19 },
      { name: 'Platform Model', scores: [4, 5, 4, 2, 5, 4], total: 24 },
      { name: 'Ecosystem', scores: [3, 4, 4, 4, 5, 3], total: 23 },
    ],
  };

  const phases = [
    {
      label: 'Phase 1',
      time: 'Now — Q2 2026',
      title: 'Launch Dex in POS',
      description: 'Introduce Dex as the AI assistant inside Dutchie POS. Focus on budtender workflows: product recommendations, customer lookup, compliance checks. Build the habit of "asking Dex."',
      milestones: ['Dex beta in 20 pilot dispensaries', 'Budtender assistant v1 (product lookup, customer matching)', 'Internal positioning deck finalized', 'Sales team trained on Dex narrative'],
      color: t.accentGold,
    },
    {
      label: 'Phase 2',
      time: 'Q3 2026',
      title: 'Expand Dex Across Surfaces',
      description: 'Bring Dex to Connect (B2B ordering intelligence) and Ecommerce (personalized recommendations). Dex becomes the consistent AI touchpoint across all Dutchie products.',
      milestones: ['Dex in Connect: smart reorder suggestions for retailers', 'Dex in Ecommerce: personalized menus for consumers', 'Unified Dex branding across all product surfaces', 'First Dex-specific pricing tier introduced'],
      color: t.accentGoldLight,
    },
    {
      label: 'Phase 3',
      time: 'Q4 2026',
      title: 'Introduce Nexus Dashboard',
      description: 'Launch Nexus as the intelligence and analytics hub — the "brain" behind Dex. This is where operators go for demand forecasting, market intelligence, and cross-product insights.',
      milestones: ['Nexus dashboard launch with analytics migration from Plus', 'Demand forecasting module (AI-powered inventory)', 'Market intelligence: competitive pricing, trend analysis', 'Nexus API beta for enterprise integrations'],
      color: t.accentGoldLighter,
    },
    {
      label: 'Phase 4',
      time: '2027',
      title: 'Full AI Platform Positioning',
      description: 'Complete the transition. Dutchie is now a cannabis technology platform powered by AI, with Dex as the interface layer and Nexus as the intelligence layer. New products launch under this architecture.',
      milestones: ['Dutchie marketing refresh: "Powered by Dex"', 'Nexus opens to third-party data providers', 'Dex handles 40%+ of routine operational decisions', 'Industry recognition as AI-first cannabis platform'],
      color: t.accentGreen,
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 72, paddingTop: 24 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            border: `1px solid ${t.accentGold}33`,
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            color: t.accentGold,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
            background: `${t.accentGold}08`,
          }}>
            Strategic Product Positioning
          </div>
          <h1 style={{
            fontSize: 48,
            fontWeight: 800,
            color: t.text,
            margin: '0 0 16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Naming & Positioning the
            <br />
            <span style={{ color: t.accentGoldLight }}>Dutchie AI Product Suite</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: t.textMuted,
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            A deep analysis of how to structure, name, and position AI products within the
            Dutchie platform ecosystem. Five hierarchy models, scoring frameworks, and
            go-to-market phasing.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginTop: 32,
            flexWrap: 'wrap',
          }}>
            {['POS', 'Payments', 'Ecommerce', 'Connect', 'Plus'].map((product) => (
              <div key={product} style={{
                fontSize: 13,
                fontWeight: 600,
                color: t.textFaint,
                padding: '6px 14px',
                border: `1px solid ${t.border}`,
                borderRadius: 6,
              }}>
                Dutchie {product}
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 12,
            color: t.textFaint,
            marginTop: 12,
          }}>
            Current product portfolio — where does AI fit in?
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1: THE POSITIONING PROBLEM
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 01</span>
          </div>
          <h2 style={sectionTitleStyle}>The Positioning Problem</h2>
          <p style={sectionSubtitleStyle}>
            Dutchie has a mature platform serving dispensaries and brands. Now AI enters the picture.
            The fundamental question isn't what the AI does — it's how it lives within the existing product architecture.
          </p>

          {/* Three Options */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320, 1fr))', gap: 16, marginBottom: 40 }}>
            {approachComparison.map((item, idx) => (
              <div key={idx} style={{
                ...cardStyle,
                borderTop: `3px solid ${idx === 0 ? t.textFaint : idx === 1 ? t.accentGold : t.accentGreen}`,
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 4 }}>
                  {item.approach}
                </div>
                <div style={{
                  fontSize: 14,
                  color: t.accentGoldLight,
                  marginBottom: 16,
                  fontStyle: 'italic',
                }}>
                  e.g., {item.example}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...labelStyle, color: t.accentGreen }}>Advantages</div>
                  {item.pros.map((p, i) => (
                    <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '3px 0', display: 'flex', gap: 8 }}>
                      <span style={{ color: t.accentGreen, flexShrink: 0 }}>+</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ ...labelStyle, color: '#E05252' }}>Risks</div>
                  {item.cons.map((c, i) => (
                    <div key={i} style={{ fontSize: 13, color: t.textMuted, padding: '3px 0', display: 'flex', gap: 8 }}>
                      <span style={{ color: '#E05252', flexShrink: 0 }}>-</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Real-World Analogies */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 20 }}>
            Real-World Analogies: How Tech Giants Named Their AI
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {analogies.map((a, idx) => (
              <div key={idx} style={{
                ...cardStyle,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{a.company}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.accentGoldLight }}>{a.aiName}</div>
                  </div>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: t.accentGold,
                    padding: '4px 8px',
                    border: `1px solid ${t.accentGold}33`,
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                  }}>
                    {a.approach}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 12, flex: 1 }}>
                  {a.description}
                </div>
                <div style={{
                  fontSize: 13,
                  color: t.text,
                  padding: '10px 12px',
                  backgroundColor: `${t.accentGold}08`,
                  borderRadius: 6,
                  borderLeft: `2px solid ${t.accentGold}44`,
                  lineHeight: 1.5,
                }}>
                  <strong style={{ color: t.accentGold }}>Lesson:</strong> {a.lesson}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2: FIVE HIERARCHY MODELS
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 02</span>
          </div>
          <h2 style={sectionTitleStyle}>Five Hierarchy Models</h2>
          <p style={sectionSubtitleStyle}>
            Each model represents a different philosophy for where AI lives within the Dutchie brand.
            Click to expand the full architecture and analysis.
          </p>

          {/* ── Model 1: Salesforce ─────────────────────────────────── */}
          <div style={{ ...cardStyle, cursor: 'pointer', marginBottom: 24 }} onClick={() => setExpandedModel(expandedModel === 1 ? null : 1)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expandedModel === 1 ? 20 : 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGold, padding: '2px 8px', background: `${t.accentGold}15`, borderRadius: 4 }}>MODEL 1</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>The Salesforce Model</span>
                </div>
                <div style={{ fontSize: 14, color: t.textMuted }}>AI as an Intelligence Layer that powers all existing products</div>
              </div>
              <div style={{ fontSize: 20, color: t.textFaint, transform: expandedModel === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                {expandedModel === 1 ? '\u25B2' : '\u25BC'}
              </div>
            </div>
            {expandedModel === 1 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', overflowX: 'auto' }}>
                  <OrgNode label="Dutchie" sublabel="Parent Brand" isRoot>
                    {[
                      <OrgNode label="Dutchie POS" sublabel="Point of Sale" />,
                      <OrgNode label="Dutchie Payments" sublabel="Processing" />,
                      <OrgNode label="Dutchie Ecommerce" sublabel="Online Ordering" />,
                      <OrgNode label="Dutchie Connect" sublabel="B2B Marketplace" />,
                      <OrgNode label="Dutchie AI" sublabel="Powers All Above" isAI>
                        {[
                          <OrgNode label="Smart Recs" sublabel="Product Matching" isAI />,
                          <OrgNode label="Forecasting" sublabel="Demand Planning" isAI />,
                          <OrgNode label="Agent Assist" sublabel="The 'Dex' Concept" isAI />,
                          <OrgNode label="Market Intel" sublabel="Analytics" isAI />,
                        ]}
                      </OrgNode>,
                    ]}
                  </OrgNode>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div style={{ padding: 16, backgroundColor: `${t.accentGreen}08`, borderRadius: 8, border: `1px solid ${t.accentGreen}22` }}>
                    <div style={{ ...labelStyle, color: t.accentGreen }}>Strengths</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Simple for customers: existing products still exist as-is</li>
                      <li>AI feels like a natural evolution, not a forced addition</li>
                      <li>Low risk — no brand confusion or naming overhead</li>
                      <li>Easy to sell: "Your same Dutchie POS, now smarter"</li>
                    </ul>
                  </div>
                  <div style={{ padding: 16, backgroundColor: '#E0525208', borderRadius: 8, border: '1px solid #E0525222' }}>
                    <div style={{ ...labelStyle, color: '#E05252' }}>Weaknesses</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>AI feels like an add-on, not a strategic differentiator</li>
                      <li>Hard to charge separately for AI features</li>
                      <li>No distinct AI brand for marketing or press</li>
                      <li>Competitors can easily claim "we also added AI"</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Model 2: Copilot ────────────────────────────────────── */}
          <div style={{ ...cardStyle, cursor: 'pointer', marginBottom: 24 }} onClick={() => setExpandedModel(expandedModel === 2 ? null : 2)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expandedModel === 2 ? 20 : 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGoldLight, padding: '2px 8px', background: `${t.accentGoldLight}15`, borderRadius: 4 }}>MODEL 2</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>The Copilot Model</span>
                </div>
                <div style={{ fontSize: 14, color: t.textMuted }}>One AI brand — "Dex" — that surfaces across every product</div>
              </div>
              <div style={{ fontSize: 20, color: t.textFaint, transform: expandedModel === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                {expandedModel === 2 ? '\u25B2' : '\u25BC'}
              </div>
            </div>
            {expandedModel === 2 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', overflowX: 'auto' }}>
                  <OrgNode label="Dutchie" sublabel="Parent Brand" isRoot>
                    {[
                      <OrgNode label="Products" sublabel="Existing Suite">
                        {[
                          <OrgNode label="POS" />,
                          <OrgNode label="Payments" />,
                          <OrgNode label="Ecommerce" />,
                          <OrgNode label="Connect" />,
                        ]}
                      </OrgNode>,
                      <OrgNode label="Dex" sublabel="AI Copilot" isAI>
                        {[
                          <OrgNode label="Dex in POS" sublabel="Budtender Assistant" isAI />,
                          <OrgNode label="Dex in Connect" sublabel="Ordering Intel" isAI />,
                          <OrgNode label="Dex in Ecom" sublabel="Personal Recs" isAI />,
                          <OrgNode label="Dex Insights" sublabel="Standalone Analytics" isAI />,
                        ]}
                      </OrgNode>,
                    ]}
                  </OrgNode>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div style={{ padding: 16, backgroundColor: `${t.accentGreen}08`, borderRadius: 8, border: `1px solid ${t.accentGreen}22` }}>
                    <div style={{ ...labelStyle, color: t.accentGreen }}>Strengths</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>One memorable AI name to market and invest in</li>
                      <li>Dex appears in every product — instant cross-sell</li>
                      <li>Can price Dex as a premium add-on tier</li>
                      <li>Strong brand character — people can "talk to Dex"</li>
                    </ul>
                  </div>
                  <div style={{ padding: 16, backgroundColor: '#E0525208', borderRadius: 8, border: '1px solid #E0525222' }}>
                    <div style={{ ...labelStyle, color: '#E05252' }}>Weaknesses</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Dex might feel "thin" if it does too many different things</li>
                      <li>Risk of overpromising — is Dex really great at everything?</li>
                      <li>Doesn't address the analytics/dashboard product question</li>
                      <li>May need a second name for the intelligence platform anyway</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Model 3: Suite ──────────────────────────────────────── */}
          <div style={{ ...cardStyle, cursor: 'pointer', marginBottom: 24 }} onClick={() => setExpandedModel(expandedModel === 3 ? null : 3)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expandedModel === 3 ? 20 : 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGoldLighter, padding: '2px 8px', background: `${t.accentGoldLighter}15`, borderRadius: 4 }}>MODEL 3</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>The Suite Model</span>
                </div>
                <div style={{ fontSize: 14, color: t.textMuted }}>B2C and B2B split into distinct AI suites with dedicated products</div>
              </div>
              <div style={{ fontSize: 20, color: t.textFaint, transform: expandedModel === 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                {expandedModel === 3 ? '\u25B2' : '\u25BC'}
              </div>
            </div>
            {expandedModel === 3 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', overflowX: 'auto' }}>
                  <OrgNode label="Dutchie AI" sublabel="AI Platform" isRoot>
                    {[
                      <OrgNode label="Retail Suite" sublabel="B2C" isAI>
                        {[
                          <OrgNode label="Nexus" sublabel="AI Retail Platform" isAI />,
                          <OrgNode label="Dex" sublabel="AI Copilot" isAI />,
                          <OrgNode label="Consumer AI" sublabel="Recommendations" isAI />,
                        ]}
                      </OrgNode>,
                      <OrgNode label="Commerce Suite" sublabel="B2B" isAI>
                        {[
                          <OrgNode label="Connect" sublabel="B2B Marketplace" />,
                          <OrgNode label="Deal" sublabel="Trade Promo AI" isAI />,
                          <OrgNode label="Dock" sublabel="Supply Chain Intel" isAI />,
                        ]}
                      </OrgNode>,
                    ]}
                  </OrgNode>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div style={{ padding: 16, backgroundColor: `${t.accentGreen}08`, borderRadius: 8, border: `1px solid ${t.accentGreen}22` }}>
                    <div style={{ ...labelStyle, color: t.accentGreen }}>Strengths</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Clean separation between retail and commerce buyers</li>
                      <li>Can market each suite to different audiences</li>
                      <li>Maximum product naming flexibility</li>
                      <li>Each suite can evolve independently</li>
                    </ul>
                  </div>
                  <div style={{ padding: 16, backgroundColor: '#E0525208', borderRadius: 8, border: '1px solid #E0525222' }}>
                    <div style={{ ...labelStyle, color: '#E05252' }}>Weaknesses</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Too many names — Nexus, Dex, Deal, Dock, Connect...</li>
                      <li>Customers won't remember which is which</li>
                      <li>Complex story for sales team to tell</li>
                      <li>Splits the marketing budget across too many brands</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Model 4: Platform ───────────────────────────────────── */}
          <div style={{ ...cardStyle, cursor: 'pointer', marginBottom: 24 }} onClick={() => setExpandedModel(expandedModel === 4 ? null : 4)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expandedModel === 4 ? 20 : 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGreen, padding: '2px 8px', background: `${t.accentGreen}15`, borderRadius: 4 }}>MODEL 4</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>The Platform Model</span>
                </div>
                <div style={{ fontSize: 14, color: t.textMuted }}>One unified name — "Nexus" — encompasses the entire platform</div>
              </div>
              <div style={{ fontSize: 20, color: t.textFaint, transform: expandedModel === 4 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                {expandedModel === 4 ? '\u25B2' : '\u25BC'}
              </div>
            </div>
            {expandedModel === 4 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', overflowX: 'auto' }}>
                  <OrgNode label="Nexus" sublabel="The Platform" isRoot>
                    {[
                      <OrgNode label="Nexus Retail" sublabel="POS + Ecom + AI" isAI />,
                      <OrgNode label="Nexus Agent" sublabel="Dex Assistant" isAI />,
                      <OrgNode label="Nexus Connect" sublabel="B2B Marketplace" />,
                      <OrgNode label="Nexus Insights" sublabel="Analytics + Forecast" isAI />,
                      <OrgNode label="Nexus API" sublabel="Developer Platform" />,
                    ]}
                  </OrgNode>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div style={{ padding: 16, backgroundColor: `${t.accentGreen}08`, borderRadius: 8, border: `1px solid ${t.accentGreen}22` }}>
                    <div style={{ ...labelStyle, color: t.accentGreen }}>Strengths</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>One brand to rule them all — maximum simplicity</li>
                      <li>Strong platform narrative for investors and press</li>
                      <li>Everything feels connected and intentional</li>
                      <li>Best scalability: any new product is "Nexus [Name]"</li>
                    </ul>
                  </div>
                  <div style={{ padding: 16, backgroundColor: '#E0525208', borderRadius: 8, border: '1px solid #E0525222' }}>
                    <div style={{ ...labelStyle, color: '#E05252' }}>Weaknesses</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Loses all existing Dutchie brand equity</li>
                      <li>Customers must re-learn the product names</li>
                      <li>Big-bang rebrand is risky and expensive</li>
                      <li>"Nexus" alone doesn't communicate cannabis/dispensary</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Model 5: Ecosystem ──────────────────────────────────── */}
          <div style={{ ...cardStyle, cursor: 'pointer', marginBottom: 24 }} onClick={() => setExpandedModel(expandedModel === 5 ? null : 5)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expandedModel === 5 ? 20 : 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.accentGoldLight, padding: '2px 8px', background: `${t.accentGoldLight}15`, borderRadius: 4 }}>MODEL 5</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: t.text }}>The Ecosystem Model</span>
                </div>
                <div style={{ fontSize: 14, color: t.textMuted }}>Dutchie as parent brand with distinctly named AI products alongside existing products</div>
              </div>
              <div style={{ fontSize: 20, color: t.textFaint, transform: expandedModel === 5 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                {expandedModel === 5 ? '\u25B2' : '\u25BC'}
              </div>
            </div>
            {expandedModel === 5 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', overflowX: 'auto' }}>
                  <OrgNode label="Dutchie" sublabel="Trusted Parent Brand" isRoot>
                    {[
                      <OrgNode label="Dex" sublabel="AI Assistant" isAI />,
                      <OrgNode label="Nexus" sublabel="Intelligence Platform" isAI />,
                      <OrgNode label="Connect" sublabel="B2B Marketplace" />,
                      <OrgNode label="Plus" sublabel="Analytics" />,
                      <OrgNode label="POS / Payments / Ecom" sublabel="Core Products" />,
                    ]}
                  </OrgNode>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div style={{ padding: 16, backgroundColor: `${t.accentGreen}08`, borderRadius: 8, border: `1px solid ${t.accentGreen}22` }}>
                    <div style={{ ...labelStyle, color: t.accentGreen }}>Strengths</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Dutchie brand stays strong, new products have character</li>
                      <li>Each product has a clear identity and purpose</li>
                      <li>Mix of familiar (POS) and exciting (Dex, Nexus)</li>
                      <li>Most flexible for future products</li>
                    </ul>
                  </div>
                  <div style={{ padding: 16, backgroundColor: '#E0525208', borderRadius: 8, border: '1px solid #E0525222' }}>
                    <div style={{ ...labelStyle, color: '#E05252' }}>Weaknesses</div>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: t.textMuted, lineHeight: 1.8 }}>
                      <li>Name proliferation: POS, Payments, Ecom, Plus, Connect, Dex, Nexus</li>
                      <li>"What's the difference between Nexus and Plus?"</li>
                      <li>No clear organizing principle for new vs. old products</li>
                      <li>Sales team needs a cheat sheet for positioning each one</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3: THE NAMING MATRIX
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 03</span>
          </div>
          <h2 style={sectionTitleStyle}>The Naming Matrix</h2>
          <p style={sectionSubtitleStyle}>
            A systematic evaluation of each model across six critical dimensions.
            Scores from 1 (worst) to 5 (best), color-coded: green is 4+, gold is 3, red is 2 or below.
          </p>

          {/* Score Matrix Table */}
          <div style={{ ...cardStyle, overflowX: 'auto', padding: 0 }}>
            <CompRow
              label="Criteria"
              values={scoringData.models.map(m => m.name)}
              isHeader
            />
            {scoringData.criteria.map((criterion, cIdx) => (
              <CompRow
                key={cIdx}
                label={criterion}
                values={scoringData.models.map(m => m.scores[cIdx])}
              />
            ))}
            {/* Totals Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '180px repeat(5, 1fr)',
              gap: 1,
              backgroundColor: `${t.accentGold}08`,
            }}>
              <div style={{
                padding: '14px',
                fontSize: 14,
                fontWeight: 700,
                color: t.accentGold,
              }}>
                TOTAL
              </div>
              {scoringData.models.map((m, idx) => (
                <div key={idx} style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  color: m.total >= 24 ? t.accentGreen : m.total >= 22 ? t.accentGoldLight : t.textMuted,
                }}>
                  {m.total}
                  <span style={{ fontSize: 12, color: t.textFaint, fontWeight: 400 }}>/30</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart Comparison */}
          <div style={{ ...cardStyle, marginTop: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 20 }}>
              Total Score Comparison
            </h3>
            {scoringData.models.map((m, idx) => (
              <ScoreBar key={idx} label={m.name} score={m.total} maxScore={30} />
            ))}
            <div style={{
              marginTop: 20,
              padding: 16,
              backgroundColor: `${t.accentGreen}08`,
              borderRadius: 8,
              border: `1px solid ${t.accentGreen}22`,
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: t.accentGreen }}>Key Takeaway:</strong> The Copilot Model and Platform Model tie at 24/30, followed closely by the Ecosystem Model at 23/30.
              The Copilot Model wins on Sales Story and Cross-sell. The Platform Model wins on Differentiation and Scalability.
              The recommended approach combines both.
            </div>
          </div>

          {/* Detailed Breakdown Per Criterion */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginTop: 24 }}>
            {scoringData.criteria.map((criterion, cIdx) => {
              const scores = scoringData.models.map((m, mIdx) => ({ name: m.name, score: m.scores[cIdx] }));
              const best = scores.reduce((a, b) => a.score > b.score ? a : b);
              return (
                <div key={cIdx} style={cardStyle}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 12 }}>{criterion}</div>
                  {scores.map((s, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                      <span style={{ fontSize: 13, color: s.name === best.name ? t.text : t.textMuted, fontWeight: s.name === best.name ? 600 : 400 }}>
                        {s.name === best.name ? '\u2605 ' : ''}{s.name}
                      </span>
                      <ScoreDots score={s.score} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4: RECOMMENDED POSITIONING
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 04</span>
          </div>
          <h2 style={sectionTitleStyle}>Recommended Positioning</h2>
          <p style={sectionSubtitleStyle}>
            Based on the analysis above, we recommend a hybrid approach that captures the strengths of both
            the Copilot Model and the Ecosystem Model, while preserving Dutchie's hard-earned brand equity.
          </p>

          {/* Primary Recommendation */}
          <div style={{
            ...cardStyle,
            border: `2px solid ${t.accentGold}44`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${t.accentGold}, ${t.accentGoldLight}, ${t.accentGreen})`,
            }} />
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: `${t.accentGold}15`,
              border: `1px solid ${t.accentGold}33`,
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              color: t.accentGold,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              Primary Recommendation
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: t.text, marginBottom: 8, letterSpacing: '-0.01em' }}>
              Hybrid Copilot + Ecosystem
            </h3>
            <p style={{ fontSize: 15, color: t.textMuted, marginBottom: 24, lineHeight: 1.7, maxWidth: 700 }}>
              Combine Models 2 and 5: keep Dutchie as the trusted parent brand, launch "Dex" as the
              singular AI copilot that appears across every product surface, and use "Nexus" as the
              intelligence dashboard and admin experience.
            </p>

            {/* Recommendation Hierarchy Diagram */}
            <div style={{
              backgroundColor: `${t.bg}`,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              padding: 32,
              marginBottom: 24,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  background: `linear-gradient(135deg, ${t.accentGold}22, ${t.accentGold}08)`,
                  border: `2px solid ${t.accentGold}`,
                  borderRadius: 10,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: t.accentGoldLight }}>Dutchie</div>
                  <div style={{ fontSize: 12, color: t.textFaint }}>Trusted Parent Brand</div>
                </div>
              </div>

              {/* Connecting line */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <div style={{ width: 1, height: 24, backgroundColor: t.border }} />
              </div>

              {/* AI Products Row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <div style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <div style={{
                    padding: '14px 24px',
                    background: `linear-gradient(135deg, ${t.accentGreen}18, ${t.accentGreen}08)`,
                    border: `2px solid ${t.accentGreen}`,
                    borderRadius: 10,
                    textAlign: 'center',
                    minWidth: 180,
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: t.accentGreen }}>Dex</div>
                    <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>AI Copilot — The Face</div>
                    <div style={{ fontSize: 10, color: t.textMuted, marginTop: 6, lineHeight: 1.4 }}>Shows up in POS, Connect,<br />Ecommerce. Users talk to Dex.</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <div style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <div style={{
                    padding: '14px 24px',
                    background: `linear-gradient(135deg, ${t.accentGoldLight}18, ${t.accentGoldLight}08)`,
                    border: `2px solid ${t.accentGoldLight}`,
                    borderRadius: 10,
                    textAlign: 'center',
                    minWidth: 180,
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: t.accentGoldLight }}>Nexus</div>
                    <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>Intelligence Hub — The Brain</div>
                    <div style={{ fontSize: 10, color: t.textMuted, marginTop: 6, lineHeight: 1.4 }}>Admin dashboard, analytics,<br />forecasting, market intel.</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <div style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <div style={{
                    padding: '14px 24px',
                    background: `${t.border}33`,
                    border: `1px solid ${t.border}`,
                    borderRadius: 10,
                    textAlign: 'center',
                    minWidth: 180,
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Connect</div>
                    <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>B2B Marketplace</div>
                    <div style={{ fontSize: 10, color: t.textMuted, marginTop: 6, lineHeight: 1.4 }}>Keeps existing name.<br />Enhanced by Dex AI.</div>
                  </div>
                </div>
              </div>

              {/* Existing Products */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <div style={{
                  display: 'flex',
                  gap: 8,
                  padding: '12px 20px',
                  backgroundColor: `${t.border}22`,
                  borderRadius: 8,
                  border: `1px dashed ${t.border}`,
                }}>
                  {['POS', 'Payments', 'Ecommerce', 'Plus'].map((p) => (
                    <div key={p} style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 500,
                      color: t.textFaint,
                      backgroundColor: `${t.cardBg}`,
                      borderRadius: 4,
                      border: `1px solid ${t.border}`,
                    }}>
                      {p}
                    </div>
                  ))}
                  <div style={{ alignSelf: 'center', fontSize: 11, color: t.textFaint, marginLeft: 8 }}>
                    Existing products, unchanged
                  </div>
                </div>
              </div>
            </div>

            {/* Rationale Points */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { title: 'Dutchie = Trust', detail: 'Keep the parent brand front and center. Every customer knows Dutchie. New products live under this umbrella.' },
                { title: 'Dex = The Interface', detail: 'One AI name across all surfaces. Budtenders, operators, and shoppers all interact with "Dex." Easy to market, easy to remember.' },
                { title: 'Nexus = The Brain', detail: 'The intelligence dashboard for operators. Where you go to see forecasts, analytics, and insights. Dex lives here too.' },
                { title: 'Connect = The Network', detail: 'Keep the existing B2B name. It\'s established. Dex enhances it with smart ordering suggestions.' },
              ].map((point, idx) => (
                <div key={idx} style={{
                  padding: 16,
                  backgroundColor: `${t.bg}`,
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.accentGoldLight, marginBottom: 6 }}>{point.title}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{point.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Runner-Up Recommendation */}
          <div style={{ ...cardStyle, marginTop: 24 }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: `${t.textFaint}15`,
              border: `1px solid ${t.textFaint}33`,
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              color: t.textFaint,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              Runner-up
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 }}>
              Platform Model: "Dutchie Nexus"
            </h3>
            <p style={{ fontSize: 14, color: t.textMuted, marginBottom: 20, lineHeight: 1.7 }}>
              For a bolder move, rebrand the AI platform as "Dutchie Nexus" — the AI-powered cannabis
              platform. Sub-products become Nexus POS, Nexus Connect, Nexus Agent (Dex).
              This is the right play if Dutchie wants to make a complete AI-first pivot.
            </p>

            <div style={{
              backgroundColor: `${t.bg}`,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              padding: 24,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 28px',
                  background: `${t.accentGold}12`,
                  border: `1px solid ${t.accentGold}66`,
                  borderRadius: 8,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGoldLight }}>Dutchie Nexus</div>
                  <div style={{ fontSize: 11, color: t.textFaint }}>The AI Platform</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { name: 'Nexus POS', desc: 'AI-powered retail' },
                  { name: 'Nexus Connect', desc: 'B2B marketplace' },
                  { name: 'Nexus Agent', desc: 'Dex assistant' },
                  { name: 'Nexus Insights', desc: 'Analytics' },
                  { name: 'Nexus API', desc: 'Developer platform' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '10px 16px',
                    backgroundColor: t.cardBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: 6,
                    textAlign: 'center',
                    minWidth: 130,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: t.textFaint }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: 16,
              padding: 14,
              backgroundColor: `${t.accentGold}06`,
              border: `1px solid ${t.accentGold}22`,
              borderRadius: 8,
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: t.accentGold }}>When to choose this instead:</strong> If Dutchie's
              investor narrative requires a dramatic "AI platform" moment, or if competitors are about to
              launch similar AI products and Dutchie needs to stake a bold claim first.
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5: THE ELEVATOR PITCHES
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 05</span>
          </div>
          <h2 style={sectionTitleStyle}>The Elevator Pitches</h2>
          <p style={sectionSubtitleStyle}>
            For each hierarchy model, here's how you'd pitch it in one sentence and three sentences.
            These are written as they'd appear in actual marketing materials.
          </p>

          <QuoteCard
            audience="Dispensary Operators"
            accentColor={t.textFaint}
            oneLiner="Dutchie POS now comes with built-in AI that helps your budtenders sell smarter and restock faster."
            fullPitch="Your Dutchie POS just got an upgrade. Built-in AI now powers product recommendations for your budtenders, predicts when you'll run low on top sellers, and automates compliance checks — all without leaving the register. No new software to learn. Just your same Dutchie, now powered by intelligence."
          />

          <QuoteCard
            audience="Dispensary Operators & Staff"
            accentColor={t.accentGoldLight}
            oneLiner="Meet Dex — your AI-powered copilot that lives inside every Dutchie product."
            fullPitch="Dex is the AI assistant built into every Dutchie product. In POS, Dex helps budtenders recommend the perfect product. In Connect, Dex spots reorder opportunities before you run out. In Ecommerce, Dex personalizes every shopper's menu. One AI, everywhere you work."
          />

          <QuoteCard
            audience="Multi-Location Operators"
            accentColor={t.accentGoldLighter}
            oneLiner="Dutchie AI brings you two suites — Retail for your stores and Commerce for your supply chain — each powered by dedicated AI."
            fullPitch="Dutchie AI's Retail Suite puts Nexus (our AI retail platform) and Dex (your AI copilot) in every store. The Commerce Suite transforms your supply chain with Connect, Deal for trade promotions, and Dock for supply chain intelligence. Two suites, one mission: make cannabis retail intelligent end to end."
          />

          <QuoteCard
            audience="The Cannabis Industry"
            accentColor={t.accentGreen}
            oneLiner="Nexus is the AI-powered cannabis platform — POS, payments, ecommerce, B2B ordering, and analytics, all unified under one intelligent system."
            fullPitch="Nexus brings everything together. Nexus Retail handles your POS and ecommerce with built-in AI. Nexus Connect powers your B2B ordering. Nexus Agent (our AI assistant, Dex) handles the day-to-day decisions. And Nexus Insights gives you forecasting and analytics across your entire operation. One platform, total intelligence."
          />

          <QuoteCard
            audience="Dispensary Owners & Operators"
            accentColor={t.accentGold}
            oneLiner="Dutchie is the cannabis technology platform. Now meet Dex, your AI assistant, and Nexus, your intelligence dashboard."
            fullPitch="You already trust Dutchie for POS, payments, ecommerce, and B2B ordering. Now we're adding two new members to the family. Dex is your AI copilot — ask it anything, in any Dutchie product. Nexus is your intelligence hub — see demand forecasts, market trends, and operational insights in one place. Same Dutchie you know, with the AI tools you need."
          />
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 6: GO-TO-MARKET PHASING
            ════════════════════════════════════════════════════════════ */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span style={sectionNumberStyle}>Section 06</span>
          </div>
          <h2 style={sectionTitleStyle}>Go-to-Market Phasing</h2>
          <p style={sectionSubtitleStyle}>
            Rolling out a new naming architecture isn't a single launch — it's a phased transition.
            Here's how to introduce Dex and Nexus over four phases without confusing existing customers.
          </p>

          {/* Timeline Visualization */}
          <div style={{ ...cardStyle, padding: '32px 28px' }}>
            {/* Phase Selector Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {phases.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '8px 18px',
                    border: `1px solid ${activePhase === idx ? phase.color : t.border}`,
                    borderRadius: 6,
                    backgroundColor: activePhase === idx ? `${phase.color}15` : 'transparent',
                    color: activePhase === idx ? phase.color : t.textFaint,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {phase.label}: {phase.time}
                </button>
              ))}
            </div>

            {/* Timeline Bar */}
            <div style={{ position: 'relative', marginBottom: 40 }}>
              {/* Track */}
              <div style={{
                height: 4,
                backgroundColor: `${t.border}66`,
                borderRadius: 2,
                position: 'relative',
              }}>
                {/* Progress Fill */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${((activePhase + 1) / phases.length) * 100}%`,
                  background: `linear-gradient(90deg, ${phases[0].color}, ${phases[activePhase].color})`,
                  borderRadius: 2,
                  transition: 'width 0.4s ease-out',
                }} />
              </div>

              {/* Phase Markers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: -8 }}>
                {phases.map((phase, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => setActivePhase(idx)}
                  >
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: idx <= activePhase ? phase.color : `${t.border}88`,
                      border: `3px solid ${idx === activePhase ? phase.color : t.cardBg}`,
                      transition: 'all 0.3s',
                      boxShadow: idx === activePhase ? `0 0 0 4px ${phase.color}33` : 'none',
                    }} />
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: idx === activePhase ? phase.color : t.textFaint,
                      marginTop: 8,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}>
                      {phase.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Phase Detail */}
            <div style={{
              padding: 24,
              backgroundColor: `${phases[activePhase].color}08`,
              border: `1px solid ${phases[activePhase].color}33`,
              borderRadius: 10,
              transition: 'all 0.3s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: phases[activePhase].color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {phases[activePhase].label} — {phases[activePhase].time}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: t.text, margin: '6px 0 0', letterSpacing: '-0.01em' }}>
                    {phases[activePhase].title}
                  </h3>
                </div>
                <div style={{
                  padding: '6px 14px',
                  backgroundColor: `${phases[activePhase].color}18`,
                  border: `1px solid ${phases[activePhase].color}44`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  color: phases[activePhase].color,
                }}>
                  {activePhase === 0 ? 'Current Focus' : activePhase === 1 ? 'Next Up' : activePhase === 2 ? 'Planning' : 'Vision'}
                </div>
              </div>

              <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 20, maxWidth: 700 }}>
                {phases[activePhase].description}
              </p>

              <div style={{ ...labelStyle, color: phases[activePhase].color, marginBottom: 12 }}>Key Milestones</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                {phases[activePhase].milestones.map((milestone, mIdx) => (
                  <div key={mIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '10px 14px',
                    backgroundColor: t.cardBg,
                    borderRadius: 6,
                    border: `1px solid ${t.border}`,
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: `${phases[activePhase].color}22`,
                      border: `1px solid ${phases[activePhase].color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: phases[activePhase].color,
                      }} />
                    </div>
                    <span style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Roadmap Overview */}
            <div style={{ marginTop: 32 }}>
              <div style={{ ...labelStyle, marginBottom: 16 }}>Full Roadmap Overview</div>
              {phases.map((phase, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: idx < phases.length - 1 ? 0 : 0,
                  position: 'relative',
                }}>
                  {/* Timeline Connector */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 20,
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: phase.color,
                      flexShrink: 0,
                      zIndex: 1,
                    }} />
                    {idx < phases.length - 1 && (
                      <div style={{
                        width: 2,
                        flex: 1,
                        backgroundColor: `${t.border}88`,
                        minHeight: 40,
                      }} />
                    )}
                  </div>

                  {/* Phase Content */}
                  <div style={{ flex: 1, paddingBottom: 24 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: phase.color }}>{phase.label}</span>
                      <span style={{ fontSize: 12, color: t.textFaint }}>{phase.time}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }}>
                      {phase.title}
                    </div>
                    <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
                      {phase.description.substring(0, 120)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 24 }}>
            <div style={{
              ...cardStyle,
              borderTop: `3px solid ${t.accentGold}`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10 }}>Naming Transition Rules</div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: t.accentGoldLight }}>Rule 1:</strong> Never deprecate an existing product name without a 6-month overlap. "Dutchie POS" and "Dex in POS" should coexist.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: t.accentGoldLight }}>Rule 2:</strong> New AI features launch as "Dex" features, not generic "AI" features. Be specific: "Dex Recommendations" not "AI Recommendations."
                </div>
                <div>
                  <strong style={{ color: t.accentGoldLight }}>Rule 3:</strong> Nexus gets introduced only when there's enough substance (Phase 3). Don't launch the dashboard name before the dashboard is impressive.
                </div>
              </div>
            </div>

            <div style={{
              ...cardStyle,
              borderTop: `3px solid ${t.accentGreen}`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10 }}>Success Metrics by Phase</div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: t.accentGreen }}>Phase 1:</strong> 80% of pilot budtenders use Dex daily. Net Promoter Score for POS increases 15+ points.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: t.accentGreen }}>Phase 2:</strong> "Dex" brand recognition at 40%+ among Dutchie customers. Dex-tier upsell conversion at 25%+.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ color: t.accentGreen }}>Phase 3:</strong> Nexus dashboard adopted by 60% of multi-location operators. Analytics migration from Plus complete.
                </div>
                <div>
                  <strong style={{ color: t.accentGreen }}>Phase 4:</strong> Industry analysts reference "Dutchie + Dex" as default cannabis AI platform. 50%+ revenue from AI-enhanced tiers.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Final Summary ───────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          marginBottom: 24,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
          backgroundColor: t.cardBg,
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: t.accentGold,
            marginBottom: 16,
          }}>
            TL;DR
          </div>
          <h2 style={{
            fontSize: 28,
            fontWeight: 800,
            color: t.text,
            marginBottom: 16,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}>
            Keep Dutchie. Launch Dex. Build Nexus.
          </h2>
          <p style={{
            fontSize: 16,
            color: t.textMuted,
            maxWidth: 600,
            margin: '0 auto 24px',
            lineHeight: 1.7,
          }}>
            Dutchie stays the parent brand. Dex becomes the AI copilot in every product.
            Nexus becomes the intelligence dashboard. Simple, scalable, sellable.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}>
            <div style={{
              padding: '12px 24px',
              border: `2px solid ${t.accentGold}`,
              borderRadius: 8,
              background: `${t.accentGold}10`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Parent</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGoldLight }}>Dutchie</div>
            </div>
            <div style={{
              padding: '12px 24px',
              border: `2px solid ${t.accentGreen}`,
              borderRadius: 8,
              background: `${t.accentGreen}10`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Copilot</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGreen }}>Dex</div>
            </div>
            <div style={{
              padding: '12px 24px',
              border: `2px solid ${t.accentGoldLighter}`,
              borderRadius: 8,
              background: `${t.accentGoldLighter}10`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Intelligence Hub</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGoldLighter }}>Nexus</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '24px 0',
          borderTop: `1px solid ${t.border}`,
          fontSize: 12,
          color: t.textFaint,
        }}>
          Positioning Deep Dive — Dutchie AI Product Suite — March 2026
        </div>

      </div>
    </div>
  );
}

export default PositioningDeepDive;
