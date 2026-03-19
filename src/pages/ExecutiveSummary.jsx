const themes = {
  dark: { bg: '#0A0908', cardBg: '#141210', border: '#282724', text: '#F0EDE8', textMuted: '#ADA599', textFaint: '#6B6359', accentGold: '#D4A03A', accentGoldLight: '#FFC02A', accentGoldLighter: '#FFD666', accentGreen: '#00C27C' },
  light: { bg: '#F5F4F2', cardBg: '#FAFAF9', border: '#E8E5E0', text: '#1C1917', textMuted: '#57534E', textFaint: '#A8A29E', accentGold: '#A17A1A', accentGoldLight: '#C49A2A', accentGoldLighter: '#D4A03A', accentGreen: '#047857' }
};

function RecCard({ title, question, answer, detail, children, t }) {
  return (
    <div style={{
      background: t.cardBg, borderRadius: 14, padding: '28px 32px',
      borderLeft: `4px solid ${t.accentGold}`, border: `1px solid ${t.border}`,
      borderLeftWidth: 4, borderLeftColor: t.accentGold,
      marginBottom: 20,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: t.textMuted, marginBottom: 10 }}>{question}</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: t.text, marginBottom: 10, lineHeight: 1.3 }}>{answer}</div>
      <div style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7 }}>{detail}</div>
      {children}
    </div>
  );
}

export function ExecutiveSummary({ theme = 'dark' }) {
  const t = themes[theme];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accentGold, marginBottom: 12 }}>
          EXECUTIVE SUMMARY
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 300, color: t.text, marginBottom: 12, letterSpacing: '-0.01em' }}>
          Top-Line Recommendations
        </h2>
        <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
          Five key decisions from the full brand study below. Each links to detailed analysis further down the page.
        </p>
      </div>

      {/* Rec 1: Product Suite */}
      <RecCard
        t={t}
        title="Product Hierarchy"
        question="How should Dutchie structure its AI product suite?"
        answer="Hybrid Copilot + Ecosystem — distinct named products under the Dutchie umbrella"
        detail="Keep Dutchie as the trusted parent brand. Launch AI products with their own character and names, each serving a clear role. The 'endorsed brand' model (like Courtyard by Marriott) gives each product room to breathe while Dutchie provides trust."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
          {[
            { name: 'Dex', role: 'AI Agent', accent: t.accentGold },
            { name: 'Nexus', role: 'Platform', accent: t.accentGoldLight },
            { name: 'Connect', role: 'B2B Marketplace', accent: t.accentGreen },
            { name: 'Bloom', role: 'Consumer', accent: '#A78BFA' },
          ].map((p, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '14px 8px', background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: 10, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: p.accent, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: t.textFaint }}>{p.role}</div>
            </div>
          ))}
        </div>
      </RecCard>

      {/* Rec 2: Agent Name */}
      <RecCard
        t={t}
        title="The Agent Name"
        question="What should the AI assistant be called — the one people actually talk to?"
        answer='Dex — 87% confidence'
        detail='Short, sounds human-ish but not obviously a name. Natural in conversation. Implies dexterity and skill. Strong phonetics, memorable, works in both chat and voice.'
      >
        <div style={{ marginTop: 16, padding: '16px 20px', background: theme === 'dark' ? 'rgba(212,160,58,0.06)' : 'rgba(161,122,26,0.06)', borderRadius: 12, border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${t.accentGold}, ${t.accentGoldLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#0A0908', flexShrink: 0 }}>D</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.accentGold, marginBottom: 4 }}>Dex</div>
              <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5 }}>
                Based on yesterday's sales, Blue Dream is your top performer — up 23% this week. You're running low though, want me to flag a reorder?
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: t.textFaint }}>Runner-up: <strong style={{ color: t.textMuted }}>Sage</strong> — wise, herb-adjacent, more contemplative personality</div>
      </RecCard>

      {/* Rec 3: One Dex or Two */}
      <RecCard
        t={t}
        title="B2C + B2B Agent"
        question="Should the retail agent and the B2B agent have the same name?"
        answer="One Dex — same name, different interfaces"
        detail='Most users only see one side. A budtender never manages wholesale orders. A brand rep never works the counter. The "Dex knows the whole market" positioning is powerful — it sees supply AND demand.'
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          <div style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${t.border}`, background: theme === 'dark' ? 'rgba(212,160,58,0.04)' : 'rgba(161,122,26,0.04)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.accentGold, marginBottom: 4 }}>Dex in Retail</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>Gold accent, chat-first, casual voice</div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${t.border}`, background: theme === 'dark' ? 'rgba(0,194,124,0.04)' : 'rgba(4,120,87,0.04)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.accentGreen, marginBottom: 4 }}>Dex in B2B</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>Green accent, dashboard-first, professional voice</div>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: t.textFaint }}>Fallback if trust becomes an issue: split to <strong style={{ color: t.textMuted }}>Dex</strong> (retail) + <strong style={{ color: t.textMuted }}>Quinn</strong> (B2B)</div>
      </RecCard>

      {/* Rec 4: Visual Direction */}
      <RecCard
        t={t}
        title="Visual Direction"
        question="What aesthetic direction for the brand system?"
        answer="Minimal Line — Swiss-inspired, premium, clean"
        detail="Thin strokes, geometric precision, gold gradient as signature. Stands out in cannabis tech (most competitors look either too corporate or too stoner). Professional enough for enterprise, distinct enough to remember."
      >
        <div style={{ marginTop: 12, fontSize: 12, color: t.textFaint }}>See the <strong style={{ color: t.textMuted }}>Styles</strong> section for 6 alternative visual directions with full logo explorations</div>
      </RecCard>

      {/* Rec 5: Light Mode */}
      <RecCard
        t={t}
        title="Light Mode"
        question="How do brand colors work on light backgrounds?"
        answer="Gold accents darken for contrast. Warm off-white (#F5F4F2) background, not pure white."
        detail="Logos are the constants — they work on any surface. Cards get subtle shadows on light. The brand feels premium in both modes. Toggle the sun/moon button in the nav to preview."
      />

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 48, padding: '24px 0', borderTop: `1px solid ${t.border}` }}>
        <p style={{ fontSize: 13, color: t.textFaint, lineHeight: 1.6 }}>
          Scroll down to explore the full analysis, alternative options, and detailed rationale for each recommendation.
        </p>
      </div>
    </div>
  );
}

export default ExecutiveSummary;
