import React from 'react';

// ============================================================================
// SalesDeckIntegration — SVG-based sales deck recreation
// Each slide is a single inline SVG with coordinate-based positioning.
// ============================================================================

const themes = {
  dark: {
    bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8',
    textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A',
    accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C'
  },
  light: {
    bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917',
    textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A',
    accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857'
  }
};

// ============================================================================
// Shared SVG Defs — gradients, patterns
// ============================================================================

function SlideDefsStandard({ id }) {
  return (
    <defs>
      {/* Main background gradient */}
      <radialGradient id={`${id}-bgGrad`} cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#1E4535" />
        <stop offset="60%" stopColor="#1B3D2F" />
        <stop offset="100%" stopColor="#142E23" />
      </radialGradient>

      {/* Rainbow gradient for intelligence bar */}
      <linearGradient id={`${id}-rainbow`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C0504D" />
        <stop offset="16%" stopColor="#D4834D" />
        <stop offset="33%" stopColor="#D4C04D" />
        <stop offset="50%" stopColor="#5DA06B" />
        <stop offset="66%" stopColor="#4D7EC0" />
        <stop offset="83%" stopColor="#7B5DA0" />
        <stop offset="100%" stopColor="#A05D8B" />
      </linearGradient>

      {/* Card shadow filter */}
      <filter id={`${id}-cardShadow`} x="-4%" y="-2%" width="108%" height="108%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0A1F15" floodOpacity="0.35" />
      </filter>

      {/* Gold gradient for badges */}
      <linearGradient id={`${id}-goldGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A03A" />
        <stop offset="100%" stopColor="#FFC02A" />
      </linearGradient>

      {/* Leaf decoration path (corner accent) */}
      <path id={`${id}-leafBL`}
        d="M0,540 C30,510 20,480 10,460 C25,475 40,490 60,500 C40,510 20,530 0,540Z"
        fill="#1E4535" opacity="0.3" />
      <path id={`${id}-leafTR`}
        d="M960,0 C930,30 940,60 950,80 C935,65 920,50 900,40 C920,30 940,10 960,0Z"
        fill="#1E4535" opacity="0.3" />
    </defs>
  );
}

// ============================================================================
// Icon components — simple SVG paths for each product icon
// ============================================================================

function IconEcommerce({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Shopping bag */}
      <rect x={cx - 8} y={cy - 4} width="16" height="14" rx="2"
        fill="none" stroke={iconColor} strokeWidth="1.8" />
      <path d={`M${cx - 4},${cy - 4} L${cx - 4},${cy - 8} A4,4 0 0,1 ${cx + 4},${cy - 8} L${cx + 4},${cy - 4}`}
        fill="none" stroke={iconColor} strokeWidth="1.8" />
    </g>
  );
}

function IconLoyalty({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Heart */}
      <path d={`M${cx},${cy + 6} C${cx - 12},${cy - 4} ${cx - 6},${cy - 12} ${cx},${cy - 4} C${cx + 6},${cy - 12} ${cx + 12},${cy - 4} ${cx},${cy + 6}Z`}
        fill="none" stroke={iconColor} strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  );
}

function IconRetail({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Register/receipt */}
      <rect x={cx - 7} y={cy - 5} width="14" height="10" rx="1.5"
        fill="none" stroke={iconColor} strokeWidth="1.6" />
      <line x1={cx - 4} y1={cy - 2} x2={cx + 4} y2={cy - 2} stroke={iconColor} strokeWidth="1.2" />
      <line x1={cx - 4} y1={cy + 1} x2={cx + 2} y2={cy + 1} stroke={iconColor} strokeWidth="1.2" />
      <path d={`M${cx - 3},${cy + 5} L${cx - 3},${cy + 9} L${cx + 3},${cy + 7} L${cx + 3},${cy + 5}`}
        fill="none" stroke={iconColor} strokeWidth="1.2" />
    </g>
  );
}

function IconNexus({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Network: 4 dots with connecting lines */}
      <circle cx={cx - 5} cy={cy - 5} r="2" fill={iconColor} />
      <circle cx={cx + 5} cy={cy - 5} r="2" fill={iconColor} />
      <circle cx={cx - 5} cy={cy + 5} r="2" fill={iconColor} />
      <circle cx={cx + 5} cy={cy + 5} r="2" fill={iconColor} />
      <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy - 5} stroke={iconColor} strokeWidth="1" />
      <line x1={cx - 5} y1={cy - 5} x2={cx - 5} y2={cy + 5} stroke={iconColor} strokeWidth="1" />
      <line x1={cx + 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke={iconColor} strokeWidth="1" />
      <line x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy + 5} stroke={iconColor} strokeWidth="1" />
      <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke={iconColor} strokeWidth="1" opacity="0.5" />
      <line x1={cx + 5} y1={cy - 5} x2={cx - 5} y2={cy + 5} stroke={iconColor} strokeWidth="1" opacity="0.5" />
    </g>
  );
}

function IconConnect({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Two chain links */}
      <ellipse cx={cx - 3} cy={cy} rx="5" ry="7" fill="none" stroke={iconColor} strokeWidth="1.6"
        transform={`rotate(-20,${cx - 3},${cy})`} />
      <ellipse cx={cx + 3} cy={cy} rx="5" ry="7" fill="none" stroke={iconColor} strokeWidth="1.6"
        transform={`rotate(20,${cx + 3},${cy})`} />
    </g>
  );
}

function IconDex({ cx, cy, r, circleFill, iconColor }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={circleFill} />
      {/* Star / sparkle */}
      <path d={`M${cx},${cy - 8} L${cx + 2},${cy - 2} L${cx + 8},${cy} L${cx + 2},${cy + 2} L${cx},${cy + 8} L${cx - 2},${cy + 2} L${cx - 8},${cy} L${cx - 2},${cy - 2}Z`}
        fill={iconColor} />
    </g>
  );
}

// ============================================================================
// Card Feature Lines — checkmark + text
// ============================================================================

function FeatureLines({ features, x, startY, lineHeight, checkColor, textColor, fontSize }) {
  return features.map((feat, i) => (
    <g key={i}>
      <text x={x} y={startY + i * lineHeight}
        fontFamily="'DM Sans', sans-serif" fontSize={fontSize || 11} fill={checkColor} fontWeight="700">
        {'✓'}
      </text>
      <text x={x + 14} y={startY + i * lineHeight}
        fontFamily="'DM Sans', sans-serif" fontSize={fontSize || 11} fill={textColor}>
        {feat}
      </text>
    </g>
  ));
}

// ============================================================================
// Standard 5-Card Layout
// ============================================================================

function FiveCards({ cardY, cardH, id, retailSpecial, nexusBadge, connectBadge }) {
  const cardW = 150;
  const gap = 14;
  const totalW = 5 * cardW + 4 * gap;
  const startX = (960 - totalW) / 2;

  const cards = [
    {
      name: 'E-Commerce',
      icon: IconEcommerce,
      features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk'],
      special: false
    },
    {
      name: 'Loyalty',
      icon: IconLoyalty,
      features: ['Rewards Programs', 'Customer Profiles', 'Promotions', 'Engagement', 'Analytics'],
      special: false
    },
    {
      name: 'Retail',
      icon: IconRetail,
      features: ['POS System', 'Inventory', 'Compliance', 'Reporting', 'Staff Mgmt'],
      special: true
    },
    {
      name: 'Nexus',
      icon: IconNexus,
      features: ['Data Platform', 'Integrations', 'API Access', 'Webhooks', 'Analytics'],
      special: false,
      leftAccent: true
    },
    {
      name: 'Connect',
      icon: IconConnect,
      features: ['Partner Network', 'Marketplace', 'Onboarding', 'Support', 'Growth Tools'],
      special: false,
      leftAccent: true
    }
  ];

  return (
    <g>
      {/* Cards container background */}
      <rect x={startX - 14} y={cardY - 8} width={totalW + 28} height={cardH + 16}
        rx="14" fill="#163829" stroke="#2A5A45" strokeWidth="1" />

      {cards.map((card, i) => {
        const cx = startX + i * (cardW + gap);
        const centerX = cx + cardW / 2;
        const isRetail = card.special && retailSpecial !== false;

        const bgFill = isRetail ? '#5C2434' : '#F5EFE3';
        const circleFill = isRetail ? '#F5EFE3' : '#2D6A4F';
        const iconClr = isRetail ? '#5C2434' : '#FFFFFF';
        const titleColor = isRetail ? '#F5EFE3' : '#2C2520';
        const featColor = isRetail ? '#D4BFC5' : '#5C554A';
        const checkClr = isRetail ? '#D4A03A' : '#2D6A4F';

        return (
          <g key={i}>
            {/* Left accent for Nexus/Connect */}
            {card.leftAccent && (
              <rect x={cx - 1} y={cardY + 4} width="2" height={cardH - 8}
                rx="1" fill="#3D8B6A" opacity="0.7" />
            )}

            {/* Card body */}
            <rect x={cx} y={cardY} width={cardW} height={cardH}
              rx="12" fill={bgFill} filter={`url(#${id}-cardShadow)`} />

            {/* Icon */}
            <card.icon cx={centerX} cy={cardY + 42} r={22}
              circleFill={circleFill} iconColor={iconClr} />

            {/* Title */}
            <text x={centerX} y={cardY + 80} textAnchor="middle"
              fontFamily="'DM Sans', sans-serif" fontSize="14" fontWeight="700" fill={titleColor}>
              {card.name}
            </text>

            {/* Features */}
            <FeatureLines
              features={card.features}
              x={cx + 16}
              startY={cardY + 102}
              lineHeight={20}
              checkColor={checkClr}
              textColor={featColor}
              fontSize={11}
            />

            {/* Nexus AI badge */}
            {card.name === 'Nexus' && nexusBadge && (
              <g>
                <rect x={cx + cardW - 38} y={cardY + 4} width="34" height="16" rx="8"
                  fill="#D4A03A" />
                <text x={cx + cardW - 21} y={cardY + 15} textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="700" fill="#1A1400">
                  {'✦ AI'}
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
// Six-Card Layout (for Slide 3)
// ============================================================================

function SixCards({ cardY, cardH, id }) {
  const cardW = 122;
  const gap = 12;
  const totalW = 6 * cardW + 5 * gap;
  const startX = (960 - totalW) / 2;

  const cards = [
    {
      name: 'E-Commerce',
      icon: IconEcommerce,
      features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout'],
      special: false, dex: false
    },
    {
      name: 'Loyalty',
      icon: IconLoyalty,
      features: ['Rewards', 'Profiles', 'Promotions', 'Engagement'],
      special: false, dex: false
    },
    {
      name: 'Retail',
      icon: IconRetail,
      features: ['POS System', 'Inventory', 'Compliance', 'Reporting'],
      special: true, dex: false
    },
    {
      name: 'Nexus',
      icon: IconNexus,
      features: ['Data Platform', 'Integrations', 'API Access', 'Analytics'],
      special: false, leftAccent: true, dex: false
    },
    {
      name: 'Connect',
      icon: IconConnect,
      features: ['Partners', 'Marketplace', 'Onboarding', 'Growth'],
      special: false, leftAccent: true, dex: false
    },
    {
      name: 'Dex',
      icon: IconDex,
      features: ['Agentic Commerce', 'Voice AI', 'Smart Summaries', 'Sales Assistant', 'Consumer Insight'],
      special: false, dex: true
    }
  ];

  return (
    <g>
      {/* Cards container */}
      <rect x={startX - 12} y={cardY - 8} width={totalW + 24} height={cardH + 16}
        rx="14" fill="#163829" stroke="#2A5A45" strokeWidth="1" />

      {cards.map((card, i) => {
        const cx = startX + i * (cardW + gap);
        const centerX = cx + cardW / 2;
        const isRetail = card.special;
        const isDex = card.dex;

        const bgFill = isDex ? '#C49A2A' : (isRetail ? '#5C2434' : '#F5EFE3');
        const circleFill = isDex ? '#1A1400' : (isRetail ? '#F5EFE3' : '#2D6A4F');
        const iconClr = isDex ? '#FFD666' : (isRetail ? '#5C2434' : '#FFFFFF');
        const titleColor = isDex ? '#1A1400' : (isRetail ? '#F5EFE3' : '#2C2520');
        const featColor = isDex ? '#3D2A0F' : (isRetail ? '#D4BFC5' : '#5C554A');
        const checkClr = isDex ? '#1A1400' : (isRetail ? '#D4A03A' : '#2D6A4F');

        return (
          <g key={i}>
            {card.leftAccent && (
              <rect x={cx - 1} y={cardY + 4} width="2" height={cardH - 8}
                rx="1" fill="#3D8B6A" opacity="0.7" />
            )}

            <rect x={cx} y={cardY} width={cardW} height={cardH}
              rx="12" fill={bgFill} filter={`url(#${id}-cardShadow)`} />

            <card.icon cx={centerX} cy={cardY + 38} r={19}
              circleFill={circleFill} iconColor={iconClr} />

            <text x={centerX} y={cardY + 72} textAnchor="middle"
              fontFamily="'DM Sans', sans-serif" fontSize="13" fontWeight="700" fill={titleColor}>
              {card.name}
            </text>

            <FeatureLines
              features={card.features}
              x={cx + 12}
              startY={cardY + 92}
              lineHeight={18}
              checkColor={checkClr}
              textColor={featColor}
              fontSize={10}
            />
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Header Area
// ============================================================================

function SlideHeader({ subtitle, id }) {
  return (
    <g>
      {/* Subtitle label */}
      <text x="480" y="35" textAnchor="middle"
        fontFamily="'DM Sans', sans-serif" fontSize="11" fill="#4CAF7D"
        fontWeight="600" letterSpacing="3" textDecoration="none">
        INTRODUCING DUTCHIE:
      </text>

      {/* Main title */}
      <text x="480" y="72" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="32"
        fontStyle="italic" fill="#F0EAD6" fontWeight="400">
        {subtitle || 'The Industry Standard for a Reason'}
      </text>

      {/* Dutchie swirl logo */}
      <g transform="translate(480, 95)">
        <path d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
          fill="none" stroke="#3D8B6A" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  );
}

// ============================================================================
// Corner Leaf Decorations
// ============================================================================

function CornerLeaves() {
  return (
    <g>
      {/* Bottom-left leaf cluster */}
      <path d="M0,540 C20,520 15,495 8,478 C20,490 35,505 50,512 C35,520 18,535 0,540Z"
        fill="#1E4535" opacity="0.25" />
      <path d="M0,520 C15,508 12,490 6,478 C15,486 28,498 38,504 C28,510 14,522 0,528Z"
        fill="#1E4535" opacity="0.15" />

      {/* Top-right leaf cluster */}
      <path d="M960,0 C940,20 945,45 952,62 C940,50 925,35 910,28 C925,20 942,5 960,0Z"
        fill="#1E4535" opacity="0.25" />
      <path d="M960,20 C945,32 948,50 954,62 C945,54 932,42 922,36 C932,30 946,18 960,12Z"
        fill="#1E4535" opacity="0.15" />

      {/* Top-left subtle accent */}
      <path d="M0,0 C15,12 12,30 6,42 C14,32 26,22 36,18 C26,12 14,2 0,0Z"
        fill="#1E4535" opacity="0.12" />

      {/* Bottom-right subtle accent */}
      <path d="M960,540 C945,528 948,510 954,498 C946,508 934,518 924,522 C934,528 946,538 960,540Z"
        fill="#1E4535" opacity="0.12" />
    </g>
  );
}

// ============================================================================
// Intelligence Bar — Standard (with tags)
// ============================================================================

function IntelligenceBar({ y, id, poweredByDex, replaceDutchieAgent }) {
  const barX = 55;
  const barW = 850;
  const barH = 95;

  const tags1 = [
    { icon: '✦', label: 'Agentic Commerce' },
    { icon: '🎙', label: 'Voice AI' },
    { icon: '📋', label: 'Intelligent Summaries' },
    { icon: '★', label: 'Intelligence Everywhere' }
  ];

  const lastTag = replaceDutchieAgent
    ? { icon: '✦', label: 'Dex', gold: true }
    : { icon: '🤖', label: 'Dutchie Agent', gold: false };

  const tags2 = [
    { icon: '💼', label: 'AI Sales Assistant' },
    { icon: '♥', label: 'Consumer Sentiment' },
    lastTag
  ];

  return (
    <g>
      {/* Bar background */}
      <rect x={barX} y={y} width={barW} height={barH}
        rx="12" fill="#163829" stroke="#2A5A45" strokeWidth="1" />

      {/* Rainbow gradient strip at top */}
      <rect x={barX + 1} y={y + 1} width={barW - 2} height="3"
        rx="1" fill={`url(#${id}-rainbow)`} opacity="0.6" />

      {/* Brain icon */}
      <circle cx={barX + 30} cy={y + 28} r="12" fill="none" stroke="#4CAF7D" strokeWidth="1.5" />
      <path d={`M${barX + 25},${y + 28} C${barX + 28},${y + 22} ${barX + 32},${y + 22} ${barX + 35},${y + 28} C${barX + 32},${y + 34} ${barX + 28},${y + 34} ${barX + 25},${y + 28}`}
        fill="none" stroke="#4CAF7D" strokeWidth="1.2" />
      <path d={`M${barX + 30},${y + 20} L${barX + 30},${y + 36}`}
        fill="none" stroke="#4CAF7D" strokeWidth="0.8" opacity="0.5" />

      {/* "intelligence" text */}
      <text x={barX + 52} y={y + 33}
        fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="600" fill="#F0EAD6">
        intelligence
      </text>

      {/* Powered by Dex subtitle */}
      {poweredByDex && (
        <text x={barX + 170} y={y + 33}
          fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" fill="#D4A03A">
          — Powered by Dex
        </text>
      )}

      {/* Row 1 tags */}
      {tags1.map((tag, i) => {
        const tx = barX + 52 + i * 200;
        return (
          <g key={`t1-${i}`}>
            <text x={tx} y={y + 55}
              fontFamily="'DM Sans', sans-serif" fontSize="10" fill="#A8C5B5">
              {tag.icon} {tag.label}
            </text>
          </g>
        );
      })}

      {/* Row 2 tags */}
      {tags2.map((tag, i) => {
        const tx = barX + 52 + i * 200;
        const isGold = tag.gold;
        return (
          <g key={`t2-${i}`}>
            {isGold && (
              <rect x={tx - 6} y={y + 62} width={54} height="18" rx="9"
                fill="none" stroke="#D4A03A" strokeWidth="1" />
            )}
            <text x={tx} y={y + 76}
              fontFamily="'DM Sans', sans-serif" fontSize="10"
              fill={isGold ? '#D4A03A' : '#A8C5B5'}
              fontWeight={isGold ? '700' : '400'}>
              {tag.icon} {tag.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// Intelligence Bar — Simplified (for Slide 3)
// ============================================================================

function IntelligenceBarSimple({ y, id }) {
  const barX = 55;
  const barW = 850;
  const barH = 55;

  return (
    <g>
      <rect x={barX} y={y} width={barW} height={barH}
        rx="12" fill="#163829" stroke="#2A5A45" strokeWidth="1" />

      {/* Rainbow gradient strip */}
      <rect x={barX + 1} y={y + 1} width={barW - 2} height="3"
        rx="1" fill={`url(#${id}-rainbow)`} opacity="0.6" />

      {/* Brain icon */}
      <circle cx={barX + 30} cy={y + 30} r="12" fill="none" stroke="#4CAF7D" strokeWidth="1.5" />
      <path d={`M${barX + 25},${y + 30} C${barX + 28},${y + 24} ${barX + 32},${y + 24} ${barX + 35},${y + 30} C${barX + 32},${y + 36} ${barX + 28},${y + 36} ${barX + 25},${y + 30}`}
        fill="none" stroke="#4CAF7D" strokeWidth="1.2" />

      {/* Main text */}
      <text x={barX + 52} y={y + 35}
        fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="600" fill="#F0EAD6">
        Powered by Dex Intelligence
      </text>

      {/* Sparkle accent */}
      <text x={barX + 260} y={y + 35}
        fontFamily="'DM Sans', sans-serif" fontSize="14" fill="#D4A03A">
        ✦
      </text>
    </g>
  );
}

// ============================================================================
// SLIDE 1: The Current Deck (faithful recreation)
// ============================================================================

function Slide1() {
  const id = 's1';
  const cardY = 120;
  const cardH = 265;

  return (
    <svg width="100%" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 12 }}>
      <SlideDefsStandard id={id} />

      {/* Background */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />

      {/* Outer frame border */}
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      {/* Corner leaf decorations */}
      <CornerLeaves />

      {/* Header */}
      <SlideHeader id={id} />

      {/* Product cards */}
      <FiveCards cardY={cardY} cardH={cardH} id={id} />

      {/* Intelligence bar */}
      <IntelligenceBar y={415} id={id} />
    </svg>
  );
}

// ============================================================================
// SLIDE 2: Proposed — Dex Integrated
// ============================================================================

function Slide2() {
  const id = 's2';
  const cardY = 120;
  const cardH = 265;

  return (
    <svg width="100%" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 12 }}>
      <SlideDefsStandard id={id} />

      {/* Background */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      <CornerLeaves />
      <SlideHeader id={id} />

      {/* Cards with Nexus badge */}
      <FiveCards cardY={cardY} cardH={cardH} id={id} nexusBadge={true} />

      {/* Intelligence bar with Dex replacement */}
      <IntelligenceBar y={415} id={id} poweredByDex={true} replaceDutchieAgent={true} />
    </svg>
  );
}

// ============================================================================
// SLIDE 3: Proposed — Intelligence Elevated (6 cards)
// ============================================================================

function Slide3() {
  const id = 's3';
  const cardY = 120;
  const cardH = 245;

  return (
    <svg width="100%" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 12 }}>
      <SlideDefsStandard id={id} />

      {/* Background */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#2A5A45" strokeWidth="1" />

      <CornerLeaves />

      {/* Modified header */}
      <g>
        <text x="480" y="35" textAnchor="middle"
          fontFamily="'DM Sans', sans-serif" fontSize="11" fill="#4CAF7D"
          fontWeight="600" letterSpacing="3">
          INTRODUCING DUTCHIE:
        </text>
        <text x="480" y="72" textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif" fontSize="32"
          fontStyle="italic" fill="#F0EAD6" fontWeight="400">
          The Complete Dutchie Platform
        </text>
        <g transform="translate(480, 95)">
          <path d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
            fill="none" stroke="#3D8B6A" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* 6 cards */}
      <SixCards cardY={cardY} cardH={cardH} id={id} />

      {/* Simplified intelligence bar */}
      <IntelligenceBarSimple y={478} id={id} />
    </svg>
  );
}

// ============================================================================
// SLIDE 4: Proposed — Dark Premium
// ============================================================================

function Slide4() {
  const id = 's4';

  return (
    <svg width="100%" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 12 }}>
      <defs>
        {/* Dark background gradient */}
        <radialGradient id={`${id}-bgGrad`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#131210" />
          <stop offset="60%" stopColor="#0C0B0A" />
          <stop offset="100%" stopColor="#080706" />
        </radialGradient>

        {/* Gold gradient for icon circles */}
        <linearGradient id={`${id}-goldCircle`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFC02A" />
        </linearGradient>

        {/* Rainbow gradient — gold-tinted */}
        <linearGradient id={`${id}-rainbow`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0504D" />
          <stop offset="16%" stopColor="#D4834D" />
          <stop offset="33%" stopColor="#D4C04D" />
          <stop offset="50%" stopColor="#D4A03A" />
          <stop offset="66%" stopColor="#C49A2A" />
          <stop offset="83%" stopColor="#B8862A" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>

        {/* Card shadow */}
        <filter id={`${id}-cardShadow`} x="-4%" y="-2%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="960" height="540" rx="16" ry="16"
        fill={`url(#${id}-bgGrad)`} />
      <rect x="0.5" y="0.5" width="959" height="539" rx="16" ry="16"
        fill="none" stroke="#3D350F" strokeWidth="1" />

      {/* Subtle corner decorations — dark gold */}
      <path d="M0,540 C20,520 15,495 8,478 C20,490 35,505 50,512 C35,520 18,535 0,540Z"
        fill="#1A1400" opacity="0.3" />
      <path d="M960,0 C940,20 945,45 952,62 C940,50 925,35 910,28 C925,20 942,5 960,0Z"
        fill="#1A1400" opacity="0.3" />

      {/* Header — gold text */}
      <text x="480" y="35" textAnchor="middle"
        fontFamily="'DM Sans', sans-serif" fontSize="11" fill="#D4A03A"
        fontWeight="600" letterSpacing="3">
        INTRODUCING DUTCHIE:
      </text>
      <text x="480" y="72" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="32"
        fontStyle="italic" fill="#F0EAD6" fontWeight="400">
        The Industry Standard for a Reason
      </text>
      <g transform="translate(480, 95)">
        <path d="M-8,-6 C-4,-14 8,-12 8,-4 C8,2 2,6 -2,8 C-6,10 -10,6 -8,2 C-6,-2 0,-4 4,-2"
          fill="none" stroke="#D4A03A" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Dark premium cards */}
      {(() => {
        const cardW = 150;
        const gap = 14;
        const totalW = 5 * cardW + 4 * gap;
        const startX = (960 - totalW) / 2;
        const cardY = 120;
        const cardH = 265;

        const cards = [
          { name: 'E-Commerce', icon: IconEcommerce, features: ['Online Menus', 'Marketplace', 'Payments', 'Checkout', 'Kiosk'], retail: false },
          { name: 'Loyalty', icon: IconLoyalty, features: ['Rewards Programs', 'Customer Profiles', 'Promotions', 'Engagement', 'Analytics'], retail: false },
          { name: 'Retail', icon: IconRetail, features: ['POS System', 'Inventory', 'Compliance', 'Reporting', 'Staff Mgmt'], retail: true },
          { name: 'Nexus', icon: IconNexus, features: ['Data Platform', 'Integrations', 'API Access', 'Webhooks', 'Analytics'], retail: false, leftAccent: true },
          { name: 'Connect', icon: IconConnect, features: ['Partner Network', 'Marketplace', 'Onboarding', 'Support', 'Growth Tools'], retail: false, leftAccent: true }
        ];

        return (
          <g>
            {/* Container */}
            <rect x={startX - 14} y={cardY - 8} width={totalW + 28} height={cardH + 16}
              rx="14" fill="#141210" stroke="#3D350F" strokeWidth="1" />

            {cards.map((card, i) => {
              const cx = startX + i * (cardW + gap);
              const centerX = cx + cardW / 2;
              const isRetail = card.retail;

              const bgFill = isRetail ? '#3D2A0F' : '#1A1917';
              const borderClr = isRetail ? '#5C3D0F' : '#3D350F';
              const circleFill = `url(#${id}-goldCircle)`;
              const iconClr = '#0C0B0A';
              const titleColor = '#E8E3D8';
              const featColor = isRetail ? '#C4A878' : '#8A8278';
              const checkClr = '#D4A03A';

              return (
                <g key={i}>
                  {card.leftAccent && (
                    <rect x={cx - 1} y={cardY + 4} width="2" height={cardH - 8}
                      rx="1" fill="#D4A03A" opacity="0.4" />
                  )}

                  <rect x={cx} y={cardY} width={cardW} height={cardH}
                    rx="12" fill={bgFill} stroke={borderClr} strokeWidth="1"
                    filter={`url(#${id}-cardShadow)`} />

                  <card.icon cx={centerX} cy={cardY + 42} r={22}
                    circleFill={circleFill} iconColor={iconClr} />

                  <text x={centerX} y={cardY + 80} textAnchor="middle"
                    fontFamily="'DM Sans', sans-serif" fontSize="14" fontWeight="700" fill={titleColor}>
                    {card.name}
                  </text>

                  <FeatureLines
                    features={card.features}
                    x={cx + 16}
                    startY={cardY + 102}
                    lineHeight={20}
                    checkColor={checkClr}
                    textColor={featColor}
                    fontSize={11}
                  />

                  {/* Nexus AI badge */}
                  {card.name === 'Nexus' && (
                    <g>
                      <rect x={cx + cardW - 38} y={cardY + 4} width="34" height="16" rx="8"
                        fill="#D4A03A" />
                      <text x={cx + cardW - 21} y={cardY + 15} textAnchor="middle"
                        fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="700" fill="#0C0B0A">
                        {'✦ AI'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* Dark premium intelligence bar */}
      {(() => {
        const y = 415;
        const barX = 55;
        const barW = 850;
        const barH = 95;

        const tags1 = [
          { icon: '✦', label: 'Agentic Commerce' },
          { icon: '🎙', label: 'Voice AI' },
          { icon: '📋', label: 'Intelligent Summaries' },
          { icon: '★', label: 'Intelligence Everywhere' }
        ];
        const tags2 = [
          { icon: '💼', label: 'AI Sales Assistant' },
          { icon: '♥', label: 'Consumer Sentiment' },
          { icon: '✦', label: 'Dex', gold: true }
        ];

        return (
          <g>
            <rect x={barX} y={y} width={barW} height={barH}
              rx="12" fill="#141210" stroke="#3D350F" strokeWidth="1" />

            {/* Gold gradient strip */}
            <rect x={barX + 1} y={y + 1} width={barW - 2} height="3"
              rx="1" fill={`url(#${id}-rainbow)`} opacity="0.7" />

            {/* Brain icon — gold */}
            <circle cx={barX + 30} cy={y + 28} r="12" fill="none" stroke="#D4A03A" strokeWidth="1.5" />
            <path d={`M${barX + 25},${y + 28} C${barX + 28},${y + 22} ${barX + 32},${y + 22} ${barX + 35},${y + 28} C${barX + 32},${y + 34} ${barX + 28},${y + 34} ${barX + 25},${y + 28}`}
              fill="none" stroke="#D4A03A" strokeWidth="1.2" />
            <path d={`M${barX + 30},${y + 20} L${barX + 30},${y + 36}`}
              fill="none" stroke="#D4A03A" strokeWidth="0.8" opacity="0.5" />

            <text x={barX + 52} y={y + 33}
              fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="600" fill="#F0EAD6">
              intelligence
            </text>

            <text x={barX + 170} y={y + 33}
              fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" fill="#D4A03A">
              — Powered by Dex
            </text>

            {tags1.map((tag, i) => (
              <text key={`dt1-${i}`} x={barX + 52 + i * 200} y={y + 55}
                fontFamily="'DM Sans', sans-serif" fontSize="10" fill="#8A7A5A">
                {tag.icon} {tag.label}
              </text>
            ))}

            {tags2.map((tag, i) => {
              const tx = barX + 52 + i * 200;
              return (
                <g key={`dt2-${i}`}>
                  {tag.gold && (
                    <rect x={tx - 6} y={y + 62} width={54} height="18" rx="9"
                      fill="none" stroke="#D4A03A" strokeWidth="1" />
                  )}
                  <text x={tx} y={y + 76}
                    fontFamily="'DM Sans', sans-serif" fontSize="10"
                    fill={tag.gold ? '#D4A03A' : '#8A7A5A'}
                    fontWeight={tag.gold ? '700' : '400'}>
                    {tag.icon} {tag.label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}
    </svg>
  );
}

// ============================================================================
// Slide Wrapper — label, title, SVG, caption
// ============================================================================

function SlideSection({ number, title, caption, children, t }) {
  return (
    <div style={{ marginBottom: 64 }}>
      {/* Slide label */}
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

      {/* SVG container */}
      <div style={{
        width: '100%',
        maxWidth: 920,
        margin: '0 auto',
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${t.border}`
      }}>
        {children}
      </div>

      {/* Caption */}
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
// Main Export
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
      <div style={{ maxWidth: 920, margin: '0 auto 48px auto' }}>
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

      {/* Slides */}
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
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
        >
          <Slide4 />
        </SlideSection>
      </div>
    </div>
  );
}

export default SalesDeckIntegration;
