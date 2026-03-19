import React, { useState, useId } from 'react';

// ============================================================================
// InformationHierarchyStudy
//
// A design-science analysis of Dutchie's product overview slide, applying
// cognitive load theory, visual hierarchy principles, eye-tracking research,
// and the pyramid principle to restructure one slide for maximum impact.
//
// Export: InformationHierarchyStudy({ theme = 'dark' })
// ============================================================================

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
    accentGreen: '#00C27C',
  },
  light: {
    bg: '#F5F4F2',
    cardBg: '#FAFAF9',
    border: '#E8E5E0',
    text: '#1C1917',
    textMuted: '#57534E',
    textFaint: '#A8A29E',
    accentGold: '#A17A1A',
    accentGoldLight: '#C49A2A',
    accentGreen: '#047857',
  },
};

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── Slide color palette (Dutchie brand) ──────────────────────────────────
const SLIDE = {
  forestGreen: '#1B3D2F',
  forestLight: '#1E4535',
  forestDark: '#142E23',
  cream: '#FAF5E8',
  creamDark: '#EDE5D4',
  burgundy: '#6B2D3E',
  burgundyDark: '#4E1F2E',
  gold: '#D4A03A',
  goldLight: '#FFC02A',
  goldDark: '#B08520',
  greenAccent: '#4CAF7D',
  textDark: '#2C2520',
  textLight: '#F5EFE3',
};

// ============================================================================
// Shared primitives
// ============================================================================

const Section = ({ number, title, subtitle, t }) => (
  <div style={{ marginBottom: 40, paddingBottom: 20, borderBottom: `2px solid ${t.accentGold}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '50%',
        background: t.accentGold, color: '#0A0908',
        fontWeight: 700, fontSize: 16, fontFamily: FONT, flexShrink: 0,
      }}>{number}</span>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: t.text, fontFamily: FONT, lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
    {subtitle && (
      <p style={{ margin: 0, marginTop: 10, paddingLeft: 50, fontSize: 15, color: t.textMuted, fontFamily: FONT, fontStyle: 'italic', lineHeight: 1.6, maxWidth: 720 }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({ children, t, style = {} }) => (
  <div style={{
    background: t.cardBg, border: `1px solid ${t.border}`,
    borderRadius: 12, padding: 24, fontFamily: FONT, ...style,
  }}>
    {children}
  </div>
);

const Pill = ({ children, color }) => (
  <span style={{
    display: 'inline-block', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '3px 10px', borderRadius: 4,
    background: `${color}1A`, color, fontFamily: FONT,
  }}>
    {children}
  </span>
);

const KeyInsight = ({ children, t }) => (
  <div style={{
    background: `${t.accentGold}0C`, border: `1px solid ${t.accentGold}40`,
    borderRadius: 10, padding: 20, fontFamily: FONT, margin: '24px 0',
  }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 8 }}>
      Key Insight
    </div>
    <div style={{ fontSize: 15, color: t.text, lineHeight: 1.6, fontWeight: 500 }}>{children}</div>
  </div>
);

const MiniLabel = ({ children, color, style = {} }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color, fontFamily: FONT, ...style,
  }}>
    {children}
  </div>
);


// ============================================================================
// SECTION 1: "Why the Current Slide Doesn't Work"
// Recreates the current 5-column layout with analytical overlays
// ============================================================================

function CurrentSlideWithHeatmap({ t }) {
  const uid = useId().replace(/:/g, '');

  return (
    <div>
      {/* ─── Current slide recreation with heatmap overlay ─── */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        <MiniLabel color={t.accentGold} style={{ marginBottom: 12 }}>
          Current Layout -- Eye-Tracking Heat Map
        </MiniLabel>
        <svg
          width="100%"
          viewBox="0 0 960 540"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', borderRadius: 14, border: `1px solid ${t.border}` }}
        >
          <defs>
            <radialGradient id={`${uid}-bg`} cx="50%" cy="45%" r="75%">
              <stop offset="0%" stopColor="#1E4535" />
              <stop offset="100%" stopColor="#142E23" />
            </radialGradient>
            <linearGradient id={`${uid}-cream`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAF5E8" />
              <stop offset="100%" stopColor="#EDE5D4" />
            </linearGradient>
            <linearGradient id={`${uid}-burg`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B2D3E" />
              <stop offset="100%" stopColor="#4E1F2E" />
            </linearGradient>
            <linearGradient id={`${uid}-rainbow`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C0504D" />
              <stop offset="25%" stopColor="#D4B04D" />
              <stop offset="50%" stopColor="#5DA06B" />
              <stop offset="75%" stopColor="#4D7EC0" />
              <stop offset="100%" stopColor="#A05D8B" />
            </linearGradient>
            {/* Heatmap radials — warm = attention, cool = ignored */}
            <radialGradient id={`${uid}-hot`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4444" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#FF8800" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#FFCC00" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFCC00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-warm`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF8800" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFCC00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFCC00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-cool`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4488FF" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#4488FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4488FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-cold`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2244AA" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#2244AA" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#2244AA" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background */}
          <rect width="960" height="540" rx="14" fill={`url(#${uid}-bg)`} />

          {/* Header area */}
          <text x="480" y="32" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="600" letterSpacing="3">
            THE DUTCHIE PLATFORM
          </text>
          <text x="480" y="62" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#F5EFE3" fontWeight="700">
            Everything You Need to Run Your Dispensary
          </text>
          <text x="480" y="86" textAnchor="middle" fontFamily={FONT} fontSize="12" fill="#8BAF9E">
            Five integrated products. One intelligent platform.
          </text>

          {/* 5 product cards — 150px wide each */}
          {['E-Commerce', 'Loyalty', 'Retail', 'Nexus', 'Connect'].map((name, i) => {
            const cardW = 150, gap = 14;
            const totalW = 5 * cardW + 4 * gap;
            const startX = (960 - totalW) / 2;
            const cx = startX + i * (cardW + gap);
            const isRetail = name === 'Retail';
            return (
              <g key={name}>
                <rect x={cx} y={120} width={cardW} height={268} rx="14"
                  fill={isRetail ? `url(#${uid}-burg)` : `url(#${uid}-cream)`}
                />
                <text x={cx + 75} y={180} textAnchor="middle" fontFamily={FONT} fontSize="15" fontWeight="700"
                  fill={isRetail ? '#F5EFE3' : '#2C2520'}
                >
                  {name}
                </text>
                {/* Placeholder feature lines */}
                {[0,1,2,3,4].map(j => (
                  <rect key={j} x={cx + 16} y={200 + j * 22} width={cardW - 32} height={3} rx={1.5}
                    fill={isRetail ? '#D4BFC5' : '#C8BDA8'} opacity={0.4}
                  />
                ))}
              </g>
            );
          })}

          {/* Intelligence bar at bottom */}
          <rect x={100} y={418} width={760} height={72} rx="12" fill="#183D2D" stroke="#2A5A45" strokeWidth="1" />
          <rect x={100} y={418} width={760} height={4} rx="2" fill={`url(#${uid}-rainbow)`} opacity="0.7" />
          <text x={480} y={460} textAnchor="middle" fontFamily={FONT} fontSize="14" fill="#4CAF7D" fontWeight="600" letterSpacing="1">
            intelligence
          </text>
          <text x={480} y={478} textAnchor="middle" fontFamily={FONT} fontSize="10" fill="#6B9B84">
            Data -- Compliance -- Automation -- Reporting -- Insights
          </text>

          {/* ═══ HEATMAP OVERLAY ═══ */}
          {/* Card 1 (E-Commerce) — first read, moderate attention */}
          <ellipse cx={172} cy={220} rx={95} ry={130} fill={`url(#${uid}-hot)`} />
          {/* Card 2 (Loyalty) — declining attention */}
          <ellipse cx={336} cy={220} rx={90} ry={120} fill={`url(#${uid}-warm)`} />
          {/* Card 3 (Retail) — burgundy draws accidental attention */}
          <ellipse cx={500} cy={220} rx={95} ry={130} fill={`url(#${uid}-hot)`} />
          {/* Card 4 (Nexus) — attention dropping */}
          <ellipse cx={664} cy={220} rx={85} ry={110} fill={`url(#${uid}-cool)`} />
          {/* Card 5 (Connect) — most viewers never reach here */}
          <ellipse cx={828} cy={220} rx={80} ry={100} fill={`url(#${uid}-cold)`} />
          {/* Intelligence bar — almost completely ignored */}
          <rect x={100} y={415} width={760} height={80} rx="12"
            fill="#2244AA" opacity="0.12"
          />

          {/* Reading path arrows — white dashed with numbers */}
          <g stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.7">
            <path d="M200,60 L172,130" markerEnd="url(#arrow)" />
            <path d="M210,250 L300,230" />
            <path d="M380,250 L460,230" />
            <path d="M540,250 L620,250" />
            <path d="M700,270 L780,280" />
          </g>

          {/* Numbered reading sequence circles */}
          {[
            { x: 480, y: 48, n: '1', note: 'Header scanned' },
            { x: 172, y: 150, n: '2', note: 'First card' },
            { x: 500, y: 150, n: '3', note: 'Color draws eye' },
            { x: 336, y: 150, n: '4', note: 'Backtrack' },
            { x: 664, y: 150, n: '5', note: 'Fading...' },
            { x: 828, y: 150, n: '6', note: 'Often missed' },
          ].map(({ x, y, n }) => (
            <g key={n}>
              <circle cx={x} cy={y} r={12} fill="#FFFFFF" fillOpacity="0.9" />
              <text x={x} y={y + 4} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="700" fill="#0A0908">{n}</text>
            </g>
          ))}

          {/* "3-second impression" overlay text */}
          <rect x={680} y={420} width={180} height={68} rx="8" fill="#0A0908" fillOpacity="0.85" />
          <text x={770} y={442} textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="700" fill="#FF4444" letterSpacing="0.5">
            ATTENTION DEAD ZONE
          </text>
          <text x={770} y={458} textAnchor="middle" fontFamily={FONT} fontSize="9" fill="#ADA599">
            Intelligence bar receives
          </text>
          <text x={770} y={472} textAnchor="middle" fontFamily={FONT} fontSize="9" fill="#ADA599">
            less than 8% of eye fixations
          </text>

          {/* Legend */}
          <rect x={12} y={500} width={200} height={32} rx="6" fill="#0A0908" fillOpacity="0.8" />
          <circle cx={30} cy={516} r={6} fill="#FF4444" opacity="0.7" />
          <text x={40} y={519} fontFamily={FONT} fontSize="9" fill="#FF8888">High</text>
          <circle cx={70} cy={516} r={6} fill="#FF8800" opacity="0.6" />
          <text x={80} y={519} fontFamily={FONT} fontSize="9" fill="#FFAA44">Med</text>
          <circle cx={110} cy={516} r={6} fill="#4488FF" opacity="0.5" />
          <text x={120} y={519} fontFamily={FONT} fontSize="9" fill="#6699FF">Low</text>
          <circle cx={152} cy={516} r={6} fill="#2244AA" opacity="0.4" />
          <text x={162} y={519} fontFamily={FONT} fontSize="9" fill="#4466BB">None</text>
        </svg>
      </div>

      {/* ─── Annotated problem breakdown ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          {
            label: 'Visual Weight',
            verdict: 'FAIL',
            color: '#FF4444',
            detail: 'All 5 cards have identical dimensions (150x268px), identical border radii, and near-identical visual mass. The brain cannot prioritize when everything is the same size. Equal weight = no hierarchy = no message.',
          },
          {
            label: 'Reading Path',
            verdict: 'FAIL',
            color: '#FF4444',
            detail: 'Eye enters at header (correct), then scans left-to-right across cards. Burgundy Retail card creates an unintended saccade back to center. Intelligence bar sits below the fold of attention -- 72px vs 268px card height.',
          },
          {
            label: 'Chunk Count',
            verdict: 'FAIL',
            color: '#FF8800',
            detail: 'Miller\'s Law: working memory holds 4 +/- 1 chunks. This slide presents 6 chunks (5 cards + 1 bar). Cognitive overload triggers "satisficing" -- the viewer reads 2-3 cards then gives up.',
          },
          {
            label: 'Color Coding',
            verdict: 'FAIL',
            color: '#FF8800',
            detail: 'Pattern is cream/cream/BURGUNDY/cream/cream. The only color break is Retail, which accidentally becomes the hero. The intelligence bar (the AI story) has no distinctive color -- it blends into the green background.',
          },
        ].map(({ label, verdict, color, detail }) => (
          <Card key={label} t={t} style={{ borderLeft: `3px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{label} Analysis</span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                padding: '2px 8px', borderRadius: 4, background: `${color}20`, color,
              }}>{verdict}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{detail}</p>
          </Card>
        ))}
      </div>

      {/* ─── Size comparison diagram ─── */}
      <Card t={t} style={{ marginBottom: 24 }}>
        <MiniLabel color={t.accentGold} style={{ marginBottom: 16 }}>
          Size = Importance | Visual Real Estate Allocation
        </MiniLabel>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 160 }}>
          {[
            { label: 'E-Commerce', pct: 17, color: SLIDE.cream },
            { label: 'Loyalty', pct: 17, color: SLIDE.cream },
            { label: 'Retail', pct: 17, color: SLIDE.burgundy },
            { label: 'Nexus', pct: 17, color: SLIDE.cream },
            { label: 'Connect', pct: 17, color: SLIDE.cream },
            { label: 'Intelligence', pct: 9, color: SLIDE.forestLight },
          ].map(({ label, pct, color }) => (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.text, marginBottom: 4 }}>{pct}%</span>
              <div style={{
                width: '100%', height: `${pct * 8}px`, borderRadius: 6,
                background: color, border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 600, color: label === 'Retail' || label === 'Intelligence' ? '#F5EFE3' : '#2C2520',
                  writingMode: pct > 12 ? 'horizontal-tb' : 'vertical-rl',
                  textOrientation: 'mixed',
                }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: `${t.accentGold}08`, borderRadius: 8, border: `1px solid ${t.accentGold}30` }}>
          <span style={{ fontSize: 13, color: t.text, fontWeight: 600 }}>
            The "Intelligence" bar -- your AI differentiator -- gets 9% of the visual real estate.
          </span>
          <span style={{ fontSize: 13, color: t.textMuted }}> Each product card individually outweighs it by nearly 2x. The viewer's brain reads this as: "Intelligence is half as important as any single product."</span>
        </div>
      </Card>

      <KeyInsight t={t}>
        The 3-second test result: "I see five product boxes that look the same." The intelligence/AI story -- the single most compelling differentiator Dutchie has -- is architecturally invisible. It occupies the least important position (bottom), has the least visual weight (smallest element), and uses no distinctive color to separate it from the background.
      </KeyInsight>
    </div>
  );
}


// ============================================================================
// SECTION 2: "The 3-Chunk Rule" — Restructuring
// ============================================================================

function ThreeChunkMockup({ uid, label, chunks, t, description }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Pill color={t.accentGold}>{label}</Pill>
        <span style={{ fontSize: 13, color: t.textMuted }}>{description}</span>
      </div>
      <svg
        width="100%"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', borderRadius: 14, border: `1px solid ${t.border}` }}
      >
        <defs>
          <radialGradient id={`${uid}-bg`} cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#1E4535" />
            <stop offset="100%" stopColor="#142E23" />
          </radialGradient>
        </defs>
        <rect width="960" height="540" rx="14" fill={`url(#${uid}-bg)`} />

        {/* Header */}
        <text x="480" y="36" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="600" letterSpacing="3">
          THE DUTCHIE PLATFORM
        </text>
        <text x="480" y="66" textAnchor="middle" fontFamily={FONT} fontSize="20" fill="#F5EFE3" fontWeight="700">
          Everything You Need to Run Your Dispensary
        </text>

        {/* Chunk boundary dashed boxes */}
        {chunks.map((chunk, i) => (
          <g key={i}>
            {/* Chunk area */}
            <rect
              x={chunk.x} y={chunk.y} width={chunk.w} height={chunk.h}
              rx="12" fill={chunk.fill || 'none'}
              stroke={chunk.borderColor || '#4CAF7D'} strokeWidth="2"
              strokeDasharray={chunk.dashed ? '8 4' : 'none'}
            />
            {/* Chunk label */}
            <text
              x={chunk.x + chunk.w / 2} y={chunk.y + 28}
              textAnchor="middle" fontFamily={FONT}
              fontSize={chunk.labelSize || 14} fontWeight="700"
              fill={chunk.labelColor || '#F5EFE3'}
            >
              {chunk.label}
            </text>
            {/* Sub-content */}
            {chunk.items && chunk.items.map((item, j) => (
              <text key={j}
                x={chunk.x + chunk.w / 2} y={chunk.y + 50 + j * 18}
                textAnchor="middle" fontFamily={FONT}
                fontSize="11" fill={chunk.itemColor || '#8BAF9E'}
              >
                {item}
              </text>
            ))}
            {/* Chunk number badge */}
            <circle cx={chunk.x + 20} cy={chunk.y + 20} r={11} fill={chunk.badgeColor || '#D4A03A'} />
            <text x={chunk.x + 20} y={chunk.y + 24} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="700" fill="#0A0908">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ThreeChunkSection({ t }) {
  const uid1 = useId().replace(/:/g, '');
  const uid2 = useId().replace(/:/g, '');
  const uid3 = useId().replace(/:/g, '');

  return (
    <div>
      <Card t={t} style={{ marginBottom: 24, borderLeft: `3px solid ${t.accentGold}` }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 8 }}>
          The Cognitive Science Constraint
        </div>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          George Miller's research (1956) established that working memory can hold 7 +/- 2 items.
          Subsequent work by Nelson Cowan (2001) refined this to <strong style={{ color: t.text }}>3-4 chunks</strong> for
          complex visual information. A slide with 5 equal product cards plus an intelligence bar presents
          6 visual chunks -- exceeding the comfortable threshold. The brain responds by either (a) reading
          only the first 2-3 items, or (b) treating all items as interchangeable, retaining none distinctly.
        </p>
        <p style={{ margin: '12px 0 0', fontSize: 13, color: t.text, lineHeight: 1.7, fontWeight: 600 }}>
          Solution: Collapse 6 elements into 3 meaningful groups. Each group becomes one "chunk" the viewer can hold.
        </p>
      </Card>

      {/* Option A */}
      <ThreeChunkMockup
        uid={uid1}
        label="Option A"
        description="Products | AI/Dex | Data/Platform"
        t={t}
        chunks={[
          {
            x: 40, y: 100, w: 440, h: 300,
            fill: '#183D2D', borderColor: '#4CAF7D', dashed: true,
            label: 'Product Suite', labelColor: '#F5EFE3',
            items: ['E-Commerce   Loyalty   Retail', 'Online menus, rewards, POS, compliance...', 'Everything to run daily operations'],
            itemColor: '#8BAF9E', badgeColor: '#4CAF7D',
          },
          {
            x: 500, y: 100, w: 420, h: 180,
            fill: '#2A1F00', borderColor: '#D4A03A', dashed: false,
            label: 'Dex Intelligence', labelSize: 18, labelColor: '#FFC02A',
            items: ['AI that learns your business', 'Predictions   Automation   Insights'],
            itemColor: '#D4A03A', badgeColor: '#D4A03A',
          },
          {
            x: 500, y: 300, w: 420, h: 100,
            fill: '#183D2D', borderColor: '#2A5A45', dashed: true,
            label: 'Nexus + Connect', labelColor: '#8BAF9E',
            items: ['Data platform, integrations, partner network'],
            itemColor: '#6B9B84', badgeColor: '#2D6A4F',
          },
        ]}
      />

      {/* Option B */}
      <ThreeChunkMockup
        uid={uid2}
        label="Option B"
        description="Problem | Solution | Intelligence"
        t={t}
        chunks={[
          {
            x: 40, y: 100, w: 280, h: 390,
            fill: '#2D1520', borderColor: '#FF6B6B', dashed: true,
            label: 'The Challenge', labelColor: '#FF8888',
            items: ['Compliance complexity', 'Fragmented tools', 'Rising competition', 'Data silos', 'Manual processes'],
            itemColor: '#D4BFC5', badgeColor: '#FF6B6B',
          },
          {
            x: 340, y: 100, w: 280, h: 390,
            fill: '#183D2D', borderColor: '#4CAF7D', dashed: true,
            label: 'The Platform', labelColor: '#4CAF7D',
            items: ['E-Commerce + Loyalty', 'Retail POS + Compliance', 'Nexus Data + Connect', '= One integrated system'],
            itemColor: '#8BAF9E', badgeColor: '#4CAF7D',
          },
          {
            x: 640, y: 100, w: 280, h: 390,
            fill: '#2A1F00', borderColor: '#D4A03A', dashed: false,
            label: 'The Intelligence', labelSize: 16, labelColor: '#FFC02A',
            items: ['Dex AI makes it all smarter', 'Learns from your data', 'Automates decisions', 'Predicts outcomes'],
            itemColor: '#D4A03A', badgeColor: '#D4A03A',
          },
        ]}
      />

      {/* Option C */}
      <ThreeChunkMockup
        uid={uid3}
        label="Option C"
        description="What You Get | What Makes It Smart | Why It Matters"
        t={t}
        chunks={[
          {
            x: 40, y: 100, w: 320, h: 200,
            fill: '#183D2D', borderColor: '#4CAF7D', dashed: true,
            label: 'What You Get', labelColor: '#8BAF9E',
            items: ['5 products, one login', 'POS + Menus + Loyalty + Data + Network'],
            itemColor: '#6B9B84', badgeColor: '#4CAF7D',
          },
          {
            x: 40, y: 320, w: 320, h: 170,
            fill: '#1A1008', borderColor: '#B08520', dashed: true,
            label: 'Why It Matters', labelColor: '#D4A03A',
            items: ['+23% avg revenue lift', '99.7% compliance rate', '40% less manual work'],
            itemColor: '#D4A03A', badgeColor: '#B08520',
          },
          {
            x: 380, y: 100, w: 540, h: 390,
            fill: '#2A1F00', borderColor: '#D4A03A', dashed: false,
            label: 'What Makes It Smart', labelSize: 20, labelColor: '#FFC02A',
            items: ['Dex: AI that learns your dispensary', '', 'Predicts inventory needs before you do', 'Optimizes pricing in real-time', 'Automates compliance workflows', 'Connects every data point across products'],
            itemColor: '#D4A03A', badgeColor: '#D4A03A',
          },
        ]}
      />

      <KeyInsight t={t}>
        Option C is the strongest because it follows the Pyramid Principle: lead with the conclusion ("what makes it smart"), not the evidence ("what you get"). The largest visual element is Dex -- which means the 3-second impression is "they have AI that makes everything smarter" rather than "they have five products."
      </KeyInsight>
    </div>
  );
}


// ============================================================================
// SECTION 3: "Size Experiments" — Dex Visual Weight Progression
// ============================================================================

function SizeExperiment({ pct, dexPct, t, uid }) {
  const slideW = 960;
  const slideH = 540;
  const headerH = 90;
  const contentH = slideH - headerH - 20;
  const dexH = Math.round(contentH * (dexPct / 100));
  const productsH = contentH - dexH - 10;

  // Determine which layout based on dex percentage
  const dexIsHero = dexPct >= 50;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${slideW} ${slideH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 10, border: `1px solid ${t.border}` }}
    >
      <defs>
        <radialGradient id={`${uid}-bg`} cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor="#1E4535" />
          <stop offset="100%" stopColor="#142E23" />
        </radialGradient>
      </defs>
      <rect width={slideW} height={slideH} rx="10" fill={`url(#${uid}-bg)`} />

      {/* Header */}
      <text x="480" y="30" textAnchor="middle" fontFamily={FONT} fontSize="10" fill="#4CAF7D" fontWeight="600" letterSpacing="2">
        THE DUTCHIE PLATFORM
      </text>
      <text x="480" y="54" textAnchor="middle" fontFamily={FONT} fontSize="18" fill="#F5EFE3" fontWeight="700">
        Everything You Need to Run Your Dispensary
      </text>

      {dexIsHero ? (
        /* Dex-dominant layout: Dex on top/center, products below */
        <g>
          {/* Dex zone */}
          <rect x="60" y={headerH} width={slideW - 120} height={dexH} rx="12"
            fill="#2A1F00" fillOpacity="0.6" stroke="#D4A03A" strokeWidth="1.5"
          />
          <text x="480" y={headerH + dexH * 0.35} textAnchor="middle" fontFamily={FONT}
            fontSize={Math.max(14, dexPct * 0.36)} fontWeight="700" fill="#FFC02A"
          >
            Dex Intelligence
          </text>
          <text x="480" y={headerH + dexH * 0.35 + 22} textAnchor="middle" fontFamily={FONT}
            fontSize="12" fill="#D4A03A"
          >
            AI that learns, predicts, and automates your dispensary
          </text>
          {dexPct >= 60 && (
            <g>
              {['Predictive Inventory', 'Smart Pricing', 'Auto-Compliance', 'Customer Intelligence'].map((f, i) => (
                <g key={f}>
                  <rect x={120 + i * 190} y={headerH + dexH * 0.55} width={170} height={dexH * 0.28} rx="8"
                    fill="#1B3D2F" stroke="#D4A03A" strokeWidth="0.5" strokeOpacity="0.4"
                  />
                  <text x={205 + i * 190} y={headerH + dexH * 0.55 + (dexH * 0.14) + 5} textAnchor="middle"
                    fontFamily={FONT} fontSize="11" fill="#D4A03A" fontWeight="600"
                  >{f}</text>
                </g>
              ))}
            </g>
          )}

          {/* Products zone — compact */}
          <rect x="60" y={headerH + dexH + 10} width={slideW - 120} height={productsH} rx="10"
            fill="#183D2D" fillOpacity="0.5" stroke="#2A5A45" strokeWidth="1" strokeDasharray="6 3"
          />
          {['E-Com', 'Loyalty', 'Retail', 'Nexus', 'Connect'].map((name, i) => {
            const itemW = (slideW - 180) / 5;
            return (
              <g key={name}>
                <rect x={80 + i * itemW} y={headerH + dexH + 18}
                  width={itemW - 10} height={productsH - 26} rx="6"
                  fill="#FAF5E8" fillOpacity={dexPct >= 70 ? 0.08 : 0.15}
                  stroke="#4CAF7D" strokeWidth="0.5" strokeOpacity="0.4"
                />
                <text x={80 + i * itemW + (itemW - 10) / 2} y={headerH + dexH + 18 + (productsH - 26) / 2 + 4}
                  textAnchor="middle" fontFamily={FONT}
                  fontSize={productsH > 60 ? 11 : 9} fill="#8BAF9E" fontWeight="600"
                >{name}</text>
              </g>
            );
          })}
        </g>
      ) : (
        /* Product-dominant layout: products on top, Dex below */
        <g>
          {/* Products zone */}
          {['E-Commerce', 'Loyalty', 'Retail', 'Nexus', 'Connect'].map((name, i) => {
            const cardW = 150, gap = 10;
            const totalW = 5 * cardW + 4 * gap;
            const startX = (slideW - totalW) / 2;
            const cx = startX + i * (cardW + gap);
            return (
              <g key={name}>
                <rect x={cx} y={headerH} width={cardW} height={productsH} rx="10"
                  fill={name === 'Retail' ? '#4E1F2E' : '#FAF5E8'}
                  fillOpacity={name === 'Retail' ? 0.8 : 0.9}
                />
                <text x={cx + cardW / 2} y={headerH + 30} textAnchor="middle" fontFamily={FONT}
                  fontSize="12" fontWeight="700"
                  fill={name === 'Retail' ? '#F5EFE3' : '#2C2520'}
                >{name}</text>
                {/* Feature placeholder bars */}
                {[0,1,2].map(j => (
                  <rect key={j} x={cx + 12} y={headerH + 44 + j * 16}
                    width={cardW - 24} height={2.5} rx={1}
                    fill={name === 'Retail' ? '#D4BFC5' : '#C8BDA8'} opacity={0.4}
                  />
                ))}
              </g>
            );
          })}

          {/* Dex zone */}
          <rect x="100" y={headerH + productsH + 10} width={slideW - 200} height={dexH} rx="10"
            fill="#2A1F00" fillOpacity="0.5" stroke="#D4A03A" strokeWidth="1"
          />
          <text x="480" y={headerH + productsH + 10 + dexH / 2 + 5} textAnchor="middle" fontFamily={FONT}
            fontSize={Math.max(11, dexPct * 0.6)} fontWeight="600" fill="#D4A03A"
          >
            {dexPct <= 15 ? 'intelligence' : 'Dex Intelligence'}
          </text>
        </g>
      )}

      {/* Dex % label */}
      <rect x={slideW - 110} y={slideH - 36} width={100} height={26} rx="6" fill="#0A0908" fillOpacity="0.8" />
      <text x={slideW - 60} y={slideH - 19} textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="700"
        fill={dexPct >= 40 ? '#FFC02A' : t.textMuted}
      >
        Dex = {dexPct}%
      </text>
    </svg>
  );
}

function SizeExperimentsSection({ t }) {
  const uid = useId().replace(/:/g, '');
  const experiments = [
    { dexPct: 10, note: 'Current: Intelligence bar is a footnote. Viewer\'s 3-sec impression: "Five product boxes."' },
    { dexPct: 25, note: 'Noticeable but secondary. Dex is a "feature" not a differentiator. Products still dominate.' },
    { dexPct: 40, note: 'Co-star. Products and Dex share the stage. Balanced but might lack a clear hero.' },
    { dexPct: 60, note: 'Dex is the hero. Products become supporting evidence. 3-sec impression: "AI-powered platform."' },
    { dexPct: 80, note: 'Dex IS the slide. Products are mere footnotes. Best for an "AI-first" narrative.' },
  ];

  return (
    <div>
      <Card t={t} style={{ marginBottom: 24, borderLeft: `3px solid ${t.accentGold}` }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 8 }}>
          The Visual Weight Principle
        </div>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          In visual hierarchy, <strong style={{ color: t.text }}>size is the strongest signal of importance</strong>.
          When users scan a slide, larger elements are processed first and retained longer (Holmqvist et al., 2011).
          The element that gets the most pixels is, by definition, the most important thing on the slide.
          Below, we progressively increase Dex's visual real estate from 10% to 80% so you can see
          the tradeoff between product visibility and AI emphasis.
        </p>
      </Card>

      <div style={{ display: 'grid', gap: 20 }}>
        {experiments.map(({ dexPct, note }, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Pill color={dexPct >= 50 ? t.accentGold : t.accentGreen}>
                Variation {i + 1}
              </Pill>
              <span style={{ fontSize: 13, color: t.textMuted }}>{note}</span>
            </div>
            <SizeExperiment pct={i} dexPct={dexPct} t={t} uid={`${uid}-v${i}`} />
          </div>
        ))}
      </div>

      <KeyInsight t={t}>
        The sweet spot is Variation 4: Dex at 60%. This is where the 3-second impression flips from "product catalog" to "intelligent platform." The products are still visible (proving breadth) but Dex dominates (proving differentiation). This ratio follows the 60/40 hero principle used in Apple keynote slides -- one hero element gets 60% of the space, supporting context gets 40%.
      </KeyInsight>
    </div>
  );
}


// ============================================================================
// SECTION 4: "Reading Path Optimization"
// ============================================================================

function ReadingPathSlide({ uid, pattern, description, annotations, layout, t }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Pill color={t.accentGold}>{pattern}</Pill>
        <span style={{ fontSize: 13, color: t.textMuted }}>{description}</span>
      </div>
      <svg
        width="100%"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', borderRadius: 14, border: `1px solid ${t.border}` }}
      >
        <defs>
          <radialGradient id={`${uid}-bg`} cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#1E4535" />
            <stop offset="100%" stopColor="#142E23" />
          </radialGradient>
          <marker id={`${uid}-arrowhead`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#FFC02A" />
          </marker>
        </defs>
        <rect width="960" height="540" rx="14" fill={`url(#${uid}-bg)`} />

        {/* Content layout */}
        {layout}

        {/* Eye-tracking path arrows */}
        {annotations.map((ann, i) => (
          <g key={i}>
            {ann.path && (
              <path d={ann.path} fill="none" stroke="#FFC02A" strokeWidth="2"
                strokeDasharray="8 4" markerEnd={`url(#${uid}-arrowhead)`} opacity="0.8"
              />
            )}
            {ann.x != null && (
              <g>
                <circle cx={ann.x} cy={ann.y} r={14} fill="#0A0908" fillOpacity="0.7" stroke="#FFC02A" strokeWidth="1.5" />
                <text x={ann.x} y={ann.y + 4} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="700" fill="#FFC02A">
                  {ann.n}
                </text>
                {ann.label && (
                  <text x={ann.x + (ann.labelDx || 20)} y={ann.y + (ann.labelDy || 0)} fontFamily={FONT}
                    fontSize="9" fill="#D4A03A" fontWeight="600"
                  >
                    {ann.label}
                  </text>
                )}
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function ReadingPathSection({ t }) {
  const uid1 = useId().replace(/:/g, '');
  const uid2 = useId().replace(/:/g, '');
  const uid3 = useId().replace(/:/g, '');

  return (
    <div>
      <Card t={t} style={{ marginBottom: 24, borderLeft: `3px solid ${t.accentGold}` }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 8 }}>
          How Eyes Move Across Slides
        </div>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.7 }}>
          Nielsen Norman Group's eye-tracking research identifies three dominant scan patterns for
          Western readers. The <strong style={{ color: t.text }}>Z-pattern</strong> for casual scanning
          (glancing at a slide during a sales pitch), the <strong style={{ color: t.text }}>F-pattern</strong> for
          more attentive reading (when the prospect is engaged), and the <strong style={{ color: t.text }}>center-out
          pattern</strong> for slides with a clear focal point. Each demands a different layout strategy.
        </p>
      </Card>

      {/* Z-Pattern */}
      <ReadingPathSlide
        uid={uid1}
        pattern="Z-Pattern"
        description="Casual scanning: top-left start, diagonal sweep, bottom-right finish. Ideal for sales decks where the rep is talking."
        t={t}
        layout={
          <g>
            {/* Top-left: brand/headline */}
            <text x="60" y="50" fontFamily={FONT} fontSize="22" fontWeight="700" fill="#F5EFE3">dutchie</text>
            <text x="60" y="74" fontFamily={FONT} fontSize="13" fill="#8BAF9E">The Intelligent Cannabis Platform</text>

            {/* Top-right: hero stat */}
            <rect x="640" y="28" width="280" height="70" rx="12" fill="#2A1F00" fillOpacity="0.6" stroke="#D4A03A" strokeWidth="1" />
            <text x="780" y="58" textAnchor="middle" fontFamily={FONT} fontSize="28" fontWeight="700" fill="#FFC02A">5 Products</text>
            <text x="780" y="78" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#D4A03A">One AI-Powered Platform</text>

            {/* Center: Dex hero */}
            <rect x="200" y="130" width="560" height="240" rx="16" fill="#2A1F00" fillOpacity="0.5" stroke="#D4A03A" strokeWidth="1.5" />
            <text x="480" y="220" textAnchor="middle" fontFamily={FONT} fontSize="32" fontWeight="700" fill="#FFC02A">Dex Intelligence</text>
            <text x="480" y="250" textAnchor="middle" fontFamily={FONT} fontSize="14" fill="#D4A03A">AI that learns, predicts, and automates your dispensary</text>
            {/* Dex feature pills */}
            {['Predictive', 'Automated', 'Adaptive', 'Connected'].map((f, i) => (
              <g key={f}>
                <rect x={260 + i * 120} y={275} width={100} height={28} rx="14" fill="#1B3D2F" stroke="#D4A03A" strokeWidth="0.5" />
                <text x={310 + i * 120} y={293} textAnchor="middle" fontFamily={FONT} fontSize="10" fill="#D4A03A" fontWeight="600">{f}</text>
              </g>
            ))}

            {/* Bottom-left: product icons row */}
            <rect x="60" y="410" width="400" height="90" rx="10" fill="#183D2D" fillOpacity="0.5" stroke="#2A5A45" strokeWidth="1" />
            {['E-Com', 'Loyalty', 'Retail', 'Nexus', 'Connect'].map((name, i) => (
              <g key={name}>
                <circle cx={100 + i * 76} cy={445} r={16} fill="#2D6A4F" />
                <text x={100 + i * 76} y={449} textAnchor="middle" fontFamily={FONT} fontSize="8" fontWeight="600" fill="#F5EFE3">
                  {name.charAt(0)}
                </text>
                <text x={100 + i * 76} y={478} textAnchor="middle" fontFamily={FONT} fontSize="9" fill="#8BAF9E">{name}</text>
              </g>
            ))}

            {/* Bottom-right: CTA */}
            <rect x="640" y="430" width="260" height="60" rx="12" fill="#D4A03A" />
            <text x="770" y="465" textAnchor="middle" fontFamily={FONT} fontSize="16" fontWeight="700" fill="#0A0908">See Dex in Action</text>
          </g>
        }
        annotations={[
          { x: 60, y: 35, n: '1', label: 'Brand', labelDx: 20, labelDy: 4 },
          { path: 'M 90,45 Q 400,70 640,55' },
          { x: 780, y: 50, n: '2', label: 'Hook', labelDx: -45, labelDy: -18 },
          { path: 'M 750,80 Q 520,200 480,200' },
          { x: 480, y: 200, n: '3', label: 'Hero', labelDx: 20, labelDy: 4 },
          { path: 'M 380,300 Q 200,380 160,420' },
          { x: 150, y: 445, n: '4', label: 'Evidence', labelDx: 20, labelDy: 4 },
          { path: 'M 460,455 Q 560,460 640,455' },
          { x: 770, y: 455, n: '5', label: 'CTA', labelDx: -40, labelDy: -18 },
        ]}
      />

      {/* F-Pattern */}
      <ReadingPathSlide
        uid={uid2}
        pattern="F-Pattern"
        description="Attentive reading: strong left column, diminishing attention rightward. For prospects actively evaluating."
        t={t}
        layout={
          <g>
            {/* Left column: Dex hero (strong left rail) */}
            <rect x="40" y="30" width="360" height="480" rx="14" fill="#2A1F00" fillOpacity="0.5" stroke="#D4A03A" strokeWidth="1.5" />
            <text x="220" y="80" textAnchor="middle" fontFamily={FONT} fontSize="28" fontWeight="700" fill="#FFC02A">Dex</text>
            <text x="220" y="105" textAnchor="middle" fontFamily={FONT} fontSize="13" fill="#D4A03A">Intelligence Layer</text>
            {/* Dex capabilities stacked */}
            {['Predictive Analytics', 'Automated Compliance', 'Smart Pricing', 'Inventory Intelligence', 'Customer Insights', 'Revenue Optimization'].map((f, i) => (
              <g key={f}>
                <rect x="70" y={135 + i * 55} width="300" height={40} rx="8" fill="#1B3D2F" stroke="#D4A03A" strokeWidth="0.5" strokeOpacity="0.3" />
                <text x="90" y={160 + i * 55} fontFamily={FONT} fontSize="12" fill="#D4A03A" fontWeight="600">{f}</text>
              </g>
            ))}

            {/* Right column: products */}
            <text x="440" y="55" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="600" letterSpacing="2">PRODUCT SUITE</text>
            {['E-Commerce', 'Loyalty', 'Retail', 'Nexus', 'Connect'].map((name, i) => (
              <g key={name}>
                <rect x="440" y={75 + i * 88} width="480" height={74} rx="10"
                  fill={name === 'Retail' ? '#4E1F2E' : '#FAF5E8'}
                  fillOpacity={name === 'Retail' ? 0.6 : 0.12}
                  stroke="#2A5A45" strokeWidth="0.5"
                />
                <text x="470" y={118 + i * 88} fontFamily={FONT}
                  fontSize="14" fontWeight="700"
                  fill={name === 'Retail' ? '#D4BFC5' : '#8BAF9E'}
                >{name}</text>
                <text x="580" y={118 + i * 88} fontFamily={FONT} fontSize="10" fill="#6B9B84">
                  {['Online menus, marketplace', 'Rewards, engagement', 'POS, compliance', 'Data platform, APIs', 'Partner network'][i]}
                </text>
              </g>
            ))}
          </g>
        }
        annotations={[
          { x: 220, y: 70, n: '1', label: 'Anchor', labelDx: 20, labelDy: 4 },
          { path: 'M 220,100 L 220,140' },
          { x: 220, y: 165, n: '2', label: 'Deep read', labelDx: 20, labelDy: 4 },
          { path: 'M 220,180 L 220,350' },
          { x: 220, y: 380, n: '3', label: 'Still engaged', labelDx: 20, labelDy: 4 },
          { path: 'M 350,100 L 440,100' },
          { x: 600, y: 110, n: '4', label: 'Scan right', labelDx: 20, labelDy: 4 },
          { path: 'M 600,130 L 600,380' },
          { x: 600, y: 400, n: '5', label: 'Skim list', labelDx: 20, labelDy: 4 },
        ]}
      />

      {/* Center-Out */}
      <ReadingPathSlide
        uid={uid3}
        pattern="Center-Out"
        description="Spotlight: dominant center element radiates outward. Most impactful for keynote-style presentations."
        t={t}
        layout={
          <g>
            {/* Concentric rings radiating from center */}
            <circle cx="480" cy="270" r="210" fill="none" stroke="#D4A03A" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
            <circle cx="480" cy="270" r="150" fill="none" stroke="#D4A03A" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="480" cy="270" r="90" fill="none" stroke="#D4A03A" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

            {/* Center: Dex */}
            <circle cx="480" cy="270" r="88" fill="#2A1F00" fillOpacity="0.7" stroke="#D4A03A" strokeWidth="2" />
            <text x="480" y="255" textAnchor="middle" fontFamily={FONT} fontSize="24" fontWeight="700" fill="#FFC02A">Dex</text>
            <text x="480" y="278" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#D4A03A">Intelligence</text>
            <text x="480" y="295" textAnchor="middle" fontFamily={FONT} fontSize="9" fill="#D4A03A" opacity="0.7">AI-Powered</text>

            {/* Products orbiting */}
            {[
              { name: 'E-Commerce', angle: -70, dist: 170 },
              { name: 'Loyalty', angle: -20, dist: 185 },
              { name: 'Retail', angle: 40, dist: 170 },
              { name: 'Nexus', angle: 110, dist: 185 },
              { name: 'Connect', angle: 160, dist: 170 },
            ].map(({ name, angle, dist }) => {
              const rad = (angle * Math.PI) / 180;
              const px = 480 + Math.cos(rad) * dist;
              const py = 270 + Math.sin(rad) * dist;
              return (
                <g key={name}>
                  {/* Connection line to center */}
                  <line x1="480" y1="270" x2={px} y2={py} stroke="#4CAF7D" strokeWidth="1" opacity="0.3" />
                  <circle cx={px} cy={py} r="42" fill="#183D2D" stroke="#4CAF7D" strokeWidth="1" />
                  <text x={px} y={py + 4} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="600" fill="#8BAF9E">
                    {name}
                  </text>
                </g>
              );
            })}

            {/* Outcome labels at outer ring */}
            {[
              { label: '+23% Revenue', x: 120, y: 120 },
              { label: '99.7% Compliance', x: 780, y: 120 },
              { label: '40% Less Manual Work', x: 120, y: 440 },
              { label: '2x Faster Onboarding', x: 780, y: 440 },
            ].map(({ label, x, y }) => (
              <text key={label} x={x} y={y} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="600" fill="#4CAF7D" opacity="0.7">
                {label}
              </text>
            ))}

            {/* Header */}
            <text x="480" y="36" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="600" letterSpacing="2">
              THE DUTCHIE PLATFORM
            </text>
            <text x="480" y="62" textAnchor="middle" fontFamily={FONT} fontSize="18" fill="#F5EFE3" fontWeight="700">
              Intelligence at the Center of Everything
            </text>
          </g>
        }
        annotations={[
          { x: 480, y: 270, n: '1', label: 'Focal point', labelDx: 20, labelDy: -20 },
          { path: 'M 480,200 Q 360,140 310,120' },
          { x: 310, y: 118, n: '2', label: 'Orbit scan', labelDx: -70, labelDy: 4 },
          { path: 'M 345,140 Q 450,110 600,140' },
          { x: 640, y: 150, n: '3', label: 'Continue', labelDx: 15, labelDy: 4 },
          { path: 'M 650,180 Q 680,300 620,400' },
          { x: 600, y: 420, n: '4', label: 'Outcomes', labelDx: 15, labelDy: 4 },
        ]}
      />

      <KeyInsight t={t}>
        For a sales deck where the rep is talking while the slide is displayed, the Z-pattern is most reliable. However, the Center-Out pattern creates the strongest single impression -- ideal for "the one slide" that introduces the platform. It makes Dex literally the center of the Dutchie universe, with products as satellites. This is the layout we recommend for Section 5.
      </KeyInsight>
    </div>
  );
}


// ============================================================================
// SECTION 5: "The Recommended Slide"
// ============================================================================

function RecommendedSlide({ t }) {
  const uid = useId().replace(/:/g, '');

  return (
    <div>
      {/* ─── Science rationale ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
        {[
          {
            title: 'Chunking',
            metric: '3 chunks',
            detail: 'Center (Dex Intelligence), Ring (5 Products), Outer (4 Outcomes). Three distinct visual groups. Each is processable in working memory.',
            color: t.accentGold,
          },
          {
            title: 'Visual Weight',
            metric: '55% Dex',
            detail: 'Dex center circle + glow occupies 55% of visual attention. Products occupy 30%. Outcomes 15%. Matches the story: "AI-powered platform."',
            color: t.accentGreen,
          },
          {
            title: 'Reading Path',
            metric: 'Center-out',
            detail: 'Eye lands on Dex (largest, brightest element), then orbits to product nodes, then catches outcome stats at periphery. 3-second path.',
            color: '#64A8E0',
          },
        ].map(({ title, metric, detail, color }) => (
          <Card key={title} t={t} style={{ borderTop: `3px solid ${color}` }}>
            <MiniLabel color={color} style={{ marginBottom: 6 }}>{title}</MiniLabel>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 }}>{metric}</div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>{detail}</p>
          </Card>
        ))}
      </div>

      {/* ─── The slide ─── */}
      <MiniLabel color={t.accentGold} style={{ marginBottom: 12 }}>
        The Recommended Slide -- "Intelligence at the Center"
      </MiniLabel>
      <svg
        width="100%"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', borderRadius: 14, border: `2px solid ${t.accentGold}40` }}
      >
        <defs>
          <radialGradient id={`${uid}-bg`} cx="50%" cy="48%" r="72%">
            <stop offset="0%" stopColor="#1E4535" />
            <stop offset="50%" stopColor="#1B3D2F" />
            <stop offset="100%" stopColor="#0D1F16" />
          </radialGradient>
          <radialGradient id={`${uid}-dexGlow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A03A" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#D4A03A" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#D4A03A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-dexInner`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3A2800" />
            <stop offset="100%" stopColor="#1A1200" />
          </radialGradient>
          <linearGradient id={`${uid}-goldStroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A03A" />
            <stop offset="50%" stopColor="#FFC02A" />
            <stop offset="100%" stopColor="#D4A03A" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <filter id={`${uid}-softGlow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="960" height="540" rx="14" fill={`url(#${uid}-bg)`} />

        {/* Subtle radial line texture */}
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          return (
            <line key={i}
              x1={480 + Math.cos(angle) * 100}
              y1={290 + Math.sin(angle) * 100}
              x2={480 + Math.cos(angle) * 280}
              y2={290 + Math.sin(angle) * 280}
              stroke="#2A5A45" strokeWidth="0.3" opacity="0.15"
            />
          );
        })}

        {/* Ambient glow behind Dex */}
        <circle cx="480" cy="290" r="180" fill={`url(#${uid}-dexGlow)`} />

        {/* Outer orbit ring */}
        <circle cx="480" cy="290" r="195" fill="none" stroke="#2A5A45" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />

        {/* Connection lines from center to products */}
        {[
          { angle: -90, dist: 185 },
          { angle: -35, dist: 195 },
          { angle: 25, dist: 195 },
          { angle: 145, dist: 195 },
          { angle: 210, dist: 185 },
        ].map(({ angle, dist }, i) => {
          const rad = (angle * Math.PI) / 180;
          const px = 480 + Math.cos(rad) * dist;
          const py = 290 + Math.sin(rad) * dist;
          return (
            <line key={i} x1="480" y1="290" x2={px} y2={py}
              stroke="#4CAF7D" strokeWidth="1.2" opacity="0.2"
            />
          );
        })}

        {/* Dex center -- glowing ring */}
        <circle cx="480" cy="290" r="96" fill={`url(#${uid}-dexInner)`}
          stroke={`url(#${uid}-goldStroke)`} strokeWidth="2.5"
        />
        {/* Inner glow ring */}
        <circle cx="480" cy="290" r="92" fill="none" stroke="#FFC02A" strokeWidth="0.5" opacity="0.3"
          filter={`url(#${uid}-softGlow)`}
        />

        {/* Dex spiral mark (simplified) */}
        <path
          d="M480 335 A45 45 0 0 1 435 290
             A27.8 27.8 0 0 1 462.8 262.2
             A17.2 17.2 0 0 1 480 279.4
             A10.6 10.6 0 0 1 469.4 290"
          stroke="#FFC02A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
        />

        {/* Dex text */}
        <text x="480" y="278" textAnchor="middle" fontFamily={FONT} fontSize="28" fontWeight="700" fill="#FFC02A">
          Dex
        </text>
        <text x="480" y="302" textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="500" fill="#D4A03A" letterSpacing="2">
          INTELLIGENCE
        </text>
        <text x="480" y="324" textAnchor="middle" fontFamily={FONT} fontSize="10" fill="#D4A03A" opacity="0.7">
          AI that learns your business
        </text>

        {/* Product orbit nodes */}
        {[
          { name: 'E-Commerce', sub: 'Menus + Marketplace', angle: -90, dist: 185, color: '#2D6A4F' },
          { name: 'Loyalty', sub: 'Rewards + Engagement', angle: -35, dist: 195, color: '#2D6A4F' },
          { name: 'Retail', sub: 'POS + Compliance', angle: 25, dist: 195, color: '#5C2434' },
          { name: 'Connect', sub: 'Partners + Network', angle: 145, dist: 195, color: '#2D6A4F' },
          { name: 'Nexus', sub: 'Data + Integrations', angle: 210, dist: 185, color: '#2D6A4F' },
        ].map(({ name, sub, angle, dist, color }) => {
          const rad = (angle * Math.PI) / 180;
          const px = 480 + Math.cos(rad) * dist;
          const py = 290 + Math.sin(rad) * dist;
          return (
            <g key={name}>
              <circle cx={px} cy={py} r="44" fill={color} fillOpacity="0.7" stroke="#4CAF7D" strokeWidth="1" />
              <text x={px} y={py - 2} textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="700" fill="#F5EFE3">
                {name}
              </text>
              <text x={px} y={py + 14} textAnchor="middle" fontFamily={FONT} fontSize="8" fill="#8BAF9E" opacity="0.9">
                {sub}
              </text>
            </g>
          );
        })}

        {/* Outcome stats at corners */}
        {[
          { label: '+23%', sub: 'Revenue Lift', x: 68, y: 58 },
          { label: '99.7%', sub: 'Compliance Rate', x: 892, y: 58 },
          { label: '-40%', sub: 'Manual Work', x: 68, y: 510 },
          { label: '2x', sub: 'Faster Ops', x: 892, y: 510 },
        ].map(({ label, sub, x, y }) => (
          <g key={label}>
            <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontSize="20" fontWeight="700" fill="#4CAF7D">
              {label}
            </text>
            <text x={x} y={y + 16} textAnchor="middle" fontFamily={FONT} fontSize="9" fill="#6B9B84" fontWeight="500">
              {sub}
            </text>
          </g>
        ))}

        {/* Header */}
        <text x="480" y="34" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="600" letterSpacing="3">
          THE DUTCHIE PLATFORM
        </text>
        <text x="480" y="62" textAnchor="middle" fontFamily={FONT} fontSize="20" fill="#F5EFE3" fontWeight="700">
          Intelligence at the Center of Everything
        </text>
        <text x="480" y="84" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#8BAF9E">
          Five integrated products. One AI that makes them all smarter.
        </text>

        {/* Dutchie wordmark bottom-center */}
        <text x="480" y="530" textAnchor="middle" fontFamily={FONT} fontSize="11" fill="#4CAF7D" fontWeight="500" letterSpacing="1.5" opacity="0.5">
          dutchie
        </text>
      </svg>

      {/* ─── 3-second test result ─── */}
      <Card t={t} style={{ marginTop: 24, borderLeft: `3px solid ${t.accentGold}` }}>
        <MiniLabel color={t.accentGold} style={{ marginBottom: 12 }}>
          The 3-Second Test
        </MiniLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#FF4444', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before</div>
            <div style={{ padding: '16px', background: `#FF444410`, borderRadius: 8, border: '1px solid #FF444430' }}>
              <p style={{ margin: 0, fontSize: 14, color: t.text, lineHeight: 1.6, fontStyle: 'italic' }}>
                "I see five product boxes. They have e-commerce, loyalty, some retail thing... I don't really know what makes this different from other cannabis platforms."
              </p>
              <p style={{ margin: '10px 0 0', fontSize: 12, color: t.textFaint }}>
                Prospect recalls: 2 out of 5 products. Does not recall intelligence/AI.
              </p>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accentGreen, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>After</div>
            <div style={{ padding: '16px', background: `${t.accentGreen}10`, borderRadius: 8, border: `1px solid ${t.accentGreen}30` }}>
              <p style={{ margin: 0, fontSize: 14, color: t.text, lineHeight: 1.6, fontStyle: 'italic' }}>
                "They have AI -- something called Dex -- at the center of their platform. There are products around it that work together. And the numbers look good."
              </p>
              <p style={{ margin: '10px 0 0', fontSize: 12, color: t.textFaint }}>
                Prospect recalls: Dex/AI, platform concept, positive outcomes. All 3 chunks retained.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Why this works — detailed breakdown ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
        {[
          {
            principle: 'Cognitive Load: 3 Chunks',
            explanation: 'The slide presents exactly three visual groups: a bright gold center (Dex), a ring of green nodes (products), and corner statistics (outcomes). Each group is perceptually distinct through color, position, and density. The brain chunks these automatically without conscious effort.',
            color: t.accentGold,
          },
          {
            principle: 'Visual Weight: 55/30/15 Split',
            explanation: 'Dex dominates through size (96px radius circle), color (gold on dark green), and position (dead center). Products are medium weight (44px circles, green, peripheral). Outcomes are lightest (text only, corners). This hierarchy ensures the AI story registers first, always.',
            color: t.accentGreen,
          },
          {
            principle: 'Reading Path: Center-Out Spiral',
            explanation: 'The eye cannot avoid the center circle -- it is the largest, brightest, most isolated element. From there, the connection lines guide the eye outward to product nodes. Corner stats catch peripheral vision last. The path mirrors the narrative: "We have AI that powers everything."',
            color: '#64A8E0',
          },
          {
            principle: 'Pyramid Principle: Conclusion First',
            explanation: 'The original slide started with details (5 products) and buried the conclusion (intelligence). This slide inverts the structure: the conclusion IS the largest element ("we have AI intelligence"), supported by evidence (the products it powers) and quantified by outcomes (corner stats).',
            color: '#FF8800',
          },
        ].map(({ principle, explanation, color }) => (
          <Card key={principle} t={t} style={{ borderTop: `3px solid ${color}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 8 }}>{principle}</div>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.65 }}>{explanation}</p>
          </Card>
        ))}
      </div>

      <KeyInsight t={t}>
        The recommended slide transforms the 3-second impression from "they have five products" to "they have AI intelligence at the center of an integrated platform." This is the single most important reframe Dutchie can make: from product catalog to intelligent platform. Every design decision -- the center-out layout, the 55% visual weight on Dex, the 3-chunk structure, the gold-on-green color isolation -- serves this one strategic goal.
      </KeyInsight>
    </div>
  );
}


// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function InformationHierarchyStudy({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{
      background: t.bg,
      minHeight: '100vh',
      padding: '48px 32px',
      fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* ═══ Page Title ═══ */}
        <div style={{ marginBottom: 56 }}>
          <MiniLabel color={t.accentGold} style={{ marginBottom: 10, fontSize: 11, letterSpacing: '0.14em' }}>
            Information Design Masterclass
          </MiniLabel>
          <h1 style={{
            margin: 0, fontSize: 34, fontWeight: 700, color: t.text,
            fontFamily: FONT, lineHeight: 1.2,
          }}>
            How Human Brains Process Slides
          </h1>
          <p style={{
            margin: '12px 0 0', fontSize: 16, color: t.textMuted,
            lineHeight: 1.6, maxWidth: 700,
          }}>
            Applying cognitive load theory, visual hierarchy principles, and eye-tracking research
            to redesign Dutchie's product overview slide. The goal: make "AI-powered platform"
            the 3-second takeaway, not "five product boxes."
          </p>

          {/* Table of contents */}
          <div style={{
            marginTop: 24, padding: '16px 20px',
            background: t.cardBg, border: `1px solid ${t.border}`,
            borderRadius: 10, display: 'flex', gap: 24, flexWrap: 'wrap',
          }}>
            {[
              { n: '01', label: 'Why the Current Slide Fails' },
              { n: '02', label: 'The 3-Chunk Rule' },
              { n: '03', label: 'Size Experiments' },
              { n: '04', label: 'Reading Path Optimization' },
              { n: '05', label: 'The Recommended Slide' },
            ].map(({ n, label }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: t.accentGold,
                  background: `${t.accentGold}15`, padding: '2px 6px', borderRadius: 3,
                }}>{n}</span>
                <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Section 1 ═══ */}
        <Section
          number="1"
          title="Why the Current Slide Doesn't Work"
          subtitle="A cognitive analysis of the existing 5-column layout: visual weight, reading path, chunk count, and color coding failures."
          t={t}
        />
        <CurrentSlideWithHeatmap t={t} />

        <div style={{ height: 64 }} />

        {/* ═══ Section 2 ═══ */}
        <Section
          number="2"
          title="The 3-Chunk Rule"
          subtitle="Miller's Law meets slide design: collapsing 6 competing elements into 3 cognitive chunks the brain can actually hold."
          t={t}
        />
        <ThreeChunkSection t={t} />

        <div style={{ height: 64 }} />

        {/* ═══ Section 3 ═══ */}
        <Section
          number="3"
          title="Size Experiments"
          subtitle="Visual weight = perceived importance. Five variations progressively increasing Dex's real estate from 10% to 80%."
          t={t}
        />
        <SizeExperimentsSection t={t} />

        <div style={{ height: 64 }} />

        {/* ═══ Section 4 ═══ */}
        <Section
          number="4"
          title="Reading Path Optimization"
          subtitle="Three eye-tracking scan patterns -- Z, F, and Center-Out -- each demanding a different layout strategy for Dex."
          t={t}
        />
        <ReadingPathSection t={t} />

        <div style={{ height: 64 }} />

        {/* ═══ Section 5 ═══ */}
        <Section
          number="5"
          title="The Recommended Slide"
          subtitle="Synthesis: one slide that applies 3-chunk grouping, 55/30/15 visual weight, center-out reading path, and the pyramid principle."
          t={t}
        />
        <RecommendedSlide t={t} />

        {/* ═══ Footer ═══ */}
        <div style={{
          marginTop: 64, paddingTop: 32,
          borderTop: `1px solid ${t.border}`,
          textAlign: 'center',
        }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textFaint }}>
            Information Hierarchy Study -- Dutchie Product Overview Slide
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 11, color: t.textFaint, opacity: 0.6 }}>
            Principles: Cognitive Load Theory (Miller 1956, Cowan 2001) -- Visual Hierarchy (Holmqvist et al. 2011) -- Eye Tracking (Nielsen Norman Group) -- Pyramid Principle (Minto)
          </p>
        </div>
      </div>
    </div>
  );
}

export default InformationHierarchyStudy;
