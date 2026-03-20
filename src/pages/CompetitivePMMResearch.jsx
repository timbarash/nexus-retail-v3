import React, { useState, useMemo } from 'react';

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGreen: '#047857' }
};

/* ────────────────────────────────────────────
   Company Research Data
   ──────────────────────────────────────────── */

const COMPANIES = [
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'Horizontal Commerce',
    aiProductName: 'Shopify Magic + Sidekick',
    namingConvention: 'Dual-brand: "Magic" for embedded AI tools, "Sidekick" for conversational assistant',
    namingPattern: 'Metaphorical / Approachable',
    pricingApproach: 'AI included free on ALL plans — zero gating, zero usage limits',
    pricingBadge: 'Free on all plans',
    websitePresentation: 'Dedicated /magic landing page with gradient hero. AI framed as a "co-founder" not a tool. Winter 2026 "RenAIssance Edition" shipped 150+ AI-focused updates. Sidekick positioned as proactive (Sidekick Pulse) rather than reactive.',
    messagingHierarchy: [
      'H1: "AI-powered commerce for everyone"',
      'H2: "Your AI co-founder that knows your business"',
      'H3: Feature-specific benefits (write descriptions, edit images, automate flows)',
    ],
    paradoxHandling: 'Solved elegantly: "Magic" = ambient intelligence woven into every surface. "Sidekick" = the named, conversational entity. Users interact with Sidekick but benefit from Magic everywhere without thinking about it.',
    deckPatterns: 'Investor narrative frames Shopify as the "center of AI commerce." Wells Fargo: "primary beneficiary of AI search." Barclays: "agentic commerce coming up quickly." Editions announcements function as quarterly product decks with feature counts (150+).',
    keyTakeaways: [
      'Making AI free removes adoption friction entirely — forces competitors to justify AI upcharges',
      'Dual-naming (ambient + conversational) elegantly solves the "AI everywhere vs. AI as product" tension',
      'Proactive AI (Sidekick Pulse) > reactive AI — the assistant surfaces insights before you ask',
      '"RenAIssance" branding turns AI into a narrative, not just features',
      'Brand Voice Cloning shows how AI can deepen brand identity rather than homogenize it',
    ],
    metrics: { plans: 'All plans', aiCost: '$0 extra', keyFeatures: '150+ AI updates', marketCap: '~$130B' },
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Horizontal CRM',
    aiProductName: 'Breeze AI (Copilot + Agents + Intelligence)',
    namingConvention: 'Umbrella brand "Breeze" with three pillars: Copilot (assistant), Agents (autonomous), Intelligence (data)',
    namingPattern: 'Sensory / Effortless',
    pricingApproach: 'Credit-based system. Basic enrichment free; Agents cost 100 credits (~$1) per conversation. Pro plans include 3,000 credits/mo; Enterprise 5,000. Shared pool across all features.',
    pricingBadge: 'Credit-gated',
    websitePresentation: 'Three-pillar architecture prominently displayed. Copilot follows you across all Hubs. Agents positioned as "autonomous teammates" not tools. Intelligence works silently on data enrichment. Clean visual hierarchy: Breeze > Copilot/Agents/Intelligence > Individual features.',
    messagingHierarchy: [
      'H1: "Breeze — AI that works across your entire customer platform"',
      'H2: Three pillars explained: Copilot assists, Agents act, Intelligence enriches',
      'H3: Specific agent names (Customer Agent, Prospecting Agent, Content Agent, Closing Agent)',
    ],
    paradoxHandling: 'Three-layer architecture explicitly segments AI by autonomy level. Copilot = AI helps you. Agents = AI does it for you. Intelligence = AI enriches silently. Users understand what level of AI they are engaging with.',
    deckPatterns: 'INBOUND conference launches. Content Hub attachment rates surged 13% to 54% with Breeze. Internal "eat your own dog food": 35% of support tickets resolved by AI, targeting 50%+. Agent marketplace with 20+ specialized agents positions HubSpot as AI platform.',
    keyTakeaways: [
      'Three-pillar taxonomy (Copilot/Agents/Intelligence) is the clearest AI architecture in SaaS',
      'Credit system creates monetization but adds friction — shared pool across features causes budget tension',
      'Auto-purchase of credits is a dark pattern that generates customer complaints',
      '"Eat your own dog food" narrative (35% ticket resolution) provides powerful proof points',
      'Agent marketplace creates ecosystem flywheel — others build specialized AI on your platform',
    ],
    metrics: { plans: 'Pro+ required', aiCost: '~$1/conversation', keyFeatures: '4 core agents + marketplace', marketCap: '~$35B' },
  },
  {
    id: 'servicetitan',
    name: 'ServiceTitan',
    category: 'Vertical SaaS — Home Services',
    aiProductName: 'Atlas (powered by Titan Intelligence)',
    namingConvention: 'Mythological hierarchy: "Titan Intelligence" (engine) > "Atlas" (assistant) > "Pro" products (modules) > "Max" program (bundle)',
    namingPattern: 'Mythological / Powerful',
    pricingApproach: 'AI features sold as "Pro" add-on products (Marketing Pro, Scheduling Pro, etc.) and bundled in the "Max Program" for full automation. Premium positioning.',
    pricingBadge: 'Premium add-ons',
    websitePresentation: 'Atlas has a dedicated /features/atlas page. Positioned as "your new champion" — a co-pilot or "chief of staff." Conversational interface for plain English commands. Pantheon conference serves as the primary launch vehicle. Heavy emphasis on the trades vertical identity.',
    messagingHierarchy: [
      'H1: "Atlas — AI for the Trades"',
      'H2: "Your entire leadership team and top performers rolled into one"',
      'H3: Specific Pro product capabilities (dispatch, scheduling, marketing, field guidance)',
    ],
    paradoxHandling: 'Layered architecture: Titan Intelligence is the invisible engine. Atlas is the named assistant users talk to. Pro products are the functional AI capabilities. "Max Program" bundles everything. Users experience Atlas but the AI permeates all Pro products.',
    deckPatterns: 'Pantheon conference keynotes drive narrative. Vahe Kuzoyan frames AI as existential: "not using AI = not using computers." Southern Home Services case study (first enterprise Max Program adoption) validates full-stack AI automation. IPO narrative emphasized AI-driven vertical depth.',
    keyTakeaways: [
      'Mythological naming (Titan, Atlas, Pantheon) creates a cohesive brand universe unique to trades',
      'Layered naming (engine > assistant > modules > bundle) is the most sophisticated hierarchy studied',
      'The "Pro" suffix on everything creates clear premium signal without requiring explanation',
      '"Max Program" as a bundle name is genius — implies both maximum capability and maximum commitment',
      'Vertical specificity ("AI for the Trades") turns limitation into strength — generalists cannot compete on this framing',
    ],
    metrics: { plans: 'Pro add-ons', aiCost: 'Bundled premium', keyFeatures: 'Atlas + 6 Pro products', marketCap: '~$9B' },
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Vertical SaaS — Restaurants',
    aiProductName: 'Toast IQ',
    namingConvention: 'Single branded AI product "Toast IQ" — intelligence ecosystem with conversational assistant',
    namingPattern: 'Intelligence / Analytical',
    pricingApproach: 'Toast IQ is positioned as an evolving intelligence layer within existing plans. Expanding to single-location, multi-unit, and enterprise tiers.',
    pricingBadge: 'Platform-integrated',
    websitePresentation: 'Toast IQ framed as intelligence ecosystem, not just a chatbot. "For you" personalized feed with proactive insights. Partnered with Coca-Cola for AI-powered beverage optimization — signals enterprise credibility. Survey data (86% operator comfort with AI) used as social proof throughout.',
    messagingHierarchy: [
      'H1: "Toast IQ — Smart AI assistant for restaurants"',
      'H2: "Surface tailored, proactive opportunities across sales, labor, and menus"',
      'H3: Specific use cases (competitive benchmarking, demand forecasting, menu optimization)',
    ],
    paradoxHandling: 'Toast IQ is the branded surface, but AI is described as "embedded capability" throughout the platform. The shift from POS company to "intelligence platform" is the strategic narrative. AI positioned as the differentiator that moves Toast beyond transaction processing.',
    deckPatterns: 'Earnings calls frame AI as the competitive moat. CEO Aman Narang emphasizes "doubled market share" and 20% US restaurant penetration. CFO discusses margin impact. 2025 Voice of Industry survey (712 operators) provides data backbone for all AI claims.',
    keyTakeaways: [
      '"IQ" suffix signals intelligence without hype — grounded, analytical positioning vs. "Magic" or "Genius"',
      'Coca-Cola partnership adds enterprise credibility to a mid-market product',
      'Survey-driven positioning (86% comfortable, 81% plan to increase) makes adoption feel inevitable',
      'The POS-to-intelligence narrative is the same journey Dutchie needs: compliance platform to intelligence platform',
      'Proactive "For you" feed pattern > reactive chatbot — operators do not have time to ask questions',
    ],
    metrics: { plans: 'Evolving tiers', aiCost: 'Platform-included', keyFeatures: 'IQ assistant + insights feed', marketCap: '~$18B' },
  },
  {
    id: 'gusto',
    name: 'Gusto',
    category: 'Vertical SaaS — HR/Payroll',
    aiProductName: 'Gus (AI Assistant)',
    namingConvention: 'Friendly diminutive of company name — "Gus" from Gusto. Opt-in assistant.',
    namingPattern: 'Human / Approachable',
    pricingApproach: 'Gus is included in the platform (opt-in). AI Chart of Accounts uses AI suggestions within existing workflow. No separate AI pricing tier.',
    pricingBadge: 'Included (opt-in)',
    websitePresentation: 'AI is understated in Gusto marketing — positioned as a "simplifier" not a revolutionary. Gus is presented as a helpful chat assistant for HR questions, support articles, and task execution (pulling reports, approving time-off). AI Chart of Accounts is the most practical AI feature — maps payroll categories automatically.',
    messagingHierarchy: [
      'H1: "Online HR Services: Payroll, Benefits and everything else"',
      'H2: AI is secondary — lead with simplicity, speed ("payroll in under 5 minutes")',
      'H3: Gus mentioned as a feature among many, not the hero',
    ],
    paradoxHandling: 'Gusto essentially ignores the paradox. AI is a feature, not a strategy. The company leads with payroll simplicity and human-centered benefits. Gus is an opt-in assistant, not a platform transformation. This is a deliberate understatement strategy.',
    deckPatterns: 'Feature Showcase pages (gusto.com/product/showcase/2025) present AI alongside non-AI features equally. Expansion narrative focuses on Gusto Money, international payroll, and benefits — AI is a supporting player. 400,000+ customer base used as primary proof point.',
    keyTakeaways: [
      'Sometimes underplaying AI is the right strategy — when your core value prop is simplicity, AI hype can undermine trust',
      'Naming the assistant after the company (Gus/Gusto) creates brand affinity without requiring new brand equity',
      'Opt-in AI respects user agency — important in regulated domains where users need control',
      'AI Chart of Accounts is the best example of "invisible AI" — it just makes the right thing happen',
      'Counter-example for Dutchie: Gusto proves that not every company needs to lead with AI, but Dutchie has more to gain from it',
    ],
    metrics: { plans: 'All plans (opt-in)', aiCost: '$0 extra', keyFeatures: 'Gus assistant + AI suggestions', marketCap: '~$10B (private)' },
  },
  {
    id: 'veeva',
    name: 'Veeva Systems',
    category: 'Vertical SaaS — Life Sciences',
    aiProductName: 'Veeva AI Agents (on Veeva Vault Platform)',
    namingConvention: 'No branded AI name — "Veeva AI" as descriptor + "Agents" for agentic capabilities. Platform-first, not AI-first naming.',
    namingPattern: 'Platform-Native / Descriptive',
    pricingApproach: 'AI is embedded in the Vault Platform and sold as part of existing enterprise subscriptions. Domain-specific agents released in phases (Dec 2025 through Dec 2026).',
    pricingBadge: 'Enterprise-embedded',
    websitePresentation: 'Veeva does NOT lead with AI on homepage — leads with "Industry Cloud for Life Sciences." AI is positioned as a platform capability within Vault, not a standalone product. Regulatory compliance and data sovereignty are the primary value props. AI agents for CRM and PromoMats launched first, with clinical, regulatory, safety, quality, medical agents planned through 2026.',
    messagingHierarchy: [
      'H1: "The Industry Cloud for Life Sciences" — AI is NOT the headline',
      'H2: "Practical AI with clear business value" — emphasizes practical over revolutionary',
      'H3: Domain-specific agents for specific workflows (CRM, PromoMats, clinical, regulatory)',
    ],
    paradoxHandling: 'Veeva explicitly rejects standalone AI positioning. Their messaging says "Veeva AI is not a standalone product — it is a platform-wide initiative." AI agents have direct, secure access to Veeva data and work within applications. The Vault migration from Salesforce enables deeper AI integration on proprietary infrastructure.',
    deckPatterns: 'Earnings calls emphasize "Great Migration" from Salesforce to Vault as the enabler for AI. $6B revenue target by FY2030 with AI as growth driver. Q4 FY2026 revenue $810M. Domain-specific compliance positioning: AI described as "pre-validated" for pharma — a moat Salesforce cannot easily replicate.',
    keyTakeaways: [
      'In regulated industries, "practical AI with clear business value" > "magical AI"',
      'NOT branding AI separately signals maturity — AI is infrastructure, not a product',
      'Platform migration (Salesforce to Vault) as prerequisite for AI echoes Dutchie build-vs-integrate decisions',
      'Domain-specific compliance creates AI moat — Salesforce Einstein cannot match "pre-validated" pharma AI',
      'MCP (Model Context Protocol) adoption for agent-to-agent communication shows forward thinking on interoperability',
    ],
    metrics: { plans: 'Enterprise', aiCost: 'Platform-included', keyFeatures: 'Domain-specific agents', marketCap: '~$38B' },
  },
];

/* ────────────────────────────────────────────
   Cross-Cutting Analysis Data
   ──────────────────────────────────────────── */

const NAMING_PATTERNS = [
  { pattern: 'Metaphorical Magic', examples: 'Shopify Magic, Canva Magic Studio', signal: 'Effortless, delightful, consumer-friendly', risk: 'Can feel unserious for enterprise', bestFor: 'SMB, creative tools, consumer-facing' },
  { pattern: 'Human / Companion', examples: 'Gus (Gusto), Sidekick (Shopify), Claude', signal: 'Approachable, trustworthy, personal', risk: 'Anthropomorphizing creates false expectations', bestFor: 'Assistants, support, SMB' },
  { pattern: 'Intelligence / IQ', examples: 'Toast IQ, Breeze Intelligence', signal: 'Analytical, data-driven, grounded', risk: 'Can feel sterile or generic', bestFor: 'Analytics, insights, operator-focused tools' },
  { pattern: 'Copilot / Agent', examples: 'GitHub Copilot, Breeze Agents, MS Copilot', signal: 'Augmentation not replacement, professional', risk: 'Overused — "copilot fatigue" in market', bestFor: 'Enterprise, professional workflows' },
  { pattern: 'Mythological / Power', examples: 'Atlas (ServiceTitan), Titan Intelligence', signal: 'Strength, authority, domain mastery', risk: 'Can feel grandiose if product does not deliver', bestFor: 'Vertical SaaS with strong identity' },
  { pattern: 'Sensory / Effortless', examples: 'Breeze (HubSpot), Flow, Spark', signal: 'Lightweight, fast, removes friction', risk: 'May undersell capability', bestFor: 'Platforms with many AI touchpoints' },
  { pattern: 'No Brand (Descriptive)', examples: 'Veeva AI Agents, Notion AI', signal: 'Maturity, AI-as-infrastructure', risk: 'Less memorable, harder to market', bestFor: 'Enterprise, regulated industries' },
];

const PRICING_STRATEGIES = [
  { strategy: 'Free on All Plans', company: 'Shopify', pros: 'Maximum adoption, competitive moat, removes friction', cons: 'Revenue not directly tied to AI value, subsidized by platform', dutchieRelevance: 'High' },
  { strategy: 'Credit-Based', company: 'HubSpot', pros: 'Granular monetization, scales with usage', cons: 'Confusing for users, shared pools create budget tension, no rollover frustrates', dutchieRelevance: 'Medium' },
  { strategy: 'Premium Add-On Bundle', company: 'ServiceTitan', pros: 'Clear premium signal, drives ARPU, "Pro" naming intuitive', cons: 'Adoption limited to paying customers, creates have/have-not divide', dutchieRelevance: 'High' },
  { strategy: 'Platform-Embedded', company: 'Veeva / Toast', pros: 'AI feels native, no separate purchase decision', cons: 'Hard to attribute AI revenue, requires enterprise pricing model', dutchieRelevance: 'Medium' },
  { strategy: 'Outcome-Based', company: 'Zendesk ($1.50/resolution)', pros: 'Perfect value alignment, customers pay for results', cons: 'Hard to define "outcomes" in some verticals, unpredictable revenue', dutchieRelevance: 'Low-Medium' },
];

const TOP_LESSONS = [
  {
    number: 1,
    title: 'Solve the "Everywhere vs. Something" Paradox with Architecture',
    detail: 'Every successful company creates a layered AI architecture. Shopify: Magic (ambient) + Sidekick (conversational). HubSpot: Intelligence (silent) + Copilot (assistant) + Agents (autonomous). ServiceTitan: Titan Intelligence (engine) + Atlas (surface) + Pro (features). The pattern is clear: invisible AI layer + named AI entity + feature-level AI.',
    forDex: 'Dex needs a named intelligence layer (ambient AI woven into compliance, inventory, analytics) AND a named conversational entity (the assistant operators talk to). Two names, one system.',
  },
  {
    number: 2,
    title: 'Vertical Specificity Beats Horizontal Aspiration',
    detail: 'ServiceTitan ("AI for the Trades") and Veeva ("practical AI for life sciences") outperform generic AI messaging. Toast frames IQ around menu optimization, labor forecasting, and competitive benchmarking — problems only restaurants have. Vertical SaaS AI is defensible precisely because general-purpose AI cannot match domain depth.',
    forDex: 'Dex should not say "AI for your business." It should say "AI that knows cannabis compliance, inventory velocity, and customer purchasing patterns better than any general tool ever could."',
  },
  {
    number: 3,
    title: 'Proactive AI > Reactive AI in Operator Tools',
    detail: 'Shopify Sidekick Pulse surfaces insights before you ask. Toast IQ has a "For you" feed of proactive recommendations. ServiceTitan Atlas monitors and alerts. Operators running physical locations do not have time to type questions — AI must come to them.',
    forDex: 'Dex should lead with proactive intelligence: "Dex noticed your top-selling SKU is trending toward stockout in 3 days" rather than waiting for a dispensary operator to ask "how is my inventory?"',
  },
  {
    number: 4,
    title: 'Proof Points Beat Promises — Use Your Own Data',
    detail: 'HubSpot resolves 35% of tickets with AI internally and publishes it. Toast surveyed 712 operators showing 86% AI comfort. Shopify cites "5-10 hours saved per week." ServiceTitan has Southern Home Services as first enterprise Max Program customer. Every company anchors AI claims in specific, verifiable data.',
    forDex: 'Before launch, Dex needs 3-5 concrete proof points: "X% compliance alerts caught automatically," "Y hours saved per week on inventory management," "Z% improvement in order accuracy." Internal pilots create these.',
  },
  {
    number: 5,
    title: 'AI Naming Should Match Brand Energy, Not Follow Trends',
    detail: 'ServiceTitan chose mythological (Atlas/Titan) because it matches their brand universe. Gusto chose "Gus" because it matches their friendly brand. Shopify chose "Magic" because commerce feels magical. HubSpot chose "Breeze" because CRM should feel effortless. None of them chose "Copilot" — the most generic option.',
    forDex: 'Dex already has a strong, short, punchy name. The AI should extend that energy — not adopt a borrowed naming pattern. "Dex Intelligence" or a name that feels native to the cannabis/retail vertical.',
  },
];

const ANTI_PATTERNS = [
  { pattern: 'Credit System Confusion', offender: 'HubSpot', detail: 'Shared credit pools across all AI features mean one team can drain another team\'s budget. No rollover. Auto-purchase enabled by default. Customers report surprise bills. Lesson: if you gate AI behind credits, make the system transparent and give users control.' },
  { pattern: 'AI as Afterthought Marketing', offender: 'Various mid-market SaaS', detail: 'Slapping "AI-powered" on existing features without meaningful intelligence. Autocomplete is not AI. Spell check is not AI. Users see through thin AI claims quickly, and it erodes trust for features that ARE genuinely AI-powered.' },
  { pattern: 'Overpromising Autonomy', offender: 'Early AI agent marketing', detail: 'Positioning AI as "fully autonomous" when it requires constant oversight. HubSpot initially described Agents as "autonomous teammates" but user reviews note they need significant setup and monitoring. Set expectations for "AI-assisted" before claiming "AI-automated."' },
  { pattern: 'Generic AI Naming', offender: 'The entire "Copilot" trend', detail: 'Microsoft, GitHub, Salesforce, and dozens of others all use "Copilot." The term is so saturated it has lost all distinctiveness. By 2026, "copilot" is a category descriptor, not a brand. Avoid it unless you can own it (Microsoft barely can).' },
  { pattern: 'AI Gating Behind Enterprise Only', offender: 'Legacy enterprise SaaS', detail: '68% of vendors in 2025 restricted AI to premium tiers. But Shopify proved that making AI free on all plans creates massive adoption and competitive moat. Gating AI too aggressively creates a two-class system that slows adoption.' },
  { pattern: 'Ignoring Regulatory Context', offender: 'Horizontal AI tools in regulated verticals', detail: 'Veeva succeeds because its AI is "pre-validated" for pharma compliance. Cannabis is similarly regulated. Any AI positioning for Dutchie/Dex must address compliance trust head-on, not ignore it.' },
];

const DEX_FRAMEWORK = {
  positioning: 'The Intelligence Layer for Cannabis Retail',
  headline: 'Dex knows your business better than any general AI ever could.',
  subheadline: 'Purpose-built intelligence for compliance, inventory, and customer insights — woven into every workflow.',
  pillars: [
    { name: 'Dex Intelligence', description: 'Ambient AI that silently optimizes compliance, catches risks, and surfaces trends across your operation. You never have to ask — it just works.', parallel: 'Like Shopify Magic / Breeze Intelligence / Titan Intelligence' },
    { name: 'Dex Advisor', description: 'Your conversational cannabis retail expert. Ask about inventory velocity, compliance deadlines, customer trends, or operational benchmarks. It speaks your language.', parallel: 'Like Sidekick / Atlas / Toast IQ assistant' },
    { name: 'Dex Automations', description: 'AI-powered workflows that handle the repetitive work: reorder suggestions, compliance filings, customer communications, and reporting. Set it and trust it.', parallel: 'Like Breeze Agents / ServiceTitan Pro products' },
  ],
  pricingRecommendation: 'Hybrid: Core Dex Intelligence included on all plans (Shopify model). Dex Advisor and Dex Automations as premium features or usage-based (ServiceTitan Pro model). This drives adoption on base while creating clear premium upgrade path.',
  proofPointsNeeded: [
    'Compliance alerts caught before violation (% accuracy)',
    'Hours saved per week on inventory management',
    'Revenue impact from AI-powered product recommendations',
    'Reduction in out-of-stock incidents',
    'Customer return rate improvement from better matching',
  ],
};


/* ────────────────────────────────────────────
   Sub-Components
   ──────────────────────────────────────────── */

function TabBar({ tabs, activeTab, onTabChange, t }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${t.border}`, marginBottom: 24, overflowX: 'auto', paddingBottom: 0 }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '10px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === tab.id ? `2px solid ${t.accentGold}` : '2px solid transparent',
            color: activeTab === tab.id ? t.accentGold : t.textMuted,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: activeTab === tab.id ? 600 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function Card({ children, t, style = {} }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: 24,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CalloutBox({ title, children, t, variant = 'gold' }) {
  const accentColor = variant === 'gold' ? t.accentGold : t.accentGreen;
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${accentColor}33`,
      borderLeft: `3px solid ${accentColor}`,
      borderRadius: 8,
      padding: '16px 20px',
      marginBottom: 16,
    }}>
      {title && (
        <div style={{ fontSize: 13, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
          {title}
        </div>
      )}
      <div style={{ color: t.text, fontSize: 14, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

function Badge({ label, t, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      background: `${color || t.accentGold}18`,
      color: color || t.accentGold,
      letterSpacing: 0.3,
    }}>
      {label}
    </span>
  );
}

function SectionHeader({ title, subtitle, t }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: t.textMuted, margin: '6px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

function CompanyDeepDive({ company, t }) {
  return (
    <Card t={t} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, margin: 0 }}>{company.name}</h3>
          <span style={{ fontSize: 13, color: t.textMuted }}>{company.category}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge label={company.namingPattern} t={t} />
          <Badge label={company.pricingBadge} t={t} color={t.accentGreen} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>AI Product Name</div>
          <div style={{ fontSize: 15, color: t.text, fontWeight: 600 }}>{company.aiProductName}</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.5 }}>{company.namingConvention}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Pricing Approach</div>
          <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{company.pricingApproach}</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Website & Visual Presentation</div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{company.websitePresentation}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Messaging Hierarchy</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {company.messagingHierarchy.map((msg, i) => (
            <div key={i} style={{ fontSize: 13, color: i === 0 ? t.text : t.textMuted, fontWeight: i === 0 ? 600 : 400, paddingLeft: i * 12, lineHeight: 1.5 }}>
              {msg}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>The "AI Everywhere" Paradox</div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{company.paradoxHandling}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Deck / Investor Patterns</div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{company.deckPatterns}</div>
        </div>
      </div>

      <div style={{ background: `${t.accentGreen}08`, border: `1px solid ${t.accentGreen}20`, borderRadius: 6, padding: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Key Takeaways for Dutchie</div>
        <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'none' }}>
          {company.keyTakeaways.map((takeaway, i) => (
            <li key={i} style={{ fontSize: 13, color: t.text, lineHeight: 1.6, marginBottom: 4, position: 'relative', paddingLeft: 4 }}>
              <span style={{ color: t.accentGreen, marginRight: 6 }}>-&gt;</span>{takeaway}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
        {Object.entries(company.metrics).map(([key, val]) => (
          <div key={key} style={{ flex: '1 1 120px', background: `${t.border}44`, borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: 0.5 }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            <div style={{ fontSize: 14, color: t.text, fontWeight: 600, marginTop: 2 }}>{val}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}


/* ────────────────────────────────────────────
   Comparison Table Section
   ──────────────────────────────────────────── */

function ComparisonTableSection({ t }) {
  const headerStyle = { fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.6, padding: '10px 12px', borderBottom: `1px solid ${t.border}`, textAlign: 'left', whiteSpace: 'nowrap' };
  const cellStyle = { fontSize: 13, color: t.text, padding: '10px 12px', borderBottom: `1px solid ${t.border}22`, verticalAlign: 'top', lineHeight: 1.5 };
  const mutedCell = { ...cellStyle, color: t.textMuted };

  return (
    <div style={{ overflowX: 'auto' }}>
      <SectionHeader title="Comparison Matrix" subtitle="Side-by-side analysis across all six companies" t={t} />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif' }}>
        <thead>
          <tr style={{ background: `${t.border}33` }}>
            <th style={headerStyle}>Company</th>
            <th style={headerStyle}>AI Brand Name</th>
            <th style={headerStyle}>Naming Pattern</th>
            <th style={headerStyle}>Pricing Model</th>
            <th style={headerStyle}>Paradox Solution</th>
            <th style={headerStyle}>Headline Focus</th>
          </tr>
        </thead>
        <tbody>
          {COMPANIES.map((c, i) => (
            <tr key={c.id} style={{ background: i % 2 === 0 ? 'transparent' : `${t.border}15` }}>
              <td style={{ ...cellStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>{c.name}</td>
              <td style={cellStyle}>{c.aiProductName}</td>
              <td style={mutedCell}>{c.namingPattern}</td>
              <td style={mutedCell}>{c.pricingBadge}</td>
              <td style={mutedCell}>
                {c.id === 'shopify' && 'Dual-brand: ambient + conversational'}
                {c.id === 'hubspot' && 'Three-tier autonomy levels'}
                {c.id === 'servicetitan' && 'Layered: engine > assistant > modules'}
                {c.id === 'toast' && 'Intelligence ecosystem framing'}
                {c.id === 'gusto' && 'Deliberate understatement'}
                {c.id === 'veeva' && 'AI as platform infrastructure'}
              </td>
              <td style={mutedCell}>
                {c.id === 'shopify' && 'AI-powered commerce for everyone'}
                {c.id === 'hubspot' && 'AI across your entire platform'}
                {c.id === 'servicetitan' && 'AI for the Trades'}
                {c.id === 'toast' && 'Smart AI for restaurants'}
                {c.id === 'gusto' && 'Simplicity first, AI second'}
                {c.id === 'veeva' && 'Industry Cloud (AI secondary)'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ────────────────────────────────────────────
   Naming Patterns Section
   ──────────────────────────────────────────── */

function NamingPatternsSection({ t }) {
  return (
    <div>
      <SectionHeader
        title="AI Product Naming Taxonomy"
        subtitle="Seven distinct naming patterns observed across SaaS AI products, with examples and strategic implications"
        t={t}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {NAMING_PATTERNS.map(p => (
          <Card key={p.pattern} t={t} style={{ padding: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>{p.pattern}</div>
            <div style={{ fontSize: 12, color: t.accentGold, marginBottom: 10 }}>{p.examples}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.accentGreen }}>SIGNALS: </span>
                <span style={{ fontSize: 12, color: t.textMuted }}>{p.signal}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#E87068' }}>RISK: </span>
                <span style={{ fontSize: 12, color: t.textMuted }}>{p.risk}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.textFaint }}>BEST FOR: </span>
                <span style={{ fontSize: 12, color: t.textMuted }}>{p.bestFor}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CalloutBox title="Naming Recommendation for Dex" t={t} variant="gold" style={{ marginTop: 20 }}>
        <div style={{ lineHeight: 1.7 }}>
          <strong>Avoid:</strong> "Copilot" (saturated), "Genius" (overpromises), "Magic" (too consumer-y for cannabis compliance).<br />
          <strong>Consider:</strong> Extending "Dex" naturally — "Dex Intelligence," "Dex Advisor," "Dex Insights." The brand is already short, memorable, and distinctive. A separate AI brand name risks diluting it.<br />
          <strong>Best Pattern Match:</strong> Intelligence / Analytical (like Toast IQ) or Platform-Native / Descriptive (like Veeva AI). Cannabis retail operators need to trust the AI, not be dazzled by it.
        </div>
      </CalloutBox>
    </div>
  );
}


/* ────────────────────────────────────────────
   Pricing Strategies Section
   ──────────────────────────────────────────── */

function PricingSection({ t }) {
  const headerStyle = { fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.6, padding: '10px 12px', borderBottom: `1px solid ${t.border}`, textAlign: 'left' };
  const cellStyle = { fontSize: 13, color: t.text, padding: '10px 12px', borderBottom: `1px solid ${t.border}22`, verticalAlign: 'top', lineHeight: 1.5 };

  return (
    <div>
      <SectionHeader
        title="AI Pricing Strategy Analysis"
        subtitle="How companies monetize AI — from free-for-all to outcome-based, and what each means for Dutchie"
        t={t}
      />

      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif' }}>
          <thead>
            <tr style={{ background: `${t.border}33` }}>
              <th style={headerStyle}>Strategy</th>
              <th style={headerStyle}>Example</th>
              <th style={headerStyle}>Pros</th>
              <th style={headerStyle}>Cons</th>
              <th style={headerStyle}>Dutchie Fit</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_STRATEGIES.map((s, i) => (
              <tr key={s.strategy} style={{ background: i % 2 === 0 ? 'transparent' : `${t.border}15` }}>
                <td style={{ ...cellStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.strategy}</td>
                <td style={{ ...cellStyle, color: t.textMuted }}>{s.company}</td>
                <td style={{ ...cellStyle, color: t.textMuted }}>{s.pros}</td>
                <td style={{ ...cellStyle, color: t.textMuted }}>{s.cons}</td>
                <td style={cellStyle}>
                  <Badge label={s.dutchieRelevance} t={t} color={s.dutchieRelevance === 'High' ? t.accentGreen : t.textFaint} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalloutBox title="Pricing Recommendation for Dex" t={t} variant="gold">
        <div style={{ lineHeight: 1.7 }}>
          <strong>Recommended: Hybrid model (Shopify base + ServiceTitan premium).</strong><br /><br />
          <strong>Layer 1 — Free on all plans:</strong> Core Dex Intelligence (compliance monitoring, basic inventory alerts, trend summaries). This is the Shopify play — make the base AI so good that competitors must match it or explain why they charge extra.<br /><br />
          <strong>Layer 2 — Premium add-on:</strong> Dex Advisor (conversational) + Dex Automations (agentic workflows). This is the ServiceTitan "Pro" play — clear premium value that drives ARPU.<br /><br />
          <strong>Avoid:</strong> Credit-based systems (HubSpot's shared pool model creates customer confusion and resentment). Avoid enterprise-only gating (slows adoption). Avoid outcome-based pricing until you have enough data to define outcomes clearly.
        </div>
      </CalloutBox>

      <Card t={t} style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Industry Context: The Macro Pricing Shift</div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
          AI inference costs fell 78% through 2025. Seat-based SaaS pricing is being disrupted by usage and outcome models. AI-first SaaS gross margins run 20-60% vs. 70-90% for traditional SaaS — COGS matters again. 68% of vendors restricted AI to premium tiers in 2025, but the Shopify counter-example proves free AI can be a more powerful growth lever. The "renewal cliff" of 2026 means AI pricing that promised value but did not deliver will face churn. Dutchie should plan pricing that reflects demonstrable value from day one.
        </div>
      </Card>
    </div>
  );
}


/* ────────────────────────────────────────────
   Top Lessons Section
   ──────────────────────────────────────────── */

function LessonsSection({ t }) {
  return (
    <div>
      <SectionHeader
        title="Top 5 PMM Lessons for Dutchie"
        subtitle="Synthesized from all six company analyses and cross-cutting research"
        t={t}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {TOP_LESSONS.map(lesson => (
          <Card key={lesson.number} t={t}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: `${t.accentGold}18`, color: t.accentGold,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, flexShrink: 0,
              }}>
                {lesson.number}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>{lesson.title}</div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 12 }}>{lesson.detail}</div>
                <div style={{ background: `${t.accentGreen}08`, border: `1px solid ${t.accentGreen}20`, borderRadius: 6, padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: 0.6 }}>For Dex: </span>
                  <span style={{ fontSize: 13, color: t.text, lineHeight: 1.6 }}>{lesson.forDex}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────
   Anti-Patterns Section
   ──────────────────────────────────────────── */

function AntiPatternsSection({ t }) {
  return (
    <div>
      <SectionHeader
        title="Anti-Patterns to Avoid"
        subtitle="What companies do poorly with AI positioning — and how Dutchie can steer clear"
        t={t}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {ANTI_PATTERNS.map(ap => (
          <Card key={ap.pattern} t={t} style={{ borderLeft: '3px solid #E87068', padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 4 }}>{ap.pattern}</div>
            <div style={{ fontSize: 11, color: '#E87068', fontWeight: 600, marginBottom: 8 }}>Observed at: {ap.offender}</div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{ap.detail}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────
   Dex Framework Section
   ──────────────────────────────────────────── */

function DexFrameworkSection({ t }) {
  return (
    <div>
      <SectionHeader
        title="Recommended Messaging Framework for Dex"
        subtitle="Synthesized from competitive research — a three-pillar architecture for Dex AI positioning"
        t={t}
      />

      <Card t={t} style={{ marginBottom: 20, borderLeft: `3px solid ${t.accentGold}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Positioning Statement</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 8 }}>{DEX_FRAMEWORK.positioning}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 6 }}>{DEX_FRAMEWORK.headline}</div>
        <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.5 }}>{DEX_FRAMEWORK.subheadline}</div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 20 }}>
        {DEX_FRAMEWORK.pillars.map((pillar, i) => (
          <Card key={pillar.name} t={t} style={{ borderTop: `2px solid ${i === 0 ? t.accentGold : i === 1 ? t.accentGreen : '#7C6BE0'}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>{pillar.name}</div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 10 }}>{pillar.description}</div>
            <div style={{ fontSize: 11, color: t.textFaint, fontStyle: 'italic' }}>{pillar.parallel}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        <CalloutBox title="Pricing Recommendation" t={t} variant="gold">
          <div style={{ lineHeight: 1.7 }}>{DEX_FRAMEWORK.pricingRecommendation}</div>
        </CalloutBox>

        <CalloutBox title="Proof Points Needed Before Launch" t={t} variant="green">
          <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'none' }}>
            {DEX_FRAMEWORK.proofPointsNeeded.map((pp, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 2 }}>
                <span style={{ color: t.accentGreen, marginRight: 6 }}>{i + 1}.</span>{pp}
              </li>
            ))}
          </ul>
        </CalloutBox>
      </div>

      <Card t={t} style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Messaging Do's and Don'ts</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Do</div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {[
                'Lead with cannabis-specific intelligence, not generic AI',
                'Use "knows your business" language (like Shopify\'s co-founder framing)',
                'Show proactive insights ("Dex noticed...") not just reactive search',
                'Anchor every claim in a specific, verifiable metric',
                'Position compliance AI as table stakes, not a premium feature',
                'Use "intelligence" over "artificial intelligence" — less loaded, more professional',
                'Frame AI as extending human expertise, not replacing dispensary staff',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>+</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#E87068', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Don't</div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {[
                'Call it a "Copilot" — term is saturated and generic by 2026',
                'Use "magic" or "genius" — too consumer-y for a compliance-sensitive industry',
                'Promise autonomous operation without proving reliability first',
                'Gate basic compliance AI behind premium — it should build trust on every tier',
                'Use credit-based pricing with shared pools — learned from HubSpot\'s mistakes',
                'Lead with "AI-powered" on the homepage — lead with value, reveal AI as enabler',
                'Ignore regulatory context — cannabis operators need to know AI respects compliance boundaries',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#E87068' }}>-</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card t={t} style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Sample Messaging Hierarchy for Dex Marketing Page</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { level: 'Hero H1', text: 'Your dispensary, running smarter.', note: 'Leads with outcome, not technology. AI is implicit.' },
            { level: 'Hero H2', text: 'Dex brings purpose-built intelligence to every corner of cannabis retail — from compliance to inventory to customer insights.', note: 'Introduces "intelligence" framing without saying "AI."' },
            { level: 'Section Header', text: 'Intelligence that knows cannabis.', note: 'Vertical specificity. Signals depth over breadth.' },
            { level: 'Feature Card 1', text: 'Dex Intelligence: Your compliance safety net that never sleeps.', note: 'Ambient AI pillar. Compliance is the trust anchor.' },
            { level: 'Feature Card 2', text: 'Dex Advisor: Ask anything about your business. Get answers that actually know the industry.', note: 'Conversational AI pillar. "Actually know" differentiates from generic chatbots.' },
            { level: 'Feature Card 3', text: 'Dex Automations: The workflows that used to take hours, handled.', note: 'Agentic AI pillar. Time savings is the value prop.' },
            { level: 'Proof Section', text: 'Dispensaries using Dex Intelligence catch 94% of compliance issues before they become violations.', note: 'Specific metric. Anchors trust. (Placeholder — needs real data from pilot.)' },
            { level: 'CTA', text: 'See how Dex works for your operation.', note: 'Personalized. Not "try AI" — that is a feature. "Works for your operation" is a benefit.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, alignItems: 'start', padding: '8px 0', borderBottom: i < 7 ? `1px solid ${t.border}22` : 'none' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 0.5, paddingTop: 2 }}>{item.level}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>{item.text}</div>
                <div style={{ fontSize: 12, color: t.textFaint, fontStyle: 'italic' }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


/* ────────────────────────────────────────────
   Native AI Trends Section
   ──────────────────────────────────────────── */

function NativeAITrendsSection({ t }) {
  return (
    <div>
      <SectionHeader
        title="'Native AI' Positioning Trends"
        subtitle="How the best companies signal that AI is built in, not bolted on"
        t={t}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          {
            title: 'Platform Migration as AI Enabler',
            company: 'Veeva',
            detail: 'Veeva\'s "Great Migration" from Salesforce to proprietary Vault infrastructure is explicitly framed as the prerequisite for AI. Moving off third-party platforms enables deeper data access, tighter integration, and domain-specific AI that would be impossible on generic infrastructure. Seven of the top 20 pharma companies have committed to Vault.',
            lesson: 'Dutchie\'s own platform consolidation (Connect, Dex) is the same narrative — proprietary infrastructure enables AI that third-party tools cannot match.',
          },
          {
            title: 'AI Engine + AI Surface Separation',
            company: 'ServiceTitan / Shopify',
            detail: 'The most effective AI architectures separate the intelligence engine (Titan Intelligence, Shopify Magic) from the user-facing surface (Atlas, Sidekick). This lets the engine evolve independently, powers multiple surfaces, and creates a coherent story: "intelligence everywhere, interact here."',
            lesson: 'Dex should have a named intelligence engine that powers all AI features, and a separate named interface (advisor/assistant) that users interact with directly.',
          },
          {
            title: 'Domain Data as AI Moat',
            company: 'All Verticals',
            detail: 'Every vertical SaaS company positions proprietary data as their AI advantage. ServiceTitan has trade contractor operations data. Toast has restaurant transaction data. Veeva has life sciences compliance data. HubSpot has B2B interaction data (200M+ profiles). The common message: "Our AI is better because our data is deeper."',
            lesson: 'Dutchie processes cannabis retail transactions across dispensaries nationwide. This data — purchasing patterns, compliance patterns, inventory velocity — is the AI moat. The messaging should emphasize this: "Dex is trained on real cannabis retail data, not generic models."',
          },
          {
            title: 'Proactive Over Reactive Framing',
            company: 'Shopify / Toast',
            detail: 'Shopify Sidekick Pulse "works proactively in the background, analyzing store data and surfacing personalized recommendations before you even ask." Toast IQ has a "For you" feed. The trend is clear: the best AI comes to the user with insights, rather than waiting to be asked.',
            lesson: 'Lead Dex marketing with proactive intelligence: alerts, recommendations, and insights that surface automatically. Frame the assistant as the fallback, not the primary interaction.',
          },
          {
            title: 'Compliance-First AI Trust',
            company: 'Veeva',
            detail: 'Veeva\'s AI is described as "pre-validated" for pharmaceutical compliance. Their AI agents have "direct and secure access across Veeva data" with explicit compliance boundaries. In regulated industries, AI trust is not about capability — it is about compliance confidence.',
            lesson: 'Cannabis is heavily regulated. Dex AI must lead with compliance trust: "Every AI recommendation respects your state\'s regulatory requirements." This is the single most important differentiator vs. generic AI tools.',
          },
          {
            title: 'The "Not a Standalone Product" Declaration',
            company: 'Veeva',
            detail: 'Veeva explicitly says: "Veeva AI is not a standalone product — it is a platform-wide initiative." This framing kills the "bolted-on" objection. AI is infrastructure, not an add-on. It is the platform getting smarter, not a separate tool you have to learn.',
            lesson: 'Dex should never feel like a separate product. The messaging should be: "Dex did not add AI. Dex IS intelligence." This is the strongest version of the native AI narrative.',
          },
        ].map(trend => (
          <Card key={trend.title} t={t} style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{trend.title}</div>
              <Badge label={trend.company} t={t} />
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 10 }}>{trend.detail}</div>
            <div style={{ background: `${t.accentGreen}08`, border: `1px solid ${t.accentGreen}20`, borderRadius: 6, padding: '8px 12px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen }}>DUTCHIE LESSON: </span>
              <span style={{ fontSize: 12, color: t.text, lineHeight: 1.5 }}>{trend.lesson}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */

const TABS = [
  { id: 'overview', label: 'Overview & Matrix' },
  { id: 'companies', label: 'Company Deep Dives' },
  { id: 'naming', label: 'Naming Patterns' },
  { id: 'pricing', label: 'AI Pricing' },
  { id: 'trends', label: 'Native AI Trends' },
  { id: 'lessons', label: 'Top 5 Lessons' },
  { id: 'antipatterns', label: 'Anti-Patterns' },
  { id: 'dex', label: 'Dex Framework' },
];

export function CompetitivePMMResearch({ theme = 'dark' }) {
  const t = themes[theme] || themes.dark;
  const [activeTab, setActiveTab] = useState('overview');
  const [companyFilter, setCompanyFilter] = useState('all');

  const filteredCompanies = useMemo(() => {
    if (companyFilter === 'all') return COMPANIES;
    if (companyFilter === 'vertical') return COMPANIES.filter(c => c.category.startsWith('Vertical'));
    if (companyFilter === 'horizontal') return COMPANIES.filter(c => c.category.startsWith('Horizontal'));
    return COMPANIES;
  }, [companyFilter]);

  return (
    <div style={{
      background: t.bg,
      color: t.text,
      fontFamily: 'DM Sans, sans-serif',
      minHeight: '100vh',
      padding: '32px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>
            Competitive PMM Research
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: t.text, margin: '0 0 8px', lineHeight: 1.2 }}>
            How the Best SaaS Companies Position AI
          </h1>
          <p style={{ fontSize: 15, color: t.textMuted, margin: 0, lineHeight: 1.5, maxWidth: 720 }}>
            Deep competitive intelligence across 6 companies — Shopify, HubSpot, ServiceTitan, Toast, Gusto, and Veeva Systems — analyzing AI naming, messaging, pricing, and positioning patterns to inform Dex strategy.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { label: '6 Companies', sub: 'Analyzed' },
              { label: '7 Naming Patterns', sub: 'Cataloged' },
              { label: '5 Pricing Models', sub: 'Compared' },
              { label: '6 Anti-Patterns', sub: 'Identified' },
              { label: '3-Pillar Framework', sub: 'For Dex' },
            ].map(stat => (
              <div key={stat.label} style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: '10px 16px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.accentGold }}>{stat.label}</div>
                <div style={{ fontSize: 11, color: t.textFaint }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} t={t} />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <CalloutBox title="Executive Summary" t={t} variant="gold">
              <div style={{ lineHeight: 1.7 }}>
                The most effective AI positioning in SaaS follows a clear pattern: <strong>layer invisible intelligence across the platform</strong> (the engine), <strong>give users a named entity to interact with</strong> (the assistant), and <strong>package specific AI capabilities as premium features</strong> (the modules). Shopify, HubSpot, and ServiceTitan all converge on this three-layer architecture despite very different markets. For vertical SaaS specifically, the winning formula is domain-specific intelligence positioned as a natural extension of existing workflows — not a separate product. Veeva says it best: "Veeva AI is not a standalone product." Cannabis retail follows the same logic: the AI must know compliance, inventory, and customer patterns at a depth no horizontal tool can match, and it must be presented as the platform getting smarter, not a bolt-on feature.
              </div>
            </CalloutBox>
            <ComparisonTableSection t={t} />

            <div style={{ marginTop: 24 }}>
              <SectionHeader title="Quick-Reference: AI Architecture Patterns" subtitle="How each company structures the relationship between invisible AI, named AI, and feature AI" t={t} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
                {[
                  { company: 'Shopify', layers: ['Magic (ambient engine)', 'Sidekick (conversational)', 'Feature-level tools (descriptions, images, email)'], color: '#96BF48' },
                  { company: 'HubSpot', layers: ['Intelligence (data enrichment)', 'Copilot (assistant)', 'Agents (autonomous workers)'], color: '#FF7A59' },
                  { company: 'ServiceTitan', layers: ['Titan Intelligence (engine)', 'Atlas (assistant)', 'Pro Products (feature modules)'], color: '#0095FF' },
                  { company: 'Toast', layers: ['Platform data layer', 'Toast IQ (assistant + insights)', 'Feature-specific AI (menu, labor, sales)'], color: '#FF6B35' },
                  { company: 'Gusto', layers: ['AI suggestions (ambient)', 'Gus (opt-in assistant)', 'Feature-level (chart of accounts, S-corp advisor)'], color: '#00C27C' },
                  { company: 'Veeva', layers: ['Vault Platform AI (infrastructure)', 'Veeva AI Agents (domain-specific)', 'Application-level intelligence'], color: '#F68D2E' },
                ].map(item => (
                  <Card key={item.company} t={t} style={{ padding: 16, borderTop: `2px solid ${item.color}` }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 }}>{item.company}</div>
                    {item.layers.map((layer, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, paddingLeft: i * 16 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? item.color : i === 1 ? `${item.color}88` : `${item.color}44`, flexShrink: 0 }} />
                        <div style={{ fontSize: 12, color: i === 0 ? t.text : t.textMuted }}>
                          <span style={{ fontWeight: i === 0 ? 600 : 400 }}>L{i + 1}: </span>{layer}
                        </div>
                      </div>
                    ))}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[
                { id: 'all', label: 'All Companies' },
                { id: 'vertical', label: 'Vertical SaaS Only' },
                { id: 'horizontal', label: 'Horizontal Only' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setCompanyFilter(f.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: `1px solid ${companyFilter === f.id ? t.accentGold : t.border}`,
                    background: companyFilter === f.id ? `${t.accentGold}15` : 'transparent',
                    color: companyFilter === f.id ? t.accentGold : t.textMuted,
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {filteredCompanies.map(c => (
              <CompanyDeepDive key={c.id} company={c} t={t} />
            ))}
          </div>
        )}

        {/* Naming Tab */}
        {activeTab === 'naming' && <NamingPatternsSection t={t} />}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && <PricingSection t={t} />}

        {/* Trends Tab */}
        {activeTab === 'trends' && <NativeAITrendsSection t={t} />}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && <LessonsSection t={t} />}

        {/* Anti-Patterns Tab */}
        {activeTab === 'antipatterns' && <AntiPatternsSection t={t} />}

        {/* Dex Framework Tab */}
        {activeTab === 'dex' && <DexFrameworkSection t={t} />}

        {/* Footer */}
        <div style={{ marginTop: 40, padding: '16px 0', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 11, color: t.textFaint }}>
            Competitive PMM Research — March 2026 — For internal strategy use
          </div>
          <div style={{ fontSize: 11, color: t.textFaint }}>
            Sources: Shopify.com, HubSpot.com, ServiceTitan.com, Toast POS, Gusto.com, Veeva.com, Bessemer, Metronome, Wing VC, L.E.K. Consulting
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetitivePMMResearch;
