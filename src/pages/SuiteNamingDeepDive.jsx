import React, { useState } from 'react';

const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC', text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680', accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E', accentGreen: '#059669' }
};

// ============================================================
// DATA: Agent Name Candidates
// ============================================================

const agentCandidates = [
  {
    name: 'Dex',
    origin: 'Dexterity',
    personality: 'Nimble, sharp, always one step ahead. Your quickest thinker.',
    conversationTest: 'Hey Dex, how are sales looking today?',
    scores: { approachability: 5, uniqueness: 4, professionalism: 4 },
  },
  {
    name: 'Kip',
    origin: 'Quick energy',
    personality: 'Energetic, eager to help, a bit playful but always delivers.',
    conversationTest: 'Kip, pull up yesterday\'s top sellers for me.',
    scores: { approachability: 5, uniqueness: 4, professionalism: 3 },
  },
  {
    name: 'Nev',
    origin: 'Never miss',
    personality: 'Wise, calm, the one who always remembers what you forgot.',
    conversationTest: 'Nev says we\'re running low on that strain again.',
    scores: { approachability: 4, uniqueness: 4, professionalism: 4 },
  },
  {
    name: 'Taz',
    origin: 'Energetic force',
    personality: 'Fast, memorable, a whirlwind of productivity and answers.',
    conversationTest: 'Ask Taz, it usually knows the answer immediately.',
    scores: { approachability: 4, uniqueness: 5, professionalism: 3 },
  },
  {
    name: 'Ren',
    origin: 'Renaissance',
    personality: 'Knowledgeable, clean, a polymath who connects the dots.',
    conversationTest: 'Ren, what\'s our best margin product this week?',
    scores: { approachability: 4, uniqueness: 4, professionalism: 5 },
  },
  {
    name: 'Joss',
    origin: 'Good fortune',
    personality: 'Friendly, approachable, warm. The coworker everyone trusts.',
    conversationTest: 'Joss flagged a compliance issue before I even noticed.',
    scores: { approachability: 5, uniqueness: 3, professionalism: 4 },
  },
  {
    name: 'Lex',
    origin: 'Lexicon',
    personality: 'Smart, precise, articulate. Knows the right word for everything.',
    conversationTest: 'Lex, break down this week\'s performance by category.',
    scores: { approachability: 4, uniqueness: 3, professionalism: 5 },
  },
  {
    name: 'Cal',
    origin: 'Calculated',
    personality: 'Reliable, steady, the numbers person you always trust.',
    conversationTest: 'Cal ran the forecast and we should order by Thursday.',
    scores: { approachability: 4, uniqueness: 3, professionalism: 5 },
  },
  {
    name: 'Sage',
    origin: 'Wisdom + herb',
    personality: 'Wise, cannabis-adjacent, the knowing elder of your operation.',
    conversationTest: 'Sage recommended we shift the edibles display.',
    scores: { approachability: 4, uniqueness: 4, professionalism: 4 },
  },
  {
    name: 'Wren',
    origin: 'Small bird',
    personality: 'Small but sharp, observant, nature-connected. Sees everything.',
    conversationTest: 'Wren caught that inventory discrepancy before open.',
    scores: { approachability: 4, uniqueness: 5, professionalism: 4 },
  },
  {
    name: 'Finn',
    origin: 'Adventure + Irish charm',
    personality: 'Adventurous, discoverer, brings charm and warmth to data.',
    conversationTest: 'Finn found three products trending that we don\'t stock yet.',
    scores: { approachability: 5, uniqueness: 3, professionalism: 3 },
  },
  {
    name: 'Rue',
    origin: 'Rue herb + French',
    personality: 'Contemplative, sophisticated, cannabis-adjacent with French flair.',
    conversationTest: 'Rue analyzed the weekend patterns and suggested new hours.',
    scores: { approachability: 3, uniqueness: 5, professionalism: 5 },
  },
];

// ============================================================
// DATA: Platform Name Candidates
// ============================================================

const platformCandidates = [
  { name: 'Nexus', tagline: 'The connection point where all your data meets.', usage: 'Open up Nexus to check today\'s numbers.' },
  { name: 'Pulse', tagline: 'The real-time heartbeat of your business.', usage: 'Pulse is showing a spike in afternoon foot traffic.' },
  { name: 'Atlas', tagline: 'A map of everything. The comprehensive view.', usage: 'Pull up Atlas \u2014 I need the full picture on Q2.' },
  { name: 'Prism', tagline: 'See your data from every angle.', usage: 'Prism breaks it down by time, category, and location.' },
  { name: 'Vertex', tagline: 'Peak performance, always in view.', usage: 'Vertex says we hit a new daily record yesterday.' },
  { name: 'Signal', tagline: 'Clear insights cutting through the noise.', usage: 'The Signal dashboard flagged three trends to watch.' },
  { name: 'Beacon', tagline: 'A guiding light for dispensary operators.', usage: 'Beacon\'s forecasting saved us from a stockout last week.' },
  { name: 'Meridian', tagline: 'The central line guiding your path forward.', usage: 'Meridian shows our loyalty program is underperforming.' },
  { name: 'Lumen', tagline: 'Illuminating what matters in your business.', usage: 'Lumen lit up three hidden revenue opportunities.' },
  { name: 'Cortex', tagline: 'The brain behind your retail operation.', usage: 'Cortex processed last month and here\'s what it found.' },
];

// ============================================================
// DATA: Marketplace Name Candidates
// ============================================================

const marketplaceCandidates = [
  { name: 'Connect', tagline: 'Brands meet retailers. Simple as that.', usage: 'We found that vendor on Connect last week.' },
  { name: 'Bridge', tagline: 'The span between brand and shelf.', usage: 'Bridge has 200 new products from Colorado brands.' },
  { name: 'Market', tagline: 'The simplest word for what it is.', usage: 'Check Market for the latest wholesale pricing.' },
  { name: 'Link', tagline: 'Every connection strengthens the chain.', usage: 'Our top supplier just joined Link.' },
  { name: 'Exchange', tagline: 'Where cannabis commerce happens.', usage: 'Exchange processed 400 orders this month.' },
  { name: 'Grove', tagline: 'Where brands and retailers grow together.', usage: 'We discovered three craft brands on Grove.' },
  { name: 'Canopy', tagline: 'The umbrella covering the whole market.', usage: 'Canopy covers every licensed brand in the state.' },
  { name: 'Relay', tagline: 'Passing quality products down the chain.', usage: 'Relay cut our ordering time in half.' },
  { name: 'Source', tagline: 'Where great products come from.', usage: 'Source it through Dutchie, guaranteed quality.' },
  { name: 'Harvest', tagline: 'Gathering the best the market has to offer.', usage: 'Harvest just onboarded 50 new craft producers.' },
];

// ============================================================
// DATA: Consumer Name Candidates
// ============================================================

const consumerCandidates = [
  { name: 'Discover', tagline: 'Find your next favorite.', usage: 'I found that edible on Discover last night.' },
  { name: 'Bloom', tagline: 'Watch your preferences blossom.', usage: 'Bloom recommended something amazing and it was perfect.' },
  { name: 'Leaf', tagline: 'Natural. Simple. Cannabis.', usage: 'Check Leaf before you go \u2014 they have great recommendations.' },
  { name: 'Guide', tagline: 'Personalized guidance, every time.', usage: 'Guide matched me to the exact terpene profile I wanted.' },
  { name: 'Taste', tagline: 'Curated to your personal preference.', usage: 'My Taste profile knows me better than I know myself.' },
  { name: 'Match', tagline: 'The right product for the right moment.', usage: 'Match found me three products perfect for sleep.' },
  { name: 'Wander', tagline: 'Explore, discover, enjoy the journey.', usage: 'I was just wandering on Wander and found a new brand.' },
  { name: 'Glow', tagline: 'That warm feeling of finding exactly what you need.', usage: 'Glow\'s weekly picks are always spot-on for me.' },
  { name: 'Dose', tagline: 'Precise. Measured. Personalized.', usage: 'Dose calculated the perfect strength for a beginner.' },
  { name: 'Path', tagline: 'Your personalized cannabis journey.', usage: 'Path\'s onboarding quiz was actually fun and useful.' },
];

// ============================================================
// DATA: Suite Combinations
// ============================================================

const suiteCombinations = [
  {
    id: 1,
    agent: 'Dex', platform: 'Nexus', marketplace: 'Connect', consumer: 'Bloom',
    label: 'The Flagship',
    vibe: 'Familiar names, strong individual identities, easy to remember. The safe-but-excellent choice.',
    scores: { memorability: 5, professionalism: 5, cannabisFit: 3, cohesion: 4 },
  },
  {
    id: 2,
    agent: 'Dex', platform: 'Pulse', marketplace: 'Bridge', consumer: 'Discover',
    label: 'The Clear',
    vibe: 'Action-oriented, every name implies doing something. Energetic and forward-moving.',
    scores: { memorability: 4, professionalism: 5, cannabisFit: 2, cohesion: 5 },
  },
  {
    id: 3,
    agent: 'Dex', platform: 'Atlas', marketplace: 'Grove', consumer: 'Wander',
    label: 'The Natural',
    vibe: 'Earthy, cannabis-native, exploration-themed. Feels organic and grounded.',
    scores: { memorability: 4, professionalism: 4, cannabisFit: 5, cohesion: 5 },
  },
  {
    id: 4,
    agent: 'Sage', platform: 'Prism', marketplace: 'Exchange', consumer: 'Glow',
    label: 'The Wise',
    vibe: 'Sophisticated and cerebral. Every name suggests depth and transformation.',
    scores: { memorability: 4, professionalism: 5, cannabisFit: 4, cohesion: 4 },
  },
  {
    id: 5,
    agent: 'Ren', platform: 'Signal', marketplace: 'Source', consumer: 'Path',
    label: 'The Clean',
    vibe: 'Minimal and modern. No wasted syllables. Pure and precise.',
    scores: { memorability: 3, professionalism: 5, cannabisFit: 3, cohesion: 5 },
  },
  {
    id: 6,
    agent: 'Dex', platform: 'Meridian', marketplace: 'Canopy', consumer: 'Dose',
    label: 'The Cannabis Suite',
    vibe: 'Industry-rooted. Canopy and Dose are unmistakably cannabis. Meridian guides the way.',
    scores: { memorability: 4, professionalism: 4, cannabisFit: 5, cohesion: 4 },
  },
  {
    id: 7,
    agent: 'Kip', platform: 'Beacon', marketplace: 'Relay', consumer: 'Match',
    label: 'The Friendly',
    vibe: 'Approachable, warm, nothing intimidating. The suite for a local dispensary that cares.',
    scores: { memorability: 4, professionalism: 3, cannabisFit: 3, cohesion: 4 },
  },
  {
    id: 8,
    agent: 'Dex', platform: 'Vertex', marketplace: 'Market', consumer: 'Guide',
    label: 'The Direct',
    vibe: 'No-nonsense. Vertex aspires up, Market is what it is, Guide does what it says.',
    scores: { memorability: 4, professionalism: 5, cannabisFit: 2, cohesion: 4 },
  },
];

// ============================================================
// DATA: Top 3 Head-to-Head
// ============================================================

const topThreeSuites = [
  {
    agent: 'Dex', platform: 'Nexus', marketplace: 'Connect', consumer: 'Bloom',
    label: 'The Flagship',
    meetingTest: '"Let\'s pull up Nexus and ask Dex about Q3 projections, then check Connect for new vendor options."',
    emailTest: 'Subject: Your Bloom recommendations are ready \u2014 3 new strains matched to your profile',
    appStoreTest: 'Bloom by Dutchie \u2014 AI-powered cannabis discovery. Find your next favorite strain.',
    investorTest: '"Dex is our AI copilot, Nexus is the intelligence layer, Connect is the marketplace, and Bloom brings consumers in."',
  },
  {
    agent: 'Dex', platform: 'Atlas', marketplace: 'Grove', consumer: 'Wander',
    label: 'The Natural',
    meetingTest: '"Atlas is showing a 15% uptick in pre-rolls. Let me ask Dex what\'s driving it, and check if Grove has new suppliers."',
    emailTest: 'Subject: Wander into something new \u2014 your personalized picks for the weekend',
    appStoreTest: 'Wander by Dutchie \u2014 Explore cannabis your way. AI-guided recommendations.',
    investorTest: '"Our suite is nature-inspired: Atlas maps the market, Dex navigates it, Grove connects it, and Wander lets consumers explore."',
  },
  {
    agent: 'Dex', platform: 'Pulse', marketplace: 'Bridge', consumer: 'Discover',
    label: 'The Clear',
    meetingTest: '"Pulse flagged an anomaly this morning. Dex dug into it and Bridge shows the supplier delayed shipment."',
    emailTest: 'Subject: Discover something new \u2014 curated picks based on your favorites',
    appStoreTest: 'Discover by Dutchie \u2014 Cannabis recommendations powered by AI.',
    investorTest: '"Pulse gives operators a heartbeat, Dex is the intelligence, Bridge connects supply, and Discover brings consumers."',
  },
];

// ============================================================
// DATA: Winner Suite
// ============================================================

const winnerSuite = {
  agent: { name: 'Dex', tagline: 'Your AI copilot for cannabis retail' },
  platform: { name: 'Nexus', tagline: 'Intelligence dashboard for dispensary operators' },
  marketplace: { name: 'Connect', tagline: 'Where brands meet retailers' },
  consumer: { name: 'Bloom', tagline: 'AI-powered cannabis discovery for consumers' },
};

// ============================================================
// SUBCOMPONENTS
// ============================================================

function SectionHeader({ number, title, subtitle, t }) {
  return (
    <div style={{ marginBottom: 48, paddingTop: 64 }}>
      <div style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 20,
        background: `${t.accentGold}18`,
        border: `1px solid ${t.accentGold}40`,
        marginBottom: 16,
      }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: t.accentGold, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Section {number}
        </span>
      </div>
      <h2 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 40,
        fontWeight: 800,
        color: t.text,
        margin: '0 0 8px 0',
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18,
          color: t.textMuted,
          margin: 0,
          maxWidth: 680,
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ScoreBar({ label, value, maxValue = 5, t }) {
  const pct = (value / maxValue) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 11,
        fontWeight: 500,
        color: t.textFaint,
        width: 100,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{
        flex: 1,
        height: 6,
        borderRadius: 3,
        background: `${t.textFaint}25`,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          borderRadius: 3,
          background: value >= 4 ? t.accentGreen : value >= 3 ? t.accentGold : t.textFaint,
          transition: 'width 0.6s ease',
        }} />
      </div>
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 12,
        fontWeight: 700,
        color: value >= 4 ? t.accentGreen : value >= 3 ? t.accentGold : t.textFaint,
        width: 20,
        textAlign: 'right',
        flexShrink: 0,
      }}>
        {value}
      </span>
    </div>
  );
}

function Wordmark({ name, size = 48, color, t }) {
  return (
    <span style={{
      fontFamily: 'DM Sans, sans-serif',
      fontSize: size,
      fontWeight: 800,
      color: color || t.text,
      letterSpacing: '-0.03em',
      lineHeight: 1,
    }}>
      {name}
    </span>
  );
}

function ConversationBubble({ text, t }) {
  return (
    <div style={{
      background: `${t.accentGold}12`,
      border: `1px solid ${t.accentGold}30`,
      borderRadius: 12,
      padding: '10px 16px',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      color: t.textMuted,
      fontStyle: 'italic',
      lineHeight: 1.5,
    }}>
      &ldquo;{text}&rdquo;
    </div>
  );
}

function QuoteMockup({ label, text, t }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 11,
        fontWeight: 600,
        color: t.accentGold,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{
        background: `${t.textFaint}08`,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: '12px 16px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        color: t.textMuted,
        fontStyle: 'italic',
        lineHeight: 1.6,
      }}>
        {text}
      </div>
    </div>
  );
}

// ============================================================
// SECTION 1: The Agent Name
// ============================================================

function AgentNameSection({ t }) {
  return (
    <div>
      <SectionHeader
        number="1"
        title="The Agent Name"
        subtitle="The AI agent is the product people TALK TO. It needs a name you can say out loud naturally \u2014 in conversation with your team, in a shout across the dispensary floor. It should sound like it could be a person, without being a common real name."
        t={t}
      />

      <div style={{
        background: `${t.accentGold}08`,
        border: `1px solid ${t.accentGold}25`,
        borderRadius: 12,
        padding: '24px 28px',
        marginBottom: 40,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          color: t.accentGold,
          marginBottom: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          Why does the agent name matter most?
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 15,
          color: t.textMuted,
          lineHeight: 1.7,
        }}>
          When a budtender says &ldquo;Hey Dex, how are sales today?&rdquo; the name becomes part of their daily language.
          No other product in the suite gets spoken aloud this way. The platform is a screen you open. The marketplace
          is a tool you use. But the agent is someone you talk to. That is why this name carries the most weight.
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340, 1fr))',
        gap: 20,
      }}>
        {agentCandidates.map((c) => (
          <AgentCandidateCard key={c.name} candidate={c} t={t} />
        ))}
      </div>

      <div style={{
        marginTop: 48,
        padding: '32px 28px',
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          color: t.text,
          marginBottom: 16,
        }}>
          Agent Name Leaderboard
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...agentCandidates]
            .sort((a, b) => {
              const totalA = a.scores.approachability + a.scores.uniqueness + a.scores.professionalism;
              const totalB = b.scores.approachability + b.scores.uniqueness + b.scores.professionalism;
              return totalB - totalA;
            })
            .map((c, idx) => {
              const total = c.scores.approachability + c.scores.uniqueness + c.scores.professionalism;
              const maxTotal = 15;
              const pct = (total / maxTotal) * 100;
              return (
                <div key={c.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '10px 16px',
                  borderRadius: 8,
                  background: idx === 0 ? `${t.accentGold}12` : 'transparent',
                  border: idx === 0 ? `1px solid ${t.accentGold}30` : `1px solid transparent`,
                }}>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: idx === 0 ? t.accentGold : t.textFaint,
                    width: 24,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 18,
                    fontWeight: 700,
                    color: idx === 0 ? t.accentGold : t.text,
                    width: 60,
                    flexShrink: 0,
                  }}>
                    {c.name}
                  </span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: `${t.textFaint}18`, overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      borderRadius: 4,
                      background: idx === 0 ? t.accentGold : idx < 3 ? t.accentGreen : t.textMuted,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: idx === 0 ? t.accentGold : t.textMuted,
                    width: 36,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    {total}/15
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function AgentCandidateCard({ candidate: c, t }) {
  const total = c.scores.approachability + c.scores.uniqueness + c.scores.professionalism;
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Wordmark name={c.name} size={52} t={t} />
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          color: t.textFaint,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          padding: '3px 10px',
          borderRadius: 12,
          background: `${t.textFaint}15`,
        }}>
          {c.origin}
        </div>
      </div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        color: t.textMuted,
        lineHeight: 1.5,
      }}>
        {c.personality}
      </div>

      <div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: t.textFaint,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}>
          The Conversation Test
        </div>
        <ConversationBubble text={c.conversationTest} t={t} />
      </div>

      <div style={{ marginTop: 4 }}>
        <ScoreBar label="Approachable" value={c.scores.approachability} t={t} />
        <ScoreBar label="Unique" value={c.scores.uniqueness} t={t} />
        <ScoreBar label="Professional" value={c.scores.professionalism} t={t} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 4,
      }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          fontWeight: 700,
          color: total >= 13 ? t.accentGreen : total >= 11 ? t.accentGold : t.textFaint,
        }}>
          Total: {total}/15
        </span>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 2: The Platform Name
// ============================================================

function PlatformNameSection({ t }) {
  return (
    <div>
      <SectionHeader
        number="2"
        title="The Platform Name"
        subtitle="The intelligence dashboard doesn't need to sound like a person. It should sound like a PRODUCT \u2014 something you open, something you log into, something you trust with your business data."
        t={t}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {platformCandidates.map((c) => (
          <PlatformCard key={c.name} candidate={c} t={t} />
        ))}
      </div>

      <div style={{
        marginTop: 40,
        padding: '24px 28px',
        background: `${t.accentGold}06`,
        border: `1px solid ${t.accentGold}20`,
        borderRadius: 12,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          fontWeight: 700,
          color: t.text,
          marginBottom: 12,
        }}>
          Platform Naming Principles
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { principle: 'Sounds like software', detail: 'You open it, you check it, you log into it.' },
            { principle: 'Implies intelligence', detail: 'It sees patterns, predicts, illuminates.' },
            { principle: 'Works with Dutchie', detail: '"Dutchie Nexus" sounds professional and complete.' },
            { principle: 'No person needed', detail: 'Nobody says "Hey Nexus" \u2014 they say "Open Nexus."' },
          ].map((p) => (
            <div key={p.principle} style={{
              fontFamily: 'DM Sans, sans-serif',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.accentGold, marginBottom: 4 }}>
                {p.principle}
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
                {p.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ candidate: c, t }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <Wordmark name={c.name} size={44} t={t} />
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 15,
        color: t.textMuted,
        lineHeight: 1.5,
      }}>
        {c.tagline}
      </div>
      <div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: t.textFaint,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}>
          In Use
        </div>
        <ConversationBubble text={c.usage} t={t} />
      </div>
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 12,
        color: t.textFaint,
        marginTop: 4,
      }}>
        Dutchie {c.name}
      </div>
    </div>
  );
}

// ============================================================
// SECTION 3: The Marketplace Name
// ============================================================

function MarketplaceNameSection({ t }) {
  return (
    <div>
      <SectionHeader
        number="3"
        title="The Marketplace Name"
        subtitle="B2B commerce \u2014 where brands sell to retailers. This name should convey connection, commerce, and trust. It can lean into the cannabis space or stay generic."
        t={t}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {marketplaceCandidates.map((c) => (
          <MarketplaceCard key={c.name} candidate={c} t={t} />
        ))}
      </div>

      <div style={{
        marginTop: 40,
        padding: '24px 28px',
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          fontWeight: 700,
          color: t.text,
          marginBottom: 16,
        }}>
          Cannabis Resonance Scale
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'Canopy', level: 5, label: 'Deeply cannabis' },
            { name: 'Grove', level: 4, label: 'Nature / cannabis adjacent' },
            { name: 'Harvest', level: 4, label: 'Agricultural / cannabis' },
            { name: 'Source', level: 2, label: 'Generic but fitting' },
            { name: 'Bridge', level: 1, label: 'Fully generic' },
            { name: 'Connect', level: 1, label: 'Fully generic' },
            { name: 'Market', level: 1, label: 'Fully generic' },
            { name: 'Exchange', level: 1, label: 'Fully generic' },
            { name: 'Link', level: 1, label: 'Fully generic' },
            { name: 'Relay', level: 1, label: 'Fully generic' },
          ].map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: t.text,
                width: 80,
                flexShrink: 0,
              }}>
                {item.name}
              </span>
              <div style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                background: `${t.textFaint}18`,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(item.level / 5) * 100}%`,
                  height: '100%',
                  borderRadius: 3,
                  background: item.level >= 4 ? t.accentGreen : item.level >= 2 ? t.accentGold : t.textFaint,
                }} />
              </div>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                color: t.textFaint,
                width: 140,
                flexShrink: 0,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketplaceCard({ candidate: c, t }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <Wordmark name={c.name} size={42} t={t} />
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 15,
        color: t.textMuted,
        lineHeight: 1.5,
      }}>
        {c.tagline}
      </div>
      <div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: t.textFaint,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}>
          In Use
        </div>
        <ConversationBubble text={c.usage} t={t} />
      </div>
    </div>
  );
}

// ============================================================
// SECTION 4: The Consumer Name
// ============================================================

function ConsumerNameSection({ t }) {
  return (
    <div>
      <SectionHeader
        number="4"
        title="The Consumer Name"
        subtitle="AI-powered product recommendations for end consumers. This name shows up in app stores, on phones, in texts between friends. It needs to feel inviting, personal, and just a little magical."
        t={t}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {consumerCandidates.map((c) => (
          <ConsumerCard key={c.name} candidate={c} t={t} />
        ))}
      </div>

      <div style={{
        marginTop: 40,
        padding: '24px 28px',
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          fontWeight: 700,
          color: t.text,
          marginBottom: 16,
        }}>
          The Friend Test: Would you text this name to someone?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {consumerCandidates.map((c) => {
            const friendScore = ['Bloom', 'Discover', 'Glow', 'Wander'].includes(c.name) ? 'high' :
              ['Guide', 'Match', 'Path'].includes(c.name) ? 'medium' : 'low';
            const friendColor = friendScore === 'high' ? t.accentGreen : friendScore === 'medium' ? t.accentGold : t.textFaint;
            return (
              <div key={c.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 14px',
                borderRadius: 8,
                background: friendScore === 'high' ? `${t.accentGreen}10` : 'transparent',
                border: `1px solid ${friendScore === 'high' ? `${t.accentGreen}25` : t.border}`,
              }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: friendColor,
                  width: 70,
                  flexShrink: 0,
                }}>
                  {c.name}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  color: t.textMuted,
                  fontStyle: 'italic',
                }}>
                  &ldquo;Check out {c.name}, it found me the perfect strain&rdquo;
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ConsumerCard({ candidate: c, t }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <Wordmark name={c.name} size={42} t={t} />
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 15,
        color: t.textMuted,
        lineHeight: 1.5,
      }}>
        {c.tagline}
      </div>
      <div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: t.textFaint,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}>
          How a Customer Says It
        </div>
        <ConversationBubble text={c.usage} t={t} />
      </div>
    </div>
  );
}

// ============================================================
// SECTION 5: Best Suite Combinations
// ============================================================

function SuiteCombinationsSection({ t }) {
  return (
    <div>
      <SectionHeader
        number="5"
        title="Best Suite Combinations"
        subtitle="Each product is strong alone. But the four-name suite has to feel cohesive, memorable, and differentiated as a family. Here are eight complete suites."
        t={t}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {suiteCombinations.map((suite) => (
          <SuiteRow key={suite.id} suite={suite} t={t} />
        ))}
      </div>
    </div>
  );
}

function SuiteRow({ suite: s, t }) {
  const roleLabels = ['AI Agent', 'Platform', 'Marketplace', 'Consumer'];
  const names = [s.agent, s.platform, s.marketplace, s.consumer];
  const roleColors = [t.accentGold, t.accentGreen, t.accentGoldLight, t.textMuted];

  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: '28px 28px 24px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: 800,
            color: t.accentGold,
            background: `${t.accentGold}15`,
            padding: '2px 10px',
            borderRadius: 10,
          }}>
            #{s.id}
          </span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
          }}>
            {s.label}
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginBottom: 20,
      }}>
        {names.map((name, i) => (
          <div key={name + i} style={{
            textAlign: 'center',
            padding: '16px 8px',
            borderRadius: 10,
            background: `${roleColors[i]}08`,
            border: `1px solid ${roleColors[i]}20`,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              fontWeight: 600,
              color: roleColors[i],
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}>
              {roleLabels[i]}
            </div>
            <Wordmark name={name} size={32} color={roleColors[i]} t={t} />
          </div>
        ))}
      </div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        color: t.textMuted,
        lineHeight: 1.6,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: `1px solid ${t.border}`,
      }}>
        {s.vibe}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <ScoreBar label="Memorable" value={s.scores.memorability} t={t} />
        <ScoreBar label="Professional" value={s.scores.professionalism} t={t} />
        <ScoreBar label="Cannabis Fit" value={s.scores.cannabisFit} t={t} />
        <ScoreBar label="Cohesion" value={s.scores.cohesion} t={t} />
      </div>
    </div>
  );
}

// ============================================================
// SECTION 6: Head-to-Head Top 3
// ============================================================

function HeadToHeadSection({ t }) {
  const suiteColors = [t.accentGold, t.accentGreen, t.accentGoldLight];
  return (
    <div>
      <SectionHeader
        number="6"
        title="Head-to-Head: Top 3 Suites"
        subtitle="We take the three strongest contenders and stress-test them across four real-world scenarios: a team meeting, a customer email, an app store listing, and an investor pitch."
        t={t}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginBottom: 40,
      }}>
        {topThreeSuites.map((s, idx) => (
          <div key={s.label} style={{
            background: t.cardBg,
            border: `2px solid ${suiteColors[idx]}40`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              color: suiteColors[idx],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}>
              Contender {idx + 1}
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              color: t.text,
              marginBottom: 8,
            }}>
              {s.label}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}>
              {[s.agent, s.platform, s.marketplace, s.consumer].map((name) => (
                <span key={name} style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: suiteColors[idx],
                  background: `${suiteColors[idx]}12`,
                  padding: '3px 10px',
                  borderRadius: 8,
                }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {[
          { testName: 'Say It In a Meeting', key: 'meetingTest', icon: 'Meeting room' },
          { testName: 'Customer Email Subject Line', key: 'emailTest', icon: 'Inbox' },
          { testName: 'App Store Listing', key: 'appStoreTest', icon: 'App store' },
          { testName: 'Investor Pitch', key: 'investorTest', icon: 'Boardroom' },
        ].map((test) => (
          <div key={test.testName}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: `1px solid ${t.border}`,
            }}>
              {test.testName}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}>
              {topThreeSuites.map((s, idx) => (
                <div key={s.label + test.key} style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 12,
                  padding: '16px 18px',
                }}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    color: suiteColors[idx],
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 8,
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    color: t.textMuted,
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}>
                    {s[test.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48,
        padding: '28px',
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          color: t.text,
          marginBottom: 20,
        }}>
          Side-by-Side Visual Comparison
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {topThreeSuites.map((s, idx) => {
            const roleLabels = ['Agent', 'Platform', 'Marketplace', 'Consumer'];
            const names = [s.agent, s.platform, s.marketplace, s.consumer];
            return (
              <div key={s.label + '-visual'} style={{
                padding: '24px 20px',
                borderRadius: 14,
                background: `${suiteColors[idx]}06`,
                border: `1px solid ${suiteColors[idx]}25`,
              }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: suiteColors[idx],
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 20,
                  textAlign: 'center',
                }}>
                  {s.label}
                </div>
                {names.map((name, ni) => (
                  <div key={name + ni} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: ni < 3 ? `1px solid ${t.border}` : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 11,
                      color: t.textFaint,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>
                      {roleLabels[ni]}
                    </span>
                    <span style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 24,
                      fontWeight: 800,
                      color: t.text,
                      letterSpacing: '-0.02em',
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {topThreeSuites.map((s, idx) => {
            const criteria = [
              { label: 'Rolls off the tongue', score: idx === 0 ? 5 : idx === 1 ? 4 : 4 },
              { label: 'Looks great in writing', score: idx === 0 ? 5 : idx === 1 ? 5 : 4 },
              { label: 'Cannabis resonance', score: idx === 0 ? 3 : idx === 1 ? 5 : 2 },
              { label: 'Enterprise-ready', score: idx === 0 ? 5 : idx === 1 ? 4 : 5 },
              { label: 'Consumer-friendly', score: idx === 0 ? 5 : idx === 1 ? 4 : 4 },
            ];
            const total = criteria.reduce((sum, c) => sum + c.score, 0);
            return (
              <div key={s.label + '-scores'} style={{
                padding: '16px 18px',
                borderRadius: 12,
                background: t.cardBg,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: suiteColors[idx],
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {s.label} \u2014 Score
                </div>
                {criteria.map((c) => (
                  <ScoreBar key={c.label} label={c.label} value={c.score} t={t} />
                ))}
                <div style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: `1px solid ${t.border}`,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 800,
                    color: suiteColors[idx],
                  }}>
                    {total}/25
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 7: The Winner
// ============================================================

function WinnerSection({ t }) {
  const w = winnerSuite;
  return (
    <div>
      <SectionHeader
        number="7"
        title="The Winner"
        subtitle="After testing every angle \u2014 conversation, email, app store, investor pitch, visual cohesion \u2014 one suite rises above the rest."
        t={t}
      />

      {/* Dramatic reveal */}
      <div style={{
        background: `linear-gradient(145deg, ${t.cardBg}, ${t.accentGold}08)`,
        border: `2px solid ${t.accentGold}40`,
        borderRadius: 24,
        padding: '60px 40px',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          fontWeight: 600,
          color: t.accentGold,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: 24,
        }}>
          The Dutchie Product Suite
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {[
            { name: w.agent.name, role: 'AI Agent', color: t.accentGold },
            { name: w.platform.name, role: 'Platform', color: t.accentGreen },
            { name: w.marketplace.name, role: 'Marketplace', color: t.accentGoldLight },
            { name: w.consumer.name, role: 'Consumer', color: t.accentGoldLighter },
          ].map((item, idx) => (
            <React.Fragment key={item.name}>
              {idx > 0 && (
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 28,
                  color: t.textFaint,
                  fontWeight: 300,
                }}>
                  +
                </span>
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 56,
                  fontWeight: 800,
                  color: item.color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.textFaint,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {item.role}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18,
          color: t.textMuted,
          fontStyle: 'italic',
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          &ldquo;The Flagship&rdquo; \u2014 familiar, strong, and already the frontrunner.
        </div>
      </div>

      {/* Taglines */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        marginBottom: 40,
      }}>
        {[
          { ...w.agent, role: 'AI Agent / Copilot', color: t.accentGold },
          { ...w.platform, role: 'Intelligence Dashboard', color: t.accentGreen },
          { ...w.marketplace, role: 'B2B Marketplace', color: t.accentGoldLight },
          { ...w.consumer, role: 'Consumer Discovery', color: t.accentGoldLighter },
        ].map((product) => (
          <div key={product.name} style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: '28px 24px',
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              fontWeight: 600,
              color: product.color,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}>
              {product.role}
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 36,
              fontWeight: 800,
              color: t.text,
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}>
              {product.name}
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 15,
              color: t.textMuted,
              lineHeight: 1.5,
            }}>
              {product.tagline}
            </div>
          </div>
        ))}
      </div>

      {/* How they work together */}
      <div style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: '32px 28px',
        marginBottom: 40,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: t.text,
          marginBottom: 20,
        }}>
          How They Work Together
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 15,
          color: t.textMuted,
          lineHeight: 1.8,
        }}>
          <p style={{ margin: '0 0 16px 0' }}>
            <strong style={{ color: t.accentGold }}>Dex</strong> is the AI copilot that dispensary staff talk to every day.
            It answers questions, runs reports, flags issues, and suggests actions. Dex is the conversational heart of the
            Dutchie suite \u2014 the teammate that never clocks out.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            <strong style={{ color: t.accentGreen }}>Nexus</strong> is where operators go to see the big picture.
            Analytics, forecasting, inventory intelligence, and performance tracking all live here.
            If Dex is the voice, Nexus is the screen.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            <strong style={{ color: t.accentGoldLight }}>Connect</strong> is the B2B marketplace where brands and
            retailers find each other. Ordering, wholesale pricing, vendor discovery, and supply chain management.
            The commerce layer that keeps shelves stocked.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: t.accentGoldLighter }}>Bloom</strong> is the consumer-facing product that helps
            end customers discover cannabis products matched to their preferences. AI-powered recommendations that
            make first-time and experienced customers alike feel confident in their choices.
          </p>
        </div>
      </div>

      {/* Mock nav bar */}
      <div style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: '28px',
        marginBottom: 40,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18,
          fontWeight: 700,
          color: t.text,
          marginBottom: 20,
        }}>
          Mock Navigation Bar
        </div>

        <div style={{
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: t.accentGold }}>dutchie</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { name: 'Dex', active: true },
              { name: 'Nexus', active: false },
              { name: 'Connect', active: false },
              { name: 'Bloom', active: false },
            ].map((item) => (
              <div key={item.name} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: item.active ? 700 : 500,
                color: item.active ? t.accentGold : t.textMuted,
                padding: '6px 16px',
                borderRadius: 8,
                background: item.active ? `${t.accentGold}12` : 'transparent',
                cursor: 'pointer',
              }}>
                {item.name}
              </div>
            ))}
          </div>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `${t.accentGold}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              color: t.accentGold,
            }}>
              JD
            </span>
          </div>
        </div>

        <div style={{
          marginTop: 16,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 12,
          color: t.textFaint,
          textAlign: 'center',
        }}>
          Every product accessible from one unified Dutchie navigation. The parent brand ties everything together.
        </div>
      </div>

      {/* Dutchie brand relationship */}
      <div style={{
        background: `linear-gradient(145deg, ${t.accentGold}08, ${t.cardBg})`,
        border: `1px solid ${t.accentGold}25`,
        borderRadius: 16,
        padding: '32px 28px',
        marginBottom: 40,
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: t.text,
          marginBottom: 20,
        }}>
          The Dutchie Parent Brand Relationship
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: t.accentGold,
              marginBottom: 8,
            }}>
              Endorsed Model
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.7,
            }}>
              Each product carries the Dutchie name as an endorsement: &ldquo;Dex by Dutchie,&rdquo; &ldquo;Nexus by Dutchie,&rdquo;
              &ldquo;Connect by Dutchie,&rdquo; &ldquo;Bloom by Dutchie.&rdquo; The parent brand provides trust and credibility
              while each product name carries its own personality.
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: t.accentGold,
              marginBottom: 8,
            }}>
              Visual System
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.7,
            }}>
              All four products share the same typographic system (DM Sans), color palette roots, and layout patterns.
              But each gets its own accent color and icon language. Together they look like siblings \u2014 clearly related,
              each with their own character.
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 28,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {[
            { full: 'Dex by Dutchie', color: t.accentGold },
            { full: 'Nexus by Dutchie', color: t.accentGreen },
            { full: 'Connect by Dutchie', color: t.accentGoldLight },
            { full: 'Bloom by Dutchie', color: t.accentGoldLighter },
          ].map((item) => (
            <div key={item.full} style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: item.color,
              background: `${item.color}10`,
              border: `1px solid ${item.color}25`,
              padding: '8px 18px',
              borderRadius: 24,
            }}>
              {item.full}
            </div>
          ))}
        </div>
      </div>

      {/* Final statement */}
      <div style={{
        textAlign: 'center',
        padding: '48px 32px',
      }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 32,
          fontWeight: 800,
          color: t.text,
          marginBottom: 16,
          letterSpacing: '-0.02em',
        }}>
          One Suite. Four Products. Clear Roles.
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          color: t.textMuted,
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Dex talks. Nexus shows. Connect trades. Bloom discovers.
          Together under the Dutchie umbrella, they form the most complete
          cannabis technology platform in the industry.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function SuiteNamingDeepDive({ theme = 'dark' }) {
  const t = themes[theme];
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, label: 'Agent Name', shortLabel: 'Agent' },
    { id: 2, label: 'Platform Name', shortLabel: 'Platform' },
    { id: 3, label: 'Marketplace Name', shortLabel: 'Marketplace' },
    { id: 4, label: 'Consumer Name', shortLabel: 'Consumer' },
    { id: 5, label: 'Suite Combinations', shortLabel: 'Suites' },
    { id: 6, label: 'Head-to-Head', shortLabel: 'H2H' },
    { id: 7, label: 'The Winner', shortLabel: 'Winner' },
  ];

  return (
    <div style={{
      background: t.bg,
      minHeight: '100vh',
      fontFamily: 'DM Sans, sans-serif',
      color: t.text,
    }}>
      {/* Page header */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '48px 32px 0',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: 20,
          background: `${t.accentGold}12`,
          border: `1px solid ${t.accentGold}30`,
          marginBottom: 20,
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            color: t.accentGold,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Dutchie AI Suite \u2014 Naming Deep Dive
          </span>
        </div>

        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 52,
          fontWeight: 800,
          color: t.text,
          margin: '0 0 16px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: 800,
        }}>
          What Do We Call These Things?
        </h1>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18,
          color: t.textMuted,
          margin: '0 0 12px 0',
          maxWidth: 720,
          lineHeight: 1.6,
        }}>
          Four products. Four names. One suite. The AI agent needs a human-ish name because people talk to it.
          Everything else just needs to sound like excellent software.
        </p>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          color: t.textFaint,
          margin: '0 0 32px 0',
          maxWidth: 720,
          lineHeight: 1.6,
        }}>
          This page walks through candidates for each product, scores them, assembles them into complete suites,
          stress-tests the top three, and presents a final recommendation.
        </p>

        {/* Quick summary cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { role: 'AI Agent', description: 'Conversational AI for dispensary staff. People talk to it.', count: '12 candidates', color: t.accentGold },
            { role: 'Platform', description: 'Intelligence dashboard for operators. Analytics and forecasting.', count: '10 candidates', color: t.accentGreen },
            { role: 'Marketplace', description: 'B2B commerce. Brands sell to retailers.', count: '10 candidates', color: t.accentGoldLight },
            { role: 'Consumer', description: 'AI recommendations for end consumers.', count: '10 candidates', color: t.accentGoldLighter },
          ].map((item) => (
            <div key={item.role} style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: '20px 18px',
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10,
                fontWeight: 600,
                color: item.color,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 8,
              }}>
                {item.role}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.5,
                marginBottom: 8,
              }}>
                {item.description}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                fontWeight: 700,
                color: item.color,
              }}>
                {item.count}
              </div>
            </div>
          ))}
        </div>

        {/* Section navigation */}
        <div style={{
          display: 'flex',
          gap: 6,
          padding: '16px 0 32px',
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          marginBottom: 0,
          flexWrap: 'wrap',
        }}>
          <div
            onClick={() => setActiveSection(null)}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: activeSection === null ? 700 : 500,
              color: activeSection === null ? t.accentGold : t.textMuted,
              padding: '6px 14px',
              borderRadius: 8,
              background: activeSection === null ? `${t.accentGold}12` : 'transparent',
              cursor: 'pointer',
              border: `1px solid ${activeSection === null ? `${t.accentGold}30` : 'transparent'}`,
              userSelect: 'none',
            }}
          >
            All Sections
          </div>
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                fontWeight: activeSection === s.id ? 700 : 500,
                color: activeSection === s.id ? t.accentGold : t.textMuted,
                padding: '6px 14px',
                borderRadius: 8,
                background: activeSection === s.id ? `${t.accentGold}12` : 'transparent',
                cursor: 'pointer',
                border: `1px solid ${activeSection === s.id ? `${t.accentGold}30` : 'transparent'}`,
                userSelect: 'none',
              }}
            >
              {s.id}. {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px 80px',
      }}>
        {(activeSection === null || activeSection === 1) && <AgentNameSection t={t} />}
        {(activeSection === null || activeSection === 2) && <PlatformNameSection t={t} />}
        {(activeSection === null || activeSection === 3) && <MarketplaceNameSection t={t} />}
        {(activeSection === null || activeSection === 4) && <ConsumerNameSection t={t} />}
        {(activeSection === null || activeSection === 5) && <SuiteCombinationsSection t={t} />}
        {(activeSection === null || activeSection === 6) && <HeadToHeadSection t={t} />}
        {(activeSection === null || activeSection === 7) && <WinnerSection t={t} />}
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px',
        borderTop: `1px solid ${t.border}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: t.textFaint,
          }}>
            Dutchie AI Suite \u2014 Naming Deep Dive \u2014 Internal Document
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: t.textFaint,
          }}>
            42 candidates \u2014 8 suites \u2014 1 recommendation
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuiteNamingDeepDive;
