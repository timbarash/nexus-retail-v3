import { useEffect, useRef, useId } from 'react';
import NexusIcon from '../components/NexusIcon';

/* ─── DexSpiral SVG (Dex Logo) ─── */
function DexSpiral({ size = 48, className = '', style = {}, gradientColors }) {
  const c0 = gradientColors ? gradientColors[0] : '#D4A03A';
  const c1 = gradientColors ? gradientColors[1] : '#FFC02A';
  const c2 = gradientColors ? gradientColors[2] : '#FFD666';
  const id = `dex-spiral-ph-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c0} />
          <stop offset="50%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
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
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="50" r="2" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── ConnectIcon SVG ─── */
function ConnectIcon({ size = 48, className = '', style = {}, accentGreen }) {
  const greenColor = accentGreen || '#00C27C';
  const id = `connect-grad-ph-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={greenColor} />
          <stop offset="100%" stopColor="#64A8E0" />
        </linearGradient>
      </defs>
      <rect x="12" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <rect x="48" y="30" width="40" height="40" rx="16" stroke={`url(#${id})`} strokeWidth="5" fill="none" />
      <circle cx="32" cy="50" r="4" fill={greenColor} />
      <circle cx="68" cy="50" r="4" fill="#64A8E0" />
    </svg>
  );
}

/* ─── Placeholder icons for future products ─── */
function PlaceholderIcon({ size = 24, label = '?', color }) {
  color = color || '#6B6359';
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      border: `1.5px dashed ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, color, fontWeight: 600,
      opacity: 0.7,
    }}>
      {label}
    </div>
  );
}

/* ─── Analytics Icon ─── */
function AnalyticsIcon({ size = 24, color }) {
  color = color || '#00C27C';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="14" width="4" height="7" rx="1" fill={color} opacity="0.5" />
      <rect x="10" y="9" width="4" height="12" rx="1" fill={color} opacity="0.7" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
    </svg>
  );
}

/* ─── Consumer Icon ─── */
function ConsumerIcon({ size = 24, color }) {
  color = color || '#D4A03A';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  DESIGN TOKENS                                                    ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

const STATIC = {
  cardHover: '#1A1815',
  borderLight: '#38332B',
  greenDark: '#0A6B42',
  blue: '#64A8E0',
  coral: '#FF6B6B',
  font: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
};

/* ─── Shared style builders ─── */
const cardStyle = (t, extra = {}) => ({
  background: t.cardBg,
  borderRadius: 16,
  padding: 32,
  border: `1px solid ${t.border}`,
  ...extra,
});

const dividerStyle = (t) => ({
  height: 1,
  background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
  margin: '64px 0',
});

const sectionTitleStyle = (t) => ({
  fontSize: 32,
  fontWeight: 700,
  color: t.text,
  letterSpacing: '-0.02em',
  marginBottom: 8,
  lineHeight: 1.2,
});

const sectionSubStyle = (t) => ({
  fontSize: 15,
  color: t.textMuted,
  lineHeight: 1.7,
  maxWidth: 640,
  marginBottom: 40,
});

const labelStyle = (t) => ({
  fontSize: 12,
  fontWeight: 600,
  color: t.textFaint,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: 16,
});

const tagStyle = (color) => ({
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 600,
  color,
  background: `${color}15`,
  border: `1px solid ${color}30`,
  letterSpacing: '0.04em',
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 1: CURRENT vs PROPOSED HIERARCHY                         ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HierarchyTreeNode({ icon, label, sublabel, color, indent = 0, isLast = false, isBranch = false, isDashed = false, children, t }) {
  return (
    <div style={{ marginLeft: indent * 28, position: 'relative' }}>
      {indent > 0 && (
        <div style={{
          position: 'absolute',
          left: -20,
          top: 0,
          width: 16,
          height: '50%',
          borderLeft: `2px ${isDashed ? 'dashed' : 'solid'} ${color}40`,
          borderBottom: `2px ${isDashed ? 'dashed' : 'solid'} ${color}40`,
          borderBottomLeftRadius: 8,
        }} />
      )}
      {indent > 0 && !isLast && (
        <div style={{
          position: 'absolute',
          left: -20,
          top: '50%',
          bottom: children ? -20 : 0,
          borderLeft: `2px ${isDashed ? 'dashed' : 'solid'} ${color}40`,
        }} />
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 14px',
        borderRadius: 10,
        background: isBranch ? `${color}10` : 'transparent',
        border: isBranch ? `1px solid ${color}25` : '1px solid transparent',
        marginBottom: 4,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: `${color}15`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
          {sublabel && <div style={{ fontSize: 11, color: t.textFaint, marginTop: 1 }}>{sublabel}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function CurrentVsProposedSection({ t }) {
  const B2B_COLOR = t.accentGreen;
  const B2C_COLOR = t.accentGold;
  return (
    <div>
      <div style={labelStyle(t)}>Section 1</div>
      <h2 style={sectionTitleStyle(t)}>Current vs. Proposed Hierarchy</h2>
      <p style={sectionSubStyle(t)}>
        Today, Dutchie AI products exist as a flat list. Reorganizing them into suites creates clearer market positioning and opens expansion paths for new products.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: 32,
      }}>
        {/* Current (Flat) */}
        <div style={cardStyle(t)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{
              padding: '4px 12px', borderRadius: 8,
              background: `${t.textMuted}1A`,
              border: `1px solid ${t.textMuted}26`,
              fontSize: 11, fontWeight: 700, color: t.textFaint,
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>Current</div>
            <span style={{ fontSize: 13, color: t.textFaint }}>Flat structure</span>
          </div>

          <HierarchyTreeNode
            icon={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>D</span>}
            label="Dutchie AI"
            sublabel="Parent brand"
            color={t.textFaint}
            isBranch
            t={t}
          >
            <HierarchyTreeNode
              icon={<NexusIcon size={16} />}
              label="Nexus"
              sublabel="Platform"
              color={t.accentGold}
              indent={1}
              t={t}
            />
            <HierarchyTreeNode
              icon={<DexSpiral size={16} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />}
              label="Dex"
              sublabel="Agent"
              color={t.accentGold}
              indent={1}
              t={t}
            />
            <HierarchyTreeNode
              icon={<ConnectIcon size={16} accentGreen={t.accentGreen} />}
              label="Connect"
              sublabel="Marketplace"
              color={t.accentGreen}
              indent={1}
              isLast
              t={t}
            />
          </HierarchyTreeNode>

          <div style={{
            marginTop: 24, padding: '12px 16px', borderRadius: 10,
            background: 'rgba(255,107,107,0.06)',
            border: '1px solid rgba(255,107,107,0.12)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: STATIC.coral, marginBottom: 4 }}>Limitations</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: t.textMuted, lineHeight: 1.8 }}>
              <li>No clear market segmentation</li>
              <li>Unclear where new products slot in</li>
              <li>Dex relationship to Nexus/Connect is ambiguous</li>
            </ul>
          </div>
        </div>

        {/* Proposed (Suite-Based) */}
        <div style={cardStyle(t, { border: `1px solid ${STATIC.borderLight}` })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{
              padding: '4px 12px', borderRadius: 8,
              background: `${t.accentGreen}12`,
              border: `1px solid ${t.accentGreen}25`,
              fontSize: 11, fontWeight: 700, color: t.accentGreen,
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>Proposed</div>
            <span style={{ fontSize: 13, color: t.textMuted }}>Suite-based structure</span>
          </div>

          <HierarchyTreeNode
            icon={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>D</span>}
            label="Dutchie AI"
            sublabel="Parent brand"
            color={t.textFaint}
            isBranch
            t={t}
          >
            {/* B2B Suite */}
            <HierarchyTreeNode
              icon={<span style={{ fontSize: 10, fontWeight: 700, color: B2B_COLOR }}>B2B</span>}
              label="B2B AI Suite"
              sublabel="Brand / Supplier-facing"
              color={B2B_COLOR}
              indent={1}
              isBranch
              t={t}
            >
              <HierarchyTreeNode
                icon={<ConnectIcon size={16} accentGreen={t.accentGreen} />}
                label="Connect"
                sublabel="Marketplace"
                color={B2B_COLOR}
                indent={2}
                t={t}
              />
              <HierarchyTreeNode
                icon={<PlaceholderIcon size={16} label="A" color={B2B_COLOR} />}
                label="Agent"
                sublabel="B2B Intelligence"
                color={B2B_COLOR}
                indent={2}
                isDashed
                t={t}
              />
              <HierarchyTreeNode
                icon={<AnalyticsIcon size={16} color={B2B_COLOR} />}
                label="Analytics"
                sublabel="Brand Insights"
                color={B2B_COLOR}
                indent={2}
                isLast
                isDashed
                t={t}
              />
            </HierarchyTreeNode>

            {/* B2C Suite */}
            <HierarchyTreeNode
              icon={<span style={{ fontSize: 10, fontWeight: 700, color: B2C_COLOR }}>B2C</span>}
              label="B2C AI Suite"
              sublabel="Retailer / Consumer-facing"
              color={B2C_COLOR}
              indent={1}
              isLast
              isBranch
              t={t}
            >
              <HierarchyTreeNode
                icon={<NexusIcon size={16} />}
                label="Nexus"
                sublabel="Retail Command Center"
                color={B2C_COLOR}
                indent={2}
                t={t}
              />
              <HierarchyTreeNode
                icon={<DexSpiral size={16} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />}
                label="Dex"
                sublabel="Retail AI Agent"
                color={B2C_COLOR}
                indent={2}
                t={t}
              />
              <HierarchyTreeNode
                icon={<ConsumerIcon size={16} color={B2C_COLOR} />}
                label="Consumer"
                sublabel="Customer Experience"
                color={B2C_COLOR}
                indent={2}
                isLast
                isDashed
                t={t}
              />
            </HierarchyTreeNode>
          </HierarchyTreeNode>

          <div style={{
            marginTop: 24, padding: '12px 16px', borderRadius: 10,
            background: `${t.accentGreen}08`,
            border: `1px solid ${t.accentGreen}15`,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.accentGreen, marginBottom: 4 }}>Advantages</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: t.textMuted, lineHeight: 1.8 }}>
              <li>Clear market segmentation by buyer</li>
              <li>Natural expansion slots for new products</li>
              <li>Distinct GTM motions per suite</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap',
        padding: '14px 20px', borderRadius: 10,
        background: t.cardBg, border: `1px solid ${t.border}`,
      }}>
        <span style={{ fontSize: 12, color: t.textFaint, fontWeight: 600 }}>Legend:</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: t.textMuted }}>
          <span style={{ width: 16, height: 2, background: t.accentGold, borderRadius: 1, display: 'inline-block' }} />
          B2C (Retailer/Consumer)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: t.textMuted }}>
          <span style={{ width: 16, height: 2, background: t.accentGreen, borderRadius: 1, display: 'inline-block' }} />
          B2B (Brand/Supplier)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: t.textMuted }}>
          <span style={{ width: 16, height: 0, borderTop: `2px dashed ${t.textFaint}`, display: 'inline-block' }} />
          Future / Planned
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 2: THREE HIERARCHY MODELS                                ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ModelDiagramBox({ label, sublabel, color, icon, width = 'auto', dashed = false, t }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 10,
      background: `${color}10`,
      border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}30`,
      width,
    }}>
      {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
        {sublabel && <div style={{ fontSize: 10, color: t.textFaint }}>{sublabel}</div>}
      </div>
    </div>
  );
}

function ProConList({ pros, cons, t }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accentGreen, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Pros
        </div>
        {pros.map((p, i) => (
          <div key={i} style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7, paddingLeft: 12, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: t.accentGreen }}>+</span>
            {p}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: STATIC.coral, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Cons
        </div>
        {cons.map((c, i) => (
          <div key={i} style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7, paddingLeft: 12, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: STATIC.coral }}>-</span>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelADiagram({ t }) {
  const B2B_COLOR = t.accentGreen;
  const B2C_COLOR = t.accentGold;
  return (
    <div style={{ padding: '20px 0' }}>
      {/* Root */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <ModelDiagramBox label="Dutchie AI" sublabel="Parent Brand" color={t.textFaint}
          icon={<span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>D</span>} t={t} />
      </div>
      {/* Connector */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ width: 2, height: 20, background: `${t.textFaint}40` }} />
      </div>
      {/* Two suites side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* B2B */}
        <div style={{
          padding: 16, borderRadius: 12,
          background: `${B2B_COLOR}06`,
          border: `1px solid ${B2B_COLOR}20`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: B2B_COLOR, marginBottom: 12, textAlign: 'center' }}>B2B AI Suite</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ModelDiagramBox label="Connect" sublabel="Marketplace" color={B2B_COLOR}
              icon={<ConnectIcon size={16} accentGreen={t.accentGreen} />} width="100%" t={t} />
            <ModelDiagramBox label="Brand Analytics" sublabel="Insights" color={B2B_COLOR}
              icon={<AnalyticsIcon size={16} color={B2B_COLOR} />} width="100%" dashed t={t} />
            <ModelDiagramBox label="Supply Chain AI" sublabel="Optimization" color={B2B_COLOR}
              icon={<PlaceholderIcon size={16} label="S" color={B2B_COLOR} />} width="100%" dashed t={t} />
          </div>
        </div>
        {/* B2C */}
        <div style={{
          padding: 16, borderRadius: 12,
          background: `${B2C_COLOR}06`,
          border: `1px solid ${B2C_COLOR}20`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: B2C_COLOR, marginBottom: 12, textAlign: 'center' }}>B2C AI Suite</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ModelDiagramBox label="Nexus" sublabel="Retail Command Center" color={B2C_COLOR}
              icon={<NexusIcon size={16} />} width="100%" t={t} />
            <ModelDiagramBox label="Dex" sublabel="AI Agent" color={B2C_COLOR}
              icon={<DexSpiral size={16} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />} width="100%" t={t} />
            <ModelDiagramBox label="POS Intelligence" sublabel="Customer Engagement" color={B2C_COLOR}
              icon={<ConsumerIcon size={16} color={B2C_COLOR} />} width="100%" dashed t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelBDiagram({ t }) {
  const layers = [
    { label: 'Platform Layer', sublabel: 'The surface users see', product: 'Nexus', color: t.accentGold, icon: <NexusIcon size={16} />, description: 'Dashboards, alerts, workflow UI' },
    { label: 'Intelligence Layer', sublabel: 'The AI brain', product: 'Dex', color: t.accentGoldLight, icon: <DexSpiral size={16} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />, description: 'Reasoning, predictions, NLP' },
    { label: 'Network Layer', sublabel: 'The data/commerce mesh', product: 'Connect', color: t.accentGreen, icon: <ConnectIcon size={16} accentGreen={t.accentGreen} />, description: 'B2B marketplace, matching, pricing' },
  ];

  return (
    <div style={{ padding: '20px 0' }}>
      {layers.map((layer, i) => (
        <div key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '14px 18px', borderRadius: 12,
            background: `${layer.color}08`,
            border: `1px solid ${layer.color}20`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${layer.color}15`, border: `1px solid ${layer.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {layer.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{layer.label}</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>{layer.sublabel}</div>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 8,
              background: `${layer.color}15`, border: `1px solid ${layer.color}25`,
              fontSize: 12, fontWeight: 600, color: layer.color,
            }}>
              {layer.product}
            </div>
          </div>
          {i < layers.length - 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke={t.textFaint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </div>
          )}
        </div>
      ))}
      <div style={{
        marginTop: 12, textAlign: 'center', fontSize: 11, color: t.textFaint, fontStyle: 'italic',
      }}>
        Data flows up through layers; intelligence enriches each level
      </div>
    </div>
  );
}

function ModelCDiagram({ t }) {
  const personas = [
    {
      label: 'For Retailers',
      tagline: 'Run your store smarter',
      color: t.accentGold,
      products: [
        { name: 'Nexus', icon: <NexusIcon size={14} /> },
        { name: 'Dex', icon: <DexSpiral size={14} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} /> },
      ],
    },
    {
      label: 'For Brands',
      tagline: 'Grow your distribution',
      color: t.accentGreen,
      products: [
        { name: 'Connect', icon: <ConnectIcon size={14} accentGreen={t.accentGreen} /> },
        { name: 'Brand Tools', icon: <AnalyticsIcon size={14} color={t.accentGreen} /> },
      ],
    },
    {
      label: 'For Consumers',
      tagline: 'Discover and enjoy',
      color: STATIC.blue,
      products: [
        { name: 'Loyalty', icon: <PlaceholderIcon size={14} label="L" color={STATIC.blue} /> },
        { name: 'Recommendations', icon: <PlaceholderIcon size={14} label="R" color={STATIC.blue} /> },
      ],
    },
  ];

  return (
    <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {personas.map((p, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '14px 18px', borderRadius: 12,
          background: `${p.color}06`,
          border: `1px solid ${p.color}18`,
          flexWrap: 'wrap',
        }}>
          <div style={{ minWidth: 140 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.label}</div>
            <div style={{ fontSize: 11, color: t.textFaint, fontStyle: 'italic' }}>{p.tagline}</div>
          </div>
          <div style={{
            width: 1, height: 32, background: `${p.color}25`, flexShrink: 0,
          }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.products.map((prod, j) => (
              <div key={j} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 8,
                background: `${p.color}12`, border: `1px solid ${p.color}22`,
              }}>
                {prod.icon}
                <span style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{prod.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Cross-cutting note */}
      <div style={{
        marginTop: 8, padding: '10px 14px', borderRadius: 10,
        background: `${t.accentGoldLight}0A`, border: `1px dashed ${t.accentGoldLight}26`,
        fontSize: 12, color: t.textFaint, textAlign: 'center',
      }}>
        Note: Dex spans Retailers + Brands (appears in multiple persona groups)
      </div>
    </div>
  );
}

function ThreeModelsSection({ t }) {
  const models = [
    {
      id: 'A',
      title: 'Suite-Based',
      subtitle: 'B2B vs B2C',
      color: t.accentGreen,
      badge: 'Recommended',
      diagram: <ModelADiagram t={t} />,
      pros: [
        'Clear market segmentation for sales teams',
        'Natural expansion paths for new products',
        'Distinct pricing and packaging per suite',
      ],
      cons: [
        'Dex spans both suites (dual positioning)',
        'May confuse existing customers during transition',
      ],
    },
    {
      id: 'B',
      title: 'Layer-Based',
      subtitle: 'Platform / Intelligence / Network',
      color: t.accentGold,
      badge: null,
      diagram: <ModelBDiagram t={t} />,
      pros: [
        'Clean technical separation of concerns',
        'Highlights Dex as the core intelligence',
        'Mirrors actual system architecture',
      ],
      cons: [
        'Too abstract for marketing messaging',
        'Customers think in outcomes, not layers',
      ],
    },
    {
      id: 'C',
      title: 'Persona-Based',
      subtitle: 'Who uses it?',
      color: STATIC.blue,
      badge: null,
      diagram: <ModelCDiagram t={t} />,
      pros: [
        'Customer-centric messaging and positioning',
        'Easy for sales to pitch per-persona bundles',
        'Resonates with "jobs to be done" framework',
      ],
      cons: [
        'Products appear in multiple groups',
        'Internal confusion around ownership',
        'Harder to price when products cross personas',
      ],
    },
  ];

  return (
    <div>
      <div style={labelStyle(t)}>Section 2</div>
      <h2 style={sectionTitleStyle(t)}>Three Hierarchy Models</h2>
      <p style={sectionSubStyle(t)}>
        Three distinct frameworks for organizing the Dutchie AI product family. Each optimizes for a different dimension: market, architecture, or customer.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {models.map((m) => (
          <div key={m.id} style={cardStyle(t, { position: 'relative', overflow: 'hidden' })}>
            {/* Accent line at top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${m.color}, transparent)`,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${m.color}12`, border: `1px solid ${m.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 800, color: m.color,
              }}>
                {m.id}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{m.title}</div>
                <div style={{ fontSize: 12, color: t.textFaint }}>{m.subtitle}</div>
              </div>
              {m.badge && (
                <div style={{
                  marginLeft: 'auto',
                  padding: '4px 12px', borderRadius: 8,
                  background: `${m.color}12`, border: `1px solid ${m.color}25`,
                  fontSize: 11, fontWeight: 700, color: m.color,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {m.badge}
                </div>
              )}
            </div>

            {m.diagram}

            <div style={{ height: 1, background: `${t.border}`, margin: '8px 0 12px' }} />
            <ProConList pros={m.pros} cons={m.cons} t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 3: PRODUCT POSITIONING MATRIX                            ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function PositioningMatrixSection({ t }) {
  const products = [
    {
      name: 'Nexus',
      icon: <NexusIcon size={20} />,
      color: t.accentGold,
      audience: 'Dispensary operators & managers',
      valueProp: '"Your AI command center for cannabis retail"',
      aiRole: 'Predictive analytics, smart alerts, inventory optimization',
      revenueModel: 'SaaS subscription (monthly/annual)',
      stage: 'Growth',
      stageColor: t.accentGreen,
    },
    {
      name: 'Dex',
      icon: <DexSpiral size={20} gradientColors={[t.accentGold, t.accentGoldLight, t.accentGoldLighter]} />,
      color: t.accentGoldLight,
      audience: 'All internal users (operators, budtenders, brands)',
      valueProp: '"Ask anything about your business"',
      aiRole: 'Conversational AI, multi-step reasoning, data synthesis',
      revenueModel: 'Usage-based (queries/month) or add-on',
      stage: 'Early',
      stageColor: t.accentGold,
    },
    {
      name: 'Connect',
      icon: <ConnectIcon size={20} accentGreen={t.accentGreen} />,
      color: t.accentGreen,
      audience: 'Brands + Retailers (two-sided)',
      valueProp: '"The cannabis B2B marketplace"',
      aiRole: 'Matching algorithms, pricing optimization, demand forecasting',
      revenueModel: 'Transaction fee + premium listings',
      stage: 'Mature',
      stageColor: STATIC.blue,
    },
  ];

  const columns = [
    { key: 'audience', label: 'Primary Audience', width: '18%' },
    { key: 'valueProp', label: 'Value Proposition', width: '20%' },
    { key: 'aiRole', label: 'AI Role', width: '22%' },
    { key: 'revenueModel', label: 'Revenue Model', width: '18%' },
    { key: 'stage', label: 'Growth Stage', width: '10%' },
  ];

  return (
    <div>
      <div style={labelStyle(t)}>Section 3</div>
      <h2 style={sectionTitleStyle(t)}>Product Positioning Matrix</h2>
      <p style={sectionSubStyle(t)}>
        Each product mapped across the key dimensions that drive marketing strategy, sales enablement, and investor narrative.
      </p>

      {/* Desktop table view */}
      <div style={{
        ...cardStyle(t, { padding: 0, overflow: 'hidden' }),
      }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '12% 18% 20% 22% 18% 10%',
          padding: '14px 24px',
          background: t.cardBg,
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Product
          </div>
          {columns.map((col) => (
            <div key={col.key} style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {col.label}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {products.map((p, i) => (
          <div key={p.name} style={{
            display: 'grid',
            gridTemplateColumns: '12% 18% 20% 22% 18% 10%',
            padding: '18px 24px',
            borderBottom: i < products.length - 1 ? `1px solid ${t.border}` : 'none',
            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
            alignItems: 'center',
          }}>
            {/* Product name with icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${p.color}12`, border: `1px solid ${p.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {p.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{p.name}</span>
            </div>
            {/* Audience */}
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5, paddingRight: 12 }}>
              {p.audience}
            </div>
            {/* Value Prop */}
            <div style={{ fontSize: 13, color: p.color, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.5, paddingRight: 12 }}>
              {p.valueProp}
            </div>
            {/* AI Role */}
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5, paddingRight: 12 }}>
              {p.aiRole}
            </div>
            {/* Revenue Model */}
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5, paddingRight: 12 }}>
              {p.revenueModel}
            </div>
            {/* Stage */}
            <div>
              <span style={tagStyle(p.stageColor)}>{p.stage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-friendly card fallback */}
      <div style={{ display: 'none' }}>
        {/* Future: responsive cards for narrow viewports */}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 4: SUITE NAMING EXPLORATIONS                             ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function SuiteNamingSection({ t }) {
  const B2B_COLOR = t.accentGreen;
  const B2C_COLOR = t.accentGold;
  const options = [
    {
      id: 1,
      retail: 'Dutchie AI for Retail',
      brand: 'Dutchie AI for Brands',
      approach: 'Audience-based',
      description: 'Leverages the parent brand. Clear, descriptive. Works well for search and sales collateral.',
      retailColor: B2C_COLOR,
      brandColor: B2B_COLOR,
      rating: 'Safe',
      ratingColor: STATIC.blue,
    },
    {
      id: 2,
      retail: 'Nexus Suite',
      brand: 'Connect Suite',
      approach: 'Flagship-anchored',
      description: 'Anchors each suite on the most recognizable product. Builds brand equity in existing names.',
      retailColor: B2C_COLOR,
      brandColor: B2B_COLOR,
      rating: 'Strong',
      ratingColor: t.accentGreen,
    },
    {
      id: 3,
      retail: 'Dutchie Intelligence',
      brand: 'Dutchie Commerce',
      approach: 'Capability-based',
      description: 'Describes what each suite does rather than who it serves. Premium feel. May feel generic.',
      retailColor: B2C_COLOR,
      brandColor: B2B_COLOR,
      rating: 'Bold',
      ratingColor: t.accentGold,
    },
    {
      id: 4,
      retail: 'Dutchie Pro',
      brand: 'Dutchie Enterprise',
      approach: 'Tier-based',
      description: 'Positions as maturity levels rather than market segments. Implies upgrade path. Could confuse B2B vs B2C.',
      retailColor: B2C_COLOR,
      brandColor: B2B_COLOR,
      rating: 'Risky',
      ratingColor: STATIC.coral,
    },
  ];

  return (
    <div>
      <div style={labelStyle(t)}>Section 4</div>
      <h2 style={sectionTitleStyle(t)}>Suite Naming Explorations</h2>
      <p style={sectionSubStyle(t)}>
        If we adopt a suite-based model, the naming convention signals positioning, audience, and brand architecture. Four strategic directions, each with distinct tradeoffs.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {options.map((opt) => (
          <div key={opt.id} style={cardStyle(t, { position: 'relative' })}>
            {/* Option number */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              width: 28, height: 28, borderRadius: '50%',
              background: `${t.textFaint}15`, border: `1px solid ${t.textFaint}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: t.textFaint,
            }}>
              {opt.id}
            </div>

            {/* Approach tag */}
            <div style={{
              ...tagStyle(opt.ratingColor),
              marginBottom: 16,
            }}>
              {opt.approach} - {opt.rating}
            </div>

            {/* Suite lockups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {/* Retail suite */}
              <div style={{
                padding: '12px 18px', borderRadius: 10,
                background: `${opt.retailColor}08`,
                border: `1px solid ${opt.retailColor}20`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <NexusIcon size={18} />
                <span style={{
                  fontSize: 17, fontWeight: 600, color: t.text,
                  letterSpacing: '-0.01em',
                }}>
                  {opt.retail}
                </span>
              </div>

              {/* Brand suite */}
              <div style={{
                padding: '12px 18px', borderRadius: 10,
                background: `${opt.brandColor}08`,
                border: `1px solid ${opt.brandColor}20`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <ConnectIcon size={18} accentGreen={t.accentGreen} />
                <span style={{
                  fontSize: 17, fontWeight: 600, color: t.text,
                  letterSpacing: '-0.01em',
                }}>
                  {opt.brand}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7, margin: 0 }}>
              {opt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 5: REVENUE & GTM IMPLICATIONS                           ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FlowStep({ label, sublabel, color, isArrow = false, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <div style={{
        padding: '10px 16px', borderRadius: 10,
        background: `${color}10`, border: `1.5px solid ${color}25`,
        minWidth: 100, textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
        {sublabel && <div style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{sublabel}</div>}
      </div>
      {isArrow && (
        <svg width="32" height="16" viewBox="0 0 32 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M2 8 H26 M22 4 L26 8 L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      )}
    </div>
  );
}

function GTMSection({ t }) {
  const B2B_COLOR = t.accentGreen;
  const B2C_COLOR = t.accentGold;
  return (
    <div>
      <div style={labelStyle(t)}>Section 5</div>
      <h2 style={sectionTitleStyle(t)}>Revenue & GTM Implications</h2>
      <p style={sectionSubStyle(t)}>
        Each organizational model drives a fundamentally different go-to-market motion, sales team structure, and expansion playbook.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* GTM Model: Suite-Based */}
        <div style={cardStyle(t, { position: 'relative', overflow: 'hidden' })}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${B2B_COLOR}, ${B2C_COLOR})`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={tagStyle(t.accentGreen)}>Model A</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Suite-Based GTM</span>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7, marginBottom: 20 }}>
            Land with one suite, expand to the other. Two separate sales motions, unified by the Dutchie AI umbrella.
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
            padding: '16px 20px', borderRadius: 12,
            background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.border}`,
          }}>
            <FlowStep label="Land B2C Suite" sublabel="Nexus + Dex" color={B2C_COLOR} isArrow t={t} />
            <FlowStep label="Prove ROI" sublabel="3-6 months" color={t.textMuted} isArrow t={t} />
            <FlowStep label="Expand B2B" sublabel="Connect upsell" color={B2B_COLOR} isArrow t={t} />
            <FlowStep label="Full Platform" sublabel="Both suites" color={t.accentGold} t={t} />
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>SALES TEAM</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Two specialized teams: Retail Sales + Brand Partnerships</div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>EXPANSION TRIGGER</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Cross-sell when retailer asks about brand ordering, or brand asks about retail insights</div>
            </div>
          </div>
        </div>

        {/* GTM Model: Layer-Based */}
        <div style={cardStyle(t, { position: 'relative', overflow: 'hidden' })}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${t.accentGold}, ${t.accentGreen})`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={tagStyle(t.accentGold)}>Model B</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Layer-Based GTM</span>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7, marginBottom: 20 }}>
            Sell the visible platform first, then upsell AI intelligence, then unlock network effects.
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
            padding: '16px 20px', borderRadius: 12,
            background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.border}`,
          }}>
            <FlowStep label="Nexus" sublabel="Platform entry" color={t.accentGold} isArrow t={t} />
            <FlowStep label="+ Dex" sublabel="AI upsell" color={t.accentGoldLight} isArrow t={t} />
            <FlowStep label="+ Connect" sublabel="Network effect" color={t.accentGreen} isArrow t={t} />
            <FlowStep label="Lock-in" sublabel="Full stack" color={STATIC.blue} t={t} />
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>SALES TEAM</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Single team, progressive selling. Customer success drives upsell.</div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>EXPANSION TRIGGER</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Usage-based: power users hit query limits, unlock Dex. Active retailers join Connect.</div>
            </div>
          </div>
        </div>

        {/* GTM Model: Persona-Based */}
        <div style={cardStyle(t, { position: 'relative', overflow: 'hidden' })}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${STATIC.blue}, ${t.accentGold}, ${t.accentGreen})`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={tagStyle(STATIC.blue)}>Model C</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Persona-Based GTM</span>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7, marginBottom: 20 }}>
            Segment sales teams by buyer persona. Each persona gets a tailored bundle and narrative.
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12,
            padding: '16px 20px', borderRadius: 12,
            background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.border}`,
          }}>
            {[
              { persona: 'Retailer', products: 'Nexus + Dex', color: t.accentGold, motion: 'Inbound + outbound sales' },
              { persona: 'Brand', products: 'Connect + Analytics', color: t.accentGreen, motion: 'Partner development' },
              { persona: 'Consumer', products: 'Loyalty + Recs', color: STATIC.blue, motion: 'Product-led growth' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: 10,
                background: `${p.color}08`, border: `1px solid ${p.color}18`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.persona}</div>
                <div style={{ fontSize: 12, color: t.text, fontWeight: 500, marginBottom: 6 }}>{p.products}</div>
                <div style={{ fontSize: 11, color: t.textFaint }}>{p.motion}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>SALES TEAM</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Three pods: Retail AEs, Brand Partnership Managers, Growth/PLG team</div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textFaint, marginBottom: 4 }}>EXPANSION TRIGGER</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>Organic: retailers refer brands, brands request retail data, consumers drive adoption</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  SECTION 6: COMPETITIVE POSITIONING MAP                           ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function CompetitiveMapSection({ t }) {
  const canvasRef = useRef(null);
  const uid = useId();

  const competitors = [
    { name: 'Dutchie AI', x: 0.82, y: 0.85, color: t.accentGold, size: 12, glow: true },
    { name: 'Leafly', x: 0.70, y: 0.28, color: '#78B858', size: 8, glow: false },
    { name: 'Treez', x: 0.40, y: 0.55, color: '#8BB4D9', size: 7, glow: false },
    { name: 'Flowhub', x: 0.25, y: 0.30, color: '#C78FD6', size: 7, glow: false },
    { name: 'Generic ERP', x: 0.65, y: 0.15, color: t.textFaint, size: 6, glow: false },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 600, H = 400;
    const PAD = 60;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = t.cardBg;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = PAD + (i / 4) * (W - 2 * PAD);
      const y = PAD + (i / 4) * (H - 2 * PAD);
      ctx.beginPath(); ctx.moveTo(x, PAD); ctx.lineTo(x, H - PAD); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    // X axis
    ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();
    // Y axis
    ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(PAD, PAD); ctx.stroke();

    // Axis arrows
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    // X arrow
    ctx.beginPath();
    ctx.moveTo(W - PAD, H - PAD);
    ctx.lineTo(W - PAD - 8, H - PAD - 4);
    ctx.lineTo(W - PAD - 8, H - PAD + 4);
    ctx.fill();
    // Y arrow
    ctx.beginPath();
    ctx.moveTo(PAD, PAD);
    ctx.lineTo(PAD - 4, PAD + 8);
    ctx.lineTo(PAD + 4, PAD + 8);
    ctx.fill();

    // Axis labels
    ctx.font = "600 11px 'DM Sans', sans-serif";
    ctx.fillStyle = t.textFaint;
    ctx.textAlign = 'center';
    ctx.fillText('Market Breadth', W / 2, H - 16);

    // Y axis label (rotated)
    ctx.save();
    ctx.translate(16, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('AI Sophistication', 0, 0);
    ctx.restore();

    // Low/High labels
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.fillStyle = `${t.textFaint}99`;
    ctx.textAlign = 'left';
    ctx.fillText('Narrow', PAD + 4, H - PAD + 18);
    ctx.textAlign = 'right';
    ctx.fillText('Wide', W - PAD - 4, H - PAD + 18);
    ctx.textAlign = 'left';
    ctx.fillText('Low', PAD - 4, H - PAD - 8);
    ctx.fillText('High', PAD - 4, PAD + 16);

    // Quadrant labels
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.fillStyle = `${t.textFaint}4D`;
    ctx.textAlign = 'center';
    const qW = (W - 2 * PAD) / 2;
    const qH = (H - 2 * PAD) / 2;
    ctx.fillText('Niche Basic', PAD + qW / 2, PAD + qH / 2 + qH);
    ctx.fillText('Broad Basic', PAD + qW + qW / 2, PAD + qH / 2 + qH);
    ctx.fillText('Niche AI', PAD + qW / 2, PAD + qH / 2);
    ctx.fillText('AI Platform Leader', PAD + qW + qW / 2, PAD + qH / 2);

    // Plot competitors
    competitors.forEach((c) => {
      const px = PAD + c.x * (W - 2 * PAD);
      const py = H - PAD - c.y * (H - 2 * PAD);

      // Glow for Dutchie
      if (c.glow) {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 30);
        grad.addColorStop(0, `${t.accentGold}40`);
        grad.addColorStop(1, `${t.accentGold}00`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dot
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(px, py, c.size, 0, Math.PI * 2);
      ctx.fill();

      // Ring for Dutchie
      if (c.glow) {
        ctx.strokeStyle = `${t.accentGold}66`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, c.size + 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Label
      ctx.font = c.glow ? "700 13px 'DM Sans', sans-serif" : "500 11px 'DM Sans', sans-serif";
      ctx.fillStyle = c.glow ? t.text : t.textMuted;
      ctx.textAlign = 'center';
      ctx.fillText(c.name, px, py - c.size - 8);
    });

  }, [t]);

  return (
    <div>
      <div style={labelStyle(t)}>Section 6</div>
      <h2 style={sectionTitleStyle(t)}>Competitive Positioning Map</h2>
      <p style={sectionSubStyle(t)}>
        Dutchie AI occupies the "AI Platform Leader" quadrant -- high AI sophistication across a wide market. Competitors cluster in lower-left: narrow focus, limited AI capabilities.
      </p>

      <div style={cardStyle(t, { padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%', maxWidth: 600, height: 400,
            borderRadius: 12,
            border: `1px solid ${t.border}`,
          }}
        />

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center',
          marginTop: 20, padding: '12px 20px', borderRadius: 10,
          background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.border}`,
        }}>
          {competitors.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: c.color,
                boxShadow: c.glow ? `0 0 8px ${c.color}60` : 'none',
              }} />
              <span style={{ fontSize: 12, color: c.glow ? t.text : t.textMuted, fontWeight: c.glow ? 600 : 400 }}>
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive insight cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16, marginTop: 24,
      }}>
        {[
          {
            title: 'Dutchie AI',
            insight: 'Only player with conversational AI (Dex), predictive analytics (Nexus), AND a B2B marketplace (Connect) in cannabis.',
            color: t.accentGold,
          },
          {
            title: 'Leafly',
            insight: 'Broad consumer reach but minimal AI. A discovery platform, not a business intelligence tool.',
            color: '#78B858',
          },
          {
            title: 'Treez / Flowhub',
            insight: 'POS-focused with some analytics. Narrow product scope, limited AI integration. Vulnerable to Nexus expansion.',
            color: '#8BB4D9',
          },
        ].map((c) => (
          <div key={c.title} style={cardStyle(t, { padding: 20 })}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.color, marginBottom: 8 }}>{c.title}</div>
            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.7, margin: 0 }}>{c.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══  MAIN EXPORT                                                      ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

export function ProductHierarchySection({ theme = 'dark' }) {
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

  // Load DM Sans font
  useEffect(() => {
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{
      background: t.bg,
      color: t.text,
      fontFamily: STATIC.font,
      minHeight: '100vh',
      padding: '0 0 80px',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 960, margin: '0 auto', padding: '60px 32px 0',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 10,
            background: `${t.accentGold}14`,
            border: `1px solid ${t.accentGold}26`,
          }}>
            <NexusIcon size={18} />
            <span style={{ fontSize: 13, fontWeight: 600, color: t.accentGold }}>Dutchie AI</span>
          </div>
          <span style={{ fontSize: 12, color: t.textFaint }}>Product Marketing</span>
        </div>

        <h1 style={{
          fontSize: 42, fontWeight: 800, color: t.text,
          letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: 12,
        }}>
          Product Hierarchy<br />
          <span style={{
            background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGreen})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Exploration
          </span>
        </h1>

        <p style={{
          fontSize: 16, color: t.textMuted, lineHeight: 1.7,
          maxWidth: 640, marginBottom: 8,
        }}>
          How should Nexus, Dex, and Connect be organized as Dutchie's AI product family grows?
          This document explores three structural models, naming strategies, GTM implications,
          and competitive positioning.
        </p>

        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20, marginBottom: 16,
        }}>
          {['B2C AI Suite', 'B2B AI Suite', 'Hierarchy Models', 'Naming', 'GTM', 'Competitive'].map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${t.border}`,
              fontSize: 11, color: t.textFaint, fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Thin divider */}
        <div style={dividerStyle(t)} />

        {/* Section 1 */}
        <CurrentVsProposedSection t={t} />

        <div style={dividerStyle(t)} />

        {/* Section 2 */}
        <ThreeModelsSection t={t} />

        <div style={dividerStyle(t)} />

        {/* Section 3 */}
        <PositioningMatrixSection t={t} />

        <div style={dividerStyle(t)} />

        {/* Section 4 */}
        <SuiteNamingSection t={t} />

        <div style={dividerStyle(t)} />

        {/* Section 5 */}
        <GTMSection t={t} />

        <div style={dividerStyle(t)} />

        {/* Section 6 */}
        <CompetitiveMapSection t={t} />

        {/* Footer */}
        <div style={{
          marginTop: 80, padding: '32px 0',
          borderTop: `1px solid ${t.border}`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, color: t.textFaint, marginBottom: 8 }}>
            Dutchie AI -- Product Marketing -- Hierarchy Exploration
          </div>
          <div style={{ fontSize: 11, color: `${t.textFaint}80` }}>
            Internal document. March 2026.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHierarchySection;
