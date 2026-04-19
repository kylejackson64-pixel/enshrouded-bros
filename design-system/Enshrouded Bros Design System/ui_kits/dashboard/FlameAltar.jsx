function FlameAltar() {
  const nodes = [
    { lv: 1, name: 'Spark', state: 'done' },
    { lv: 2, name: 'Kindle', state: 'done' },
    { lv: 3, name: 'Blaze', state: 'current' },
    { lv: 4, name: 'Inferno', state: 'locked' },
    { lv: 5, name: 'Pyre', state: 'locked' },
  ];
  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionTitle icon="🔥">Flame Altar Progression</SectionTitle>

      <div style={{
        ...EB.panel,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, #9c3a12, #ff8c42, #d4a84b)',
        }} />

        {/* progress header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={EB.eyebrow}>Altar Level 3 · Blaze</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#ff8c42', fontSize: '.9rem' }}>71%</div>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,.07)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: '71%', borderRadius: 4,
            background: 'linear-gradient(90deg, #9c3a12, #ff8c42)',
            transition: 'width .6s cubic-bezier(.34,1.56,.64,1)',
          }} />
        </div>

        {/* node track */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 18, left: 24, right: 24, height: 1,
            background: 'linear-gradient(90deg, var(--ember) 45%, rgba(212,168,75,.2) 45%)',
          }} />
          {nodes.map(n => <AltarNode key={n.lv} {...n} />)}
        </div>

        {/* objectives */}
        <div style={{
          marginTop: 24,
          borderTop: '1px solid var(--border)',
          paddingTop: 16,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}>
          <Obj done>Defeat Fell Sicklescythe</Obj>
          <Obj done>Unlock Veilwater</Obj>
          <Obj>Rescue the Blacksmith</Obj>
          <Obj>Forge Iron Bar ×3</Obj>
        </div>
      </div>
    </section>
  );
}

function AltarNode({ lv, name, state }) {
  const styleMap = {
    done:    { bg: '#9c3a12', border: '#ff8c42', color: '#ff8c42' },
    current: { bg: 'rgba(232,97,42,.25)', border: '#ff8c42', color: '#f0c96a',
               shadow: '0 0 12px rgba(232,97,42,.6)' },
    locked:  { bg: 'var(--panel)', border: 'rgba(212,168,75,.2)', color: 'var(--text-dim)' },
  }[state];
  return (
    <div style={{ textAlign: 'center', zIndex: 1 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '.85rem',
        margin: '0 auto 6px',
        background: styleMap.bg, border: `2px solid ${styleMap.border}`,
        color: styleMap.color, boxShadow: styleMap.shadow || 'none',
      }}>{lv}</div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: '.6rem',
        letterSpacing: '.14em', textTransform: 'uppercase',
        color: state === 'locked' ? 'var(--text-dim)' : 'var(--gold-light)',
      }}>{name}</div>
    </div>
  );
}

function Obj({ children, done }) {
  const [checked, setChecked] = React.useState(done);
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 4, cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontSize: '.92rem',
      color: checked ? 'var(--text-dim)' : 'var(--text)',
      textDecoration: checked ? 'line-through' : 'none',
      background: checked ? 'rgba(92,184,92,.05)' : 'transparent',
    }}
    onMouseEnter={e => e.currentTarget.style.background = checked ? 'rgba(92,184,92,.08)' : 'rgba(255,255,255,.04)'}
    onMouseLeave={e => e.currentTarget.style.background = checked ? 'rgba(92,184,92,.05)' : 'transparent'}>
      <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
        style={{ accentColor: 'var(--ember)' }} />
      <span style={{ color: checked ? '#5cb85c' : 'var(--text-dim)' }}>{checked ? '✓' : '○'}</span>
      {children}
    </label>
  );
}

window.FlameAltar = FlameAltar;
