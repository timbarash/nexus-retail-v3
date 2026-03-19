import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   CONNECT BRAND DEEP EXPLORATION
   B2B Marketplace / Network — Dutchie AI Product Suite
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Theme Tokens ───
const T = {
  bg: '#0A0908',
  surface: '#141210',
  card: '#1C1B1A',
  border: '#282724',
  borderLight: '#38332B',
  text: '#F0EDE8',
  textSecondary: '#ADA599',
  textMuted: '#6B6359',
  green: '#00C27C',
  greenLight: '#00E08E',
  blue: '#64A8E0',
  deepGreen: '#042017',
  gradient: 'linear-gradient(135deg, #00C27C, #64A8E0)',
  font: "'DM Sans', 'Inter', -apple-system, sans-serif",
};

/* ─── Utility: Section Wrapper ─── */
function Section({ children, style = {} }) {
  return (
    <section style={{ padding: '64px 0', ...style }}>
      {children}
    </section>
  );
}

/* ─── Utility: Sub-Section Title ─── */
function SubTitle({ children, style = {} }) {
  return (
    <h3 style={{
      fontSize: 13, fontWeight: 600, color: T.textMuted,
      textTransform: 'uppercase', letterSpacing: '0.1em',
      marginBottom: 24, ...style,
    }}>
      {children}
    </h3>
  );
}

/* ─── Utility: Card Container ─── */
function Card({ children, style = {}, highlight = false, chosen = false }) {
  return (
    <div style={{
      background: T.surface,
      borderRadius: 16,
      padding: 24,
      border: chosen
        ? `2px solid ${T.green}`
        : highlight
          ? `1px solid ${T.borderLight}`
          : `1px solid ${T.border}`,
      position: 'relative',
      ...style,
    }}>
      {chosen && (
        <div style={{
          position: 'absolute', top: -1, right: 16,
          background: T.green, color: '#000', fontSize: 10,
          fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 6px 6px',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Chosen
        </div>
      )}
      {children}
    </div>
  );
}

/* ─── Utility: Color Swatch ─── */
function Swatch({ color, name, hex, size = 64 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: size, height: size, borderRadius: 10, background: color,
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }} />
      <span style={{ fontSize: 11, color: T.textSecondary, fontWeight: 500 }}>{name}</span>
      <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>{hex}</span>
    </div>
  );
}

/* ─── Utility: Divider ─── */
function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, #38332B, transparent)',
    }} />
  );
}

/* ─── Utility: Label Badge ─── */
function Label({ children, color = T.textMuted }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, color, letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   LOGO VARIATIONS — Inline SVG Components
   ═══════════════════════════════════════════════════════════════════════════ */

/* 1. Chain Links (Chosen) */
function LogoChainLinks({ size = 48 }) {
  const id = `chain-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <rect x="12" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="4.5" fill="none" />
      <rect x="48" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="4.5" fill="none" />
      <circle cx="32" cy="50" r="3.5" fill="#00C27C" />
      <circle cx="68" cy="50" r="3.5" fill="#64A8E0" />
    </svg>
  );
}

/* 2. Handshake */
function LogoHandshake({ size = 48 }) {
  const id = `hand-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Left hand - abstract angular shape */}
      <path d="M10 60 L25 38 L42 42 L50 50 L42 58 L25 62 Z" stroke={`url(#${id})`} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      {/* Right hand - abstract angular shape mirrored */}
      <path d="M90 60 L75 38 L58 42 L50 50 L58 58 L75 62 Z" stroke={`url(#${id})`} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      {/* Center meeting point */}
      <circle cx="50" cy="50" r="4" fill={`url(#${id})`} />
    </svg>
  );
}

/* 3. Infinity Loop */
function LogoInfinity({ size = 48 }) {
  const id = `inf-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <path
        d="M50 50
           C50 36, 62 28, 72 28
           C82 28, 92 36, 92 50
           C92 64, 82 72, 72 72
           C62 72, 50 64, 50 50
           C50 36, 38 28, 28 28
           C18 28, 8 36, 8 50
           C8 64, 18 72, 28 72
           C38 72, 50 64, 50 50Z"
        stroke={`url(#${id})`}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="50" r="3" fill="#00C27C" />
      <circle cx="72" cy="50" r="3" fill="#64A8E0" />
    </svg>
  );
}

/* 4. Bridge Arches */
function LogoBridge({ size = 48 }) {
  const id = `bridge-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Left arch */}
      <path d="M10 72 Q10 30, 50 30" stroke="#00C27C" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Right arch */}
      <path d="M90 72 Q90 30, 50 30" stroke="#64A8E0" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Keystone dot */}
      <circle cx="50" cy="30" r="4.5" fill={`url(#${id})`} />
      {/* Base line */}
      <line x1="10" y1="72" x2="90" y2="72" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
      {/* Support pillars */}
      <line x1="10" y1="72" x2="10" y2="80" stroke="#00C27C" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="72" x2="90" y2="80" stroke="#64A8E0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* 5. Network Graph */
function LogoNetwork({ size = 48 }) {
  const id = `net-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Connection lines */}
      <line x1="30" y1="25" x2="70" y2="35" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.6" />
      <line x1="30" y1="25" x2="25" y2="65" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.6" />
      <line x1="70" y1="35" x2="25" y2="65" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.4" />
      <line x1="70" y1="35" x2="75" y2="70" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.6" />
      <line x1="25" y1="65" x2="75" y2="70" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.6" />
      <line x1="30" y1="25" x2="75" y2="70" stroke={`url(#${id})`} strokeWidth="2" opacity="0.3" />
      {/* Nodes */}
      <circle cx="30" cy="25" r="6" fill="#00C27C" />
      <circle cx="70" cy="35" r="5" fill="#64A8E0" />
      <circle cx="25" cy="65" r="5.5" fill="#00C27C" />
      <circle cx="75" cy="70" r="6" fill="#64A8E0" />
    </svg>
  );
}

/* 6. Venn Overlap */
function LogoVenn({ size = 48 }) {
  const id = `venn-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="58" cy="50" r="26" />
        </clipPath>
      </defs>
      {/* Left circle */}
      <circle cx="42" cy="50" r="26" stroke="#00C27C" strokeWidth="3" fill="none" />
      {/* Right circle */}
      <circle cx="58" cy="50" r="26" stroke="#64A8E0" strokeWidth="3" fill="none" />
      {/* Intersection highlight */}
      <circle cx="42" cy="50" r="26" fill={`url(#${id})`} opacity="0.15" clipPath={`url(#${id}-clip)`} />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   SHIELD / TRUST ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function ShieldIcon1({ size = 48 }) {
  const id = `sh1-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <path d="M50 10 L85 28 L85 55 C85 72 68 85 50 92 C32 85 15 72 15 55 L15 28 Z"
        stroke={`url(#${id})`} strokeWidth="3.5" fill="none" />
      <polyline points="35,52 46,63 67,40" stroke={`url(#${id})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon2({ size = 48 }) {
  const id = `sh2-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <path d="M50 10 L85 28 L85 55 C85 72 68 85 50 92 C32 85 15 72 15 55 L15 28 Z"
        stroke={`url(#${id})`} strokeWidth="3" fill={`url(#${id})`} fillOpacity="0.08" />
      <path d="M50 28 L50 65" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
      <path d="M35 46 L65 46" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon3({ size = 48 }) {
  const id = `sh3-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <path d="M50 10 L85 28 L85 55 C85 72 68 85 50 92 C32 85 15 72 15 55 L15 28 Z"
        fill={`url(#${id})`} fillOpacity="0.12" stroke={`url(#${id})`} strokeWidth="3" />
      {/* Inner shield */}
      <path d="M50 26 L70 36 L70 52 C70 62 60 70 50 74 C40 70 30 62 30 52 L30 36 Z"
        stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="48" r="5" fill={`url(#${id})`} />
    </svg>
  );
}

function VerifiedBadge1({ size = 48 }) {
  const id = `vb1-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" stroke={`url(#${id})`} strokeWidth="3.5" fill="none" />
      <polyline points="33,52 44,63 67,38" stroke={`url(#${id})`} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedBadge2({ size = 48 }) {
  const id = `vb2-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill={`url(#${id})`} fillOpacity="0.12" stroke={`url(#${id})`} strokeWidth="3" />
      <circle cx="50" cy="50" r="24" stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      <polyline points="38,52 46,60 63,41" stroke={`url(#${id})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedBadge3({ size = 48 }) {
  const id = `vb3-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Starburst / seal shape */}
      <polygon
        points="50,10 58,30 80,20 70,42 92,50 70,58 80,80 58,70 50,90 42,70 20,80 30,58 8,50 30,42 20,20 42,30"
        stroke={`url(#${id})`} strokeWidth="2" fill={`url(#${id})`} fillOpacity="0.1"
      />
      <polyline points="37,52 46,61 64,40" stroke={`url(#${id})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ size = 48 }) {
  const id = `lock-${size}-${Math.random().toString(36).substr(2,4)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={id} x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C27C" />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      {/* Lock body */}
      <rect x="25" y="45" width="50" height="38" rx="8" stroke={`url(#${id})`} strokeWidth="3.5" fill={`url(#${id})`} fillOpacity="0.08" />
      {/* Shackle */}
      <path d="M35 45 L35 32 C35 22 42 15 50 15 C58 15 65 22 65 32 L65 45" stroke={`url(#${id})`} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Keyhole */}
      <circle cx="50" cy="60" r="5" fill={`url(#${id})`} />
      <rect x="48" y="60" width="4" height="10" rx="2" fill={`url(#${id})`} />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   NETWORK ANIMATION (Polished Canvas)
   ═══════════════════════════════════════════════════════════════════════════ */

function NetworkAnimation() {
  const canvasRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = 800, H = 400;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    let animId;
    let time = 0;

    // Generate 18 nodes
    if (!nodesRef.current) {
      nodesRef.current = Array.from({ length: 18 }, (_, i) => ({
        x: 60 + Math.random() * (W - 120),
        y: 40 + Math.random() * (H - 80),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 3 + Math.random() * 4,
        color: i % 2 === 0 ? '#00C27C' : '#64A8E0',
        phase: Math.random() * Math.PI * 2,
      }));
    }
    const nodes = nodesRef.current;

    function draw() {
      time += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const threshold = 150;
          if (d < threshold) {
            const alpha = (1 - d / threshold);
            // Pulse effect when nodes get close
            const pulse = d < 80 ? 0.3 + 0.3 * Math.sin(time * 4 + i + j) : 0;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(0,194,124,${(alpha * 0.4 + pulse).toFixed(3)})`);
            grad.addColorStop(1, `rgba(100,168,224,${(alpha * 0.4 + pulse).toFixed(3)})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = d < 80 ? 1.5 + pulse * 2 : 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach(n => {
        // Gentle drift with slight sine wobble
        n.x += n.vx + Math.sin(time + n.phase) * 0.08;
        n.y += n.vy + Math.cos(time * 0.7 + n.phase) * 0.08;

        // Soft boundary bounce
        if (n.x < 20) { n.vx = Math.abs(n.vx); }
        if (n.x > W - 20) { n.vx = -Math.abs(n.vx); }
        if (n.y < 20) { n.vy = Math.abs(n.vy); }
        if (n.y > H - 20) { n.vy = -Math.abs(n.vy); }

        // Glow
        const glowRadius = n.r * 4;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        const baseColor = n.color === '#00C27C' ? '0,194,124' : '100,168,224';
        glow.addColorStop(0, `rgba(${baseColor},0.25)`);
        glow.addColorStop(1, `rgba(${baseColor},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(n.x - n.r * 0.25, n.y - n.r * 0.25, n.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%', maxWidth: 800, height: 400,
        borderRadius: 16, border: `1px solid ${T.border}`,
        background: 'radial-gradient(ellipse at center, #0D0F0E 0%, #0A0908 100%)',
      }}
    />
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION NAV
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV_SECTIONS = [
  { id: 'connect-intro', label: 'Intro' },
  { id: 'name-candidates', label: 'Names' },
  { id: 'logo-variations', label: 'Logos' },
  { id: 'color-palettes', label: 'Palettes' },
  { id: 'wordmark-study', label: 'Wordmarks' },
  { id: 'b2b-mockups', label: 'B2B Mockups' },
  { id: 'network-anim', label: 'Animation' },
  { id: 'trust-language', label: 'Trust' },
];

function ConnectNav({ active }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,9,8,0.94)', backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'center', gap: 4, padding: '10px 16px',
      flexWrap: 'wrap',
    }}>
      {NAV_SECTIONS.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
            color: active === s.id ? T.text : T.textMuted,
            background: active === s.id ? 'rgba(0,194,124,0.1)' : 'transparent',
            border: active === s.id ? `1px solid rgba(0,194,124,0.25)` : '1px solid transparent',
            textDecoration: 'none', transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ConnectBrandSection() {
  const [activeSection, setActiveSection] = useState('connect-intro');

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

  // Intersection observer for nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const container = {
    maxWidth: 1040, margin: '0 auto', padding: '0 24px',
    fontFamily: T.font,
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <ConnectNav active={activeSection} />

      <div style={container}>

        {/* ════════════════════════════════════════════════════════════
            INTRO
           ════════════════════════════════════════════════════════════ */}
        <section id="connect-intro" style={{ padding: '80px 0 64px', scrollMarginTop: 56, textAlign: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <LogoChainLinks size={64} />
          </div>
          <p style={{
            fontSize: 12, fontWeight: 600, color: T.green,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Dutchie AI — Brand Deep Dive
          </p>
          <h1 style={{
            fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300,
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24,
          }}>
            <span style={{ fontWeight: 600 }}>Connect</span> Brand Exploration
          </h1>
          <p style={{
            fontSize: 17, color: T.textSecondary, maxWidth: 600,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            The B2B marketplace and network layer of the Dutchie AI product suite.
            Connect bridges retailers and brands, enabling seamless ordering,
            catalog management, and partnership across the cannabis supply chain.
          </p>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            NAME CANDIDATES
           ════════════════════════════════════════════════════════════ */}
        <section id="name-candidates" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Name Candidates</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Exploring name options for the B2B marketplace product. Each name was evaluated for
            clarity, memorability, domain availability, and alignment with the product's core
            mission of connecting retailers and brands.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {/* Connect (Chosen) */}
            <Card chosen style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 600, fontSize: 36,
                letterSpacing: '0.02em', color: T.text, marginBottom: 12,
              }}>
                connect
              </div>
              <div style={{
                fontSize: 13, color: T.textSecondary, lineHeight: 1.6,
              }}>
                Direct and immediate. Evokes network, bridge, and partnership.
                The word itself is the action — connecting retailers to brands.
                Strong verb energy. Easy to say across languages.
              </div>
              <div style={{
                marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap',
              }}>
                {['Network', 'B2B', 'Active verb', 'Universal'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.green, background: 'rgba(0,194,124,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>

            {/* Bridge */}
            <Card style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 500, fontSize: 36,
                letterSpacing: '0.03em', color: T.text, marginBottom: 12,
              }}>
                bridge
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                Spanning the gap between retailer and brand. Strong metaphor for
                the product's role as intermediary. Implies structure, reliability,
                and traversal from one side to another.
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Infrastructure', 'Trust', 'Structural'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.blue, background: 'rgba(100,168,224,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>

            {/* Exchange */}
            <Card style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 400, fontSize: 36,
                letterSpacing: '0.01em', color: T.text, marginBottom: 12,
              }}>
                exchange
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                Marketplace energy. Evokes trading floors, value exchange,
                bidirectional flow. Strong commercial connotation. Implies
                fairness and mutual benefit in every transaction.
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Commerce', 'Marketplace', 'Bidirectional'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.blue, background: 'rgba(100,168,224,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>

            {/* Relay */}
            <Card style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 700, fontSize: 36,
                letterSpacing: '0.01em', color: T.text, marginBottom: 12,
              }}>
                relay
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                Passing data and orders seamlessly between parties. Speed and
                coordination. Like a relay race — each participant plays their
                part in a chain of trust and execution.
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Speed', 'Coordination', 'Data flow'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.blue, background: 'rgba(100,168,224,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>

            {/* Lattice */}
            <Card style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 300, fontSize: 36,
                letterSpacing: '0.04em', color: T.text, marginBottom: 12,
              }}>
                lattice
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                Interconnected network structure. Mathematical elegance.
                Every node connects to form a regular, predictable pattern.
                Suggests reliability and a well-organized system.
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Structure', 'Elegant', 'Systematic'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.blue, background: 'rgba(100,168,224,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>

            {/* Grove */}
            <Card style={{ padding: 28 }}>
              <div style={{
                fontFamily: T.font, fontWeight: 500, fontSize: 36,
                letterSpacing: '0.02em', color: T.text, marginBottom: 12,
              }}>
                grove
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                Natural network — trees communicate underground through root
                systems. A cannabis/nature tie-in. Organic growth, symbiosis,
                and a community that nurtures each member.
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Nature', 'Cannabis', 'Organic', 'Community'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, color: T.green, background: 'rgba(0,194,124,0.1)',
                    padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            LOGO VARIATIONS
           ════════════════════════════════════════════════════════════ */}
        <section id="logo-variations" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Logo Concepts</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Six distinct mark concepts exploring network, connection, and marketplace
            themes. Each rendered in the green-to-blue gradient at 48px and 72px.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {/* 1. Chain Links (Chosen) */}
            <Card chosen style={{ padding: 28 }}>
              <Label color={T.green}>01 — Chain Links</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoChainLinks size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoChainLinks size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Two interlocking rounded rectangles forming a chain link. Clean, modern,
                instantly readable. The overlapping zone represents shared value. Nodes at
                center of each link represent the two parties.
              </p>
            </Card>

            {/* 2. Handshake */}
            <Card style={{ padding: 28 }}>
              <Label>02 — Handshake</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoHandshake size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoHandshake size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Two abstract hands meeting, simplified to geometric angular shapes.
                Universal symbol of partnership and agreement. The center point represents
                the deal, the shared commitment.
              </p>
            </Card>

            {/* 3. Infinity Loop */}
            <Card style={{ padding: 28 }}>
              <Label>03 — Infinity Loop</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoInfinity size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoInfinity size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Figure-8 representing continuous, never-ending flow between parties.
                Suggests perpetual partnership, recurring orders, ongoing relationship.
                Elegant mathematical form.
              </p>
            </Card>

            {/* 4. Bridge Arches */}
            <Card style={{ padding: 28 }}>
              <Label>04 — Bridge Arches</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoBridge size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoBridge size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Two arches meeting at a keystone, like a bridge. Structural, engineered,
                built to last. Green from one side, blue from the other, meeting in the
                middle. Implies infrastructure and reliability.
              </p>
            </Card>

            {/* 5. Network Graph */}
            <Card style={{ padding: 28 }}>
              <Label>05 — Network Graph</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoNetwork size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoNetwork size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Constellation of 4 nodes connected by lines. Literal network
                visualization. Scalable — each new partner is another node. Alternating
                green and blue represent different participant types.
              </p>
            </Card>

            {/* 6. Venn Overlap */}
            <Card style={{ padding: 28 }}>
              <Label>06 — Venn Overlap</Label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                margin: '20px 0 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoVenn size={48} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>48px</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <LogoVenn size={72} />
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace' }}>72px</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
                Two overlapping circles with highlighted intersection. The overlap
                is where value is created — where retailers and brands find common
                ground. Simple, iconic, highly recognizable.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            COLOR PALETTE ALTERNATIVES
           ════════════════════════════════════════════════════════════ */}
        <section id="color-palettes" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Color Palette Alternatives</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Four distinct palette directions, each evoking a different emotional tone
            for the B2B marketplace experience.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: 20 }}>
            {/* 1. Green + Blue (Chosen) */}
            <Card chosen style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 4 }}>Green + Blue</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>Fresh, trustworthy, forward-looking</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <Swatch color="#00C27C" name="Primary" hex="#00C27C" size={56} />
                <Swatch color="#00E08E" name="Light" hex="#00E08E" size={56} />
                <Swatch color="#64A8E0" name="Secondary" hex="#64A8E0" size={56} />
                <Swatch color="#042017" name="Deep" hex="#042017" size={56} />
              </div>
              <div style={{
                height: 8, borderRadius: 4, marginTop: 8,
                background: 'linear-gradient(90deg, #00C27C, #00E08E, #64A8E0)',
              }} />
            </Card>

            {/* 2. Forest + Sage */}
            <Card style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 4 }}>Forest + Sage</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>Natural, grounded, cannabis-native</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <Swatch color="#2D6A4F" name="Forest" hex="#2D6A4F" size={56} />
                <Swatch color="#52B788" name="Sage" hex="#52B788" size={56} />
                <Swatch color="#95D5B2" name="Mint" hex="#95D5B2" size={56} />
                <Swatch color="#1B3D2F" name="Deep" hex="#1B3D2F" size={56} />
              </div>
              <div style={{
                height: 8, borderRadius: 4, marginTop: 8,
                background: 'linear-gradient(90deg, #2D6A4F, #52B788, #95D5B2)',
              }} />
            </Card>

            {/* 3. Ocean */}
            <Card style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 4 }}>Ocean</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>Calm, professional, enterprise-grade</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <Swatch color="#0077B6" name="Deep Blue" hex="#0077B6" size={56} />
                <Swatch color="#00B4D8" name="Cyan" hex="#00B4D8" size={56} />
                <Swatch color="#90E0EF" name="Sky" hex="#90E0EF" size={56} />
                <Swatch color="#03293D" name="Abyss" hex="#03293D" size={56} />
              </div>
              <div style={{
                height: 8, borderRadius: 4, marginTop: 8,
                background: 'linear-gradient(90deg, #0077B6, #00B4D8, #90E0EF)',
              }} />
            </Card>

            {/* 4. Earth Tones */}
            <Card style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 4 }}>Earth Tones</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>Warm, organic, artisan marketplace</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <Swatch color="#606C38" name="Olive" hex="#606C38" size={56} />
                <Swatch color="#9B8B6E" name="Sand" hex="#9B8B6E" size={56} />
                <Swatch color="#DDA15E" name="Amber" hex="#DDA15E" size={56} />
                <Swatch color="#2A2418" name="Bark" hex="#2A2418" size={56} />
              </div>
              <div style={{
                height: 8, borderRadius: 4, marginTop: 8,
                background: 'linear-gradient(90deg, #606C38, #9B8B6E, #DDA15E)',
              }} />
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            WORDMARK WEIGHT STUDY
           ════════════════════════════════════════════════════════════ */}
        <section id="wordmark-study" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Wordmark Weight + Spacing Study</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Systematically exploring DM Sans weights and letter-spacing combinations
            to find the optimal wordmark configuration. The chosen combination (600 weight,
            0.02em spacing) balances authority with approachability.
          </p>

          <Card style={{ padding: 32, overflowX: 'auto' }}>
            <div style={{ minWidth: 700 }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr 1fr', gap: 0, marginBottom: 8 }}>
                <div />
                {['0.01em', '0.02em', '0.04em', '0.06em'].map(ls => (
                  <div key={ls} style={{
                    textAlign: 'center', fontSize: 11, color: T.textMuted,
                    fontFamily: 'monospace', padding: '8px 0',
                  }}>
                    {ls}
                  </div>
                ))}
              </div>

              {/* Rows: one per weight */}
              {[
                { weight: 400, label: '400' },
                { weight: 500, label: '500' },
                { weight: 600, label: '600' },
                { weight: 700, label: '700' },
              ].map(w => (
                <div key={w.weight} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr 1fr',
                  gap: 0, borderTop: `1px solid ${T.border}`,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', fontSize: 11,
                    color: T.textMuted, fontFamily: 'monospace', padding: '16px 0',
                  }}>
                    {w.label}
                  </div>
                  {['0.01em', '0.02em', '0.04em', '0.06em'].map(ls => {
                    const isChosen = w.weight === 600 && ls === '0.02em';
                    return (
                      <div key={ls} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '16px 8px',
                        background: isChosen ? 'rgba(0,194,124,0.06)' : 'transparent',
                        border: isChosen ? `1px solid rgba(0,194,124,0.3)` : '1px solid transparent',
                        borderRadius: isChosen ? 8 : 0,
                        position: 'relative',
                      }}>
                        <span style={{
                          fontFamily: T.font, fontWeight: w.weight, fontSize: 24,
                          letterSpacing: ls, color: T.text,
                        }}>
                          connect
                        </span>
                        {isChosen && (
                          <div style={{
                            position: 'absolute', top: 2, right: 6,
                            fontSize: 8, fontWeight: 700, color: T.green,
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                          }}>
                            chosen
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>

          {/* Chosen lockup display */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Card style={{ display: 'inline-block', padding: '32px 56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <LogoChainLinks size={40} />
                <span style={{
                  fontFamily: T.font, fontWeight: 600, fontSize: 38,
                  letterSpacing: '0.02em', color: T.text,
                }}>
                  connect
                </span>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: T.textMuted, fontFamily: 'monospace' }}>
                DM Sans 600 / 0.02em / Lowercase
              </div>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            B2B CONTEXT MOCKUPS
           ════════════════════════════════════════════════════════════ */}
        <section id="b2b-mockups" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>B2B Context Mockups</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            How Connect appears in real business contexts — from product listings
            to purchase orders, dashboards, emails, and mobile notifications.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>

            {/* ── Marketplace Listing Card ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Marketplace Listing Card</Label>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{
                  background: T.card, borderRadius: 12, overflow: 'hidden',
                  border: `1px solid ${T.border}`,
                }}>
                  {/* Product image placeholder */}
                  <div style={{
                    height: 120, background: 'linear-gradient(135deg, #0D1A14, #0F1E20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderBottom: `1px solid ${T.border}`,
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 12,
                      background: 'rgba(0,194,124,0.1)', border: '1px solid rgba(0,194,124,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>
                      <span role="img" aria-label="leaf" style={{ filter: 'grayscale(0.3)' }}>&#127807;</span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <LogoChainLinks size={14} />
                      <span style={{ fontSize: 10, color: T.green, fontWeight: 600, letterSpacing: '0.04em' }}>
                        CONNECT MARKETPLACE
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>
                      Blue Dream Pre-Rolls (6pk)
                    </div>
                    <div style={{ fontSize: 12, color: T.textSecondary, marginBottom: 12 }}>
                      by <span style={{ color: T.green }}>Emerald Farms Co.</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: T.text }}>$42.00</div>
                        <div style={{ fontSize: 11, color: T.textMuted }}>per unit wholesale</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: T.textMuted }}>MOQ</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.textSecondary }}>24 units</div>
                      </div>
                    </div>
                    <button style={{
                      marginTop: 14, width: '100%', padding: '10px 0',
                      background: T.gradient, border: 'none', borderRadius: 8,
                      color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      fontFamily: T.font,
                    }}>
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Purchase Order Header ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Purchase Order Header</Label>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{
                  background: '#FAFAF8', borderRadius: 12, padding: 24,
                  color: '#1A1A1A', fontFamily: T.font,
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <LogoChainLinks size={28} />
                      <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: '0.02em', color: '#1A1A1A' }}>
                        connect
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Purchase Order
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>#PO-2026-4182</div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: '#E5E5E0', marginBottom: 16 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>From</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>Emerald Farms Co.</div>
                      <div style={{ fontSize: 11, color: '#666' }}>Portland, OR</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>To</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>Green Leaf Dispensary</div>
                      <div style={{ fontSize: 11, color: '#666' }}>Denver, CO</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date</div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>Mar 19, 2026</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>$3,024.00</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#00A36C' }}>Confirmed</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Partner Dashboard Nav ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Partner Dashboard Navigation</Label>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{
                  background: '#071A12', borderRadius: 12, overflow: 'hidden',
                  border: '1px solid rgba(0,194,124,0.12)', width: 220,
                }}>
                  {/* Sidebar header */}
                  <div style={{
                    padding: '18px 16px', borderBottom: '1px solid rgba(0,194,124,0.1)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <LogoChainLinks size={22} />
                    <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '0.02em', color: T.text }}>
                      connect
                    </span>
                  </div>
                  {/* Nav items */}
                  {[
                    { label: 'Dashboard', active: false, icon: '\u25A3' },
                    { label: 'Orders', active: true, icon: '\u2B9A', badge: '12' },
                    { label: 'Catalog', active: false, icon: '\u25CB' },
                    { label: 'Analytics', active: false, icon: '\u2261' },
                    { label: 'Partners', active: false, icon: '\u2B2C' },
                    { label: 'Settings', active: false, icon: '\u2699' },
                  ].map(item => (
                    <div key={item.label} style={{
                      padding: '10px 16px',
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: item.active ? 'rgba(0,194,124,0.08)' : 'transparent',
                      borderLeft: item.active ? '3px solid #00C27C' : '3px solid transparent',
                      cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: 14, color: item.active ? T.green : T.textMuted, width: 18, textAlign: 'center' }}>
                        {item.icon}
                      </span>
                      <span style={{
                        fontSize: 13, fontWeight: item.active ? 600 : 400,
                        color: item.active ? T.text : T.textSecondary, flex: 1,
                      }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: '#fff',
                          background: T.green, borderRadius: 10, padding: '2px 7px',
                          minWidth: 18, textAlign: 'center',
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* ── Email Header ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Transactional Email Header</Label>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{
                  background: '#fff', borderRadius: 12, overflow: 'hidden',
                  color: '#1A1A1A', fontFamily: T.font, maxWidth: 380,
                }}>
                  {/* Green header bar */}
                  <div style={{
                    background: 'linear-gradient(135deg, #00C27C, #00A86B)',
                    padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <LogoChainLinks size={24} />
                    <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', color: '#fff' }}>
                      connect
                    </span>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
                      Your order has shipped!
                    </div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
                      PO #4182 from Emerald Farms has been shipped and is expected to arrive by Mar 22, 2026.
                    </div>
                    <div style={{
                      display: 'inline-block', padding: '10px 24px',
                      background: 'linear-gradient(135deg, #00C27C, #64A8E0)',
                      borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 600,
                      cursor: 'pointer',
                    }}>
                      Track Shipment
                    </div>
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #EDEDEB', fontSize: 11, color: '#AAA' }}>
                      Sent via Dutchie Connect -- Unsubscribe
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Mobile Notification ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Mobile Push Notification</Label>
              </div>
              <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 320, background: '#1C1C1E', borderRadius: 16,
                  overflow: 'hidden', fontFamily: T.font,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}>
                  {/* Status bar */}
                  <div style={{
                    padding: '8px 20px', display: 'flex', justifyContent: 'space-between',
                    fontSize: 11, fontWeight: 600, color: '#fff',
                  }}>
                    <span>9:41</span>
                    <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ width: 14, height: 8, border: '1px solid #fff', borderRadius: 2, display: 'inline-block', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 1, left: 1, width: 9, height: 4, borderRadius: 1, background: '#00C27C' }} />
                      </span>
                    </span>
                  </div>
                  {/* Notification */}
                  <div style={{
                    margin: '0 12px 12px', background: 'rgba(255,255,255,0.1)',
                    borderRadius: 14, padding: '14px 16px',
                    backdropFilter: 'blur(20px)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: 'linear-gradient(135deg, #00C27C, #64A8E0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <LogoChainLinks size={14} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', flex: 1 }}>Connect</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>now</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                      New PO from Green Leaf Dispensary
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                      72 units of Blue Dream Pre-Rolls -- $3,024.00 total. Tap to review.
                    </div>
                  </div>
                  {/* Home bar */}
                  <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
                    <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Analytics Dashboard Card ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
                <Label>Analytics Overview Widget</Label>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{
                  background: T.card, borderRadius: 12, padding: 20,
                  border: `1px solid ${T.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                    <LogoChainLinks size={16} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text, letterSpacing: '0.02em' }}>
                      connect
                    </span>
                    <span style={{ fontSize: 11, color: T.textMuted, marginLeft: 'auto' }}>Last 30 days</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Orders', value: '1,247', change: '+18%', up: true },
                      { label: 'Revenue', value: '$842K', change: '+24%', up: true },
                      { label: 'Partners', value: '86', change: '+6', up: true },
                      { label: 'Fill Rate', value: '97.3%', change: '+0.8%', up: true },
                    ].map(stat => (
                      <div key={stat.label} style={{
                        background: 'rgba(0,194,124,0.04)', borderRadius: 8, padding: '12px 14px',
                        border: '1px solid rgba(0,194,124,0.08)',
                      }}>
                        <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {stat.label}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: T.text }}>{stat.value}</div>
                        <div style={{ fontSize: 11, color: stat.up ? T.green : '#E87068', fontWeight: 500 }}>
                          {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            NETWORK ANIMATION
           ════════════════════════════════════════════════════════════ */}
        <section id="network-anim" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Network Animation</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            A living network visualization: 18 nodes drift slowly, forming and dissolving
            connections based on proximity. Lines pulse brighter as nodes approach each other.
            Green and blue alternate to represent the two sides of the marketplace.
          </p>

          <Card style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <NetworkAnimation />
          </Card>

          <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.green }} />
              <span style={{ fontSize: 12, color: T.textSecondary }}>Retailers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.blue }} />
              <span style={{ fontSize: 12, color: T.textSecondary }}>Brands / Suppliers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 2, borderRadius: 1, background: T.gradient }} />
              <span style={{ fontSize: 12, color: T.textSecondary }}>Active connection</span>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
            TRUST & PARTNERSHIP VISUAL LANGUAGE
           ════════════════════════════════════════════════════════════ */}
        <section id="trust-language" style={{ padding: '64px 0', scrollMarginTop: 56 }}>
          <SubTitle>Trust + Partnership Visual Language</SubTitle>
          <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            In B2B commerce, trust is everything. These visual elements communicate
            security, verification, and reliability throughout the Connect experience.
          </p>

          {/* Shield Icons */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 16, letterSpacing: '0.04em' }}>
              Shield Icon Variations
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <ShieldIcon1 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Outline + Checkmark</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Clean, minimal</div>
              </Card>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <ShieldIcon2 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Filled + Cross</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Medical/protection feel</div>
              </Card>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <ShieldIcon3 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Double Shield</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Extra layer of trust</div>
              </Card>
            </div>
          </div>

          {/* Verified Badge Designs */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 16, letterSpacing: '0.04em' }}>
              Verified Badge Designs
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <VerifiedBadge1 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Simple Circle</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Universal checkmark</div>
              </Card>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <VerifiedBadge2 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Double Ring</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Concentric verification</div>
              </Card>
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <VerifiedBadge3 size={64} />
                <div style={{ marginTop: 12, fontSize: 12, color: T.textSecondary }}>Seal / Starburst</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Official stamp feel</div>
              </Card>
            </div>
          </div>

          {/* Trusted Partner Badge Lockup */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 16, letterSpacing: '0.04em' }}>
              "Trusted Partner" Badge Lockup
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {/* Horizontal lockup */}
              <Card style={{ padding: 24 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 20px', borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(0,194,124,0.06), rgba(100,168,224,0.04))',
                  border: '1px solid rgba(0,194,124,0.15)',
                }}>
                  <ShieldIcon1 size={36} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Trusted Partner</div>
                    <div style={{ fontSize: 11, color: T.green }}>Verified by Connect</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: T.textMuted }}>Horizontal — profile page, listing header</div>
              </Card>

              {/* Badge style */}
              <Card style={{ padding: 24, textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '20px 28px', borderRadius: 16,
                  background: 'rgba(0,194,124,0.05)',
                  border: '1px solid rgba(0,194,124,0.12)',
                }}>
                  <VerifiedBadge3 size={48} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: '0.02em' }}>Trusted Partner</div>
                  <div style={{ fontSize: 10, color: T.textSecondary }}>Since 2024</div>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: T.textMuted }}>Stacked — badge display, partner cards</div>
              </Card>

              {/* Inline badge */}
              <Card style={{ padding: 24 }}>
                <div style={{ fontSize: 13, color: T.textSecondary, marginBottom: 12 }}>
                  Inline usage in text:
                </div>
                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.8 }}>
                  Emerald Farms Co. is a{' '}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'rgba(0,194,124,0.1)', padding: '2px 8px 2px 4px',
                    borderRadius: 4, verticalAlign: 'middle',
                  }}>
                    <VerifiedBadge1 size={14} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.green }}>Trusted Partner</span>
                  </span>
                  {' '}on the Connect marketplace with 200+ completed orders.
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: T.textMuted }}>Inline — marketplace listings, profiles</div>
              </Card>
            </div>
          </div>

          {/* Security / Encryption Visual */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 16, letterSpacing: '0.04em' }}>
              Security + Encryption Visual
            </div>
            <Card style={{ padding: 32 }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 32, flexWrap: 'wrap',
              }}>
                {/* Lock + Connect combo */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '20px 32px', borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(0,194,124,0.04), rgba(100,168,224,0.04))',
                  border: '1px solid rgba(0,194,124,0.12)',
                }}>
                  <LockIcon size={48} />
                  <div style={{ width: 1, height: 40, background: T.border }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <LogoChainLinks size={20} />
                      <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', color: T.text }}>
                        connect
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: T.textSecondary }}>End-to-end encrypted</div>
                    <div style={{ fontSize: 11, color: T.green, fontWeight: 500 }}>All transactions secured</div>
                  </div>
                </div>

                {/* Security badges row */}
                <div style={{ display: 'flex', gap: 16 }}>
                  {[
                    { icon: <LockIcon size={24} />, label: 'Encrypted' },
                    { icon: <ShieldIcon1 size={24} />, label: 'Protected' },
                    { icon: <VerifiedBadge1 size={24} />, label: 'Verified' },
                  ].map((b, i) => (
                    <div key={i} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      padding: '12px 16px', borderRadius: 10,
                      background: 'rgba(0,194,124,0.04)',
                      border: '1px solid rgba(0,194,124,0.08)',
                    }}>
                      {b.icon}
                      <span style={{ fontSize: 10, color: T.textSecondary, fontWeight: 500 }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          padding: '48px 0', textAlign: 'center',
          borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <LogoChainLinks size={16} />
            <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '0.02em', color: T.textSecondary }}>
              connect
            </span>
          </div>
          <p style={{ fontSize: 12, color: T.textMuted }}>
            Brand Deep Dive -- Dutchie AI Product Suite -- 2026
          </p>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}

// Named export for external consumption
export { ConnectBrandSection };
