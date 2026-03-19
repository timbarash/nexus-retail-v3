import React from 'react';

// ============================================================================
// SalesDeckIntegration — SVG-based sales deck recreation
// Each slide is rendered as a single inline SVG with precise coordinate-based
// positioning. This approach provides design-tool-level fidelity without
// relying on CSS flexbox or auto-positioning.
//
// Export: SalesDeckIntegration({ theme = 'dark' })
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
    accentGoldLighter: '#FFD666',
    accentGreen: '#00C27C'
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
    accentGoldLighter: '#D4A03A',
    accentGreen: '#047857'
  }
};

// ============================================================================
// Shared SVG Defs — gradients, filters, patterns for forest-green slides
// ============================================================================

function SlideDefsStandard({ id }) {
  return (
    <defs>
      {/* Main background radial gradient — forest green */}
      <radialGradient id={`${id}-bgGrad`} cx="50%" cy="45%" r="75%" fx="50%" fy="40%">
        <stop offset="0%" stopColor="#1E4535" />
        <stop offset="40%" stopColor="#1B3D2F" />
        <stop offset="75%" stopColor="#173628" />
        <stop offset="100%" stopColor="#142E23" />
      </radialGradient>

      {/* Secondary vignette overlay gradient */}
      <radialGradient id={`${id}-vignette`} cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#1E4535" stopOpacity="0" />
        <stop offset="100%" stopColor="#0D1F16" stopOpacity="0.3" />
      </radialGradient>

      {/* Rainbow gradient for intelligence bar — muted spectral */}
      <linearGradient id={`${id}-rainbow`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C0504D" />
        <stop offset="12%" stopColor="#D4834D" />
        <stop offset="25%" stopColor="#D4B04D" />
        <stop offset="37%" stopColor="#D4C04D" />
        <stop offset="50%" stopColor="#5DA06B" />
        <stop offset="62%" stopColor="#4D8EC0" />
        <stop offset="75%" stopColor="#4D7EC0" />
        <stop offset="87%" stopColor="#7B5DA0" />
        <stop offset="100%" stopColor="#A05D8B" />
      </linearGradient>

      {/* Card drop shadow filter — slightly larger */}
      <filter id={`${id}-cardShadow`} x="-6%" y="-4%" width="112%" height="114%">
        <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#0A1F15" floodOpacity="0.35" />
      </filter>

      {/* Softer glow filter for highlighted elements */}
      <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>

      {/* Gold gradient for badges */}
      <linearGradient id={`${id}-goldGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A03A" />
        <stop offset="50%" stopColor="#FFC02A" />
        <stop offset="100%" stopColor="#D4A03A" />
      </linearGradient>

      {/* Container panel gradient — slightly lighter than bg */}
      <linearGradient id={`${id}-panelGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#183D2D" />
        <stop offset="100%" stopColor="#143028" />
      </linearGradient>

      {/* Subtle horizontal line pattern for texture */}
      <pattern id={`${id}-lineTexture`} x="0" y="0" width="960" height="4" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="960" y2="0" stroke="#1E4535" strokeWidth="0.5" opacity="0.15" />
      </pattern>

      {/* Card fill gradients — cream cards */}
      <linearGradient id={`${id}-creamCard`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FAF5E8" />
        <stop offset="100%" stopColor="#EDE5D4" />
      </linearGradient>

      {/* Card fill gradient — retail burgundy */}
      <linearGradient id={`${id}-retailCard`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6B2D3E" />
        <stop offset="100%" stopColor="#4E1F2E" />
      </linearGradient>

      {/* Card fill gradient — Dex gold */}
      <linearGradient id={`${id}-dexCard`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4A83A" />
        <stop offset="100%" stopColor="#B08520" />
      </linearGradient>

      {/* Icon ring glow filter */}
      <filter id={`${id}-iconRing`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ============================================================================
// Corner Leaf Decorations — organic botanical accents
// ============================================================================

function CornerLeaves() {
  return (
    <g>
      {/* ---- Bottom-left leaf cluster ---- */}
      {/* Primary leaf */}
      <path
        d="M0,540 C20,518 15,492 8,475 C22,488 38,504 52,514 C36,522 18,536 0,540Z"
        fill="#1E4535" opacity="0.35"
      />
      {/* Secondary leaf (overlapping, slightly rotated) */}
      <path
        d="M0,525 C16,512 13,492 7,480 C16,489 30,500 40,508 C30,514 15,525 0,530Z"
        fill="#1E4535" opacity="0.22"
      />
      {/* Tertiary small accent leaf */}
      <path
        d="M5,540 C12,532 10,520 6,512 C12,516 20,524 26,530 C20,534 12,539 5,540Z"
        fill="#1E4535" opacity="0.16"
      />
      {/* Stem line */}
      <line x1="0" y1="538" x2="30" y2="510" stroke="#1E4535" strokeWidth="0.5" opacity="0.2" />

      {/* ---- Top-right leaf cluster ---- */}
      {/* Primary leaf */}
      <path
        d="M960,0 C940,22 944,48 952,65 C938,52 922,36 908,26 C924,18 942,4 960,0Z"
        fill="#1E4535" opacity="0.35"
      />
      {/* Secondary leaf */}
      <path
        d="M960,15 C946,28 948,48 954,60 C944,52 932,42 924,36 C932,30 946,18 960,12Z"
        fill="#1E4535" opacity="0.22"
      />
      {/* Tertiary small accent */}
      <path
        d="M955,0 C948,8 950,20 954,28 C948,24 940,16 934,10 C940,6 948,1 955,0Z"
        fill="#1E4535" opacity="0.16"
      />
      {/* Stem line */}
      <line x1="960" y1="2" x2="930" y2="30" stroke="#1E4535" strokeWidth="0.5" opacity="0.2" />

      {/* ---- Top-left subtle accent ---- */}
      <path
        d="M0,0 C16,14 13,32 7,44 C15,34 28,24 38,18 C28,12 15,3 0,0Z"
        fill="#1E4535" opacity="0.16"
      />

      {/* ---- Bottom-right subtle accent ---- */}
      <path
        d="M960,540 C944,526 947,508 953,496 C945,506 933,516 923,522 C933,528 944,537 960,540Z"
        fill="#1E4535" opacity="0.16"
      />

      {/* ---- Tiny decorative dots near corners ---- */}
      <circle cx="20" cy="520" r="1.5" fill="#2A5A45" opacity="0.25" />
      <circle cx="35" cy="528" r="1" fill="#2A5A45" opacity="0.2" />
      <circle cx="12" cy="530" r="0.8" fill="#2A5A45" opacity="0.15" />
      <circle cx="940" cy="20" r="1.5" fill="#2A5A45" opacity="0.25" />
      <circle cx="925" cy="12" r="1" fill="#2A5A45" opacity="0.2" />
      <circle cx="948" cy="10" r="0.8" fill="#2A5A45" opacity="0.15" />
      {/* Additional decorative dots */}
      <circle cx="42" cy="535" r="0.6" fill="#2A5A45" opacity="0.12" />
      <circle cx="918" cy="6" r="0.6" fill="#2A5A45" opacity="0.12" />
      <circle cx="950" cy="530" r="0.7" fill="#2A5A45" opacity="0.1" />
    </g>
  );
}

// ============================================================================
// Icon Components — refined SVG paths for each product
// ============================================================================

function IconEcommerce({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* Shopping bag body */}
      <rect
        x={cx - 9} y={cy - 3}
        width="18" height="14"
        rx="2.5" ry="2.5"
        fill="none" stroke={iconColor} strokeWidth="1.8"
      />
      {/* Bag handle arc */}
      <path
        d={`M${cx - 5},${cy - 3} L${cx - 5},${cy - 8} A5,5 0 0,1 ${cx + 5},${cy - 8} L${cx + 5},${cy - 3}`}
        fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Small horizontal accent line inside bag */}
      <line
        x1={cx - 5} y1={cy + 3}
        x2={cx + 5} y2={cy + 3}
        stroke={iconColor} strokeWidth="0.8" opacity="0.5"
      />
    </g>
  );
}

function IconLoyalty({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* Heart shape */}
      <path
        d={`M${cx},${cy + 8}
            C${cx - 15},${cy - 3} ${cx - 8},${cy - 14} ${cx},${cy - 5}
            C${cx + 8},${cy - 14} ${cx + 15},${cy - 3} ${cx},${cy + 8}Z`}
        fill="none" stroke={iconColor} strokeWidth="1.6"
        strokeLinejoin="round" strokeLinecap="round"
      />
    </g>
  );
}

function IconRetail({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* Register body */}
      <rect
        x={cx - 8} y={cy - 7}
        width="16" height="12"
        rx="1.5" ry="1.5"
        fill="none" stroke={iconColor} strokeWidth="1.6"
      />
      {/* Screen lines */}
      <line x1={cx - 5} y1={cy - 4} x2={cx + 5} y2={cy - 4} stroke={iconColor} strokeWidth="1.2" />
      <line x1={cx - 5} y1={cy - 1} x2={cx + 3} y2={cy - 1} stroke={iconColor} strokeWidth="1.0" />
      {/* Receipt hanging from bottom */}
      <path
        d={`M${cx - 4},${cy + 5} L${cx - 4},${cy + 10} L${cx},${cy + 8.5} L${cx + 4},${cy + 10} L${cx + 4},${cy + 5}`}
        fill="none" stroke={iconColor} strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  );
}

function IconNexus({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* Network: 4 corner dots with connecting lines forming a grid + diagonals */}
      {/* Connecting lines first (behind dots) */}
      <line x1={cx - 7} y1={cy - 7} x2={cx + 7} y2={cy - 7} stroke={iconColor} strokeWidth="1" />
      <line x1={cx - 7} y1={cy - 7} x2={cx - 7} y2={cy + 7} stroke={iconColor} strokeWidth="1" />
      <line x1={cx + 7} y1={cy - 7} x2={cx + 7} y2={cy + 7} stroke={iconColor} strokeWidth="1" />
      <line x1={cx - 7} y1={cy + 7} x2={cx + 7} y2={cy + 7} stroke={iconColor} strokeWidth="1" />
      {/* Diagonal cross lines */}
      <line x1={cx - 7} y1={cy - 7} x2={cx + 7} y2={cy + 7} stroke={iconColor} strokeWidth="0.8" opacity="0.5" />
      <line x1={cx + 7} y1={cy - 7} x2={cx - 7} y2={cy + 7} stroke={iconColor} strokeWidth="0.8" opacity="0.5" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="1.8" fill={iconColor} opacity="0.6" />
      {/* Corner dots */}
      <circle cx={cx - 7} cy={cy - 7} r="2.5" fill={iconColor} />
      <circle cx={cx + 7} cy={cy - 7} r="2.5" fill={iconColor} />
      <circle cx={cx - 7} cy={cy + 7} r="2.5" fill={iconColor} />
      <circle cx={cx + 7} cy={cy + 7} r="2.5" fill={iconColor} />
    </g>
  );
}

function IconConnect({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* Two interlocking chain links (ellipses at angles) */}
      <ellipse
        cx={cx - 3} cy={cy}
        rx="6" ry="8.5"
        fill="none" stroke={iconColor} strokeWidth="1.6"
        transform={`rotate(-20,${cx - 3},${cy})`}
      />
      <ellipse
        cx={cx + 3} cy={cy}
        rx="6" ry="8.5"
        fill="none" stroke={iconColor} strokeWidth="1.6"
        transform={`rotate(20,${cx + 3},${cy})`}
      />
    </g>
  );
}

function IconDex({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Outer ring glow */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill="none" stroke={circleFill} strokeWidth="0.5" opacity="0.15" />
      {/* 4-pointed star / sparkle */}
      <path
        d={`M${cx},${cy - 9}
            L${cx + 3},${cy - 3}
            L${cx + 9},${cy}
            L${cx + 3},${cy + 3}
            L${cx},${cy + 9}
            L${cx - 3},${cy + 3}
            L${cx - 9},${cy}
            L${cx - 3},${cy - 3}Z`}
        fill={iconColor}
      />
      {/* Tiny inner sparkle highlight */}
      <circle cx={cx} cy={cy} r="1.8" fill={iconColor} opacity="0.6" />
    </g>
  );
}

// ============================================================================
// Card Feature Lines — green checkmark + text, precisely positioned
// ============================================================================

function FeatureLines({ features, x, startY, lineHeight, checkColor, textColor, fontSize }) {
  return features.map((feat, i) => (
    <g key={i}>
      {/* Checkmark character */}
      <text
        x={x}
        y={startY + i * lineHeight}
        fontFamily="'DM Sans', sans-serif"
        fontSize={fontSize || 12.5}
        fill={checkColor}
        fontWeight="700"
      >
        {'\u2713'}
      </text>
      {/* Feature label */}
      <text
        x={x + 14}
        y={startY + i * lineHeight}
        fontFamily="'DM Sans', sans-serif"
        fontSize={fontSize || 12.5}
        fill={textColor}
      >
        {feat}
      </text>
    </g>
  ));
}

// ============================================================================
// Slide Header — "INTRODUCING DUTCHIE:" + italic title + swirl logo
// ============================================================================

function SlideHeader({ subtitle }) {
  return (
    <g>
      {/* "INTRODUCING DUTCHIE:" — caps label, bright green */}
      <text
        x="480" y="35"
        textAnchor="middle"
        fontFamily="'DM Sans', sans-serif"
        fontSize="13"
        fill="#4CAF7D"
        fontWeight="600"
        letterSpacing="3"
      >
        INTRODUCING DUTCHIE:
      </text>

      {/* Main italic serif title — warm cream */}
      <text
        x="480" y="72"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="36"
        fontStyle="italic"
        fill="#F0EAD6"
        fontWeight="400"
      >
        {subtitle || 'The Industry Standard for a Reason'}
      </text>

      {/* Dutchie swirl logo — organic spiral in muted green */}
      <g transform="translate(480, 95)">
        {/* Outer spiral stroke */}
        <path
          d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
          fill="none" stroke="#3D8B6A" strokeWidth="2" strokeLinecap="round"
        />
        {/* Small decorative dot at spiral center */}
        <circle cx="2" cy="-1" r="1" fill="#3D8B6A" opacity="0.6" />
      </g>

      {/* Thin horizontal separator line below logo */}
      <line
        x1="400" y1="108"
        x2="560" y2="108"
        stroke="#2A5A45" strokeWidth="0.5" opacity="0.4"
      />
    </g>
  );
}

// ============================================================================
// Standard 5-Card Layout — used by Slides 1 and 2
// ============================================================================

function FiveCards({ cardY, cardH, id, nexusBadge }) {
  const cardW = 150;
  const gap = 14;
  const totalW = 5 * cardW + 4 * gap;
  const startX = (960 - totalW) / 2;

  const cards = [
    {
      name: 'E-Commerce',
      Icon: IconEcommerce,
      features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk'],
      special: false,
      leftAccent: false
    },
    {
      name: 'Loyalty',
      Icon: IconLoyalty,
      features: ['Rewards Programs', 'Customer Profiles', 'Promotions', 'Engagement', 'Analytics'],
      special: false,
      leftAccent: false
    },
    {
      name: 'Retail',
      Icon: IconRetail,
      features: ['POS System', 'Inventory', 'Compliance', 'Reporting', 'Staff Mgmt'],
      special: true,
      leftAccent: false
    },
    {
      name: 'Nexus',
      Icon: IconNexus,
      features: ['Data Platform', 'Integrations', 'API Access', 'Webhooks', 'Analytics'],
      special: false,
      leftAccent: true
    },
    {
      name: 'Connect',
      Icon: IconConnect,
      features: ['Partner Network', 'Marketplace', 'Onboarding', 'Support', 'Growth Tools'],
      special: false,
      leftAccent: true
    }
  ];

  return (
    <g>
      {/* Cards container panel — rounded rect with subtle border */}
      <rect
        x={startX - 16} y={cardY - 10}
        width={totalW + 32} height={cardH + 20}
        rx="14" ry="14"
        fill={`url(#${id}-panelGrad)`}
        stroke="#2A5A45" strokeWidth="1"
      />

      {cards.map((card, i) => {
        const cx = startX + i * (cardW + gap);
        const centerX = cx + cardW / 2;
        const isRetail = card.special;

        // Color scheme per card type
        const bgFill = isRetail ? `url(#${id}-retailCard)` : `url(#${id}-creamCard)`;
        const circleFill = isRetail ? '#F5EFE3' : '#2D6A4F';
        const iconClr = isRetail ? '#5C2434' : '#FFFFFF';
        const titleColor = isRetail ? '#F5EFE3' : '#2C2520';
        const featColor = isRetail ? '#D4BFC5' : '#5C554A';
        const checkClr = isRetail ? '#D4A03A' : '#2D6A4F';

        return (
          <g key={i}>
            {/* Left accent bar for Nexus and Connect cards */}
            {card.leftAccent && (
              <rect
                x={cx - 1} y={cardY + 6}
                width="2" height={cardH - 12}
                rx="1" ry="1"
                fill="#3D8B6A" opacity="0.7"
              />
            )}

            {/* Card body — rounded rect with gradient */}
            <rect
              x={cx} y={cardY}
              width={cardW} height={cardH}
              rx="14" ry="14"
              fill={bgFill}
              filter={`url(#${id}-cardShadow)`}
            />

            {/* Inner top highlight on card — 1px lighter line at the very top */}
            <rect
              x={cx + 14} y={cardY + 1}
              width={cardW - 28} height="1"
              rx="0.5"
              fill={isRetail ? '#8A4A5E' : '#FFFFFF'}
              opacity={isRetail ? 0.25 : 0.4}
            />

            {/* Product icon in circle */}
            <card.Icon
              cx={centerX} cy={cardY + 42} r={24}
              circleFill={circleFill} iconColor={iconClr}
            />

            {/* Card title — bold, centered */}
            <text
              x={centerX} y={cardY + 82}
              textAnchor="middle"
              fontFamily="'DM Sans', sans-serif"
              fontSize="16" fontWeight="700"
              fill={titleColor}
            >
              {card.name}
            </text>

            {/* Thin separator line under title */}
            <line
              x1={cx + 20} y1={cardY + 88}
              x2={cx + cardW - 20} y2={cardY + 88}
              stroke={isRetail ? '#7A3A4E' : '#D8D0C2'}
              strokeWidth="0.5" opacity="0.5"
            />

            {/* Feature checklist */}
            <FeatureLines
              features={card.features}
              x={cx + 16}
              startY={cardY + 106}
              lineHeight={20}
              checkColor={checkClr}
              textColor={featColor}
              fontSize={12.5}
            />

            {/* Nexus AI badge — gold pill in top-right corner */}
            {card.name === 'Nexus' && nexusBadge && (
              <g>
                <rect
                  x={cx + cardW - 40} y={cardY + 5}
                  width="36" height="16"
                  rx="8" ry="8"
                  fill="#D4A03A"
                />
                <text
                  x={cx + cardW - 22} y={cardY + 16}
                  textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="9" fontWeight="700"
                  fill="#1A1400"
                >
                  {'\u2726 AI'}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Six-Card Layout — used by Slide 3 (Intelligence Elevated)
// ============================================================================

function SixCards({ cardY, cardH, id }) {
  const cardW = 122;
  const gap = 12;
  const totalW = 6 * cardW + 5 * gap;
  const startX = (960 - totalW) / 2;

  const cards = [
    {
      name: 'E-Commerce', Icon: IconEcommerce,
      features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout'],
      special: false, dex: false, leftAccent: false
    },
    {
      name: 'Loyalty', Icon: IconLoyalty,
      features: ['Rewards', 'Profiles', 'Promotions', 'Engagement'],
      special: false, dex: false, leftAccent: false
    },
    {
      name: 'Retail', Icon: IconRetail,
      features: ['POS System', 'Inventory', 'Compliance', 'Reporting'],
      special: true, dex: false, leftAccent: false
    },
    {
      name: 'Nexus', Icon: IconNexus,
      features: ['Data Platform', 'Integrations', 'API Access', 'Analytics'],
      special: false, dex: false, leftAccent: true
    },
    {
      name: 'Connect', Icon: IconConnect,
      features: ['Partners', 'Marketplace', 'Onboarding', 'Growth'],
      special: false, dex: false, leftAccent: true
    },
    {
      name: 'Dex', Icon: IconDex,
      features: ['Agentic Commerce', 'Voice AI', 'Smart Summaries', 'Sales Assistant', 'Consumer Insight'],
      special: false, dex: true, leftAccent: false
    }
  ];

  return (
    <g>
      {/* Cards container panel */}
      <rect
        x={startX - 14} y={cardY - 10}
        width={totalW + 28} height={cardH + 20}
        rx="14" ry="14"
        fill={`url(#${id}-panelGrad)`}
        stroke="#2A5A45" strokeWidth="1"
      />

      {cards.map((card, i) => {
        const cx = startX + i * (cardW + gap);
        const centerX = cx + cardW / 2;
        const isRetail = card.special;
        const isDex = card.dex;

        const bgFill = isDex ? `url(#${id}-dexCard)` : (isRetail ? `url(#${id}-retailCard)` : `url(#${id}-creamCard)`);
        const circleFill = isDex ? '#1A1400' : (isRetail ? '#F5EFE3' : '#2D6A4F');
        const iconClr = isDex ? '#FFD666' : (isRetail ? '#5C2434' : '#FFFFFF');
        const titleColor = isDex ? '#1A1400' : (isRetail ? '#F5EFE3' : '#2C2520');
        const featColor = isDex ? '#3D2A0F' : (isRetail ? '#D4BFC5' : '#5C554A');
        const checkClr = isDex ? '#1A1400' : (isRetail ? '#D4A03A' : '#2D6A4F');

        return (
          <g key={i}>
            {/* Left accent for Nexus/Connect */}
            {card.leftAccent && (
              <rect
                x={cx - 1} y={cardY + 6}
                width="2" height={cardH - 12}
                rx="1" ry="1"
                fill="#3D8B6A" opacity="0.7"
              />
            )}

            {/* Card body with gradient fill */}
            <rect
              x={cx} y={cardY}
              width={cardW} height={cardH}
              rx="14" ry="14"
              fill={bgFill}
              filter={`url(#${id}-cardShadow)`}
            />

            {/* Inner top highlight */}
            <rect
              x={cx + 14} y={cardY + 1}
              width={cardW - 28} height="1"
              rx="0.5"
              fill={isDex ? '#FFD666' : (isRetail ? '#8A4A5E' : '#FFFFFF')}
              opacity={isDex ? 0.3 : (isRetail ? 0.25 : 0.4)}
            />

            {/* Product icon */}
            <card.Icon
              cx={centerX} cy={cardY + 38} r={21}
              circleFill={circleFill} iconColor={iconClr}
            />

            {/* Card title */}
            <text
              x={centerX} y={cardY + 74}
              textAnchor="middle"
              fontFamily="'DM Sans', sans-serif"
              fontSize="14" fontWeight="700"
              fill={titleColor}
            >
              {card.name}
            </text>

            {/* Separator line */}
            <line
              x1={cx + 14} y1={cardY + 80}
              x2={cx + cardW - 14} y2={cardY + 80}
              stroke={isDex ? '#A07A1A' : (isRetail ? '#7A3A4E' : '#D8D0C2')}
              strokeWidth="0.5" opacity="0.5"
            />

            {/* Feature checklist */}
            <FeatureLines
              features={card.features}
              x={cx + 12}
              startY={cardY + 97}
              lineHeight={18}
              checkColor={checkClr}
              textColor={featColor}
              fontSize={10.5}
            />
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Intelligence Bar — Standard version with 2 rows of capability tags
// ============================================================================

function IntelligenceBar({ y, id, poweredByDex, replaceDutchieAgent }) {
  const barX = 55;
  const barW = 850;
  const barH = 100;

  const tags1 = [
    { icon: '\u2726', label: 'Agentic Commerce' },
    { icon: '\uD83C\uDFA4', label: 'Voice AI' },
    { icon: '\uD83D\uDCCB', label: 'Intelligent Summaries' },
    { icon: '\u2605', label: 'Intelligence Everywhere' }
  ];

  const lastTag = replaceDutchieAgent
    ? { icon: '\u2726', label: 'Dex', gold: true }
    : { icon: '\uD83E\uDD16', label: 'Dutchie Agent', gold: false };

  const tags2 = [
    { icon: '\uD83D\uDCBC', label: 'AI Sales Assistant' },
    { icon: '\u2665', label: 'Consumer Sentiment' },
    lastTag
  ];

  return (
    <g>
      {/* Bar background panel */}
      <rect
        x={barX} y={y}
        width={barW} height={barH}
        rx="12" ry="12"
        fill="#163829" stroke="#2A5A45" strokeWidth="1"
      />

      {/* Rainbow gradient strip at top — smooth spectral band (taller) */}
      <rect
        x={barX + 1} y={y + 1}
        width={barW - 2} height="4"
        rx="2" ry="2"
        fill={`url(#${id}-rainbow)`} opacity="0.65"
      />

      {/* Brain icon — circle with inner detail */}
      <circle
        cx={barX + 30} cy={y + 30}
        r="12"
        fill="none" stroke="#4CAF7D" strokeWidth="1.5"
      />
      {/* Brain hemispheres */}
      <path
        d={`M${barX + 25},${y + 30}
            C${barX + 28},${y + 24} ${barX + 32},${y + 24} ${barX + 35},${y + 30}
            C${barX + 32},${y + 36} ${barX + 28},${y + 36} ${barX + 25},${y + 30}`}
        fill="none" stroke="#4CAF7D" strokeWidth="1.2"
      />
      {/* Vertical center line */}
      <line
        x1={barX + 30} y1={y + 21}
        x2={barX + 30} y2={y + 39}
        stroke="#4CAF7D" strokeWidth="0.8" opacity="0.4"
      />
      {/* Small neural dots */}
      <circle cx={barX + 27} cy={y + 27} r="0.8" fill="#4CAF7D" opacity="0.5" />
      <circle cx={barX + 33} cy={y + 33} r="0.8" fill="#4CAF7D" opacity="0.5" />

      {/* "intelligence" label text — bolder */}
      <text
        x={barX + 52} y={y + 35}
        fontFamily="'DM Sans', sans-serif"
        fontSize="18" fontWeight="700"
        fill="#F0EAD6"
      >
        intelligence
      </text>

      {/* "Powered by Dex" subtitle (conditional) */}
      {poweredByDex && (
        <text
          x={barX + 180} y={y + 35}
          fontFamily="'DM Sans', sans-serif"
          fontSize="13" fontWeight="600"
          fill="#D4A03A"
        >
          — Powered by Dex
        </text>
      )}

      {/* Row 1 capability tags — spaced more evenly */}
      {tags1.map((tag, i) => {
        const tx = barX + 52 + i * 205;
        return (
          <text
            key={`t1-${i}`}
            x={tx} y={y + 58}
            fontFamily="'DM Sans', sans-serif"
            fontSize="11.5"
            fill="#A8C5B5"
          >
            {tag.icon} {tag.label}
          </text>
        );
      })}

      {/* Row 2 capability tags */}
      {tags2.map((tag, i) => {
        const tx = barX + 52 + i * 205;
        const isGold = tag.gold;
        return (
          <g key={`t2-${i}`}>
            {/* Gold border highlight for Dex tag */}
            {isGold && (
              <rect
                x={tx - 8} y={y + 65}
                width={58} height="19"
                rx="9.5" ry="9.5"
                fill="none" stroke="#D4A03A" strokeWidth="1"
              />
            )}
            <text
              x={tx} y={y + 79}
              fontFamily="'DM Sans', sans-serif"
              fontSize="11.5"
              fill={isGold ? '#D4A03A' : '#A8C5B5'}
              fontWeight={isGold ? '700' : '400'}
            >
              {tag.icon} {tag.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Intelligence Bar — Simplified version for Slide 3
// ============================================================================

function IntelligenceBarSimple({ y, id }) {
  const barX = 55;
  const barW = 850;
  const barH = 56;

  return (
    <g>
      {/* Bar panel */}
      <rect
        x={barX} y={y}
        width={barW} height={barH}
        rx="12" ry="12"
        fill="#163829" stroke="#2A5A45" strokeWidth="1"
      />

      {/* Rainbow strip — taller */}
      <rect
        x={barX + 1} y={y + 1}
        width={barW - 2} height="4"
        rx="2" ry="2"
        fill={`url(#${id}-rainbow)`} opacity="0.65"
      />

      {/* Brain icon */}
      <circle
        cx={barX + 30} cy={y + 30}
        r="11"
        fill="none" stroke="#4CAF7D" strokeWidth="1.5"
      />
      <path
        d={`M${barX + 25},${y + 30}
            C${barX + 28},${y + 25} ${barX + 32},${y + 25} ${barX + 35},${y + 30}
            C${barX + 32},${y + 35} ${barX + 28},${y + 35} ${barX + 25},${y + 30}`}
        fill="none" stroke="#4CAF7D" strokeWidth="1.1"
      />

      {/* Main label — bolder */}
      <text
        x={barX + 52} y={y + 35}
        fontFamily="'DM Sans', sans-serif"
        fontSize="18" fontWeight="700"
        fill="#F0EAD6"
      >
        Powered by Dex Intelligence
      </text>

      {/* Gold sparkle accent */}
      <text
        x={barX + 286} y={y + 35}
        fontFamily="'DM Sans', sans-serif"
        fontSize="15"
        fill="#D4A03A"
      >
        {'\u2726'}
      </text>

      {/* Small decorative line after text */}
      <line
        x1={barX + 302} y1={y + 30}
        x2={barX + barW - 40} y2={y + 30}
        stroke="#2A5A45" strokeWidth="0.5" opacity="0.3"
      />
    </g>
  );
}

// ============================================================================
// SLIDE 1: "The Current Deck" — faithful recreation of original
// ============================================================================

function Slide1() {
  const id = 's1';
  const cardY = 120;
  const cardH = 268;

  return (
    <svg
      width="100%"
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 14 }}
    >
      <SlideDefsStandard id={id} />

      {/* Full-bleed background fill */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />

      {/* Vignette overlay */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-vignette)`} />

      {/* Subtle texture layer */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-lineTexture)`} opacity="0.08" />

      {/* Outer frame border — 1px lighter green */}
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      {/* Organic corner leaf decorations */}
      <CornerLeaves />

      {/* Header area — top 110px */}
      <SlideHeader />

      {/* Product cards — 5 columns */}
      <FiveCards cardY={cardY} cardH={cardH} id={id} />

      {/* Intelligence bar — bottom section */}
      <IntelligenceBar y={418} id={id} />
    </svg>
  );
}

// ============================================================================
// SLIDE 2: "Proposed: Dex Integrated" — minimal Dex branding changes
// ============================================================================

function Slide2() {
  const id = 's2';
  const cardY = 120;
  const cardH = 268;

  return (
    <svg
      width="100%"
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 14 }}
    >
      <SlideDefsStandard id={id} />

      {/* Background layers */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-vignette)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-lineTexture)`} opacity="0.08" />

      {/* Frame border */}
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      <CornerLeaves />
      <SlideHeader />

      {/* Cards — with Nexus AI badge enabled */}
      <FiveCards cardY={cardY} cardH={cardH} id={id} nexusBadge={true} />

      {/* Intelligence bar — Dex replaces Dutchie Agent, "Powered by Dex" added */}
      <IntelligenceBar y={418} id={id} poweredByDex={true} replaceDutchieAgent={true} />
    </svg>
  );
}

// ============================================================================
// SLIDE 3: "Proposed: Intelligence Elevated" — 6 cards, Dex as pillar
// ============================================================================

function Slide3() {
  const id = 's3';
  const cardY = 120;
  const cardH = 248;

  return (
    <svg
      width="100%"
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 14 }}
    >
      <SlideDefsStandard id={id} />

      {/* Background layers */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-vignette)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-lineTexture)`} opacity="0.08" />

      {/* Frame border */}
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      <CornerLeaves />

      {/* Modified header — "The Complete Dutchie Platform" */}
      <g>
        <text
          x="480" y="35"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontSize="13" fill="#4CAF7D"
          fontWeight="600" letterSpacing="3"
        >
          INTRODUCING DUTCHIE:
        </text>
        <text
          x="480" y="72"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="36" fontStyle="italic"
          fill="#F0EAD6" fontWeight="400"
        >
          The Complete Dutchie Platform
        </text>
        <g transform="translate(480, 95)">
          <path
            d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
            fill="none" stroke="#3D8B6A" strokeWidth="2" strokeLinecap="round"
          />
          <circle cx="2" cy="-1" r="1" fill="#3D8B6A" opacity="0.6" />
        </g>
        <line x1="400" y1="108" x2="560" y2="108"
          stroke="#2A5A45" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* 6 product cards — narrower, includes Dex */}
      <SixCards cardY={cardY} cardH={cardH} id={id} />

      {/* Simplified intelligence bar */}
      <IntelligenceBarSimple y={480} id={id} />
    </svg>
  );
}

// ============================================================================
// SLIDE 4: "Proposed: Dark Premium" — near-black with gold accents
// ============================================================================

function Slide4() {
  const id = 's4';
  const cardW = 150;
  const gap = 14;
  const totalW = 5 * cardW + 4 * gap;
  const startX = (960 - totalW) / 2;
  const cardY = 120;
  const cardH = 268;

  const cards = [
    { name: 'E-Commerce', Icon: IconEcommerce, features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk'], retail: false, leftAccent: false },
    { name: 'Loyalty', Icon: IconLoyalty, features: ['Rewards Programs', 'Customer Profiles', 'Promotions', 'Engagement', 'Analytics'], retail: false, leftAccent: false },
    { name: 'Retail', Icon: IconRetail, features: ['POS System', 'Inventory', 'Compliance', 'Reporting', 'Staff Mgmt'], retail: true, leftAccent: false },
    { name: 'Nexus', Icon: IconNexus, features: ['Data Platform', 'Integrations', 'API Access', 'Webhooks', 'Analytics'], retail: false, leftAccent: true },
    { name: 'Connect', Icon: IconConnect, features: ['Partner Network', 'Marketplace', 'Onboarding', 'Support', 'Growth Tools'], retail: false, leftAccent: true }
  ];

  const intelY = 418;
  const barX = 55;
  const barW = 850;
  const barH = 100;

  const tags1 = [
    { icon: '\u2726', label: 'Agentic Commerce' },
    { icon: '\uD83C\uDFA4', label: 'Voice AI' },
    { icon: '\uD83D\uDCCB', label: 'Intelligent Summaries' },
    { icon: '\u2605', label: 'Intelligence Everywhere' }
  ];
  const tags2 = [
    { icon: '\uD83D\uDCBC', label: 'AI Sales Assistant' },
    { icon: '\u2665', label: 'Consumer Sentiment' },
    { icon: '\u2726', label: 'Dex', gold: true }
  ];

  return (
    <svg
      width="100%"
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 14 }}
    >
      <defs>
        {/* Dark background gradient */}
        <radialGradient id={`${id}-bgGrad`} cx="50%" cy="45%" r="75%" fx="50%" fy="40%">
          <stop offset="0%" stopColor="#131210" />
          <stop offset="50%" stopColor="#0C0B0A" />
          <stop offset="100%" stopColor="#080706" />
        </radialGradient>

        {/* Vignette overlay for dark theme */}
        <radialGradient id={`${id}-vignette`} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#131210" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>

        {/* Gold gradient for icon circles */}
        <linearGradient id={`${id}-goldCircle`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>

        {/* Gold-tinted rainbow gradient for intelligence strip */}
        <linearGradient id={`${id}-rainbow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0504D" />
          <stop offset="14%" stopColor="#D4834D" />
          <stop offset="28%" stopColor="#D4C04D" />
          <stop offset="42%" stopColor="#D4A03A" />
          <stop offset="57%" stopColor="#C49A2A" />
          <stop offset="71%" stopColor="#B8862A" />
          <stop offset="85%" stopColor="#A07428" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>

        {/* Card shadow — deeper for dark backgrounds */}
        <filter id={`${id}-cardShadow`} x="-6%" y="-4%" width="112%" height="114%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
        </filter>

        {/* Subtle noise texture pattern */}
        <pattern id={`${id}-noisePattern`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1" height="1" fill="#1A1917" opacity="0.08" />
          <rect x="2" y="2" width="1" height="1" fill="#1A1917" opacity="0.06" />
        </pattern>

        {/* Dark premium card gradient — standard */}
        <linearGradient id={`${id}-darkCard`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#211F1C" />
          <stop offset="100%" stopColor="#181614" />
        </linearGradient>

        {/* Dark premium card gradient — retail */}
        <linearGradient id={`${id}-darkRetailCard`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D2A0F" />
          <stop offset="100%" stopColor="#2A1C0A" />
        </linearGradient>

        {/* Gold glow filter for card icons */}
        <filter id={`${id}-goldGlow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.06  0 0 1 0 0  0 0 0 0.3 0" result="goldBlur" />
          <feMerge>
            <feMergeNode in="goldBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background fills */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-vignette)`} />
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-noisePattern)`} />

      {/* Frame border — dark gold */}
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#3D350F" strokeWidth="1" />

      {/* Subtle corner decorations — dark amber tint */}
      <path
        d="M0,540 C20,518 15,492 8,475 C22,488 38,504 52,514 C36,522 18,536 0,540Z"
        fill="#1A1400" opacity="0.35"
      />
      <path
        d="M0,525 C16,512 13,492 7,480 C16,489 30,500 40,508 C30,514 15,525 0,530Z"
        fill="#1A1400" opacity="0.18"
      />
      <path
        d="M960,0 C940,22 944,48 952,65 C938,52 922,36 908,26 C924,18 942,4 960,0Z"
        fill="#1A1400" opacity="0.35"
      />
      <path
        d="M960,15 C946,28 948,48 954,60 C944,52 932,42 924,36 C932,30 946,18 960,12Z"
        fill="#1A1400" opacity="0.18"
      />

      {/* Small decorative corner dots */}
      <circle cx="20" cy="520" r="1.5" fill="#3D350F" opacity="0.3" />
      <circle cx="35" cy="530" r="0.8" fill="#3D350F" opacity="0.2" />
      <circle cx="940" cy="20" r="1.5" fill="#3D350F" opacity="0.3" />
      <circle cx="925" cy="10" r="0.8" fill="#3D350F" opacity="0.2" />
      <circle cx="950" cy="530" r="0.7" fill="#3D350F" opacity="0.15" />

      {/* Header — gold themed */}
      <text
        x="480" y="35"
        textAnchor="middle"
        fontFamily="'DM Sans', sans-serif"
        fontSize="13" fill="#D4A03A"
        fontWeight="600" letterSpacing="3"
      >
        INTRODUCING DUTCHIE:
      </text>
      <text
        x="480" y="72"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="36" fontStyle="italic"
        fill="#F0EAD6" fontWeight="400"
      >
        The Industry Standard for a Reason
      </text>
      {/* Gold swirl logo */}
      <g transform="translate(480, 95)">
        <path
          d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
          fill="none" stroke="#D4A03A" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="2" cy="-1" r="1" fill="#D4A03A" opacity="0.6" />
      </g>
      {/* Gold separator line */}
      <line
        x1="400" y1="108" x2="560" y2="108"
        stroke="#3D350F" strokeWidth="0.5" opacity="0.5"
      />

      {/* Cards container */}
      <rect
        x={startX - 16} y={cardY - 10}
        width={totalW + 32} height={cardH + 20}
        rx="14" ry="14"
        fill="#141210" stroke="#3D350F" strokeWidth="1"
      />

      {/* Individual cards */}
      {cards.map((card, i) => {
        const cx = startX + i * (cardW + gap);
        const centerX = cx + cardW / 2;
        const isRetail = card.retail;

        const bgFill = isRetail ? `url(#${id}-darkRetailCard)` : `url(#${id}-darkCard)`;
        const borderClr = isRetail ? '#5C3D0F' : '#3D350F';
        const circleFill = `url(#${id}-goldCircle)`;
        const iconClr = '#0C0B0A';
        const titleColor = '#E8E3D8';
        const featColor = isRetail ? '#C4A878' : '#8A8278';
        const checkClr = '#D4A03A';

        return (
          <g key={i}>
            {/* Gold left accent for Nexus/Connect */}
            {card.leftAccent && (
              <rect
                x={cx - 1} y={cardY + 6}
                width="2" height={cardH - 12}
                rx="1" ry="1"
                fill="#D4A03A" opacity="0.4"
              />
            )}

            {/* Card body with gradient fill and gold border */}
            <rect
              x={cx} y={cardY}
              width={cardW} height={cardH}
              rx="14" ry="14"
              fill={bgFill}
              stroke={borderClr} strokeWidth="1"
              filter={`url(#${id}-cardShadow)`}
            />

            {/* Subtle top highlight */}
            <rect
              x={cx + 14} y={cardY + 1}
              width={cardW - 28} height="1"
              rx="0.5" fill="#3D350F" opacity="0.4"
            />

            {/* Gold gradient icon circle with glow */}
            <g filter={`url(#${id}-goldGlow)`}>
              <card.Icon
                cx={centerX} cy={cardY + 42} r={24}
                circleFill={circleFill} iconColor={iconClr}
              />
            </g>

            {/* Title */}
            <text
              x={centerX} y={cardY + 82}
              textAnchor="middle"
              fontFamily="'DM Sans', sans-serif"
              fontSize="16" fontWeight="700"
              fill={titleColor}
            >
              {card.name}
            </text>

            {/* Separator */}
            <line
              x1={cx + 20} y1={cardY + 88}
              x2={cx + cardW - 20} y2={cardY + 88}
              stroke={isRetail ? '#5C3D0F' : '#2A2520'}
              strokeWidth="0.5" opacity="0.5"
            />

            {/* Features */}
            <FeatureLines
              features={card.features}
              x={cx + 16}
              startY={cardY + 106}
              lineHeight={20}
              checkColor={checkClr}
              textColor={featColor}
              fontSize={12.5}
            />

            {/* Nexus AI badge — gold pill */}
            {card.name === 'Nexus' && (
              <g>
                <rect
                  x={cx + cardW - 40} y={cardY + 5}
                  width="36" height="16"
                  rx="8" ry="8"
                  fill="#D4A03A"
                />
                <text
                  x={cx + cardW - 22} y={cardY + 16}
                  textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="9" fontWeight="700"
                  fill="#0C0B0A"
                >
                  {'\u2726 AI'}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* ---- Dark Premium Intelligence Bar ---- */}
      <rect
        x={barX} y={intelY}
        width={barW} height={barH}
        rx="12" ry="12"
        fill="#141210" stroke="#3D350F" strokeWidth="1"
      />

      {/* Gold gradient strip — more prominent */}
      <rect
        x={barX + 1} y={intelY + 1}
        width={barW - 2} height="4"
        rx="2" ry="2"
        fill={`url(#${id}-rainbow)`} opacity="0.8"
      />

      {/* Brain icon — gold version */}
      <circle
        cx={barX + 30} cy={intelY + 30}
        r="12"
        fill="none" stroke="#D4A03A" strokeWidth="1.5"
      />
      <path
        d={`M${barX + 25},${intelY + 30}
            C${barX + 28},${intelY + 24} ${barX + 32},${intelY + 24} ${barX + 35},${intelY + 30}
            C${barX + 32},${intelY + 36} ${barX + 28},${intelY + 36} ${barX + 25},${intelY + 30}`}
        fill="none" stroke="#D4A03A" strokeWidth="1.2"
      />
      <line
        x1={barX + 30} y1={intelY + 21}
        x2={barX + 30} y2={intelY + 39}
        stroke="#D4A03A" strokeWidth="0.8" opacity="0.4"
      />
      {/* Neural dots */}
      <circle cx={barX + 27} cy={intelY + 27} r="0.8" fill="#D4A03A" opacity="0.5" />
      <circle cx={barX + 33} cy={intelY + 33} r="0.8" fill="#D4A03A" opacity="0.5" />

      {/* "intelligence" text — bolder */}
      <text
        x={barX + 52} y={intelY + 35}
        fontFamily="'DM Sans', sans-serif"
        fontSize="18" fontWeight="700"
        fill="#F0EAD6"
      >
        intelligence
      </text>

      {/* "Powered by Dex" */}
      <text
        x={barX + 180} y={intelY + 35}
        fontFamily="'DM Sans', sans-serif"
        fontSize="13" fontWeight="600"
        fill="#D4A03A"
      >
        — Powered by Dex
      </text>

      {/* Row 1 tags — muted gold, spaced more evenly */}
      {tags1.map((tag, i) => (
        <text
          key={`dt1-${i}`}
          x={barX + 52 + i * 205} y={intelY + 58}
          fontFamily="'DM Sans', sans-serif"
          fontSize="11.5" fill="#8A7A5A"
        >
          {tag.icon} {tag.label}
        </text>
      ))}

      {/* Row 2 tags */}
      {tags2.map((tag, i) => {
        const tx = barX + 52 + i * 205;
        return (
          <g key={`dt2-${i}`}>
            {tag.gold && (
              <rect
                x={tx - 8} y={intelY + 65}
                width={58} height="19"
                rx="9.5" ry="9.5"
                fill="none" stroke="#D4A03A" strokeWidth="1"
              />
            )}
            <text
              x={tx} y={intelY + 79}
              fontFamily="'DM Sans', sans-serif"
              fontSize="11.5"
              fill={tag.gold ? '#D4A03A' : '#8A7A5A'}
              fontWeight={tag.gold ? '700' : '400'}
            >
              {tag.icon} {tag.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// Slide Section Wrapper — HTML chrome around each SVG slide
// ============================================================================

function SlideSection({ number, title, caption, children, t, darkPremium }) {
  return (
    <div style={{ marginBottom: 64 }}>
      {/* Slide number label — gold caps */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 3,
        color: t.accentGold,
        textTransform: 'uppercase',
        marginBottom: 6
      }}>
        SLIDE {number}
      </div>

      {/* Slide title */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        color: t.text,
        marginBottom: 16
      }}>
        {title}
      </div>

      {/* SVG container — responsive with max-width, enhanced shadow */}
      <div style={{
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${t.border}`,
        boxShadow: darkPremium
          ? '0 4px 24px rgba(0,0,0,0.3), 0 0 40px rgba(212,160,58,0.06)'
          : '0 4px 24px rgba(0,0,0,0.3)'
      }}>
        {children}
      </div>

      {/* Caption — italic, muted */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: t.textMuted,
        marginTop: 12,
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        {caption}
      </div>
    </div>
  );
}

// ============================================================================
// Main Exported Component
// ============================================================================

export function SalesDeckIntegration({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{
      background: t.bg,
      minHeight: '100vh',
      padding: '48px 32px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Page header */}
      <div style={{ maxWidth: 1100, margin: '0 auto 48px auto' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 3,
          color: t.accentGold,
          textTransform: 'uppercase',
          marginBottom: 8
        }}>
          SALES DECK INTEGRATION
        </div>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          color: t.text,
          margin: '0 0 12px 0',
          lineHeight: 1.2
        }}>
          Where Dex Lives in the Dutchie Story
        </h1>
        <p style={{
          fontSize: 15,
          color: t.textMuted,
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 640
        }}>
          Four options for positioning Dex within the existing Dutchie product hierarchy,
          from minimal branding changes to a full visual rebrand.
        </p>
      </div>

      {/* Slide gallery */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SlideSection
          number={1}
          title="The Current Deck"
          caption="The current Dutchie product hierarchy from the sales deck."
          t={t}
        >
          <Slide1 />
        </SlideSection>

        <SlideSection
          number={2}
          title="Proposed: Dex Integrated"
          caption="Minimal change — just name the agent and badge the AI product."
          t={t}
        >
          <Slide2 />
        </SlideSection>

        <SlideSection
          number={3}
          title="Proposed: Intelligence Elevated"
          caption="Dex gets a seat at the table as the 6th pillar."
          t={t}
        >
          <Slide3 />
        </SlideSection>

        <SlideSection
          number={4}
          title="Proposed: Dark Premium"
          caption="The premium dark brand direction."
          t={t}
          darkPremium={true}
        >
          <Slide4 />
        </SlideSection>
      </div>
    </div>
  );
}

export default SalesDeckIntegration;
