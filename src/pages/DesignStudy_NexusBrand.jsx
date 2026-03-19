import { useEffect } from 'react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════════════
   THEME TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */
const T = {
  bg: '#0A0908',
  card: '#141210',
  border: '#282724',
  borderSubtle: '#1E1D1B',
  textPrimary: '#F0EDE8',
  textSecondary: '#ADA599',
  textMuted: '#6B6359',
  gold: '#D4A03A',
  goldMid: '#FFC02A',
  goldLight: '#FFD666',
  font: "'DM Sans', 'Inter', -apple-system, sans-serif",
};

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em',
      color: T.textPrimary, marginBottom: 12, fontFamily: T.font,
    }}>
      {children}
    </h2>
  );
}

function SectionDescription({ children }) {
  return (
    <p style={{
      fontSize: 15, color: T.textSecondary, lineHeight: 1.7,
      maxWidth: 600, marginBottom: 48, fontFamily: T.font,
    }}>
      {children}
    </p>
  );
}

function SubTitle({ children }) {
  return (
    <h3 style={{
      fontSize: 13, fontWeight: 600, color: T.textMuted,
      textTransform: 'uppercase', letterSpacing: '0.1em',
      marginBottom: 20, fontFamily: T.font,
    }}>
      {children}
    </h3>
  );
}

function Card({ children, selected = false, style = {} }) {
  const borderColor = selected ? T.gold : T.border;
  const shadow = selected ? `0 0 0 1px ${T.gold}, 0 4px 24px rgba(212,160,58,0.12)` : 'none';
  return (
    <div style={{
      background: T.card, borderRadius: 16, padding: 24,
      border: `1px solid ${borderColor}`, boxShadow: shadow,
      position: 'relative', ...style,
    }}>
      {selected && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: T.gold, color: '#0A0908',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 6, fontFamily: T.font,
        }}>
          SELECTED
        </div>
      )}
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, #38332B, transparent)',
      margin: '64px 0',
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO ICON VARIANTS (inline SVGs)
   ═══════════════════════════════════════════════════════════════════════════ */

/* --- 2. Starburst --- */
function StarburstIcon({ size = 48 }) {
  const id = `starburst-grad-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Center circle */}
      <circle cx="32" cy="32" r="5" fill={`url(#${id})`} />
      {/* 12 radiating lines at 30-degree intervals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const innerR = 9;
        const outerR = i % 2 === 0 ? 28 : 20;
        const x1 = 32 + Math.cos(angle) * innerR;
        const y1 = 32 + Math.sin(angle) * innerR;
        const x2 = 32 + Math.cos(angle) * outerR;
        const y2 = 32 + Math.sin(angle) * outerR;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`url(#${id})`}
            strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        );
      })}
      {/* Outer ring of dots on major axes */}
      {Array.from({ length: 12 }).filter((_, i) => i % 2 === 0).map((_, idx) => {
        const i = idx * 2;
        const angle = (i * 30) * Math.PI / 180;
        const x = 32 + Math.cos(angle) * 29.5;
        const y = 32 + Math.sin(angle) * 29.5;
        return <circle key={i} cx={x} cy={y} r="1.8" fill={`url(#${id})`} />;
      })}
    </svg>
  );
}

/* --- 3. Neural Node --- */
function NeuralNodeIcon({ size = 48 }) {
  const id = `neural-grad-${size}`;
  const nodes = [
    { angle: 0, dist: 24 },
    { angle: 60, dist: 24 },
    { angle: 120, dist: 24 },
    { angle: 180, dist: 24 },
    { angle: 240, dist: 24 },
    { angle: 300, dist: 24 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Connection lines from center to each node */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 32 + Math.cos(rad) * n.dist;
        const y = 32 + Math.sin(rad) * n.dist;
        return (
          <line key={`line-${i}`} x1="32" y1="32" x2={x} y2={y}
            stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
        );
      })}
      {/* Cross-connections between adjacent outer nodes */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const rad1 = (n.angle * Math.PI) / 180;
        const rad2 = (next.angle * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad1) * n.dist;
        const y1 = 32 + Math.sin(rad1) * n.dist;
        const x2 = 32 + Math.cos(rad2) * next.dist;
        const y2 = 32 + Math.sin(rad2) * next.dist;
        return (
          <line key={`cross-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        );
      })}
      {/* Outer endpoint circles */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 32 + Math.cos(rad) * n.dist;
        const y = 32 + Math.sin(rad) * n.dist;
        return <circle key={`dot-${i}`} cx={x} cy={y} r="3.5" fill={`url(#${id})`} />;
      })}
      {/* Center hub */}
      <circle cx="32" cy="32" r="6" fill={`url(#${id})`} />
      <circle cx="32" cy="32" r="3" fill={T.card} />
    </svg>
  );
}

/* --- 4. Hexagonal --- */
function HexagonalIcon({ size = 48 }) {
  const id = `hex-grad-${size}`;
  // Outer hexagon
  const hexPoints = (cx, cy, r) =>
    Array.from({ length: 6 }).map((_, i) => {
      const angle = (60 * i - 30) * Math.PI / 180;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Outer hexagon */}
      <polygon points={hexPoints(32, 32, 28)} stroke={`url(#${id})`} strokeWidth="2.2" fill="none" />
      {/* Inner hexagon rotated 30deg */}
      <polygon
        points={hexPoints(32, 32, 16)}
        stroke={`url(#${id})`} strokeWidth="1.5" fill="none"
        transform="rotate(30 32 32)"
      />
      {/* Lines connecting inner to outer vertices */}
      {Array.from({ length: 6 }).map((_, i) => {
        const outerAngle = (60 * i - 30) * Math.PI / 180;
        const innerAngle = (60 * i) * Math.PI / 180;
        const ox = 32 + 28 * Math.cos(outerAngle);
        const oy = 32 + 28 * Math.sin(outerAngle);
        const ix = 32 + 16 * Math.cos(innerAngle);
        const iy = 32 + 16 * Math.sin(innerAngle);
        return (
          <line key={i} x1={ox} y1={oy} x2={ix} y2={iy}
            stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.5" />
        );
      })}
      {/* Center dot */}
      <circle cx="32" cy="32" r="3.5" fill={`url(#${id})`} />
      {/* Vertex dots on outer hex */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (60 * i - 30) * Math.PI / 180;
        return (
          <circle key={`ov-${i}`}
            cx={32 + 28 * Math.cos(angle)}
            cy={32 + 28 * Math.sin(angle)}
            r="2" fill={`url(#${id})`}
          />
        );
      })}
    </svg>
  );
}

/* --- 5. Waveform --- */
function WaveformIcon({ size = 48 }) {
  const id = `wave-grad-${size}`;
  // Generate smooth sine wave paths
  const makePath = (yOffset, amplitude, frequency, phase) => {
    const points = [];
    for (let x = 4; x <= 60; x += 1) {
      const y = 32 + yOffset + amplitude * Math.sin((x / 64) * Math.PI * frequency + phase);
      points.push(`${x === 4 ? 'M' : 'L'}${x},${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Multiple layered waveforms */}
      <path d={makePath(-8, 6, 4, 0)} stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
      <path d={makePath(-3, 8, 3.5, 0.8)} stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d={makePath(0, 10, 3, 0)} stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
      <path d={makePath(3, 8, 3.5, -0.8)} stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d={makePath(8, 6, 4, 0)} stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
      {/* Accent dots at wave peaks */}
      <circle cx="15" cy="22" r="2" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="32" cy="22" r="2.5" fill={`url(#${id})`} />
      <circle cx="49" cy="22" r="2" fill={`url(#${id})`} opacity="0.6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAME CANDIDATES
   ═══════════════════════════════════════════════════════════════════════════ */

const NAME_CANDIDATES = [
  {
    name: 'Nexus', selected: true,
    rationale: 'Convergence point. Evokes neural network nodes and the junction where data, intelligence, and retail operations meet.',
    weight: 300, spacing: '0.06em',
  },
  {
    name: 'Apex', selected: false,
    rationale: 'Peak performance and the summit of retail operations. Suggests being at the top, the pinnacle of what AI can deliver.',
    weight: 700, spacing: '0.02em',
  },
  {
    name: 'Cortex', selected: false,
    rationale: 'The brain and intelligence center. Direct reference to the cerebral cortex where higher-order thinking occurs.',
    weight: 500, spacing: '0.04em',
  },
  {
    name: 'Prism', selected: false,
    rationale: 'Multifaceted view of data. Light refracted through analysis reveals hidden patterns and spectra of insight.',
    weight: 400, spacing: '0.08em',
  },
  {
    name: 'Beacon', selected: false,
    rationale: 'A guiding signal, a lighthouse for retail. Implies clarity of direction and illuminating the path forward.',
    weight: 600, spacing: '0.03em',
  },
  {
    name: 'Orbit', selected: false,
    rationale: 'Ecosystem and gravitational pull. Data and services revolving around a central intelligence, held together by gravity.',
    weight: 300, spacing: '0.12em',
  },
];

function NameCandidateCard({ candidate }) {
  const { name, selected, rationale, weight, spacing } = candidate;
  return (
    <Card selected={selected} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        fontFamily: T.font, fontWeight: weight, fontSize: 36,
        letterSpacing: spacing, color: T.textPrimary,
        textTransform: 'lowercase', lineHeight: 1,
      }}>
        {name.toLowerCase()}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: 'monospace', fontSize: 11, color: T.textMuted,
          background: 'rgba(255,255,255,0.04)', padding: '2px 8px',
          borderRadius: 4,
        }}>
          wt {weight} / {spacing}
        </span>
      </div>
      <p style={{
        fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
        margin: 0, fontFamily: T.font,
      }}>
        {rationale}
      </p>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COLOR PALETTE ALTERNATIVES
   ═══════════════════════════════════════════════════════════════════════════ */

const COLOR_PALETTES = [
  {
    name: 'Gold Suite',
    selected: true,
    colors: ['#D4A03A', '#FFC02A', '#FFD666'],
    gradient: 'linear-gradient(90deg, #D4A03A, #FFC02A, #FFD666)',
    description: 'Warm, premium, and authoritative. Gold signals trust, value, and intelligence.',
  },
  {
    name: 'Electric Copper',
    selected: false,
    colors: ['#E07A4F', '#F09060', '#FFB088'],
    gradient: 'linear-gradient(90deg, #E07A4F, #F09060, #FFB088)',
    description: 'Energetic and modern. Copper tones suggest warmth with a technological edge.',
  },
  {
    name: 'Violet Tech',
    selected: false,
    colors: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
    gradient: 'linear-gradient(90deg, #8B5CF6, #A78BFA, #C4B5FD)',
    description: 'Futuristic and creative. Violet conveys innovation and premium AI sophistication.',
  },
  {
    name: 'Teal Signal',
    selected: false,
    colors: ['#14B8A6', '#2DD4BF', '#5EEAD4'],
    gradient: 'linear-gradient(90deg, #14B8A6, #2DD4BF, #5EEAD4)',
    description: 'Clean and data-driven. Teal implies clarity, health, and optimized systems.',
  },
];

function PaletteCard({ palette }) {
  const { name, selected, colors, gradient, description } = palette;
  return (
    <Card selected={selected} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 15, fontWeight: 600, color: T.textPrimary,
          fontFamily: T.font,
        }}>
          {name}
        </span>
      </div>
      {/* Gradient bar */}
      <div style={{
        height: 32, borderRadius: 8, background: gradient,
        border: '1px solid rgba(255,255,255,0.06)',
      }} />
      {/* Individual swatches */}
      <div style={{ display: 'flex', gap: 10 }}>
        {colors.map((color, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10, background: color,
              border: '1px solid rgba(255,255,255,0.06)',
            }} />
            <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>
              {color}
            </span>
          </div>
        ))}
      </div>
      <p style={{
        fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
        margin: 0, fontFamily: T.font,
      }}>
        {description}
      </p>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WORDMARK WEIGHT STUDY
   ═══════════════════════════════════════════════════════════════════════════ */

const WEIGHTS = [300, 400, 500, 600, 700];
const SPACINGS = ['0.02em', '0.04em', '0.06em', '0.08em', '0.12em'];
const CHOSEN_WEIGHT = 300;
const CHOSEN_SPACING = '0.06em';

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO + WORDMARK PAIRING GRID
   ═══════════════════════════════════════════════════════════════════════════ */

const LOGO_VARIANTS_FOR_PAIRING = [
  { name: 'Current', Component: NexusIcon },
  { name: 'Starburst', Component: StarburstIcon },
  { name: 'Neural', Component: NeuralNodeIcon },
];

const WORDMARK_WEIGHTS_FOR_PAIRING = [
  { weight: 300, spacing: '0.06em', label: '300 / 0.06em' },
  { weight: 500, spacing: '0.04em', label: '500 / 0.04em' },
  { weight: 700, spacing: '0.02em', label: '700 / 0.02em' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function NexusBrandSection() {
  // Load DM Sans
  useEffect(() => {
    if (!document.getElementById('dm-sans-brand-link')) {
      const link = document.createElement('link');
      link.id = 'dm-sans-brand-link';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const container = {
    maxWidth: 1040,
    margin: '0 auto',
    padding: '0 24px',
    fontFamily: T.font,
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.textPrimary }}>
      <div style={container}>

        {/* ─── HEADER ─── */}
        <div style={{ textAlign: 'center', padding: '80px 0 48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 24,
          }}>
            <NexusIcon size={36} />
            <span style={{
              fontFamily: T.font, fontWeight: 300, fontSize: 36,
              letterSpacing: '0.06em', color: T.textPrimary,
            }}>
              nexus
            </span>
          </div>
          <p style={{
            fontSize: 13, fontWeight: 500, color: T.gold,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Brand Deep Dive
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 300,
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 20,
            color: T.textPrimary,
          }}>
            Nexus Brand Exploration
          </h1>
          <p style={{
            fontSize: 16, color: T.textSecondary, maxWidth: 560,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            A comprehensive study of naming, iconography, color, and typography
            for Dutchie's AI-powered retail platform.
          </p>
        </div>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           1. NAME EXPLORATION
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Name Candidates</SectionTitle>
          <SectionDescription>
            Six names were evaluated for the AI retail platform. Each was assessed
            for memorability, semantic resonance with AI and commerce, domain
            availability, and visual potential as a wordmark. "Nexus" was selected
            for its dual meaning: a convergence point in networks and the neural
            junction where intelligence meets operations.
          </SectionDescription>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {NAME_CANDIDATES.map((c) => (
              <NameCandidateCard key={c.name} candidate={c} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           2. LOGO VARIATIONS
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Logo Variations</SectionTitle>
          <SectionDescription>
            Five distinct icon concepts were developed. Each explores a different
            visual metaphor for the platform's core idea: convergence of data,
            intelligence, and retail operations. All are rendered in the gold
            gradient palette.
          </SectionDescription>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}>
            {/* 1 - Current / Chosen */}
            <Card selected={true} style={{ textAlign: 'center' }}>
              <SubTitle>Current (Chosen)</SubTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <NexusIcon size={48} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <NexusIcon size={72} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, lineHeight: 1.5 }}>
                Organic swirl of converging arcs. Represents data flowing into a central point of intelligence.
              </p>
            </Card>

            {/* 2 - Starburst */}
            <Card style={{ textAlign: 'center' }}>
              <SubTitle>Starburst</SubTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <StarburstIcon size={48} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <StarburstIcon size={72} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, lineHeight: 1.5 }}>
                Radiating lines from a center point. Embodies convergence and the outward emanation of insight.
              </p>
            </Card>

            {/* 3 - Neural Node */}
            <Card style={{ textAlign: 'center' }}>
              <SubTitle>Neural Node</SubTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <NeuralNodeIcon size={48} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <NeuralNodeIcon size={72} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, lineHeight: 1.5 }}>
                Central hub with six radiating connections. Directly references neural network topology.
              </p>
            </Card>

            {/* 4 - Hexagonal */}
            <Card style={{ textAlign: 'center' }}>
              <SubTitle>Hexagonal</SubTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <HexagonalIcon size={48} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <HexagonalIcon size={72} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, lineHeight: 1.5 }}>
                Nested hexagons with structural connections. Suggests modularity, efficiency, and crystalline order.
              </p>
            </Card>

            {/* 5 - Waveform */}
            <Card style={{ textAlign: 'center' }}>
              <SubTitle>Waveform</SubTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 20, marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <WaveformIcon size={48} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <WaveformIcon size={72} />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: T.textMuted }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, lineHeight: 1.5 }}>
                Layered data waveforms. Abstract representation of signal processing and analytical rhythm.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           3. COLOR PALETTE ALTERNATIVES
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Color Palette Alternatives</SectionTitle>
          <SectionDescription>
            Four color directions were explored. Gold was chosen for its premium
            connotation, warm contrast against dark UI surfaces, and strong
            association with value and trust in commercial contexts. The alternates
            remain viable for future product extensions or sub-brand differentiation.
          </SectionDescription>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {COLOR_PALETTES.map((p) => (
              <PaletteCard key={p.name} palette={p} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           4. WORDMARK WEIGHT STUDY
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Wordmark Weight Study</SectionTitle>
          <SectionDescription>
            "nexus" rendered at every DM Sans weight from 300 to 700, across five
            letter-spacing values. The chosen combination (300 weight, 0.06em) offers
            an elegant, airy feel that balances sophistication with legibility.
          </SectionDescription>

          {/* Matrix header */}
          <div style={{
            background: T.card, borderRadius: 16, border: `1px solid ${T.border}`,
            overflow: 'hidden',
          }}>
            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '100px repeat(5, 1fr)',
              borderBottom: `1px solid ${T.border}`,
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{
                padding: '14px 16px', fontSize: 11, fontFamily: 'monospace',
                color: T.textMuted, fontWeight: 600,
              }}>
                wt \ spacing
              </div>
              {SPACINGS.map((s) => (
                <div key={s} style={{
                  padding: '14px 12px', fontSize: 11, fontFamily: 'monospace',
                  color: T.textMuted, textAlign: 'center',
                }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Rows */}
            {WEIGHTS.map((w, rowIdx) => (
              <div key={w} style={{
                display: 'grid',
                gridTemplateColumns: '100px repeat(5, 1fr)',
                borderBottom: rowIdx < WEIGHTS.length - 1 ? `1px solid ${T.borderSubtle}` : 'none',
              }}>
                <div style={{
                  padding: '20px 16px', fontSize: 12, fontFamily: 'monospace',
                  color: T.textMuted, display: 'flex', alignItems: 'center',
                  fontWeight: 600,
                }}>
                  {w}
                </div>
                {SPACINGS.map((s) => {
                  const isChosen = w === CHOSEN_WEIGHT && s === CHOSEN_SPACING;
                  return (
                    <div key={s} style={{
                      padding: '16px 12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isChosen ? 'rgba(212,160,58,0.08)' : 'transparent',
                      borderLeft: `1px solid ${T.borderSubtle}`,
                      position: 'relative',
                    }}>
                      {isChosen && (
                        <div style={{
                          position: 'absolute', top: 4, right: 6,
                          width: 8, height: 8, borderRadius: '50%',
                          background: T.gold,
                          boxShadow: '0 0 8px rgba(212,160,58,0.5)',
                        }} />
                      )}
                      <span style={{
                        fontFamily: T.font, fontWeight: w,
                        fontSize: 28, letterSpacing: s,
                        color: isChosen ? T.textPrimary : T.textSecondary,
                        textTransform: 'lowercase',
                        whiteSpace: 'nowrap',
                      }}>
                        nexus
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 16,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%', background: T.gold,
              boxShadow: '0 0 6px rgba(212,160,58,0.4)',
            }} />
            <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>
              Chosen: weight 300, letter-spacing 0.06em
            </span>
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           5. LOGO + WORDMARK PAIRING GRID
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Logo + Wordmark Pairing Grid</SectionTitle>
          <SectionDescription>
            Each logo variant paired with three wordmark weights. This matrix helps
            evaluate which icon-to-type combinations achieve the best visual balance
            and brand expression.
          </SectionDescription>

          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 16, marginBottom: 8,
          }}>
            {WORDMARK_WEIGHTS_FOR_PAIRING.map((wm) => (
              <div key={wm.label} style={{
                textAlign: 'center', fontSize: 11, fontFamily: 'monospace',
                color: T.textMuted, padding: '8px 0',
              }}>
                {wm.label}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {LOGO_VARIANTS_FOR_PAIRING.map((logo) => (
            <div key={logo.name} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 11, color: T.textMuted, fontFamily: 'monospace',
                marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {logo.name}
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
              }}>
                {WORDMARK_WEIGHTS_FOR_PAIRING.map((wm) => {
                  const isChosen = logo.name === 'Current' && wm.weight === 300;
                  return (
                    <Card key={wm.label} selected={isChosen} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 14, padding: '28px 20px',
                    }}>
                      <logo.Component size={32} />
                      <span style={{
                        fontFamily: T.font, fontWeight: wm.weight,
                        fontSize: 22, letterSpacing: wm.spacing,
                        color: T.textPrimary, textTransform: 'lowercase',
                      }}>
                        nexus
                      </span>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════════════
           6. MINIMUM SIZE & CLEAR SPACE
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px' }}>
          <SectionTitle>Minimum Size & Clear Space</SectionTitle>
          <SectionDescription>
            Guidelines for how small the logo can be rendered before detail breaks
            down, and the minimum clear space required around the logo to preserve
            its visual integrity.
          </SectionDescription>

          {/* Size study */}
          <SubTitle>Size Scale</SubTitle>
          <Card style={{ marginBottom: 32 }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 28,
              flexWrap: 'wrap', justifyContent: 'center', padding: '16px 0',
            }}>
              {[12, 16, 20, 24, 32, 40, 48, 56, 64].map((s) => {
                const tooSmall = s < 16;
                return (
                  <div key={s} style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 8,
                    opacity: tooSmall ? 0.4 : 1,
                  }}>
                    <div style={{
                      border: tooSmall ? '1px dashed rgba(232,112,104,0.5)' : '1px solid transparent',
                      borderRadius: 4, padding: 2,
                    }}>
                      <NexusIcon size={s} />
                    </div>
                    <span style={{
                      fontSize: 10, fontFamily: 'monospace',
                      color: tooSmall ? '#E87068' : T.textMuted,
                    }}>
                      {s}px
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 16, paddingTop: 16,
              borderTop: `1px solid ${T.borderSubtle}`,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 2,
                border: '1px dashed rgba(232,112,104,0.5)',
              }} />
              <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>
                Below 16px: detail loss, not recommended for production use
              </span>
            </div>
          </Card>

          {/* Clear space diagram */}
          <SubTitle>Clear Space</SubTitle>
          <Card>
            <p style={{
              fontSize: 13, color: T.textSecondary, marginBottom: 24,
              lineHeight: 1.6, fontFamily: T.font,
            }}>
              Minimum padding around the logo should be 1.5x the logo width on all
              sides. This ensures the mark is never crowded by adjacent elements and
              retains its visual weight.
            </p>
            <div style={{
              display: 'flex', justifyContent: 'center', padding: '32px 0',
            }}>
              {/* Clear space visualization */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Outer zone (1.5x padding visualization) */}
                <div style={{
                  width: 48 + 72 + 72, height: 48 + 72 + 72,
                  border: '1px dashed rgba(212,160,58,0.3)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {/* Inner zone */}
                  <div style={{
                    width: 48, height: 48,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(212,160,58,0.15)',
                    borderRadius: 4,
                    background: 'rgba(212,160,58,0.04)',
                  }}>
                    <NexusIcon size={36} />
                  </div>

                  {/* Dimension annotations - top */}
                  <div style={{
                    position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, fontFamily: 'monospace', color: 'rgba(212,160,58,0.6)',
                  }}>
                    1.5x
                  </div>
                  {/* Bottom */}
                  <div style={{
                    position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, fontFamily: 'monospace', color: 'rgba(212,160,58,0.6)',
                  }}>
                    1.5x
                  </div>
                  {/* Left */}
                  <div style={{
                    position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
                    fontSize: 10, fontFamily: 'monospace', color: 'rgba(212,160,58,0.6)',
                  }}>
                    1.5x
                  </div>
                  {/* Right */}
                  <div style={{
                    position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                    fontSize: 10, fontFamily: 'monospace', color: 'rgba(212,160,58,0.6)',
                  }}>
                    1.5x
                  </div>

                  {/* Dashed lines from logo edges to outer boundary */}
                  {/* Top line */}
                  <svg style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)' }}
                    width="1" height={72 - 26} viewBox={`0 0 1 ${72 - 26}`}>
                    <line x1="0.5" y1="0" x2="0.5" y2={72 - 26}
                      stroke="rgba(212,160,58,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                  {/* Bottom line */}
                  <svg style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
                    width="1" height={72 - 26} viewBox={`0 0 1 ${72 - 26}`}>
                    <line x1="0.5" y1="0" x2="0.5" y2={72 - 26}
                      stroke="rgba(212,160,58,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                  {/* Left line */}
                  <svg style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}
                    width={72 - 26} height="1" viewBox={`0 0 ${72 - 26} 1`}>
                    <line x1="0" y1="0.5" x2={72 - 26} y2="0.5"
                      stroke="rgba(212,160,58,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                  {/* Right line */}
                  <svg style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
                    width={72 - 26} height="1" viewBox={`0 0 ${72 - 26} 1`}>
                    <line x1="0" y1="0.5" x2={72 - 26} y2="0.5"
                      stroke="rgba(212,160,58,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Clear space spec table */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12, marginTop: 24, paddingTop: 20,
              borderTop: `1px solid ${T.borderSubtle}`,
            }}>
              {[
                { label: 'Logo width', value: 'W' },
                { label: 'Min clear space', value: '1.5 x W' },
                { label: 'Min rendering size', value: '16px' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                  padding: '12px 16px', textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: 18, fontWeight: 600, color: T.gold,
                    fontFamily: 'monospace', marginBottom: 4,
                  }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Divider />

        {/* ─── FOOTER ─── */}
        <div style={{
          padding: '32px 0 64px', textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 12,
          }}>
            <NexusIcon size={16} />
            <span style={{
              fontFamily: T.font, fontWeight: 300, fontSize: 14,
              letterSpacing: '0.06em', color: T.textMuted,
            }}>
              nexus
            </span>
          </div>
          <p style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>
            Brand Exploration Study — Dutchie AI Product Suite — 2026
          </p>
        </div>
      </div>
    </div>
  );
}
