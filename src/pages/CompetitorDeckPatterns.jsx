import React, { useState } from 'react';

// ─── Design Tokens ────────────────────────────────────────────────────────────

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGreen: '#047857' }
};

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── Primitive Components ─────────────────────────────────────────────────────

const Section = ({ number, title, subtitle, t }) => (
  <div style={{ marginBottom: 36, paddingBottom: 18, borderBottom: `2px solid ${t.accentGold}` }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accentGold, background: `${t.accentGold}18`, padding: '3px 9px', borderRadius: 4 }}>
        {number}
      </span>
      <h2 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ fontFamily: FONT, fontSize: 14, color: t.textMuted, marginTop: 8, marginBottom: 0, maxWidth: 720 }}>{subtitle}</p>}
  </div>
);

const Card = ({ children, t, style = {} }) => (
  <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 24, fontFamily: FONT, ...style }}>
    {children}
  </div>
);

const Pill = ({ children, color }) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: `${color}1A`, color, fontFamily: FONT }}>
    {children}
  </span>
);

const KeyInsight = ({ children, t }) => (
  <div style={{ background: `${t.accentGold}0C`, border: `1px solid ${t.accentGold}40`, borderRadius: 10, padding: 20, fontFamily: FONT, margin: '24px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 8 }}>Key Insight</div>
    <div style={{ fontSize: 15, color: t.text, lineHeight: 1.6, fontWeight: 500 }}>{children}</div>
  </div>
);

const Quote = ({ children, t, accent = false }) => (
  <div style={{ borderLeft: `3px solid ${accent ? t.accentGold : t.border}`, paddingLeft: 18, margin: '16px 0', fontFamily: FONT, fontSize: 15, fontStyle: 'italic', color: accent ? t.text : t.textMuted, lineHeight: 1.6, fontWeight: accent ? 600 : 400 }}>
    {children}
  </div>
);

const GradeBar = ({ label, grade, t }) => {
  const gradeColors = { A: t.accentGreen, B: t.accentGoldLight, C: t.accentGold, D: '#FF6B6B' };
  const widths = { A: '95%', B: '75%', C: '55%', D: '35%' };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: t.textMuted, fontFamily: FONT }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: gradeColors[grade] || t.textFaint, fontFamily: FONT }}>{grade}</span>
      </div>
      <div style={{ height: 6, background: `${t.textFaint}20`, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: widths[grade] || '50%', background: gradeColors[grade] || t.textFaint, borderRadius: 3, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
};

// ─── Architecture Diagram Components ──────────────────────────────────────────

const LayerDiagram = ({ layers, t, label }) => (
  <div style={{ margin: '16px 0' }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textFaint, marginBottom: 10, fontFamily: FONT }}>{label}</div>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {layers.map((layer, i) => (
        <div key={i} style={{
          background: layer.highlight ? `${layer.color || t.accentGold}18` : `${t.textFaint}0A`,
          border: `1px solid ${layer.highlight ? (layer.color || t.accentGold) + '50' : t.border}`,
          borderRadius: 8,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: FONT,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: layer.highlight ? (layer.color || t.accentGold) : t.text }}>{layer.name}</span>
          </div>
          <span style={{ fontSize: 11, color: t.textFaint }}>{layer.type}</span>
        </div>
      ))}
    </div>
  </div>
);

const HubSpokeDiagram = ({ center, spokes, t }) => (
  <div style={{ position: 'relative', margin: '20px auto', width: 280, height: 280 }}>
    {/* Center */}
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
      width: 90, height: 90, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `${t.accentGold}20`, border: `2px solid ${t.accentGold}`, fontFamily: FONT,
      fontSize: 12, fontWeight: 700, color: t.accentGold, textAlign: 'center', padding: 8, lineHeight: 1.3
    }}>
      {center}
    </div>
    {/* Spokes */}
    {spokes.map((spoke, i) => {
      const angle = (i * 360 / spokes.length - 90) * (Math.PI / 180);
      const x = 140 + Math.cos(angle) * 110;
      const y = 140 + Math.sin(angle) * 110;
      return (
        <div key={i} style={{
          position: 'absolute', left: x - 40, top: y - 20,
          width: 80, height: 40, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${t.textFaint}12`, border: `1px solid ${t.border}`,
          fontFamily: FONT, fontSize: 10, fontWeight: 500, color: t.textMuted, textAlign: 'center', padding: 4, lineHeight: 1.2
        }}>
          {spoke}
        </div>
      );
    })}
    {/* Connection lines (SVG) */}
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={280} height={280}>
      {spokes.map((_, i) => {
        const angle = (i * 360 / spokes.length - 90) * (Math.PI / 180);
        const x = 140 + Math.cos(angle) * 65;
        const y = 140 + Math.sin(angle) * 65;
        return <line key={i} x1={140} y1={140} x2={x} y2={y} stroke={`${t.textFaint}40`} strokeWidth={1} strokeDasharray="4 4" />;
      })}
    </svg>
  </div>
);

const PillarDiagram = ({ pillars, bar, t }) => (
  <div style={{ margin: '16px 0' }}>
    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
      {pillars.map((p, i) => (
        <div key={i} style={{
          flex: 1, background: `${t.textFaint}0A`, border: `1px solid ${t.border}`, borderRadius: '8px 8px 0 0',
          padding: '12px 8px', textAlign: 'center', fontFamily: FONT, fontSize: 11, fontWeight: 600, color: t.text, lineHeight: 1.3,
        }}>
          {p}
        </div>
      ))}
    </div>
    {bar && (
      <div style={{
        background: `${bar.color || t.accentGold}18`, border: `1px solid ${(bar.color || t.accentGold)}50`,
        borderRadius: '0 0 8px 8px', padding: '10px 16px', textAlign: 'center',
        fontFamily: FONT, fontSize: 12, fontWeight: 700, color: bar.color || t.accentGold,
      }}>
        {bar.label}
      </div>
    )}
  </div>
);

// ─── Company Data ─────────────────────────────────────────────────────────────

const companies = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    brandColor: '#00A1E0',
    aiName: 'Agentforce (prev. Einstein)',
    category: 'Horizontal CRM',
    revenue: '$38B+ (FY2025)',
    pattern: 'Full Platform Rebrand',
    patternKey: 'rebrand',
    summary: 'Salesforce made the boldest move in the industry: they rebranded their entire product suite around their AI. Sales Cloud became "Agentforce Sales," Service Cloud became "Agentforce Service." The AI IS the product now, not a feature on top.',
    evolution: [
      { era: '2016-2022', label: 'Einstein AI', desc: 'AI as a feature badge sprinkled on existing clouds. "Sales Cloud with Einstein" felt like a checkbox.' },
      { era: '2023-2024', label: 'Einstein Copilot', desc: 'AI elevated to a visible assistant. Still felt bolted onto the existing product architecture.' },
      { era: '2025-2026', label: 'Agentforce', desc: 'Complete rebrand. AI IS the platform. Products renamed Agentforce Sales, Agentforce Service. Atlas Reasoning Engine at the core.' },
    ],
    structure: {
      type: 'Layered Cake / Full Rebrand',
      visual: 'Stacked layers: Data Cloud at bottom, Einstein 1 Platform middleware, Agentforce AI engine, individual Agentforce-branded products at top, Trust Layer wrapping everything.',
      aiPosition: 'AI IS the platform. Not a feature, not even a product -- the entire identity.',
      naming: 'Parent brand subsumed into AI brand. "Agentforce" replaced "Cloud" in product names.',
      visualWeight: 'AI gets 100% of visual weight. The old product names (Sales Cloud, etc.) are de-emphasized or gone.',
    },
    layers: [
      { name: 'Agentforce Sales / Service / Marketing', type: 'Products', highlight: false },
      { name: 'Agentforce AI + Atlas Reasoning Engine', type: 'AI Platform', highlight: true, color: '#00A1E0' },
      { name: 'Data Cloud (3T+ tokens/month)', type: 'Data Layer', highlight: false },
      { name: 'Einstein 1 Platform', type: 'Foundation', highlight: false },
      { name: 'Einstein Trust Layer', type: 'Security', highlight: false },
    ],
    grades: { clarity: 'A', aiPositioning: 'A', complexity: 'C', applicability: 'C' },
    lesson: 'Only works if you are fully committed to AI as your identity and willing to deprecate your existing brand equity. Salesforce had $38B in brand recognition behind "Cloud" and they still took the leap. This is the nuclear option.',
    antiPattern: 'Requires massive brand equity to absorb the confusion of renaming everything. Smaller companies cannot pull this off without confusing existing customers.',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    brandColor: '#FF7A59',
    aiName: 'Breeze AI',
    category: 'Horizontal CRM/Marketing',
    revenue: '$2.6B+ (2024)',
    pattern: 'AI Woven Through Hubs',
    patternKey: 'woven',
    summary: 'HubSpot keeps its Hub architecture (Marketing Hub, Sales Hub, Service Hub) completely intact and weaves Breeze AI through every hub as a capability layer. They also introduced Breeze Agents, Breeze Studio, and Breeze Marketplace as the AI becomes more autonomous.',
    evolution: [
      { era: '2023', label: 'ChatSpot', desc: 'Experimental chatbot, separate from core product. Felt like a side project.' },
      { era: '2024', label: 'Breeze AI', desc: 'Unified AI brand introduced. Copilot + Intelligence + Agents. Integrated into every Hub.' },
      { era: '2025', label: 'Breeze Agents + Studio', desc: '20+ specialized agents, Breeze Studio for customization, Breeze Marketplace. AI becomes operational infrastructure.' },
    ],
    structure: {
      type: 'Hub-and-Spoke with AI Woven Through',
      visual: 'The familiar Hub tiles (Marketing, Sales, Service, CMS, Operations, Commerce) remain the primary visual. Breeze appears as a horizontal bar or overlay that touches every hub. Data Hub added as the AI foundation.',
      aiPosition: 'AI as a capability that amplifies every existing product. Not a separate product to buy -- it is FREE for all plan subscribers.',
      naming: '"Breeze" is a distinct brand but clearly subordinate to "HubSpot." Product names unchanged. No confusion.',
      visualWeight: 'Products get 70% weight, AI gets 30%. The Hubs are the hero; Breeze is the accelerant.',
    },
    layers: [
      { name: 'Marketing Hub | Sales Hub | Service Hub | CMS | Operations | Commerce', type: 'Products', highlight: false },
      { name: 'Breeze AI (Copilot + Intelligence + Agents)', type: 'AI Layer', highlight: true, color: '#FF7A59' },
      { name: 'Data Hub + Smart CRM', type: 'Data Layer', highlight: false },
    ],
    grades: { clarity: 'A', aiPositioning: 'B', complexity: 'A', applicability: 'A' },
    lesson: 'This is the safest, most elegant approach for a multi-product platform. Your products remain the hero. AI is a named capability layer that makes every product better. No customer confusion. No brand disruption. The key insight: HubSpot made Breeze FREE, removing friction entirely.',
    antiPattern: 'Risk of AI feeling like "just a feature" if you do not give it enough narrative weight. HubSpot compensates with the separate Breeze brand and agent ecosystem.',
  },
  {
    id: 'toast',
    name: 'Toast',
    brandColor: '#FF6633',
    aiName: '(No distinct AI brand)',
    category: 'Vertical SaaS (Restaurants)',
    revenue: '$6B+ (2025)',
    pattern: 'Platform Pillar Grid',
    patternKey: 'pillar-grid',
    summary: 'Toast is the closest industry comp to Dutchie: vertical SaaS for a regulated industry with hardware + software. They present products as a modular grid of capabilities anchored by POS hardware. AI is not given a distinct brand -- it is embedded in "smarter" features across the platform.',
    evolution: [
      { era: '2013-2019', label: 'POS Company', desc: 'Started as restaurant POS hardware + software. The hardware WAS the product.' },
      { era: '2020-2023', label: 'Platform Expansion', desc: 'Added Online Ordering, Payroll, Marketing, Supply Chain. Became "restaurant operating system."' },
      { era: '2024-2026', label: 'Intelligence Embedded', desc: 'AI appears in recommendations, analytics, and automation. No distinct AI brand. 164,000+ locations.' },
    ],
    structure: {
      type: 'Modular Platform Grid',
      visual: 'Products arranged as equal-weight tiles/cards: POS, Online Ordering, Payments, Team Management, Marketing & Loyalty, Inventory, Capital. Hardware products (Flex, Go, Kiosk) shown as a separate hardware row.',
      aiPosition: 'AI has NO distinct brand or layer. Intelligence is baked into analytics, recommendations, and automation features within each module. Invisible AI.',
      naming: 'All products use "Toast" prefix: Toast POS, Toast Go, Toast Payroll, Toast Tables. Extremely consistent. AI gets no name.',
      visualWeight: 'Products get 100% weight. AI is invisible in the architecture. Hardware gets significant weight.',
    },
    layers: [
      { name: 'Toast POS | Online Ordering | Payments | Team Mgmt | Marketing | Inventory | Capital', type: 'Products', highlight: false },
      { name: '(AI embedded in features -- no distinct layer)', type: 'Invisible AI', highlight: false },
      { name: 'Toast Hardware: Flex, Go, Kiosk', type: 'Hardware', highlight: true, color: '#FF6633' },
    ],
    grades: { clarity: 'A', aiPositioning: 'D', complexity: 'A', applicability: 'B' },
    lesson: 'The modular grid is clean and easy to understand, but Toast is BEHIND on AI positioning. They have not created an AI narrative. For Dutchie, this validates the pillar grid structure but shows the danger of having no AI story. Dutchie is already ahead of Toast here.',
    antiPattern: 'Completely invisible AI means you get no credit for AI investment. In a market where AI is a buying criterion, this is leaving money on the table.',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    brandColor: '#96BF48',
    aiName: 'Sidekick / Shopify Magic',
    category: 'Horizontal Commerce',
    revenue: '$8.9B+ (2024)',
    pattern: 'AI as Character/Companion',
    patternKey: 'character',
    summary: 'Shopify takes a unique approach: AI is personified as "Sidekick," positioned as a co-founder/co-worker. Magic is the capability brand. The product architecture remains commerce-first, but AI gets a personality and a narrative role.',
    evolution: [
      { era: '2023', label: 'Shopify Magic', desc: 'AI as a collection of discrete features: product descriptions, image editing. Feature-level AI.' },
      { era: '2024-2025', label: 'Sidekick Launch', desc: 'AI gets a character/personality. "Your AI co-worker." Conversational interface for store management.' },
      { era: '2026', label: 'RenAIssance Edition', desc: '150+ AI updates. Sidekick Pulse (proactive AI), agentic storefronts, Tinker app. "Declarative commerce" vision.' },
    ],
    structure: {
      type: 'Commerce Platform + AI Character',
      visual: 'Core commerce tools (storefront, payments, shipping, marketing, analytics) presented as the platform. Sidekick floats above/alongside as a distinct character -- almost like a mascot with capabilities.',
      aiPosition: 'AI as a character/companion. Sidekick is "your co-founder." Not a layer, not a product -- a personality. Magic is the behind-the-scenes capability brand.',
      naming: 'Two AI brands: "Sidekick" (the character) and "Shopify Magic" (the capabilities). Clever split between persona and technology.',
      visualWeight: 'Commerce tools get 60% weight, Sidekick gets 40%. AI is prominent but subordinate to the core platform.',
    },
    layers: [
      { name: 'Sidekick (AI Co-Worker / Character)', type: 'AI Character', highlight: true, color: '#96BF48' },
      { name: 'Storefront | Payments | Shipping | Marketing | Analytics', type: 'Commerce Tools', highlight: false },
      { name: 'Shopify Magic (AI Engine)', type: 'AI Capabilities', highlight: false },
    ],
    grades: { clarity: 'B', aiPositioning: 'A', complexity: 'B', applicability: 'B' },
    lesson: 'Personifying AI as a character creates emotional connection and makes abstract technology tangible. "Sidekick" is memorable. However, this approach works best for SMB-focused products where the merchant IS the user. For B2B enterprise, a "character" might feel too casual.',
    antiPattern: 'Dual AI brands (Sidekick + Magic) can confuse. Which is the AI? The character or the engine? Shopify manages it but it adds cognitive load.',
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    brandColor: '#81B5A1',
    aiName: 'Now Assist',
    category: 'Enterprise Workflow',
    revenue: '$10.9B+ (2024)',
    pattern: 'AI Skills Layer Across Modules',
    patternKey: 'skills-layer',
    summary: 'ServiceNow uses the "skills and agents" model: Now Assist is a collection of AI skills bundled into packages for each department (ITSM, HRSD, CSM, Creator). AI is modular and maps cleanly to the existing module structure.',
    evolution: [
      { era: '2019-2022', label: 'Now Intelligence', desc: 'Predictive intelligence features embedded in platform. Machine learning for routing, classification.' },
      { era: '2023-2024', label: 'Now Assist', desc: 'GenAI capabilities launched. Skills-based architecture. LLM integration for summarization, drafting, search.' },
      { era: '2025-2026', label: 'AI Agents', desc: 'Autonomous agents that chain multiple skills. Goal-driven automation across IT, HR, Customer Service.' },
    ],
    structure: {
      type: 'Module Grid + AI Skills Overlay',
      visual: 'Department modules (ITSM, HRSD, CSM, Creator) shown as primary cards. Now Assist appears as a horizontal capability bar with individual "skills" that map to each module: "Now Assist for ITSM," "Now Assist for CSM," etc.',
      aiPosition: 'AI as a licensed add-on layer with module-specific packaging. Sold separately (Pro Plus / Enterprise Plus). Very enterprise.',
      naming: '"Now Assist" follows the "Now" platform brand. Clean, enterprise-appropriate. Skills and Agents as sub-concepts.',
      visualWeight: 'Modules get 60% weight, Now Assist gets 40%. The AI layer is prominent but clearly additive.',
    },
    layers: [
      { name: 'Now Assist: Skills + AI Agents', type: 'AI Layer (Licensed)', highlight: true, color: '#81B5A1' },
      { name: 'ITSM | HRSD | CSM | Creator', type: 'Workflow Modules', highlight: false },
      { name: 'Now Platform + Flow Designer', type: 'Foundation', highlight: false },
    ],
    grades: { clarity: 'A', aiPositioning: 'B', complexity: 'B', applicability: 'B' },
    lesson: 'The "Now Assist for [Module]" naming pattern is extremely clean for enterprise buyers. Each department knows exactly which AI package they need. The skills-based architecture makes AI tangible -- it is not magic, it is specific capabilities.',
    antiPattern: 'Separate licensing for AI can create friction. Customers who do not buy Pro Plus feel like they are getting an inferior product. HubSpot makes AI free; ServiceNow charges extra.',
  },
  {
    id: 'dutchie',
    name: 'Dutchie (Current)',
    brandColor: '#00C27C',
    aiName: 'Intelligence / AI-powered',
    category: 'Vertical SaaS (Cannabis)',
    revenue: '$22B+ GMV facilitated',
    pattern: '5 Pillars + Intelligence Bar',
    patternKey: 'pillar-bar',
    summary: 'Dutchie currently presents five product pillars (POS, E-Commerce, Payments, Loyalty & Marketing, Intelligence) with Intelligence as a horizontal bar underneath. The 2.0 launch added AI personalization, ML-powered recommendations, and 360-degree analytics.',
    evolution: [
      { era: '2017-2021', label: 'Ordering Platform', desc: 'Started as online ordering marketplace for cannabis. Consumer-facing.' },
      { era: '2021-2023', label: 'Acquisitions', desc: 'Acquired POS (Greenbits, LeafLogix), payments. Became "operating system" for dispensaries.' },
      { era: '2024-2026', label: 'Dutchie 2.0 + E-Commerce Pro', desc: 'AI personalization, ML recommendations, 360 reporting. E-Commerce Pro with 50% more online sales. 6,500+ dispensaries.' },
    ],
    structure: {
      type: '5 Pillars + Intelligence Bar',
      visual: 'Five equal-width columns (POS, E-Commerce, Payments, Loyalty & Marketing, Intelligence) with Intelligence sometimes shown as a horizontal bar spanning the bottom.',
      aiPosition: 'Ambiguous. "Intelligence" is both a product pillar AND a cross-cutting capability. Is it a thing you buy, or a thing that powers everything?',
      naming: '"Intelligence" is generic. Not branded. Not memorable. Competes with product names for attention. "Dutchie 2.0" carries the AI story but is a version, not a product.',
      visualWeight: 'All five pillars get equal weight, which makes Intelligence feel like one-of-five instead of the connective tissue.',
    },
    layers: [
      { name: 'POS | E-Commerce | Payments | Loyalty & Marketing | Intelligence', type: 'Products (Equal Weight)', highlight: false },
      { name: '(Intelligence as pillar AND cross-cut -- unclear)', type: 'Ambiguous AI', highlight: true, color: '#00C27C' },
    ],
    grades: { clarity: 'C', aiPositioning: 'C', complexity: 'B', applicability: 'N/A' },
    lesson: 'The current structure communicates "we have five things" but does not communicate "our platform is intelligent." Making Intelligence one-of-five pillars actually DIMINISHES the AI story. It should either be the foundation (like Salesforce) or the overlay (like HubSpot).',
    antiPattern: 'When AI is one of N equal pillars, it gets 1/N of the attention. It becomes "just another product" rather than the transformative capability it should be.',
  },
];

// ─── Pattern Library Data ─────────────────────────────────────────────────────

const patterns = [
  {
    id: 'full-rebrand',
    name: 'Full Platform Rebrand',
    icon: '1',
    description: 'Rename everything around AI. The AI IS the product.',
    example: 'Salesforce: Sales Cloud -> Agentforce Sales',
    pros: ['Maximum AI positioning', 'Forces internal alignment', 'Future-proof narrative'],
    cons: ['Destroys existing brand equity', 'Confuses current customers', 'Requires massive marketing spend'],
    bestFor: 'Dominant market leaders who can absorb brand disruption',
    dutchieScore: 2,
  },
  {
    id: 'woven-layer',
    name: 'AI Woven Through Products',
    icon: '2',
    description: 'Products remain the hero. AI is a named capability layer that amplifies every product.',
    example: 'HubSpot: Marketing Hub + Sales Hub + ... with Breeze AI woven through',
    pros: ['No brand disruption', 'Products stay clear', 'AI feels additive, not threatening', 'Can be free (lowers friction)'],
    cons: ['AI might feel like "just a feature"', 'Requires strong AI sub-brand to stand out'],
    bestFor: 'Multi-product platforms that want AI credit without brand risk',
    dutchieScore: 5,
  },
  {
    id: 'modular-grid',
    name: 'Modular Platform Grid',
    icon: '3',
    description: 'Products as equal tiles. AI invisible or embedded in features.',
    example: 'Toast: POS + Online Ordering + Payments + Team + Marketing (no AI brand)',
    pros: ['Extremely clear product story', 'Easy to understand', 'No cognitive overhead'],
    cons: ['No AI narrative at all', 'Invisible AI = no credit for AI investment', 'Feels behind in 2025+'],
    bestFor: 'Companies where AI is not yet a competitive differentiator',
    dutchieScore: 1,
  },
  {
    id: 'ai-character',
    name: 'AI as Character/Companion',
    icon: '4',
    description: 'AI gets a personality and name. Positioned as a "co-worker" or "assistant."',
    example: 'Shopify: Sidekick as your AI co-founder + Shopify Magic as the engine',
    pros: ['Emotionally resonant', 'Memorable', 'Makes AI tangible and approachable'],
    cons: ['Can feel too casual for enterprise', 'Dual brands (character + engine) add complexity', 'Character may age poorly'],
    bestFor: 'SMB-focused platforms where the user is the owner',
    dutchieScore: 3,
  },
  {
    id: 'skills-overlay',
    name: 'AI Skills Layer Across Modules',
    icon: '5',
    description: 'AI packaged as specific "skills" that map to each department/module.',
    example: 'ServiceNow: Now Assist for ITSM / Now Assist for HRSD / Now Assist for CSM',
    pros: ['Very clear for enterprise buyers', 'Modular licensing', 'Each dept knows their AI package'],
    cons: ['Separate licensing creates friction', 'Feels transactional not transformative', 'Premium pricing barrier'],
    bestFor: 'Enterprise platforms with department-specific buyers',
    dutchieScore: 3,
  },
];

// ─── Tab Component ────────────────────────────────────────────────────────────

const TabBar = ({ tabs, activeTab, onTabChange, t }) => (
  <div style={{ display: 'flex', gap: 2, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          fontFamily: FONT, fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
          padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
          background: activeTab === tab.id ? `${t.accentGold}20` : 'transparent',
          color: activeTab === tab.id ? t.accentGold : t.textMuted,
          whiteSpace: 'nowrap', transition: 'all 0.2s ease',
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// ─── Company Detail Card ──────────────────────────────────────────────────────

const CompanyCard = ({ company, t, expanded, onToggle }) => {
  const c = company;
  return (
    <Card t={t} style={{ marginBottom: 16 }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            {/* Company "Logo" */}
            <div style={{
              width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${c.brandColor}20`, border: `1.5px solid ${c.brandColor}60`,
              fontFamily: FONT, fontSize: 16, fontWeight: 800, color: c.brandColor,
            }}>
              {c.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: t.text }}>{c.name}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint }}>{c.category} &middot; {c.revenue}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <Pill color={c.brandColor}>{c.pattern}</Pill>
            <Pill color={t.textMuted}>AI: {c.aiName}</Pill>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 14, color: t.textMuted, lineHeight: 1.6, margin: 0 }}>{c.summary}</p>
        </div>
        <div style={{
          fontSize: 20, color: t.textFaint, transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s ease', marginTop: 4, flexShrink: 0,
        }}>
          v
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div style={{ marginTop: 24, borderTop: `1px solid ${t.border}`, paddingTop: 24 }}>
          {/* Evolution Timeline */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              AI Evolution Timeline
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {c.evolution.map((evo, i) => (
                <div key={i} style={{
                  flex: '1 1 200px', minWidth: 200, background: `${t.textFaint}08`, border: `1px solid ${t.border}`,
                  borderRadius: 8, padding: 14,
                }}>
                  <div style={{ fontFamily: FONT, fontSize: 11, color: t.textFaint, marginBottom: 4 }}>{evo.era}</div>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: c.brandColor, marginBottom: 6 }}>{evo.label}</div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{evo.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>Architecture Diagram</div>
              <LayerDiagram layers={c.layers} t={t} />
            </div>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8 }}>Structure Analysis</div>
              <div style={{ fontFamily: FONT, fontSize: 12, lineHeight: 1.7, color: t.textMuted }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, color: t.text }}>Pattern:</span> {c.structure.type}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, color: t.text }}>AI Position:</span> {c.structure.aiPosition}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, color: t.text }}>Naming:</span> {c.structure.naming}
                </div>
                <div>
                  <span style={{ fontWeight: 700, color: t.text }}>Visual Weight:</span> {c.structure.visualWeight}
                </div>
              </div>
            </div>
          </div>

          {/* Grades */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Scorecard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <GradeBar label="Clarity of product hierarchy" grade={c.grades.clarity} t={t} />
              <GradeBar label="AI positioning strength" grade={c.grades.aiPositioning} t={t} />
              <GradeBar label="Simplicity / low cognitive load" grade={c.grades.complexity} t={t} />
              <GradeBar label="Applicability to Dutchie" grade={c.grades.applicability} t={t} />
            </div>
          </div>

          {/* Lesson for Dutchie */}
          <KeyInsight t={t}>
            <strong>Lesson for Dutchie:</strong> {c.lesson}
          </KeyInsight>
          <div style={{ fontFamily: FONT, fontSize: 13, color: t.textFaint, marginTop: 8 }}>
            <span style={{ fontWeight: 700, color: '#FF6B6B' }}>Anti-pattern warning:</span> {c.antiPattern}
          </div>
        </div>
      )}
    </Card>
  );
};

// ─── Pattern Library Card ─────────────────────────────────────────────────────

const PatternCard = ({ pattern, t, isRecommended }) => {
  const p = pattern;
  const starCount = p.dutchieScore;
  return (
    <Card t={t} style={{
      marginBottom: 16,
      border: isRecommended ? `2px solid ${t.accentGold}` : `1px solid ${t.border}`,
      position: 'relative',
    }}>
      {isRecommended && (
        <div style={{
          position: 'absolute', top: -10, right: 16,
          background: t.accentGold, color: '#0A0908',
          fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 4,
        }}>
          Recommended for Dutchie
        </div>
      )}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: isRecommended ? `${t.accentGold}20` : `${t.textFaint}12`,
          border: `1.5px solid ${isRecommended ? t.accentGold : t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT, fontSize: 18, fontWeight: 800, color: isRecommended ? t.accentGold : t.textMuted,
        }}>
          {p.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 4 }}>{p.name}</div>
          <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.5, marginBottom: 8 }}>{p.description}</div>
          <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint, marginBottom: 12, fontStyle: 'italic' }}>Example: {p.example}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Pros</div>
              {p.pros.map((pro, i) => (
                <div key={i} style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, marginBottom: 4, paddingLeft: 12, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>+</span>
                  {pro}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#FF6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Cons</div>
              {p.cons.map((con, i) => (
                <div key={i} style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, marginBottom: 4, paddingLeft: 12, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#FF6B6B' }}>-</span>
                  {con}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint }}>
              <span style={{ fontWeight: 600 }}>Best for:</span> {p.bestFor}
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: i <= starCount ? t.accentGold : `${t.textFaint}30`,
                }} />
              ))}
              <span style={{ fontFamily: FONT, fontSize: 10, color: t.textFaint, marginLeft: 4 }}>Dutchie fit</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function CompetitorDeckPatterns({ theme = 'dark' }) {
  const t = themes[theme];
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCompany, setExpandedCompany] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'companies', label: 'Company Deep-Dives' },
    { id: 'patterns', label: 'Pattern Library' },
    { id: 'synthesis', label: 'Synthesis' },
    { id: 'recommendation', label: 'Recommendation' },
  ];

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: '48px 32px', fontFamily: FONT }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 10 }}>
            Competitive Intelligence
          </div>
          <h1 style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: t.text, margin: '0 0 12px 0', lineHeight: 1.2 }}>
            Product + AI Deck Patterns
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 16, color: t.textMuted, margin: 0, maxWidth: 700, lineHeight: 1.6 }}>
            How do leading B2B SaaS companies solve the same problem Dutchie faces: "We have multiple products AND an AI layer -- how do we present this in a single visual?"
          </p>
        </div>

        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} t={t} />

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && (
          <>
            <Section number="01" title="The Core Problem" subtitle="Every multi-product SaaS company adding AI faces the same architectural dilemma." t={t} />

            <Card t={t} style={{ marginBottom: 24 }}>
              <Quote t={t} accent>
                "We have 4-6 products our customers know and buy. We also have an AI/intelligence layer that makes all of them better. How do we show both without AI feeling like 'just a feature' or our products getting lost behind AI hype?"
              </Quote>
              <div style={{ fontFamily: FONT, fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginTop: 16 }}>
                This analysis examines six companies -- Salesforce, HubSpot, Toast, Shopify, ServiceNow, and Dutchie -- to identify the patterns, anti-patterns, and the optimal approach for a vertical SaaS platform in cannabis retail.
              </div>
            </Card>

            {/* Comparison Matrix */}
            <Section number="02" title="Quick Comparison Matrix" subtitle="Six companies, five dimensions, one goal: present products + AI clearly." t={t} />

            <div style={{ overflowX: 'auto', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT, fontSize: 12 }}>
                <thead>
                  <tr>
                    {['Company', 'Pattern', 'AI Brand', 'AI Position', 'Visual Weight', 'Clarity'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${t.border}`,
                        color: t.textFaint, fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c, i) => (
                    <tr key={c.id} style={{ background: i % 2 === 0 ? 'transparent' : `${t.textFaint}06` }}>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, fontWeight: 700, color: c.brandColor }}>{c.name}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, color: t.text }}>{c.pattern}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, color: t.textMuted }}>{c.aiName}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, color: t.textMuted }}>{c.structure.type.split(' / ')[0]}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40`, color: t.textMuted }}>{c.structure.visualWeight.split('.')[0]}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${t.border}40` }}>
                        <span style={{
                          fontWeight: 700,
                          color: c.grades.clarity === 'A' ? t.accentGreen : c.grades.clarity === 'B' ? t.accentGoldLight : t.accentGold,
                        }}>{c.grades.clarity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* The Spectrum */}
            <Section number="03" title="The AI Positioning Spectrum" subtitle="From invisible AI to AI-is-the-product, every company sits somewhere on this line." t={t} />

            <Card t={t} style={{ marginBottom: 32 }}>
              <div style={{ position: 'relative', height: 120, marginBottom: 16 }}>
                {/* Spectrum line */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, top: 50,
                  height: 4, borderRadius: 2,
                  background: `linear-gradient(90deg, ${t.textFaint}40, ${t.accentGold}40, ${t.accentGoldLight}80)`,
                }} />
                {/* Labels */}
                <div style={{ position: 'absolute', left: 0, top: 62, fontFamily: FONT, fontSize: 10, color: t.textFaint }}>
                  AI Invisible
                </div>
                <div style={{ position: 'absolute', left: '50%', top: 62, transform: 'translateX(-50%)', fontFamily: FONT, fontSize: 10, color: t.textFaint }}>
                  AI as Layer
                </div>
                <div style={{ position: 'absolute', right: 0, top: 62, fontFamily: FONT, fontSize: 10, color: t.textFaint }}>
                  AI IS Product
                </div>
                {/* Company positions */}
                {[
                  { name: 'Toast', x: '8%', color: '#FF6633' },
                  { name: 'Dutchie', x: '35%', color: '#00C27C' },
                  { name: 'ServiceNow', x: '48%', color: '#81B5A1' },
                  { name: 'HubSpot', x: '55%', color: '#FF7A59' },
                  { name: 'Shopify', x: '68%', color: '#96BF48' },
                  { name: 'Salesforce', x: '92%', color: '#00A1E0' },
                ].map((pos) => (
                  <div key={pos.name} style={{ position: 'absolute', left: pos.x, top: 16, transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%', background: pos.color, margin: '0 auto 4px',
                      border: `2px solid ${t.bg}`, boxShadow: `0 0 0 1px ${pos.color}60`,
                    }} />
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 600, color: pos.color, whiteSpace: 'nowrap' }}>{pos.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
                <strong style={{ color: t.text }}>Dutchie sits in the ambiguous middle.</strong> The 5-pillar structure treats Intelligence as "one of five products," but the actual Dutchie 2.0 story is about AI as a transformative platform capability. The structure undersells the narrative.
              </div>
            </Card>
          </>
        )}

        {/* ═══ COMPANIES TAB ═══ */}
        {activeTab === 'companies' && (
          <>
            <Section number="04" title="Company Deep-Dives" subtitle="Click each company to expand their full architecture analysis, evolution timeline, and lessons for Dutchie." t={t} />

            {companies.map(c => (
              <CompanyCard
                key={c.id}
                company={c}
                t={t}
                expanded={expandedCompany === c.id}
                onToggle={() => setExpandedCompany(expandedCompany === c.id ? null : c.id)}
              />
            ))}
          </>
        )}

        {/* ═══ PATTERNS TAB ═══ */}
        {activeTab === 'patterns' && (
          <>
            <Section number="05" title="Pattern Library" subtitle="The five recurring patterns for presenting products + AI in a single visual. Rated by fit for Dutchie." t={t} />

            {patterns.map(p => (
              <PatternCard key={p.id} pattern={p} t={t} isRecommended={p.id === 'woven-layer'} />
            ))}

            <KeyInsight t={t}>
              <strong>Pattern #2 ("AI Woven Through Products") scores highest for Dutchie.</strong> It preserves the existing product pillars (POS, E-Commerce, Payments, Loyalty & Marketing) that dispensary buyers already understand, while elevating AI from "one of five pillars" to the connective tissue that makes every pillar smarter.
            </KeyInsight>
          </>
        )}

        {/* ═══ SYNTHESIS TAB ═══ */}
        {activeTab === 'synthesis' && (
          <>
            <Section number="06" title="Cross-Company Synthesis" subtitle="What patterns do the best companies use? What are the anti-patterns? What is right for Dutchie?" t={t} />

            {/* What the best do */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.accentGreen, marginBottom: 16 }}>
                What the Best Companies Get Right
              </div>
              {[
                { title: 'AI gets its own brand name', detail: 'Breeze, Sidekick, Now Assist, Agentforce -- not "Intelligence" or "AI-powered." A name creates identity, memorability, and something sales can sell.' },
                { title: 'Products remain the anchor', detail: 'Except Salesforce (who can afford the nuclear option), every company keeps their product names stable. Customers buy products, not AI concepts.' },
                { title: 'AI is visually distinct from products', detail: 'Whether it is a horizontal bar (HubSpot), a character (Shopify), or a skills layer (ServiceNow), AI occupies a DIFFERENT visual plane than products. It is never one-of-N.' },
                { title: 'Data layer is made explicit', detail: 'Salesforce (Data Cloud), HubSpot (Data Hub + Smart CRM), ServiceNow (Now Platform). The data foundation is shown because AI without data is meaningless.' },
                { title: 'Evolution is narrated, not hidden', detail: 'Every company tells the story of their AI journey. "We started with features, graduated to copilots, now have autonomous agents." This builds confidence.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 24, height: 24, borderRadius: 6,
                    background: `${t.accentGreen}20`, border: `1px solid ${t.accentGreen}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT, fontSize: 11, fontWeight: 700, color: t.accentGreen,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Anti-patterns */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#FF6B6B', marginBottom: 16 }}>
                Anti-Patterns to Avoid
              </div>
              {[
                { title: 'AI as one-of-N equal pillars', detail: 'Dutchie\'s current structure. When Intelligence sits alongside POS and Payments as an equal tile, it gets 1/5 of the attention. It becomes "a product" instead of "the platform capability." Every other company avoids this.' },
                { title: 'Generic AI naming', detail: '"Intelligence" is a description, not a brand. Compare "Breeze" or "Sidekick" or "Agentforce" to "Intelligence." One you can sell; the other sounds like a PowerPoint heading.' },
                { title: 'Invisible AI (the Toast trap)', detail: 'Toast has no AI narrative at all. In 2025+, this means they get zero credit for any ML/AI investment. Buyers actively look for AI capability; if you do not name it, it does not exist in their evaluation.' },
                { title: 'Rebranding everything (the Salesforce gamble)', detail: 'Unless you are a $38B company, you cannot absorb the customer confusion of renaming your entire product line. Dutchie should not rename POS to "Dutchie AI POS" or similar.' },
                { title: 'Separate AI pricing/licensing', detail: 'ServiceNow requires Pro Plus for AI. HubSpot makes Breeze free. For a vertical SaaS platform where adoption is the goal, locking AI behind a paywall creates friction. Better to include it and charge for the premium tier.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 24, height: 24, borderRadius: 6,
                    background: '#FF6B6B20', border: '1px solid #FF6B6B50',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#FF6B6B',
                  }}>
                    X
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Why Dutchie is Different */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.accentGold, marginBottom: 16 }}>
                Why Dutchie's Situation Is Unique
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
                Dutchie is not Salesforce, HubSpot, or Shopify. Dutchie is a <strong style={{ color: t.text }}>vertical SaaS platform in a heavily regulated industry</strong> with characteristics that constrain the solution:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Regulated Industry', desc: 'Cannabis compliance means products must be clearly defined. "AI magic" is less trustworthy than specific, auditable capabilities.' },
                  { label: 'Hardware-Dependent', desc: 'Like Toast, the POS hardware anchors the physical relationship. Digital products layer on top.' },
                  { label: 'Acquired Product Suite', desc: 'Products came from acquisitions (Greenbits, LeafLogix). They need to feel unified, not bolted together.' },
                  { label: 'Dispensary Operators', desc: 'Buyers are operators, not IT departments. They think in workflows (sell, market, get paid) not product categories.' },
                  { label: 'Competitive Moat = Data', desc: '$22B+ in transaction data across 6,500+ dispensaries. This data advantage IS the AI story.' },
                  { label: 'AI as Differentiator vs Toast', desc: 'Toast has no AI brand. Dutchie having a clear AI narrative is a direct competitive advantage in the restaurant-adjacent market.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: `${t.textFaint}08`, border: `1px solid ${t.border}`, borderRadius: 8, padding: 14 }}>
                    <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: t.accentGold, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ═══ RECOMMENDATION TAB ═══ */}
        {activeTab === 'recommendation' && (
          <>
            <Section number="07" title="The Recommendation" subtitle="A concrete, defensible structure for how Dutchie should present its product suite + AI." t={t} />

            {/* The verdict */}
            <Card t={t} style={{ marginBottom: 24, border: `2px solid ${t.accentGold}` }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
                Verdict
              </div>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 16, lineHeight: 1.3 }}>
                Dutchie should use the "AI Woven Through Products" pattern (HubSpot model) with a branded intelligence layer.
              </div>
              <div style={{ fontFamily: FONT, fontSize: 15, color: t.textMuted, lineHeight: 1.7, marginBottom: 20 }}>
                Keep four product pillars as the hero. Elevate Intelligence from "one of five" to a named, horizontal capability layer that powers all four products. Give it a real brand name. Show the data foundation underneath.
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Pill color={t.accentGreen}>Low brand risk</Pill>
                <Pill color={t.accentGreen}>Products stay clear</Pill>
                <Pill color={t.accentGreen}>AI gets elevated</Pill>
                <Pill color={t.accentGreen}>Data story included</Pill>
                <Pill color={t.accentGold}>Requires naming the AI</Pill>
              </div>
            </Card>

            {/* Before / After */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 20 }}>
                Before vs. After: Structure Shift
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Before */}
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FF6B6B', marginBottom: 12 }}>
                    Current (5 Equal Pillars)
                  </div>
                  <PillarDiagram
                    pillars={['POS', 'E-Com', 'Payments', 'Loyalty', 'Intelligence']}
                    t={t}
                  />
                  <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint, marginTop: 8, lineHeight: 1.5 }}>
                    Intelligence competes with POS for attention. It is one of five equal things. The structure says "we have five products" when the story should be "our platform is intelligent."
                  </div>
                </div>

                {/* After */}
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.accentGreen, marginBottom: 12 }}>
                    Recommended (4 Pillars + AI Layer)
                  </div>
                  <PillarDiagram
                    pillars={['POS', 'E-Commerce', 'Payments', 'Loyalty & Marketing']}
                    bar={{ label: '[Branded AI Name] -- Intelligence Layer', color: t.accentGold }}
                    t={t}
                  />
                  <div style={{
                    background: `${t.accentGreen}0A`, border: `1px solid ${t.accentGreen}30`, borderRadius: '0 0 8px 8px',
                    padding: '8px 16px', textAlign: 'center', marginTop: -2,
                    fontFamily: FONT, fontSize: 11, fontWeight: 600, color: t.accentGreen,
                  }}>
                    $22B+ Transaction Data Foundation
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint, marginTop: 8, lineHeight: 1.5 }}>
                    Four products are clear and buyable. The AI layer sits visually above/below as connective tissue. The data foundation shows WHY the AI is credible.
                  </div>
                </div>
              </div>
            </Card>

            {/* Specific steps */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>
                Five Specific Actions
              </div>
              {[
                {
                  step: '1',
                  title: 'Remove Intelligence as a pillar; make it the layer',
                  detail: 'Intelligence should NOT be one of five products. It should be a horizontal bar that spans all four product pillars (POS, E-Commerce, Payments, Loyalty & Marketing). Visually, it sits below the pillars as a foundation or above them as an overlay -- either works. The key is it touches everything.',
                },
                {
                  step: '2',
                  title: 'Brand the AI layer with a real name',
                  detail: '"Intelligence" is a category label, not a brand. Following HubSpot (Breeze), Shopify (Sidekick), and ServiceNow (Now Assist) conventions, Dutchie needs a proper name for its AI capability. The name should be short, memorable, and evocative of the cannabis industry\'s unique data advantage. Consider names that reference the analytical/insight nature (e.g., "Dex Intelligence" if using the Dex sub-brand, or a standalone name).',
                },
                {
                  step: '3',
                  title: 'Show the data foundation explicitly',
                  detail: 'Salesforce shows Data Cloud. HubSpot shows Data Hub + Smart CRM. Dutchie should show its $22B+ in transaction data as the foundation layer BENEATH everything. This answers the implicit question: "Why should I trust your AI?" Answer: "Because it is built on the largest cannabis retail dataset in the world."',
                },
                {
                  step: '4',
                  title: 'Use the three-layer sandwich in every deck',
                  detail: 'Top: Four Product Pillars (what customers buy). Middle: Branded AI Layer (what makes them smart). Bottom: Data Foundation (why the AI is credible). This three-layer structure should appear in the sales deck, website product page, one-pagers, and investor materials.',
                },
                {
                  step: '5',
                  title: 'Tell the evolution story',
                  detail: 'Like Salesforce\'s Einstein-to-Agentforce narrative or HubSpot\'s ChatSpot-to-Breeze journey, Dutchie should narrate: "We started with dispensary tools. We unified the data. Now the data makes every tool smarter." This builds confidence that AI is not a bolt-on but an organic evolution.',
                },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 32, height: 32, borderRadius: 8,
                    background: `${t.accentGold}20`, border: `1px solid ${t.accentGold}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT, fontSize: 14, fontWeight: 800, color: t.accentGold,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Final recommended architecture */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>
                Recommended Architecture Diagram
              </div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, marginBottom: 16 }}>
                The "three-layer sandwich" that should appear on Dutchie's product hierarchy slide:
              </div>

              {/* The actual recommended diagram */}
              <div style={{ margin: '0 auto', maxWidth: 600 }}>
                {/* Products row */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  {[
                    { name: 'Point of Sale', sub: 'In-store operations' },
                    { name: 'E-Commerce Pro', sub: 'Online & omni-channel' },
                    { name: 'Payments', sub: 'Cashless & compliant' },
                    { name: 'Loyalty & Marketing', sub: 'Retention & growth' },
                  ].map((p, i) => (
                    <div key={i} style={{
                      flex: 1, background: `${t.textFaint}0A`, border: `1px solid ${t.border}`,
                      borderRadius: '10px 10px 0 0', padding: '16px 12px', textAlign: 'center',
                    }}>
                      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontFamily: FONT, fontSize: 10, color: t.textFaint }}>{p.sub}</div>
                    </div>
                  ))}
                </div>

                {/* AI Layer */}
                <div style={{
                  background: `${t.accentGold}18`, border: `2px solid ${t.accentGold}60`,
                  padding: '14px 20px', textAlign: 'center', marginBottom: 6,
                }}>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 800, color: t.accentGold, marginBottom: 2 }}>
                    [AI Brand Name] Intelligence
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: t.accentGold, opacity: 0.7 }}>
                    Personalization &middot; Recommendations &middot; Predictive Analytics &middot; Automation
                  </div>
                </div>

                {/* Data Foundation */}
                <div style={{
                  background: `${t.accentGreen}10`, border: `1px solid ${t.accentGreen}40`,
                  borderRadius: '0 0 10px 10px', padding: '12px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: t.accentGreen, marginBottom: 2 }}>
                    Cannabis Retail Data Platform
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: t.accentGreen, opacity: 0.7 }}>
                    $22B+ in transactions &middot; 6,500+ dispensaries &middot; Industry's largest dataset
                  </div>
                </div>
              </div>
            </Card>

            {/* Why this works */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>
                Why This Structure Wins
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { against: 'vs. Salesforce', reason: 'Less risky. Dutchie does not need to rename POS to "Dutchie AI POS." Products keep their names; AI elevates all of them.' },
                  { against: 'vs. Toast', reason: 'More differentiated. Toast has no AI narrative. Dutchie gets credit for AI investment with a named, visible layer.' },
                  { against: 'vs. Shopify', reason: 'More enterprise-appropriate. A character/mascot like "Sidekick" would feel unserious for dispensary compliance software. A named intelligence layer is professional.' },
                  { against: 'vs. ServiceNow', reason: 'Less friction. AI should be woven into every tier, not locked behind premium licensing. Cannabis operators are price-sensitive.' },
                  { against: 'vs. HubSpot (closest)', reason: 'Identical pattern, adapted for vertical SaaS. HubSpot has 6+ Hubs; Dutchie has 4 focused pillars. The cannabis data moat replaces HubSpot\'s breadth advantage.' },
                  { against: 'vs. Current Dutchie', reason: 'One structural change -- moving Intelligence from pillar to layer -- completely reframes the narrative from "five products" to "an intelligent platform."' },
                ].map((item, i) => (
                  <div key={i} style={{ background: `${t.textFaint}08`, border: `1px solid ${t.border}`, borderRadius: 8, padding: 14 }}>
                    <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: t.accentGold, marginBottom: 4 }}>{item.against}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{item.reason}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bottom line */}
            <div style={{
              background: `${t.accentGold}0C`, border: `2px solid ${t.accentGold}40`, borderRadius: 12,
              padding: 28, textAlign: 'center', marginBottom: 32,
            }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
                Bottom Line
              </div>
              <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.5, maxWidth: 640, margin: '0 auto', marginBottom: 12 }}>
                The move from "5 equal pillars" to "4 products + 1 intelligence layer + 1 data foundation" is the single highest-leverage structural change Dutchie can make to its product narrative.
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14, color: t.textMuted, lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
                It aligns with what every successful multi-product SaaS company does (HubSpot, ServiceNow, Shopify). It differentiates against the closest competitor (Toast, which has no AI story). And it requires zero product changes -- only a presentation shift.
              </div>
            </div>

            {/* Sources */}
            <Card t={t} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: t.textFaint, marginBottom: 12 }}>
                Research Sources
              </div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: t.textFaint, lineHeight: 2 }}>
                <div>Salesforce: <a href="https://www.salesforce.com/agentforce/" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">salesforce.com/agentforce</a> &middot; <a href="https://architect.salesforce.com/fundamentals/platform-transformation" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">Platform Architecture</a></div>
                <div>HubSpot: <a href="https://www.hubspot.com/products/artificial-intelligence" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">hubspot.com/products/artificial-intelligence</a> &middot; <a href="https://www.hubspot.com/company-news/fall-2025-spotlight" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">Fall 2025 Spotlight</a></div>
                <div>Toast: <a href="https://pos.toasttab.com/" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">pos.toasttab.com</a> &middot; <a href="https://doc.toasttab.com/doc/platformguide/platformToastPlatformOverview.html" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">Platform Overview</a></div>
                <div>Shopify: <a href="https://www.shopify.com/magic" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">shopify.com/magic</a> &middot; <a href="https://www.shopify.com/news/winter-26-edition-renaissance" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">Winter '26 Edition</a></div>
                <div>ServiceNow: <a href="https://www.servicenow.com/platform/now-assist.html" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">servicenow.com/platform/now-assist</a></div>
                <div>Dutchie: <a href="https://business.dutchie.com" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">business.dutchie.com</a> &middot; <a href="https://www.businesswire.com/news/home/20241001720056/en/" style={{ color: t.accentGold }} target="_blank" rel="noopener noreferrer">Dutchie 2.0 Announcement</a></div>
              </div>
            </Card>
          </>
        )}

      </div>
    </div>
  );
}

export default CompetitorDeckPatterns;
