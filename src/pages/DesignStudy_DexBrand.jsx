import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   DEX BRAND DEEP EXPLORATION
   Golden Spiral Identity System for Dutchie's AI Agent
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Design Tokens ─── */
const T = {
  bg: '#0A0908',
  surface: '#141210',
  card: '#1C1B1A',
  border: '#282724',
  borderSubtle: '#1E1D1B',
  borderAccent: 'rgba(212,160,58,0.25)',
  gold: '#D4A03A',
  amber: '#FFC02A',
  lightGold: '#FFD666',
  text: '#F0EDE8',
  textSecondary: '#ADA599',
  textMuted: '#6B6359',
  success: '#00C27C',
  error: '#E87068',
  font: "'DM Sans', 'Inter', -apple-system, sans-serif",
};

/* ─── Reusable SubTitle ─── */
function SubTitle({ children, style = {} }) {
  return (
    <h3 style={{
      fontSize: 14, fontWeight: 600, color: T.textMuted,
      textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, ...style,
    }}>
      {children}
    </h3>
  );
}

/* ─── Card Wrapper ─── */
function Card({ children, style = {}, highlight = false }) {
  return (
    <div style={{
      background: T.surface, borderRadius: 16, padding: 32,
      border: `1px solid ${highlight ? T.borderAccent : T.border}`,
      ...(highlight ? { boxShadow: '0 0 24px rgba(212,160,58,0.06)' } : {}),
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Color Swatch ─── */
function Swatch({ color, name, hex, size = 72 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: 12, background: color,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }} />
      <span style={{ fontSize: 12, color: T.textSecondary, fontWeight: 500 }}>{name}</span>
      <span style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace' }}>{hex}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   LOGO COMPONENTS — 6 Golden-Spiral-Adjacent Concepts
   ═══════════════════════════════════════════════════════════════════════════════ */

/* 1. Golden Spiral (Chosen) — Fibonacci quarter-circle arcs */
function LogoGoldenSpiral({ size = 48 }) {
  const id = `gs-main-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="45%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/*
        Golden spiral built from quarter-circle arcs.
        Each arc radius is ~1/phi of the previous.
        phi = 1.618, radii: 44.7, 27.6, 17.1, 10.6, 6.5, 4.0, 2.5
        Starting at bottom-center, spiraling inward clockwise.
      */}
      <path
        d={[
          'M 50 95',
          'A 44.7 44.7 0 0 1 5.3 50.3',
          'A 27.6 27.6 0 0 1 32.9 22.7',
          'A 17.1 17.1 0 0 1 50.0 39.8',
          'A 10.6 10.6 0 0 1 39.4 50.4',
          'A 6.5 6.5 0 0 1 45.9 56.9',
          'A 4.0 4.0 0 0 1 49.9 52.9',
          'A 2.5 2.5 0 0 1 47.4 50.4',
        ].join(' ')}
        stroke={`url(#${id})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="50.4" r="1.8" fill={`url(#${id})`} />
    </svg>
  );
}

/* 2. Nautilus Shell — organic spiral with varying stroke width */
function LogoNautilus({ size = 48 }) {
  const id = `nautilus-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Outer chamber — thick stroke */}
      <path
        d="M 52 88 C 20 88 10 65 10 50 C 10 28 28 12 50 12 C 72 12 88 28 88 50 C 88 62 80 72 68 72"
        stroke={`url(#${id})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Middle chamber */}
      <path
        d="M 68 72 C 68 72 72 65 68 56 C 64 47 54 42 46 46 C 38 50 36 60 40 66"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner chamber — thin */}
      <path
        d="M 40 66 C 44 70 50 68 52 64 C 54 60 52 56 48 55"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Core */}
      <circle cx="48" cy="58" r="1.5" fill={`url(#${id})`} />
    </svg>
  );
}

/* 3. Concentric Ripples — offset circles suggesting motion */
function LogoRipples({ size = 48 }) {
  const id = `ripples-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Four concentric circles, offset to bottom-right for motion */}
      <circle cx="46" cy="46" r="42" stroke={`url(#${id})`} strokeWidth="2" opacity="0.25" />
      <circle cx="48" cy="48" r="32" stroke={`url(#${id})`} strokeWidth="2" opacity="0.45" />
      <circle cx="50" cy="50" r="22" stroke={`url(#${id})`} strokeWidth="2.2" opacity="0.7" />
      <circle cx="52" cy="52" r="12" stroke={`url(#${id})`} strokeWidth="2.5" opacity="1" />
      {/* Impact point */}
      <circle cx="54" cy="54" r="3" fill={`url(#${id})`} />
    </svg>
  );
}

/* 4. Phi Symbol — stylized golden ratio symbol */
function LogoPhi({ size = 48 }) {
  const id = `phi-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Vertical stroke of phi */}
      <line x1="50" y1="10" x2="50" y2="90" stroke={`url(#${id})`} strokeWidth="2.8" strokeLinecap="round" />
      {/* Oval/circle of phi — slightly wider than tall */}
      <ellipse cx="50" cy="50" rx="28" ry="24" stroke={`url(#${id})`} strokeWidth="2.8" fill="none" />
      {/* Small accent dots at golden ratio points */}
      <circle cx="50" cy="26" r="2" fill="#FFD666" opacity="0.6" />
      <circle cx="50" cy="74" r="2" fill="#D4A03A" opacity="0.6" />
    </svg>
  );
}

/* 5. Convergence — curved lines flowing to a point */
function LogoConvergence({ size = 48 }) {
  const id = `conv-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Five curved lines converging from edges to focal point */}
      <path d="M 8 20 Q 40 30 58 54" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
      <path d="M 15 8 Q 38 25 58 54" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
      <path d="M 30 5 Q 42 30 58 54" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M 55 5 Q 55 30 58 54" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M 80 10 Q 68 35 58 54" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="1" />
      <path d="M 92 25 Q 75 42 58 54" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <path d="M 95 48 Q 78 50 58 54" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      {/* Focal point — insight */}
      <circle cx="58" cy="54" r="4" fill={`url(#${id})`} />
      {/* Radiating line from focal point — output */}
      <path d="M 58 54 Q 48 72 35 90" stroke="#FFD666" strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

/* 6. DNA Helix — double helix suggesting learning & evolution */
function LogoDNA({ size = 48 }) {
  const id = `dna-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}a`} x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#D4A03A" />
        </linearGradient>
      </defs>
      {/* Strand A — sinusoidal curve */}
      <path
        d="M 30 8 C 70 20 70 35 30 48 C -5 60 -5 75 30 88"
        stroke={`url(#${id}a)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Strand B — inverse sinusoidal */}
      <path
        d="M 70 8 C 30 20 30 35 70 48 C 105 60 105 75 70 88"
        stroke={`url(#${id}b)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cross-links (base pairs) */}
      <line x1="38" y1="14" x2="62" y2="14" stroke="#FFC02A" strokeWidth="1.5" opacity="0.35" />
      <line x1="50" y1="28" x2="50" y2="28" stroke="#FFC02A" strokeWidth="1.5" opacity="0.35" />
      <line x1="33" y1="35" x2="67" y2="35" stroke="#FFC02A" strokeWidth="1.5" opacity="0.4" />
      <line x1="30" y1="48" x2="70" y2="48" stroke="#FFC02A" strokeWidth="1.8" opacity="0.5" />
      <line x1="33" y1="61" x2="67" y2="61" stroke="#FFC02A" strokeWidth="1.5" opacity="0.4" />
      <line x1="38" y1="75" x2="62" y2="75" stroke="#FFC02A" strokeWidth="1.5" opacity="0.35" />
      <line x1="45" y1="84" x2="55" y2="84" stroke="#FFC02A" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

/* ─── Agent Badge with Glow Variants ─── */
function DexBadge({ size = 48, glow = 'idle', spiralSize }) {
  const glowMap = {
    idle: {
      border: 'rgba(212,160,58,0.25)',
      shadow: '0 0 16px rgba(212,160,58,0.15), 0 0 32px rgba(212,160,58,0.06)',
    },
    active: {
      border: 'rgba(255,192,42,0.45)',
      shadow: '0 0 20px rgba(255,192,42,0.35), 0 0 48px rgba(255,192,42,0.15)',
    },
    success: {
      border: 'rgba(0,194,124,0.4)',
      shadow: '0 0 20px rgba(0,194,124,0.3), 0 0 48px rgba(0,194,124,0.12)',
    },
    error: {
      border: 'rgba(232,112,104,0.45)',
      shadow: '0 0 20px rgba(232,112,104,0.3), 0 0 48px rgba(232,112,104,0.12)',
    },
  };
  const g = glowMap[glow] || glowMap.idle;
  const animClass = glow === 'active' ? 'dex-badge-active' : glow === 'success' ? 'dex-badge-success' : '';
  return (
    <div
      className={animClass}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: '#1A1710',
        border: `2px solid ${g.border}`,
        boxShadow: g.shadow,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }}
    >
      <LogoGoldenSpiral size={spiralSize || size * 0.6} />
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — DexBrandSection
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function DexBrandSection() {
  // Load DM Sans
  useEffect(() => {
    if (!document.getElementById('dm-sans-link')) {
      const link = document.createElement('link');
      link.id = 'dm-sans-link';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, fontFamily: T.font }}>
      {/* ═══ CSS Animations ═══ */}
      <style>{`
        /* --- Spin --- */
        @keyframes dex-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* --- Draw stroke --- */
        @keyframes dex-draw {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: 0; }
        }
        /* --- Pulse scale --- */
        @keyframes dex-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        /* --- Breathing glow --- */
        @keyframes dex-breathe {
          0%, 100% { box-shadow: 0 0 16px rgba(212,160,58,0.15), 0 0 32px rgba(212,160,58,0.06); }
          50%      { box-shadow: 0 0 28px rgba(255,192,42,0.4), 0 0 56px rgba(255,192,42,0.15); }
        }
        /* --- Active badge pulsing glow --- */
        @keyframes dex-active-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,192,42,0.25), 0 0 48px rgba(255,192,42,0.1); border-color: rgba(255,192,42,0.35); }
          50%      { box-shadow: 0 0 32px rgba(255,192,42,0.5), 0 0 64px rgba(255,192,42,0.2); border-color: rgba(255,192,42,0.6); }
        }
        .dex-badge-active {
          animation: dex-active-glow 2s ease-in-out infinite !important;
        }
        /* --- Success badge gentle pulse --- */
        @keyframes dex-success-glow {
          0%, 100% { box-shadow: 0 0 16px rgba(0,194,124,0.2), 0 0 40px rgba(0,194,124,0.08); }
          50%      { box-shadow: 0 0 24px rgba(0,194,124,0.4), 0 0 52px rgba(0,194,124,0.15); }
        }
        .dex-badge-success {
          animation: dex-success-glow 3s ease-in-out infinite !important;
        }
        /* --- Thinking dots --- */
        @keyframes dex-dot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 1; transform: scale(1); }
        }
        .dex-dot-1 { animation: dex-dot 1.4s ease-in-out infinite; }
        .dex-dot-2 { animation: dex-dot 1.4s ease-in-out 0.2s infinite; }
        .dex-dot-3 { animation: dex-dot 1.4s ease-in-out 0.4s infinite; }
        /* --- Inline mention hover --- */
        .dex-mention:hover {
          background: rgba(212,160,58,0.15) !important;
          border-color: rgba(212,160,58,0.35) !important;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* ═══════════════════════════════════════ HEADER ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <DexBadge size={72} glow="active" />
          </div>
          <p style={{
            fontSize: 13, fontWeight: 500, color: T.gold, letterSpacing: '0.15em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            Dutchie AI / Brand Exploration
          </p>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 300,
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20,
          }}>
            Dex Brand Deep Dive
          </h1>
          <p style={{
            fontSize: 17, color: T.textSecondary, maxWidth: 560, margin: '0 auto',
            lineHeight: 1.65,
          }}>
            A comprehensive identity exploration for the AI agent at the heart of Dutchie's
            intelligence layer -- from name to mark to motion.
          </p>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 1. NAME EXPLORATION ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Name Candidates
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Six names were explored. Each was evaluated for memorability, domain availability,
            phonetic quality, and conceptual fit with an AI agent that reveals patterns in data.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16,
          }}>
            {[
              {
                name: 'Dex', weight: 500, spacing: '0.04em', chosen: true,
                tagline: 'Dexterity. Index. Intelligence distilled.',
                rationale: 'Short, punchy, technical. Suggests dexterity (skillfulness), index (data retrieval), and sounds like a trustworthy companion. Easy to type, say, and remember.',
              },
              {
                name: 'Aura', weight: 300, spacing: '0.08em', chosen: false,
                tagline: 'Surrounding intelligence, ambient awareness.',
                rationale: 'Evokes an invisible field of awareness -- AI that perceives context without being intrusive. Soft, approachable, slightly mystical.',
              },
              {
                name: 'Sage', weight: 600, spacing: '0.02em', chosen: false,
                tagline: 'Wisdom, counsel, herbal resonance.',
                rationale: 'Double meaning: a wise advisor AND a plant/herb -- strong cannabis industry tie-in. Risk: feels older, slower than the product actually is.',
              },
              {
                name: 'Cipher', weight: 400, spacing: '0.06em', chosen: false,
                tagline: 'Code-breaking, pattern recognition.',
                rationale: 'Suggests decoding hidden patterns in data. Technical and precise. Risk: sounds too cryptographic, potentially intimidating for non-technical users.',
              },
              {
                name: 'Spark', weight: 700, spacing: '0.01em', chosen: false,
                tagline: 'Ignition of insight, neural firing.',
                rationale: 'Energy, initiation, the "aha" moment. Warm and active. Risk: very common name in tech -- Spark (Apache), SparkPost, etc.',
              },
              {
                name: 'Echo', weight: 300, spacing: '0.1em', chosen: false,
                tagline: 'Reflective intelligence, learning from patterns.',
                rationale: 'AI that listens, reflects, and returns refined insight. Poetic. Risk: Amazon Echo owns this space in voice AI.',
              },
            ].map((n) => (
              <Card
                key={n.name}
                highlight={n.chosen}
                style={{
                  position: 'relative',
                  ...(n.chosen ? {
                    border: `2px solid ${T.gold}`,
                    boxShadow: '0 0 32px rgba(212,160,58,0.1)',
                  } : {}),
                }}
              >
                {n.chosen && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(212,160,58,0.15)', border: '1px solid rgba(212,160,58,0.3)',
                    borderRadius: 20, padding: '3px 12px',
                    fontSize: 11, fontWeight: 600, color: T.gold,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    Chosen
                  </div>
                )}
                {/* Wordmark */}
                <div style={{
                  fontFamily: T.font, fontWeight: n.weight, fontSize: 36,
                  letterSpacing: n.spacing, color: T.text, marginBottom: 8,
                }}>
                  {n.name.toLowerCase()}
                </div>
                {/* Tagline */}
                <div style={{ fontSize: 13, color: T.amber, marginBottom: 12, fontStyle: 'italic' }}>
                  {n.tagline}
                </div>
                {/* Rationale */}
                <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                  {n.rationale}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 2. LOGO VARIATIONS ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Logo Variations
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Six mark concepts were developed around the theme of emergent intelligence --
            patterns that unfold, converge, and evolve. Each rendered as inline SVG in gold gradient.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16,
          }}>
            {[
              { label: 'Golden Spiral', sub: 'Fibonacci arcs, mathematical precision', Component: LogoGoldenSpiral, chosen: true },
              { label: 'Nautilus Shell', sub: 'Organic spiral, varying stroke weight', Component: LogoNautilus, chosen: false },
              { label: 'Concentric Ripples', sub: 'Offset circles, motion & impact', Component: LogoRipples, chosen: false },
              { label: 'Phi Symbol', sub: 'Golden ratio letterform', Component: LogoPhi, chosen: false },
              { label: 'Convergence', sub: 'Data streams flowing to insight', Component: LogoConvergence, chosen: false },
              { label: 'DNA Helix', sub: 'Learning & evolution, dual strands', Component: LogoDNA, chosen: false },
            ].map((v) => (
              <Card
                key={v.label}
                highlight={v.chosen}
                style={{
                  ...(v.chosen ? {
                    border: `2px solid ${T.gold}`,
                    boxShadow: '0 0 32px rgba(212,160,58,0.1)',
                  } : {}),
                }}
              >
                {v.chosen && (
                  <div style={{
                    display: 'inline-block', marginBottom: 16,
                    background: 'rgba(212,160,58,0.15)', border: '1px solid rgba(212,160,58,0.3)',
                    borderRadius: 20, padding: '3px 12px',
                    fontSize: 11, fontWeight: 600, color: T.gold,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    Chosen
                  </div>
                )}
                {/* Size demos */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <v.Component size={48} />
                    <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <v.Component size={72} />
                    <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>
                  {v.label}
                </div>
                <div style={{ fontSize: 13, color: T.textSecondary }}>
                  {v.sub}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 3. AGENT AVATAR SYSTEM ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Agent Avatar System
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            The Dex badge -- spiral mark in a dark circle with colored glow -- communicates
            agent state at a glance. Glow color and intensity shift with context.
          </p>

          {/* Glow States */}
          <SubTitle>Glow States</SubTitle>
          <Card style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {[
                { glow: 'idle', label: 'Idle', desc: 'Subtle gold ambient glow. Default resting state.' },
                { glow: 'active', label: 'Active / Thinking', desc: 'Brighter pulsing gold glow. Processing a request.' },
                { glow: 'success', label: 'Success', desc: 'Green-tinted glow. Task completed successfully.' },
                { glow: 'error', label: 'Error', desc: 'Red-tinted glow. Something needs attention.' },
              ].map((s) => (
                <div key={s.glow} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 140 }}>
                  <DexBadge size={56} glow={s.glow} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: T.textMuted, maxWidth: 160, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Size Scale */}
          <SubTitle>Size Scale</SubTitle>
          <Card style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              {[24, 32, 40, 56, 72].map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <DexBadge size={s} glow="idle" />
                  <span style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace' }}>{s}px</span>
                  <span style={{ fontSize: 10, color: T.textMuted }}>
                    {s === 24 ? 'Inline' : s === 32 ? 'Chat' : s === 40 ? 'Card' : s === 56 ? 'Profile' : 'Hero'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Badge on different backgrounds */}
          <SubTitle>Background Contexts</SubTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { bg: '#0A0908', label: 'On Background', border: T.border },
              { bg: '#141210', label: 'On Surface', border: T.border },
              { bg: '#1C1B1A', label: 'On Card', border: '#38332B' },
              { bg: '#F0EDE8', label: 'On Light', border: '#D0CCC4', textColor: '#1A1710' },
            ].map((ctx) => (
              <div key={ctx.label} style={{
                background: ctx.bg, borderRadius: 16, padding: 32,
                border: `1px solid ${ctx.border}`, textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <DexBadge size={48} glow="idle" />
                </div>
                <div style={{ fontSize: 12, color: ctx.textColor || T.textMuted }}>{ctx.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 4. COLOR PALETTE ALTERNATIVES ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Color Palette Alternatives
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Four warm-toned palettes were evaluated. Gold Suite was chosen for its
            warmth, readability on dark backgrounds, and association with wisdom and value.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              {
                name: 'Gold Suite', chosen: true,
                colors: ['#D4A03A', '#FFC02A', '#FFD666'],
                labels: ['Gold', 'Amber', 'Light Gold'],
              },
              {
                name: 'Rose Gold', chosen: false,
                colors: ['#B76E79', '#E8A0AE', '#F4C7C3'],
                labels: ['Rose', 'Blush', 'Petal'],
              },
              {
                name: 'Honey Amber', chosen: false,
                colors: ['#C77E23', '#E89B2D', '#F5C363'],
                labels: ['Honey', 'Amber', 'Nectar'],
              },
              {
                name: 'Sunset Bronze', chosen: false,
                colors: ['#CD7F32', '#DAA06D', '#EDC9A0'],
                labels: ['Bronze', 'Copper', 'Sand'],
              },
            ].map((p) => (
              <Card
                key={p.name}
                highlight={p.chosen}
                style={{
                  ...(p.chosen ? {
                    border: `2px solid ${T.gold}`,
                    boxShadow: '0 0 32px rgba(212,160,58,0.1)',
                  } : {}),
                }}
              >
                {p.chosen && (
                  <div style={{
                    display: 'inline-block', marginBottom: 16,
                    background: 'rgba(212,160,58,0.15)', border: '1px solid rgba(212,160,58,0.3)',
                    borderRadius: 20, padding: '3px 12px',
                    fontSize: 11, fontWeight: 600, color: T.gold,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    Chosen
                  </div>
                )}
                <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 16 }}>
                  {p.name}
                </div>
                {/* Swatches */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {p.colors.map((c, i) => (
                    <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                      <div style={{
                        width: '100%', height: 48, borderRadius: 8, background: c,
                        border: '1px solid rgba(255,255,255,0.06)',
                      }} />
                      <span style={{ fontSize: 10, color: T.textMuted }}>{p.labels[i]}</span>
                      <span style={{ fontSize: 9, color: T.textMuted, fontFamily: 'monospace' }}>{c}</span>
                    </div>
                  ))}
                </div>
                {/* Gradient bar */}
                <div style={{
                  height: 8, borderRadius: 4,
                  background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})`,
                }} />
              </Card>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 5. MOTION & ANIMATION ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Motion & Animation Concepts
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Motion communicates state. These four animation primitives define how the Dex mark
            moves in the interface -- from continuous rotation to stroke reveal.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16,
          }}>
            {/* Spinning */}
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Spinning</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
                Slow continuous rotation, 4s cycle. Used for background loading states.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <div style={{ animation: 'dex-spin 4s linear infinite' }}>
                  <LogoGoldenSpiral size={64} />
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }}>
                animation: spin 4s linear infinite
              </div>
            </Card>

            {/* Drawing */}
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Drawing</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
                Stroke-dasharray reveal. The spiral draws itself from the outside in.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <svg width={64} height={64} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="draw-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#D4A03A" />
                      <stop offset="45%" stopColor="#FFC02A" />
                      <stop offset="100%" stopColor="#FFD666" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 95 A 44.7 44.7 0 0 1 5.3 50.3 A 27.6 27.6 0 0 1 32.9 22.7 A 17.1 17.1 0 0 1 50.0 39.8 A 10.6 10.6 0 0 1 39.4 50.4 A 6.5 6.5 0 0 1 45.9 56.9 A 4.0 4.0 0 0 1 49.9 52.9 A 2.5 2.5 0 0 1 47.4 50.4"
                    stroke="url(#draw-grad)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="400"
                    style={{ animation: 'dex-draw 3s ease-in-out infinite' }}
                  />
                  <circle cx="48" cy="50.4" r="1.8" fill="url(#draw-grad)" />
                </svg>
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }}>
                stroke-dasharray + dashoffset
              </div>
            </Card>

            {/* Pulsing */}
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Pulsing</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
                Gentle heartbeat scale. 1.0 to 1.06, 2s cycle. Signals "alive" state.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <div style={{ animation: 'dex-pulse 2s ease-in-out infinite' }}>
                  <LogoGoldenSpiral size={64} />
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }}>
                transform: scale(1 &rarr; 1.06)
              </div>
            </Card>

            {/* Breathing glow */}
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Breathing Glow</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
                The badge glow fades in and out. Ambient presence indicator.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#1A1710',
                  border: '2px solid rgba(212,160,58,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'dex-breathe 3s ease-in-out infinite',
                }}>
                  <LogoGoldenSpiral size={38} />
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }}>
                box-shadow: glow fade 3s
              </div>
            </Card>
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)' }} />


        {/* ═══════════════════════════════════════ 6. CHAT UI PATTERNS ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
            Chat UI Patterns
          </h2>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Dex lives primarily in a conversational interface. These patterns show
            how the brand identity carries into chat contexts.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20,
          }}>

            {/* === Message Bubble with Avatar === */}
            <Card>
              <SubTitle style={{ marginBottom: 16 }}>Message Bubble</SubTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <DexBadge size={36} glow="idle" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Dex</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500, color: T.gold,
                      background: 'rgba(212,160,58,0.1)', border: '1px solid rgba(212,160,58,0.2)',
                      borderRadius: 10, padding: '1px 8px',
                    }}>
                      AI Agent
                    </span>
                    <span style={{ fontSize: 11, color: T.textMuted, marginLeft: 'auto' }}>2:34 PM</span>
                  </div>
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px',
                    fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    border: '1px solid rgba(212,160,58,0.08)',
                  }}>
                    I found 3 inventory anomalies across your Denver locations.
                    The most significant is a 23% variance in pre-roll stock at
                    your RiNo store -- likely a receiving error from Tuesday's shipment.
                  </div>
                </div>
              </div>
            </Card>

            {/* === Thinking State === */}
            <Card>
              <SubTitle style={{ marginBottom: 16 }}>Thinking State</SubTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <DexBadge size={36} glow="active" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Dex</span>
                    <span style={{ fontSize: 11, color: T.amber, fontStyle: 'italic' }}>Analyzing...</span>
                  </div>
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '14px 20px',
                    border: '1px solid rgba(212,160,58,0.08)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span className="dex-dot-1" style={{ width: 7, height: 7, borderRadius: '50%', background: T.gold, display: 'inline-block' }} />
                    <span className="dex-dot-2" style={{ width: 7, height: 7, borderRadius: '50%', background: T.amber, display: 'inline-block' }} />
                    <span className="dex-dot-3" style={{ width: 7, height: 7, borderRadius: '50%', background: T.lightGold, display: 'inline-block' }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* === Multi-turn Conversation === */}
            <Card style={{ gridColumn: 'span 1' }}>
              <SubTitle style={{ marginBottom: 16 }}>Multi-turn Conversation</SubTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* User message */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <div style={{
                    background: 'rgba(212,160,58,0.08)', borderRadius: '14px 14px 4px 14px',
                    padding: '12px 16px', fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    maxWidth: '80%', border: '1px solid rgba(212,160,58,0.06)',
                  }}>
                    What were our top sellers last week?
                  </div>
                </div>
                {/* Dex reply */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <DexBadge size={28} glow="idle" />
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px',
                    fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    maxWidth: '85%', border: '1px solid rgba(212,160,58,0.08)',
                  }}>
                    Across all locations, your top 3 were: <strong style={{ color: T.text }}>Blue Dream 3.5g</strong> (412 units),{' '}
                    <strong style={{ color: T.text }}>Sour Diesel Cart 1g</strong> (389 units), and{' '}
                    <strong style={{ color: T.text }}>10mg Gummies</strong> (367 units).
                  </div>
                </div>
                {/* User follow-up */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <div style={{
                    background: 'rgba(212,160,58,0.08)', borderRadius: '14px 14px 4px 14px',
                    padding: '12px 16px', fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    maxWidth: '80%', border: '1px solid rgba(212,160,58,0.06)',
                  }}>
                    How does that compare to the week before?
                  </div>
                </div>
                {/* Dex reply 2 */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <DexBadge size={28} glow="idle" />
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px',
                    fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    maxWidth: '85%', border: '1px solid rgba(212,160,58,0.08)',
                  }}>
                    Blue Dream is up <span style={{ color: T.success, fontWeight: 600 }}>+18%</span> week-over-week.
                    Sour Diesel is steady. Gummies dropped <span style={{ color: T.error, fontWeight: 600 }}>-7%</span>,
                    which might correlate with the new chocolate bar launch cannibalizing share.
                  </div>
                </div>
              </div>
            </Card>

            {/* === Inline Mention === */}
            <Card>
              <SubTitle style={{ marginBottom: 16 }}>Inline Mention</SubTitle>
              <div style={{
                background: T.card, borderRadius: 12, padding: '16px 20px',
                fontSize: 14, color: T.textSecondary, lineHeight: 1.7,
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                Not sure about the reorder quantity?{' '}
                <span
                  className="dex-mention"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(212,160,58,0.08)',
                    border: '1px solid rgba(212,160,58,0.18)',
                    borderRadius: 6, padding: '2px 8px 2px 4px',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <DexBadge size={18} glow="idle" />
                  <span style={{ fontWeight: 600, color: T.gold, fontSize: 13 }}>@Dex</span>
                </span>{' '}
                can calculate optimal stock levels based on your sales velocity and lead times.
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>Variants:</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {/* Compact chip */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'rgba(212,160,58,0.06)',
                    border: '1px solid rgba(212,160,58,0.15)',
                    borderRadius: 6, padding: '3px 10px 3px 5px',
                  }}>
                    <DexBadge size={16} glow="idle" />
                    <span style={{ fontWeight: 600, color: T.gold, fontSize: 12 }}>Dex</span>
                  </span>
                  {/* With status */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(212,160,58,0.06)',
                    border: '1px solid rgba(212,160,58,0.15)',
                    borderRadius: 6, padding: '3px 10px 3px 5px',
                  }}>
                    <DexBadge size={16} glow="idle" />
                    <span style={{ fontWeight: 600, color: T.gold, fontSize: 12 }}>Dex</span>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%', background: T.success,
                      display: 'inline-block', marginLeft: 2,
                    }} />
                  </span>
                  {/* Text-only */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    color: T.gold, fontSize: 12, fontWeight: 600,
                  }}>
                    @Dex
                  </span>
                </div>
              </div>
            </Card>

            {/* === Success State === */}
            <Card>
              <SubTitle style={{ marginBottom: 16 }}>Task Complete</SubTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <DexBadge size={36} glow="success" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Dex</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500, color: T.success,
                      background: 'rgba(0,194,124,0.1)', border: '1px solid rgba(0,194,124,0.2)',
                      borderRadius: 10, padding: '1px 8px',
                    }}>
                      Complete
                    </span>
                    <span style={{ fontSize: 11, color: T.textMuted, marginLeft: 'auto' }}>2:35 PM</span>
                  </div>
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px',
                    fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    border: '1px solid rgba(0,194,124,0.12)',
                  }}>
                    Done. I've updated your reorder points for all 12 SKUs and scheduled the
                    PO for review. You can find it in{' '}
                    <span style={{ color: T.success, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                      Orders &gt; Pending
                    </span>.
                  </div>
                </div>
              </div>
            </Card>

            {/* === Error State === */}
            <Card>
              <SubTitle style={{ marginBottom: 16 }}>Error State</SubTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <DexBadge size={36} glow="error" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Dex</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500, color: T.error,
                      background: 'rgba(232,112,104,0.1)', border: '1px solid rgba(232,112,104,0.2)',
                      borderRadius: 10, padding: '1px 8px',
                    }}>
                      Error
                    </span>
                  </div>
                  <div style={{
                    background: T.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px',
                    fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
                    border: '1px solid rgba(232,112,104,0.12)',
                  }}>
                    I couldn't pull the Metrc data for your Boulder location -- the
                    API is returning a timeout. I'll retry automatically in 5 minutes, or you
                    can{' '}
                    <span style={{ color: T.error, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer' }}>
                      try again now
                    </span>.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>


        {/* ═══ Footer ═══ */}
        <div style={{
          padding: '48px 0', textAlign: 'center',
          borderTop: '1px solid #282724',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <DexBadge size={32} glow="idle" />
          </div>
          <p style={{ fontSize: 12, color: T.textMuted }}>
            Dex Brand Exploration -- Dutchie AI Product Suite -- 2026
          </p>
        </div>

      </div>
    </div>
  );
}

export { DexBrandSection };
