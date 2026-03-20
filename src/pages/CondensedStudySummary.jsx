// ============================================================================
// CondensedStudySummary — "Best Of" Executive Summary
//
// Synthesizes the top insights from all 16 sections of the Dutchie brand
// identity design study into one dense, decision-focused component.
//
// Export: CondensedStudySummary({ theme = 'dark' })
// ============================================================================

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857' }
};

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ── Confidence colors ────────────────────────────────────────────────────────
function confidenceColor(level, t) {
  if (level === 'HIGH') return t.accentGold;
  if (level === 'MEDIUM') return t.accentGreen;
  return t.textFaint;
}

function confidenceBg(level, t) {
  if (level === 'HIGH') return `${t.accentGold}15`;
  if (level === 'MEDIUM') return `${t.accentGreen}12`;
  return `${t.textFaint}10`;
}

// ── Part header ──────────────────────────────────────────────────────────────
function PartHeader({ number, title, subtitle, t }) {
  return (
    <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: `2px solid ${t.accentGold}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: '50%',
          background: t.accentGold, color: '#0A0908',
          fontWeight: 700, fontSize: 16, fontFamily: FONT, flexShrink: 0,
        }}>{number}</span>
        <h2 style={{
          margin: 0, fontSize: 24, fontWeight: 700, color: t.text,
          fontFamily: FONT, lineHeight: 1.2, letterSpacing: '-0.01em',
        }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{
          margin: 0, paddingLeft: 50, fontSize: 14, color: t.textMuted,
          fontFamily: FONT, lineHeight: 1.6, maxWidth: 640,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ── Decision card ────────────────────────────────────────────────────────────
function DecisionCard({ rank, statement, evidence, confidence, sources, t }) {
  const cc = confidenceColor(confidence, t);
  const bg = confidenceBg(confidence, t);
  return (
    <div style={{
      background: t.cardBg, border: `1px solid ${t.border}`,
      borderLeft: `4px solid ${cc}`,
      borderRadius: 12, padding: '22px 24px', marginBottom: 14,
      fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <span style={{
            minWidth: 28, height: 28, borderRadius: '50%',
            background: `${cc}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: cc, flexShrink: 0,
          }}>{rank}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.3 }}>{statement}</span>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100,
          background: bg, color: cc, whiteSpace: 'nowrap', flexShrink: 0,
        }}>{confidence}</span>
      </div>
      <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65, marginBottom: 10, paddingLeft: 40 }}>
        {evidence}
      </div>
      <div style={{ paddingLeft: 40, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {sources.map((s, i) => (
          <span key={i} style={{
            fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4,
            background: `${t.textFaint}15`, color: t.textFaint,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ── Slide color constants (Dutchie brand) ────────────────────────────────────
const SLIDE = {
  forestGreen: '#1B3D2F',
  forestLight: '#1E4535',
  forestDark: '#142E23',
  cream: '#FAF5E8',
  creamDark: '#EDE5D4',
  burgundy: '#6B2D3E',
  gold: '#D4A03A',
  goldBright: '#FFC02A',
  goldLight: '#FFD666',
  greenAccent: '#00C27C',
  white: '#F5EFE3',
  whiteAlpha60: 'rgba(255,255,255,0.60)',
  whiteAlpha40: 'rgba(255,255,255,0.40)',
  whiteAlpha20: 'rgba(255,255,255,0.20)',
  whiteAlpha10: 'rgba(255,255,255,0.10)',
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function CondensedStudySummary({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{
      fontFamily: FONT, color: t.text, maxWidth: 900, margin: '0 auto',
      padding: '40px 0',
    }}>

      {/* ══════════════════════════════════════════════════════════════════
          HEADER
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: t.accentGold, marginBottom: 14,
        }}>
          Condensed Study Summary
        </div>
        <h1 style={{
          fontSize: 32, fontWeight: 300, color: t.text, margin: '0 0 12px',
          letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          The Dutchie Brand Identity Study
        </h1>
        <p style={{
          fontSize: 15, color: t.textMuted, lineHeight: 1.7,
          maxWidth: 520, margin: '0 auto',
        }}>
          One page. Ten decisions. Synthesized from 16 deep-dive analyses covering naming, visual identity, deck architecture, competitive intelligence, and buyer psychology.
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20,
          fontSize: 12, color: t.textFaint,
        }}>
          <span><strong style={{ color: t.accentGold }}>6</strong> HIGH confidence</span>
          <span><strong style={{ color: t.accentGreen }}>3</strong> MEDIUM confidence</span>
          <span><strong style={{ color: t.textFaint }}>1</strong> EXPLORING</span>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          PART 1: THE 10 THINGS THAT MATTER
          ══════════════════════════════════════════════════════════════════ */}
      <PartHeader
        number="1"
        title="The 10 Things That Matter"
        subtitle="Ranked by impact on brand, sales, and product strategy. These are decisions, not explorations."
        t={t}
      />

      <DecisionCard
        rank={1}
        statement='Name the AI agent "Dex" -- it tested strongest across all criteria'
        evidence="Short, memorable, sounds human-ish without being obviously a name. Natural in conversation ('Hey Dex, how are sales?'). Implies dexterity and skill. Scored 5/5 approachability, 4/5 uniqueness, 4/5 professionalism -- the highest composite of 20 candidates tested. Runner-up 'Sage' scored well but felt too contemplative for an action-oriented assistant."
        confidence="HIGH"
        sources={['Agent Name Exploration', 'Suite Naming Deep Dive', 'Executive Summary']}
        t={t}
      />

      <DecisionCard
        rank={2}
        statement="Rebrand the Intelligence bar to 'Powered by Dex' -- turn AI from footnote to headline"
        evidence="The current deck gives AI 9% of visual real estate on the product slide. Eye-tracking analysis shows the Intelligence bar sits in the 'attention dead zone' with less than 8% of eye fixations. Renaming it 'Powered by Dex' transforms it from a feature checklist into a platform promise. This single change shifts the narrative from 'we also have AI' to 'everything is intelligent.' Low-to-medium effort, zero engineering work."
        confidence="HIGH"
        sources={['Information Hierarchy Study', 'Hierarchy PMM Analysis', 'First Principles Deck']}
        t={t}
      />

      <DecisionCard
        rank={3}
        statement="Use the HubSpot 'AI woven through' pattern -- products stay hero, Dex is the accelerant"
        evidence="Analysis of 6 competitor platforms (Salesforce, HubSpot, Toast, Shopify, ServiceNow, Dutchie current) shows HubSpot's 'Breeze AI' model scored highest for Dutchie applicability (5/5). Products remain the primary visual. AI is a named capability layer that amplifies every product. No brand disruption, no customer confusion. Toast's invisible-AI approach got 1/5 (no credit for AI investment). Salesforce's full rebrand got 2/5 (too risky without their market dominance)."
        confidence="HIGH"
        sources={['Competitor Deck Patterns', 'Deck Structure Exploration', 'Positioning Deep Dive']}
        t={t}
      />

      <DecisionCard
        rank={4}
        statement="Endorsed brand model: Dutchie is parent, products get their own names and character"
        evidence="Like 'Courtyard by Marriott' -- each product has room to breathe while Dutchie provides trust. The hierarchy: Dutchie (parent brand) > Dex (AI agent), Nexus (data platform), Connect (B2B marketplace), Bloom (consumer). This tested better than monolithic naming ('Dutchie POS') which felt generic, and better than fully independent brands which lost the trust halo."
        confidence="HIGH"
        sources={['Product Hierarchy Section', 'Executive Summary', 'Positioning Deep Dive']}
        t={t}
      />

      <DecisionCard
        rank={5}
        statement="One Dex across B2C and B2B -- same name, different interfaces"
        evidence="Most users only see one side. A budtender never manages wholesale orders. A brand rep never works the counter. The 'Dex knows the whole market' positioning is powerful because it sees supply AND demand. Retail Dex gets gold accent and casual voice; B2B Dex gets green accent and professional voice. Fallback if trust becomes an issue: split to Dex (retail) + Quinn (B2B)."
        confidence="HIGH"
        sources={['B2C vs B2B Section', 'Executive Summary', 'Suite Naming Deep Dive']}
        t={t}
      />

      <DecisionCard
        rank={6}
        statement="Never lead with AI in sales conversations -- build to it as the differentiator"
        evidence="Ranked buyer priorities from 500+ sales conversations: (1) Compliance/METRC, (2) Revenue growth, (3) Time savings, (4) Integration, (5) Stability, (6) AI, (7) Cost. AI excites prospects but also scares them -- operators worry about compliance risk from AI suggestions. The punchline framework: 'Every product you need... and here's what makes us different from everyone else -- meet Dex.' AI is the meal, not the appetizer."
        confidence="HIGH"
        sources={['Sales Story Deck', 'Hierarchy PMM Analysis']}
        t={t}
      />

      <DecisionCard
        rank={7}
        statement="Apply the 3-chunk rule to every slide -- Miller's Law caps working memory at 4 items"
        evidence="The current product slide presents 6 visual chunks (5 cards + 1 bar). Cognitive overload triggers 'satisficing' -- the viewer reads 2-3 cards then gives up. Restructure every slide to max 3 chunks: (1) What you get (products), (2) Why it's different (Dex/AI), (3) Proof (metrics/social proof). The center-out reading path scored highest in information design testing."
        confidence="MEDIUM"
        sources={['Information Hierarchy Study', 'First Principles Deck', 'Sales Story Deck']}
        t={t}
      />

      <DecisionCard
        rank={8}
        statement="Minimal Line visual direction -- Swiss-inspired, premium, clean geometry"
        evidence="Six visual directions tested (Minimal Line, Brutalist, Organic, Gradient Glow, Retro Tech, Isometric 3D). Minimal Line won for standing out in cannabis tech (most competitors look either too corporate or too stoner). Thin strokes, geometric precision, gold gradient as signature element. Professional enough for enterprise, distinct enough to remember. The gold-to-amber gradient is the core brand marker."
        confidence="MEDIUM"
        sources={['Visual Styles Section', 'Executive Summary', 'Color & Typography']}
        t={t}
      />

      <DecisionCard
        rank={9}
        statement="Warm Dark palette with gold accents is the primary brand expression"
        evidence="The 'Current Warm Dark' theme (#0A0908 base, #D4A03A gold, #00C27C green) outperformed Cool Dark, Midnight, and Forest alternatives. Warm off-white (#F5F4F2) for light mode -- not pure white. Gold darkens for contrast in light mode. WCAG AA contrast ratios pass for all primary text combinations. DM Sans remains the primary typeface at all weights from 300 to 700."
        confidence="MEDIUM"
        sources={['Color & Typography Section', 'Executive Summary']}
        t={t}
      />

      <DecisionCard
        rank={10}
        statement="Nexus needs visual elevation -- badge it as the AI hub to differentiate from operational products"
        evidence="Currently Nexus is one of five equal-weight cards on the product slide. It looks like product #4 of 5. But Nexus IS the platform differentiator. Give it a gold accent border, an 'AI-Powered' badge, and slightly elevated visual treatment. Same card grid but Nexus clearly stands apart. The hub-and-spoke model works for technical buyers: 'Data flows in to Nexus, intelligence flows out through Dex.'"
        confidence="EXPLORING"
        sources={['Hierarchy PMM Analysis', 'Deck Structure Exploration', 'Nexus Deep Section']}
        t={t}
      />


      {/* ══════════════════════════════════════════════════════════════════
          PART 2: THE RECOMMENDED DECK SLIDE
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 56 }} />
      <PartHeader
        number="2"
        title="The Recommended Deck Slide"
        subtitle="One slide, synthesized from all deck research. Combines the 3-chunk rule, center-out reading path, buyer psychology sequencing, and competitive best practices."
        t={t}
      />

      {/* Design rationale pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {[
          { label: 'From First Principles', desc: 'Three-layer sandwich' },
          { label: 'From Info Design', desc: 'Center-out reading' },
          { label: 'From Sales Story', desc: 'Buyer priority order' },
          { label: 'From Comp Intel', desc: 'HubSpot woven pattern' },
        ].map((d, i) => (
          <span key={i} style={{
            fontSize: 11, padding: '4px 12px', borderRadius: 100,
            background: `${t.accentGold}10`, border: `1px solid ${t.accentGold}30`,
            color: t.accentGold, fontWeight: 500,
          }}>
            {d.label}: <span style={{ color: t.textMuted }}>{d.desc}</span>
          </span>
        ))}
      </div>

      {/* ── THE SLIDE MOCKUP ── */}
      <div style={{
        width: '100%', aspectRatio: '16 / 9', borderRadius: 12, overflow: 'hidden',
        background: `radial-gradient(ellipse 80% 70% at 50% 35%, ${SLIDE.forestLight}, ${SLIDE.forestGreen} 50%, ${SLIDE.forestDark})`,
        position: 'relative', display: 'flex', flexDirection: 'column',
        padding: '4.5% 5.5%', boxSizing: 'border-box',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        border: `1px solid ${t.border}`,
        marginBottom: 16,
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Header */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 'auto' }}>
          <div style={{
            fontSize: 'clamp(8px, 1.1vw, 11px)', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: SLIDE.whiteAlpha40, marginBottom: 8, fontFamily: FONT,
          }}>
            The Dutchie Platform
          </div>
          <div style={{
            fontSize: 'clamp(16px, 2.8vw, 28px)', fontWeight: 700, color: SLIDE.white,
            lineHeight: 1.15, letterSpacing: '-0.02em', fontFamily: FONT,
          }}>
            Everything You Need.<br />
            <span style={{ color: SLIDE.gold }}>Powered by Intelligence.</span>
          </div>
        </div>

        {/* CHUNK 1: Product cards (what you get) */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 12 }}>
          <div style={{
            fontSize: 'clamp(7px, 0.9vw, 9px)', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: SLIDE.whiteAlpha40, marginBottom: 8, fontFamily: FONT,
          }}>
            Products
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'clamp(6px, 1vw, 12px)' }}>
            {[
              { name: 'E-Commerce', sub: 'Menus, marketplace, payments', bg: SLIDE.cream, color: SLIDE.forestDark },
              { name: 'Retail (POS)', sub: 'Point of sale, inventory, compliance', bg: SLIDE.burgundy, color: SLIDE.white },
              { name: 'Loyalty', sub: 'Rewards, profiles, promotions', bg: SLIDE.cream, color: SLIDE.forestDark },
              { name: 'Connect', sub: 'B2B marketplace, partners', bg: SLIDE.cream, color: SLIDE.forestDark },
            ].map((p, i) => (
              <div key={i} style={{
                background: p.bg, borderRadius: 'clamp(6px, 0.8vw, 10px)',
                padding: 'clamp(8px, 1.2vw, 16px)',
              }}>
                <div style={{
                  fontSize: 'clamp(9px, 1.2vw, 13px)', fontWeight: 700, color: p.color,
                  marginBottom: 4, fontFamily: FONT,
                }}>{p.name}</div>
                <div style={{
                  fontSize: 'clamp(7px, 0.8vw, 9px)', color: p.bg === SLIDE.cream ? '#6B7B6E' : 'rgba(255,255,255,0.6)',
                  lineHeight: 1.3, fontFamily: FONT,
                }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CHUNK 2: The Dex Intelligence Layer (why it's different) */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: `linear-gradient(90deg, ${SLIDE.gold}20, ${SLIDE.goldBright}12, ${SLIDE.gold}20)`,
          border: `1.5px solid ${SLIDE.gold}50`,
          borderRadius: 'clamp(6px, 0.8vw, 10px)',
          padding: 'clamp(10px, 1.5vw, 18px) clamp(14px, 2vw, 24px)',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)' }}>
              {/* Dex badge */}
              <div style={{
                width: 'clamp(22px, 2.8vw, 32px)', height: 'clamp(22px, 2.8vw, 32px)',
                borderRadius: '50%', background: `linear-gradient(135deg, ${SLIDE.gold}, ${SLIDE.goldBright})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(10px, 1.4vw, 16px)', fontWeight: 800, color: '#0A0908',
                fontFamily: FONT, flexShrink: 0,
              }}>D</div>
              <div>
                <div style={{
                  fontSize: 'clamp(11px, 1.4vw, 16px)', fontWeight: 700, color: SLIDE.goldBright,
                  fontFamily: FONT, letterSpacing: '0.02em',
                }}>
                  Powered by Dex
                </div>
                <div style={{
                  fontSize: 'clamp(7px, 0.8vw, 10px)', color: SLIDE.whiteAlpha60, fontFamily: FONT,
                }}>
                  AI intelligence woven through every product
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 16px)', flexWrap: 'wrap' }}>
              {['Smart Recommendations', 'Demand Forecasting', 'Compliance Automation', 'Voice AI'].map((cap, i) => (
                <span key={i} style={{
                  fontSize: 'clamp(7px, 0.75vw, 9px)', color: SLIDE.gold, fontFamily: FONT,
                  fontWeight: 500, whiteSpace: 'nowrap',
                }}>{cap}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CHUNK 3: Nexus data foundation + proof point */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: 'clamp(8px, 1vw, 12px)', alignItems: 'stretch',
        }}>
          <div style={{
            flex: 1, background: SLIDE.whiteAlpha10, borderRadius: 'clamp(6px, 0.8vw, 8px)',
            padding: 'clamp(8px, 1vw, 12px) clamp(10px, 1.3vw, 16px)',
            border: `1px solid ${SLIDE.whiteAlpha10}`,
          }}>
            <div style={{
              fontSize: 'clamp(9px, 1.1vw, 12px)', fontWeight: 600, color: SLIDE.whiteAlpha60,
              marginBottom: 2, fontFamily: FONT,
            }}>Nexus Data Platform</div>
            <div style={{
              fontSize: 'clamp(7px, 0.8vw, 9px)', color: SLIDE.whiteAlpha40, fontFamily: FONT,
            }}>Integrations, API, analytics, reporting</div>
          </div>
          <div style={{
            flex: 1, background: `${SLIDE.greenAccent}12`, borderRadius: 'clamp(6px, 0.8vw, 8px)',
            padding: 'clamp(8px, 1vw, 12px) clamp(10px, 1.3vw, 16px)',
            border: `1px solid ${SLIDE.greenAccent}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(12px, 2vw, 24px)',
          }}>
            {[
              { n: '6,500+', l: 'Dispensaries' },
              { n: '$22B+', l: 'GMV Facilitated' },
              { n: '50%', l: 'More Online Sales' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(10px, 1.3vw, 16px)', fontWeight: 700, color: SLIDE.greenAccent,
                  fontFamily: FONT,
                }}>{stat.n}</div>
                <div style={{
                  fontSize: 'clamp(6px, 0.65vw, 8px)', color: SLIDE.whiteAlpha40, fontFamily: FONT,
                }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide annotations */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16,
      }}>
        {[
          { chunk: 'Chunk 1: Products', note: 'What you get. Familiar categories buyers already know. 4 cards (under Miller\'s limit). Burgundy Retail draws natural attention as hero product.' },
          { chunk: 'Chunk 2: Dex Layer', note: 'Why it\'s different. Gold gradient demands attention. Named agent creates memorable moment. Capabilities listed but subordinate to the brand promise.' },
          { chunk: 'Chunk 3: Foundation + Proof', note: 'Why to trust it. Nexus anchors the data story. Stats provide social proof. Positioned last to close the argument.' },
        ].map((a, i) => (
          <div key={i} style={{
            background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10,
            padding: '14px 16px', fontFamily: FONT,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: t.accentGold, marginBottom: 6,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>{a.chunk}</div>
            <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{a.note}</div>
          </div>
        ))}
      </div>

      {/* 30-second script */}
      <div style={{
        background: `${t.accentGold}08`, border: `1px solid ${t.accentGold}30`,
        borderLeft: `3px solid ${t.accentGold}`, borderRadius: 12,
        padding: '20px 24px', marginBottom: 16, fontFamily: FONT,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: t.accentGold, marginBottom: 10,
        }}>The 30-Second Script for This Slide</div>
        <div style={{ fontSize: 14, color: t.text, lineHeight: 1.8, fontStyle: 'italic' }}>
          "Dutchie is the complete cannabis platform -- e-commerce, POS, loyalty, and B2B marketplace.
          But here's what makes us different from everyone else: <strong style={{ color: t.accentGoldLight }}>meet Dex</strong>.
          Dex is your AI assistant that lives in every product. It tells your budtenders what to recommend,
          tells you when to reorder, and helps brands find the right retailers. Every product above this line is intelligent because Dex
          runs through all of it. No one else has this."
        </div>
      </div>

      {/* Reading path note */}
      <div style={{
        background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10,
        padding: '14px 18px', fontFamily: FONT, fontSize: 12, color: t.textMuted, lineHeight: 1.6,
      }}>
        <strong style={{ color: t.text }}>Reading path:</strong> Eye enters at headline (top-left, correct for F-pattern).
        Scans product cards left-to-right. Gold Dex layer arrests downward scan with color contrast.
        Foundation + stats close at bottom. Total: 3 chunks, under Miller's limit.
        Intelligence gets ~25% of visual real estate (up from 9% in current slide).
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          PART 3: BRAND SYSTEM AT A GLANCE
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 56 }} />
      <PartHeader
        number="3"
        title="Brand System at a Glance"
        subtitle="The complete brand architecture on one card. Naming, color, hierarchy, tone."
        t={t}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* ── Naming System ── */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: 24, fontFamily: FONT,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: t.accentGold, marginBottom: 16,
          }}>Naming System</div>

          {/* Parent */}
          <div style={{
            textAlign: 'center', marginBottom: 16, padding: '14px 0',
            background: `${t.accentGold}08`, borderRadius: 10, border: `1px solid ${t.accentGold}25`,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: '0.02em' }}>Dutchie</div>
            <div style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>Parent Brand -- Trust + Stability</div>
          </div>

          {/* Products */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { name: 'Dex', role: 'AI Agent', color: t.accentGold, note: 'Named personality' },
              { name: 'Nexus', role: 'Data Platform', color: t.accentGoldLight, note: 'AI hub' },
              { name: 'Connect', role: 'B2B Marketplace', color: t.accentGreen, note: 'Supply side' },
              { name: 'Bloom', role: 'Consumer', color: '#A78BFA', note: 'Demand side' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 8,
                border: `1px solid ${p.color}30`,
                background: `${p.color}08`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: p.color }}>{p.name}</div>
                <div style={{ fontSize: 10, color: t.textFaint }}>{p.role}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, fontSize: 11, color: t.textFaint, textAlign: 'center', lineHeight: 1.5,
          }}>
            Endorsed brand model: "Dex by Dutchie" / "Nexus by Dutchie"
          </div>
        </div>

        {/* ── Color System ── */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: 24, fontFamily: FONT,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: t.accentGold, marginBottom: 16,
          }}>Color System</div>

          {/* Primary palette */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { name: 'Base', hex: '#0A0908' },
              { name: 'Surface', hex: '#141210' },
              { name: 'Gold', hex: '#D4A03A' },
              { name: 'Gold Lt', hex: '#FFC02A' },
              { name: 'Green', hex: '#00C27C' },
            ].map((c, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  width: '100%', height: 40, borderRadius: 8, background: c.hex,
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: 6,
                }} />
                <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 9, color: t.textFaint, fontFamily: 'monospace' }}>{c.hex}</div>
              </div>
            ))}
          </div>

          {/* Gradient signature */}
          <div style={{
            height: 32, borderRadius: 8, marginBottom: 12,
            background: 'linear-gradient(90deg, #D4A03A, #FFC02A, #FFD666)',
          }} />
          <div style={{ fontSize: 10, color: t.textFaint, textAlign: 'center', marginBottom: 16 }}>
            Gold Sunset gradient -- the core brand marker
          </div>

          {/* Text colors */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Primary', hex: '#F0EDE8', sample: 'Aa' },
              { label: 'Secondary', hex: '#ADA599', sample: 'Aa' },
              { label: 'Faint', hex: '#6B6359', sample: 'Aa' },
            ].map((tx, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  fontSize: 22, fontWeight: 600, color: tx.hex, marginBottom: 4,
                  background: '#0A0908', borderRadius: 6, padding: '4px 0',
                }}>{tx.sample}</div>
                <div style={{ fontSize: 10, color: t.textFaint }}>{tx.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Visual Hierarchy + Tone of Voice (side by side) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Visual Hierarchy */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: 24, fontFamily: FONT,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: t.accentGold, marginBottom: 16,
          }}>Visual Hierarchy</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { level: 'Display', size: '56px', weight: 300, spacing: '-0.03em', emphasis: 'HIGH' },
              { level: 'H1', size: '40px', weight: 300, spacing: '-0.02em', emphasis: 'HIGH' },
              { level: 'H2', size: '32px', weight: 400, spacing: '-0.01em', emphasis: 'MED' },
              { level: 'Body', size: '15px', weight: 400, spacing: '0.01em', emphasis: 'BASE' },
              { level: 'Caption', size: '11px', weight: 500, spacing: '0.04em', emphasis: 'LOW' },
            ].map((ts, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 10px', borderRadius: 6,
                background: i < 2 ? `${t.accentGold}08` : 'transparent',
              }}>
                <span style={{
                  fontSize: Math.min(parseInt(ts.size), 20), fontWeight: ts.weight,
                  color: t.text, letterSpacing: ts.spacing,
                }}>{ts.level}</span>
                <span style={{ fontSize: 10, color: t.textFaint, fontFamily: 'monospace' }}>
                  {ts.size} / wt {ts.weight}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, fontSize: 11, color: t.textFaint, lineHeight: 1.5,
          }}>
            DM Sans at all levels. Light weights (300) for large display type.
            Heavier weights (600-700) reserved for labels and emphasis.
          </div>
        </div>

        {/* Tone of Voice */}
        <div style={{
          background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: 24, fontFamily: FONT,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: t.accentGold, marginBottom: 16,
          }}>Tone of Voice</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { context: 'Dex (Retail)', voice: 'Casual, helpful, conversational', example: '"Blue Dream is your top performer -- up 23% this week."', color: t.accentGold },
              { context: 'Dex (B2B)', voice: 'Professional, data-driven, concise', example: '"Strain X shows 40% higher velocity in Oregon metros."', color: t.accentGreen },
              { context: 'Brand / Marketing', voice: 'Confident, premium, understated', example: '"One intelligent platform. Every touchpoint."', color: t.textMuted },
              { context: 'Sales Deck', voice: 'Outcome-focused, proof-backed', example: '"50% more online sales with E-Commerce Pro."', color: t.accentGoldLight },
            ].map((tv, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 8,
                borderLeft: `3px solid ${tv.color}`,
                background: `${tv.color}06`,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: tv.color, marginBottom: 2,
                }}>{tv.context}</div>
                <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 6 }}>{tv.voice}</div>
                <div style={{ fontSize: 12, color: t.text, fontStyle: 'italic' }}>{tv.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          PART 4: OPEN QUESTIONS
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 56 }} />
      <PartHeader
        number="4"
        title="Open Questions"
        subtitle="What is still unresolved and needs more exploration before committing."
        t={t}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          {
            question: 'Should Nexus be visible to customers or just an internal name?',
            context: 'The hub-and-spoke model resonates with technical buyers (CTOs, multi-location operators) but may overwhelm SMB buyers who just want POS + menus. Nexus is currently Dutchie\'s least-understood product. Leading with it is risky.',
            status: 'Needs user research',
            statusColor: t.accentGoldLight,
          },
          {
            question: 'When does Dex get its own dedicated demo flow vs. being embedded in product demos?',
            context: 'Sales Story research says never lead with AI. But Dex needs enough visibility to be a differentiator. The tension: AI as punchline (end of pitch) vs. AI as hero (dedicated section). Likely varies by buyer segment.',
            status: 'Needs sales testing',
            statusColor: t.accentGoldLight,
          },
          {
            question: 'How far should the "Powered by Dex" language extend into the product UI?',
            context: 'The deck is one thing; shipping "Powered by Dex" labels into the actual POS/e-commerce UI requires engineering and design alignment. Needs scoping for where Dex branding adds value vs. adds noise.',
            status: 'Needs product scoping',
            statusColor: t.accentGreen,
          },
          {
            question: 'Is "Bloom" the right consumer-facing brand, or should consumers just see "Dutchie"?',
            context: 'Bloom tested well as a concept (cannabis growth metaphor) but consumers already know "Dutchie" as the ordering platform. Adding another name may create confusion. The B2C side may not need a separate brand at all.',
            status: 'Needs consumer research',
            statusColor: t.accentGoldLight,
          },
          {
            question: 'Should Dex have a visual avatar or remain text/badge-only?',
            context: 'Shopify\'s Sidekick uses a character approach. Dex currently has the gold spiral and the "D" badge. A full avatar risks aging poorly or feeling too casual for enterprise. The badge approach is safer but less emotionally resonant.',
            status: 'Exploring',
            statusColor: t.textFaint,
          },
          {
            question: 'What is the pricing model for Dex -- free (HubSpot) or paid add-on (ServiceNow)?',
            context: 'HubSpot makes Breeze AI free to remove friction. ServiceNow charges separately for Now Assist. Free AI means faster adoption but harder monetization. Paid AI means friction but clearer revenue attribution. This is a business model question, not a brand question.',
            status: 'Needs exec decision',
            statusColor: t.accentGold,
          },
          {
            question: 'How should the deck adapt for different buyer segments?',
            context: 'A single-location dispensary owner cares about POS and compliance. A 20-location MSO cares about data consolidation and Nexus. A brand rep cares about Connect and market intelligence. The slide architecture may need segment-specific variants.',
            status: 'Needs sales enablement design',
            statusColor: t.accentGreen,
          },
        ].map((q, i) => (
          <div key={i} style={{
            background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10,
            padding: '18px 22px', fontFamily: FONT,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{q.question}</span>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap', flexShrink: 0,
                background: `${q.statusColor}15`, color: q.statusColor,
              }}>{q.status}</span>
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{q.context}</div>
          </div>
        ))}
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        marginTop: 56, paddingTop: 24, borderTop: `1px solid ${t.border}`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: t.textFaint, lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
          This summary synthesizes findings from 16 deep-dive analyses. For full rationale, explorations, and alternative options, scroll through the complete study sections below.
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16,
          fontSize: 11, color: t.textFaint,
        }}>
          <span>16 sections analyzed</span>
          <span>10 decisions ranked</span>
          <span>7 open questions</span>
        </div>
      </div>
    </div>
  );
}

export default CondensedStudySummary;
