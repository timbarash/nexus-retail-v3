import { useState } from 'react';

/* ─── Theme Definitions ─── */
const themes = {
  dark: {
    bg: '#0A0908', cardBg: '#141210', border: '#282724',
    text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359',
    navBg: 'rgba(10,9,8,0.92)', divider: '#282724',
    accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666',
    accentGreen: '#00C27C',
  },
  light: {
    bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0',
    text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E',
    navBg: 'rgba(255,255,255,0.95)', divider: '#E8E5E0',
    accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A',
    accentGreen: '#047857',
  }
};

/* ─── Dutchie Products ─── */
const PRODUCTS = [
  { name: 'E-Commerce', desc: 'Online ordering & menus', icon: '🛒' },
  { name: 'Loyalty', desc: 'Rewards & retention', icon: '⭐' },
  { name: 'Retail', desc: 'Back-office management', icon: '📊' },
  { name: 'Nexus', desc: 'Point of Sale', icon: '💳' },
  { name: 'Connect', desc: 'Integrations & API', icon: '🔗' },
];

/* ─── Section Nav Items ─── */
const NAV_ITEMS = [
  { id: 'overview', label: 'Research Overview' },
  { id: 'shopify', label: 'Shopify Magic' },
  { id: 'hubspot', label: 'HubSpot Breeze' },
  { id: 'servicetitan', label: 'ServiceTitan' },
  { id: 'toast', label: 'Toast IQ' },
  { id: 'figma', label: 'Figma AI' },
  { id: 'notion', label: 'Notion AI' },
  { id: 'linear', label: 'Linear' },
  { id: 'trends', label: 'AI Design Trends' },
  { id: 'concept1', label: 'Concept 1: Orbital' },
  { id: 'concept2', label: 'Concept 2: Layered' },
  { id: 'concept3', label: 'Concept 3: Workbench' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */
export function DesignInspirationStudy({ theme = 'dark' }) {
  const [activeSection, setActiveSection] = useState('overview');
  const t = themes[theme] || themes.dark;

  const pageStyle = {
    fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
    background: t.bg, color: t.text, minHeight: '100vh',
    display: 'flex', lineHeight: 1.6,
  };

  const navStyle = {
    width: 220, minWidth: 220, position: 'sticky', top: 0,
    height: '100vh', overflowY: 'auto', background: t.navBg,
    borderRight: `1px solid ${t.border}`, padding: '24px 0',
    backdropFilter: 'blur(12px)',
  };

  const mainStyle = {
    flex: 1, padding: '40px 48px', maxWidth: 960, overflowY: 'auto',
  };

  return (
    <div style={pageStyle}>
      {/* ─── Sidebar Nav ─── */}
      <nav style={navStyle}>
        <div style={{ padding: '0 20px 20px', borderBottom: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.accentGold }}>
            Design Research
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4, color: t.text }}>
            AI Visual Inspiration
          </div>
        </div>
        {NAV_ITEMS.map(item => {
          const isActive = activeSection === item.id;
          const isConcept = item.id.startsWith('concept');
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 20px', border: 'none', cursor: 'pointer',
                background: isActive ? (theme === 'dark' ? 'rgba(212,160,58,0.1)' : 'rgba(161,122,26,0.08)') : 'transparent',
                color: isActive ? t.accentGold : (isConcept ? t.accentGoldLight : t.textMuted),
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                fontFamily: 'inherit', borderLeft: isActive ? `2px solid ${t.accentGold}` : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ─── Main Content ─── */}
      <main style={mainStyle}>
        {activeSection === 'overview' && <OverviewSection t={t} theme={theme} />}
        {activeSection === 'shopify' && <ShopifySection t={t} theme={theme} />}
        {activeSection === 'hubspot' && <HubSpotSection t={t} theme={theme} />}
        {activeSection === 'servicetitan' && <ServiceTitanSection t={t} theme={theme} />}
        {activeSection === 'toast' && <ToastSection t={t} theme={theme} />}
        {activeSection === 'figma' && <FigmaSection t={t} theme={theme} />}
        {activeSection === 'notion' && <NotionSection t={t} theme={theme} />}
        {activeSection === 'linear' && <LinearSection t={t} theme={theme} />}
        {activeSection === 'trends' && <TrendsSection t={t} theme={theme} />}
        {activeSection === 'concept1' && <ConceptOrbital t={t} theme={theme} />}
        {activeSection === 'concept2' && <ConceptLayered t={t} theme={theme} />}
        {activeSection === 'concept3' && <ConceptWorkbench t={t} theme={theme} />}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

function SectionTitle({ children, t }) {
  return (
    <h1 style={{ fontSize: 28, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
      {children}
    </h1>
  );
}

function SectionSubtitle({ children, t }) {
  return (
    <p style={{ fontSize: 15, color: t.textMuted, margin: '0 0 32px', lineHeight: 1.7 }}>
      {children}
    </p>
  );
}

function Card({ children, t, style = {} }) {
  return (
    <div style={{
      background: t.cardBg, border: `1px solid ${t.border}`,
      borderRadius: 12, padding: 24, marginBottom: 20, ...style,
    }}>
      {children}
    </div>
  );
}

function Tag({ children, color = '#D4A03A', t }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
      background: `${color}18`, color: color, border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  );
}

function FindingRow({ label, value, t }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 14 }}>
      <span style={{ color: t.textFaint, minWidth: 140, fontWeight: 500 }}>{label}</span>
      <span style={{ color: t.text }}>{value}</span>
    </div>
  );
}

function Divider({ t }) {
  return <div style={{ height: 1, background: t.divider, margin: '32px 0' }} />;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: OVERVIEW
   ═══════════════════════════════════════════════════════════════════════════════ */
function OverviewSection({ t, theme }) {
  const companies = [
    { name: 'Shopify', ai: 'Magic / Sidekick', pattern: 'Sparkle icons mark AI throughout admin; AI is integrated into every workflow, not a separate product', visual: 'Clean white + dark admin; stars/sparkle iconography; teal accents' },
    { name: 'HubSpot', ai: 'Breeze', pattern: 'Three-tier hierarchy: Copilot (assist) -> Agents (automate) -> Intelligence (enrich). Unified under single AI brand with distinct sub-products', visual: 'Orange brand + lavender/purple AI accents; soft peachy tones; wind-inspired identity' },
    { name: 'ServiceTitan', ai: 'Titan Intelligence / Atlas', pattern: 'AI engine as platform layer (Titan Intelligence) with named sidekick (Atlas) for conversational interface', visual: 'Titan Blue (#0265dc); Sofia Pro headings; animated gradient buttons; trade-focused imagery' },
    { name: 'Toast', ai: 'Toast IQ', pattern: 'AI as intelligence layer across POS; conversational assistant with proactive "For You" feed', visual: 'Warm restaurant tones; data visualization emphasis; conversational UI cards' },
    { name: 'Figma', ai: 'Figma AI / Make', pattern: 'AI embedded in creative tools — generation, editing, prototyping. New sub-products (Make, Buzz, Draw)', visual: 'Black/white minimalism + lime-green AI accents (#F3FFE3); bold type; generous whitespace' },
    { name: 'Notion', ai: 'Notion AI', pattern: 'AI as invisible layer — no separate product, just capabilities woven into every page, block, and database', visual: 'Blue pop-out borders for AI; clean minimalism; curved UI; reduced visual clutter' },
    { name: 'Linear', ai: 'AI Agents', pattern: 'Workbench metaphor — AI as tools on a purpose-built surface, not a chat replacement', visual: 'Monochrome B/W; near-native app speed; Apple-like refinement; minimal color usage' },
  ];

  return (
    <div>
      <SectionTitle t={t}>AI Visual Design Inspiration Study</SectionTitle>
      <SectionSubtitle t={t}>
        Research across 7 leading SaaS companies on how they visually present AI products —
        visual hierarchies, color systems, iconography, deck structures, and product architecture patterns.
        Synthesized into 3 original deck slide concepts for Dutchie.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Key Question
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: t.text, marginBottom: 8 }}>
          How do you show an entire product suite + AI on one slide?
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Every SaaS company faces the "platform slide" challenge: communicating product breadth without overwhelming,
          while making AI feel native (not bolted on). This study examines how the best companies solve it visually.
        </div>
      </Card>

      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 16, marginTop: 32 }}>
        Company Landscape
      </div>

      {companies.map((c, i) => (
        <Card key={i} t={t} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: t.text }}>{c.name}</div>
            <Tag color={t.accentGold} t={t}>{c.ai}</Tag>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 8 }}>
            <strong style={{ color: t.text }}>Architecture Pattern:</strong> {c.pattern}
          </div>
          <div style={{ fontSize: 13, color: t.textFaint }}>
            <strong style={{ color: t.textMuted }}>Visual Treatment:</strong> {c.visual}
          </div>
        </Card>
      ))}

      <Divider t={t} />

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
          Three Emerging Patterns
        </div>
        {[
          { title: 'AI as Ambient Layer', desc: 'Shopify, Notion, Linear — AI is invisible infrastructure. No separate product, just capabilities woven in. Visual cue: sparkle icons, subtle color accents.' },
          { title: 'AI as Named Companion', desc: 'ServiceTitan (Atlas), HubSpot (Breeze), Toast (Toast IQ) — AI gets its own brand, identity, and visual language. Visual cue: distinct color system, mascot/icon, dedicated pages.' },
          { title: 'AI as Product Tier', desc: 'HubSpot (Copilot/Agents/Intelligence), Figma (Make/Buzz/Draw) — AI spawns sub-products with their own hierarchy. Visual cue: tiered layouts, progressive disclosure, layered diagrams.' },
        ].map((p, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>
              {i + 1}. {p.title}
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: SHOPIFY MAGIC
   ═══════════════════════════════════════════════════════════════════════════════ */
function ShopifySection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Shopify Magic / Sidekick</SectionTitle>
      <SectionSubtitle t={t}>
        Shopify embeds AI as an ambient capability across the entire admin. Magic is the engine;
        Sidekick is the conversational interface. The design philosophy: AI should be everywhere, marked only by sparkle icons.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="AI Branding" value="'Magic' as engine brand, 'Sidekick' as conversational UI. Tagline: 'AI that accelerates your ambition'" />
        <FindingRow t={t} label="Icon System" value="Star / sparkle icons mark every AI-powered feature. 'Look for the stars' is the UX wayfinding principle" />
        <FindingRow t={t} label="Color Treatment" value="Clean white backgrounds + dark admin panels. Teal/turquoise accents for AI features. No heavy gradients — relies on product screenshots" />
        <FindingRow t={t} label="Layout" value="Hero video + bold headline. Feature grid with before/after carousels. Merchant testimonial cards. Clean card-based components" />
        <FindingRow t={t} label="Typography" value="Bold sans-serif headlines with generous whitespace. Feature descriptions kept short and scannable" />
        <FindingRow t={t} label="Differentiation" value="AI is NOT a separate product — it lives inside existing tools (media editor, theme builder, admin). The sparkle icon is the only visual signal" />
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Shopify proves that AI doesn't need its own visual universe. A single icon (sparkle/star) applied consistently
          across existing product UI is enough to signal "AI-powered" — and actually feels more native than a separate color system.
          Their <strong style={{ color: t.text }}>Horizon theme system</strong> (Summer 2025) shows AI generating
          entire store layouts from text prompts, positioning AI as an accelerator of existing workflows.
        </div>
      </Card>

      {/* Visual Mockup: Shopify's Sparkle Pattern */}
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, marginTop: 32 }}>
        Pattern Visualization: Sparkle-Marked Features
      </div>
      <Card t={t} style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {['Product Descriptions', 'Image Backgrounds', 'Theme Generation', 'Email Campaigns', 'Store Analytics', 'Chat Responses'].map((feat, i) => (
            <div key={i} style={{
              padding: '16px 20px', borderRadius: 10,
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${t.border}`, position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 8, right: 10, fontSize: 14,
                color: '#5EC2A0', opacity: 0.8,
              }}>
                ✦
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{feat}</div>
              <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>AI-powered</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: t.textFaint, fontStyle: 'italic' }}>
          Shopify pattern: The sparkle (✦) is the only visual differentiation. AI lives inside existing features.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: HUBSPOT BREEZE
   ═══════════════════════════════════════════════════════════════════════════════ */
function HubSpotSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>HubSpot Breeze AI</SectionTitle>
      <SectionSubtitle t={t}>
        HubSpot created a unified AI brand ("Breeze") with a three-tier product hierarchy:
        Copilot for assistance, Agents for automation, Intelligence for data enrichment.
        This is the most sophisticated AI product architecture in SaaS.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="AI Brand" value="'Breeze' — wind-inspired naming with distinct visual identity separate from HubSpot orange" />
        <FindingRow t={t} label="Color System" value="HubSpot brand orange (#FF4800) + lavender/purple AI accents (#D7CDFC). Soft peachy (#FCC6B1) and mint (#B9CDBE) secondary tones" />
        <FindingRow t={t} label="Gradient" value="Subtle lavender-to-white gradients on AI surfaces. Not aggressive — soft, airy, matching the 'breeze' metaphor" />
        <FindingRow t={t} label="Layout Grid" value="12-column responsive grid. Max 1080px content width. Section padding scaled 16px (mobile) to 96px (desktop)" />
        <FindingRow t={t} label="Typography" value="Weight variation (300 light / 500 medium) creates visual hierarchy. Clean sans-serif throughout" />
        <FindingRow t={t} label="Hierarchy" value="Three distinct tiers — each with its own page, icon treatment, and use-case framing. Unified under Breeze umbrella" />
      </Card>

      {/* Visual Mockup: HubSpot's Three-Tier Architecture */}
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, marginTop: 32 }}>
        Pattern Visualization: Three-Tier AI Architecture
      </div>
      <Card t={t} style={{ padding: 32 }}>
        {/* Breeze umbrella */}
        <div style={{
          textAlign: 'center', padding: '14px 24px', borderRadius: 10,
          background: `linear-gradient(135deg, rgba(215,205,252,0.15) 0%, rgba(252,198,177,0.1) 100%)`,
          border: `1px solid rgba(215,205,252,0.3)`, marginBottom: 24,
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Breeze</div>
          <div style={{ fontSize: 12, color: t.textMuted }}>Unified AI across the customer platform</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { tier: 'Copilot', desc: 'AI assistant — works WITH you', color: '#B9CDBE', items: ['Content writing', 'Company research', 'Ticket summaries'] },
            { tier: 'Agents', desc: 'AI workers — works FOR you', color: '#D7CDFC', items: ['Content Agent', 'Prospecting Agent', 'Customer Agent'] },
            { tier: 'Intelligence', desc: 'Data enrichment — works ON data', color: '#FCC6B1', items: ['200M+ profiles', 'Buyer intent', 'Form shortening'] },
          ].map((tier, i) => (
            <div key={i} style={{
              padding: 20, borderRadius: 10,
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${tier.color}40`,
              borderTop: `3px solid ${tier.color}`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>{tier.tier}</div>
              <div style={{ fontSize: 11, color: tier.color, fontWeight: 600, marginBottom: 12 }}>{tier.desc}</div>
              {tier.items.map((item, j) => (
                <div key={j} style={{ fontSize: 12, color: t.textMuted, padding: '3px 0' }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: t.textFaint, fontStyle: 'italic' }}>
          HubSpot pattern: Named AI umbrella with color-coded sub-tiers. Each tier has its own page and visual treatment.
        </div>
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          HubSpot's three-tier model is the gold standard for <strong style={{ color: t.text }}>AI product hierarchy communication</strong>.
          The key insight: each tier answers a different buyer question — "How does AI help me?" (Copilot),
          "Can AI do work for me?" (Agents), "Does it make my data better?" (Intelligence).
          For Dutchie, Dex could adopt a similar framing: Dex Assist, Dex Agents, Dex Intelligence.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: SERVICETITAN
   ═══════════════════════════════════════════════════════════════════════════════ */
function ServiceTitanSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>ServiceTitan — Titan Intelligence / Atlas</SectionTitle>
      <SectionSubtitle t={t}>
        A vertical SaaS for the trades that evolved from "AI features" (Titan Intelligence, 2022)
        to a named AI sidekick (Atlas, 2025). The closest analog to Dutchie's position in cannabis.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="AI Brand" value="'Titan Intelligence' (engine) + 'Atlas' (conversational sidekick). Two-layer naming mirrors Shopify's Magic/Sidekick" />
        <FindingRow t={t} label="Colors" value="Titan Blue (#0265DC) as primary. White/gray neutrals. Green (#18A761) for success states. Red (#E24F4F) for alerts" />
        <FindingRow t={t} label="Typography" value="Sofia Pro for headings (bold, branded). Nunito Sans for body (readable). H1 at 44px desktop" />
        <FindingRow t={t} label="Gradients" value="Animated gradient buttons (7-second linear animation). Directional transparent-to-white fades for content masking" />
        <FindingRow t={t} label="Layout" value="Max width 1256-1400px. Rich text containers with rounded corners and shadow effects. Hover states with opacity shifts" />
        <FindingRow t={t} label="Positioning" value="Atlas as 'the ultimate power user' — runs reports, dispatches techs, throttles marketing spend. Framed as co-pilot, not tool" />
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Vertical SaaS AI Pattern
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
          ServiceTitan's evolution is the most relevant roadmap for Dutchie. They went through three phases:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { phase: 'Phase 1 (2022)', title: 'Feature Bundle', desc: 'Titan Intelligence: a collection of AI features (Dispatch Pro, Price Insights, Call Analytics)' },
            { phase: 'Phase 2 (2024)', title: 'Intelligence Layer', desc: 'AI as platform capability powering multiple products. Benchmarking, predictions, optimization' },
            { phase: 'Phase 3 (2025)', title: 'Named Sidekick', desc: 'Atlas: conversational AI that can take autonomous action. Voice + text interface. "Chief of staff" positioning' },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 16, borderRadius: 10,
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${t.border}`,
            }}>
              <div style={{ fontSize: 11, color: t.accentGold, fontWeight: 600, marginBottom: 4 }}>{p.phase}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          ServiceTitan proves that vertical SaaS companies should <strong style={{ color: t.text }}>give AI a name and personality</strong>,
          not just a feature list. Atlas is positioned as a "trusted co-pilot or even a chief of staff" — aspirational language
          that resonates with the non-technical trade professional audience.
          Dutchie's Dex should similarly be framed as <strong style={{ color: t.text }}>the expert operator</strong> that cannabis
          retailers always wished they had.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: TOAST IQ
   ═══════════════════════════════════════════════════════════════════════════════ */
function ToastSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Toast IQ</SectionTitle>
      <SectionSubtitle t={t}>
        Toast expanded from POS to an AI intelligence layer for restaurants. Toast IQ combines
        a conversational assistant with proactive recommendations — the "For You" feed pattern.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="AI Brand" value="'Toast IQ' — intelligence sub-brand. Expanded from smart features to full conversational AI assistant" />
        <FindingRow t={t} label="Visual Style" value="Warm, approachable tones. Data-visualization emphasis. Card-based conversational UI. Restaurant imagery throughout" />
        <FindingRow t={t} label="Key Pattern" value="'For You' personalized feed — proactive AI surfaces recommendations without being asked" />
        <FindingRow t={t} label="Interaction" value="Plain-language questions answered with data insights. Direct action capability (update menus, edit shifts) from conversation" />
        <FindingRow t={t} label="Positioning" value="'Doesn't just understand what's happening — anticipates what's next.' AI as strategic advisor, not just tool" />
        <FindingRow t={t} label="Data Scale" value="148,000 customer locations powering industry benchmarks — competitive moat from data network effects" />
      </Card>

      {/* Visual Mockup: Toast IQ Conversational Pattern */}
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, marginTop: 32 }}>
        Pattern Visualization: Proactive AI Feed + Conversational Action
      </div>
      <Card t={t} style={{ padding: 32 }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          {/* For You feed */}
          <div style={{
            padding: 16, borderRadius: 10, marginBottom: 12,
            background: `linear-gradient(135deg, rgba(255,140,50,0.08) 0%, rgba(255,80,80,0.05) 100%)`,
            border: `1px solid rgba(255,140,50,0.2)`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF8C32', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>For You</div>
            <div style={{ fontSize: 13, color: t.text, fontWeight: 500, marginBottom: 6 }}>Your Margherita Pizza underperforms on Thursday evenings</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>Similar restaurants see 23% higher sales with a Thursday special. Want to create one?</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <div style={{ padding: '6px 14px', borderRadius: 6, background: '#FF8C32', color: '#fff', fontSize: 12, fontWeight: 600 }}>Create Special</div>
              <div style={{ padding: '6px 14px', borderRadius: 6, background: 'transparent', color: t.textMuted, fontSize: 12, border: `1px solid ${t.border}` }}>Dismiss</div>
            </div>
          </div>

          {/* Chat message */}
          <div style={{
            padding: 16, borderRadius: 10,
            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            border: `1px solid ${t.border}`,
          }}>
            <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 8 }}>You asked:</div>
            <div style={{ fontSize: 13, color: t.text, marginBottom: 12 }}>"What was my best-selling item last week?"</div>
            <div style={{ height: 1, background: t.border, marginBottom: 12 }} />
            <div style={{ fontSize: 13, color: t.text }}>Your top seller was the Pepperoni Pizza (342 units, $5,130 revenue) — up 18% from the previous week.</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: t.textFaint, fontStyle: 'italic' }}>
          Toast pattern: Proactive recommendations + conversational data queries with direct action buttons.
        </div>
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Toast IQ's <strong style={{ color: t.text }}>"For You" feed</strong> is a powerful UX pattern that Dex should adopt.
          Rather than waiting for operators to ask questions, Dex surfaces proactive insights:
          "Your Blue Dream inventory at Location #3 will run out Thursday based on current velocity."
          The conversational + action model means operators can say "reorder from Connect" and Dex executes.
          Toast also proves the <strong style={{ color: t.text }}>data network effect</strong> — 148K locations gives IQ
          a competitive moat. Dutchie has similar potential with its dispensary data.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: FIGMA AI
   ═══════════════════════════════════════════════════════════════════════════════ */
function FigmaSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Figma AI</SectionTitle>
      <SectionSubtitle t={t}>
        Figma took a "design tool makes AI" approach — AI generates, edits, and prototypes designs.
        Their visual language is strikingly minimal: black/white + one accent color (lime green).
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="Color System" value="Black (#000) + White (#FFF) foundation. Lime green (#F3FFE3) as AI accent. Gray at 50-65% opacity for secondary" />
        <FindingRow t={t} label="Typography" value="'figmaSans' custom font, 4-5.375rem hero headings. Bold type-driven design" />
        <FindingRow t={t} label="Layout" value="24-48 column grid at desktop. Max 1440px (1680px at 1920px+). Generous 5-10rem section padding" />
        <FindingRow t={t} label="Icons" value="Circular icon backgrounds with 24% white opacity on dark sections. Clean geometric shapes" />
        <FindingRow t={t} label="Buttons" value="Outlined style with 1px inset borders. Arrow icons appear on hover. Smooth border-radius transitions" />
        <FindingRow t={t} label="AI Products" value="Figma Make (generative), Figma Buzz (marketing), Figma Draw (illustration), Figma Sites (publishing)" />
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Figma's Sub-Product Strategy
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { name: 'Figma Make', desc: 'Generative AI design. Text-to-prototype with Claude 3.7', color: '#C4E9A3' },
            { name: 'Figma Buzz', desc: 'Brand & marketing content. Templates + AI editing', color: '#A3D5E9' },
            { name: 'Figma Draw', desc: 'Vector editing + illustration. Enhanced creative tools', color: '#E9A3D5' },
            { name: 'Figma Sites', desc: 'Design-to-website publishing. Responsive + CMS', color: '#E9D5A3' },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 16, borderRadius: 10,
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${p.color}30`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Figma proves that <strong style={{ color: t.text }}>extreme restraint in color</strong> can make AI feel premium and native.
          Their B/W + one accent approach prevents the "AI purple problem" (every SaaS using indigo gradients).
          Dutchie's gold (#D4A03A) as the singular AI color against dark/light neutrals mirrors this pattern.
          Config 2025 keynote message: <strong style={{ color: t.text }}>"The future won't be designed by accident"</strong> —
          positioning AI as elevation of human craft, not replacement.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: NOTION AI
   ═══════════════════════════════════════════════════════════════════════════════ */
function NotionSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Notion AI</SectionTitle>
      <SectionSubtitle t={t}>
        Notion represents the "invisible AI" ideal — capabilities woven into every page, block,
        and database with minimal visual disruption. AI is a feature of Notion, not a product alongside it.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="AI Signaling" value="Blue pop-out borders on AI input boxes. Blue-colored tags highlight new AI tasks. Gestalt grouping principles" />
        <FindingRow t={t} label="UI Direction" value="2025 redesign: curved tabs, minimalist database headers, reduced visual clutter. 'Streamlined appearance'" />
        <FindingRow t={t} label="Principles" value="Four design principles for AI: color contrast, peripheral vision, pop-out effects, and Gestalt principles" />
        <FindingRow t={t} label="AI Access" value="/ai slash command and AI chat sidebar. Image generation via /ai image. Auto-scaling presentation mode" />
        <FindingRow t={t} label="Integration" value="GPT-4 + Claude models. AI generates outlines, summarizes, creates visualizations. Works on existing page content" />
        <FindingRow t={t} label="Philosophy" value="'Lego block' flexibility + 'AI brain' automation. AI operates the systems you build, not separate ones" />
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Notion's approach to AI-in-context is a UX north star: <strong style={{ color: t.text }}>blue borders that "pop out"</strong> when
          AI is available, drawing attention without breaking flow. The four design principles (contrast, peripheral vision,
          pop-out, Gestalt) provide a framework for how Dex surfaces itself inside E-Commerce, Loyalty, Retail, Nexus, and Connect
          without requiring users to leave their workflow. The <strong style={{ color: t.text }}>slash command pattern (/dex)</strong> could
          be Dutchie's equivalent of /ai.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: LINEAR
   ═══════════════════════════════════════════════════════════════════════════════ */
function LinearSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Linear — AI for the Workbench</SectionTitle>
      <SectionSubtitle t={t}>
        Linear challenges the "chat interface = AI" assumption. Their workbench metaphor positions
        AI as a powerful tool placed ON TOP of purpose-built software, not a replacement for it.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>Visual Identity</div>
        <FindingRow t={t} label="Color" value="Monochrome B/W (2025 shift from blue to black/white). Fewer bold colors. Dark mode primary" />
        <FindingRow t={t} label="Design Style" value="Near-native app speed on Electron. Apple-like refinement. Reduced visual noise through sidebar/header adjustments" />
        <FindingRow t={t} label="AI Philosophy" value="'Workbench' metaphor — AI tools on a purpose-built surface. Agents work within existing workflows" />
        <FindingRow t={t} label="Key Quote" value="'AI doesn't replace the workbench; it's a powerful new tool to place on top of it' — Karri Saarinen" />
        <FindingRow t={t} label="AI Agents" value="Users build and deploy AI agents that work alongside teams. Product Intelligence (Aug 2025) for decision-making" />
        <FindingRow t={t} label="Trend Impact" value="The 'Linear design' aesthetic (flat, dark, minimal) influenced SaaS industry but is evolving toward more individuality in 2025-26" />
      </Card>

      {/* Visual Mockup: Workbench Metaphor */}
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 12, marginTop: 32 }}>
        Pattern Visualization: The Workbench Metaphor
      </div>
      <Card t={t} style={{ padding: 32 }}>
        <div style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
          {/* Workbench surface */}
          <div style={{
            padding: 24, borderRadius: 12,
            background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${t.border}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textFaint, marginBottom: 16 }}>
              Purpose-Built Workbench (Your Software)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {['Issues', 'Projects', 'Cycles'].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: 6, textAlign: 'center',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted,
                }}>
                  {item}
                </div>
              ))}
            </div>

            {/* AI layer on top */}
            <div style={{
              padding: 16, borderRadius: 10,
              background: `linear-gradient(135deg, ${t.accentGold}10 0%, ${t.accentGold}05 100%)`,
              border: `1px dashed ${t.accentGold}40`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.accentGold, marginBottom: 8 }}>
                AI Tools Layer (placed on top)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Auto-triage', 'Write specs', 'Classify bugs', 'Suggest owners'].map((tool, i) => (
                  <div key={i} style={{ fontSize: 11, color: t.textMuted, padding: '4px 8px', borderRadius: 4, background: `${t.accentGold}08` }}>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: t.textFaint, fontStyle: 'italic' }}>
          Linear pattern: AI is a layer of tools on a purpose-built workbench, not a separate chat interface.
        </div>
      </Card>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Design Takeaway for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Linear's workbench metaphor is directly applicable to Dutchie:
          the Dutchie platform (E-Commerce, Loyalty, Retail, Nexus, Connect) IS the purpose-built workbench for cannabis retail.
          Dex is <strong style={{ color: t.text }}>the AI toolset placed on top of that workbench</strong> —
          not a separate chat product, but intelligence that enhances every surface.
          The visual implication: <strong style={{ color: t.text }}>Dex should feel like an overlay, not a destination.</strong>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION: AI DESIGN TRENDS
   ═══════════════════════════════════════════════════════════════════════════════ */
function TrendsSection({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>AI Visual Design Trends 2025-2026</SectionTitle>
      <SectionSubtitle t={t}>
        The visual language of AI is evolving from "purple gradients and sparkles" toward more
        intentional, brand-specific approaches. Key trend: if 2025 was AI speed, 2026 is human taste.
      </SectionSubtitle>

      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          The "AI Purple Problem"
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
          AI tools and template-driven stacks have nudged teams toward the same indigo palette and shiny gradients.
          Shopify's Polaris design system moved primary actions toward indigo years ago, influencing countless SaaS dashboards.
          The result: <strong style={{ color: t.text }}>brands blur together, conversions stall, and users yawn.</strong>
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Dutchie's gold (#D4A03A) AI color deliberately avoids this trap. Gold signals premium intelligence,
          not generic tech-purple. It's distinctive in the market and connects to the brand's warm, approachable identity.
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { title: 'Acid Fade Gradients', desc: 'High-saturation, prismatic gradients replacing smooth transitions. Heat-map blends. "Use gradients as lighting, not wallpaper"', status: 'Trending' },
          { title: 'Glassmorphism', desc: 'Frosted glass layers over blurred backgrounds. Premium feel for SaaS. Apple "Liquid Glass" pushed this mainstream. Strategic, not everywhere', status: 'Mainstream' },
          { title: 'Functional Motion', desc: 'Stripe-style particle movement suggesting data flow. Micro-interactions serving clarity, not decoration. Motion growing up in 2026', status: 'Maturing' },
          { title: 'Tactile Rebellion', desc: '2026 shift toward human texture, imperfection, artisan touch. "AI with artisan soul." Designers using AI for base layers, then heavy hand manipulation', status: 'Emerging' },
          { title: 'Monochrome + 1 Accent', desc: 'Linear-influenced B/W + single accent color. Extreme restraint. Figma (lime green), Linear (minimal). Most confident approach', status: 'Confidence Signal' },
          { title: 'Recombination Culture', desc: 'No dominant style — skeuomorphism + surveillance UI, brutalism + botanical gradients, pixels + vapor gloss. Intentional eclecticism', status: '2026 Direction' },
        ].map((trend, i) => (
          <Card key={i} t={t} style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{trend.title}</div>
              <Tag color={t.accentGreen} t={t}>{trend.status}</Tag>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>{trend.desc}</div>
          </Card>
        ))}
      </div>

      <Divider t={t} />

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Recommendation for Dutchie
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>
          Dutchie should pursue the <strong style={{ color: t.text }}>Monochrome + Gold accent</strong> approach (Figma/Linear confidence)
          with strategic <strong style={{ color: t.text }}>glassmorphism on AI surfaces</strong> (premium signal without overdoing it).
          Avoid: acid gradients (too trendy), heavy particle animations (too tech-bro), purple anything (sameness death).
          Embrace: <strong style={{ color: t.text }}>warm gold glow as the Dex signature</strong>, functional motion for data flow,
          and the "workbench + AI overlay" spatial metaphor from Linear.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONCEPT 1: ORBITAL SYSTEM
   Inspired by: Shopify's ambient AI + HubSpot's tiered hierarchy
   ═══════════════════════════════════════════════════════════════════════════════ */
function ConceptOrbital({ t, theme }) {
  const products = PRODUCTS;
  const orbitRadius = 160;
  const centerSize = 100;

  return (
    <div>
      <SectionTitle t={t}>Concept 1: The Orbital System</SectionTitle>
      <SectionSubtitle t={t}>
        Inspired by Shopify's ambient AI integration + HubSpot's Breeze product hierarchy.
        Dex sits at the center as the gravitational core. Products orbit around it, each connected by
        golden lines of intelligence. The visual metaphor: Dex powers everything; products are its expression.
      </SectionSubtitle>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Tag color={t.accentGold} t={t}>Shopify: Ambient AI</Tag>
          <Tag color='#D7CDFC' t={t}>HubSpot: Tiered Hierarchy</Tag>
        </div>
        <div style={{ fontSize: 13, color: t.textMuted }}>
          This concept positions Dex as the intelligence core that powers every product. Like Shopify's sparkle icons,
          AI is everywhere. Like HubSpot's Breeze tiers, there are concentric rings of capability.
        </div>
      </Card>

      {/* ─── ORBITAL DIAGRAM ─── */}
      <div style={{
        position: 'relative', width: '100%', height: 480,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '40px 0',
      }}>
        {/* Outer orbit ring */}
        <div style={{
          position: 'absolute', width: orbitRadius * 2 + 80, height: orbitRadius * 2 + 80,
          borderRadius: '50%', border: `1px solid ${t.accentGold}15`,
        }} />

        {/* Middle orbit ring */}
        <div style={{
          position: 'absolute', width: orbitRadius * 2 + 20, height: orbitRadius * 2 + 20,
          borderRadius: '50%', border: `1px dashed ${t.accentGold}20`,
        }} />

        {/* Inner glow */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${t.accentGold}12 0%, transparent 70%)`,
        }} />

        {/* Center: Dex */}
        <div style={{
          position: 'absolute', width: centerSize, height: centerSize,
          borderRadius: '50%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', zIndex: 10,
          background: `linear-gradient(135deg, ${t.accentGold}20 0%, ${t.accentGoldLight}10 100%)`,
          border: `2px solid ${t.accentGold}60`,
          boxShadow: `0 0 30px ${t.accentGold}20, 0 0 60px ${t.accentGold}10`,
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGold }}>Dex</div>
          <div style={{ fontSize: 9, color: t.accentGoldLight, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Agent</div>
        </div>

        {/* Orbital product nodes */}
        {products.map((product, i) => {
          const angle = (i / products.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;

          return (
            <div key={i}>
              {/* Connection line */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                width: orbitRadius - centerSize / 2, height: 1,
                background: `linear-gradient(to right, ${t.accentGold}30, ${t.accentGreen}20)`,
                transformOrigin: '0 0',
                transform: `rotate(${angle}rad)`,
              }} />

              {/* Product node */}
              <div style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - 48px)`,
                top: `calc(50% + ${y}px - 32px)`,
                width: 96, padding: '12px 8px', textAlign: 'center',
                borderRadius: 12,
                background: theme === 'dark' ? 'rgba(0,194,124,0.06)' : 'rgba(4,120,87,0.04)',
                border: `1px solid ${t.accentGreen}30`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.1)`,
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{product.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.text }}>{product.name}</div>
                <div style={{ fontSize: 9, color: t.textFaint, marginTop: 2 }}>{product.desc}</div>
              </div>
            </div>
          );
        })}

        {/* Slide title overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          textAlign: 'center', padding: '16px 0',
        }}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 500 }}>
            One platform. One intelligence.
          </div>
        </div>
      </div>

      {/* Slide structure notes */}
      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Slide Structure Notes
        </div>
        {[
          { label: 'Layout', value: 'Center-weighted with orbital products. Dark background for premium feel. Gold glow emanates from center.' },
          { label: 'Hierarchy', value: 'Eye goes to Dex center first, then orbiting products, then connection lines, then descriptive text.' },
          { label: 'Color Logic', value: 'Gold (#D4A03A) = AI/Dex. Green (#00C27C) = Dutchie products. Lines gradient from gold to green = intelligence flowing outward.' },
          { label: 'Motion', value: 'In presentation: slow orbital rotation, pulsing gold center glow, connection lines animate sequentially.' },
          { label: 'Messaging', value: '"Intelligence at the core, products at the edge." Reverses typical product-first slide to AI-first framing.' },
        ].map((note, i) => (
          <FindingRow key={i} t={t} label={note.label} value={note.value} />
        ))}
      </Card>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
          When to Use This Concept
        </div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          Best for: <strong style={{ color: t.text }}>Investor decks, brand overview presentations, "What is Dutchie?" slides.</strong>
          This concept answers "How does AI fit with your products?" by showing AI as the gravitational center.
          Works when you want to signal AI-native positioning — Dex isn't added to Dutchie, Dex IS Dutchie's intelligence.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONCEPT 2: LAYERED PLATFORM
   Inspired by: HubSpot's Breeze three-tier + ServiceTitan's evolution phases
   ═══════════════════════════════════════════════════════════════════════════════ */
function ConceptLayered({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Concept 2: The Layered Platform</SectionTitle>
      <SectionSubtitle t={t}>
        Inspired by HubSpot's Breeze three-tier layering + ServiceTitan's platform-layer AI architecture.
        Products form the foundation, Dex intelligence flows between them as a connecting layer,
        and operator-facing capabilities emerge at the top.
      </SectionSubtitle>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Tag color='#D7CDFC' t={t}>HubSpot: Breeze Layering</Tag>
          <Tag color='#0265DC' t={t}>ServiceTitan: Platform AI</Tag>
        </div>
        <div style={{ fontSize: 13, color: t.textMuted }}>
          This concept uses vertical layering to show product hierarchy. The bottom layer is the product suite,
          the middle layer is Dex intelligence, and the top layer is the operator experience. Information flows upward.
        </div>
      </Card>

      {/* ─── LAYERED DIAGRAM ─── */}
      <div style={{ margin: '40px 0', padding: '0 12px' }}>

        {/* TOP LAYER: Operator Experience */}
        <div style={{
          padding: 24, borderRadius: '16px 16px 4px 4px',
          background: `linear-gradient(135deg, ${t.accentGold}12 0%, ${t.accentGoldLight}08 50%, ${t.accentGold}12 100%)`,
          border: `1px solid ${t.accentGold}30`,
          borderBottom: `2px solid ${t.accentGold}40`,
          marginBottom: 3,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.accentGold }}>
                Operator Experience
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 4 }}>What Your Team Sees</div>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 100,
              background: `${t.accentGold}15`, border: `1px solid ${t.accentGold}30`,
              fontSize: 11, fontWeight: 600, color: t.accentGold,
            }}>
              Powered by Dex
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { title: 'Proactive Insights', desc: '"Your Blue Dream at Store #3 runs out Thursday"' },
              { title: 'Natural Language', desc: '"Show me yesterday\'s top 5 products across all locations"' },
              { title: 'Autonomous Actions', desc: '"Reorder from top-performing vendor automatically"' },
            ].map((cap, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 8,
                background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${t.accentGold}15`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.accentGold, marginBottom: 4 }}>{cap.title}</div>
                <div style={{ fontSize: 11, color: t.textMuted, fontStyle: 'italic' }}>{cap.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE LAYER: Dex Intelligence */}
        <div style={{
          padding: 20, borderRadius: 4,
          background: `linear-gradient(90deg, ${t.accentGold}08, ${t.accentGold}18, ${t.accentGold}08)`,
          border: `1px solid ${t.accentGold}20`,
          borderTop: 'none', borderBottom: 'none',
          marginBottom: 3, position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle flow lines */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `repeating-linear-gradient(90deg, transparent, transparent 60px, ${t.accentGold}06 60px, ${t.accentGold}06 61px)`,
          }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.accentGold, letterSpacing: '0.05em' }}>
              DEX INTELLIGENCE LAYER
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 6 }}>
              AI that understands cannabis retail. Connects every product. Learns from every transaction.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
              {['Predict', 'Connect', 'Automate', 'Learn'].map((verb, i) => (
                <div key={i} style={{
                  fontSize: 11, fontWeight: 600, color: t.accentGoldLight,
                  padding: '4px 12px', borderRadius: 100,
                  background: `${t.accentGold}10`, border: `1px solid ${t.accentGold}20`,
                }}>
                  {verb}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM LAYER: Product Suite */}
        <div style={{
          padding: 24, borderRadius: '4px 4px 16px 16px',
          background: theme === 'dark' ? 'rgba(0,194,124,0.04)' : 'rgba(4,120,87,0.03)',
          border: `1px solid ${t.accentGreen}20`,
          borderTop: `2px solid ${t.accentGreen}30`,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.accentGreen, marginBottom: 14 }}>
            Product Foundation
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {PRODUCTS.map((product, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 10, textAlign: 'center',
                background: theme === 'dark' ? 'rgba(0,194,124,0.06)' : 'rgba(4,120,87,0.04)',
                border: `1px solid ${t.accentGreen}20`,
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{product.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{product.name}</div>
                <div style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{product.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows showing flow direction */}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ fontSize: 11, color: t.textFaint }}>
            Data flows up through the stack. Intelligence flows down into every product.
          </div>
        </div>
      </div>

      {/* Slide structure notes */}
      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Slide Structure Notes
        </div>
        {[
          { label: 'Layout', value: 'Horizontal layers stacked vertically. Products at base, Dex in middle, operator outcomes at top.' },
          { label: 'Hierarchy', value: 'Read top-to-bottom (what you see -> what powers it -> what it runs on) or bottom-to-top (products -> intelligence -> outcomes).' },
          { label: 'Color Logic', value: 'Green bottom (products) -> Gold middle (Dex) -> Gold-tinted top (outcomes). Color gradient tells the AI-enrichment story.' },
          { label: 'Typography', value: 'DEX INTELLIGENCE LAYER set large and bold as the visual anchor. Operator capabilities use italicized quotes for concreteness.' },
          { label: 'Messaging', value: '"Products provide the data. Dex provides the intelligence. Your team gets the outcomes." Three-line story in one visual.' },
        ].map((note, i) => (
          <FindingRow key={i} t={t} label={note.label} value={note.value} />
        ))}
      </Card>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
          When to Use This Concept
        </div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          Best for: <strong style={{ color: t.text }}>Sales decks, product overview presentations, "How it works" slides.</strong>
          This concept answers "How does your platform come together?" by showing clear architectural layers.
          The layered metaphor is familiar to enterprise buyers who think in terms of infrastructure stacks.
          Most effective when you need to show that Dex isn't one more product — it's the connective tissue between products.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONCEPT 3: THE WORKBENCH
   Inspired by: Linear's workbench metaphor + Notion's invisible AI + Toast's proactive feed
   ═══════════════════════════════════════════════════════════════════════════════ */
function ConceptWorkbench({ t, theme }) {
  return (
    <div>
      <SectionTitle t={t}>Concept 3: The Operator Workbench</SectionTitle>
      <SectionSubtitle t={t}>
        Inspired by Linear's workbench metaphor + Notion's invisible AI + Toast IQ's proactive feed.
        The slide shows an actual dispensary operator's screen with Dex woven into every surface —
        no separate AI product, just intelligence everywhere.
      </SectionSubtitle>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Tag color={t.text} t={t}>Linear: Workbench</Tag>
          <Tag color='#4488FF' t={t}>Notion: Invisible AI</Tag>
          <Tag color='#FF8C32' t={t}>Toast: Proactive Feed</Tag>
        </div>
        <div style={{ fontSize: 13, color: t.textMuted }}>
          This concept ditches the abstract diagram entirely. Instead, it shows a realistic operator dashboard
          where Dex intelligence is woven into every panel — like Notion's pop-out borders marking AI surfaces,
          and Toast's "For You" proactive feed surfacing insights without being asked.
        </div>
      </Card>

      {/* ─── WORKBENCH DASHBOARD MOCKUP ─── */}
      <div style={{
        margin: '40px 0', borderRadius: 16, overflow: 'hidden',
        border: `1px solid ${t.border}`,
        boxShadow: `0 20px 60px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.08'})`,
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px',
          background: theme === 'dark' ? '#1A1814' : '#F0EFED',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>Dutchie Dashboard</div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 6,
            background: `${t.accentGold}15`, border: `1px solid ${t.accentGold}25`,
            fontSize: 10, fontWeight: 700, color: t.accentGold, letterSpacing: '0.04em',
          }}>
            Dex Active
          </div>
        </div>

        {/* Dashboard body */}
        <div style={{
          display: 'grid', gridTemplateColumns: '180px 1fr 260px',
          minHeight: 420, background: t.bg,
        }}>
          {/* Sidebar */}
          <div style={{
            borderRight: `1px solid ${t.border}`, padding: '16px 0',
            background: theme === 'dark' ? '#0E0D0B' : '#F8F7F5',
          }}>
            {PRODUCTS.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', fontSize: 12, color: i === 0 ? t.text : t.textMuted,
                background: i === 0 ? (theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)') : 'transparent',
                fontWeight: i === 0 ? 600 : 400, cursor: 'pointer',
              }}>
                <span style={{ fontSize: 14 }}>{p.icon}</span>
                {p.name}
              </div>
            ))}
            <div style={{ height: 1, background: t.border, margin: '12px 16px' }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', fontSize: 12, fontWeight: 600,
              color: t.accentGold,
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 10,
                background: `${t.accentGold}15`, border: `1px solid ${t.accentGold}30`,
              }}>
                D
              </span>
              Ask Dex
            </div>
          </div>

          {/* Main content area */}
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>E-Commerce Overview</div>
                <div style={{ fontSize: 12, color: t.textMuted }}>Today, March 20 2026 — 3 locations</div>
              </div>
            </div>

            {/* Metrics row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Online Orders', value: '127', change: '+14%', dex: true },
                { label: 'Revenue', value: '$18,430', change: '+8%', dex: false },
                { label: 'Avg Basket', value: '$145', change: '+3%', dex: true },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: 14, borderRadius: 10,
                  background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: m.dex ? `1px solid ${t.accentGold}25` : `1px solid ${t.border}`,
                  position: 'relative',
                }}>
                  {m.dex && (
                    <div style={{
                      position: 'absolute', top: 6, right: 8, fontSize: 10, color: t.accentGold,
                    }}>
                      ✦
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: t.textFaint }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: '4px 0' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: t.accentGreen, fontWeight: 600 }}>{m.change} vs last week</div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div style={{
              height: 120, borderRadius: 10, marginBottom: 20,
              background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'flex-end', padding: '12px 16px', gap: 4,
            }}>
              {[30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92, 78, 85, 90, 100, 95, 88].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0',
                  background: `linear-gradient(to top, ${t.accentGreen}40, ${t.accentGreen}80)`,
                }} />
              ))}
            </div>

            {/* Dex inline insight */}
            <div style={{
              padding: 14, borderRadius: 10,
              background: `linear-gradient(135deg, ${t.accentGold}08 0%, transparent 100%)`,
              border: `1px solid ${t.accentGold}20`,
              borderLeft: `3px solid ${t.accentGold}60`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 8,
                  background: `${t.accentGold}20`, color: t.accentGold, fontWeight: 800,
                }}>D</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.accentGold }}>Dex Insight</span>
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>
                Online orders are up 14% — driven by your loyalty program email from Tuesday.
                Consider running a similar campaign for your slowest location (Store #2, down 6%).
              </div>
            </div>
          </div>

          {/* Right panel: Dex feed */}
          <div style={{
            borderLeft: `1px solid ${t.accentGold}15`,
            background: theme === 'dark' ? `rgba(212,160,58,0.02)` : `rgba(161,122,26,0.02)`,
            padding: 16,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: t.accentGold, marginBottom: 14,
            }}>
              Dex Activity
            </div>

            {[
              { time: '2m ago', text: 'Reordered Pineapple Express (50 units) from GreenLeaf Supply via Connect', type: 'action' },
              { time: '15m ago', text: 'Loyalty redemption spike at Store #1 — 3x normal rate. Investigating pattern.', type: 'insight' },
              { time: '1h ago', text: 'Updated pricing for 4 products based on competitive data from Nexus POS', type: 'action' },
              { time: '2h ago', text: 'Wednesday slow-day pattern detected. Recommend 15% happy hour for 3-5 PM', type: 'recommendation' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 10, borderRadius: 8, marginBottom: 8,
                background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${item.type === 'action' ? t.accentGold + '15' : t.border}`,
              }}>
                <div style={{ fontSize: 10, color: t.textFaint, marginBottom: 4 }}>{item.time}</div>
                <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.4 }}>{item.text}</div>
                {item.type === 'recommendation' && (
                  <div style={{
                    marginTop: 6, padding: '4px 10px', borderRadius: 4, display: 'inline-block',
                    background: `${t.accentGold}12`, border: `1px solid ${t.accentGold}20`,
                    fontSize: 10, fontWeight: 600, color: t.accentGold, cursor: 'pointer',
                  }}>
                    Apply
                  </div>
                )}
              </div>
            ))}

            {/* Dex chat input */}
            <div style={{
              marginTop: 12, padding: '8px 12px', borderRadius: 8,
              background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${t.accentGold}20`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ fontSize: 11, color: t.textFaint, flex: 1 }}>Ask Dex anything...</div>
              <div style={{ fontSize: 12, color: t.accentGold }}>-&gt;</div>
            </div>
          </div>
        </div>
      </div>

      {/* Annotation callouts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, margin: '24px 0' }}>
        {[
          { num: 1, title: 'Sparkle Markers', desc: 'Shopify-inspired ✦ icons mark AI-enhanced metrics. Subtle, never overwhelming. Users learn the pattern.' },
          { num: 2, title: 'Inline Insights', desc: 'Notion-inspired bordered insight cards appear contextually within existing views. No separate AI page needed.' },
          { num: 3, title: 'Activity Feed', desc: 'Toast IQ-inspired proactive feed shows what Dex is doing autonomously + recommendations requiring approval.' },
        ].map((callout, i) => (
          <Card key={i} t={t} style={{ marginBottom: 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
              background: `${t.accentGold}15`, color: t.accentGold, marginBottom: 10,
              border: `1px solid ${t.accentGold}30`,
            }}>
              {callout.num}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4 }}>{callout.title}</div>
            <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{callout.desc}</div>
          </Card>
        ))}
      </div>

      {/* Slide structure notes */}
      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 16 }}>
          Slide Structure Notes
        </div>
        {[
          { label: 'Layout', value: 'Full-bleed dashboard mockup in a browser chrome frame. Annotated callouts below identify Dex patterns.' },
          { label: 'Hierarchy', value: 'The dashboard IS the hero. Eye scans naturally: metrics -> chart -> gold insight card -> Dex activity feed.' },
          { label: 'Color Logic', value: 'Dashboard is primarily green (products) with gold accents marking every Dex surface. Gold border/glow = AI is here.' },
          { label: 'Typography', value: 'Dashboard uses system-appropriate sizes (12-20px). Callouts below use larger text (13-14px) for readability in presentation.' },
          { label: 'Messaging', value: '"This is what your team sees every day. Dex is woven into every screen." Concrete, not abstract.' },
        ].map((note, i) => (
          <FindingRow key={i} t={t} label={note.label} value={note.value} />
        ))}
      </Card>

      <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
          When to Use This Concept
        </div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          Best for: <strong style={{ color: t.text }}>Product demos, "Day in the Life" slides, customer-facing presentations.</strong>
          This concept answers "What will I actually see?" by showing a real operator experience.
          Unlike the abstract orbital and layered diagrams, this is tangible and concrete. It works when the audience
          is dispensary operators who want to see their workflow, not architecture diagrams.
          The annotation pattern (numbered callouts) also works well for
          <strong style={{ color: t.text }}> walkthrough presentations</strong> where you reveal each pattern step by step.
        </div>
      </Card>

      <Divider t={t} />

      {/* Comparison table */}
      <Card t={t}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 20 }}>
          Concept Comparison Matrix
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['Dimension', 'Orbital (C1)', 'Layered (C2)', 'Workbench (C3)'].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left', padding: '10px 12px',
                    borderBottom: `2px solid ${t.border}`,
                    color: i === 0 ? t.textFaint : t.text, fontWeight: i === 0 ? 500 : 700,
                    fontSize: 11,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Best For', 'Investor / brand decks', 'Sales / architecture slides', 'Product demos / operators'],
                ['Visual Metaphor', 'Solar system (gravity)', 'Infrastructure stack (layers)', 'Actual product UI (reality)'],
                ['Abstraction', 'High — conceptual', 'Medium — architectural', 'Low — concrete'],
                ['AI Positioning', 'Dex as gravitational center', 'Dex as connective layer', 'Dex woven into every surface'],
                ['Inspiration', 'Shopify + HubSpot', 'HubSpot + ServiceTitan', 'Linear + Notion + Toast'],
                ['Color Balance', 'Gold-dominant', 'Gold middle, green edges', 'Green-dominant, gold accents'],
                ['Audience', 'Executives, investors', 'IT buyers, enterprise', 'Operators, store managers'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '8px 12px',
                      borderBottom: `1px solid ${t.border}`,
                      color: j === 0 ? t.textFaint : t.textMuted,
                      fontWeight: j === 0 ? 500 : 400,
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
    </div>
  );
}

export default DesignInspirationStudy;
