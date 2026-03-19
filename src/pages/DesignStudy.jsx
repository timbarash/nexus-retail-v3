import { useState, useEffect, useRef } from 'react';
import NexusIcon from '../components/NexusIcon';
import { NexusDeepSection } from '../components/NexusDeepSection';
import { ColorTypographySection } from './ColorTypographySection';
import { ProductHierarchySection } from './ProductHierarchySection';
import { DNameExplorationSection } from './DNameExplorationSection';
import { VisualStylesSection } from './VisualStylesSection';

/* ─── Golden Spiral SVG (Dex Logo) ─── */
function DexSpiral({ size = 48, className = '', style = {} }) {
  const id = `dex-spiral-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Fibonacci golden spiral built from quarter-circle arcs */}
      <path
        d="M50 95 A45 45 0 0 1 5 50
           A27.8 27.8 0 0 1 32.8 22.2
           A17.2 17.2 0 0 1 50 39.4
           A10.6 10.6 0 0 1 39.4 50
           A6.6 6.6 0 0 1 46 56.6
           A4 4 0 0 1 50 52.6
           A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center dot */}
      <circle cx="48" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── Dex Agent Badge ─── */
function DexBadge({ size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#1A1710',
      border: '2px solid rgba(212,160,58,0.3)',
      boxShadow: '0 0 20px rgba(212,160,58,0.2), 0 0 40px rgba(212,160,58,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <DexSpiral size={size * 0.6} />
    </div>
  );
}

/* ─── Connect Link Icon ─── */
function ConnectIcon({ size = 48, className = '', style = {} }) {
  const id = `connect-grad-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Two interlocking rounded chain links */}
      <rect x="12" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <rect x="48" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      {/* Connection nodes */}
      <circle cx="32" cy="50" r="4" fill="#00C27C" />
      <circle cx="68" cy="50" r="4" fill="#64A8E0" />
    </svg>
  );
}

/* ─── Animated Network Constellation ─── */
function NetworkConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const W = 600, H = 300;
    canvas.width = W; canvas.height = H;

    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2 + Math.random() * 3,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,194,124,${0.3 * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      // Nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.r > 4 ? '#00C27C' : '#64A8E0';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 600, height: 300, borderRadius: 12, border: '1px solid #282724' }} />;
}

/* ─── Color Swatch ─── */
function Swatch({ color, name, hex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 12, background: color,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }} />
      <span style={{ fontSize: 12, color: '#ADA599', fontWeight: 500 }}>{name}</span>
      <span style={{ fontSize: 11, color: '#6B6359', fontFamily: 'monospace' }}>{hex}</span>
    </div>
  );
}

/* ─── Section Nav ─── */
const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'nexus', label: 'Nexus' },
  { id: 'dex', label: 'Dex' },
  { id: 'connect', label: 'Connect' },
  { id: 'colors', label: 'Colors' },
  { id: 'family', label: 'Family' },
  { id: 'hierarchy', label: 'Hierarchy' },
  { id: 'dnames', label: 'D-Names' },
  { id: 'styles', label: 'Styles' },
];

function SectionNav({ active }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,9,8,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #282724',
      display: 'flex', justifyContent: 'center', gap: 4, padding: '12px 16px',
    }}>
      {SECTIONS.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{
            padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            color: active === s.id ? '#F0EDE8' : '#6B6359',
            background: active === s.id ? 'rgba(212,160,58,0.12)' : 'transparent',
            border: active === s.id ? '1px solid rgba(212,160,58,0.2)' : '1px solid transparent',
            textDecoration: 'none', transition: 'all 0.2s',
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

/* ─── Typography Specimen ─── */
function TypeSpecimen({ family = 'DM Sans' }) {
  const weights = [
    { weight: 300, label: 'Light' },
    { weight: 400, label: 'Regular' },
    { weight: 500, label: 'Medium' },
    { weight: 600, label: 'SemiBold' },
    { weight: 700, label: 'Bold' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {weights.map(w => (
        <div key={w.weight} style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <span style={{ width: 100, fontSize: 12, color: '#6B6359', fontFamily: 'monospace' }}>{w.weight} {w.label}</span>
          <span style={{ fontFamily: `'${family}', sans-serif`, fontWeight: w.weight, fontSize: 28, color: '#F0EDE8', letterSpacing: '0.01em' }}>
            Aa Bb Cc 0123
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Section Wrapper ─── */
function Section({ id, children }) {
  return (
    <section id={id} style={{ padding: '80px 0', scrollMarginTop: 56 }}>
      {children}
    </section>
  );
}

/* ─── Subsection Title ─── */
function SubTitle({ children }) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
      {children}
    </h3>
  );
}

/* ─── Logo Size Demo ─── */
function LogoSizes({ component: C, sizes = [16, 24, 36, 48, 72] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      {sizes.map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <C size={s} />
          <span style={{ fontSize: 11, color: '#6B6359', fontFamily: 'monospace' }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Logo Variant: Chain Links (current) ─── */
function ChainLinksLogo({ size = 48, color1 = '#00C27C', color2 = '#64A8E0' }) {
  const id = `chain-${size}-${color1.replace('#', '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <rect x="12" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <rect x="48" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <circle cx="32" cy="50" r="4" fill={color1} />
      <circle cx="68" cy="50" r="4" fill={color2} />
    </svg>
  );
}

/* ─── Logo Variant: Handshake ─── */
function HandshakeLogo({ size = 48, color1 = '#00C27C', color2 = '#64A8E0' }) {
  const id = `handshake-${size}-${color1.replace('#', '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {/* Left hand - abstract geometric */}
      <path
        d="M10 58 L22 46 L34 46 L50 54"
        stroke={color1}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Left fingers */}
      <path
        d="M34 46 L38 38 M30 46 L33 40"
        stroke={color1}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right hand - abstract geometric */}
      <path
        d="M90 58 L78 46 L66 46 L50 54"
        stroke={color2}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right fingers */}
      <path
        d="M66 46 L62 38 M70 46 L67 40"
        stroke={color2}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Clasp point */}
      <circle cx="50" cy="54" r="5" fill={`url(#${id})`} />
      {/* Wrist base lines */}
      <line x1="10" y1="58" x2="10" y2="68" stroke={color1} strokeWidth="4" strokeLinecap="round" />
      <line x1="90" y1="58" x2="90" y2="68" stroke={color2} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Logo Variant: Bridge Arch ─── */
function BridgeArchLogo({ size = 48, color1 = '#00C27C', color2 = '#64A8E0' }) {
  const id = `bridge-${size}-${color1.replace('#', '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {/* Left pillar */}
      <rect x="12" y="45" width="10" height="35" rx="3" fill={color1} />
      {/* Right pillar */}
      <rect x="78" y="45" width="10" height="35" rx="3" fill={color2} />
      {/* Arch span */}
      <path
        d="M17 48 Q50 8 83 48"
        stroke={`url(#${id})`}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Road deck */}
      <line x1="8" y1="58" x2="92" y2="58" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
      {/* Suspension cables */}
      <line x1="30" y1="30" x2="30" y2="58" stroke={`url(#${id})`} strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="18" x2="50" y2="58" stroke={`url(#${id})`} strokeWidth="2" opacity="0.5" />
      <line x1="70" y1="30" x2="70" y2="58" stroke={`url(#${id})`} strokeWidth="2" opacity="0.5" />
      {/* Foundation dots */}
      <circle cx="17" cy="80" r="3" fill={color1} />
      <circle cx="83" cy="80" r="3" fill={color2} />
    </svg>
  );
}

/* ─── Logo Variant: Mesh Nodes ─── */
function MeshNodesLogo({ size = 48, color1 = '#00C27C', color2 = '#64A8E0' }) {
  const id = `mesh-${size}-${color1.replace('#', '')}`;
  const nodes = [
    { cx: 50, cy: 18, r: 5 },
    { cx: 20, cy: 38, r: 4 },
    { cx: 80, cy: 38, r: 4 },
    { cx: 30, cy: 68, r: 5 },
    { cx: 70, cy: 68, r: 5 },
    { cx: 50, cy: 88, r: 4 },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],
    [1,2],[1,3],
    [2,4],
    [3,4],[3,5],
    [4,5],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {edges.map(([a,b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={`url(#${id})`}
          strokeWidth="2"
          opacity="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx} cy={n.cy} r={n.r}
          fill={i % 2 === 0 ? color1 : color2}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════════════════ */
/* ═══  CONNECT DEEP SECTION — Expanded Brand Exploration                               ═══ */
/* ═══════════════════════════════════════════════════════════════════════════════════════════ */

export function ConnectDeepSection() {
  const SubTitle = ({ children }) => (
    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
      {children}
    </h3>
  );

  const card = {
    background: '#141210',
    borderRadius: 16,
    padding: 32,
    border: '1px solid #282724',
  };

  const divider = {
    height: 1,
    background: 'linear-gradient(90deg, transparent, #38332B, transparent)',
    margin: '56px 0',
  };

  /* ── Name candidates ── */
  const names = [
    { name: 'connect', weight: 600, spacing: '0.02em', rationale: 'Direct, action-oriented. Immediately communicates purpose: linking retailers and brands in a shared marketplace.' },
    { name: 'bridge', weight: 500, spacing: '0.04em', rationale: 'Structural metaphor. Evokes strength and permanence, two sides joined by engineering. Suggests overcoming a gap.' },
    { name: 'lattice', weight: 400, spacing: '0.06em', rationale: 'Interwoven grid/network. Suggests many-to-many relationships, sophisticated infrastructure, crystalline order.' },
    { name: 'relay', weight: 600, spacing: '0.03em', rationale: 'Motion and transfer. Passing the baton between parties. Implies speed, teamwork, and sequential collaboration.' },
    { name: 'conduit', weight: 500, spacing: '0.03em', rationale: 'Channel through which things flow. Clean, technical. Suggests invisible infrastructure enabling commerce.' },
  ];

  /* ── Logo variants ── */
  const logoVariants = [
    { label: 'Chain Links', sub: 'Two interlocking rounded rectangles representing partnership', Component: ChainLinksLogo },
    { label: 'Handshake', sub: 'Two abstract hands meeting — deal, trust, agreement', Component: HandshakeLogo },
    { label: 'Bridge Arch', sub: 'A stylized arch spanning two pillars — structural connection', Component: BridgeArchLogo },
    { label: 'Mesh Nodes', sub: 'Network graph of interconnected nodes — distributed marketplace', Component: MeshNodesLogo },
  ];

  /* ── Color palettes ── */
  const palettes = [
    { label: 'Current', sub: 'Green + Blue — Growth meets Trust', primary: '#00C27C', secondary: '#64A8E0', bg: '#042017' },
    { label: 'Earth', sub: 'Warm Green + Copper — Organic, Grounded', primary: '#2D8B57', secondary: '#B87333', bg: '#1A1508' },
    { label: 'Ocean', sub: 'Teal + Deep Blue — Depth, Reliability', primary: '#00897B', secondary: '#1565C0', bg: '#0A1520' },
    { label: 'Sunset', sub: 'Coral + Gold — Warm, Inviting', primary: '#FF6B6B', secondary: '#FFB74D', bg: '#1A0F0A' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', -apple-system, sans-serif" }}>

      {/* ═══════════════════════  SECTION 1: NAME CANDIDATES  ═══════════════════════ */}
      <SubTitle>Name Candidates</SubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Five name alternatives for the B2B marketplace, each carrying a distinct metaphor for how retailers and brands come together.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 16 }}>
        {names.map((n, idx) => (
          <div key={n.name} style={{
            ...card,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 32,
            flexWrap: 'wrap',
          }}>
            {/* Number */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0,194,124,0.15), rgba(100,168,224,0.15))',
              border: '1px solid rgba(0,194,124,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 600, color: '#00C27C', flexShrink: 0,
            }}>
              {idx + 1}
            </div>

            {/* Wordmark */}
            <div style={{ minWidth: 180, flexShrink: 0 }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: n.weight,
                fontSize: 36,
                letterSpacing: n.spacing,
                color: '#F0EDE8',
              }}>
                {n.name}
              </span>
              <div style={{ fontSize: 11, color: '#6B6359', fontFamily: 'monospace', marginTop: 4 }}>
                weight {n.weight} / spacing {n.spacing}
              </div>
            </div>

            {/* Rationale */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 13, color: '#ADA599', lineHeight: 1.7, margin: 0 }}>
                {n.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={divider} />

      {/* ═══════════════════════  SECTION 2: LOGO VARIATIONS  ═══════════════════════ */}
      <SubTitle>Logo Variations — Four Network/Link Concepts</SubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Each logo explores a different visual metaphor for marketplace connection. All use the green-to-blue gradient.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
        marginBottom: 16,
      }}>
        {logoVariants.map(v => (
          <div key={v.label} style={{
            ...card,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
          }}>
            {/* Large logo */}
            <v.Component size={72} />

            {/* Label */}
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginBottom: 4 }}>{v.label}</div>
              <div style={{ fontSize: 12, color: '#6B6359', lineHeight: 1.5, maxWidth: 200 }}>{v.sub}</div>
            </div>

            {/* Size scale */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              paddingTop: 12, borderTop: '1px solid #282724', width: '100%', justifyContent: 'center',
            }}>
              {[20, 32, 48].map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <v.Component size={s} />
                  <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={divider} />

      {/* ═══════════════════════  SECTION 3: MARKETPLACE MOCKUPS  ═══════════════════════ */}
      <SubTitle>Marketplace Mockups — Each Logo In Context</SubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        How each logo variant looks in four real-world application contexts: marketplace header, mobile app icon, email signature, and invoice watermark.
      </p>

      {logoVariants.map(v => (
        <div key={v.label} style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginBottom: 4 }}>{v.label}</div>
          <div style={{ fontSize: 12, color: '#6B6359', marginBottom: 16 }}>{v.sub}</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {/* 1. Marketplace Header Bar */}
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Marketplace Header
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #0A1A14, #0D1F2A)',
                borderRadius: 10,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(0,194,124,0.12)',
              }}>
                <v.Component size={24} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', color: '#F0EDE8' }}>
                  connect
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 11, color: '#6B6359' }}>Browse</span>
                  <span style={{ fontSize: 11, color: '#6B6359' }}>Orders</span>
                  <span style={{ fontSize: 11, color: '#6B6359' }}>Account</span>
                </div>
              </div>
            </div>

            {/* 2. Mobile App Icon */}
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Mobile App Icon
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #042017, #0A2538)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,194,124,0.1)',
                }}>
                  <v.Component size={40} />
                </div>
              </div>
            </div>

            {/* 3. Email Signature */}
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Email Signature
              </div>
              <div style={{
                background: '#F8F7F5',
                borderRadius: 8,
                padding: 16,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>Sarah Chen</div>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 10 }}>VP of Partnerships</div>
                <div style={{
                  borderTop: '2px solid #00C27C',
                  paddingTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <v.Component size={16} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.02em', color: '#333' }}>
                    connect
                  </span>
                  <span style={{ fontSize: 10, color: '#999', marginLeft: 4 }}>by Dutchie</span>
                </div>
              </div>
            </div>

            {/* 4. Invoice / PO Watermark */}
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Invoice Watermark
              </div>
              <div style={{
                background: '#FFFFFF',
                borderRadius: 8,
                padding: 20,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 100,
              }}>
                {/* Watermark */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.06,
                }}>
                  <v.Component size={80} color1="#000000" color2="#000000" />
                </div>
                {/* Document content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <v.Component size={14} />
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 11, color: '#333' }}>connect</span>
                  </div>
                  <div style={{ fontSize: 9, color: '#999', marginBottom: 6 }}>PURCHASE ORDER</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#333', marginBottom: 4 }}>PO-2026-4182</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#AAA' }}>
                    <span>Mar 19, 2026</span>
                    <span>$12,400.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={divider} />

      {/* ═══════════════════════  SECTION 4: COLOR SCHEME EXPLORATIONS  ═══════════════════════ */}
      <SubTitle>Color Scheme Explorations — Four Alternative Palettes</SubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        The marketplace brand color should convey trust, energy, and partnership. Each palette pairs with all four logo variants.
      </p>

      {palettes.map(p => (
        <div key={p.label} style={{ marginBottom: 40 }}>
          {/* Palette header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8' }}>{p.label}</div>
            <div style={{ fontSize: 13, color: '#6B6359' }}>{p.sub}</div>
          </div>

          <div style={{
            ...card,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}>
            {/* Swatch row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {/* Primary swatch */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: p.primary,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }} />
                <span style={{ fontSize: 11, color: '#ADA599' }}>Primary</span>
                <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>{p.primary}</span>
              </div>
              {/* Secondary swatch */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: p.secondary,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }} />
                <span style={{ fontSize: 11, color: '#ADA599' }}>Secondary</span>
                <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>{p.secondary}</span>
              </div>
              {/* Gradient swatch */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }} />
                <span style={{ fontSize: 11, color: '#ADA599' }}>Gradient</span>
                <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>135deg</span>
              </div>
              {/* Background swatch */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: p.bg,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }} />
                <span style={{ fontSize: 11, color: '#ADA599' }}>Dark BG</span>
                <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>{p.bg}</span>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 56, background: '#282724', margin: '0 8px' }} />

              {/* All 4 logos in this palette's colors */}
              {[ChainLinksLogo, HandshakeLogo, BridgeArchLogo, MeshNodesLogo].map((Logo, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: p.bg,
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Logo size={36} color1={p.primary} color2={p.secondary} />
                  </div>
                  <span style={{ fontSize: 10, color: '#6B6359' }}>
                    {['Chain', 'Shake', 'Bridge', 'Mesh'][i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini marketplace header in this palette */}
            <div style={{
              background: p.bg,
              borderRadius: 10,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: `1px solid ${p.primary}22`,
            }}>
              <ChainLinksLogo size={20} color1={p.primary} color2={p.secondary} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.02em',
                color: '#F0EDE8',
              }}>
                connect
              </span>
              <span style={{ fontSize: 11, color: p.primary, marginLeft: 'auto' }}>
                Marketplace
              </span>
            </div>
          </div>
        </div>
      ))}

      <div style={divider} />

      {/* ═══════════════════════  SECTION 5: FULL COMBINATION MATRIX  ═══════════════════════ */}
      <SubTitle>Combination Matrix — Name x Logo</SubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Selected pairings showing how each name candidate looks alongside each logo variant in a horizontal lockup.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 16,
      }}>
        {names.map(n => (
          logoVariants.map(v => (
            <div key={`${n.name}-${v.label}`} style={{
              background: '#141210',
              borderRadius: 12,
              padding: '16px 20px',
              border: '1px solid #282724',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <v.Component size={28} />
              <div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: n.weight,
                  fontSize: 20,
                  letterSpacing: n.spacing,
                  color: '#F0EDE8',
                }}>
                  {n.name}
                </span>
                <div style={{ fontSize: 9, color: '#6B6359', marginTop: 2 }}>{v.label}</div>
              </div>
            </div>
          ))
        ))}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════ DEX DEEP EXPLORATION ═══════════════════════════════════════ */

/* --- Logo Variant: Golden Spiral (standalone for DexDeepSection) --- */
function GoldenSpiralLogo({ size = 48, idPrefix = 'gs' }) {
  const gid = `${idPrefix}-grad-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      <path
        d="M50 95 A45 45 0 0 1 5 50
           A27.8 27.8 0 0 1 32.8 22.2
           A17.2 17.2 0 0 1 50 39.4
           A10.6 10.6 0 0 1 39.4 50
           A6.6 6.6 0 0 1 46 56.6
           A4 4 0 0 1 50 52.6
           A2.5 2.5 0 0 1 47.5 50"
        stroke={`url(#${gid})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${gid})`} />
    </svg>
  );
}

/* --- Logo Variant: Double Helix --- */
function DoubleHelixLogo({ size = 48, idPrefix = 'dh' }) {
  const gid = `${idPrefix}-grad-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Strand A — flowing sine curves */}
      <path
        d="M20 10 C35 25, 65 25, 80 10
           M20 30 C35 45, 65 45, 80 30
           M20 50 C35 65, 65 65, 80 50
           M20 70 C35 85, 65 85, 80 70
           M20 90 C35 105, 65 105, 80 90"
        stroke={`url(#${gid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Strand B — inverse curves */}
      <path
        d="M20 10 C35 -5, 65 -5, 80 10
           M20 30 C35 15, 65 15, 80 30
           M20 50 C35 35, 65 35, 80 50
           M20 70 C35 55, 65 55, 80 70
           M20 90 C35 75, 65 75, 80 90"
        stroke={`url(#${gid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Cross rungs connecting strands */}
      <line x1="38" y1="10" x2="62" y2="10" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.35" />
      <line x1="35" y1="30" x2="65" y2="30" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.35" />
      <line x1="35" y1="50" x2="65" y2="50" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.35" />
      <line x1="35" y1="70" x2="65" y2="70" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.35" />
      <line x1="38" y1="90" x2="62" y2="90" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

/* --- Logo Variant: Ripple --- */
function RippleLogo({ size = 48, idPrefix = 'rp' }) {
  const gid = `${idPrefix}-grad-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Concentric ripple rings emanating from center */}
      <circle cx="50" cy="50" r="8" stroke={`url(#${gid})`} strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="50" r="20" stroke={`url(#${gid})`} strokeWidth="2" fill="none" opacity="0.7" />
      <circle cx="50" cy="50" r="32" stroke={`url(#${gid})`} strokeWidth="1.5" fill="none" opacity="0.45" />
      <circle cx="50" cy="50" r="44" stroke={`url(#${gid})`} strokeWidth="1" fill="none" opacity="0.25" />
      {/* Center pulse dot */}
      <circle cx="50" cy="50" r="3" fill={`url(#${gid})`} />
    </svg>
  );
}

/* --- Logo Variant: Phi Eye --- */
function PhiEyeLogo({ size = 48, idPrefix = 'pe' }) {
  const gid = `${idPrefix}-grad-${size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A03A" />
          <stop offset="50%" stopColor="#FFC02A" />
          <stop offset="100%" stopColor="#FFD666" />
        </linearGradient>
      </defs>
      {/* Eye shape — two almond arcs */}
      <path
        d="M8 50 Q50 15, 92 50 Q50 85, 8 50 Z"
        stroke={`url(#${gid})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Iris circle */}
      <circle cx="50" cy="50" r="16" stroke={`url(#${gid})`} strokeWidth="2" fill="none" />
      {/* Golden spiral inside the iris */}
      <path
        d="M50 62 A12 12 0 0 1 38 50
           A7.4 7.4 0 0 1 45.4 42.6
           A4.6 4.6 0 0 1 50 47.2
           A2.8 2.8 0 0 1 47.2 50
           A1.7 1.7 0 0 1 48.9 51.7
           A1.1 1.1 0 0 1 50 50.6"
        stroke={`url(#${gid})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pupil center */}
      <circle cx="49" cy="50" r="1.5" fill={`url(#${gid})`} />
    </svg>
  );
}

/* --- Agent Avatar Shell --- */
function DeepAgentAvatar({ children, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#1A1710',
      border: '2px solid rgba(212,160,58,0.3)',
      boxShadow: '0 0 16px rgba(212,160,58,0.2), 0 0 32px rgba(212,160,58,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

/* ═══ EXPORTED: DexDeepSection ═══ */
export function DexDeepSection() {
  const [thinkingAngle, setThinkingAngle] = useState(0);
  const [rippleScale, setRippleScale] = useState(1);
  const [rippleOpacity, setRippleOpacity] = useState(1);
  const [successProgress, setSuccessProgress] = useState(0);
  const thinkingRef = useRef(null);
  const rippleRef = useRef(null);
  const successRef = useRef(null);

  // Thinking animation — continuous spiral rotation
  useEffect(() => {
    let frame;
    const animate = () => {
      setThinkingAngle(prev => (prev + 1.5) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Ripple/pulse animation — sine wave scale & opacity
  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.03;
      const cycle = (Math.sin(t) + 1) / 2;
      setRippleScale(1 + cycle * 0.15);
      setRippleOpacity(0.6 + cycle * 0.4);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Success animation — spiral morphs to checkmark
  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.012;
      const cycle = (Math.sin(t) + 1) / 2;
      setSuccessProgress(cycle);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const DSSubTitle = ({ children }) => (
    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
      {children}
    </h3>
  );

  const card = {
    background: '#141210', borderRadius: 16, padding: 32,
    border: '1px solid #282724',
  };

  const nameStudies = [
    {
      name: 'Dex',
      weight: 500,
      spacing: '0.04em',
      rationale: 'Dexterity, index, shorthand for intelligence. Crisp and technical. Two consonants framing a vowel — punchy and memorable. Feels like a command-line tool that just works.',
      current: true,
    },
    {
      name: 'Sage',
      weight: 400,
      spacing: '0.05em',
      rationale: 'Wisdom and deep knowledge. Herbal connection resonates with cannabis industry roots. Warm and approachable — suggests a trusted advisor rather than cold automation.',
    },
    {
      name: 'Aura',
      weight: 300,
      spacing: '0.08em',
      rationale: 'An energy field, ambient intelligence that surrounds and enhances. Ethereal quality suggests AI that works in the background. Four letters, two syllables, soft phonetics.',
    },
    {
      name: 'Echo',
      weight: 500,
      spacing: '0.03em',
      rationale: 'Reflection and responsive AI. Listens first, then returns insight. The name implies a feedback loop — data in, intelligence out. Strong consonant structure.',
    },
    {
      name: 'Helix',
      weight: 600,
      spacing: '0.02em',
      rationale: 'Double helix, DNA of data, spiral evolution. Scientific precision meets organic growth. The "x" ending mirrors "Dex" — sharp, technical, decisive.',
    },
  ];

  const logoVariants = [
    { label: 'Golden Spiral', desc: 'Fibonacci arc sequence — intelligence unfolding through iterative convergence', Component: GoldenSpiralLogo },
    { label: 'Double Helix', desc: 'Two intertwined strands — the DNA of data, encoded and evolving', Component: DoubleHelixLogo },
    { label: 'Ripple', desc: 'Concentric pulses from a center point — sonar-like awareness radiating outward', Component: RippleLogo },
    { label: 'Phi Eye', desc: 'An eye with a golden-ratio iris — AI that watches, understands, and sees patterns', Component: PhiEyeLogo },
  ];

  const avatarSizes = [32, 48, 64];

  return (
    <div>
      {/* ════════ NAME CANDIDATES ════════ */}
      <DSSubTitle>Name Candidates</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Five name candidates for the AI agent brand. Each wordmark is set in DM Sans with a distinct
        weight and letter-spacing tuned to match the personality of the name.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 64 }}>
        {nameStudies.map((ns, i) => (
          <div key={ns.name} style={{
            ...card,
            padding: 0,
            overflow: 'hidden',
            border: ns.current ? '1px solid rgba(212,160,58,0.3)' : '1px solid #282724',
          }}>
            <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 120, flexWrap: 'wrap' }}>
              {/* Number badge */}
              <div style={{
                width: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: ns.current ? 'rgba(212,160,58,0.08)' : 'rgba(255,255,255,0.02)',
                borderRight: '1px solid #282724', flexShrink: 0,
              }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: ns.current ? '#FFC02A' : '#6B6359', fontFamily: 'monospace' }}>
                  {i + 1}
                </span>
                {ns.current && (
                  <span style={{ fontSize: 9, color: '#D4A03A', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                    Current
                  </span>
                )}
              </div>

              {/* Wordmark display */}
              <div style={{
                width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: '1px solid #282724', padding: '24px 32px', flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: ns.weight,
                  fontSize: 42,
                  letterSpacing: ns.spacing,
                  color: '#F0EDE8',
                }}>
                  {ns.name.toLowerCase()}
                </span>
              </div>

              {/* Rationale text */}
              <div style={{ flex: 1, padding: '20px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8' }}>{ns.name}</span>
                  <span style={{
                    fontSize: 10, color: '#6B6359', fontFamily: 'monospace',
                    padding: '2px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: 4,
                  }}>
                    wt:{ns.weight} ls:{ns.spacing}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#ADA599', lineHeight: 1.6, margin: 0 }}>
                  {ns.rationale}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════ LOGO VARIATIONS ════════ */}
      <DSSubTitle>Logo Variations</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Four distinct visual concepts for the agent mark. Each conveys intelligence, iteration, or awareness
        through different geometric metaphors. All rendered in the gold gradient (#D4A03A to #FFD666).
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16, marginBottom: 32,
      }}>
        {logoVariants.map((v, i) => (
          <div key={v.label} style={{
            ...card,
            padding: 0,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Logo display area */}
            <div style={{
              padding: '36px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0A0908',
              borderBottom: '1px solid #282724',
              minHeight: 140,
            }}>
              <v.Component size={80} idPrefix={`lv-${i}`} />
            </div>

            {/* Label and description */}
            <div style={{ padding: '20px 24px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>{v.label}</span>
                <span style={{
                  fontSize: 10, fontFamily: 'monospace', color: '#6B6359',
                  padding: '2px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: 4,
                }}>
                  {i + 1}/4
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#ADA599', lineHeight: 1.6, margin: 0 }}>
                {v.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-side comparison strip */}
      <div style={{
        ...card,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        flexWrap: 'wrap', gap: 32, marginBottom: 64,
        background: '#0A0908',
      }}>
        {logoVariants.map((v, i) => (
          <div key={v.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <v.Component size={56} idPrefix={`cmp-${i}`} />
            <span style={{ fontSize: 11, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {v.label}
            </span>
          </div>
        ))}
      </div>

      {/* ════════ AGENT AVATAR STUDIES ════════ */}
      <DSSubTitle>Agent Avatar Studies</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Each logo variation rendered as a circular agent avatar — dark background (#1A1710) with
        gold glow border. Tested at 32px, 48px, and 64px for UI legibility.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16, marginBottom: 64,
      }}>
        {logoVariants.map((v, i) => (
          <div key={v.label} style={{
            ...card,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{ fontSize: 12, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {v.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {avatarSizes.map(sz => (
                <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <DeepAgentAvatar size={sz}>
                    <v.Component size={sz * 0.58} idPrefix={`av-${i}-${sz}`} />
                  </DeepAgentAvatar>
                  <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>{sz}px</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ════════ CHAT BUBBLE DEMOS ════════ */}
      <DSSubTitle>Chat Bubble Demos</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Three chat bubble treatments for agent messages. Each balances brand presence against
        readability and conversation flow.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16, marginBottom: 64,
      }}>
        {/* Style 1: Minimal */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            1. Minimal
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <DeepAgentAvatar size={28}>
              <GoldenSpiralLogo size={16} idPrefix="cb1" />
            </DeepAgentAvatar>
            <div>
              <span style={{ fontSize: 11, color: '#6B6359', display: 'block', marginBottom: 4 }}>Dex</span>
              <p style={{ fontSize: 13, color: '#ADA599', lineHeight: 1.6, margin: 0 }}>
                I found 3 inventory anomalies across your Denver locations. Two involve mismatched
                unit counts on high-velocity SKUs. Want me to draft correction POs?
              </p>
            </div>
          </div>
        </div>

        {/* Style 2: Card */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            2. Card
          </div>
          <div style={{
            background: '#1A1710',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(212,160,58,0.12)',
          }}>
            {/* Card header bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              background: 'rgba(212,160,58,0.06)',
              borderBottom: '1px solid rgba(212,160,58,0.1)',
            }}>
              <DeepAgentAvatar size={24}>
                <GoldenSpiralLogo size={14} idPrefix="cb2" />
              </DeepAgentAvatar>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#F0EDE8' }}>Dex</span>
              <span style={{ fontSize: 10, color: '#6B6359', marginLeft: 'auto' }}>Just now</span>
            </div>
            {/* Card body */}
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: '#ADA599', lineHeight: 1.6, margin: 0 }}>
                I found 3 inventory anomalies across your Denver locations. Two involve mismatched
                unit counts on high-velocity SKUs. Want me to draft correction POs?
              </p>
            </div>
          </div>
        </div>

        {/* Style 3: Branded — gold accent border left */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            3. Branded
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <DeepAgentAvatar size={32}>
              <GoldenSpiralLogo size={18} idPrefix="cb3" />
            </DeepAgentAvatar>
            <div style={{
              flex: 1,
              borderLeft: '3px solid #D4A03A',
              background: 'rgba(212,160,58,0.04)',
              borderRadius: '0 10px 10px 0',
              padding: '12px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F0EDE8' }}>Dex</span>
                <span style={{
                  fontSize: 9, color: '#D4A03A', textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '1px 6px', background: 'rgba(212,160,58,0.1)', borderRadius: 3,
                }}>AI Agent</span>
              </div>
              <p style={{ fontSize: 13, color: '#ADA599', lineHeight: 1.6, margin: 0 }}>
                I found 3 inventory anomalies across your Denver locations. Two involve mismatched
                unit counts on high-velocity SKUs. Want me to draft correction POs?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ ANIMATED STATES ════════ */}
      <DSSubTitle>Animated States</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        Three key interaction states for the AI agent. Thinking uses continuous spiral rotation.
        Listening uses a pulsing ripple emanation. Success cross-fades from spiral to checkmark.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {/* Thinking — spiral rotating */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Thinking
          </div>
          <div style={{
            position: 'relative',
            width: 80, height: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: '50%',
              border: '1px solid rgba(212,160,58,0.15)',
              boxShadow: '0 0 24px rgba(212,160,58,0.12)',
            }} />
            <DeepAgentAvatar size={80}>
              <div
                ref={thinkingRef}
                style={{
                  transform: `rotate(${thinkingAngle}deg)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <GoldenSpiralLogo size={46} idPrefix="anim-think" />
              </div>
            </DeepAgentAvatar>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 13, color: '#ADA599', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <span style={{ display: 'inline-flex', gap: 3 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFC02A', opacity: 0.4 + (Math.sin(thinkingAngle * 0.05) + 1) * 0.3 }} />
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFC02A', opacity: 0.4 + (Math.sin(thinkingAngle * 0.05 + 1) + 1) * 0.3 }} />
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFC02A', opacity: 0.4 + (Math.sin(thinkingAngle * 0.05 + 2) + 1) * 0.3 }} />
              </span>
              Analyzing inventory data
            </span>
          </div>
          <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>
            continuous rotation @ 1.5 deg/frame
          </span>
        </div>

        {/* Listening — ripple pulsing */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Listening
          </div>
          <div style={{
            position: 'relative',
            width: 80, height: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Pulse rings emanating outward */}
            {[0, 1, 2].map(ring => (
              <div key={ring} style={{
                position: 'absolute',
                inset: -(8 + ring * 12),
                borderRadius: '50%',
                border: `1px solid rgba(212,160,58,${0.2 * rippleOpacity * (1 - ring * 0.3)})`,
                transform: `scale(${rippleScale + ring * 0.03})`,
                transition: 'transform 0.1s ease-out',
              }} />
            ))}
            <DeepAgentAvatar size={80}>
              <div
                ref={rippleRef}
                style={{
                  transform: `scale(${0.97 + (rippleScale - 1) * 0.3})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <RippleLogo size={46} idPrefix="anim-listen" />
              </div>
            </DeepAgentAvatar>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 13, color: '#ADA599', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#D4A03A',
                opacity: rippleOpacity,
                boxShadow: `0 0 ${8 * rippleOpacity}px rgba(212,160,58,0.4)`,
              }} />
              Listening for input
            </span>
          </div>
          <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>
            sine pulse @ 0.03 rad/frame
          </span>
        </div>

        {/* Success — spiral morphs to checkmark */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#6B6359', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Success
          </div>
          <div style={{
            position: 'relative',
            width: 80, height: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Completion ring */}
            <svg
              width={96} height={96}
              viewBox="0 0 96 96"
              style={{ position: 'absolute', inset: -8 }}
            >
              <circle
                cx="48" cy="48" r="44"
                fill="none"
                stroke="rgba(0,194,124,0.2)"
                strokeWidth="1.5"
              />
              <circle
                cx="48" cy="48" r="44"
                fill="none"
                stroke="#00C27C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${276.5 * successProgress} ${276.5 * (1 - successProgress)}`}
                transform="rotate(-90 48 48)"
                opacity={0.4 + successProgress * 0.6}
              />
            </svg>
            <DeepAgentAvatar size={80}>
              <svg width={46} height={46} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="deep-success-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={successProgress > 0.7 ? '#00C27C' : '#D4A03A'} />
                    <stop offset="50%" stopColor={successProgress > 0.7 ? '#00E08E' : '#FFC02A'} />
                    <stop offset="100%" stopColor={successProgress > 0.7 ? '#64E0A8' : '#FFD666'} />
                  </linearGradient>
                </defs>
                {/* Spiral fading out */}
                <path
                  d="M50 95 A45 45 0 0 1 5 50
                     A27.8 27.8 0 0 1 32.8 22.2
                     A17.2 17.2 0 0 1 50 39.4
                     A10.6 10.6 0 0 1 39.4 50
                     A6.6 6.6 0 0 1 46 56.6
                     A4 4 0 0 1 50 52.6
                     A2.5 2.5 0 0 1 47.5 50"
                  stroke="url(#deep-success-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity={1 - successProgress}
                />
                <circle cx="48" cy="50" r="2" fill="url(#deep-success-grad)" opacity={1 - successProgress} />
                {/* Checkmark fading in */}
                <path
                  d="M28 52 L44 68 L72 34"
                  stroke="url(#deep-success-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={successProgress}
                  strokeDasharray={`${80 * successProgress} ${80 * (1 - successProgress)}`}
                />
              </svg>
            </DeepAgentAvatar>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontSize: 13,
              color: successProgress > 0.7 ? '#00C27C' : '#ADA599',
              display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
              transition: 'color 0.3s',
            }}>
              {successProgress > 0.7 ? 'Task complete' : 'Processing...'}
            </span>
          </div>
          <span style={{ fontSize: 10, color: '#6B6359', fontFamily: 'monospace' }}>
            spiral-to-check crossfade @ {(successProgress * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* ════════ NAME + LOGO PAIRING MATRIX ════════ */}
      <DSSubTitle>Name + Logo Pairing Matrix</DSSubTitle>
      <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
        A cross-reference grid pairing each name candidate with each logo variation. Evaluate
        how the letterform energy matches the icon geometry.
      </p>

      <div style={{
        ...card,
        padding: 0,
        overflow: 'auto',
        marginBottom: 48,
      }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '140px repeat(4, 1fr)',
          borderBottom: '1px solid #282724',
          background: 'rgba(255,255,255,0.02)',
          minWidth: 700,
        }}>
          <div style={{ padding: '12px 16px', borderRight: '1px solid #282724' }} />
          {logoVariants.map((v, i) => (
            <div key={v.label} style={{
              padding: '12px 8px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #282724' : 'none',
            }}>
              <v.Component size={28} idPrefix={`matrix-h-${i}`} />
              <div style={{ fontSize: 9, color: '#6B6359', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {v.label}
              </div>
            </div>
          ))}
        </div>

        {/* Name rows */}
        {nameStudies.map((ns, ni) => (
          <div key={ns.name} style={{
            display: 'grid',
            gridTemplateColumns: '140px repeat(4, 1fr)',
            borderBottom: ni < nameStudies.length - 1 ? '1px solid #282724' : 'none',
            background: ns.current ? 'rgba(212,160,58,0.03)' : 'transparent',
            minWidth: 700,
          }}>
            {/* Name label */}
            <div style={{
              padding: '16px', borderRight: '1px solid #282724',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: ns.weight,
                fontSize: 20,
                letterSpacing: ns.spacing,
                color: '#F0EDE8',
              }}>
                {ns.name.toLowerCase()}
              </span>
              {ns.current && (
                <span style={{
                  fontSize: 8, color: '#D4A03A', textTransform: 'uppercase',
                  padding: '1px 4px', background: 'rgba(212,160,58,0.1)', borderRadius: 2,
                }}>now</span>
              )}
            </div>

            {/* Logo pairings */}
            {logoVariants.map((v, vi) => (
              <div key={v.label} style={{
                padding: '12px 8px',
                borderRight: vi < 3 ? '1px solid #282724' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <DeepAgentAvatar size={32}>
                  <v.Component size={18} idPrefix={`matrix-${ni}-${vi}`} />
                </DeepAgentAvatar>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: ns.weight,
                  fontSize: 14,
                  letterSpacing: ns.spacing,
                  color: '#ADA599',
                }}>
                  {ns.name.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════ MAIN PAGE ═══════════════════════════════════════ */

export default function DesignStudy() {
  const [activeSection, setActiveSection] = useState('hero');

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

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const container = {
    maxWidth: 960, margin: '0 auto', padding: '0 24px',
    fontFamily: "'DM Sans', 'Inter', -apple-system, sans-serif",
  };

  const divider = {
    height: 1, background: 'linear-gradient(90deg, transparent, #38332B, transparent)',
    margin: '0',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0908', color: '#F0EDE8' }}>
      <SectionNav active={activeSection} />

      <div style={container}>
        {/* ═══ HERO ═══ */}
        <Section id="hero">
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#D4A03A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
              Dutchie AI
            </p>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24, color: '#F0EDE8' }}>
              Brand Identity Study
            </h1>
            <p style={{ fontSize: 18, color: '#ADA599', maxWidth: 540, margin: '0 auto 56px', lineHeight: 1.6 }}>
              Visual identity system for three product brands — the platform, the intelligence, and the network.
            </p>

            {/* Product preview cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
              {[
                { id: 'nexus', label: 'Nexus', sub: 'The Platform', icon: <NexusIcon size={32} />, accent: '#D4A03A' },
                { id: 'dex', label: 'Dex', sub: 'The Agent', icon: <DexSpiral size={32} />, accent: '#FFC02A' },
                { id: 'connect', label: 'Connect', sub: 'The Network', icon: <ConnectIcon size={32} />, accent: '#00C27C' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: '#141210', border: '1px solid #282724', borderRadius: 16,
                    padding: 24, cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.boxShadow = `0 4px 24px ${p.accent}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#282724'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>{p.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#F0EDE8', marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 13, color: '#6B6359' }}>{p.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </Section>

        <div style={divider} />

        {/* ═══ NEXUS ═══ */}
        <Section id="nexus">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <NexusIcon size={36} />
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: '#F0EDE8' }}>Nexus</h2>
              <p style={{ fontSize: 14, color: '#6B6359' }}>The AI-Powered Retail Platform</p>
            </div>
          </div>

          {/* Logo sizes */}
          <SubTitle>Logo — Scale Study</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 48 }}>
            <LogoSizes component={NexusIcon} />
          </div>

          {/* Wordmark */}
          <SubTitle>Wordmark</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 42, letterSpacing: '0.06em', color: '#F0EDE8' }}>
              nexus
            </span>
          </div>

          {/* Logo lockups */}
          <SubTitle>Logo Lockups</SubTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
            {/* Horizontal */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', display: 'flex', alignItems: 'center', gap: 12 }}>
              <NexusIcon size={28} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 24, letterSpacing: '0.06em', color: '#F0EDE8' }}>nexus</span>
            </div>
            {/* Icon only */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NexusIcon size={48} />
            </div>
            {/* Stacked */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <NexusIcon size={36} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 18, letterSpacing: '0.06em', color: '#F0EDE8' }}>nexus</span>
            </div>
          </div>

          {/* Color palette */}
          <SubTitle>Color Palette</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="linear-gradient(135deg, #D4A03A, #FFC02A, #FFD666)" name="Gold Gradient" hex="#D4A03A → #FFD666" />
            <Swatch color="#D4A03A" name="Gold" hex="#D4A03A" />
            <Swatch color="#FFC02A" name="Amber" hex="#FFC02A" />
            <Swatch color="#FFD666" name="Light Gold" hex="#FFD666" />
            <Swatch color="#141210" name="Surface" hex="#141210" />
            <Swatch color="#1C1B1A" name="Card" hex="#1C1B1A" />
            <Swatch color="#00C27C" name="Accent Green" hex="#00C27C" />
          </div>

          {/* Usage examples */}
          <SubTitle>Usage Examples</SubTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
            {/* On dark */}
            <div style={{ background: '#0A0908', borderRadius: 16, padding: 32, border: '1px solid #282724', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NexusIcon size={48} />
              <span style={{ marginLeft: 12, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 24, letterSpacing: '0.06em', color: '#F0EDE8' }}>nexus</span>
            </div>
            {/* On card */}
            <div style={{ background: '#1C1B1A', borderRadius: 16, padding: 32, border: '1px solid #38332B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NexusIcon size={48} />
              <span style={{ marginLeft: 12, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 24, letterSpacing: '0.06em', color: '#F0EDE8' }}>nexus</span>
            </div>
            {/* Min size */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <NexusIcon size={16} />
              <span style={{ fontSize: 11, color: '#6B6359' }}>Min: 16px</span>
            </div>
          </div>

          {/* Typography */}
          <SubTitle>Typography — DM Sans</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 48 }}>
            <TypeSpecimen family="DM Sans" />
          </div>

          {/* Deep brand exploration */}
          <NexusDeepSection />
        </Section>

        <div style={divider} />

        {/* ═══ DEX ═══ */}
        <Section id="dex">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <DexSpiral size={36} />
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: '#F0EDE8' }}>Dex</h2>
              <p style={{ fontSize: 14, color: '#6B6359' }}>The AI Agent</p>
            </div>
          </div>

          {/* Logo sizes */}
          <SubTitle>Logo — Golden Spiral</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 24 }}>
            <LogoSizes component={DexSpiral} sizes={[24, 36, 48, 72, 96]} />
          </div>
          <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 540, marginBottom: 48 }}>
            The golden spiral represents intelligence unfolding — iterative reasoning that converges toward insight.
            Rooted in the Fibonacci sequence, it evokes nature-inspired AI that grows organically from data.
          </p>

          {/* Wordmark */}
          <SubTitle>Wordmark</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 42, letterSpacing: '0.04em', color: '#F0EDE8' }}>
              dex
            </span>
          </div>

          {/* Color palette */}
          <SubTitle>Color Palette</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="#D4A03A" name="Gold" hex="#D4A03A" />
            <Swatch color="#FFC02A" name="Amber" hex="#FFC02A" />
            <Swatch color="#FFD666" name="Warm Gold" hex="#FFD666" />
            <Swatch color="linear-gradient(135deg, #D4A03A, #FFC02A)" name="Gradient" hex="#D4A03A → #FFC02A" />
            <Swatch color="#1A1710" name="Agent Dark" hex="#1A1710" />
          </div>

          {/* Agent badge */}
          <SubTitle>Agent Badge</SubTitle>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            <DexBadge size={40} />
            <DexBadge size={56} />
            <DexBadge size={72} />
            <DexBadge size={96} />
          </div>

          {/* Usage: chat bubble, agent card, loading */}
          <SubTitle>Usage Examples</SubTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
            {/* Chat bubble */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Chat Bubble</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <DexBadge size={32} />
                <div style={{ background: '#1C1B1A', borderRadius: '4px 12px 12px 12px', padding: '10px 14px', fontSize: 13, color: '#ADA599', lineHeight: 1.5, flex: 1 }}>
                  I found 3 inventory anomalies across your Denver locations that need attention.
                </div>
              </div>
            </div>
            {/* Agent card */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agent Card</div>
              <div style={{ background: '#1A1710', borderRadius: 12, padding: 20, border: '1px solid rgba(212,160,58,0.15)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <DexBadge size={44} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>Dex</div>
                  <div style={{ fontSize: 12, color: '#00C27C', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C27C', display: 'inline-block' }} />
                    Active
                  </div>
                </div>
              </div>
            </div>
            {/* Loading state */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Loading State</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 8 }}>
                <div style={{ animation: 'spin 3s linear infinite' }}>
                  <DexSpiral size={48} />
                </div>
                <span style={{ fontSize: 13, color: '#6B6359' }}>Dex is thinking...</span>
              </div>
            </div>
          </div>

          {/* Deep brand exploration */}
          <DexDeepSection />
        </Section>

        <div style={divider} />

        {/* ═══ CONNECT ═══ */}
        <Section id="connect">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <ConnectIcon size={36} />
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: '#F0EDE8' }}>Connect</h2>
              <p style={{ fontSize: 14, color: '#6B6359' }}>The B2B Marketplace</p>
            </div>
          </div>

          {/* Logo sizes */}
          <SubTitle>Logo — Link Symbol</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 24 }}>
            <LogoSizes component={ConnectIcon} sizes={[24, 36, 48, 72, 96]} />
          </div>
          <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 540, marginBottom: 48 }}>
            The interlocking links represent network, trust, and partnership — the bridge between retailers and brands.
            Two connected nodes symbolize the marketplace relationship.
          </p>

          {/* Wordmark */}
          <SubTitle>Wordmark</SubTitle>
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724', marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 42, letterSpacing: '0.02em', color: '#F0EDE8' }}>
              connect
            </span>
          </div>

          {/* Color palette */}
          <SubTitle>Color Palette</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="#00C27C" name="Green" hex="#00C27C" />
            <Swatch color="#00E08E" name="Green Light" hex="#00E08E" />
            <Swatch color="#64A8E0" name="Blue" hex="#64A8E0" />
            <Swatch color="linear-gradient(135deg, #00C27C, #64A8E0)" name="Gradient" hex="#00C27C → #64A8E0" />
            <Swatch color="#042017" name="Deep Green" hex="#042017" />
          </div>

          {/* Network constellation */}
          <SubTitle>Network Graphic</SubTitle>
          <div style={{ background: '#0A0908', borderRadius: 16, padding: 24, border: '1px solid #282724', marginBottom: 48, display: 'flex', justifyContent: 'center' }}>
            <NetworkConstellation />
          </div>

          {/* Usage examples */}
          <SubTitle>Usage Examples</SubTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {/* Marketplace header */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Marketplace Header</div>
              <div style={{
                background: 'linear-gradient(135deg, #042017, #0A2A1E)',
                borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(0,194,124,0.15)',
              }}>
                <ConnectIcon size={28} />
                <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 18, letterSpacing: '0.02em', color: '#F0EDE8' }}>connect</span>
              </div>
            </div>
            {/* PO document */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PO Document</div>
              <div style={{ background: '#F8F8F6', borderRadius: 8, padding: 16, color: '#1A1A1A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <ConnectIcon size={18} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14, letterSpacing: '0.02em' }}>connect</span>
                </div>
                <div style={{ fontSize: 10, color: '#888', borderTop: '1px solid #E0E0E0', paddingTop: 8 }}>
                  Purchase Order #PO-2026-4182
                </div>
              </div>
            </div>
            {/* Partner portal */}
            <div style={{ background: '#141210', borderRadius: 16, padding: 24, border: '1px solid #282724' }}>
              <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Partner Portal</div>
              <div style={{ background: '#0A1520', borderRadius: 12, padding: 20, border: '1px solid rgba(100,168,224,0.15)', textAlign: 'center' }}>
                <ConnectIcon size={32} />
                <div style={{ fontSize: 13, color: '#64A8E0', marginTop: 8 }}>Brand Partner Dashboard</div>
              </div>
            </div>
          </div>

          {/* Deep brand exploration */}
          <ConnectDeepSection />
        </Section>

        <div style={divider} />

        {/* ═══ FULL COLOR SYSTEM ═══ */}
        <Section id="colors">
          <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: '#F0EDE8', marginBottom: 48 }}>
            Color System
          </h2>

          <SubTitle>Brand Primaries</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="#D4A03A" name="Gold" hex="#D4A03A" />
            <Swatch color="#FFC02A" name="Amber" hex="#FFC02A" />
            <Swatch color="#FFD666" name="Light Gold" hex="#FFD666" />
            <Swatch color="#00C27C" name="Green" hex="#00C27C" />
            <Swatch color="#00E08E" name="Green Light" hex="#00E08E" />
            <Swatch color="#64A8E0" name="Blue" hex="#64A8E0" />
            <Swatch color="#B598E8" name="Purple" hex="#B598E8" />
          </div>

          <SubTitle>Dark Theme Surfaces</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="#0A0908" name="Background" hex="#0A0908" />
            <Swatch color="#141210" name="Surface" hex="#141210" />
            <Swatch color="#1C1B1A" name="Card" hex="#1C1B1A" />
            <Swatch color="#282724" name="Hover" hex="#282724" />
            <Swatch color="#38332B" name="Border" hex="#38332B" />
            <Swatch color="#042017" name="Sidebar" hex="#042017" />
          </div>

          <SubTitle>Text</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <Swatch color="#F0EDE8" name="Primary" hex="#F0EDE8" />
            <Swatch color="#ADA599" name="Secondary" hex="#ADA599" />
            <Swatch color="#6B6359" name="Muted" hex="#6B6359" />
          </div>

          <SubTitle>Semantic</SubTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <Swatch color="#00C27C" name="Success" hex="#00C27C" />
            <Swatch color="#FFC02A" name="Warning" hex="#FFC02A" />
            <Swatch color="#E87068" name="Error" hex="#E87068" />
            <Swatch color="#64A8E0" name="Info" hex="#64A8E0" />
          </div>

          {/* Deep color & typography exploration */}
          <div style={{ marginTop: 56 }}>
            <ColorTypographySection />
          </div>
        </Section>

        <div style={divider} />

        {/* ═══ PRODUCT FAMILY ═══ */}
        <Section id="family">
          <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: '#F0EDE8', marginBottom: 16 }}>
            Product Family
          </h2>
          <p style={{ fontSize: 14, color: '#ADA599', lineHeight: 1.7, maxWidth: 540, marginBottom: 48 }}>
            Three products, one platform. Nexus is the surface. Dex is the intelligence. Connect is the network.
          </p>

          {/* Three logos together */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 56,
          }}>
            {[
              { icon: <NexusIcon size={48} />, name: 'nexus', sub: 'Platform', nameStyle: { fontWeight: 300, letterSpacing: '0.06em' }, accent: '#D4A03A' },
              { icon: <DexSpiral size={48} />, name: 'dex', sub: 'Intelligence', nameStyle: { fontWeight: 500, letterSpacing: '0.04em' }, accent: '#FFC02A' },
              { icon: <ConnectIcon size={48} />, name: 'connect', sub: 'Network', nameStyle: { fontWeight: 600, letterSpacing: '0.02em' }, accent: '#00C27C' },
            ].map((p, i) => (
              <div key={i} style={{
                background: '#141210', borderRadius: 16, padding: 32,
                border: '1px solid #282724', textAlign: 'center',
              }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{p.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: '#F0EDE8', marginBottom: 6, ...p.nameStyle }}>{p.name}</div>
                <div style={{ fontSize: 13, color: p.accent }}>{p.sub}</div>
              </div>
            ))}
          </div>

          {/* Relationship */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NexusIcon size={20} />
                <span style={{ fontSize: 14, color: '#ADA599' }}>Nexus</span>
              </div>
              <span style={{ color: '#38332B', fontSize: 20 }}>→</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <DexSpiral size={20} />
                <span style={{ fontSize: 14, color: '#ADA599' }}>Dex</span>
              </div>
              <span style={{ color: '#38332B', fontSize: 20 }}>→</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ConnectIcon size={20} />
                <span style={{ fontSize: 14, color: '#ADA599' }}>Connect</span>
              </div>
            </div>
          </div>

          {/* Powered by */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,160,58,0.06), rgba(0,194,124,0.04))',
            borderRadius: 16, padding: 32, border: '1px solid #282724', textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: '#6B6359', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Powered by
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <NexusIcon size={24} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 22, color: '#F0EDE8', letterSpacing: '0.02em' }}>
                Dutchie AI
              </span>
            </div>
          </div>
        </Section>

        <div style={divider} />

        {/* ═══ PRODUCT HIERARCHY (PMM) ═══ */}
        <Section id="hierarchy">
          <ProductHierarchySection />
        </Section>

        <div style={divider} />

        {/* ═══ D-NAME EXPLORATION ═══ */}
        <Section id="dnames">
          <DNameExplorationSection />
        </Section>

        <div style={divider} />

        {/* ═══ VISUAL STYLES ═══ */}
        <Section id="styles">
          <VisualStylesSection />
        </Section>

        {/* Footer */}
        <div style={{ padding: '48px 0', textAlign: 'center', borderTop: '1px solid #282724' }}>
          <p style={{ fontSize: 12, color: '#6B6359' }}>
            Brand Identity Study — Dutchie AI Product Suite — 2026
          </p>
        </div>
      </div>

      {/* Global animation keyframes */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
