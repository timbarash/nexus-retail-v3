import React from 'react';

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857' }
};

// ─── Primitives ──────────────────────────────────────────────────────────────

const Section = ({ number, title, subtitle, t }) => (
  <div style={{ marginBottom: 36, paddingBottom: 18, borderBottom: `2px solid ${t.accentGold}` }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accentGold, background: `${t.accentGold}18`, padding: '3px 9px', borderRadius: 4 }}>
        {number}
      </span>
      <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 26, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: t.textMuted, marginTop: 8, marginBottom: 0, maxWidth: 680 }}>{subtitle}</p>}
  </div>
);

const Card = ({ children, t, style = {} }) => (
  <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 24, fontFamily: 'DM Sans, sans-serif', ...style }}>
    {children}
  </div>
);

const Quote = ({ children, t, accent = false }) => (
  <div style={{ borderLeft: `3px solid ${accent ? t.accentGold : t.border}`, paddingLeft: 18, margin: '16px 0', fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontStyle: 'italic', color: accent ? t.text : t.textMuted, lineHeight: 1.6, fontWeight: accent ? 600 : 400 }}>
    {children}
  </div>
);

const Pill = ({ children, color }) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: `${color}1A`, color, fontFamily: 'DM Sans, sans-serif' }}>
    {children}
  </span>
);

const KeyInsight = ({ children, t }) => (
  <div style={{ background: `${t.accentGold}0C`, border: `1px solid ${t.accentGold}40`, borderRadius: 10, padding: 20, fontFamily: 'DM Sans, sans-serif', margin: '24px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 8 }}>Key Insight</div>
    <div style={{ fontSize: 15, color: t.text, lineHeight: 1.6, fontWeight: 500 }}>{children}</div>
  </div>
);

const Wrenches = ({ count, t }) => (
  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, letterSpacing: 2 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? t.accentGold : `${t.textFaint}40` }}>&#x1F527;</span>
    ))}
  </span>
);

const Stars = ({ count, t }) => (
  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, letterSpacing: 2 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? t.accentGoldLight : `${t.textFaint}40` }}>&#9733;</span>
    ))}
  </span>
);

const StoryStep = ({ number, text, t, highlight = false }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0' }}>
    <div style={{
      minWidth: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: highlight ? t.accentGold : `${t.textFaint}20`,
      color: highlight ? '#0A0908' : t.textMuted,
      fontSize: 13, fontWeight: 700, fontFamily: 'DM Sans, sans-serif'
    }}>{number}</div>
    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: highlight ? t.text : t.textMuted, lineHeight: 1.5, fontWeight: highlight ? 600 : 400, paddingTop: 3 }}>
      {text}
    </div>
  </div>
);

const CheckItem = ({ text, keep, t }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', fontFamily: 'DM Sans, sans-serif', borderBottom: `1px solid ${t.border}40` }}>
    <span style={{
      fontSize: 13, fontWeight: 700, minWidth: 28, textAlign: 'center',
      color: keep ? t.accentGreen : t.accentGold
    }}>
      {keep ? '=' : '>'}
    </span>
    <span style={{ fontSize: 14, color: t.text }}>{text}</span>
    <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: keep ? t.accentGreen : t.accentGold }}>
      {keep ? 'Keep' : 'Change'}
    </span>
  </div>
);

// ─── Before/After Mini Component ────────────────────────────────────────────

const BeforeAfter = ({ before, after, t }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0' }}>
    <div style={{ background: `${t.textFaint}08`, border: `1px solid ${t.border}`, borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textFaint, marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Before</div>
      <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>{before}</div>
    </div>
    <div style={{ background: `${t.accentGold}08`, border: `1px solid ${t.accentGold}40`, borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accentGold, marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>After</div>
      <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>{after}</div>
    </div>
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────

export function HierarchyPMMAnalysis({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: '48px 32px', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ─── Title ─────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 10 }}>
            Positioning Playbook
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 36, fontWeight: 800, color: t.text, margin: 0, lineHeight: 1.15 }}>
            From "We Also Have AI" to "Meet Dex"
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: t.textMuted, marginTop: 10, lineHeight: 1.6, maxWidth: 640 }}>
            Five concrete changes to the sales deck that turn AI from a bullet point into the headline. No new products needed. Just sharper positioning.
          </p>
        </div>

        {/* ─── SECTION 1: What the Current Deck Says ─────────────────────── */}
        <Section number="01" title="What the Current Deck Says About Us" subtitle="Read the slide like a prospect seeing it for the first time." t={t} />

        <Card t={t} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textFaint, marginBottom: 16 }}>
            What the current slide communicates
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { signal: '5 equal pillars', reads: '"We do everything for dispensaries"' },
              { signal: 'Intelligence bar at the bottom', reads: '"AI is a footnote, not the main event"' },
              { signal: 'Nexus = one of five equal cards', reads: '"AI is a product, not a platform"' },
              { signal: '"Dutchie Agent" in small text', reads: '"We have an agent but it\'s not branded or prominent"' },
            ].map((item, i) => (
              <div key={i} style={{ padding: 14, background: `${t.textFaint}08`, borderRadius: 8, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4 }}>{item.signal}</div>
                <div style={{ fontSize: 12, color: t.textMuted, fontStyle: 'italic' }}>{item.reads}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <Card t={t} style={{ borderColor: `${t.textFaint}30` }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textFaint, marginBottom: 10 }}>
              What the audience hears today
            </div>
            <Quote t={t}>
              "Dutchie is a cannabis tech company that does a bunch of stuff. They also have some AI."
            </Quote>
          </Card>
          <Card t={t} style={{ borderColor: `${t.accentGold}40` }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accentGold, marginBottom: 10 }}>
              What we want them to hear
            </div>
            <Quote t={t} accent>
              "Dutchie is the AI-powered cannabis platform. Every product is intelligent."
            </Quote>
          </Card>
        </div>

        <KeyInsight t={t}>
          The gap between those two statements is the entire positioning problem. The products don't need to change. The story does.
        </KeyInsight>

        {/* ─── SECTION 2: Three Changes ──────────────────────────────────── */}
        <div style={{ marginTop: 48 }} />
        <Section number="02" title="Three Changes, Ranked by Impact" subtitle="Not a wishlist. Three moves, in priority order, with effort and timeline for each." t={t} />

        {/* Change #1: Name the Agent */}
        <Card t={t} style={{ marginBottom: 20, borderColor: `${t.accentGold}30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <Pill color={t.accentGold}>Change #1</Pill>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '10px 0 4px' }}>
                Name the agent "Dex"
              </h3>
              <div style={{ fontSize: 13, color: t.accentGreen, fontWeight: 600 }}>Low effort, high impact</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4 }}>Effort</div>
              <Wrenches count={1} t={t} />
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4, marginTop: 8 }}>Impact</div>
              <Stars count={5} t={t} />
            </div>
          </div>

          <BeforeAfter
            t={t}
            before={<>"Dutchie Agent" in 12px type, buried in the Intelligence bar alongside a list of capabilities. No personality. No name. Just a generic label.</>}
            after={<><strong style={{ color: t.accentGoldLight }}>"Dex"</strong> — a named agent with gold branding, front and center. "Ask Dex" is a soundbite. "Use Dutchie Agent" is a feature description.</>}
          />

          <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginTop: 12 }}>
            <strong style={{ color: t.text }}>Why this matters for sales:</strong> A named agent gives reps something concrete to demo. "Let me show you Dex" creates a magic moment. It turns an abstract capability into a character the prospect remembers. Alexa, Siri, Copilot — the products that win have names.
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: t.textFaint, fontStyle: 'italic' }}>
            Timeline: Can ship in the next deck revision. No product work required.
          </div>
        </Card>

        {/* Change #2: Badge Nexus */}
        <Card t={t} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <Pill color={t.accentGold}>Change #2</Pill>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '10px 0 4px' }}>
                Badge Nexus as the AI hub
              </h3>
              <div style={{ fontSize: 13, color: t.accentGreen, fontWeight: 600 }}>Low effort, medium impact</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4 }}>Effort</div>
              <Wrenches count={1} t={t} />
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4, marginTop: 8 }}>Impact</div>
              <Stars count={3} t={t} />
            </div>
          </div>

          <BeforeAfter
            t={t}
            before={<>Nexus card says "AI Command Center" but has the same visual weight as E-Commerce, Retail, and Loyalty. It looks like product #4 of 5.</>}
            after={<>Nexus gets a subtle gold accent border, an <strong style={{ color: t.accentGoldLight }}>"AI-Powered"</strong> badge in the corner, and slightly elevated visual treatment. Same card grid, but Nexus clearly stands apart.</>}
          />

          <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginTop: 12 }}>
            <strong style={{ color: t.text }}>Why this matters:</strong> Nexus IS the differentiator. It should look different from Retail and E-Commerce because it IS different. A prospect's eye should be drawn to it. The visual hierarchy should match the strategic hierarchy.
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: t.textFaint, fontStyle: 'italic' }}>
            Timeline: Deck update only. One design pass on the Nexus card.
          </div>
        </Card>

        {/* Change #3: Rebrand Intelligence Bar */}
        <Card t={t} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <Pill color={t.accentGold}>Change #3</Pill>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, fontWeight: 700, color: t.text, margin: '10px 0 4px' }}>
                Rebrand the Intelligence bar as "Powered by Dex"
              </h3>
              <div style={{ fontSize: 13, color: t.accentGoldLight, fontWeight: 600 }}>Medium effort, high impact</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4 }}>Effort</div>
              <Wrenches count={3} t={t} />
              <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 4, marginTop: 8 }}>Impact</div>
              <Stars count={5} t={t} />
            </div>
          </div>

          <BeforeAfter
            t={t}
            before={<>"Intelligence" with a horizontal list of capabilities: Smart Recommendations, Inventory Forecasting, Performance Analytics, etc. Reads like a feature checklist.</>}
            after={<><strong style={{ color: t.accentGoldLight }}>"Powered by Dex"</strong> — the bar becomes a unifying brand statement. Every product above it is intelligent because Dex runs through all of them. Not a feature list. A platform promise.</>}
          />

          <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginTop: 12 }}>
            <strong style={{ color: t.text }}>Why this ties everything together:</strong> The bar stops being "here are some AI features" and starts being "here's the engine that powers all of this." It connects Dex to every pillar above it. Retail is smart because of Dex. E-Commerce converts because of Dex. Loyalty retains because of Dex.
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: t.textFaint, fontStyle: 'italic' }}>
            Timeline: Needs product team alignment on "Powered by Dex" language. One sprint of coordination, then a deck update.
          </div>
        </Card>

        <KeyInsight t={t}>
          These three changes are additive. #1 alone improves the deck. #1 + #2 makes it stronger. All three together create a completely new narrative without touching a single product.
        </KeyInsight>

        {/* ─── SECTION 3: Narrative Arc ──────────────────────────────────── */}
        <div style={{ marginTop: 48 }} />
        <Section number="03" title="The Narrative Arc of the Deck" subtitle="Same slide. Different story. Here's how reps should walk through it." t={t} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <Card t={t} style={{ borderColor: `${t.textFaint}30` }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textFaint, marginBottom: 16 }}>
              Today's story (what reps probably say)
            </div>
            <StoryStep number={1} t={t} text={<>"We do POS" <span style={{ color: t.textFaint }}>(Retail card)</span></>} />
            <StoryStep number={2} t={t} text={<>"We do e-commerce" <span style={{ color: t.textFaint }}>(E-Commerce card)</span></>} />
            <StoryStep number={3} t={t} text={<>"We do loyalty" <span style={{ color: t.textFaint }}>(Loyalty card)</span></>} />
            <StoryStep number={4} t={t} text={<>"We also have this AI thing called Nexus" <span style={{ color: t.textFaint }}>(Nexus card)</span></>} />
            <StoryStep number={5} t={t} text={<>"And a B2B marketplace" <span style={{ color: t.textFaint }}>(Connect card)</span></>} />
            <StoryStep number={6} t={t} text={<>"Oh and there's this intelligence stuff at the bottom"</>} />
            <div style={{ marginTop: 12, padding: '10px 14px', background: `${t.textFaint}08`, borderRadius: 6, fontSize: 12, color: t.textFaint, lineHeight: 1.5 }}>
              Problem: AI comes across as an afterthought. The punchline lands flat because it was never set up.
            </div>
          </Card>

          <Card t={t} style={{ borderColor: `${t.accentGold}30` }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accentGold, marginBottom: 16 }}>
              The new story (what they should say)
            </div>
            <StoryStep number={1} t={t} text={<>"Dutchie is the complete cannabis platform" <span style={{ color: t.textFaint }}>(full slide)</span></>} />
            <StoryStep number={2} t={t} text={<>"Every product you need: POS, e-commerce, loyalty, B2B" <span style={{ color: t.textFaint }}>(gesture at cards)</span></>} />
            <StoryStep number={3} t={t} highlight text={<>"And here's what makes us different from everyone else" <span style={{ color: t.accentGold }}>(point at Nexus)</span></>} />
            <StoryStep number={4} t={t} highlight text={<>"Meet Dex -- your AI assistant that lives in every product" <span style={{ color: t.accentGold }}>(point at Intelligence bar)</span></>} />
            <StoryStep number={5} t={t} highlight text={'"Dex tells your budtenders what to recommend. Dex tells you when to reorder. Dex helps brands find the right retailers."'} />
            <StoryStep number={6} t={t} highlight text={'"No one else has this. Full stop."'} />
            <div style={{ marginTop: 12, padding: '10px 14px', background: `${t.accentGold}0C`, borderRadius: 6, fontSize: 12, color: t.accentGold, lineHeight: 1.5, fontWeight: 500 }}>
              The build-up: features first, then the differentiator. AI is the punchline, not a bullet point.
            </div>
          </Card>
        </div>

        <KeyInsight t={t}>
          The deck shouldn't present AI as a 5th equal pillar. AI should be the PUNCHLINE — the thing that makes all the other pillars special. You build up to it. Features set the table. Dex is the meal.
        </KeyInsight>

        {/* ─── SECTION 4: What NOT to Change ─────────────────────────────── */}
        <div style={{ marginTop: 48 }} />
        <Section number="04" title="What NOT to Change" subtitle="Just as important as what changes. These are deliberate 'keep' decisions, not oversights." t={t} />

        <Card t={t} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textFaint, marginBottom: 16 }}>
            Leave It / Change It
          </div>
          <CheckItem keep t={t} text="Keep all 5 pillars — customers know Retail, E-Commerce, Loyalty, Nexus, Connect. They work." />
          <CheckItem keep t={t} text="Keep the forest green — it's the Dutchie brand. Gold accents for AI, green for everything else." />
          <CheckItem keep t={t} text="Keep the Intelligence bar — it's the right structural idea, just needs a rebrand." />
          <CheckItem keep t={t} text="Keep existing product names — E-Commerce, Retail, Loyalty, Nexus, Connect are established in the market." />
          <CheckItem keep={false} t={t} text="Change 'Dutchie Agent' to 'Dex' — a name beats a label." />
          <CheckItem keep={false} t={t} text="Change 'Intelligence' to 'Powered by Dex' — tie the bar to the agent." />
          <CheckItem keep={false} t={t} text="Change Nexus visual weight — give it a gold badge so it stands out from operational pillars." />
          <CheckItem keep={false} t={t} text="Change the narrative order — build to AI as the differentiator, don't bury it." />
        </Card>

        <Card t={t} style={{ marginBottom: 20, borderColor: `${t.accentGreen}30` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.accentGreen, marginBottom: 8 }}>Do NOT add a 6th pillar for Dex</div>
          <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6 }}>
            It's tempting to give Dex its own card in the pillar row. Don't. That makes AI feel like "one more product you can buy" instead of "the thing that powers everything." Dex lives in the Intelligence bar because it's the foundation, not a feature.
          </div>
        </Card>

        {/* ─── SECTION 5: 30-Second Version ──────────────────────────────── */}
        <div style={{ marginTop: 48 }} />
        <Section number="05" title="The 30-Second Version" subtitle="For the busy executive. One card." t={t} />

        <Card t={t} style={{ borderColor: `${t.accentGold}40`, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.accentGold, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              What to do
            </div>
            {[
              'Name the agent "Dex"',
              'Highlight Dex in the Intelligence bar with gold branding',
              'Rename the Intelligence bar to "Powered by Dex"',
              'Give Nexus a subtle "AI" badge to set it apart visually',
              'Train reps to end on AI as the differentiator, not start with features',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '6px 0', fontSize: 14, color: t.text }}>
                <span style={{ color: t.accentGold, fontWeight: 700, minWidth: 18 }}>{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ padding: 16, background: `${t.textFaint}08`, borderRadius: 8, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textFaint, marginBottom: 8 }}>
                What this costs
              </div>
              <div style={{ fontSize: 14, color: t.text, lineHeight: 1.6 }}>
                A deck update and a product rename. That's it. No engineering sprints. No new features. No replatforming.
              </div>
            </div>
            <div style={{ padding: 16, background: `${t.accentGold}08`, borderRadius: 8, border: `1px solid ${t.accentGold}30` }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.accentGold, marginBottom: 8 }}>
                What this gets you
              </div>
              <div style={{ fontSize: 14, color: t.text, lineHeight: 1.6 }}>
                A named AI product that reps can demo, prospects can remember, and press can write about.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 16, background: `${t.accentGold}0C`, borderRadius: 8, border: `1px solid ${t.accentGold}25` }}>
            <div style={{ fontSize: 15, color: t.text, lineHeight: 1.6, fontWeight: 500 }}>
              <span style={{ color: t.accentGold, fontWeight: 700 }}>"Dutchie launches Dex"</span> is a headline.{' '}
              <span style={{ color: t.textFaint }}>"Dutchie updates Intelligence features"</span> is not.
            </div>
          </div>
        </Card>

        {/* ─── Footer ────────────────────────────────────────────────────── */}
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: t.textFaint }}>
            Positioning Playbook -- Hierarchy & PMM Analysis
          </div>
          <div style={{ fontSize: 12, color: t.textFaint }}>
            Three changes. One narrative. Zero new products.
          </div>
        </div>

      </div>
    </div>
  );
}

export default HierarchyPMMAnalysis;
