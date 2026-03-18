import { useState, useEffect, useRef } from 'react';
import NexusIcon from '../components/NexusIcon';

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
          <div style={{ background: '#141210', borderRadius: 16, padding: 32, border: '1px solid #282724' }}>
            <TypeSpecimen family="DM Sans" />
          </div>
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
