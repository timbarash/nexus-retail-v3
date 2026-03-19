import { useState, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   AGENT NAME EXPLORATION SECTION
   The AI agent is the ONE product that needs a human-ish name.
   People talk to it. It lives in chat bubbles. It needs personality.
   Deep dive into "Dex" as the frontrunner and 19 alternatives.
   ═══════════════════════════════════════════════════════════════════════════════ */

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
    accentGoldLighter: '#FFD666',
    accentGreen: '#00C27C',
  },
  light: {
    bg: '#FAFAF8',
    cardBg: '#FFFFFF',
    border: '#E5E2DC',
    text: '#1A1917',
    textMuted: '#5C574F',
    textFaint: '#8C8680',
    accentGold: '#B8860B',
    accentGoldLight: '#DAA520',
    accentGoldLighter: '#F0C75E',
    accentGreen: '#059669',
  },
};

/* ─── Chat Bubble Component ─── */
function ChatBubble({ sender, message, isAgent, t }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isAgent ? 'flex-start' : 'flex-end',
      marginBottom: 12,
    }}>
      <div style={{
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        color: t.textFaint,
        marginBottom: 4,
        marginLeft: isAgent ? 8 : 0,
        marginRight: isAgent ? 0 : 8,
      }}>
        {sender}
      </div>
      <div style={{
        background: isAgent
          ? `linear-gradient(135deg, ${t.accentGold}18, ${t.accentGold}0C)`
          : `${t.text}0A`,
        border: `1px solid ${isAgent ? t.accentGold + '30' : t.border}`,
        borderRadius: isAgent ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        padding: '12px 18px',
        maxWidth: 400,
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        lineHeight: 1.6,
        color: t.text,
      }}>
        {message}
      </div>
    </div>
  );
}

/* ─── Score Bar Component ─── */
function ScoreBar({ label, score, t }) {
  const pct = (score / 10) * 100;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 4,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <span style={{ fontSize: 11, color: t.textMuted }}>{label}</span>
        <span style={{ fontSize: 11, color: t.accentGold, fontWeight: 600 }}>{score}/10</span>
      </div>
      <div style={{
        height: 6,
        borderRadius: 3,
        background: `${t.text}0A`,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 3,
          background: pct >= 80
            ? `linear-gradient(90deg, ${t.accentGreen}, ${t.accentGreen}CC)`
            : pct >= 60
              ? `linear-gradient(90deg, ${t.accentGold}, ${t.accentGoldLight})`
              : `linear-gradient(90deg, ${t.textFaint}, ${t.textMuted})`,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

/* ─── Large Wordmark Component ─── */
function Wordmark({ name, size = 48, t, isHighlighted = false }) {
  return (
    <div style={{
      fontFamily: 'DM Sans, sans-serif',
      fontSize: size,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: isHighlighted ? t.accentGold : t.text,
      lineHeight: 1.1,
      textShadow: isHighlighted ? `0 0 40px ${t.accentGold}30` : 'none',
    }}>
      {name}
    </div>
  );
}

/* ─── Personality Slider Component ─── */
function PersonalitySlider({ leftLabel, rightLabel, value, t }) {
  const pct = (value / 10) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 11,
        color: t.textMuted,
      }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div style={{
        height: 8,
        borderRadius: 4,
        background: `linear-gradient(90deg, ${t.textFaint}40, ${t.accentGold}40)`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: `${pct}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: t.accentGold,
          border: `3px solid ${t.cardBg}`,
          boxShadow: `0 0 12px ${t.accentGold}50`,
        }} />
      </div>
    </div>
  );
}

/* ─── Candidate Card Component ─── */
function CandidateCard({ candidate, t, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: expanded
          ? `linear-gradient(135deg, ${t.cardBg}, ${t.accentGold}08)`
          : t.cardBg,
        borderRadius: 16,
        border: `1px solid ${expanded ? t.accentGold + '40' : t.border}`,
        padding: 24,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Wordmark name={candidate.name} size={42} t={t} isHighlighted={expanded} />
        {candidate.isFrontrunner && (
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: t.accentGold,
            background: `${t.accentGold}15`,
            border: `1px solid ${t.accentGold}30`,
            borderRadius: 20,
            padding: '4px 12px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Frontrunner
          </span>
        )}
      </div>

      <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 4 }}>
        {candidate.origin}
      </div>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>
        {candidate.vibe}
      </div>

      {/* The Chat Test */}
      <div style={{
        background: `${t.text}06`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        border: `1px solid ${t.border}`,
      }}>
        <div style={{ fontSize: 10, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          The Chat Test
        </div>
        <ChatBubble
          sender={candidate.name}
          message={candidate.chatMessage}
          isAgent={true}
          t={t}
        />
      </div>

      {/* Score Bars */}
      <ScoreBar label="Natural (sounds like a real conversation)" score={candidate.scores.natural} t={t} />
      <ScoreBar label="Memorable" score={candidate.scores.memorable} t={t} />
      <ScoreBar label="Professional" score={candidate.scores.professional} t={t} />

      {expanded && candidate.expandedNotes && (
        <div style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 10,
          background: `${t.accentGold}08`,
          border: `1px solid ${t.accentGold}18`,
          fontSize: 13,
          lineHeight: 1.7,
          color: t.textMuted,
        }}>
          {candidate.expandedNotes}
        </div>
      )}
    </div>
  );
}

/* ─── Main Data: 20 Agent Name Candidates ─── */
const CANDIDATES = [
  {
    name: 'Dex',
    origin: 'From "dexterity" — nimble, skillful, quick-handed',
    vibe: 'Sharp, capable, modern',
    chatMessage: "Based on yesterday's sales, you should reorder Blue Dream. You're down to 14 units and it's been averaging 8/day.",
    scores: { natural: 9, memorable: 9, professional: 8 },
    isFrontrunner: true,
    expandedNotes: 'Dex hits the sweet spot: it sounds like it could be someone you know, but also sounds techy enough to be an AI. Think "Dexter" but cooler. Single syllable makes it fast in conversation — "Hey Dex" rolls off the tongue. The dexterity connection adds a layer of meaning: this agent is nimble with data.',
    group: 'D-name',
  },
  {
    name: 'Dash',
    origin: 'Speed, energy — a dash of insight',
    vibe: 'Quick, energetic, optimistic',
    chatMessage: "Quick heads-up: your weekend rush starts in 2 hours and you're low on pre-rolls. Want me to flag the top 5 SKUs to restock?",
    scores: { natural: 8, memorable: 8, professional: 6 },
    isFrontrunner: false,
    expandedNotes: 'Dash has great energy but might skew too playful for serious business contexts. The name suggests speed, which is good for an agent that delivers fast insights. Concern: Dash from The Incredibles might dominate associations.',
    group: 'D-name',
  },
  {
    name: 'Drew',
    origin: 'Human name + "drew insights/conclusions"',
    vibe: 'Warm, trustworthy, understated',
    chatMessage: "I drew some patterns from last quarter — your edibles category grew 34% but margins dropped. Want me to dig into pricing?",
    scores: { natural: 9, memorable: 7, professional: 9 },
    isFrontrunner: false,
    expandedNotes: 'Drew is perhaps the most genuinely human-sounding option. The double meaning ("Drew insights") is subtle and clever. Risk: it might feel TOO human — some users could forget they are talking to an AI, which raises ethical questions.',
    group: 'D-name',
  },
  {
    name: 'Dale',
    origin: 'Old English for "valley" — a familiar, friendly name',
    vibe: 'Friendly, approachable, reliable',
    chatMessage: "Hey there! Your afternoon lull usually hits around 2pm. Last Tuesday you ran a flash deal on concentrates and it bumped traffic 18%. Want to try that again?",
    scores: { natural: 8, memorable: 6, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Dale is undeniably friendly but might lack the edge a tech product needs. It sounds like a helpful neighbor rather than a powerful AI. Could work for dispensaries that prioritize warmth over sophistication.',
    group: 'D-name',
  },
  {
    name: 'Kip',
    origin: 'Short for "kipper" or just a punchy nickname — energy in a small package',
    vibe: 'Energetic, scrappy, upbeat',
    chatMessage: "Your top seller just shifted! Sour Diesel overtook Blue Dream at 11am. Want me to update the featured shelf?",
    scores: { natural: 7, memorable: 8, professional: 6 },
    isFrontrunner: false,
    expandedNotes: 'Kip has a plucky quality — it sounds like a scrappy startup assistant. The energy is great but it might not scale well to enterprise contexts. Napoleon Dynamite association could be a factor.',
    group: 'other',
  },
  {
    name: 'Nev',
    origin: 'Short for "Neville" or standing alone — sounds calm and knowing',
    vibe: 'Wise, calm, composed',
    chatMessage: "I have been tracking your flower-to-edibles ratio. It has shifted 12% toward edibles this quarter. That is consistent with regional trends I am seeing across similar dispensaries.",
    scores: { natural: 7, memorable: 7, professional: 8 },
    isFrontrunner: false,
    expandedNotes: 'Nev has a measured, thoughtful quality. It sounds like someone who thinks before they speak. Good for analytics-heavy use cases where users want to feel like they are consulting an expert.',
    group: 'other',
  },
  {
    name: 'Ren',
    origin: 'Japanese for "lotus" / renaissance — clean and modern',
    vibe: 'Clean, modern, precise',
    chatMessage: "Three patterns worth noting today: morning traffic is up 15%, your loyalty redemptions spiked, and one budtender is outperforming the team by 2x on upsells.",
    scores: { natural: 7, memorable: 8, professional: 8 },
    isFrontrunner: false,
    expandedNotes: 'Ren is sleek and international. The lotus/renaissance connection adds depth. Could appeal to premium dispensaries. Concern: Ren and Stimpy is a strong cultural association for some demographics.',
    group: 'other',
  },
  {
    name: 'Joss',
    origin: 'A warm, gender-neutral name — "joss" also means luck/fortune',
    vibe: 'Warm, approachable, genuine',
    chatMessage: "Good morning! Based on the weather forecast (sunny, 78F), I would expect a busier-than-usual day. Your last sunny Saturday did 23% above average.",
    scores: { natural: 8, memorable: 7, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Joss feels like a genuinely warm companion. The luck/fortune meaning adds a nice layer. Joss Whedon association could be polarizing. The two-syllable feel (even though it is one) gives it a softer landing.',
    group: 'other',
  },
  {
    name: 'Cal',
    origin: 'Short for "calculate" — also a solid human name',
    vibe: 'Calculated, reliable, grounded',
    chatMessage: "I have calculated your optimal reorder points for this week. Three SKUs need attention by Thursday. Want the full breakdown?",
    scores: { natural: 8, memorable: 7, professional: 9 },
    isFrontrunner: false,
    expandedNotes: 'Cal walks the line between human and functional beautifully. "I asked Cal" sounds natural. The calculation connection is obvious but not forced. Risk: might feel too plain for some brand visions.',
    group: 'other',
  },
  {
    name: 'Taz',
    origin: 'Energetic, a bit wild — short and punchy',
    vibe: 'Fast, memorable, bold',
    chatMessage: "Whoa, your online orders just spiked 40% in the last hour. Looks like that Instagram post hit. Want me to make sure inventory is synced?",
    scores: { natural: 6, memorable: 9, professional: 5 },
    isFrontrunner: false,
    expandedNotes: 'Taz is impossible to forget but might be too informal for business software. The Tasmanian Devil association adds chaos energy. Best for brands that lean playful and irreverent.',
    group: 'other',
  },
  {
    name: 'Lex',
    origin: 'From "lexicon" — words, knowledge, analysis',
    vibe: 'Smart, precise, authoritative',
    chatMessage: "Analyzing your pricing strategy: you are 8% above market average on flower but 12% below on edibles. I would recommend a targeted price adjustment on your top 10 edible SKUs.",
    scores: { natural: 8, memorable: 8, professional: 9 },
    isFrontrunner: false,
    expandedNotes: 'Lex is one of the strongest alternatives to Dex. The lexicon connection is perfect for a data-centric agent. Sounds authoritative without being cold. Concern: Lex Luthor is the dominant pop culture reference, and Amazon Alexa is phonetically close.',
    group: 'other',
  },
  {
    name: 'Wren',
    origin: 'A small, observant bird — notices everything',
    vibe: 'Observant, natural, thoughtful',
    chatMessage: "I noticed something interesting: customers who buy your house brand flower come back 2.3 days sooner than those who buy name brands. Might be worth expanding that line.",
    scores: { natural: 7, memorable: 8, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Wren is poetic and distinctive. The bird connection implies watchfulness and attention to detail. Works beautifully for a cannabis brand given the nature association. Might feel too soft for some users.',
    group: 'other',
  },
  {
    name: 'Finn',
    origin: 'Irish for "fair" — adventurous, open, bold',
    vibe: 'Adventurous, friendly, bold',
    chatMessage: "Discovered a new trend in your data: first-time customers who get a staff recommendation are 3x more likely to return. Want me to create a prompt card for your team?",
    scores: { natural: 9, memorable: 8, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Finn is extremely likable and conversational. "Hey Finn" feels completely natural. Star Wars and Adventure Time associations are both positive. Might feel too casual for enterprise deployment.',
    group: 'other',
  },
  {
    name: 'Sage',
    origin: 'Wisdom + an actual herb — perfect for cannabis',
    vibe: 'Wise, herbal, grounded',
    chatMessage: "Here is my take on your Q1 performance: revenue is up 18% but you are leaving margin on the table with your discount strategy. Let me show you a smarter approach.",
    scores: { natural: 7, memorable: 9, professional: 8 },
    isFrontrunner: false,
    expandedNotes: 'Sage is thematically perfect for cannabis retail — it is both "wise advisor" and an actual herb. The double meaning is elegant. Risk: might feel too on-the-nose for a cannabis company. Also a popular baby name right now, which could cause confusion.',
    group: 'other',
  },
  {
    name: 'Rue',
    origin: 'An aromatic herb — also means "to reflect on"',
    vibe: 'Contemplative, herbal, elegant',
    chatMessage: "Looking back at your February numbers, there is a clear pattern: your weekend staff needs different product knowledge training than weekday staff. The upsell gaps are very different.",
    scores: { natural: 6, memorable: 7, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Rue has a literary, contemplative quality. The herb connection works for cannabis. Concern: "rue" means regret in common usage, which is not ideal. Hunger Games character Rue adds emotional weight.',
    group: 'other',
  },
  {
    name: 'Kit',
    origin: 'A toolkit, a helper, a collection of useful things',
    vibe: 'Helpful, practical, complete',
    chatMessage: "I have put together your daily kit: 3 items need reordering, 1 compliance deadline this week, and your best-performing budtender deserves a shoutout.",
    scores: { natural: 8, memorable: 7, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Kit is wonderfully functional — it implies having everything you need. "My kit" or "ask Kit" both work. Knight Rider association (KITT) adds a helpful AI precedent. Might feel too utilitarian for some.',
    group: 'other',
  },
  {
    name: 'Pip',
    origin: 'Small but mighty — a seed, a beginning, a signal',
    vibe: 'Energetic, small-but-mighty, cheerful',
    chatMessage: "Small thing that could be big: your Google reviews dropped from 4.8 to 4.6 this month. I found 3 recent negative reviews about wait times. Want to see them?",
    scores: { natural: 7, memorable: 8, professional: 5 },
    isFrontrunner: false,
    expandedNotes: 'Pip is charming and distinctive. The seed connection is perfect for growth narratives. Great Expectations adds literary depth. Risk: might sound too cute for serious business analytics. Works better for small/indie dispensaries.',
    group: 'other',
  },
  {
    name: 'Rye',
    origin: 'A grain, earthy and real — cannabis-adjacent in vibe',
    vibe: 'Earthy, honest, grounded',
    chatMessage: "Keeping it real: your margins on pre-rolls have been sliding for 3 weeks. The main culprit is your supplier cost on the Sativa blend. Want me to pull competitor pricing?",
    scores: { natural: 7, memorable: 7, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Rye has a down-to-earth, honest quality that fits cannabis culture well. The grain/earth connection feels authentic. Catcher in the Rye adds cultural depth. Might not stand out enough in a crowded field.',
    group: 'other',
  },
  {
    name: 'Ash',
    origin: 'A tree, remains of fire — strong, simple, elemental',
    vibe: 'Strong, simple, direct',
    chatMessage: "Straight to it: you had your best Tuesday ever yesterday. Revenue up 28%. The driver was your new loyalty tier launch. Here is what to double down on.",
    scores: { natural: 8, memorable: 8, professional: 7 },
    isFrontrunner: false,
    expandedNotes: 'Ash is strong and elemental. The tree connection works for cannabis. Pokemon association is overwhelmingly positive for millennials. Concern: "ash" can connote destruction/endings, which might not be the vibe for a growth-oriented tool.',
    group: 'other',
  },
];

/* ─── Top 5 Alternatives Data ─── */
const TOP_5_ALTERNATIVES = [
  {
    name: 'Lex',
    tagline: 'The Brains',
    personality: 'Lex is the smartest person in the room and knows it, but is never arrogant about it. Think of a brilliant analyst who genuinely enjoys explaining things to you. Lex speaks with precision and backs everything with data.',
    pros: ['Lexicon connection is perfect for a data agent', 'Sounds authoritative and trustworthy', 'Gender-neutral and culturally flexible', 'Works in formal and informal contexts'],
    cons: ['Lex Luthor is a villain association', 'Phonetically close to "Alexa" which could cause confusion', 'Might feel cold to users who want warmth'],
    firstImpression: 'Smart. Probably knows more than me. I trust this.',
    hundredthTime: 'Still feels crisp. "Hey Lex" never gets old.',
    chatExample: { sender: 'You', agentResponse: 'Your pricing is 8% above market on flower. Based on elasticity data, a 5% reduction would likely increase volume by 12%, netting you an additional $2,400/week.' },
  },
  {
    name: 'Finn',
    tagline: 'The Friend',
    personality: 'Finn is the coworker who makes your day better. Always upbeat, always finding something interesting in the data, always framing things as opportunities rather than problems. Finn makes business analytics feel like an adventure.',
    pros: ['Extremely natural in conversation', 'Universally likable associations', 'Perfect balance of casual and competent', 'Easy to say, easy to spell'],
    cons: ['Might feel too casual for enterprise', 'Very common name — less distinctive', 'Adventure Time / Star Wars could dominate associations'],
    firstImpression: 'Friendly! This feels easy to talk to.',
    hundredthTime: 'Like talking to a buddy. Never annoying.',
    chatExample: { sender: 'You', agentResponse: 'Ooh, interesting find today: customers who visit on Mondays spend 22% more per ticket than Friday shoppers. I think it is because Monday customers are more intentional. Want to explore this?' },
  },
  {
    name: 'Cal',
    tagline: 'The Professional',
    personality: 'Cal is the reliable senior analyst you always wanted on your team. Not flashy, never wrong, always prepared. Cal does not waste words and respects your time. When Cal says something matters, it matters.',
    pros: ['Calculate/calibrate connections are perfect', 'Sounds competent and reliable', 'Works perfectly in professional settings', 'Nobody has a negative Cal association'],
    cons: ['Might feel too plain for brand differentiation', 'Lacks the spark that makes people excited', 'Could blend into the background'],
    firstImpression: 'Solid. Professional. I can rely on this.',
    hundredthTime: 'Comfortable. Like a well-worn tool. Never distracting.',
    chatExample: { sender: 'You', agentResponse: 'Three items require attention today: Blue Dream hits reorder threshold by end of day, your Thursday compliance filing is due, and last week\'s promotion underperformed target by 15%. Shall I prioritize?' },
  },
  {
    name: 'Sage',
    tagline: 'The Advisor',
    personality: 'Sage is the wise mentor who has seen it all. Patient, knowledgeable, and always offering perspective rather than just data. Sage connects the dots between what is happening now and what it means for the future. The herb connection makes it feel native to cannabis.',
    pros: ['Wisdom + herb double meaning is perfect', 'Feels native to cannabis industry', 'Implies deep knowledge, not just data', 'Elegant and distinctive'],
    cons: ['Too on-the-nose for cannabis?', 'Popular baby name — could cause confusion', 'Might feel pretentious to some users'],
    firstImpression: 'This knows things. The cannabis connection is clever.',
    hundredthTime: 'Feels important every time. Might be slightly heavy.',
    chatExample: { sender: 'You', agentResponse: 'Here is the bigger picture: your store is transitioning from a flower-dominant shop to a wellness destination. Edibles are up 34%, topicals up 28%. I would recommend leaning into this shift with your next marketing push.' },
  },
  {
    name: 'Ash',
    tagline: 'The Direct One',
    personality: 'Ash does not do fluff. Short sentences, clear recommendations, no hedging. If something is wrong, Ash tells you. If something is great, Ash says so and moves on. The most no-nonsense option on the list.',
    pros: ['Strong and elemental feel', 'Pokemon association is overwhelmingly positive', 'Works for cannabis (tree, earth, natural)', 'Direct communication style stands out'],
    cons: ['Ash can connote destruction/endings', 'Might feel too blunt for some users', 'Less warm than other options'],
    firstImpression: 'Bold. This is going to be direct with me.',
    hundredthTime: 'Efficient. I know what I am getting. Never annoyed.',
    chatExample: { sender: 'You', agentResponse: 'Your margins dropped 3 points this week. Cause: you over-discounted the weekend sale by 10%. Fix: cap future discounts at 15%. Your top seller is fine. Focus on the bottom 5 SKUs dragging you down.' },
  },
];

/* ─── Dex Voice Samples ─── */
const DEX_VOICE_SAMPLES = {
  casual: [
    { user: "Dex, what's selling today?", agent: "Blue Dream is having a moment — up 23% this week. Sour Diesel is right behind it. Your edibles are quiet though, might be worth a shelf refresh." },
    { user: "Anything I should worry about?", agent: "Nothing urgent. Your afternoon budtender called out sick, so you might want to shuffle the schedule. Other than that, you're cruising." },
  ],
  professional: [
    { user: "Dex, generate the monthly report.", agent: "Here's your March report. Revenue: $148,200 (+12% MoM). Top category: Flower at 44% of sales. Key insight: your loyalty program members spend 2.8x more than walk-ins. Full breakdown attached." },
    { user: "What's our compliance status?", agent: "All clear. Your monthly METRC reconciliation is due March 28th. I've pre-filled the data — you'll need to review and submit. Three product labels need updating for the new state requirements effective April 1st." },
  ],
  alert: [
    { user: null, agent: "Heads up — your OG Kush inventory hits reorder level tomorrow at current sell-through rates. Want me to draft the PO?" },
    { user: null, agent: "Unusual activity: your downtown location just processed a $0 transaction. Might be a training mode left on, but worth checking." },
  ],
  celebratory: [
    { user: null, agent: "Nice! You just hit your best Wednesday ever. Revenue was $8,420, beating the previous record by 11%. Your new budtender Sarah crushed it with a 34% upsell rate." },
  ],
};

/* ─── Dex Associations Data ─── */
const DEX_ASSOCIATIONS = [
  { term: 'Dexterity', context: 'Nimble, skillful — perfect for an agent that handles data nimbly', sentiment: 'positive' },
  { term: 'Dexter (TV show)', context: 'A genius with a dark side — memorable, but violent connotations', sentiment: 'mixed' },
  { term: 'Dexter\'s Lab', context: 'Brilliant kid inventor — playful, smart, very positive', sentiment: 'positive' },
  { term: 'Index', context: 'Organization, finding things — aligns perfectly with agent function', sentiment: 'positive' },
  { term: 'Pokedex', context: 'An encyclopedia of knowledge — great association for a data agent', sentiment: 'positive' },
  { term: 'Dextrose', context: 'Sugar, energy — neutral, unlikely to come to mind', sentiment: 'neutral' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export function DNameExplorationSection({ theme = 'dark' }) {
  const t = themes[theme];
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [personalitySlider, setPersonalitySlider] = useState(7);
  const [selectedVoiceTab, setSelectedVoiceTab] = useState('casual');
  const [selectedAltIndex, setSelectedAltIndex] = useState(0);

  const dNames = useMemo(() => CANDIDATES.filter(c => c.group === 'D-name'), []);
  const otherNames = useMemo(() => CANDIDATES.filter(c => c.group === 'other'), []);

  /* ─── Shared Styles ─── */
  const sectionGap = { marginBottom: 80 };
  const cardStyle = {
    background: t.cardBg,
    borderRadius: 16,
    padding: 32,
    border: `1px solid ${t.border}`,
  };
  const sectionLabel = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 12,
    fontWeight: 700,
    color: t.accentGold,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: 12,
  };
  const sectionTitle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 36,
    fontWeight: 700,
    color: t.text,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: 16,
  };
  const bodyText = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 15,
    color: t.textMuted,
    lineHeight: 1.8,
    maxWidth: 680,
  };
  const divider = {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
    margin: '80px 0',
  };

  return (
    <div style={{
      background: t.bg,
      color: t.text,
      fontFamily: 'DM Sans, sans-serif',
      padding: '80px 40px',
      maxWidth: 1200,
      margin: '0 auto',
    }}>

      {/* ═══════════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ textAlign: 'center', marginBottom: 100 }}>
        <div style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          color: t.accentGold,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          background: `${t.accentGold}10`,
          border: `1px solid ${t.accentGold}25`,
          borderRadius: 20,
          padding: '6px 20px',
          marginBottom: 24,
        }}>
          Agent Identity
        </div>
        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 52,
          fontWeight: 800,
          color: t.text,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          What Do You Name the Thing<br />
          People <span style={{ color: t.accentGold }}>Talk To</span>?
        </h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18,
          color: t.textMuted,
          lineHeight: 1.7,
          maxWidth: 620,
          margin: '0 auto',
        }}>
          The other products are tools. The agent is a companion. It lives in chat
          bubbles, answers questions, and builds a relationship with every user.
          It is the only product that needs a human-ish name.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: WHY THE AGENT GETS A NAME
          ═══════════════════════════════════════════════════════════════ */}
      <div style={sectionGap}>
        <div style={sectionLabel}>Section 1</div>
        <h2 style={sectionTitle}>Why the Agent Gets a Name</h2>
        <p style={{ ...bodyText, marginBottom: 40 }}>
          The POS does not need a name. The analytics dashboard does not need a name.
          The compliance module does not need a name. They are tools — you click them,
          they do things, you move on. But the AI agent is fundamentally different.
        </p>

        {/* Four reasons grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}>
          {[
            {
              icon: '💬',
              title: 'People literally talk to it',
              desc: '"Hey ___, what sold best today?" You cannot have a conversation with a product called "Analytics Module v3."',
            },
            {
              icon: '🔔',
              title: 'It shows up everywhere',
              desc: 'Chat bubbles, push notifications, voice responses, email digests. The name appears hundreds of times per day.',
            },
            {
              icon: '🎭',
              title: 'It needs personality',
              desc: 'A tool can be sterile. An agent that helps you run your store needs warmth, reliability, and a voice you trust.',
            },
            {
              icon: '🤝',
              title: 'It is a companion, not a feature',
              desc: 'Users build a relationship with it over months. That relationship needs a name to anchor to.',
            },
          ].map((item, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: 24,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: t.text,
                marginBottom: 8,
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.7,
              }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* The sweet spot explanation */}
        <div style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${t.cardBg}, ${t.accentGold}06)`,
          border: `1px solid ${t.accentGold}20`,
          marginBottom: 40,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            color: t.accentGold,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}>
            The Sweet Spot
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.4,
            marginBottom: 16,
          }}>
            Sounds like it <span style={{ color: t.accentGold }}>could</span> be a person's name,
            but you are not 100% sure.
          </div>
          <p style={{ ...bodyText, marginBottom: 24 }}>
            Think about it: "Alexa" before Amazon — is that a name? Could be. "Siri" — name-ish,
            but also kind of not? "Dex" — yeah, it could be a person, but it also sounds
            a little techy. That ambiguity is the sweet spot. It lets users project personality
            onto the agent without the uncanny valley of a clearly-human name like "Jennifer."
          </p>

          {/* Spectrum visualization */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 20,
            borderRadius: 12,
            background: `${t.text}05`,
          }}>
            <div style={{ fontSize: 12, color: t.textFaint, whiteSpace: 'nowrap', minWidth: 100 }}>
              Too Robotic
            </div>
            <div style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              background: `linear-gradient(90deg, ${t.textFaint}40, ${t.accentGold}40, ${t.accentGreen}40)`,
              position: 'relative',
            }}>
              {/* Markers */}
              {[
                { name: 'X-900', pos: 5 },
                { name: 'ChatBot', pos: 18 },
                { name: 'Siri', pos: 50 },
                { name: 'Dex', pos: 62, highlight: true },
                { name: 'Alexa', pos: 55 },
                { name: 'Drew', pos: 80 },
                { name: 'Jennifer', pos: 95 },
              ].map((m, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${m.pos}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <div style={{
                    fontSize: 9,
                    fontWeight: m.highlight ? 700 : 500,
                    color: m.highlight ? t.accentGold : t.textFaint,
                    marginBottom: 8,
                    whiteSpace: 'nowrap',
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    width: m.highlight ? 12 : 8,
                    height: m.highlight ? 12 : 8,
                    borderRadius: '50%',
                    background: m.highlight ? t.accentGold : t.textFaint,
                    boxShadow: m.highlight ? `0 0 10px ${t.accentGold}50` : 'none',
                  }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: t.textFaint, whiteSpace: 'nowrap', minWidth: 100, textAlign: 'right' }}>
              Too Human
            </div>
          </div>
        </div>

        {/* Agent chat mockup */}
        <div style={{
          ...cardStyle,
          maxWidth: 500,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: t.textFaint,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 20,
          }}>
            What this looks like in practice
          </div>
          <ChatBubble sender="You" message="What sold best today?" isAgent={false} t={t} />
          <ChatBubble
            sender="Dex"
            message="Blue Dream is your top seller today with 34 units. That's 18% above your daily average. Sour Diesel and OG Kush are rounding out the top 3. Want me to check if you need to reorder?"
            isAgent={true}
            t={t}
          />
          <ChatBubble sender="You" message="Yeah, check reorder levels" isAgent={false} t={t} />
          <ChatBubble
            sender="Dex"
            message="Blue Dream is fine — you have 4 days of stock. But heads up: OG Kush will hit your reorder point by Friday at current velocity. Want me to draft the PO?"
            isAgent={true}
            t={t}
          />
          <div style={{
            textAlign: 'center',
            fontSize: 12,
            color: t.textFaint,
            marginTop: 16,
            fontStyle: 'italic',
          }}>
            Natural, helpful, and it has a name you can call.
          </div>
        </div>
      </div>

      <div style={divider} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: 20 AGENT NAME CANDIDATES
          ═══════════════════════════════════════════════════════════════ */}
      <div style={sectionGap}>
        <div style={sectionLabel}>Section 2</div>
        <h2 style={sectionTitle}>20 Agent Name Candidates</h2>
        <p style={{ ...bodyText, marginBottom: 48 }}>
          We explored names that live in the sweet spot: they sound like they could be a person,
          but you are not sure. Each one is tested in a chat bubble, scored on three axes, and
          given a personality read. Click any card to expand.
        </p>

        {/* D-Names Subsection */}
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          fontWeight: 700,
          color: t.accentGold,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 20,
            height: 2,
            background: t.accentGold,
            borderRadius: 1,
          }} />
          D-Names — The Original Direction
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}>
          {dNames.map((c, i) => (
            <CandidateCard
              key={c.name + i}
              candidate={c}
              t={t}
              expanded={expandedCandidate === c.name}
              onToggle={() => setExpandedCandidate(expandedCandidate === c.name ? null : c.name)}
            />
          ))}
        </div>

        {/* Other Short Human-ish Names */}
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          fontWeight: 700,
          color: t.accentGold,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 20,
            height: 2,
            background: t.accentGold,
            borderRadius: 1,
          }} />
          Other Short Human-ish Names
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}>
          {otherNames.map((c, i) => (
            <CandidateCard
              key={c.name + i}
              candidate={c}
              t={t}
              expanded={expandedCandidate === c.name}
              onToggle={() => setExpandedCandidate(expandedCandidate === c.name ? null : c.name)}
            />
          ))}
        </div>

        {/* Summary stats */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 32,
        }}>
          {[
            { label: 'D-Names Explored', value: dNames.length },
            { label: 'Other Candidates', value: otherNames.length },
            { label: 'Total Evaluated', value: CANDIDATES.length },
            { label: 'Avg Natural Score', value: (CANDIDATES.reduce((s, c) => s + c.scores.natural, 0) / CANDIDATES.length).toFixed(1) },
            { label: 'Avg Memorable Score', value: (CANDIDATES.reduce((s, c) => s + c.scores.memorable, 0) / CANDIDATES.length).toFixed(1) },
          ].map((stat, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flex: '1 1 180px',
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 28,
                fontWeight: 800,
                color: t.accentGold,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                color: t.textMuted,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={divider} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: THE DEX DEEP DIVE
          ═══════════════════════════════════════════════════════════════ */}
      <div style={sectionGap}>
        <div style={sectionLabel}>Section 3</div>
        <h2 style={sectionTitle}>The Dex Deep Dive</h2>
        <p style={{ ...bodyText, marginBottom: 48 }}>
          Dex is the frontrunner. Before we commit, let us stress-test it from every angle:
          conversation, brand, personality, voice, and cultural associations.
        </p>

        {/* ─── Dex Wordmark Display ─── */}
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          padding: '60px 32px',
          background: `linear-gradient(180deg, ${t.cardBg}, ${t.accentGold}05)`,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 96,
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 8,
            textShadow: `0 0 80px ${t.accentGold}20`,
          }}>
            Dex
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: t.textFaint,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Your AI-Powered Retail Companion
          </div>

          {/* Wordmark Variations */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            marginTop: 48,
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'Bold', weight: 800, size: 48, spacing: '-0.03em' },
              { label: 'Light', weight: 300, size: 48, spacing: '0.02em' },
              { label: 'Caps', weight: 700, size: 40, spacing: '0.15em', transform: 'uppercase' },
              { label: 'Monospace Feel', weight: 600, size: 44, spacing: '0.08em' },
            ].map((variant, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: variant.size,
                  fontWeight: variant.weight,
                  color: t.text,
                  letterSpacing: variant.spacing,
                  textTransform: variant.transform || 'none',
                  marginBottom: 8,
                }}>
                  Dex
                </div>
                <div style={{ fontSize: 10, color: t.textFaint }}>{variant.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Dex in Conversation ─── */}
        <div style={{
          ...cardStyle,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            marginBottom: 8,
          }}>
            Dex in Conversation
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            marginBottom: 24,
          }}>
            How does Dex sound across different interaction types?
          </div>

          {/* Voice Tabs */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}>
            {[
              { key: 'casual', label: 'Casual' },
              { key: 'professional', label: 'Professional' },
              { key: 'alert', label: 'Proactive Alert' },
              { key: 'celebratory', label: 'Celebratory' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedVoiceTab(tab.key)}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: selectedVoiceTab === tab.key ? 700 : 500,
                  color: selectedVoiceTab === tab.key ? t.accentGold : t.textMuted,
                  background: selectedVoiceTab === tab.key ? `${t.accentGold}15` : 'transparent',
                  border: `1px solid ${selectedVoiceTab === tab.key ? t.accentGold + '30' : t.border}`,
                  borderRadius: 20,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Voice Content */}
          <div style={{
            background: `${t.text}04`,
            borderRadius: 12,
            padding: 24,
          }}>
            {DEX_VOICE_SAMPLES[selectedVoiceTab].map((sample, i) => (
              <div key={i} style={{ marginBottom: i < DEX_VOICE_SAMPLES[selectedVoiceTab].length - 1 ? 24 : 0 }}>
                {sample.user && (
                  <ChatBubble sender="You" message={sample.user} isAgent={false} t={t} />
                )}
                <ChatBubble sender="Dex" message={sample.agent} isAgent={true} t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Dex Personality Spectrum ─── */}
        <div style={{
          ...cardStyle,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            marginBottom: 8,
          }}>
            Dex Personality Spectrum
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            marginBottom: 32,
          }}>
            Where should Dex land on these personality dimensions? The gold dot represents our recommendation.
          </div>

          <PersonalitySlider leftLabel="Robotic Assistant" rightLabel="Friendly Coworker" value={7} t={t} />
          <PersonalitySlider leftLabel="Terse / Just Facts" rightLabel="Conversational / Explains" value={6.5} t={t} />
          <PersonalitySlider leftLabel="Reactive (waits for you)" rightLabel="Proactive (reaches out)" value={6} t={t} />
          <PersonalitySlider leftLabel="Formal Language" rightLabel="Casual Language" value={6} t={t} />
          <PersonalitySlider leftLabel="Data-First" rightLabel="Insight-First" value={7} t={t} />
          <PersonalitySlider leftLabel="Humble / Uncertain" rightLabel="Confident / Opinionated" value={7.5} t={t} />

          <div style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 10,
            background: `${t.accentGold}08`,
            border: `1px solid ${t.accentGold}18`,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: t.accentGold,
              marginBottom: 8,
            }}>
              Recommended Position
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.7,
            }}>
              Dex should feel like a <strong style={{ color: t.text }}>confident, knowledgeable coworker</strong> who
              genuinely cares about helping you succeed. Not a butler. Not a robot. Think: the smartest
              person on your team who also happens to be approachable and never condescending. Dex has
              opinions and shares them, but always explains the reasoning. Dex is proactive enough to
              flag important things but not so aggressive that it feels nagging.
            </div>
          </div>
        </div>

        {/* ─── Dex Voice Examples ─── */}
        <div style={{
          ...cardStyle,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            marginBottom: 8,
          }}>
            How Dex Writes
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            marginBottom: 24,
          }}>
            The voice guide for consistent Dex communication across all contexts.
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {[
              {
                context: 'Push Notification',
                example: 'OG Kush hits reorder level tomorrow. Tap to review.',
                note: 'Short, direct, actionable. No fluff in notifications.',
              },
              {
                context: 'Daily Digest Email',
                example: 'Good morning. Yesterday was solid: $6,200 revenue, up 8% from last Tuesday. One thing to watch: your Sativa category is softening. Details inside.',
                note: 'Conversational but efficient. Leads with the headline.',
              },
              {
                context: 'In-App Chat',
                example: 'I have been looking at your weekend patterns. Saturdays between 2-4pm are your weakest window. Historically, a flash deal on concentrates during that slot lifts revenue 15-20%. Want me to set one up?',
                note: 'Full sentences, explains reasoning, offers to act.',
              },
              {
                context: 'Error / Warning',
                example: 'Something looks off: your downtown register processed a $0 transaction at 3:42pm. Could be training mode left on. Worth a quick check.',
                note: 'Does not panic. States what happened, suggests the most likely explanation, recommends action.',
              },
              {
                context: 'Celebration',
                example: 'You just hit your best Wednesday ever! $8,420 revenue, beating your previous record by 11%. Sarah was your MVP with a 34% upsell rate.',
                note: 'Genuine enthusiasm. Credits the team. Specific numbers.',
              },
              {
                context: 'Compliance Reminder',
                example: 'Your METRC reconciliation is due March 28th. I have pre-filled the data. You will need about 15 minutes to review and submit. Want to schedule a reminder?',
                note: 'Helpful, not scary. Estimates time commitment. Offers to help.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 20,
                borderRadius: 12,
                background: `${t.text}04`,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.accentGold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 10,
                }}>
                  {item.context}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  color: t.text,
                  lineHeight: 1.6,
                  marginBottom: 12,
                  fontStyle: 'italic',
                }}>
                  "{item.example}"
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  color: t.textFaint,
                  lineHeight: 1.6,
                }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Dex Associations ─── */}
        <div style={{
          ...cardStyle,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            marginBottom: 8,
          }}>
            "Dex" Associations
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            marginBottom: 24,
          }}>
            What comes to mind when people hear "Dex"? And is that good or bad for us?
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}>
            {DEX_ASSOCIATIONS.map((assoc, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: 16,
                borderRadius: 10,
                background: `${t.text}04`,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  marginTop: 5,
                  flexShrink: 0,
                  background: assoc.sentiment === 'positive'
                    ? t.accentGreen
                    : assoc.sentiment === 'mixed'
                      ? t.accentGoldLight
                      : t.textFaint,
                }} />
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 4,
                  }}>
                    {assoc.term}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 12,
                    color: t.textMuted,
                    lineHeight: 1.6,
                  }}>
                    {assoc.context}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            display: 'flex',
            gap: 16,
            fontSize: 11,
            color: t.textFaint,
            fontFamily: 'DM Sans, sans-serif',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.accentGreen }} />
              Positive
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.accentGoldLight }} />
              Mixed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.textFaint }} />
              Neutral
            </div>
          </div>

          <div style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 10,
            background: `${t.accentGreen}08`,
            border: `1px solid ${t.accentGreen}20`,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            lineHeight: 1.7,
          }}>
            <strong style={{ color: t.accentGreen }}>Verdict on associations:</strong> Overwhelmingly
            positive. The only concern is Dexter the TV show (serial killer), but "Dex" is far enough
            removed that it is unlikely to trigger that association unprompted. Dexter's Lab, Pokedex,
            and dexterity are all strong positive connections. The index connection is perfect for a
            data-centric agent.
          </div>
        </div>
      </div>

      <div style={divider} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: TOP 5 ALTERNATIVES TO DEX
          ═══════════════════════════════════════════════════════════════ */}
      <div style={sectionGap}>
        <div style={sectionLabel}>Section 4</div>
        <h2 style={sectionTitle}>Top 5 Alternatives to Dex</h2>
        <p style={{ ...bodyText, marginBottom: 48 }}>
          If not Dex, then what? Here are the five strongest alternatives, each explored
          in detail with chat mockups, personality descriptions, and the two tests that matter
          most: first impression and 100th repetition.
        </p>

        {/* Alternative Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          overflowX: 'auto',
          paddingBottom: 8,
        }}>
          {TOP_5_ALTERNATIVES.map((alt, i) => (
            <button
              key={alt.name}
              onClick={() => setSelectedAltIndex(i)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 15,
                fontWeight: selectedAltIndex === i ? 700 : 500,
                color: selectedAltIndex === i ? t.accentGold : t.textMuted,
                background: selectedAltIndex === i ? `${t.accentGold}12` : 'transparent',
                border: `1px solid ${selectedAltIndex === i ? t.accentGold + '35' : t.border}`,
                borderRadius: 12,
                padding: '12px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {alt.name}
              <span style={{
                fontSize: 11,
                color: selectedAltIndex === i ? t.accentGold + 'AA' : t.textFaint,
                marginLeft: 8,
              }}>
                {alt.tagline}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Alternative Detail */}
        {(() => {
          const alt = TOP_5_ALTERNATIVES[selectedAltIndex];
          return (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}>
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Name + Personality */}
                <div style={cardStyle}>
                  <Wordmark name={alt.name} size={56} t={t} isHighlighted={true} />
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    color: t.textMuted,
                    marginTop: 4,
                    marginBottom: 20,
                  }}>
                    {alt.tagline}
                  </div>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    color: t.textMuted,
                    lineHeight: 1.8,
                  }}>
                    {alt.personality}
                  </p>
                </div>

                {/* Chat Mockup */}
                <div style={cardStyle}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    color: t.textFaint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 16,
                  }}>
                    Chat Mockup
                  </div>
                  <ChatBubble sender="You" message="How are things looking today?" isAgent={false} t={t} />
                  <ChatBubble sender={alt.name} message={alt.chatExample.agentResponse} isAgent={true} t={t} />
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Pros & Cons */}
                <div style={cardStyle}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 16,
                  }}>
                    Pros & Cons
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    {alt.pros.map((pro, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        marginBottom: 8,
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 13,
                        color: t.textMuted,
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: t.accentGreen, flexShrink: 0, marginTop: 2 }}>+</span>
                        {pro}
                      </div>
                    ))}
                  </div>
                  <div>
                    {alt.cons.map((con, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        marginBottom: 8,
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 13,
                        color: t.textMuted,
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: '#E05252', flexShrink: 0, marginTop: 2 }}>-</span>
                        {con}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impression Tests */}
                <div style={cardStyle}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 16,
                  }}>
                    The Repetition Tests
                  </div>

                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    background: `${t.text}04`,
                    marginBottom: 12,
                  }}>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: t.accentGold,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8,
                    }}>
                      First Impression Test
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 13,
                      color: t.textMuted,
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}>
                      "{alt.firstImpression}"
                    </div>
                  </div>

                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    background: `${t.text}04`,
                  }}>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: t.accentGold,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8,
                    }}>
                      100th Time Test
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 13,
                      color: t.textMuted,
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}>
                      "{alt.hundredthTime}"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Comparison matrix */}
        <div style={{
          ...cardStyle,
          marginTop: 32,
          overflowX: 'auto',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: t.text,
            marginBottom: 20,
          }}>
            Head-to-Head Comparison
          </div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          }}>
            <thead>
              <tr>
                {['Name', 'Natural', 'Memorable', 'Professional', 'First Feel', 'Fatigue Risk'].map(header => (
                  <th key={header} style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    borderBottom: `1px solid ${t.border}`,
                    color: t.textFaint,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Dex', natural: 9, mem: 9, prof: 8, feel: 'Sharp & modern', fatigue: 'Low' },
                ...TOP_5_ALTERNATIVES.map(a => {
                  const cand = CANDIDATES.find(c => c.name === a.name);
                  return {
                    name: a.name,
                    natural: cand ? cand.scores.natural : '-',
                    mem: cand ? cand.scores.memorable : '-',
                    prof: cand ? cand.scores.professional : '-',
                    feel: a.tagline,
                    fatigue: a.name === 'Finn' || a.name === 'Cal' ? 'Very Low' : 'Low',
                  };
                }),
              ].map((row, i) => (
                <tr key={row.name} style={{
                  background: i === 0 ? `${t.accentGold}08` : 'transparent',
                }}>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${t.border}`,
                    fontWeight: i === 0 ? 700 : 500,
                    color: i === 0 ? t.accentGold : t.text,
                  }}>
                    {row.name} {i === 0 ? '(frontrunner)' : ''}
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, color: t.textMuted }}>
                    {row.natural}/10
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, color: t.textMuted }}>
                    {row.mem}/10
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, color: t.textMuted }}>
                    {row.prof}/10
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, color: t.textMuted }}>
                    {row.feel}
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, color: t.textMuted }}>
                    {row.fatigue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={divider} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: THE VERDICT
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 40 }}>
        <div style={sectionLabel}>Section 5</div>
        <h2 style={sectionTitle}>The Verdict</h2>

        {/* Confidence meter */}
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          padding: '48px 32px',
          background: `linear-gradient(180deg, ${t.cardBg}, ${t.accentGold}08)`,
          border: `1px solid ${t.accentGold}25`,
          marginBottom: 32,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: t.accentGold,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 16,
          }}>
            Final Recommendation
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 80,
            fontWeight: 800,
            color: t.accentGold,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 8,
            textShadow: `0 0 60px ${t.accentGold}25`,
          }}>
            Dex
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 16,
            color: t.textMuted,
            marginBottom: 32,
          }}>
            The AI agent should be called <strong style={{ color: t.text }}>Dex</strong>.
          </div>

          {/* Confidence bar */}
          <div style={{
            maxWidth: 400,
            margin: '0 auto',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: t.textMuted,
            }}>
              <span>Confidence Level</span>
              <span style={{ color: t.accentGold, fontWeight: 700 }}>87%</span>
            </div>
            <div style={{
              height: 10,
              borderRadius: 5,
              background: `${t.text}0A`,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: '87%',
                borderRadius: 5,
                background: `linear-gradient(90deg, ${t.accentGold}, ${t.accentGoldLight})`,
                boxShadow: `0 0 20px ${t.accentGold}30`,
              }} />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              color: t.textFaint,
              marginTop: 6,
            }}>
              High confidence — Dex is clearly the strongest option, though Lex is a legitimate alternative.
            </div>
          </div>
        </div>

        {/* Why Dex Wins */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32,
        }}>
          <div style={cardStyle}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: t.accentGreen,
              marginBottom: 16,
            }}>
              Why Dex Wins
            </div>
            {[
              'Highest combined score across Natural + Memorable + Professional',
              '"Hey Dex" is fast, easy, and feels natural in conversation',
              'The dexterity connection adds real meaning — this agent is nimble with data',
              'Sits perfectly in the "could be a person, could be tech" sweet spot',
              'Single syllable keeps it efficient in daily use',
              'Cultural associations (Pokedex, Dexter\'s Lab) are overwhelmingly positive',
              'Works in casual, professional, and alert contexts equally well',
              'D-prefix ties it back to Dutchie without being forced',
            ].map((point, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                marginBottom: 10,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.6,
              }}>
                <span style={{
                  color: t.accentGreen,
                  fontSize: 16,
                  flexShrink: 0,
                  lineHeight: 1.3,
                }}>+</span>
                {point}
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: t.textMuted,
              marginBottom: 16,
            }}>
              What Gives Us Pause
            </div>
            {[
              'Dexter (the TV show about a serial killer) is a known association, though "Dex" is sufficiently different',
              'It is not the most unique name in the world — someone else could use it',
              'Lacks the thematic cannabis connection that "Sage" or "Rye" would offer',
            ].map((point, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                marginBottom: 10,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: t.textMuted,
                lineHeight: 1.6,
              }}>
                <span style={{
                  color: '#E05252',
                  fontSize: 16,
                  flexShrink: 0,
                  lineHeight: 1.3,
                }}>-</span>
                {point}
              </div>
            ))}

            <div style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 10,
              background: `${t.text}04`,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textFaint,
              lineHeight: 1.7,
            }}>
              None of these concerns are dealbreakers. The Dexter association fades quickly once users
              form their own relationship with Dex. The uniqueness concern is mitigated by the
              Dutchie brand context. And the cannabis thematic angle is nice-to-have, not essential.
            </div>
          </div>
        </div>

        {/* Runner Up */}
        <div style={{
          ...cardStyle,
          marginBottom: 32,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: t.textFaint,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: `${t.text}08`,
              borderRadius: 20,
              padding: '4px 14px',
            }}>
              Runner-Up
            </div>
            <Wordmark name="Lex" size={36} t={t} isHighlighted={false} />
          </div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: t.textMuted,
            lineHeight: 1.8,
            marginBottom: 16,
          }}>
            Lex is the strongest alternative and would be the recommendation if Dex did not exist.
            The lexicon connection is perfect, it sounds authoritative and smart, and it works in
            every context. The two main reasons it falls behind Dex:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}>
            <div style={{
              padding: 16,
              borderRadius: 10,
              background: `${t.text}04`,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: t.text }}>1. Lex Luthor association.</strong> The most famous
              "Lex" in pop culture is a supervillain. While not fatal, it is a headwind that Dex
              does not have.
            </div>
            <div style={{
              padding: 16,
              borderRadius: 10,
              background: `${t.text}04`,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: t.textMuted,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: t.text }}>2. Alexa proximity.</strong> "Lex" is phonetically
              close to "Alexa," which creates confusion risk and comparison to Amazon's assistant.
              Dex is more distinct in the AI assistant landscape.
            </div>
          </div>

          <div style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 10,
            background: `${t.accentGold}08`,
            border: `1px solid ${t.accentGold}18`,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: t.textMuted,
            lineHeight: 1.7,
          }}>
            <strong style={{ color: t.accentGold }}>When to choose Lex instead:</strong> If user
            research reveals that "Dex" triggers the Dexter TV show association more strongly than
            expected, or if the team wants a slightly more authoritative, data-analyst personality
            rather than the friendly-coworker vibe.
          </div>
        </div>

        {/* Recommended Personality */}
        <div style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${t.cardBg}, ${t.accentGold}06)`,
          border: `1px solid ${t.accentGold}20`,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: t.accentGold,
            marginBottom: 20,
          }}>
            Recommended Personality & Voice for Dex
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
            marginBottom: 24,
          }}>
            {[
              {
                trait: 'Tone',
                value: 'Confident but never arrogant. Think "smart coworker" not "all-knowing oracle."',
              },
              {
                trait: 'Humor',
                value: 'Dry, occasional, and always secondary to usefulness. A well-placed observation, never a joke for the sake of it.',
              },
              {
                trait: 'Formality',
                value: 'Business casual. Uses contractions. Avoids jargon unless the user uses it first. Never says "Hello, I am Dex, your AI assistant."',
              },
              {
                trait: 'Proactivity',
                value: 'Flags important things without being asked. Does not over-notify. Each alert should feel like it was worth the interruption.',
              },
              {
                trait: 'Opinions',
                value: 'Has them. Shares them. Always backs them up with data. "I would recommend X because Y" rather than "here are some options."',
              },
              {
                trait: 'Mistakes',
                value: 'Acknowledges them directly. "I was wrong about that — here is the correct number." No corporate hedging or blame-shifting.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 20,
                borderRadius: 12,
                background: `${t.text}04`,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: t.accentGold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}>
                  {item.trait}
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  color: t.textMuted,
                  lineHeight: 1.7,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Final chat */}
          <div style={{
            padding: 24,
            borderRadius: 12,
            background: `${t.text}04`,
            border: `1px solid ${t.border}`,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: t.textFaint,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 20,
            }}>
              This is what Dex sounds like
            </div>
            <ChatBubble
              sender="You"
              message="Dex, how did we do this week?"
              isAgent={false}
              t={t}
            />
            <ChatBubble
              sender="Dex"
              message="Good week. Revenue was $42,100, up 7% from last week. Your flower category carried the load — Blue Dream alone was 12% of sales. One thing I would flag: your edibles margin dropped 2 points because of the Thursday promotion. It drove traffic but ate into profit. I would suggest a smaller discount next time — 15% instead of 25% — and see if the traffic holds."
              isAgent={true}
              t={t}
            />
            <ChatBubble
              sender="You"
              message="Makes sense. Set that up for next Thursday."
              isAgent={false}
              t={t}
            />
            <ChatBubble
              sender="Dex"
              message="Done. 15% off edibles, Thursday only, same time window as last week. I will ping you Wednesday night with a reminder and the current inventory levels so you are prepared."
              isAgent={true}
              t={t}
            />
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: 32,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: t.textFaint,
            fontStyle: 'italic',
          }}>
            Dex: sharp, helpful, opinionated, and always backed by data.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DNameExplorationSection;
