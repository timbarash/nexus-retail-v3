import { useState, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   D-NAME EXPLORATION SECTION
   A deep exploration of the "D-prefix" naming convention for the Dutchie AI suite.
   Every product starts with D — brand cohesion like Apple's "i" prefix.
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Shared Styles ─── */
const COLORS = {
  bg: '#0A0908',
  card: '#141210',
  cardHover: '#1A1815',
  border: '#282724',
  borderLight: '#38332B',
  textPrimary: '#F0EDE8',
  textSecondary: '#ADA599',
  textMuted: '#6B6359',
  textDim: '#4A453E',
  gold: '#D4A03A',
  goldLight: '#FFC02A',
  goldBright: '#FFD666',
  green: '#00C27C',
  blue: '#64A8E0',
  red: '#E05252',
  orange: '#E0A052',
  teal: '#52C2B8',
};

const baseCard = {
  background: COLORS.card,
  borderRadius: 16,
  padding: 32,
  border: `1px solid ${COLORS.border}`,
};

const dividerStyle = {
  height: 1,
  background: `linear-gradient(90deg, transparent, ${COLORS.borderLight}, transparent)`,
  margin: '64px 0',
};

const sectionTitleStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: COLORS.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: 24,
};

const bodyTextStyle = {
  fontSize: 14,
  color: COLORS.textSecondary,
  lineHeight: 1.7,
  maxWidth: 640,
  marginBottom: 32,
};

/* ─── Star Rating Component ─── */
function Stars({ count, max = 5, colors }) {
  const c = colors || COLORS;
  return (
    <span style={{ letterSpacing: 2, fontSize: 14 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ color: i < count ? (c.accentGoldLight || c.goldLight) : (c.textDim || c.textFaint) }}>
          {i < count ? '\u2605' : '\u2606'}
        </span>
      ))}
    </span>
  );
}

/* ─── Indicator Dot (green/yellow/red) ─── */
function StatusDot({ status }) {
  const colorMap = { green: '#34D399', yellow: '#FBBF24', red: '#F87171' };
  return (
    <span style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: colorMap[status] || colorMap.yellow,
      boxShadow: `0 0 6px ${colorMap[status] || colorMap.yellow}44`,
      marginRight: 8,
      flexShrink: 0,
    }} />
  );
}

/* ─── Section Divider ─── */
function Divider({ style }) {
  return <div style={style || dividerStyle} />;
}

/* ─── Sub Title ─── */
function SubTitle({ children, style }) {
  return <h3 style={style || sectionTitleStyle}>{children}</h3>;
}

/* ─── Section Number Badge ─── */
function SectionBadge({ number, colors }) {
  const c = colors || { accentGold: COLORS.gold, goldRgb: '212,160,58', goldLightRgb: '255,192,42' };
  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: `linear-gradient(135deg, rgba(${c.goldRgb},0.15), rgba(${c.goldLightRgb},0.08))`,
      border: `1px solid rgba(${c.goldRgb},0.25)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 700,
      color: c.accentGold,
      flexShrink: 0,
      marginBottom: 16,
    }}>
      {number}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════════ */

const NAME_ROLES = [
  {
    role: 'The Platform',
    currently: 'Nexus',
    description: 'The central dashboard and command center for dispensary operations.',
    accent: '#8B6FE0',
    candidates: [
      { name: 'Dash', weight: 700, spacing: '0.03em', rationale: 'Dashboard meets velocity. Immediate, punchy, suggests speed and oversight.' },
      { name: 'Depot', weight: 600, spacing: '0.02em', rationale: 'Central hub, warehouse of data. Grounded and substantial, implies a storehouse of value.' },
      { name: 'Deck', weight: 700, spacing: '0.04em', rationale: 'Command deck, flight deck, presentation deck. Authoritative control surface.' },
      { name: 'Domain', weight: 500, spacing: '0.03em', rationale: 'Your territory, your realm of control. Regal, expansive, implies ownership.' },
      { name: 'Dial', weight: 600, spacing: '0.04em', rationale: 'Tuning into your business. Precision control, fine adjustments, analog warmth.' },
      { name: 'Den', weight: 700, spacing: '0.05em', rationale: 'Your private workspace. Cozy, personal, a safe space for strategic thinking.' },
    ],
  },
  {
    role: 'The AI Agent',
    currently: 'Dex',
    description: 'The intelligent assistant that answers questions, analyzes data, and automates tasks.',
    accent: COLORS.gold,
    candidates: [
      { name: 'Dex', weight: 700, spacing: '0.02em', rationale: 'Dexterity meets index. Already established, sharp and technical. Keep it.' },
      { name: 'Dart', weight: 700, spacing: '0.03em', rationale: 'Precision and speed. Hits the target every time. Action-oriented.' },
      { name: 'Drift', weight: 400, spacing: '0.04em', rationale: 'Autonomous navigation through data. Flowing, effortless, AI that moves on its own.' },
      { name: 'Djinn', weight: 500, spacing: '0.03em', rationale: 'A wish-granting spirit. AI as magic, fulfilling requests with supernatural ease.' },
      { name: 'Delve', weight: 600, spacing: '0.02em', rationale: 'Going deep. Thorough investigation, leaving no stone unturned in the data.' },
      { name: 'Droid', weight: 600, spacing: '0.04em', rationale: 'Robotic assistant. Immediately signals AI/automation. Familiar sci-fi connotation.' },
    ],
  },
  {
    role: 'The B2B Marketplace',
    currently: 'Connect',
    description: 'The platform where retailers discover brands, place orders, and manage supply chain.',
    accent: COLORS.green,
    candidates: [
      { name: 'Deal', weight: 700, spacing: '0.02em', rationale: 'Commerce at its core. Transactions, agreements, handshakes. Direct and unmistakable.' },
      { name: 'Dock', weight: 700, spacing: '0.04em', rationale: 'Where goods arrive. Shipping, receiving, the physical endpoint of commerce.' },
      { name: 'Duct', weight: 600, spacing: '0.03em', rationale: 'Conduit, pipeline, flow between parties. Invisible infrastructure enabling trade.' },
      { name: 'District', weight: 500, spacing: '0.02em', rationale: 'A marketplace district, commercial zone. Evokes a bustling area of trade.' },
      { name: 'Dwell', weight: 400, spacing: '0.04em', rationale: 'Where brands and retailers live together. Community, cohabitation, shared space.' },
      { name: 'Depot', weight: 600, spacing: '0.02em', rationale: 'Supply depot. Where inventory meets demand. Substantial and reliable.' },
    ],
  },
  {
    role: 'The Consumer Experience',
    currently: 'New Product',
    description: 'The customer-facing discovery and purchasing experience for cannabis consumers.',
    accent: COLORS.blue,
    candidates: [
      { name: 'Drop', weight: 700, spacing: '0.03em', rationale: 'Product drops, delivery drops, cultural currency. Hype meets convenience.' },
      { name: 'Dose', weight: 600, spacing: '0.02em', rationale: 'Cannabis-native language. Personalized recommendations, measured experiences.' },
      { name: 'Daze', weight: 500, spacing: '0.04em', rationale: 'Discovery and wonderment. Getting lost in the browse. Dreamy, aspirational.' },
      { name: 'Dawn', weight: 400, spacing: '0.03em', rationale: 'New beginnings. Fresh experience, first light of discovery. Optimistic.' },
      { name: 'Drift', weight: 400, spacing: '0.04em', rationale: 'Browsing without a plan. Exploring, discovering, pleasant meandering.' },
      { name: 'Drip', weight: 700, spacing: '0.03em', rationale: 'Style, culture, steady flow. Cannabis culture meets streetwear vernacular.' },
    ],
  },
];

const SUITES = [
  {
    id: 'sharp',
    label: 'The Sharp Set',
    names: ['Dash', 'Dex', 'Deal', 'Drop'],
    colors: ['#8B6FE0', COLORS.gold, COLORS.green, COLORS.blue],
    vibe: 'Fast, decisive, action-oriented. Every name is one syllable, punchy, and impossible to forget. This suite says "we mean business" while staying approachable.',
    ratings: { memorability: 5, distinctiveness: 4, professional: 4, cannabis: 4 },
  },
  {
    id: 'deep',
    label: 'The Deep Set',
    names: ['Depot', 'Delve', 'Dock', 'Dose'],
    colors: ['#8B6FE0', COLORS.gold, COLORS.green, COLORS.blue],
    vibe: 'Substantial, thorough, grounded. These names suggest depth and reliability. Each evokes a physical or experiential metaphor that feels tangible.',
    ratings: { memorability: 3, distinctiveness: 4, professional: 5, cannabis: 4 },
  },
  {
    id: 'dynamic',
    label: 'The Dynamic Set',
    names: ['Domain', 'Dart', 'District', 'Dawn'],
    colors: ['#8B6FE0', COLORS.gold, COLORS.green, COLORS.blue],
    vibe: 'Expansive, precise, aspirational. A mix of territorial confidence and bright-eyed optimism. Feels like a company building something big.',
    ratings: { memorability: 3, distinctiveness: 5, professional: 5, cannabis: 3 },
  },
  {
    id: 'smooth',
    label: 'The Smooth Set',
    names: ['Deck', 'Drift', 'Duct', 'Daze'],
    colors: ['#8B6FE0', COLORS.gold, COLORS.green, COLORS.blue],
    vibe: 'Effortless, flowing, experiential. These names feel like gliding through software. Less corporate, more creative. The cannabis culture undercurrent is strong.',
    ratings: { memorability: 3, distinctiveness: 4, professional: 3, cannabis: 5 },
  },
  {
    id: 'bold',
    label: 'The Bold Set',
    names: ['Dash', 'Dex', 'Dock', 'Dose'],
    colors: ['#8B6FE0', COLORS.gold, COLORS.green, COLORS.blue],
    vibe: 'The best of both worlds. Combines sharp monosyllables with industry-specific language. "Dose" is a cannabis-native word that no other B2B SaaS would use. This suite owns its vertical.',
    ratings: { memorability: 5, distinctiveness: 5, professional: 4, cannabis: 5 },
  },
];

const PHONETICS = [
  { name: 'Dash', syllables: 1, feel: 'Hard attack, short vowel, decisive', domain: 'Likely available', verbal: 'Excellent -- crisp, unmistakable', emoji: '\u26A1' },
  { name: 'Dex', syllables: 1, feel: 'Hard-soft, quick, technical edge', domain: 'Likely available', verbal: 'Excellent -- tech-native, unique', emoji: '\uD83E\uDDE0' },
  { name: 'Deal', syllables: 1, feel: 'Warm, open vowel, commercial', domain: 'May conflict', verbal: 'Good -- very common word though', emoji: '\uD83E\uDD1D' },
  { name: 'Dock', syllables: 1, feel: 'Hard, solid, grounded stop', domain: 'Likely available', verbal: 'Good -- clear and concrete', emoji: '\u2693' },
  { name: 'Dose', syllables: 1, feel: 'Soft onset, open vowel, gentle', domain: 'May conflict', verbal: 'Good -- cannabis-resonant', emoji: '\uD83D\uDC9A' },
  { name: 'Drop', syllables: 1, feel: 'Hard, percussive, urgent', domain: 'Likely available', verbal: 'Excellent -- culturally loaded', emoji: '\uD83D\uDCA7' },
  { name: 'Dart', syllables: 1, feel: 'Hard attack, sharp, precise', domain: 'May conflict', verbal: 'Good -- sports connotation', emoji: '\uD83C\uDFAF' },
  { name: 'Drift', syllables: 1, feel: 'Soft flow, dreamy, continuous', domain: 'Likely available', verbal: 'Good -- automotive connotation', emoji: '\uD83C\uDF0A' },
  { name: 'Delve', syllables: 1, feel: 'Soft, deep, exploratory', domain: 'May conflict', verbal: 'Fair -- less common word', emoji: '\uD83D\uDD0D' },
  { name: 'Depot', syllables: 2, feel: 'Hard-soft, substantial, grounded', domain: 'May conflict', verbal: 'Fair -- Home Depot association', emoji: '\uD83C\uDFED' },
  { name: 'Deck', syllables: 1, feel: 'Hard, flat, commanding', domain: 'Likely available', verbal: 'Good -- multiple meanings', emoji: '\uD83C\uDCCF' },
  { name: 'Domain', syllables: 2, feel: 'Regal, expansive, authoritative', domain: 'May conflict', verbal: 'Fair -- web domain confusion', emoji: '\uD83D\uDC51' },
  { name: 'Dawn', syllables: 1, feel: 'Soft, warm, optimistic', domain: 'May conflict', verbal: 'Good -- poetic, memorable', emoji: '\uD83C\uDF05' },
  { name: 'Daze', syllables: 1, feel: 'Soft buzz, dreamy, suspended', domain: 'Likely available', verbal: 'Fair -- negative connotation risk', emoji: '\u2728' },
  { name: 'Djinn', syllables: 1, feel: 'Exotic, mystical, unusual', domain: 'Likely available', verbal: 'Poor -- pronunciation unclear', emoji: '\uD83E\uDDDE' },
  { name: 'Drip', syllables: 1, feel: 'Hard, punchy, cultural', domain: 'Likely available', verbal: 'Good -- slang-forward', emoji: '\uD83D\uDCA8' },
];

const DEX_FAMILY = [
  { name: 'Dex', sub: 'Core AI Agent', description: 'The intelligent assistant. Answers questions, runs analyses, automates workflows.', tier: 'core' },
  { name: 'Dex Hub', sub: 'Platform Dashboard', description: 'The central command view. All your metrics, insights, and controls in one place.', tier: 'product' },
  { name: 'Dex Market', sub: 'B2B Marketplace', description: 'Where retailers and brands connect. Orders, catalogs, and supply chain management.', tier: 'product' },
  { name: 'Dex Shop', sub: 'Consumer Experience', description: 'The customer-facing storefront. Discovery, recommendations, and checkout.', tier: 'product' },
  { name: 'Dex Insights', sub: 'Analytics Engine', description: 'Deep data analysis. Trends, forecasts, competitive intelligence.', tier: 'extension' },
  { name: 'Dex Comply', sub: 'Compliance Automation', description: 'Regulatory monitoring. Automatic state-level compliance checks.', tier: 'extension' },
];

const TRADEMARK_CHECKS = [
  {
    name: 'Dash',
    existingTech: { status: 'yellow', text: 'Dash by Plotly (Python framework), DoorDash (delivery)' },
    commonWord: { status: 'yellow', text: 'Common English word -- harder to trademark broadly' },
    cannabis: { status: 'green', text: 'No direct cannabis association, which is fine for B2B' },
    negative: { status: 'green', text: 'No negative connotations. Universally positive.' },
  },
  {
    name: 'Dex',
    existingTech: { status: 'yellow', text: 'DexCom (medical devices), various crypto DEXs' },
    commonWord: { status: 'green', text: 'Not a common word -- strong trademark potential' },
    cannabis: { status: 'green', text: 'Clean. Technical feel suits AI positioning.' },
    negative: { status: 'green', text: 'None. Dexterity connotation is purely positive.' },
  },
  {
    name: 'Dock',
    existingTech: { status: 'yellow', text: 'Docker (containerization) -- close phonetic match' },
    commonWord: { status: 'yellow', text: 'Common English word with many uses' },
    cannabis: { status: 'green', text: 'Loading dock metaphor works for supply chain' },
    negative: { status: 'green', text: 'No negative connotations.' },
  },
  {
    name: 'Dose',
    existingTech: { status: 'green', text: 'No major tech conflicts found' },
    commonWord: { status: 'yellow', text: 'Common word, especially in pharma/medical' },
    cannabis: { status: 'green', text: 'Strong positive cannabis association -- dosing is key' },
    negative: { status: 'yellow', text: 'Potential medical/pharma confusion. "Overdose" proximity.' },
  },
  {
    name: 'Drop',
    existingTech: { status: 'yellow', text: 'Dropbox (storage), various "drop" branded services' },
    commonWord: { status: 'yellow', text: 'Very common word -- broad trademark difficult' },
    cannabis: { status: 'green', text: 'Product drops, delivery drops -- culturally perfect' },
    negative: { status: 'green', text: 'Mostly positive. "Drop" in ecommerce is exciting.' },
  },
  {
    name: 'Deal',
    existingTech: { status: 'yellow', text: 'Many deal/deals sites exist (Groupon, RetailMeNot)' },
    commonWord: { status: 'red', text: 'Extremely common -- very hard to trademark' },
    cannabis: { status: 'yellow', text: 'Could imply discounting, which cheapens the brand' },
    negative: { status: 'yellow', text: '"Dealer" connotation in cannabis context. Risky.' },
  },
  {
    name: 'Drift',
    existingTech: { status: 'red', text: 'Drift.com (conversational marketing) -- direct conflict' },
    commonWord: { status: 'yellow', text: 'Common word but less crowded in tech' },
    cannabis: { status: 'green', text: 'Dreamy, experiential -- fits consumer cannabis well' },
    negative: { status: 'yellow', text: '"Drifting" can imply lack of direction or purpose.' },
  },
  {
    name: 'Delve',
    existingTech: { status: 'red', text: 'Microsoft Delve (Office 365 product) -- direct conflict' },
    commonWord: { status: 'green', text: 'Less common word -- decent trademark opportunity' },
    cannabis: { status: 'green', text: 'Exploration metaphor works well' },
    negative: { status: 'green', text: 'No negative connotations. Purely positive.' },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */

export function DNameExplorationSection({ theme = 'dark' }) {
  const themes = {
    dark: {
      bg: '#0A0908', cardBg: '#141210', border: '#282724',
      text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359',
      accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666',
      accentGreen: '#00C27C',
    },
    light: {
      bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC',
      text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680',
      accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E',
      accentGreen: '#059669',
    }
  };
  const t = themes[theme];

  // Theme-aware helpers for rgba gold values
  const goldRgb = theme === 'dark' ? '212,160,58' : '184,134,11';
  const goldLightRgb = theme === 'dark' ? '255,192,42' : '218,165,32';
  const goldLighterRgb = theme === 'dark' ? '255,214,102' : '240,199,94';
  const greenRgb = theme === 'dark' ? '0,194,124' : '5,150,105';
  const cardBgRgb = theme === 'dark' ? '20,18,16' : '255,255,255';
  const bgRgb = theme === 'dark' ? '10,9,8' : '250,250,248';
  const blueRgb = '100,168,224';
  const borderLight = theme === 'dark' ? '#38332B' : '#D5D0C8';
  const cardHover = theme === 'dark' ? '#1A1815' : '#F5F5F2';
  const textDim = theme === 'dark' ? '#4A453E' : '#B0AAA2';

  const themedBaseCard = {
    background: t.cardBg,
    borderRadius: 16,
    padding: 32,
    border: `1px solid ${t.border}`,
  };

  const themedDividerStyle = {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${borderLight}, transparent)`,
    margin: '64px 0',
  };

  const themedSectionTitleStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: t.textFaint,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 24,
  };

  const themedBodyTextStyle = {
    fontSize: 14,
    color: t.textMuted,
    lineHeight: 1.7,
    maxWidth: 640,
    marginBottom: 32,
  };

  const [hoveredSuite, setHoveredSuite] = useState(null);
  const [expandedRole, setExpandedRole] = useState(null);

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: t.bg,
      color: t.text,
      minHeight: '100vh',
      padding: '0 24px 120px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <div style={{ paddingTop: 80, paddingBottom: 48, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 20px',
          borderRadius: 24,
          background: `rgba(${goldRgb},0.08)`,
          border: `1px solid rgba(${goldRgb},0.15)`,
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: t.accentGold, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Naming Strategy
          </span>
        </div>

        <h1 style={{
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: t.text,
          marginBottom: 20,
        }}>
          The{' '}
          <span style={{
            background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGoldLight}, ${t.accentGoldLighter})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            D-Suite
          </span>
          {' '}Exploration
        </h1>

        <p style={{
          fontSize: 18,
          color: t.textMuted,
          lineHeight: 1.6,
          maxWidth: 600,
          margin: '0 auto 16px',
        }}>
          What if every Dutchie AI product started with the letter D?
          Brand cohesion through a single-letter naming convention.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          marginTop: 40,
          flexWrap: 'wrap',
        }}>
          {[
            { letter: 'D', label: 'Dutchie', sub: 'The parent brand' },
            { letter: 'D', label: 'Dispensary', sub: 'The industry' },
            { letter: 'D', label: 'Data', sub: 'The fuel' },
            { letter: 'D', label: 'Dank', sub: 'The culture' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `linear-gradient(135deg, rgba(${goldRgb},${0.15 - i * 0.02}), rgba(${goldLightRgb},${0.08 - i * 0.01}))`,
                border: `1px solid rgba(${goldRgb},0.2)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: t.accentGold,
              }}>
                {item.letter}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{item.label}</span>
              <span style={{ fontSize: 11, color: t.textFaint }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 1: D-NAME CANDIDATE MATRIX ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={1} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        D-Name Candidate Matrix
      </h2>
      <p style={themedBodyTextStyle}>
        For each product role in the Dutchie AI suite, we explore six D-name candidates.
        Each is rendered as a wordmark in DM Sans with typography tuned to its personality.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {NAME_ROLES.map((role, roleIdx) => (
          <div key={role.role}>
            {/* Role Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
              cursor: 'pointer',
            }}
            onClick={() => setExpandedRole(expandedRole === roleIdx ? null : roleIdx)}
            >
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: role.accent,
                boxShadow: `0 0 12px ${role.accent}66`,
              }} />
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>
                  {role.role}
                </h3>
                <span style={{ fontSize: 12, color: t.textFaint }}>
                  Currently: <span style={{ color: role.accent }}>{role.currently}</span>
                  {' '}&mdash; {role.description}
                </span>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 12,
            }}>
              {role.candidates.map((c, ci) => (
                <div key={c.name} style={{
                  ...themedBaseCard,
                  padding: '24px 28px',
                  borderRadius: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'border-color 0.2s, background 0.2s',
                  borderColor: t.border,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Subtle accent line at top */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 28,
                    right: 28,
                    height: 2,
                    background: `linear-gradient(90deg, ${role.accent}44, transparent)`,
                    borderRadius: '0 0 2px 2px',
                  }} />

                  {/* Number + Wordmark row */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: role.accent,
                      fontFamily: 'monospace',
                      opacity: 0.7,
                      alignSelf: 'flex-start',
                      marginTop: 8,
                    }}>
                      {String(ci + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: c.weight,
                      fontSize: 42,
                      letterSpacing: c.spacing,
                      color: t.text,
                      lineHeight: 1,
                    }}>
                      {c.name}
                    </span>
                  </div>

                  {/* Typography meta */}
                  <div style={{
                    fontSize: 10,
                    color: textDim,
                    fontFamily: 'monospace',
                    display: 'flex',
                    gap: 12,
                  }}>
                    <span>wt {c.weight}</span>
                    <span>ls {c.spacing}</span>
                  </div>

                  {/* Rationale */}
                  <p style={{
                    fontSize: 13,
                    color: t.textMuted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {c.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 2: BEST D-SUITE COMBINATIONS ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={2} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        Best D-Suite Combinations
      </h2>
      <p style={themedBodyTextStyle}>
        Five curated suites where all four product names share the D-prefix and create a cohesive family.
        Each is evaluated for memorability, distinctiveness, professional tone, and cannabis culture fit.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {SUITES.map((suite, si) => (
          <div
            key={suite.id}
            style={{
              ...themedBaseCard,
              padding: 0,
              overflow: 'hidden',
              transition: 'border-color 0.25s',
              borderColor: hoveredSuite === si ? borderLight : t.border,
            }}
            onMouseEnter={() => setHoveredSuite(si)}
            onMouseLeave={() => setHoveredSuite(null)}
          >
            {/* Suite Header */}
            <div style={{
              padding: '24px 32px 16px',
              borderBottom: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.accentGold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  Suite {si + 1}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>
                  {suite.label}
                </h3>
              </div>
              {/* Ratings summary */}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {Object.entries(suite.ratings).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Stars count={val} colors={{ accentGoldLight: t.accentGoldLight, textFaint: textDim }} />
                    <span style={{ fontSize: 9, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {key === 'cannabis' ? 'Culture' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Branded Lockup */}
            <div style={{ padding: '32px 32px 24px' }}>
              {/* Parent brand */}
              <div style={{
                fontSize: 12,
                fontWeight: 500,
                color: t.textFaint,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                Dutchie AI
              </div>

              {/* Name lockup */}
              <div style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                alignItems: 'flex-end',
              }}>
                {suite.names.map((name, ni) => (
                  <div key={name} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 6,
                  }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: suite.colors[ni],
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      opacity: 0.8,
                    }}>
                      {NAME_ROLES[ni].role.replace('The ', '')}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 36,
                      letterSpacing: '0.02em',
                      color: t.text,
                      lineHeight: 1,
                      borderBottom: `3px solid ${suite.colors[ni]}`,
                      paddingBottom: 6,
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vibe description */}
            <div style={{
              padding: '0 32px 28px',
            }}>
              <p style={{
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 700,
              }}>
                {suite.vibe}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 3: PHONETIC ANALYSIS ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={3} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        Phonetic Analysis
      </h2>
      <p style={themedBodyTextStyle}>
        A detailed breakdown of each D-name candidate by syllable count, phonetic feel, domain plausibility,
        verbal distinctiveness, and natural emoji pairing.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontSize: 13,
        }}>
          <thead>
            <tr>
              {['Name', 'Syl.', 'Phonetic Feel', 'Domain Hint', 'Verbal Test', 'Emoji'].map((h, i) => (
                <th key={h} style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontSize: 10,
                  fontWeight: 600,
                  color: t.textFaint,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: `2px solid ${borderLight}`,
                  background: t.cardBg,
                  position: 'sticky',
                  top: 0,
                  whiteSpace: 'nowrap',
                  ...(i === 0 ? { borderRadius: '12px 0 0 0' } : {}),
                  ...(i === 5 ? { borderRadius: '0 12px 0 0', textAlign: 'center' } : {}),
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PHONETICS.map((p, pi) => (
              <tr key={p.name} style={{
                background: pi % 2 === 0 ? 'transparent' : `rgba(${cardBgRgb},0.5)`,
              }}>
                <td style={{
                  padding: '14px 16px',
                  fontWeight: 700,
                  fontSize: 16,
                  color: t.text,
                  borderBottom: `1px solid ${t.border}`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {p.name}
                </td>
                <td style={{
                  padding: '14px 16px',
                  borderBottom: `1px solid ${t.border}`,
                  textAlign: 'center',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: p.syllables === 1 ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.12)',
                    color: p.syllables === 1 ? '#34D399' : '#FBBF24',
                    fontWeight: 700,
                    fontSize: 14,
                  }}>
                    {p.syllables}
                  </span>
                </td>
                <td style={{
                  padding: '14px 16px',
                  color: t.textMuted,
                  borderBottom: `1px solid ${t.border}`,
                  maxWidth: 220,
                }}>
                  {p.feel}
                </td>
                <td style={{
                  padding: '14px 16px',
                  borderBottom: `1px solid ${t.border}`,
                }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    background: p.domain === 'Likely available' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)',
                    color: p.domain === 'Likely available' ? '#34D399' : '#FBBF24',
                    border: `1px solid ${p.domain === 'Likely available' ? 'rgba(52,211,153,0.2)' : 'rgba(251,191,36,0.2)'}`,
                    whiteSpace: 'nowrap',
                  }}>
                    {p.domain}
                  </span>
                </td>
                <td style={{
                  padding: '14px 16px',
                  color: t.textMuted,
                  borderBottom: `1px solid ${t.border}`,
                  maxWidth: 200,
                }}>
                  {p.verbal}
                </td>
                <td style={{
                  padding: '14px 16px',
                  borderBottom: `1px solid ${t.border}`,
                  textAlign: 'center',
                  fontSize: 22,
                }}>
                  {p.emoji}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 4: THE DEX FAMILY DIRECTION ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={4} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        The "Dex Family" Direction
      </h2>
      <p style={themedBodyTextStyle}>
        An alternative approach: what if Dex is the anchor name and everything branches from it?
        A single brand name with sub-product extensions, like Salesforce's naming model.
      </p>

      {/* Dex Family Hierarchy */}
      <div style={{
        ...themedBaseCard,
        padding: 0,
        overflow: 'hidden',
      }}>
        {/* Top Bar: Dex parent brand */}
        <div style={{
          padding: '28px 36px',
          background: `linear-gradient(135deg, rgba(${goldRgb},0.06), rgba(${goldLightRgb},0.03))`,
          borderBottom: `1px solid ${t.border}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: t.accentGold,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 12,
          }}>
            Dutchie AI Platform
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: '0.02em',
            color: t.text,
            lineHeight: 1,
          }}>
            Dex
          </div>
          <div style={{
            fontSize: 14,
            color: t.textMuted,
            marginTop: 10,
          }}>
            The intelligent backbone of Dutchie
          </div>
        </div>

        {/* Product hierarchy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 0,
        }}>
          {DEX_FAMILY.map((item, i) => {
            const isCore = item.tier === 'core';
            const isExtension = item.tier === 'extension';
            return (
              <div key={item.name} style={{
                padding: '28px 32px',
                borderRight: `1px solid ${t.border}`,
                borderBottom: `1px solid ${t.border}`,
                background: isCore ? `rgba(${goldRgb},0.04)` : 'transparent',
                position: 'relative',
              }}>
                {/* Tier badge */}
                <div style={{
                  display: 'inline-flex',
                  padding: '3px 10px',
                  borderRadius: 6,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 14,
                  background: isCore
                    ? `rgba(${goldRgb},0.12)`
                    : isExtension
                    ? `rgba(${blueRgb},0.1)`
                    : `rgba(${greenRgb},0.1)`,
                  color: isCore
                    ? t.accentGold
                    : isExtension
                    ? COLORS.blue
                    : t.accentGreen,
                  border: `1px solid ${isCore
                    ? `rgba(${goldRgb},0.2)`
                    : isExtension
                    ? `rgba(${blueRgb},0.2)`
                    : `rgba(${greenRgb},0.2)`}`,
                }}>
                  {isCore ? 'Core' : isExtension ? 'Extension' : 'Product'}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: t.text,
                  letterSpacing: '0.01em',
                  marginBottom: 4,
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: t.textFaint,
                  marginBottom: 12,
                }}>
                  {item.sub}
                </div>
                <p style={{
                  fontSize: 13,
                  color: t.textMuted,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pros / Cons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}>
          <div style={{
            padding: '24px 32px',
            borderRight: `1px solid ${t.border}`,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Advantages
            </div>
            {[
              'Single brand to build equity around',
              'Clear hierarchy -- everyone knows "it\'s a Dex thing"',
              'Easier marketing -- one name to remember',
              'Natural extensibility for future products',
            ].map((pro, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
                <span style={{ color: '#34D399', flexShrink: 0 }}>+</span>
                <span>{pro}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '24px 32px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Drawbacks
            </div>
            {[
              'Sub-products feel less distinct and independent',
              '"Dex Market" is two words vs. one-word alternatives',
              'Harder to sell individual products standalone',
              'Risk of brand fatigue -- "Dex everything"',
            ].map((con, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
                <span style={{ color: '#F87171', flexShrink: 0 }}>&ndash;</span>
                <span>{con}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 5: NAME COLLISION & TRADEMARK CHECK ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={5} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        Name Collision & Trademark Check
      </h2>
      <p style={themedBodyTextStyle}>
        A quick vibes check on the top eight D-name candidates. Green means clear,
        yellow means proceed with caution, red means significant concern.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
        gap: 16,
      }}>
        {TRADEMARK_CHECKS.map((item) => (
          <div key={item.name} style={{
            ...themedBaseCard,
            padding: '24px 28px',
            borderRadius: 14,
          }}>
            {/* Name header */}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: t.text,
              letterSpacing: '0.02em',
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: `1px solid ${t.border}`,
            }}>
              {item.name}
            </div>

            {/* Check rows */}
            {[
              { key: 'existingTech', label: 'Existing Tech Products' },
              { key: 'commonWord', label: 'Common Word Risk' },
              { key: 'cannabis', label: 'Cannabis Association' },
              { key: 'negative', label: 'Negative Connotations' },
            ].map((check) => {
              const data = item[check.key];
              return (
                <div key={check.key} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginBottom: 14,
                }}>
                  <div style={{ marginTop: 4, flexShrink: 0 }}>
                    <StatusDot status={data.status} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: t.textFaint,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 3,
                    }}>
                      {check.label}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: t.textMuted,
                      lineHeight: 1.5,
                    }}>
                      {data.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Divider style={themedDividerStyle} />

      {/* ═══════════════════════ SECTION 6: FINAL RECOMMENDATION ═══════════════════════ */}
      <SectionBadge colors={{ accentGold: t.accentGold, goldRgb, goldLightRgb }} number={6} />
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
        Final Recommendation
      </h2>
      <p style={themedBodyTextStyle}>
        After evaluating phonetics, trademark risk, brand cohesion, and cannabis culture fit,
        one suite emerges as the clear winner.
      </p>

      {/* Winner Card */}
      <div style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: t.cardBg,
        border: `2px solid rgba(${goldRgb},0.35)`,
        boxShadow: `0 0 60px rgba(${goldRgb},0.08), 0 4px 30px rgba(0,0,0,0.3)`,
      }}>
        {/* Gold shimmer gradient at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${t.accentGold}, ${t.accentGoldLight}, ${t.accentGoldLighter}, ${t.accentGoldLight}, ${t.accentGold})`,
        }} />

        {/* Winner badge */}
        <div style={{
          padding: '36px 40px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: `linear-gradient(135deg, rgba(${goldRgb},0.15), rgba(${goldLighterRgb},0.08))`,
            border: `1px solid rgba(${goldRgb},0.3)`,
          }}>
            <span style={{ fontSize: 16 }}>{'\uD83C\uDFC6'}</span>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: t.accentGoldLight,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Recommended Suite
            </span>
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Memorability', val: 5 },
              { label: 'Distinctiveness', val: 5 },
              { label: 'Professional', val: 4 },
              { label: 'Culture Fit', val: 5 },
            ].map(r => (
              <div key={r.label} style={{ textAlign: 'center' }}>
                <Stars count={r.val} colors={{ accentGoldLight: t.accentGoldLight, textFaint: textDim }} />
                <div style={{ fontSize: 9, color: t.textFaint, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The suite title */}
        <div style={{ padding: '28px 40px 0' }}>
          <h3 style={{
            fontSize: 16,
            fontWeight: 600,
            color: t.accentGold,
            margin: '0 0 8px',
          }}>
            Suite 5: The Bold Set
          </h3>
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            color: t.textFaint,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            Dutchie AI
          </div>
        </div>

        {/* The 4 names in dramatic lockup */}
        <div style={{
          padding: '0 40px 36px',
          display: 'flex',
          gap: 40,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}>
          {[
            { name: 'Dash', role: 'Platform', color: '#8B6FE0', desc: 'Command center for your dispensary empire' },
            { name: 'Dex', role: 'AI Agent', color: t.accentGold, desc: 'Your intelligent copilot' },
            { name: 'Dock', role: 'B2B Marketplace', color: t.accentGreen, desc: 'Where retailers and brands meet' },
            { name: 'Dose', role: 'Consumer', color: COLORS.blue, desc: 'Personalized cannabis experiences' },
          ].map((item) => (
            <div key={item.name} style={{ flex: '1 1 180px', minWidth: 160 }}>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                color: item.color,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: 8,
              }}>
                {item.role}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 48,
                letterSpacing: '0.02em',
                color: t.text,
                lineHeight: 1,
                display: 'block',
                marginBottom: 8,
              }}>
                {item.name}
              </span>
              <span style={{
                fontSize: 12,
                color: t.textMuted,
                lineHeight: 1.4,
              }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Reasoning */}
        <div style={{
          padding: '28px 40px 36px',
          borderTop: `1px solid ${t.border}`,
          background: `rgba(${bgRgb},0.4)`,
        }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 16 }}>
            Why This Suite Wins
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}>
            {[
              {
                title: 'All Monosyllabic',
                text: 'Dash, Dex, Dock, Dose -- each is exactly one syllable. Maximum punch, minimum cognitive load. Easy to say in conversation: "Check Dash for metrics, ask Dex to analyze it, order through Dock."',
              },
              {
                title: 'No Major Conflicts',
                text: 'Dex and Dock have minor adjacencies (DexCom, Docker) but within "Dutchie Dock" and "Dutchie Dex" the context is unambiguous. Dash and Dose are clean.',
              },
              {
                title: 'Cannabis-Native',
                text: '"Dose" is the hero here. No other B2B SaaS vertical would use this word. It signals cannabis expertise and makes the consumer product feel native to the industry, not generic.',
              },
              {
                title: 'Natural Verb Forms',
                text: '"Dash to your dashboard." "Dex it." "Dock your inventory." "Dose your customers." Each name doubles as a verb, enabling organic brand language in marketing and conversation.',
              },
            ].map((point) => (
              <div key={point.title}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: t.accentGold,
                  marginBottom: 8,
                }}>
                  {point.title}
                </div>
                <p style={{
                  fontSize: 12,
                  color: t.textMuted,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Final sentence */}
          <div style={{
            marginTop: 28,
            padding: '20px 24px',
            borderRadius: 12,
            background: `rgba(${goldRgb},0.05)`,
            border: `1px solid rgba(${goldRgb},0.15)`,
          }}>
            <p style={{
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
              margin: 0,
              textAlign: 'center',
            }}>
              <strong style={{ color: t.accentGoldLight }}>The D-prefix convention</strong> gives Dutchie a naming system as recognizable as Apple's "i" or Google's "G" suite.
              When a customer hears <strong style={{ color: t.text }}>"Dash, Dex, Dock, Dose"</strong> -- they know
              it's Dutchie. Four letters. Four syllables. Four products. One unmistakable brand.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ APPENDIX: FULL SCORING MATRIX ═══════════════════════ */}
      <Divider style={themedDividerStyle} />

      <div style={{ marginBottom: 32 }}>
        <SubTitle style={themedSectionTitleStyle}>Appendix: Quick-Reference Scoring</SubTitle>
        <p style={themedBodyTextStyle}>
          A consolidated view of all five suites, scored across four dimensions.
          The Bold Set leads with a total of 19/20.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: 13,
          }}>
            <thead>
              <tr>
                {['Suite', 'Names', 'Mem.', 'Dist.', 'Prof.', 'Culture', 'Total'].map((h, i) => (
                  <th key={h} style={{
                    padding: '14px 16px',
                    textAlign: i >= 2 ? 'center' : 'left',
                    fontSize: 10,
                    fontWeight: 600,
                    color: t.textFaint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderBottom: `2px solid ${borderLight}`,
                    background: t.cardBg,
                    whiteSpace: 'nowrap',
                    ...(i === 0 ? { borderRadius: '12px 0 0 0' } : {}),
                    ...(i === 6 ? { borderRadius: '0 12px 0 0' } : {}),
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUITES.map((suite, si) => {
                const total = Object.values(suite.ratings).reduce((a, b) => a + b, 0);
                const isWinner = suite.id === 'bold';
                return (
                  <tr key={suite.id} style={{
                    background: isWinner ? `rgba(${goldRgb},0.06)` : (si % 2 === 0 ? 'transparent' : `rgba(${cardBgRgb},0.5)`),
                  }}>
                    <td style={{
                      padding: '14px 16px',
                      fontWeight: 700,
                      color: isWinner ? t.accentGoldLight : t.text,
                      borderBottom: `1px solid ${t.border}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {suite.label}
                      {isWinner && (
                        <span style={{
                          marginLeft: 8,
                          fontSize: 9,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: `rgba(${goldRgb},0.15)`,
                          color: t.accentGold,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Winner
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: '14px 16px',
                      color: t.textMuted,
                      borderBottom: `1px solid ${t.border}`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}>
                      {suite.names.join(' / ')}
                    </td>
                    {Object.values(suite.ratings).map((val, vi) => (
                      <td key={vi} style={{
                        padding: '14px 16px',
                        textAlign: 'center',
                        borderBottom: `1px solid ${t.border}`,
                      }}>
                        <span style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: val >= 5 ? '#34D399' : val >= 4 ? t.accentGoldLight : t.textMuted,
                        }}>
                          {val}
                        </span>
                      </td>
                    ))}
                    <td style={{
                      padding: '14px 16px',
                      textAlign: 'center',
                      borderBottom: `1px solid ${t.border}`,
                      fontWeight: 700,
                      fontSize: 18,
                      color: isWinner ? t.accentGoldLight : t.text,
                    }}>
                      {total}<span style={{ fontSize: 12, color: t.textFaint, fontWeight: 400 }}>/20</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <div style={{
        textAlign: 'center',
        padding: '48px 0 0',
        borderTop: `1px solid ${t.border}`,
        marginTop: 48,
      }}>
        <div style={{
          fontSize: 11,
          color: textDim,
          letterSpacing: '0.06em',
        }}>
          D-NAME EXPLORATION &mdash; DUTCHIE AI NAMING STRATEGY &mdash; 2026
        </div>
      </div>
    </div>
  );
}
