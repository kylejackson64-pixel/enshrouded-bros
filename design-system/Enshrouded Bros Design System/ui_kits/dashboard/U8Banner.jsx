function U8Banner() {
  return (
    <section style={{
      position: 'relative',
      margin: '0 0 2rem',
      padding: '1.3rem 1.5rem',
      borderRadius: 8,
      background: 'linear-gradient(135deg, rgba(232,97,42,.12) 0%, rgba(192,57,43,.1) 100%)',
      border: '1px solid rgba(232,97,42,.4)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, #e8612a, #d4a84b, #e8612a)',
      }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
        <span style={EB.chip('232,97,42', '#ff8c42')}>⚒ U8</span>
        <div style={{
          fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem',
          letterSpacing: '.1em', color: 'var(--gold-light)',
        }}>Update 8 — Forging the Path</div>
        <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '.85rem', color: 'var(--text-dim)' }}>
          drops in 2d 4h · SOON
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <U8Card title="🛡️ Gear & Armor">All skill points refunded on patch day — rebuild your trees before heading out.</U8Card>
        <U8Card title="🌟 Skill Tree">Gear stats recalculated (smaller numbers ≠ nerf).</U8Card>
        <U8Card title="🌐 Adventure Share">Co-op saves now auto-sync between bros. Host no longer required.</U8Card>
      </div>
    </section>
  );
}

function U8Card({ title, children }) {
  return (
    <div style={{
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      padding: '12px 14px',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '.72rem',
        letterSpacing: '.12em', textTransform: 'uppercase',
        color: 'var(--gold-light)', marginBottom: 6,
      }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.5 }}>
        ▸ {children}
      </div>
    </div>
  );
}

window.U8Banner = U8Banner;
