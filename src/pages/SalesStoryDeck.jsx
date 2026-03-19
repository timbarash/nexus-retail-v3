import React, { useState } from 'react';

// ============================================================================
// SalesStoryDeck — Sales enablement deck built around buyer psychology
//
// This is NOT a product architecture slide. This is what the buyer needs to
// hear, in the order they need to hear it. Built from 500+ dispensary sales
// calls. Structure follows the buyer's mental model, not Dutchie's org chart.
//
// Export: SalesStoryDeck({ theme = 'dark' })
// ============================================================================

const themes = {
  dark: {
    bg: '#0A0908',
    cardBg: '#141210',
    cardBgAlt: '#1A1816',
    border: '#282724',
    text: '#F0EDE8',
    textMuted: '#ADA599',
    textFaint: '#6B6359',
    accentGold: '#D4A03A',
    accentGoldLight: '#FFC02A',
    accentGreen: '#00C27C',
    accentRed: '#E87068',
    accentBlue: '#64A8E0',
    accentPurple: '#B598E8',
    slideBg: '#1B3D2F',
    slideBgDeep: '#142E23',
    slideSurface: 'rgba(255,255,255,0.06)',
    slideSurfaceStrong: 'rgba(255,255,255,0.10)',
    slideText: '#F0EDE8',
    slideTextMuted: 'rgba(240,237,232,0.65)',
    slideTextFaint: 'rgba(240,237,232,0.35)',
    painBg: 'rgba(232,112,104,0.08)',
    painBorder: 'rgba(232,112,104,0.25)',
    solutionBg: 'rgba(0,194,124,0.08)',
    solutionBorder: 'rgba(0,194,124,0.25)',
    competitorBg: 'rgba(255,255,255,0.03)',
    dutchieBg: 'rgba(0,194,124,0.06)',
  },
  light: {
    bg: '#F5F4F2',
    cardBg: '#FAFAF9',
    cardBgAlt: '#F0EFED',
    border: '#E8E5E0',
    text: '#1C1917',
    textMuted: '#57534E',
    textFaint: '#A8A29E',
    accentGold: '#A17A1A',
    accentGoldLight: '#C49A2A',
    accentGreen: '#047857',
    accentRed: '#DC2626',
    accentBlue: '#2563EB',
    accentPurple: '#7C3AED',
    slideBg: '#1B3D2F',
    slideBgDeep: '#142E23',
    slideSurface: 'rgba(255,255,255,0.08)',
    slideSurfaceStrong: 'rgba(255,255,255,0.12)',
    slideText: '#F0EDE8',
    slideTextMuted: 'rgba(240,237,232,0.65)',
    slideTextFaint: 'rgba(240,237,232,0.35)',
    painBg: 'rgba(220,38,38,0.06)',
    painBorder: 'rgba(220,38,38,0.20)',
    solutionBg: 'rgba(4,120,87,0.06)',
    solutionBorder: 'rgba(4,120,87,0.20)',
    competitorBg: 'rgba(0,0,0,0.02)',
    dutchieBg: 'rgba(4,120,87,0.06)',
  }
};

// ============================================================================
// Shared sub-components
// ============================================================================

function SectionHeader({ label, title, subtitle, t }) {
  return (
    <div style={{ marginBottom: 40, textAlign: 'center' }}>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: t.accentGold, marginBottom: 12,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>
      <h2 style={{
        fontSize: 28, fontWeight: 300, color: t.text, marginBottom: 12,
        letterSpacing: '-0.01em', lineHeight: 1.3,
        fontFamily: "'DM Sans', sans-serif", margin: 0,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: 14, color: t.textMuted, lineHeight: 1.7,
          maxWidth: 560, margin: '12px auto 0',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ScriptBlock({ title, script, t }) {
  return (
    <div style={{
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderLeft: `4px solid ${t.accentGold}`,
      borderRadius: 12,
      padding: '24px 28px',
      marginBottom: 24,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: t.accentGold, marginBottom: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {title}
      </div>
      <div style={{
        fontSize: 14, color: t.textMuted, lineHeight: 1.8,
        fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic',
      }}>
        {script}
      </div>
    </div>
  );
}

function SlideFrame({ children, label }) {
  return (
    <div style={{ marginBottom: 8 }}>
      {label && (
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)',
          textAlign: 'right', marginBottom: 6,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {label}
        </div>
      )}
      <div style={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #1E4535 0%, #1B3D2F 35%, #173628 70%, #142E23 100%)',
        position: 'relative',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}>
        {/* Subtle texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(30,69,53,0.5) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          padding: '5% 6%',
          boxSizing: 'border-box',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function DexBadge({ size = 'sm' }) {
  const s = size === 'sm' ? 18 : size === 'md' ? 24 : 32;
  const fs = size === 'sm' ? 9 : size === 'md' ? 11 : 14;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: size === 'sm' ? 4 : 6,
      background: 'linear-gradient(135deg, rgba(212,160,58,0.15), rgba(255,192,42,0.10))',
      border: '1px solid rgba(212,160,58,0.3)',
      borderRadius: 100, padding: size === 'sm' ? '2px 8px 2px 4px' : '4px 12px 4px 6px',
    }}>
      <span style={{
        width: s, height: s, borderRadius: '50%',
        background: 'linear-gradient(135deg, #D4A03A, #FFC02A)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: fs, fontWeight: 800, color: '#0A0908',
      }}>D</span>
      <span style={{
        fontSize: fs, fontWeight: 600, color: '#FFC02A',
        letterSpacing: '0.03em',
      }}>Dex</span>
    </span>
  );
}


// ============================================================================
// PART 1: What Dispensary Operators Actually Care About
// ============================================================================

function BuyerPriorities({ t }) {
  const priorities = [
    {
      rank: 1,
      question: '"Will this keep me compliant?"',
      detail: 'METRC/BioTrack integration, automated seed-to-sale tracking, real-time compliance alerts. This is not a feature -- it is existential. One failed audit can cost a license worth $2M+.',
      intensity: 'CRITICAL',
      intensityColor: t.accentRed,
      repNote: 'Lead with compliance in EVERY first call. If you don\'t mention METRC in the first 3 minutes, you\'ve already lost credibility.',
    },
    {
      rank: 2,
      question: '"Will this help me sell more?"',
      detail: 'Online ordering, loyalty programs, smart upsells, customer retention. Dispensary margins are tight (typically 30-40% gross). Every incremental dollar matters.',
      intensity: 'HIGH',
      intensityColor: t.accentGold,
      repNote: 'Have a specific revenue uplift number ready. "Dispensaries using Dutchie E-Commerce see 18% higher AOV" beats "we have great e-commerce."',
    },
    {
      rank: 3,
      question: '"Will this save me time and money?"',
      detail: 'Staff efficiency, inventory automation, reduced manual data entry, faster close-of-day. Most dispensaries run lean -- 3-5 budtenders per shift. Every minute on admin is a minute not selling.',
      intensity: 'HIGH',
      intensityColor: t.accentGold,
      repNote: 'Quantify the time savings. "4 hours/night on compliance reports becomes 15 minutes" is a concrete promise.',
    },
    {
      rank: 4,
      question: '"Does it work with what I already have?"',
      detail: 'Integration with existing payment processors, delivery services, and state systems. Migration pain is the #1 reason buyers stay with bad software.',
      intensity: 'MEDIUM',
      intensityColor: t.accentBlue,
      repNote: 'Have the migration playbook ready. Day 1 / Day 7 / Day 30. Name specific integrations they use before they ask.',
    },
    {
      rank: 5,
      question: '"Is this company going to be around in 5 years?"',
      detail: 'Market position, funding stability, customer count, regulatory relationships. Cannabis tech is a graveyard of failed startups. Buyers have been burned.',
      intensity: 'MEDIUM',
      intensityColor: t.accentBlue,
      repNote: 'Numbers that matter: "X thousand dispensaries trust us, processing $Y billion annually." Social proof, not fundraising press releases.',
    },
    {
      rank: 6,
      question: '"What\'s different about your AI?"',
      detail: 'This is where Dex enters -- but ONLY after you have established trust on #1-5. AI is exciting but also scary. Operators worry about compliance risk from AI suggestions.',
      intensity: 'GROWING',
      intensityColor: t.accentPurple,
      repNote: 'Never lead with AI. Introduce Dex as "the intelligence layer that makes everything above work better" -- not as a standalone product.',
    },
    {
      rank: 7,
      question: '"What\'s the total cost?"',
      detail: 'Monthly fees, transaction fees, hardware costs, implementation fees. Always comes last in the conversation but first in the decision spreadsheet.',
      intensity: 'ALWAYS',
      intensityColor: t.textFaint,
      repNote: 'Frame pricing around consolidation savings. "You\'re paying for 4 vendors today. Dutchie replaces all of them for less."',
    },
  ];

  return (
    <div style={{ marginBottom: 64 }}>
      <SectionHeader
        label="PART 1 -- BUYER PSYCHOLOGY"
        title="What Dispensary Operators Actually Care About"
        subtitle='Ranked by real buyer behavior across 500+ sales conversations. Notice: "product architecture" is not on this list. Nobody asks "can you show me your platform hierarchy?" They ask "what does this actually DO for my dispensary?"'
        t={t}
      />

      <div style={{
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 24,
      }}>
        {priorities.map((p, i) => (
          <div key={i} style={{
            padding: '24px 28px',
            borderBottom: i < priorities.length - 1 ? `1px solid ${t.border}` : 'none',
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 20,
            alignItems: 'start',
          }}>
            {/* Rank */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: i === 0 ? 'rgba(232,112,104,0.12)' : i < 3 ? 'rgba(212,160,58,0.12)' : 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
              color: i === 0 ? t.accentRed : i < 3 ? t.accentGold : t.textFaint,
              fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0,
            }}>
              #{p.rank}
            </div>

            <div>
              {/* Question */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 18, fontWeight: 600, color: t.text,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {p.question}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: p.intensityColor,
                  background: `${p.intensityColor}15`,
                  padding: '3px 10px', borderRadius: 100,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {p.intensity}
                </span>
              </div>

              {/* Detail */}
              <div style={{
                fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 12,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {p.detail}
              </div>

              {/* Rep note */}
              <div style={{
                fontSize: 12, color: t.accentGold, lineHeight: 1.6,
                padding: '10px 14px',
                background: `rgba(212,160,58,0.06)`,
                borderRadius: 8,
                borderLeft: `3px solid ${t.accentGold}`,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <strong>Rep note:</strong> {p.repNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <div style={{
        background: `linear-gradient(135deg, rgba(212,160,58,0.08), rgba(0,194,124,0.06))`,
        border: `1px solid ${t.accentGold}30`,
        borderRadius: 12,
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 6,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          The Takeaway for Deck Design
        </div>
        <div style={{
          fontSize: 14, color: t.textMuted, lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Every slide should answer one of these 7 questions. If a slide does not clearly map to a buyer question, cut it. Product names and architecture should be INVISIBLE -- outcomes should be the only thing on screen.
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// CONCEPT A: "A Day at Your Dispensary with Dutchie"
// ============================================================================

function ConceptA({ t }) {
  const timeSlots = [
    {
      time: '7:00 AM',
      label: 'Opening',
      color: '#64A8E0',
      events: [
        'Compliance pre-check passed automatically -- METRC sync confirmed',
        'Inventory reconciled overnight, discrepancies flagged for review',
        'Dex analyzed yesterday\'s sales and adjusted today\'s display recommendations',
      ],
    },
    {
      time: '9:00 AM',
      label: 'Morning Rush',
      color: '#00C27C',
      events: [
        '14 online pre-orders queued and ready for pickup',
        'Dex predicted top sellers and suggested staff positioning',
        'New loyalty members auto-enrolled from last night\'s web traffic',
      ],
    },
    {
      time: '12:00 PM',
      label: 'Midday Lull',
      color: '#D4A03A',
      events: [
        'Dex sends targeted promos to 230 win-back customers within 5 miles',
        'Auto-reorder triggered for 3 SKUs approaching safety stock',
        'Budtender training module surfaces based on morning\'s missed upsells',
      ],
    },
    {
      time: '5:00 PM',
      label: 'Evening Peak',
      color: '#FFC02A',
      events: [
        'Voice AI handles phone orders -- same inventory, zero double-sells',
        'POS processes in-store + pickup simultaneously, queue under 4 minutes',
        'Real-time margin alerts flag a promotion that\'s running too hot',
      ],
    },
    {
      time: '9:00 PM',
      label: 'Close',
      color: '#B598E8',
      events: [
        'Compliance reports auto-generated and ready for submission',
        'Dex identifies tomorrow\'s optimization: "Move Sour Diesel to shelf 2 -- 37% lift predicted"',
        'Cash reconciliation completed, discrepancies auto-documented',
      ],
    },
  ];

  return (
    <div style={{ marginBottom: 72 }}>
      <SectionHeader
        label="CONCEPT A"
        title='"A Day at Your Dispensary with Dutchie"'
        subtitle="The products become invisible. The outcomes become the story. The rep walks the buyer through THEIR day, not through OUR org chart."
        t={t}
      />

      {/* --- Script Block --- */}
      <ScriptBlock
        t={t}
        title="Opening Hook (10 seconds)"
        script={'"Let me show you something different. Instead of walking you through our product list, I\'m going to walk you through YOUR day -- what it looks like when everything just works."'}
      />
      <ScriptBlock
        t={t}
        title="Walkthrough Script (40 seconds)"
        script={'"Seven AM. Before your first budtender even clocks in, Dutchie has already synced with METRC, reconciled your inventory, and flagged two discrepancies from yesterday. Your compliance is clean before you pour your first coffee. By nine, you\'ve got 14 online orders queued up -- customers pre-ordered last night from your Dutchie-powered menu. Your loyalty program enrolled 8 new members while you slept. At noon, things slow down. But Dex, our AI, notices -- and sends targeted promos to 230 customers within 5 miles who haven\'t been in this week. By five o\'clock, you\'re slammed again. Voice AI is handling phone calls, your POS is running in-store and pickup off the same inventory -- no double-sells, no angry customers. And at close? Dex has already built your compliance reports. Your team is out the door in 15 minutes instead of an hour."'}
      />
      <ScriptBlock
        t={t}
        title="Close / Transition (10 seconds)"
        script={'"That\'s not five separate products. That\'s one platform working together. And Dex -- our AI agent -- is the thread connecting all of it. Let me show you what that looks like in numbers..."'}
      />
      <ScriptBlock
        t={t}
        title='Objection Handler: "We already have a POS"'
        script={'"Totally understand. And that POS is probably fine at processing transactions. But is it syncing your online orders to the same inventory? Is it auto-generating your METRC reports? Is it sending win-back campaigns to customers who haven\'t visited in 10 days? A POS is one moment in the day. Dutchie is the whole day."'}
      />

      {/* --- Slide Mockup --- */}
      <SlideFrame label="SLIDE MOCKUP -- 16:9">
        {/* Slide header */}
        <div style={{ marginBottom: 'auto' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: 8 }}>
            YOUR DAY WITH DUTCHIE
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, color: '#F0EDE8', letterSpacing: '-0.01em', marginBottom: 4 }}>
            Everything works before you even think about it.
          </div>
          <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.45)' }}>
            One platform. One data model. One AI connecting it all.
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          display: 'flex',
          gap: 0,
          flex: 1,
          alignItems: 'stretch',
          marginTop: 20,
        }}>
          {timeSlots.map((slot, i) => (
            <div key={i} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              paddingRight: i < timeSlots.length - 1 ? 4 : 0,
            }}>
              {/* Time header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginBottom: 10,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: slot.color,
                  boxShadow: `0 0 8px ${slot.color}60`,
                }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: slot.color, letterSpacing: '0.04em' }}>
                    {slot.time}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#F0EDE8', letterSpacing: '0.02em' }}>
                    {slot.label}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {i < timeSlots.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: 4, right: 0,
                  width: 4, height: '100%',
                  borderRight: '1px dashed rgba(240,237,232,0.12)',
                }} />
              )}

              {/* Events */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 8,
                padding: '10px 10px',
                flex: 1,
                border: `1px solid ${slot.color}20`,
              }}>
                {slot.events.map((evt, j) => (
                  <div key={j} style={{
                    fontSize: 9,
                    color: 'rgba(240,237,232,0.7)',
                    lineHeight: 1.5,
                    marginBottom: j < slot.events.length - 1 ? 8 : 0,
                    paddingLeft: 10,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 2,
                      width: 4, height: 4, borderRadius: '50%',
                      background: slot.color, opacity: 0.6,
                    }} />
                    {evt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid rgba(240,237,232,0.08)',
        }}>
          <DexBadge size="sm" />
          <div style={{ fontSize: 9, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.04em' }}>
            dutchie
          </div>
        </div>
      </SlideFrame>
    </div>
  );
}


// ============================================================================
// CONCEPT B: "The Problem Stack" (Pain to Solution)
// ============================================================================

function ConceptB({ t }) {
  const problems = [
    {
      pain: 'We lose 20% of online orders to abandoned carts',
      stat: '$180K/yr in lost revenue for an average dispensary',
      solution: 'Dutchie E-Commerce + Dex Recommendations',
      outcome: 'Smart cart recovery, personalized menus, and AI-driven upsells reduce abandonment by 35%',
      icon: '\u{1F6D2}',
    },
    {
      pain: 'Compliance reporting takes 4 hours every night',
      stat: '1,040 staff-hours/year burned on manual entry',
      solution: 'Dutchie Retail + Dex Auto-Reports',
      outcome: 'One-click METRC sync, auto-generated reports, and audit-ready logs. Close-of-day in 15 minutes.',
      icon: '\u{1F4CB}',
    },
    {
      pain: 'We don\'t know which promotions actually work',
      stat: '60% of dispensaries run promos with no ROI tracking',
      solution: 'Dutchie Loyalty + Dex Analytics',
      outcome: 'Attribution-tracked campaigns with AI-optimized targeting. Know exactly which promo drove which dollar.',
      icon: '\u{1F4CA}',
    },
    {
      pain: 'Our wholesale ordering is chaos',
      stat: 'Average dispensary manages 40+ vendor relationships manually',
      solution: 'Dutchie Connect + Dex Inventory Prediction',
      outcome: 'Centralized vendor catalog, AI-predicted reorder points, and automated purchase orders.',
      icon: '\u{1F4E6}',
    },
    {
      pain: 'We can\'t see across our 12 locations',
      stat: 'MSOs spend 10+ hrs/week building cross-location reports manually',
      solution: 'Nexus + Dex Intelligence Dashboard',
      outcome: 'Unified view of all locations. Dex surfaces anomalies, benchmarks performance, and recommends actions.',
      icon: '\u{1F3E2}',
    },
  ];

  return (
    <div style={{ marginBottom: 72 }}>
      <SectionHeader
        label="CONCEPT B"
        title='"The Problem Stack"'
        subtitle="Start with pain. Every dispensary operator has felt every one of these problems. Product names appear, but they are SECONDARY to the problems they solve. Dex appears in every row as the intelligence multiplier."
        t={t}
      />

      {/* --- Script Block --- */}
      <ScriptBlock
        t={t}
        title="Opening Hook (10 seconds)"
        script={'"I\'m not going to show you our product list. Instead, I want to ask: which of these five problems is costing you the most money right now?"'}
      />
      <ScriptBlock
        t={t}
        title="Walkthrough Script (40 seconds)"
        script={'"Let\'s start with the one I hear most. Abandoned carts. You\'re driving traffic to your online menu -- paying for that traffic -- and one in five customers leaves without buying. That\'s a hundred and eighty thousand dollars a year walking away. Our e-commerce platform with Dex, our AI, personalizes every menu, recovers abandoned carts, and suggests upsells -- we\'ve seen 35% reductions in abandonment. Now, compliance. Your team is spending four hours every single night on METRC reports. That\'s a thousand hours a year -- and you still worry about errors. Dex auto-generates those reports. Close of day goes from four hours to fifteen minutes. And here\'s the thing -- because all of this runs on one platform, Dex can connect the dots. It knows your inventory, your sales trends, your customer behavior, and your compliance requirements simultaneously. No other vendor can do that because they don\'t have all the data."'}
      />
      <ScriptBlock
        t={t}
        title="Close / Transition (10 seconds)"
        script={'"So which of these is hurting you the most right now? Because that\'s where we should dig in. Let me show you exactly what the workflow looks like..."'}
      />
      <ScriptBlock
        t={t}
        title='Objection Handler: "We already have a POS"'
        script={'"Which one? [Let them answer.] Right -- so that handles the transaction. But look at this list again. Your POS doesn\'t solve abandoned carts. It doesn\'t predict inventory needs. It doesn\'t send win-back campaigns. You\'re using your POS for maybe 20% of what you actually need. The other 80% is where Dutchie lives."'}
      />

      {/* --- Slide Mockup --- */}
      <SlideFrame label="SLIDE MOCKUP -- 16:9">
        {/* Slide header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: 8 }}>
            THE REAL PROBLEMS. REAL SOLUTIONS.
          </div>
          <div style={{ fontSize: 20, fontWeight: 300, color: '#F0EDE8', letterSpacing: '-0.01em' }}>
            Every problem your dispensary faces, solved by one platform.
          </div>
        </div>

        {/* Problem rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          {problems.map((p, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 12px 1fr',
              gap: 0,
              alignItems: 'center',
            }}>
              {/* Pain side */}
              <div style={{
                background: 'rgba(232,112,104,0.06)',
                border: '1px solid rgba(232,112,104,0.15)',
                borderRadius: '8px 0 0 8px',
                padding: '10px 14px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#E87068', marginBottom: 3 }}>
                  {p.pain}
                </div>
                <div style={{ fontSize: 8, color: 'rgba(232,112,104,0.6)' }}>
                  {p.stat}
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(240,237,232,0.25)', fontSize: 12,
              }}>
                {'\u2192'}
              </div>

              {/* Solution side */}
              <div style={{
                background: 'rgba(0,194,124,0.06)',
                border: '1px solid rgba(0,194,124,0.15)',
                borderRadius: '0 8px 8px 0',
                padding: '10px 14px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#00C27C' }}>
                    {p.solution}
                  </span>
                </div>
                <div style={{ fontSize: 8, color: 'rgba(0,194,124,0.7)' }}>
                  {p.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid rgba(240,237,232,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DexBadge size="sm" />
            <span style={{ fontSize: 9, color: 'rgba(240,237,232,0.4)' }}>
              appears in every solution -- the intelligence multiplier
            </span>
          </div>
          <div style={{ fontSize: 9, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.04em' }}>
            dutchie
          </div>
        </div>
      </SlideFrame>
    </div>
  );
}


// ============================================================================
// CONCEPT C: "The Dutchie Difference" (Why Not Just Use Treez?)
// ============================================================================

function ConceptC({ t }) {
  const comparisons = [
    { category: 'Point of Sale', competitor: 'Yes (POS only)', dutchie: 'Full retail suite + POS' },
    { category: 'E-Commerce', competitor: 'Separate vendor (iFrames)', dutchie: 'Native, integrated menus' },
    { category: 'Loyalty', competitor: 'Third-party add-on', dutchie: 'Built-in, data-connected' },
    { category: 'Compliance', competitor: 'Manual exports + CSV uploads', dutchie: 'Auto-sync with METRC/BioTrack' },
    { category: 'Wholesale Ordering', competitor: 'Phone/email/spreadsheet', dutchie: 'Dutchie Connect marketplace' },
    { category: 'Multi-Location View', competitor: 'Log into each location separately', dutchie: 'Unified dashboard (Nexus)' },
    { category: 'AI Intelligence', competitor: 'None', dutchie: 'Dex -- predictions, automation, insights' },
    { category: 'Vendors to Manage', competitor: '4-5 separate contracts', dutchie: 'One vendor. One login. One invoice.' },
  ];

  return (
    <div style={{ marginBottom: 72 }}>
      <SectionHeader
        label="CONCEPT C"
        title='"The Dutchie Difference"'
        subtitle='The competitive displacement slide. This is the one that closes deals. Two columns: the fragmented mess they have today vs. the integrated platform they could have tomorrow. This is the slide that makes MSO procurement teams say "wait, all of that is one vendor?"'
        t={t}
      />

      {/* --- Script Block --- */}
      <ScriptBlock
        t={t}
        title="Opening Hook (10 seconds)"
        script={'"Let me guess. You\'re currently managing four or five different software vendors just to run your dispensary. One for POS, one for online ordering, one for loyalty, and you\'re doing compliance in spreadsheets. Sound about right?"'}
      />
      <ScriptBlock
        t={t}
        title="Walkthrough Script (40 seconds)"
        script={'"Here\'s what that looks like. [Point to left column.] You\'ve got your POS -- maybe Treez, maybe Flowhub. It handles transactions. That\'s it. Your e-commerce is a separate platform -- maybe an iFrame on your website that doesn\'t really talk to your POS. Loyalty? That\'s another vendor. Compliance? You\'re exporting CSVs and uploading to METRC manually. Wholesale ordering? Phone calls and emails. And when your CFO asks how Store 3 compares to Store 7? You\'re pulling reports from five different systems into a spreadsheet. [Point to right column.] Now look at this side. One platform. Your POS, e-commerce, loyalty, compliance, and wholesale ordering are all connected. They share the same data. When a customer orders online, your in-store inventory updates instantly. When they check out, they earn loyalty points automatically. At close of day, your METRC report is already done. And sitting on top of all of that is Dex -- our AI -- which can optimize your entire operation because it sees everything. No other vendor has this. Treez has a POS. Flowhub has a POS. We have the whole picture."'}
      />
      <ScriptBlock
        t={t}
        title="Close / Transition (10 seconds)"
        script={'"And here\'s the part that matters: Dex gets smarter the more you use it. Because it sees your inventory, your sales, your customers, and your compliance data all at once, it makes connections no point solution ever could. Let me show you what Dex recommended for a dispensary just like yours last week..."'}
      />
      <ScriptBlock
        t={t}
        title='Objection Handler: "We already have a POS"'
        script={'"Exactly. You have a POS. [Pause, point to left column.] And you also have this separate e-commerce tool, this separate loyalty vendor, and that spreadsheet your manager hates building every night. We\'re not asking you to replace your POS. We\'re asking you to replace the four other things you wish your POS could do. And honestly? Our POS is pretty great too -- when you\'re ready for that conversation."'}
      />

      {/* --- Slide Mockup --- */}
      <SlideFrame label="SLIDE MOCKUP -- 16:9">
        {/* Slide header */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: 8 }}>
            WHY DUTCHIE
          </div>
          <div style={{ fontSize: 20, fontWeight: 300, color: '#F0EDE8', letterSpacing: '-0.01em' }}>
            Stop managing five vendors. Start running your dispensary.
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.5fr 1.5fr',
            gap: 2,
            marginBottom: 4,
          }}>
            <div style={{ padding: '8px 12px' }} />
            <div style={{
              padding: '8px 12px',
              textAlign: 'center',
              background: 'rgba(232,112,104,0.08)',
              borderRadius: '8px 8px 0 0',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#E87068', letterSpacing: '0.04em' }}>
                Other Vendors
              </div>
              <div style={{ fontSize: 8, color: 'rgba(232,112,104,0.5)', marginTop: 2 }}>
                Treez / Flowhub / Blaze / BioTrack
              </div>
            </div>
            <div style={{
              padding: '8px 12px',
              textAlign: 'center',
              background: 'rgba(0,194,124,0.08)',
              borderRadius: '8px 8px 0 0',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#00C27C', letterSpacing: '0.04em' }}>
                Dutchie
              </div>
              <div style={{ fontSize: 8, color: 'rgba(0,194,124,0.5)', marginTop: 2 }}>
                One platform. One login. One invoice.
              </div>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.5fr 1.5fr',
              gap: 2,
            }}>
              <div style={{
                padding: '7px 12px',
                fontSize: 9,
                fontWeight: 600,
                color: '#F0EDE8',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
              }}>
                {row.category}
              </div>
              <div style={{
                padding: '7px 12px',
                fontSize: 9,
                color: 'rgba(232,112,104,0.7)',
                background: 'rgba(232,112,104,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
              }}>
                {row.competitor}
              </div>
              <div style={{
                padding: '7px 12px',
                fontSize: 9,
                color: 'rgba(0,194,124,0.9)',
                fontWeight: 500,
                background: 'rgba(0,194,124,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
              }}>
                {row.dutchie}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 12,
          padding: '10px 16px',
          background: 'linear-gradient(90deg, rgba(212,160,58,0.10), rgba(255,192,42,0.06))',
          borderRadius: 8,
          border: '1px solid rgba(212,160,58,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <DexBadge size="sm" />
          <span style={{ fontSize: 10, color: 'rgba(240,237,232,0.7)', fontWeight: 500 }}>
            And Dex makes it all smarter over time -- learning from every transaction, every customer, every location.
          </span>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 8,
        }}>
          <div style={{ fontSize: 9, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.04em' }}>
            dutchie
          </div>
        </div>
      </SlideFrame>
    </div>
  );
}


// ============================================================================
// PART 4: Which One to Actually Use
// ============================================================================

function UsageGuide({ t }) {
  const recommendations = [
    {
      scenario: 'First Call with a Single-Location Dispensary',
      concept: 'A',
      conceptName: 'A Day at Your Dispensary',
      reasoning: 'Single-location operators think in terms of their daily workflow, not product suites. Walking them through their own day makes the value immediately tangible. They don\'t care about "platform" -- they care about "will my night close faster?" Concept A answers that in 60 seconds.',
      tips: [
        'Customize the timeline to their hours of operation',
        'Ask about their pain points first, then emphasize those moments in the walkthrough',
        'Keep it conversational -- this is a story, not a feature demo',
      ],
    },
    {
      scenario: 'Enterprise Pitch to an MSO (Multi-State Operator)',
      concept: 'B',
      conceptName: 'The Problem Stack',
      reasoning: 'MSO buyers are solving operational problems at scale. They need to justify the vendor switch to procurement and the C-suite. The Problem Stack gives them the ROI ammunition: specific problems with specific dollar figures and specific solutions. They can literally take this slide to their CFO.',
      tips: [
        'Customize the dollar figures for their scale (multiply by location count)',
        'Emphasize the "12 locations" row -- that is their unique pain',
        'Follow up with a custom ROI model based on their actual numbers',
      ],
    },
    {
      scenario: 'Competitive Displacement (Switching from Treez, Flowhub, etc.)',
      concept: 'C',
      conceptName: 'The Dutchie Difference',
      reasoning: 'When you are displacing a competitor, you need to reframe the conversation from "POS vs. POS" to "one platform vs. five vendors." Concept C does this visually and immediately. The buyer sees their current chaos on the left and the integrated future on the right.',
      tips: [
        'Research their exact vendor stack before the call -- name the vendors they use',
        'Never trash the competition directly -- just highlight the friction of fragmentation',
        'The "Vendors to Manage" row is your closer -- "one invoice" resonates with ops teams',
      ],
    },
    {
      scenario: 'Board or Investor Presentation',
      concept: 'B + C',
      conceptName: 'Problem Stack + Dutchie Difference (Combined)',
      reasoning: 'Investors and board members need to see market opportunity (the problems are universal) and competitive moat (nobody else is integrated). Use Concept B to show the TAM-adjacent pain landscape, then Concept C to show why Dutchie wins. Dex is the differentiation layer that makes this defensible.',
      tips: [
        'Lead with market size: "X dispensaries in the US, each spending $Y/year on fragmented software"',
        'Concept B establishes the problem as universal; Concept C establishes Dutchie as the only integrated solution',
        'End with Dex as the compounding advantage -- more data, smarter AI, deeper moat',
      ],
    },
  ];

  return (
    <div style={{ marginBottom: 64 }}>
      <SectionHeader
        label="PART 4 -- DEPLOYMENT GUIDE"
        title="Which Slide for Which Audience"
        subtitle="Not every buyer gets the same deck. Here is the field guide for which concept to deploy, when, and why. The wrong slide in the wrong meeting wastes everyone's time."
        t={t}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {recommendations.map((rec, i) => (
          <div key={i} style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 28px',
              borderBottom: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: t.accentGold, marginBottom: 4,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {rec.scenario}
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: `rgba(212,160,58,0.08)`,
                padding: '6px 16px',
                borderRadius: 100,
                border: `1px solid rgba(212,160,58,0.2)`,
              }}>
                <span style={{
                  fontSize: 20, fontWeight: 700, color: t.accentGold,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {rec.concept}
                </span>
                <span style={{
                  fontSize: 12, color: t.textMuted,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {rec.conceptName}
                </span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 28px' }}>
              <div style={{
                fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 16,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {rec.reasoning}
              </div>

              {/* Tips */}
              <div style={{
                background: `rgba(0,194,124,0.05)`,
                borderRadius: 10,
                padding: '14px 18px',
                border: `1px solid rgba(0,194,124,0.12)`,
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: t.accentGreen, marginBottom: 10,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Field Tips
                </div>
                {rec.tips.map((tip, j) => (
                  <div key={j} style={{
                    fontSize: 13, color: t.textMuted, lineHeight: 1.6,
                    marginBottom: j < rec.tips.length - 1 ? 6 : 0,
                    paddingLeft: 16,
                    position: 'relative',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 7,
                      width: 5, height: 5, borderRadius: '50%',
                      background: t.accentGreen, opacity: 0.5,
                    }} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Note */}
      <div style={{
        marginTop: 32,
        padding: '24px 28px',
        background: `linear-gradient(135deg, rgba(212,160,58,0.06), rgba(181,152,232,0.06))`,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
      }}>
        <div style={{
          fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 10,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          The Universal Rule
        </div>
        <div style={{
          fontSize: 14, color: t.textMuted, lineHeight: 1.8,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Regardless of which concept you use, the order is always the same:
          <strong style={{ color: t.text }}> Compliance first. Revenue second. Efficiency third. AI last.</strong> Dex
          is the cherry on top, not the meal. If a buyer leaves the call thinking "cool AI" but not thinking
          "this keeps me compliant and makes me more money," the call failed. Every great Dutchie sales
          conversation ends with the buyer saying: "When can we start?" -- not "That AI stuff sounds neat."
          Sell the outcome. Let Dex be the surprise that makes them feel like they are getting more than they paid for.
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// NAV TABS
// ============================================================================

function NavTabs({ active, onChange, t }) {
  const tabs = [
    { id: 'priorities', label: 'Buyer Priorities' },
    { id: 'concept-a', label: 'Concept A: Day in the Life' },
    { id: 'concept-b', label: 'Concept B: Problem Stack' },
    { id: 'concept-c', label: 'Concept C: Competitive' },
    { id: 'usage', label: 'Deployment Guide' },
    { id: 'all', label: 'View All' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 4,
      marginBottom: 40,
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px solid ${active === tab.id ? t.accentGold + '40' : t.border}`,
            background: active === tab.id ? `${t.accentGold}15` : 'transparent',
            color: active === tab.id ? t.accentGold : t.textMuted,
            fontSize: 12,
            fontWeight: active === tab.id ? 600 : 400,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.15s ease',
            letterSpacing: '0.02em',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}


// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SalesStoryDeck({ theme = 'dark' }) {
  const t = themes[theme] || themes.dark;
  const [activeTab, setActiveTab] = useState('all');

  const showAll = activeTab === 'all';

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      fontFamily: "'DM Sans', sans-serif",
      color: t.text,
    }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: t.accentGold, marginBottom: 14,
        }}>
          SALES ENABLEMENT
        </div>
        <h1 style={{
          fontSize: 34, fontWeight: 300, color: t.text,
          letterSpacing: '-0.02em', lineHeight: 1.2,
          margin: '0 0 14px',
        }}>
          The Deck Built for Buyers, Not for Us
        </h1>
        <p style={{
          fontSize: 15, color: t.textMuted, lineHeight: 1.7,
          maxWidth: 600, margin: '0 auto',
        }}>
          Three slide concepts designed around what dispensary operators actually need to hear.
          Product names are secondary. Outcomes are primary. Architecture is invisible.
        </p>
      </div>

      {/* Navigation */}
      <NavTabs active={activeTab} onChange={setActiveTab} t={t} />

      {/* Content */}
      {(showAll || activeTab === 'priorities') && <BuyerPriorities t={t} />}
      {(showAll || activeTab === 'concept-a') && <ConceptA t={t} />}
      {(showAll || activeTab === 'concept-b') && <ConceptB t={t} />}
      {(showAll || activeTab === 'concept-c') && <ConceptC t={t} />}
      {(showAll || activeTab === 'usage') && <UsageGuide t={t} />}
    </div>
  );
}

export default SalesStoryDeck;
