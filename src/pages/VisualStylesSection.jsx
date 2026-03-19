import { useEffect, useId } from 'react';

/* ══════════════════════════════════════════════════════════════════════════════
   VISUAL STYLES SECTION — 6 Radically Different Aesthetic Directions
   for the Dutchie AI Logo Family (Parent, Platform, Agent, Marketplace)
   ══════════════════════════════════════════════════════════════════════════════ */

/* ─── Shared Constants ─── */
const BG = '#0A0908';
const CARD_BG = '#141210';
const BORDER = '#282724';
const TEXT_PRIMARY = '#F0EDE8';
const TEXT_SECONDARY = '#ADA599';
const TEXT_MUTED = '#6B6359';

const STYLE_DIRECTIONS = [
  {
    id: 'minimal-line',
    name: 'Minimal Line',
    subtitle: 'Current Direction — Refined',
    description: 'Clean single-weight strokes, geometric shapes. Monoline style with 2-3px consistent stroke weight. Elegant and modern.',
    colors: [
      { name: 'Gold', hex: '#D4A03A' },
      { name: 'Amber', hex: '#FFC02A' },
      { name: 'Dark', hex: '#0A0908' },
      { name: 'Warm Gray', hex: '#282724' },
    ],
  },
  {
    id: 'brutalist',
    name: 'Brutalist / Heavy',
    subtitle: 'Bold Geometric Weight',
    description: 'Thick strokes (5-6px), bold geometric shapes. Industrial strength confidence. Unapologetic presence at any size.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gold Accent', hex: '#D4A03A' },
      { name: 'Charcoal', hex: '#1A1A1A' },
      { name: 'Dark', hex: '#0A0908' },
    ],
  },
  {
    id: 'organic',
    name: 'Organic / Flowing',
    subtitle: 'Natural Movement',
    description: 'Smooth curves, no straight lines, natural feel. Inspired by growth, flow, and the living plant world.',
    colors: [
      { name: 'Green', hex: '#00C27C' },
      { name: 'Bright Green', hex: '#00E08E' },
      { name: 'Forest', hex: '#0A2E1C' },
      { name: 'Dark', hex: '#0A0908' },
    ],
  },
  {
    id: 'bauhaus',
    name: 'Geometric / Bauhaus',
    subtitle: 'Pure Form Language',
    description: 'Circles, triangles, and squares only. Inspired by Bauhaus principles — form follows function, reduced to essentials.',
    colors: [
      { name: 'Gold', hex: '#D4A03A' },
      { name: 'Green', hex: '#00C27C' },
      { name: 'Blue', hex: '#64A8E0' },
      { name: 'Dark', hex: '#0A0908' },
    ],
  },
  {
    id: 'gradient-blob',
    name: 'Gradient Blob / Modern SaaS',
    subtitle: 'Contemporary Software Aesthetic',
    description: 'Soft gradients, rounded shapes, blur effects. The modern SaaS look — approachable, premium, and instantly recognizable.',
    colors: [
      { name: 'Gold', hex: '#FFB020' },
      { name: 'Teal', hex: '#00C9A7' },
      { name: 'Purple', hex: '#8B5CF6' },
      { name: 'Dark', hex: '#0A0908' },
    ],
  },
  {
    id: 'cannabis-heritage',
    name: 'Cannabis Heritage',
    subtitle: 'Industry Roots, Modern Treatment',
    description: 'Nods to cannabis culture while maintaining professional polish. Leaf geometry, molecular structures, and community exchange.',
    colors: [
      { name: 'Bright Green', hex: '#00E676' },
      { name: 'Forest', hex: '#042017' },
      { name: 'Lime', hex: '#76FF03' },
      { name: 'Deep Green', hex: '#042017' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 1: MINIMAL LINE LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function MinimalParent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ml-p-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFC02A" />
        </linearGradient>
      </defs>
      {/* Circle frame */}
      <circle cx="50" cy="50" r="42" stroke={`url(#ml-p-${uid})`} strokeWidth="2.5" />
      {/* D monogram — clean single stroke */}
      <path d="M36 28 L36 72 L54 72 C68 72 78 62 78 50 C78 38 68 28 54 28 Z" stroke={`url(#ml-p-${uid})`} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function MinimalPlatform({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ml-pl-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFC02A" />
        </linearGradient>
      </defs>
      {/* Abstract N lettermark from intersecting lines */}
      <line x1="22" y1="78" x2="22" y2="22" stroke={`url(#ml-pl-${uid})`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="78" y2="78" stroke={`url(#ml-pl-${uid})`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="78" y1="78" x2="78" y2="22" stroke={`url(#ml-pl-${uid})`} strokeWidth="2.5" strokeLinecap="round" />
      {/* Horizontal cross-bars for depth */}
      <line x1="22" y1="50" x2="50" y2="50" stroke={`url(#ml-pl-${uid})`} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="50" y1="50" x2="78" y2="50" stroke={`url(#ml-pl-${uid})`} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function MinimalAgent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ml-a-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFC02A" />
        </linearGradient>
      </defs>
      {/* Golden spiral — refined clean arcs */}
      <path
        d="M50 92 A42 42 0 0 1 8 50 A26 26 0 0 1 34 24 A16 16 0 0 1 50 40 A10 10 0 0 1 40 50 A6 6 0 0 1 46 56 A3.7 3.7 0 0 1 50 52.3"
        stroke={`url(#ml-a-${uid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="48.5" cy="50.5" r="1.8" fill="#FFC02A" />
    </svg>
  );
}

function MinimalMarketplace({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ml-m-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFC02A" />
        </linearGradient>
      </defs>
      {/* Two interlocking circles (Venn) */}
      <circle cx="38" cy="50" r="28" stroke={`url(#ml-m-${uid})`} strokeWidth="2.5" />
      <circle cx="62" cy="50" r="28" stroke={`url(#ml-m-${uid})`} strokeWidth="2.5" />
      {/* Center highlight dot */}
      <circle cx="50" cy="50" r="3" fill="#FFC02A" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 2: BRUTALIST / HEAVY LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function BrutalistParent({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Chunky slab-serif D */}
      <rect x="8" y="8" width="84" height="84" rx="4" stroke="#FFFFFF" strokeWidth="5" />
      <path
        d="M28 24 L28 76 L52 76 C68 76 80 66 80 50 C80 34 68 24 52 24 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinejoin="miter"
      />
      {/* Gold accent bar */}
      <rect x="28" y="46" width="22" height="8" fill="#D4A03A" rx="1" />
    </svg>
  );
}

function BrutalistPlatform({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Solid hexagon */}
      <polygon
        points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      {/* Cut-out circuit pattern */}
      <line x1="30" y1="35" x2="70" y2="35" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="square" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="square" />
      <line x1="30" y1="65" x2="70" y2="65" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="square" />
      {/* Gold node accent */}
      <rect x="44" y="44" width="12" height="12" fill="#D4A03A" />
    </svg>
  );
}

function BrutalistAgent({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Heavy spiral with thick blocks */}
      <path
        d="M50 88 L12 88 L12 20 L80 20 L80 72 L28 72 L28 36 L64 36 L64 58 L42 58 L42 46 L56 46"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinejoin="miter"
        strokeLinecap="square"
        fill="none"
      />
      {/* Gold center block */}
      <rect x="46" y="44" width="12" height="6" fill="#D4A03A" />
    </svg>
  );
}

function BrutalistMarketplace({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Two bold squares overlapping */}
      <rect x="10" y="20" width="48" height="48" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="miter" />
      <rect x="42" y="32" width="48" height="48" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="miter" />
      {/* Overlap accent */}
      <rect x="42" y="32" width="16" height="36" fill="#D4A03A" opacity="0.35" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 3: ORGANIC / FLOWING LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function OrganicParent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`org-p-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#00E08E" />
        </linearGradient>
      </defs>
      {/* Organic D with plant-like curves */}
      <path
        d="M34 18 C34 18 30 50 34 82 C40 84 52 86 64 78 C82 66 84 52 82 44 C80 32 70 20 56 18 C48 17 40 17 34 18 Z"
        stroke={`url(#org-p-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner leaf vein */}
      <path
        d="M40 50 C48 42 58 40 68 46"
        stroke={`url(#org-p-${uid})`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M40 62 C48 56 56 55 64 58"
        stroke={`url(#org-p-${uid})`}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function OrganicPlatform({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`org-pl-${uid}`} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#00E08E" />
        </linearGradient>
      </defs>
      {/* Flowing leaf shape */}
      <path
        d="M50 8 C28 20 10 40 16 62 C22 84 42 94 50 92 C58 94 78 84 84 62 C90 40 72 20 50 8 Z"
        stroke={`url(#org-pl-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central vein */}
      <path
        d="M50 18 C50 18 50 50 50 84"
        stroke={`url(#org-pl-${uid})`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Side veins */}
      <path d="M50 36 C38 42 28 50 22 60" stroke={`url(#org-pl-${uid})`} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M50 36 C62 42 72 50 78 60" stroke={`url(#org-pl-${uid})`} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M50 56 C42 62 34 70 30 78" stroke={`url(#org-pl-${uid})`} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M50 56 C58 62 66 70 70 78" stroke={`url(#org-pl-${uid})`} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function OrganicAgent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`org-a-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#00E08E" />
        </linearGradient>
      </defs>
      {/* Smoke/vapor trail curving into spiral */}
      <path
        d="M50 92 C50 92 20 78 14 56 C8 34 26 16 44 14 C62 12 74 24 72 40 C70 56 54 60 48 52 C42 44 50 36 56 40 C62 44 58 50 54 48"
        stroke={`url(#org-a-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Small wisps */}
      <path d="M42 88 C38 82 34 78 32 72" stroke="#00E08E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M58 88 C62 82 64 76 62 70" stroke="#00E08E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function OrganicMarketplace({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`org-m-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#00E08E" />
        </linearGradient>
      </defs>
      {/* Two droplets merging */}
      <path
        d="M35 22 C35 22 12 52 12 65 C12 80 22 86 35 86 C42 86 47 82 50 76"
        stroke={`url(#org-m-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M65 22 C65 22 88 52 88 65 C88 80 78 86 65 86 C58 86 53 82 50 76"
        stroke={`url(#org-m-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Merge point glow */}
      <circle cx="50" cy="76" r="3" fill="#00E08E" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 4: GEOMETRIC / BAUHAUS LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function BauhausParent({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Circle with D cut from negative space */}
      <circle cx="50" cy="50" r="44" fill="#D4A03A" />
      <circle cx="50" cy="50" r="40" fill={BG} />
      {/* D constructed from circle + rectangle */}
      <rect x="30" y="26" width="6" height="48" fill="#D4A03A" />
      <rect x="30" y="26" width="28" height="6" fill="#D4A03A" />
      <rect x="30" y="68" width="28" height="6" fill="#D4A03A" />
      <path d="M58 26 A24 24 0 0 1 58 74" stroke="#D4A03A" strokeWidth="6" fill="none" />
    </svg>
  );
}

function BauhausPlatform({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Square frame */}
      <rect x="10" y="10" width="80" height="80" stroke="#64A8E0" strokeWidth="3" />
      {/* Inscribed circle */}
      <circle cx="50" cy="50" r="36" stroke="#D4A03A" strokeWidth="3" />
      {/* Triangle accent */}
      <polygon points="50,22 72,66 28,66" stroke="#00C27C" strokeWidth="3" fill="none" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill="#D4A03A" />
    </svg>
  );
}

function BauhausAgent({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Golden ratio rectangle */}
      <rect x="10" y="19" width="80" height="62" stroke="#D4A03A" strokeWidth="3" />
      {/* Division line (golden ratio split ~0.618) */}
      <line x1="59.4" y1="19" x2="59.4" y2="81" stroke="#D4A03A" strokeWidth="2" opacity="0.5" />
      {/* Spiral overlay using quarter-circle arcs */}
      <path
        d="M59.4 81 A49.4 49.4 0 0 1 10 81
           M10 81 A38.2 38.2 0 0 1 10 19
           M10 19 A30.6 30.6 0 0 1 59.4 19
           M59.4 19 A23.6 23.6 0 0 1 59.4 57
           M59.4 57 A18.8 18.8 0 0 1 28 57"
        stroke="#00C27C"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Blue accent square */}
      <rect x="28" y="38" width="14" height="14" fill="none" stroke="#64A8E0" strokeWidth="2" />
    </svg>
  );
}

function BauhausMarketplace({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Two triangles pointing at each other — arrows meeting */}
      <polygon points="10,25 48,50 10,75" stroke="#00C27C" strokeWidth="3" fill="none" strokeLinejoin="round" />
      <polygon points="90,25 52,50 90,75" stroke="#64A8E0" strokeWidth="3" fill="none" strokeLinejoin="round" />
      {/* Center meeting point */}
      <circle cx="50" cy="50" r="5" fill="#D4A03A" />
      {/* Horizontal axis */}
      <line x1="18" y1="50" x2="82" y2="50" stroke="#D4A03A" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 5: GRADIENT BLOB / MODERN SAAS LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function GradientParent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`gb-p-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>
      </defs>
      {/* Blob D shape */}
      <path
        d="M32 14 C32 14 28 50 32 86 C38 88 58 92 76 72 C90 56 88 38 78 26 C68 14 50 12 32 14 Z"
        fill={`url(#gb-p-${uid})`}
        opacity="0.9"
      />
      {/* Inner cutout for D counter */}
      <path
        d="M42 34 C50 32 62 36 66 48 C70 60 64 72 52 74 C46 75 42 72 42 72 Z"
        fill={BG}
      />
    </svg>
  );
}

function GradientPlatform({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`gb-pl-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>
        <radialGradient id={`gb-pl-g-${uid}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFD666" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB020" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Rounded square base */}
      <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#gb-pl-${uid})`} />
      {/* Inner glow */}
      <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#gb-pl-g-${uid})`} />
      {/* Abstract N mark cutout */}
      <path d="M32 68 L32 32 L44 32 L62 58 L62 32 L68 32 L68 68 L56 68 L38 42 L38 68 Z" fill={BG} />
    </svg>
  );
}

function GradientAgent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`gb-a-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <radialGradient id={`gb-a-g-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Gradient circle */}
      <circle cx="50" cy="50" r="40" fill={`url(#gb-a-${uid})`} />
      <circle cx="50" cy="50" r="40" fill={`url(#gb-a-g-${uid})`} />
      {/* AI sparkle — 4-point star */}
      <path
        d="M50 22 L53 44 L72 38 L56 50 L72 62 L53 56 L50 78 L47 56 L28 62 L44 50 L28 38 L47 44 Z"
        fill={BG}
        opacity="0.85"
      />
    </svg>
  );
}

function GradientMarketplace({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`gb-m1-${uid}`} x1="0" y1="0" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C9A7" />
          <stop offset="100%" stopColor="#00E5BF" />
        </linearGradient>
        <linearGradient id={`gb-m2-${uid}`} x1="40" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      {/* Two gradient pills overlapping */}
      <rect x="6" y="24" width="52" height="52" rx="26" fill={`url(#gb-m1-${uid})`} />
      <rect x="42" y="24" width="52" height="52" rx="26" fill={`url(#gb-m2-${uid})`} opacity="0.8" />
      {/* Blend zone highlight */}
      <ellipse cx="50" cy="50" rx="12" ry="24" fill="white" opacity="0.15" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLE 6: CANNABIS HERITAGE LOGOS
   ═══════════════════════════════════════════════════════════════════════════════ */

function CannabisParent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ch-p-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#76FF03" />
        </linearGradient>
      </defs>
      {/* Hemp leaf silhouette — modern geometric treatment */}
      {/* Central leaflet */}
      <path d="M50 8 C46 20 42 32 44 44 L50 48 L56 44 C58 32 54 20 50 8 Z" fill={`url(#ch-p-${uid})`} opacity="0.9" />
      {/* Upper side leaflets */}
      <path d="M50 30 C38 18 24 16 18 20 C22 28 32 34 44 38 Z" fill={`url(#ch-p-${uid})`} opacity="0.75" />
      <path d="M50 30 C62 18 76 16 82 20 C78 28 68 34 56 38 Z" fill={`url(#ch-p-${uid})`} opacity="0.75" />
      {/* Lower side leaflets */}
      <path d="M48 42 C36 38 22 40 16 46 C22 52 34 50 46 46 Z" fill={`url(#ch-p-${uid})`} opacity="0.6" />
      <path d="M52 42 C64 38 78 40 84 46 C78 52 66 50 54 46 Z" fill={`url(#ch-p-${uid})`} opacity="0.6" />
      {/* Stem */}
      <line x1="50" y1="48" x2="50" y2="92" stroke={`url(#ch-p-${uid})`} strokeWidth="3" strokeLinecap="round" />
      {/* Small stipule leaves at stem */}
      <path d="M50 70 C44 66 38 68 36 72 C40 74 46 72 50 70 Z" fill="#00E676" opacity="0.45" />
      <path d="M50 70 C56 66 62 68 64 72 C60 74 54 72 50 70 Z" fill="#00E676" opacity="0.45" />
    </svg>
  );
}

function CannabisPlatform({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ch-pl-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#76FF03" />
        </linearGradient>
      </defs>
      {/* Abstract cannabis leaf geometry — 7-pointed star-like shape */}
      <polygon
        points="50,6 56,30 80,14 64,36 94,40 66,50 90,70 60,60 62,90 50,64 38,90 40,60 10,70 34,50 6,40 36,36 20,14 44,30"
        stroke={`url(#ch-pl-${uid})`}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="50" cy="46" r="10" stroke="#00E676" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );
}

function CannabisAgent({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ch-a-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#76FF03" />
        </linearGradient>
      </defs>
      {/* THC molecule structure simplified — hexagons + lines */}
      {/* First hexagonal ring */}
      <polygon
        points="30,30 42,24 52,30 52,42 42,48 30,42"
        stroke={`url(#ch-a-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Second hexagonal ring (fused) */}
      <polygon
        points="52,30 64,24 74,30 74,42 64,48 52,42"
        stroke={`url(#ch-a-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Third ring (pyran-like) */}
      <path
        d="M52 42 L52 56 L42 62 L30 56 L30 42"
        stroke={`url(#ch-a-${uid})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hydroxyl group */}
      <line x1="74" y1="42" x2="84" y2="50" stroke="#00E676" strokeWidth="2" strokeLinecap="round" />
      <circle cx="88" cy="53" r="4" stroke="#00E676" strokeWidth="2" fill="none" />
      {/* Alkyl chain */}
      <line x1="42" y1="62" x2="42" y2="76" stroke="#76FF03" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="76" x2="52" y2="82" stroke="#76FF03" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="82" x2="62" y2="76" stroke="#76FF03" strokeWidth="2" strokeLinecap="round" />
      {/* Bond nodes */}
      <circle cx="42" cy="24" r="2" fill="#00E676" />
      <circle cx="64" cy="24" r="2" fill="#76FF03" />
    </svg>
  );
}

function CannabisMarketplace({ size = 48 }) {
  const uid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`ch-m-${uid}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#76FF03" />
        </linearGradient>
      </defs>
      {/* Two hands exchanging — left hand reaching right */}
      <path
        d="M8 58 L18 52 L28 50 L36 46 L32 38 M28 50 L26 40 M36 46 L44 44 L48 50"
        stroke="#00E676"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left palm */}
      <path d="M18 52 L14 62 L24 66 L34 60 L44 56 L48 50" stroke="#00E676" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right hand reaching left */}
      <path
        d="M92 58 L82 52 L72 50 L64 46 L68 38 M72 50 L74 40 M64 46 L56 44 L52 50"
        stroke="#76FF03"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right palm */}
      <path d="M82 52 L86 62 L76 66 L66 60 L56 56 L52 50" stroke="#76FF03" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Exchange item (small leaf) between hands */}
      <path d="M50 44 C48 38 44 34 50 30 C56 34 52 38 50 44 Z" fill={`url(#ch-m-${uid})`} opacity="0.8" />
      <line x1="50" y1="44" x2="50" y2="34" stroke="#00E676" strokeWidth="1" opacity="0.5" />
      {/* Connection arc */}
      <path d="M48 50 C48 48 52 48 52 50" stroke={`url(#ch-m-${uid})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   LOGO LOOKUP MAP
   ═══════════════════════════════════════════════════════════════════════════════ */

const LOGO_MAP = {
  'minimal-line': {
    parent: MinimalParent,
    platform: MinimalPlatform,
    agent: MinimalAgent,
    marketplace: MinimalMarketplace,
  },
  'brutalist': {
    parent: BrutalistParent,
    platform: BrutalistPlatform,
    agent: BrutalistAgent,
    marketplace: BrutalistMarketplace,
  },
  'organic': {
    parent: OrganicParent,
    platform: OrganicPlatform,
    agent: OrganicAgent,
    marketplace: OrganicMarketplace,
  },
  'bauhaus': {
    parent: BauhausParent,
    platform: BauhausPlatform,
    agent: BauhausAgent,
    marketplace: BauhausMarketplace,
  },
  'gradient-blob': {
    parent: GradientParent,
    platform: GradientPlatform,
    agent: GradientAgent,
    marketplace: GradientMarketplace,
  },
  'cannabis-heritage': {
    parent: CannabisParent,
    platform: CannabisPlatform,
    agent: CannabisAgent,
    marketplace: CannabisMarketplace,
  },
};

const PRODUCT_LABELS = {
  parent: 'Dutchie AI',
  platform: 'Nexus',
  agent: 'Dex',
  marketplace: 'Connect',
};

/* ═══════════════════════════════════════════════════════════════════════════════
   LAYOUT COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

function ColorSwatch({ hex, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: hex,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }} />
      <span style={{ fontSize: 9, color: TEXT_MUTED, fontFamily: 'monospace', letterSpacing: '0.02em' }}>{hex}</span>
    </div>
  );
}

function LogoRow({ styleId, size = 48 }) {
  const logos = LOGO_MAP[styleId];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {['parent', 'platform', 'agent', 'marketplace'].map(key => {
        const Logo = logos[key];
        return (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Logo size={size} />
            <span style={{ fontSize: 10, color: TEXT_MUTED, fontWeight: 500, letterSpacing: '0.04em' }}>
              {PRODUCT_LABELS[key]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BrandBar({ styleId, direction }) {
  const logos = LOGO_MAP[styleId];
  const Parent = logos.parent;
  const barBg = styleId === 'cannabis-heritage' ? '#042017' : '#111110';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
      background: barBg, borderRadius: 8, border: `1px solid ${BORDER}`,
      width: '100%', maxWidth: 400,
    }}>
      <Parent size={28} />
      <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY, letterSpacing: '0.02em' }}>
        Dutchie AI
      </span>
      <span style={{ fontSize: 12, color: TEXT_MUTED, marginLeft: 'auto' }}>
        {direction.name}
      </span>
    </div>
  );
}

function StyleCard({ styleId, direction }) {
  const logos = LOGO_MAP[styleId];
  const Agent = logos.agent;
  return (
    <div style={{
      background: CARD_BG, borderRadius: 12, border: `1px solid ${BORDER}`,
      padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
      maxWidth: 320,
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Agent size={72} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>
          {direction.name}
        </div>
        <div style={{ fontSize: 11, color: TEXT_MUTED, lineHeight: 1.5 }}>
          {direction.description}
        </div>
      </div>
    </div>
  );
}

function StyleSection({ direction, index }) {
  const { id, name, subtitle, description, colors } = direction;
  const sectionBg = id === 'cannabis-heritage'
    ? 'linear-gradient(180deg, #042017 0%, #0A0908 100%)'
    : undefined;

  return (
    <div style={{
      padding: '64px 0',
      borderBottom: `1px solid ${BORDER}`,
      background: sectionBg,
    }}>
      {/* Section header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 20,
          background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER}`,
          fontSize: 11, fontWeight: 600, color: TEXT_MUTED, letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 12,
        }}>
          Style {index + 1} of 6
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, margin: '8px 0 4px' }}>
          {name}
        </h2>
        <p style={{ fontSize: 14, color: TEXT_SECONDARY, margin: 0, fontStyle: 'italic' }}>
          {subtitle}
        </p>
        <p style={{ fontSize: 13, color: TEXT_MUTED, margin: '8px 0 0', maxWidth: 560, lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      {/* Row 1: All 4 logos at 48px */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase',
          letterSpacing: '0.1em', marginBottom: 16,
        }}>
          Logo Family
        </div>
        <LogoRow styleId={id} size={48} />
      </div>

      {/* Row 2: Brand bar + Style card + Color palette */}
      <div style={{
        display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start',
      }}>
        {/* Left column: Brand bar and color palette */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: '1 1 360px', minWidth: 300 }}>
          {/* Brand bar mockup */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: 10,
            }}>
              Brand Bar
            </div>
            <BrandBar styleId={id} direction={direction} />
          </div>

          {/* Color palette */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: 10,
            }}>
              Color Palette
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {colors.map((c, i) => (
                <ColorSwatch key={i} hex={c.hex} name={c.name} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Style card */}
        <StyleCard styleId={id} direction={direction} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   COMPARISON GRID
   ═══════════════════════════════════════════════════════════════════════════════ */

function ComparisonGrid() {
  const products = ['parent', 'platform', 'agent', 'marketplace'];
  return (
    <div style={{ padding: '64px 0' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 8 }}>
        Side-by-Side Comparison
      </h2>
      <p style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 32, lineHeight: 1.5 }}>
        All 6 style directions compared across all 4 product marks. Each column is a style, each row is a product.
      </p>

      {/* Grid table */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{
          borderCollapse: 'separate', borderSpacing: 0,
          width: '100%', minWidth: 800,
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '12px 16px', textAlign: 'left', fontSize: 11,
                color: TEXT_MUTED, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', borderBottom: `1px solid ${BORDER}`,
                position: 'sticky', left: 0, background: BG, zIndex: 2,
                minWidth: 100,
              }}>
                Product
              </th>
              {STYLE_DIRECTIONS.map(dir => (
                <th key={dir.id} style={{
                  padding: '12px 8px', textAlign: 'center', fontSize: 10,
                  color: TEXT_MUTED, fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', borderBottom: `1px solid ${BORDER}`,
                  minWidth: 100,
                }}>
                  {dir.name.split('/')[0].trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, rowIdx) => (
              <tr key={product}>
                <td style={{
                  padding: '16px 16px', fontSize: 12, fontWeight: 600,
                  color: TEXT_SECONDARY, borderBottom: rowIdx < products.length - 1 ? `1px solid rgba(40,39,36,0.5)` : 'none',
                  position: 'sticky', left: 0, background: BG, zIndex: 1,
                }}>
                  {PRODUCT_LABELS[product]}
                </td>
                {STYLE_DIRECTIONS.map(dir => {
                  const Logo = LOGO_MAP[dir.id][product];
                  return (
                    <td key={dir.id} style={{
                      padding: '12px 8px', textAlign: 'center',
                      borderBottom: rowIdx < products.length - 1 ? `1px solid rgba(40,39,36,0.5)` : 'none',
                    }}>
                      <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 64, height: 64, borderRadius: 10, background: CARD_BG, border: `1px solid ${BORDER}` }}>
                        <Logo size={40} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Style labels underneath for quick ref */}
      <div style={{
        display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {STYLE_DIRECTIONS.map((dir, i) => (
          <div key={dir.id} style={{
            padding: '6px 14px', borderRadius: 20,
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
            fontSize: 11, color: TEXT_MUTED, fontWeight: 500,
          }}>
            {i + 1}. {dir.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

export function VisualStylesSection() {
  // Load DM Sans font
  useEffect(() => {
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{
      background: BG,
      color: TEXT_PRIMARY,
      fontFamily: "'DM Sans', sans-serif",
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>

        {/* Page header */}
        <div style={{ padding: '80px 0 40px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: 20,
            background: 'rgba(212,160,58,0.1)', border: '1px solid rgba(212,160,58,0.2)',
            fontSize: 11, fontWeight: 600, color: '#D4A03A', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            Brand Exploration
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: TEXT_PRIMARY, margin: '0 0 12px', lineHeight: 1.1 }}>
            Visual Style Directions
          </h1>
          <p style={{ fontSize: 16, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.6, maxWidth: 620 }}>
            Six radically different aesthetic directions for the Dutchie AI logo family.
            Each direction shows a complete set of four marks: parent brand, platform (Nexus),
            agent (Dex), and marketplace (Connect).
          </p>
        </div>

        {/* Quick overview — all parent marks in a row */}
        <div style={{ padding: '40px 0', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase',
            letterSpacing: '0.1em', marginBottom: 20,
          }}>
            Quick Overview — Parent Marks
          </div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            {STYLE_DIRECTIONS.map((dir, i) => {
              const Parent = LOGO_MAP[dir.id].parent;
              return (
                <div key={dir.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 14,
                    background: CARD_BG, border: `1px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Parent size={48} />
                  </div>
                  <span style={{ fontSize: 10, color: TEXT_MUTED, fontWeight: 500, textAlign: 'center', maxWidth: 80 }}>
                    {i + 1}. {dir.name.split('/')[0].trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Individual style sections */}
        {STYLE_DIRECTIONS.map((dir, i) => (
          <StyleSection key={dir.id} direction={dir} index={i} />
        ))}

        {/* Comparison grid */}
        <ComparisonGrid />

        {/* Footer */}
        <div style={{
          padding: '40px 0', borderTop: `1px solid ${BORDER}`,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>
            Dutchie AI Brand Study — Visual Style Explorations — All logos are inline SVG, viewBox 0 0 100 100
          </p>
        </div>
      </div>
    </div>
  );
}
