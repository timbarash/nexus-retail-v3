// ============================================================================
// DexLogoExploration — 26 Distinct Logo/Icon Concepts for Dex
//
// A comprehensive exploration of logo directions for Dutchie's AI agent
// product "Dex". Covers lettermarks, abstract/geometric, AI/intelligence,
// conversational, nature/organic, and bold/striking categories.
//
// Export: DexLogoExploration({ theme = 'dark' })
// ============================================================================

import React from 'react';

const themes = {
  dark: {
    bg: '#0A0908', cardBg: '#141210', border: '#282724',
    text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359',
    accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666',
    accentGreen: '#00C27C',
  },
  light: {
    bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0',
    text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E',
    accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A',
    accentGreen: '#047857',
  }
};

const FONT = "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";


// ── Shared gradient definition ──────────────────────────────────────────────
function GoldGradient({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4A03A" />
        <stop offset="50%" stopColor="#FFC02A" />
        <stop offset="100%" stopColor="#FFD666" />
      </linearGradient>
    </defs>
  );
}

function GoldRadialGradient({ id }) {
  return (
    <defs>
      <radialGradient id={id} cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
        <stop offset="0%" stopColor="#FFD666" />
        <stop offset="60%" stopColor="#FFC02A" />
        <stop offset="100%" stopColor="#D4A03A" />
      </radialGradient>
    </defs>
  );
}


// ============================================================================
// CATEGORY 1: LETTERMARKS
// ============================================================================

// 1. Stylized "D" — clean geometric D with circuit line
function LogoGeometricD({ size = 64 }) {
  const id = `geo-d-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      <path
        d="M30 18 L30 82 L52 82 C70 82 84 68 84 50 C84 32 70 18 52 18 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Circuit line detail */}
      <line x1="30" y1="50" x2="50" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="50" y2="38" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="35" r="2.5" fill={`url(#${id})`} />
      {/* Data dot nodes */}
      <circle cx="30" cy="50" r="2" fill={`url(#${id})`} />
      <circle cx="67" cy="30" r="1.5" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="73" cy="50" r="1.5" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="67" cy="70" r="1.5" fill={`url(#${id})`} opacity="0.6" />
    </svg>
  );
}

// 2. "dx" ligature — lowercase dx with spark at x crosspoint
function LogoDxLigature({ size = 64 }) {
  const id = `dx-lig-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* d letterform */}
      <path
        d="M18 54 C18 40 28 32 38 32 C48 32 52 40 52 48 L52 20"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M52 48 C52 56 48 64 38 64 C28 64 18 56 18 48"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* x letterform connected via ligature */}
      <line x1="58" y1="34" x2="82" y2="64" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="82" y1="34" x2="58" y2="64" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      {/* Spark at x crosspoint */}
      <circle cx="70" cy="49" r="4" fill={`url(#${id})`} />
      <circle cx="70" cy="49" r="7" stroke={`url(#${id})`} strokeWidth="1" opacity="0.3" fill="none" />
      {/* Ligature connector */}
      <line x1="52" y1="48" x2="58" y2="48" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// 3. "D" made of dots/particles
function LogoDotMatrix({ size = 64 }) {
  const id = `dot-d-${size}-${Math.random().toString(36).slice(2, 6)}`;
  // Generate dots that form a "D" shape
  const dots = [];
  const dShape = [
    [28, 20], [28, 30], [28, 40], [28, 50], [28, 60], [28, 70], [28, 80],
    [38, 18], [48, 16], [58, 18], [66, 24], [72, 32], [74, 42], [74, 50],
    [74, 58], [72, 68], [66, 76], [58, 82], [48, 84], [38, 82],
    // Interior accent dots
    [42, 40], [50, 38], [56, 42], [58, 50], [56, 58], [50, 62], [42, 60],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {dShape.map((pos, i) => (
        <circle
          key={i}
          cx={pos[0]}
          cy={pos[1]}
          r={i < 20 ? 2.8 : 1.8}
          fill={`url(#${id})`}
          opacity={i < 20 ? 1 : 0.55}
        />
      ))}
    </svg>
  );
}

// 4. Negative space "D"
function LogoNegativeD({ size = 64 }) {
  const id = `neg-d-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Outer circle */}
      <circle cx="50" cy="50" r="42" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Inner shape that creates D in negative space */}
      <path
        d="M38 22 L38 78 L54 78 C68 78 78 66 78 50 C78 34 68 22 54 22 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Horizontal bars creating negative space */}
      <line x1="12" y1="36" x2="38" y2="36" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="50" x2="38" y2="50" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="64" x2="38" y2="64" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 5. "D" with golden ratio proportions
function LogoGoldenRatioD({ size = 64 }) {
  const id = `phi-d-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Large phi circle */}
      <circle cx="55" cy="50" r="34" stroke={`url(#${id})`} strokeWidth="2" fill="none" opacity="0.3" />
      {/* Medium phi circle */}
      <circle cx="48" cy="50" r="21" stroke={`url(#${id})`} strokeWidth="2" fill="none" opacity="0.5" />
      {/* Small phi circle */}
      <circle cx="44" cy="50" r="13" stroke={`url(#${id})`} strokeWidth="2" fill="none" opacity="0.7" />
      {/* D formed from phi proportions */}
      <path
        d="M32 18 L32 82 L50 82 C70 82 84 68 84 50 C84 32 70 18 50 18 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Golden ratio dot */}
      <circle cx="50" cy="50" r="2.5" fill={`url(#${id})`} />
    </svg>
  );
}


// ============================================================================
// CATEGORY 2: ABSTRACT / GEOMETRIC
// ============================================================================

// 6. Golden Spiral (current — keep for comparison)
function LogoGoldenSpiral({ size = 64 }) {
  const id = `spiral-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      <path
        d="M50 95 A45 45 0 0 1 5 50
           A27.8 27.8 0 0 1 32.8 22.2
           A17.2 17.2 0 0 1 50 39.4
           A10.6 10.6 0 0 1 39.4 50
           A6.6 6.6 0 0 1 46 56.6
           A4 4 0 0 1 50 52.6
           A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}

// 7. Hexagonal Brain
function LogoHexBrain({ size = 64 }) {
  const id = `hex-brain-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Outer hexagon */}
      <polygon
        points="50,8 90,29 90,71 50,92 10,71 10,29"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Neural pathways inside */}
      <line x1="30" y1="35" x2="50" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="35" x2="50" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="30" y2="65" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="70" y2="65" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="50" y2="30" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="50" y2="72" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pathway nodes */}
      <circle cx="50" cy="50" r="4" fill={`url(#${id})`} />
      <circle cx="30" cy="35" r="2.5" fill={`url(#${id})`} />
      <circle cx="70" cy="35" r="2.5" fill={`url(#${id})`} />
      <circle cx="30" cy="65" r="2.5" fill={`url(#${id})`} />
      <circle cx="70" cy="65" r="2.5" fill={`url(#${id})`} />
      <circle cx="50" cy="30" r="2.5" fill={`url(#${id})`} />
      <circle cx="50" cy="72" r="2" fill={`url(#${id})`} />
    </svg>
  );
}

// 8. Converging Arrows
function LogoConvergingArrows({ size = 64 }) {
  const id = `conv-arr-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Three arrows converging to center */}
      {/* Top arrow */}
      <path d="M50 12 L50 40" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 28 L50 40 L58 28" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Bottom-left arrow */}
      <path d="M18 76 L42 56" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 63 L42 56 L35 72" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Bottom-right arrow */}
      <path d="M82 76 L58 56" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 72 L58 56 L76 63" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Golden center point */}
      <circle cx="50" cy="50" r="6" fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="10" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  );
}

// 9. Infinite Loop with Spark
function LogoInfinityLoop({ size = 64 }) {
  const id = `inf-loop-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Infinity symbol / figure 8 */}
      <path
        d="M50 50 C50 36 62 28 72 28 C84 28 92 38 92 50 C92 62 84 72 72 72 C62 72 50 64 50 50 C50 36 38 28 28 28 C16 28 8 38 8 50 C8 62 16 72 28 72 C38 72 50 64 50 50"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Spark at crosspoint */}
      <circle cx="50" cy="50" r="5" fill={`url(#${id})`} />
      {/* Spark rays */}
      <line x1="50" y1="40" x2="50" y2="43" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="57" x2="50" y2="60" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="50" x2="43" y2="50" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="57" y1="50" x2="60" y2="50" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 10. Diamond Lattice
function LogoDiamondLattice({ size = 64 }) {
  const id = `dia-lat-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Central diamond */}
      <polygon points="50,20 80,50 50,80 20,50" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Inner diamond */}
      <polygon points="50,35 65,50 50,65 35,50" stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round" fill="none" />
      {/* Corner lattice diamonds (partial) */}
      <path d="M50,20 L65,5 L80,20" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5" />
      <path d="M80,50 L95,65 L80,80" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5" />
      <path d="M50,80 L35,95 L20,80" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5" />
      <path d="M20,50 L5,35 L20,20" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={`url(#${id})`} />
      {/* Vertex dots */}
      <circle cx="50" cy="20" r="2" fill={`url(#${id})`} />
      <circle cx="80" cy="50" r="2" fill={`url(#${id})`} />
      <circle cx="50" cy="80" r="2" fill={`url(#${id})`} />
      <circle cx="20" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}


// ============================================================================
// CATEGORY 3: AI / INTELLIGENCE
// ============================================================================

// 11. Neural Eye
function LogoNeuralEye({ size = 64 }) {
  const id = `neural-eye-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Eye shape */}
      <path
        d="M8 50 C8 50 28 22 50 22 C72 22 92 50 92 50 C92 50 72 78 50 78 C28 78 8 50 8 50 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Iris outer */}
      <circle cx="50" cy="50" r="16" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Circuit-board iris pattern */}
      <circle cx="50" cy="50" r="6" fill={`url(#${id})`} />
      <line x1="56" y1="50" x2="66" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="56" x2="50" y2="66" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="50" x2="34" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="44" x2="50" y2="34" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      {/* Circuit nodes */}
      <circle cx="66" cy="50" r="1.5" fill={`url(#${id})`} />
      <circle cx="34" cy="50" r="1.5" fill={`url(#${id})`} />
      <circle cx="50" cy="34" r="1.5" fill={`url(#${id})`} />
      <circle cx="50" cy="66" r="1.5" fill={`url(#${id})`} />
    </svg>
  );
}

// 12. Spark / Lightning
function LogoSpark({ size = 64 }) {
  const id = `spark-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Stylized lightning bolt */}
      <path
        d="M58 8 L32 48 L48 48 L42 92 L68 48 L52 48 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Glow spark at center */}
      <circle cx="50" cy="48" r="3" fill={`url(#${id})`} opacity="0.6" />
      {/* Small radiating lines */}
      <line x1="26" y1="38" x2="20" y2="35" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="74" y1="58" x2="80" y2="61" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

// 13. Pulse Wave (EKG forming a "d")
function LogoPulseWave({ size = 64 }) {
  const id = `pulse-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Baseline */}
      <line x1="6" y1="58" x2="22" y2="58" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Pulse that forms "d" shape */}
      <path
        d="M22 58 L28 58 L32 72 C32 72 32 82 40 82 C48 82 52 72 52 62 L52 18 L52 62 C52 72 56 82 64 82 C70 82 72 72 72 62 L72 46 L78 58 L94 58"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Peak accent */}
      <circle cx="52" cy="18" r="2.5" fill={`url(#${id})`} />
    </svg>
  );
}

// 14. Binary Sun
function LogoBinarySun({ size = 64 }) {
  const id = `bin-sun-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldRadialGradient id={id} />
      <GoldGradient id={`${id}-lin`} />
      {/* Core circle */}
      <circle cx="50" cy="50" r="16" fill={`url(#${id})`} opacity="0.2" />
      <circle cx="50" cy="50" r="16" stroke={`url(#${id}-lin)`} strokeWidth="2.5" fill="none" />
      {/* Inner dot */}
      <circle cx="50" cy="50" r="5" fill={`url(#${id}-lin)`} />
      {/* Data rays — alternating lengths for binary feel */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const innerR = 20;
        const outerR = i % 2 === 0 ? 40 : 30;
        return (
          <line
            key={angle}
            x1={50 + Math.cos(rad) * innerR}
            y1={50 + Math.sin(rad) * innerR}
            x2={50 + Math.cos(rad) * outerR}
            y2={50 + Math.sin(rad) * outerR}
            stroke={`url(#${id}-lin)`}
            strokeWidth={i % 2 === 0 ? 2 : 1.5}
            strokeLinecap="round"
            opacity={i % 2 === 0 ? 0.9 : 0.45}
          />
        );
      })}
    </svg>
  );
}

// 15. Synapse
function LogoSynapse({ size = 64 }) {
  const id = `synapse-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Left dendrite curve */}
      <path
        d="M10 70 C22 70 30 62 36 52 C40 44 42 48 44 48"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right dendrite curve */}
      <path
        d="M90 30 C78 30 70 38 64 48 C60 56 58 52 56 52"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Synaptic gap spark */}
      <circle cx="50" cy="50" r="4" fill={`url(#${id})`} />
      {/* Spark emanation */}
      <circle cx="50" cy="50" r="8" stroke={`url(#${id})`} strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="50" cy="50" r="13" stroke={`url(#${id})`} strokeWidth="0.8" fill="none" opacity="0.2" />
      {/* Terminal bulbs */}
      <circle cx="44" cy="48" r="4" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      <circle cx="56" cy="52" r="4" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Branch dendrites */}
      <path d="M10 70 L6 80" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M10 70 L14 82" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M90 30 L94 20" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M90 30 L86 18" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}


// ============================================================================
// CATEGORY 4: CONVERSATIONAL / FRIENDLY
// ============================================================================

// 16. Chat Bubble with Spark
function LogoChatSpark({ size = 64 }) {
  const id = `chat-spark-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Speech bubble */}
      <path
        d="M16 28 C16 20 22 14 30 14 L70 14 C78 14 84 20 84 28 L84 56 C84 64 78 70 70 70 L38 70 L22 84 L26 70 L30 70 C22 70 16 64 16 56 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Star/spark inside bubble */}
      <path
        d="M50 28 L52.5 38 L62 40 L54 46 L56 56 L50 50 L44 56 L46 46 L38 40 L47.5 38 Z"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={`url(#${id})`}
        opacity="0.8"
      />
    </svg>
  );
}

// 17. Waving Signal / Broadcast
function LogoWavingSignal({ size = 64 }) {
  const id = `wave-sig-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Center source point */}
      <circle cx="50" cy="70" r="5" fill={`url(#${id})`} />
      {/* Wave arcs emanating upward */}
      <path d="M36 60 A20 20 0 0 1 64 60" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M26 50 A32 32 0 0 1 74 50" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M16 40 A44 44 0 0 1 84 40" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M8 28 A55 55 0 0 1 92 28" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* Small sparkle at peak */}
      <circle cx="50" cy="16" r="2" fill={`url(#${id})`} opacity="0.6" />
    </svg>
  );
}

// 18. Compass Rose
function LogoCompassRose({ size = 64 }) {
  const id = `compass-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Outer ring */}
      <circle cx="50" cy="50" r="40" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="8" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Cardinal points — elongated diamond shapes */}
      {/* North */}
      <path d="M50 12 L54 42 L50 46 L46 42 Z" stroke={`url(#${id})`} strokeWidth="1.5" fill={`url(#${id})`} fillOpacity="0.3" strokeLinejoin="round" />
      {/* South */}
      <path d="M50 88 L46 58 L50 54 L54 58 Z" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* East */}
      <path d="M88 50 L58 46 L54 50 L58 54 Z" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* West */}
      <path d="M12 50 L42 54 L46 50 L42 46 Z" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={`url(#${id})`} />
    </svg>
  );
}

// 19. Beacon
function LogoBeacon({ size = 64 }) {
  const id = `beacon-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Lighthouse tower */}
      <path
        d="M42 90 L38 55 L40 52 L60 52 L62 55 L58 90"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lantern room */}
      <rect x="38" y="40" width="24" height="12" rx="2" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      {/* Dome */}
      <path d="M40 40 C40 34 60 34 60 40" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Light source */}
      <circle cx="50" cy="46" r="3" fill={`url(#${id})`} />
      {/* Light rays */}
      <line x1="28" y1="38" x2="18" y2="32" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="46" x2="14" y2="46" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="72" y1="38" x2="82" y2="32" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="74" y1="46" x2="86" y2="46" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="32" x2="50" y2="22" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Base */}
      <line x1="34" y1="90" x2="66" y2="90" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}


// ============================================================================
// CATEGORY 5: NATURE / ORGANIC
// ============================================================================

// 20. Double Helix (DNA)
function LogoDoubleHelix({ size = 64 }) {
  const id = `dna-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Left strand */}
      <path
        d="M25 8 C25 8 70 20 70 35 C70 50 25 50 25 65 C25 80 70 80 70 92"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right strand */}
      <path
        d="M70 8 C70 8 25 20 25 35 C25 50 70 50 70 65 C70 80 25 80 25 92"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cross-links (base pairs) */}
      <line x1="36" y1="21" x2="59" y2="21" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="35" x2="65" y2="35" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="44" y1="50" x2="51" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="65" x2="65" y2="65" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="36" y1="79" x2="59" y2="79" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// 21. Seed / Sprout
function LogoSprout({ size = 64 }) {
  const id = `sprout-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Stem */}
      <path
        d="M50 88 C50 88 50 60 50 50"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right leaf */}
      <path
        d="M50 50 C50 50 52 36 66 28 C80 20 84 26 82 34 C80 42 66 48 50 50"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill={`url(#${id})`}
        fillOpacity="0.15"
      />
      {/* Left leaf */}
      <path
        d="M50 62 C50 62 44 52 30 48 C16 44 14 50 18 56 C22 62 38 64 50 62"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill={`url(#${id})`}
        fillOpacity="0.15"
      />
      {/* Leaf vein right */}
      <path d="M50 50 C56 44 64 36 70 30" stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
      {/* Leaf vein left */}
      <path d="M50 62 C42 58 32 54 24 52" stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
      {/* Seed/root */}
      <ellipse cx="50" cy="90" rx="8" ry="4" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Sparkle at top */}
      <circle cx="66" cy="28" r="2" fill={`url(#${id})`} opacity="0.7" />
    </svg>
  );
}

// 22. Constellation
function LogoConstellation({ size = 64 }) {
  const id = `const-${size}-${Math.random().toString(36).slice(2, 6)}`;
  const stars = [
    { x: 50, y: 16, r: 3.5 },
    { x: 26, y: 34, r: 2.5 },
    { x: 74, y: 30, r: 2.5 },
    { x: 38, y: 58, r: 3 },
    { x: 68, y: 62, r: 2.5 },
    { x: 50, y: 82, r: 3.5 },
    { x: 82, y: 50, r: 2 },
  ];
  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [2, 6], [3, 5], [4, 5], [3, 4],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a].x} y1={stars[a].y}
          x2={stars[b].x} y2={stars[b].y}
          stroke={`url(#${id})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
      ))}
      {/* Star dots */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`url(#${id})`} />
      ))}
    </svg>
  );
}

// 23. Ripple
function LogoRipple({ size = 64 }) {
  const id = `ripple-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Concentric ripple circles */}
      <circle cx="50" cy="50" r="6" fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="14" stroke={`url(#${id})`} strokeWidth="2" fill="none" opacity="0.85" />
      <circle cx="50" cy="50" r="24" stroke={`url(#${id})`} strokeWidth="1.8" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="34" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity="0.38" />
      <circle cx="50" cy="50" r="44" stroke={`url(#${id})`} strokeWidth="1.2" fill="none" opacity="0.18" />
    </svg>
  );
}


// ============================================================================
// CATEGORY 6: BOLD / STRIKING
// ============================================================================

// 24. Stacked Bars (AI chip)
function LogoStackedBars({ size = 64 }) {
  const id = `bars-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Three horizontal bars of decreasing width */}
      <rect x="18" y="24" width="64" height="10" rx="5" stroke={`url(#${id})`} strokeWidth="2.5" fill={`url(#${id})`} fillOpacity="0.15" />
      <rect x="26" y="45" width="48" height="10" rx="5" stroke={`url(#${id})`} strokeWidth="2.5" fill={`url(#${id})`} fillOpacity="0.25" />
      <rect x="34" y="66" width="32" height="10" rx="5" stroke={`url(#${id})`} strokeWidth="2.5" fill={`url(#${id})`} fillOpacity="0.4" />
    </svg>
  );
}

// 25. Crosshair
function LogoCrosshair({ size = 64 }) {
  const id = `crosshair-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Outer ring */}
      <circle cx="50" cy="50" r="38" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="14" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Crosshair lines with gaps */}
      <line x1="50" y1="8" x2="50" y2="32" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="68" x2="50" y2="92" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="50" x2="32" y2="50" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="50" x2="92" y2="50" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={`url(#${id})`} />
    </svg>
  );
}

// 26. Crown
function LogoCrown({ size = 64 }) {
  const id = `crown-${size}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldGradient id={id} />
      {/* Crown shape */}
      <path
        d="M16 68 L16 38 L34 52 L50 22 L66 52 L84 38 L84 68 Z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={`url(#${id})`}
        fillOpacity="0.1"
      />
      {/* Base band */}
      <rect x="16" y="68" width="68" height="10" rx="2" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      {/* Jewel dots on the 3 peaks */}
      <circle cx="50" cy="22" r="3" fill={`url(#${id})`} />
      <circle cx="16" cy="38" r="2.5" fill={`url(#${id})`} />
      <circle cx="84" cy="38" r="2.5" fill={`url(#${id})`} />
    </svg>
  );
}


// ============================================================================
// LOGO CONCEPTS DATA
// ============================================================================

const logoConcepts = [
  // Category 1: Lettermarks
  { category: 'Lettermarks', name: 'Geometric D', description: 'Clean geometric D with circuit trace detail and data nodes', component: LogoGeometricD, favorite: false },
  { category: 'Lettermarks', name: 'dx Ligature', description: 'Lowercase dx with the x crosspoint as a glowing intelligence node', component: LogoDxLigature, favorite: false },
  { category: 'Lettermarks', name: 'Dot Matrix D', description: 'The letter D formed from a particle grid — data coalescing into shape', component: LogoDotMatrix, favorite: false },
  { category: 'Lettermarks', name: 'Negative Space D', description: 'D revealed through geometric cutouts and horizontal scan lines', component: LogoNegativeD, favorite: false },
  { category: 'Lettermarks', name: 'Golden Ratio D', description: 'D constructed from overlapping phi-proportion circles', component: LogoGoldenRatioD, favorite: false },

  // Category 2: Abstract / Geometric
  { category: 'Abstract', name: 'Golden Spiral', description: 'Fibonacci spiral — the current Dex icon, included for comparison', component: LogoGoldenSpiral, favorite: true },
  { category: 'Abstract', name: 'Hex Brain', description: 'Hexagon with internal neural pathways and connection nodes', component: LogoHexBrain, favorite: false },
  { category: 'Abstract', name: 'Converging Arrows', description: 'Three arrows meeting at a golden center — intelligence converging', component: LogoConvergingArrows, favorite: false },
  { category: 'Abstract', name: 'Infinity Spark', description: 'Figure-eight infinity loop with a bright spark at the crosspoint', component: LogoInfinityLoop, favorite: false },
  { category: 'Abstract', name: 'Diamond Lattice', description: 'Interlocking diamond shapes forming a crystalline intelligence pattern', component: LogoDiamondLattice, favorite: false },

  // Category 3: AI / Intelligence
  { category: 'AI / Intelligence', name: 'Neural Eye', description: 'An eye with circuit-board iris — AI that sees and understands', component: LogoNeuralEye, favorite: false },
  { category: 'AI / Intelligence', name: 'Lightning Spark', description: 'Stylized lightning bolt — instant intelligence and golden energy', component: LogoSpark, favorite: false },
  { category: 'AI / Intelligence', name: 'Pulse Wave', description: 'EKG-style pulse that traces a living, breathing d-shape', component: LogoPulseWave, favorite: false },
  { category: 'AI / Intelligence', name: 'Binary Sun', description: 'Radiating circle with alternating data rays — a source of intelligence', component: LogoBinarySun, favorite: false },
  { category: 'AI / Intelligence', name: 'Synapse', description: 'Two dendrites almost touching with a spark in the synaptic gap', component: LogoSynapse, favorite: false },

  // Category 4: Conversational / Friendly
  { category: 'Conversational', name: 'Chat Spark', description: 'Speech bubble with a bright star inside — intelligent conversation', component: LogoChatSpark, favorite: false },
  { category: 'Conversational', name: 'Waving Signal', description: 'Golden broadcast waves emanating upward — broadcasting intelligence', component: LogoWavingSignal, favorite: false },
  { category: 'Conversational', name: 'Compass Rose', description: 'Minimal compass suggesting guidance and direction-finding', component: LogoCompassRose, favorite: false },
  { category: 'Conversational', name: 'Beacon', description: 'Lighthouse beacon emitting golden light rays — a guiding intelligence', component: LogoBeacon, favorite: false },

  // Category 5: Nature / Organic
  { category: 'Nature / Organic', name: 'Double Helix', description: 'DNA strand in gold — the fundamental code of data intelligence', component: LogoDoubleHelix, favorite: false },
  { category: 'Nature / Organic', name: 'Seed Sprout', description: 'A sprouting seedling — AI that grows and evolves with your business', component: LogoSprout, favorite: false },
  { category: 'Nature / Organic', name: 'Constellation', description: 'Connected star dots forming a constellation — pattern recognition', component: LogoConstellation, favorite: false },
  { category: 'Nature / Organic', name: 'Ripple', description: 'Concentric circles radiating from a bright center — spreading impact', component: LogoRipple, favorite: false },

  // Category 6: Bold / Striking
  { category: 'Bold / Striking', name: 'Stacked Bars', description: 'Three converging bars — a simplified AI processing chip aesthetic', component: LogoStackedBars, favorite: false },
  { category: 'Bold / Striking', name: 'Crosshair', description: 'Precision targeting reticle — laser-focused intelligence and accuracy', component: LogoCrosshair, favorite: false },
  { category: 'Bold / Striking', name: 'Crown', description: 'Minimal three-point crown — the king of retail intelligence', component: LogoCrown, favorite: false },
];


// ============================================================================
// CARD COMPONENT
// ============================================================================

function LogoCard({ concept, t }) {
  const Component = concept.component;
  const isFave = concept.favorite;

  return (
    <div style={{
      background: t.cardBg,
      border: `1.5px solid ${isFave ? t.accentGold : t.border}`,
      borderRadius: 14,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      boxShadow: isFave
        ? `0 0 24px ${t.accentGold}18, 0 2px 8px rgba(0,0,0,0.2)`
        : '0 2px 8px rgba(0,0,0,0.15)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}>
      {/* Favorite badge */}
      {isFave && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          fontSize: 10,
          fontWeight: 700,
          fontFamily: FONT,
          color: t.cardBg,
          background: t.accentGold,
          borderRadius: 6,
          padding: '3px 8px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          Current
        </div>
      )}

      {/* Category tag */}
      <div style={{
        fontSize: 10,
        fontWeight: 600,
        fontFamily: FONT,
        color: t.textFaint,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {concept.category}
      </div>

      {/* Hero size icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
      }}>
        <Component size={64} />
      </div>

      {/* Size comparison row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '12px 0',
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Component size={32} />
          <span style={{ fontSize: 9, color: t.textFaint, fontFamily: FONT }}>32px</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Component size={20} />
          <span style={{ fontSize: 9, color: t.textFaint, fontFamily: FONT }}>20px</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Component size={16} />
          <span style={{ fontSize: 9, color: t.textFaint, fontFamily: FONT }}>16px</span>
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 16,
        fontWeight: 700,
        fontFamily: FONT,
        color: t.text,
        letterSpacing: '-0.01em',
      }}>
        {concept.name}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 13,
        fontFamily: FONT,
        color: t.textMuted,
        lineHeight: 1.5,
      }}>
        {concept.description}
      </div>
    </div>
  );
}


// ============================================================================
// CATEGORY HEADER
// ============================================================================

function CategoryHeader({ title, count, t }) {
  return (
    <div style={{
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      paddingTop: 32,
      paddingBottom: 8,
      borderBottom: `1px solid ${t.border}`,
      marginBottom: 4,
    }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: `${t.accentGold}18`,
        border: `1px solid ${t.accentGold}40`,
        color: t.accentGold,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: FONT,
      }}>
        {count}
      </span>
      <h3 style={{
        margin: 0,
        fontSize: 18,
        fontWeight: 700,
        fontFamily: FONT,
        color: t.text,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
    </div>
  );
}


// ============================================================================
// MAIN EXPORT
// ============================================================================

export function DexLogoExploration({ theme = 'dark' }) {
  const t = themes[theme] || themes.dark;

  // Group concepts by category
  const categories = [];
  const seen = new Set();
  for (const c of logoConcepts) {
    if (!seen.has(c.category)) {
      seen.add(c.category);
      categories.push(c.category);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      fontFamily: FONT,
      padding: '48px 24px 96px',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 16,
          }}>
            <LogoGoldenSpiral size={36} />
            <h1 style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              fontFamily: FONT,
              color: t.text,
              letterSpacing: '-0.02em',
            }}>
              Dex Logo Exploration
            </h1>
          </div>

          <p style={{
            margin: '0 0 8px',
            fontSize: 16,
            fontFamily: FONT,
            color: t.textMuted,
            lineHeight: 1.6,
            maxWidth: 640,
          }}>
            Finding the right icon for Dutchie's AI agent. {logoConcepts.length} distinct concepts across {categories.length} categories — from lettermarks to bold abstractions.
          </p>

          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginTop: 16,
          }}>
            {categories.map(cat => {
              const count = logoConcepts.filter(c => c.category === cat).length;
              return (
                <span key={cat} style={{
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: FONT,
                  color: t.textMuted,
                  background: `${t.accentGold}10`,
                  border: `1px solid ${t.accentGold}25`,
                  borderRadius: 20,
                  padding: '4px 12px',
                  letterSpacing: '0.02em',
                }}>
                  {cat} ({count})
                </span>
              );
            })}
          </div>
        </div>

        {/* Comparative strip — all icons side by side */}
        <div style={{
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 48,
          overflowX: 'auto',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: FONT,
            color: t.textFaint,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            All {logoConcepts.length} Concepts at 32px — Quick Compare
          </div>
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {logoConcepts.map((concept, i) => {
              const Comp = concept.component;
              return (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 6px',
                  borderRadius: 8,
                  border: concept.favorite ? `1px solid ${t.accentGold}60` : `1px solid transparent`,
                  background: concept.favorite ? `${t.accentGold}08` : 'transparent',
                  minWidth: 52,
                }}>
                  <Comp size={32} />
                  <span style={{
                    fontSize: 8,
                    fontFamily: FONT,
                    color: t.textFaint,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    maxWidth: 56,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {concept.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid by category */}
        {categories.map(category => {
          const items = logoConcepts.filter(c => c.category === category);
          return (
            <div key={category}>
              <CategoryHeader
                title={category}
                count={items.length}
                t={t}
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginBottom: 16,
                marginTop: 16,
              }}>
                {items.map((concept, i) => (
                  <LogoCard key={i} concept={concept} t={t} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer summary */}
        <div style={{
          marginTop: 48,
          padding: '24px 28px',
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            fontFamily: FONT,
            color: t.text,
            marginBottom: 8,
          }}>
            Evaluation Criteria
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}>
            {[
              { label: 'Scalability', note: 'Must read clearly at 16px (favicon) and 96px (hero)' },
              { label: 'Distinctiveness', note: 'Should be instantly recognizable vs. Nexus and Connect icons' },
              { label: 'Brand Fit', note: 'Gold gradient, geometric precision, intelligence without coldness' },
            ].map((crit, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: FONT,
                  color: t.accentGold,
                  marginBottom: 4,
                }}>
                  {crit.label}
                </div>
                <div style={{
                  fontSize: 12,
                  fontFamily: FONT,
                  color: t.textMuted,
                  lineHeight: 1.5,
                }}>
                  {crit.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DexLogoExploration;
