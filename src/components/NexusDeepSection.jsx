import { useId } from 'react';
import NexusIcon from './NexusIcon';

/* ─── SubTitle (matches DesignStudy pattern) ─── */
function SubTitle({ children, color = '#6B6359' }) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
      {children}
    </h3>
  );
}

/* ─── Inline SVG Logo Concepts ─── */

function NeuralNodeIcon({ size = 48, gradientColors = ['#D4A03A', '#FFC02A', '#FFD666'] }) {
  const uid = useId();
  const id = `neural-grad-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="50%" stopColor={gradientColors[1]} />
          <stop offset="100%" stopColor={gradientColors[2]} />
        </linearGradient>
      </defs>
      {/* Connection lines */}
      <line x1="30" y1="25" x2="70" y2="25" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="25" x2="50" y2="75" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="25" x2="50" y2="75" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      {/* Secondary connection lines to outer satellite nodes */}
      <line x1="30" y1="25" x2="12" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="70" y1="25" x2="88" y2="50" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="75" x2="25" y2="90" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="75" x2="75" y2="90" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="30" y1="25" x2="15" y2="10" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="70" y1="25" x2="85" y2="10" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Primary nodes */}
      <circle cx="30" cy="25" r="9" fill={`url(#${id})`} />
      <circle cx="70" cy="25" r="9" fill={`url(#${id})`} />
      <circle cx="50" cy="75" r="9" fill={`url(#${id})`} />
      {/* Satellite nodes */}
      <circle cx="12" cy="50" r="4" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="88" cy="50" r="4" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="25" cy="90" r="4" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="75" cy="90" r="4" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="15" cy="10" r="4" fill={`url(#${id})`} opacity="0.6" />
      <circle cx="85" cy="10" r="4" fill={`url(#${id})`} opacity="0.6" />
    </svg>
  );
}

function FacetedGemIcon({ size = 48, gradientColors = ['#D4A03A', '#FFC02A', '#FFD666'] }) {
  const uid = useId();
  const id = `gem-grad-${uid}`;
  const id2 = `gem-grad2-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="50%" stopColor={gradientColors[1]} />
          <stop offset="100%" stopColor={gradientColors[2]} />
        </linearGradient>
        <linearGradient id={id2} x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientColors[2]} />
          <stop offset="100%" stopColor={gradientColors[0]} />
        </linearGradient>
      </defs>
      {/* Outer diamond outline */}
      <polygon points="50,6 90,35 78,88 22,88 10,35" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      {/* Crown facet line (top) */}
      <line x1="10" y1="35" x2="90" y2="35" stroke={`url(#${id})`} strokeWidth="2" />
      {/* Internal facets from crown to point */}
      <line x1="50" y1="6" x2="30" y2="35" stroke={`url(#${id})`} strokeWidth="1.5" opacity="0.7" />
      <line x1="50" y1="6" x2="70" y2="35" stroke={`url(#${id})`} strokeWidth="1.5" opacity="0.7" />
      {/* Central keel line */}
      <line x1="50" y1="35" x2="22" y2="88" stroke={`url(#${id2})`} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="35" x2="78" y2="88" stroke={`url(#${id2})`} strokeWidth="1.5" opacity="0.5" />
      {/* Pavilion facets */}
      <line x1="30" y1="35" x2="22" y2="88" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.4" />
      <line x1="70" y1="35" x2="78" y2="88" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.4" />
      {/* Central vertical */}
      <line x1="50" y1="35" x2="50" y2="88" stroke={`url(#${id2})`} strokeWidth="1.5" opacity="0.35" />
      {/* Highlight facet fills */}
      <polygon points="50,6 30,35 50,35" fill={`url(#${id})`} opacity="0.15" />
      <polygon points="50,6 70,35 50,35" fill={`url(#${id})`} opacity="0.08" />
      <polygon points="30,35 50,35 22,88" fill={`url(#${id2})`} opacity="0.1" />
    </svg>
  );
}

function ApertureIcon({ size = 48, gradientColors = ['#D4A03A', '#FFC02A', '#FFD666'] }) {
  const uid = useId();
  const id = `aperture-grad-${uid}`;
  // Six overlapping aperture blades forming an iris
  const cx = 50, cy = 50, r = 38;
  const bladeCount = 6;
  const blades = [];
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i * 360) / bladeCount;
    const rad = (angle * Math.PI) / 180;
    const nextRad = ((angle + 60) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad);
    const y1 = cy + r * Math.sin(rad);
    const x2 = cx + r * Math.cos(nextRad);
    const y2 = cy + r * Math.sin(nextRad);
    const midRad = ((angle + 30) * Math.PI) / 180;
    const ix = cx + (r * 0.35) * Math.cos(midRad);
    const iy = cy + (r * 0.35) * Math.sin(midRad);
    blades.push({ x1, y1, x2, y2, ix, iy, opacity: 0.12 + (i * 0.04) });
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="50%" stopColor={gradientColors[1]} />
          <stop offset="100%" stopColor={gradientColors[2]} />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 4} stroke={`url(#${id})`} strokeWidth="2" fill="none" />
      {/* Aperture blades */}
      {blades.map((b, i) => (
        <polygon
          key={i}
          points={`${b.x1},${b.y1} ${b.x2},${b.y2} ${b.ix},${b.iy}`}
          fill={`url(#${id})`}
          opacity={b.opacity}
          stroke={`url(#${id})`}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}
      {/* Inner circle (aperture opening) */}
      <circle cx={cx} cy={cy} r="12" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="3" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── Name candidate data ─── */
const NAME_CANDIDATES = [
  {
    name: 'nexus',
    display: 'Nexus',
    weight: 300,
    spacing: '0.06em',
    size: 38,
    rationale: 'Connection point, neural hub. Evokes centrality and convergence - the platform where all data flows meet. Latin root "nexus" literally means "a binding together."',
  },
  {
    name: 'meridian',
    display: 'Meridian',
    weight: 400,
    spacing: '0.08em',
    size: 38,
    rationale: 'Lines of longitude, navigation, guidance system. Implies precision and global reach. A meridian is the highest point the sun reaches - peak clarity and direction.',
  },
  {
    name: 'prism',
    display: 'Prism',
    weight: 600,
    spacing: '0.12em',
    size: 38,
    rationale: 'Light refraction, multi-perspective analytics. A single input becomes a spectrum of insight. Short, memorable, evokes transformation of raw data into understanding.',
  },
  {
    name: 'cortex',
    display: 'Cortex',
    weight: 500,
    spacing: '0.04em',
    size: 38,
    rationale: 'The brain\'s outer layer, the processing center. Implies intelligence and cognition. Strong consonants give it a decisive, technical tone.',
  },
  {
    name: 'lumen',
    display: 'Lumen',
    weight: 300,
    spacing: '0.1em',
    size: 38,
    rationale: 'Unit of light, illumination and insight. Warm and approachable. Suggests making the invisible visible - the platform illuminates what matters.',
  },
];

/* ─── Logo concept data ─── */
const LOGO_CONCEPTS = [
  { key: 'swirl', label: 'Nexus Swirl', description: 'Organic flow' },
  { key: 'neural', label: 'Neural Node', description: 'Connected intelligence' },
  { key: 'gem', label: 'Faceted Gem', description: 'Multi-faceted prism' },
  { key: 'aperture', label: 'Aperture', description: 'Focused clarity' },
];

function LogoByKey({ conceptKey, size = 36, gradientColors }) {
  switch (conceptKey) {
    case 'swirl': return <NexusIcon size={size} />;
    case 'neural': return <NeuralNodeIcon size={size} gradientColors={gradientColors} />;
    case 'gem': return <FacetedGemIcon size={size} gradientColors={gradientColors} />;
    case 'aperture': return <ApertureIcon size={size} gradientColors={gradientColors} />;
    default: return null;
  }
}

/* ─── Background test colors ─── */
const BACKGROUNDS = [
  { name: 'Pure Black', hex: '#000000' },
  { name: 'Brand Dark', hex: '#0A0908' },
  { name: 'Surface', hex: '#141210' },
  { name: 'Card', hex: '#1C1B1A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Green Sidebar', hex: '#042017' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   NEXUS DEEP SECTION — Expanded Brand Exploration
   ═══════════════════════════════════════════════════════════════════════════════ */

export function NexusDeepSection({ theme = 'dark' }) {
  const themes = {
    dark: {
      bg: '#0A0908', cardBg: '#141210', border: '#282724',
      text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359',
      accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666',
      accentGreen: '#00C27C',
    },
    light: {
      bg: '#FAFAF8', cardBg: '#FFFFFF', border: '#E5E2DC',
      text: '#1A1917', textMuted: '#5C574F', textFaint: '#8C8680',
      accentGold: '#B8860B', accentGoldLight: '#DAA520', accentGoldLighter: '#F0C75E',
      accentGreen: '#059669',
    }
  };
  const t = themes[theme];

  const card = {
    background: t.cardBg,
    borderRadius: 16,
    padding: 32,
    border: `1px solid ${t.border}`,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

      {/* ━━━ SECTION 1: NAME CANDIDATES ━━━ */}
      <div>
        <SubTitle color={t.textFaint}>Name Candidates — Wordmark Explorations</SubTitle>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
          Five name directions tested in DM Sans at varied weights and letter-spacings.
          Each name carries a distinct semantic territory that shapes how users perceive the platform.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {NAME_CANDIDATES.map((c, i) => (
            <div key={c.name} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Number badge + wordmark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(212,160,58,0.1)',
                  border: '1px solid rgba(212,160,58,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, color: t.accentGold,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: c.weight,
                  fontSize: c.size,
                  letterSpacing: c.spacing,
                  color: t.text,
                }}>
                  {c.name}
                </span>
              </div>

              {/* Meta + rationale */}
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', paddingLeft: 52 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 11, color: t.textFaint, fontFamily: 'monospace' }}>
                    wt {c.weight}
                  </span>
                  <span style={{ fontSize: 11, color: t.textFaint, fontFamily: 'monospace' }}>
                    ls {c.spacing}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, paddingLeft: 52, margin: 0 }}>
                <span style={{ color: t.accentGold, fontWeight: 600 }}>{c.display}</span> — {c.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ SECTION 2: LOGO VARIATIONS ━━━ */}
      <div>
        <SubTitle color={t.textFaint}>Logo Variations — Four Icon Concepts</SubTitle>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
          Each icon concept explores a different metaphor for the platform's role.
          All use the gold gradient ({t.accentGold} to {t.accentGoldLight} to {t.accentGoldLighter}).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {LOGO_CONCEPTS.map((concept) => (
            <div key={concept.key} style={{
              ...card,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              textAlign: 'center',
            }}>
              <div style={{
                width: 96, height: 96,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: t.bg,
                borderRadius: 16,
                border: `1px solid ${t.border}`,
              }}>
                <LogoByKey conceptKey={concept.key} size={56} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }}>
                  {concept.label}
                </div>
                <div style={{ fontSize: 12, color: t.textFaint }}>
                  {concept.description}
                </div>
              </div>
              {/* Size scale row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                {[16, 24, 36, 48].map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <LogoByKey conceptKey={concept.key} size={s} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />
                    <span style={{ fontSize: 9, color: t.textFaint, fontFamily: 'monospace' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ SECTION 3: WORDMARK x LOGO MATRIX ━━━ */}
      <div>
        <SubTitle color={t.textFaint}>Wordmark Pairings — Name x Logo Matrix</SubTitle>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
          Every name candidate paired with every logo concept. Scan the grid to find
          natural pairings where name tone and icon metaphor reinforce each other.
        </p>

        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px repeat(4, 1fr)',
          gap: 12,
          marginBottom: 12,
        }}>
          <div />
          {LOGO_CONCEPTS.map(concept => (
            <div key={concept.key} style={{ textAlign: 'center', fontSize: 11, color: t.textFaint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {concept.label}
            </div>
          ))}
        </div>

        {/* Matrix rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {NAME_CANDIDATES.map((candidate) => (
            <div key={candidate.name} style={{
              display: 'grid',
              gridTemplateColumns: '120px repeat(4, 1fr)',
              gap: 12,
              alignItems: 'center',
            }}>
              {/* Row label */}
              <div style={{
                fontSize: 13, fontWeight: 600, color: t.textMuted,
                textTransform: 'capitalize',
              }}>
                {candidate.display}
              </div>

              {/* Pairing cells */}
              {LOGO_CONCEPTS.map(concept => (
                <div key={concept.key} style={{
                  background: t.cardBg,
                  borderRadius: 12,
                  padding: '16px 12px',
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  minHeight: 56,
                }}>
                  <LogoByKey conceptKey={concept.key} size={24} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: candidate.weight,
                    fontSize: 16,
                    letterSpacing: candidate.spacing,
                    color: t.text,
                    whiteSpace: 'nowrap',
                  }}>
                    {candidate.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ SECTION 4: BACKGROUND TESTS ━━━ */}
      <div>
        <SubTitle color={t.textFaint}>Background Tests — Logo on Six Surfaces</SubTitle>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
          The Nexus swirl logo tested on every surface it will appear on in the product.
          Checking contrast, legibility, and visual weight across light and dark contexts.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {BACKGROUNDS.map((bg) => {
            const isLight = bg.hex === '#FFFFFF';
            return (
              <div key={bg.hex} style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${t.border}`,
              }}>
                {/* Logo display area */}
                <div style={{
                  background: bg.hex,
                  padding: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  minHeight: 100,
                }}>
                  <NexusIcon size={36} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 24,
                    letterSpacing: '0.06em',
                    color: isLight ? '#1C1B1A' : t.text,
                  }}>
                    nexus
                  </span>
                </div>

                {/* Label bar */}
                <div style={{
                  background: t.cardBg,
                  padding: '10px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>
                    {bg.name}
                  </span>
                  <span style={{ fontSize: 11, color: t.textFaint, fontFamily: 'monospace' }}>
                    {bg.hex}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
