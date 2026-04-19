function BossGuide() {
  const [tab, setTab] = React.useState('bosses');
  const bosses = [
    { name: "Fell Sicklescythe", region: 'Revelwood', lv: '15–20', state: 'down',
      tip: 'Barbarian: Tank the adds outside his building. Wizard: Melt from range.' },
    { name: "Hydrak'Dal",       region: 'Nomad Highlands', lv: '25–30', state: 'down',
      tip: 'Healer: Keep everyone above 50% HP during the ice phase.' },
    { name: 'The Fell Dragon',  region: 'Pikemead\'s Reach', lv: '35–42', state: 'current',
      tip: 'Ranger: Lead the route. Focus wing crits — Eagle Eye stacks here.' },
    { name: 'Ember Colossus',   region: 'Scorched Vale', lv: '48–55', state: 'locked',
      tip: 'U8 exclusive. Unlocks via Veilwater after Fell Dragon drop.' },
  ];
  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionTitle icon="💀">Boss Guide</SectionTitle>

      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
        {['bosses', 'biomes', 'crafting'].map(t => (
          <div key={t} onClick={() => setTab(t)}
            style={{
              fontFamily: 'var(--font-serif)', fontSize: '.7rem',
              letterSpacing: '.14em', textTransform: 'uppercase',
              color: tab === t ? 'var(--gold-light)' : 'var(--text-dim)',
              padding: '9px 18px', cursor: 'pointer',
              borderBottom: `2px solid ${tab === t ? 'var(--gold)' : 'transparent'}`,
              background: tab === t ? 'rgba(212,168,75,.05)' : 'transparent',
            }}>
            {t === 'bosses' ? '💀 Bosses' : t === 'biomes' ? '🗺 Biomes' : '🔨 Crafting'}
          </div>
        ))}
      </div>

      {tab === 'bosses' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {bosses.map(b => <BossCard key={b.name} {...b} />)}
        </div>
      )}
      {tab === 'biomes' && <PlaceholderPanel>🗺 Biome reference loaded from campaign guide — see source dashboard for full table.</PlaceholderPanel>}
      {tab === 'crafting' && <PlaceholderPanel>🔨 Recipe list (Iron Bar ×3, Berry ×2, …) — see source dashboard.</PlaceholderPanel>}
    </section>
  );
}

function BossCard({ name, region, lv, state, tip }) {
  const stateMap = {
    down:    { chip: EB.chip('92,184,92', '#5cb85c'),   label: '✓ DOWN' },
    current: { chip: EB.chip('232,97,42', '#ff8c42'),   label: '⚔️ CURRENT' },
    locked:  { chip: EB.chip('122,143,168', '#8a9bb0'), label: '🔒 LOCKED' },
  }[state];
  return (
    <div style={{ ...EB.panel, padding: '14px 14px 12px' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: state === 'current'
          ? 'linear-gradient(90deg, #e8612a, #d4a84b)'
          : state === 'down'
          ? 'linear-gradient(90deg, #5cb85c, #2d6b2d)'
          : 'linear-gradient(90deg, #3a4558, #2a3547)',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '.95rem',
          letterSpacing: '.1em', textTransform: 'uppercase',
          color: 'var(--gold-light)',
        }}>💀 {name}</div>
        <span style={stateMap.chip}>{stateMap.label}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '.78rem', color: 'var(--text-dim)', marginBottom: 10 }}>
        {region} · Lv {lv}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5 }}>
        ▸ {tip}
      </div>
    </div>
  );
}

function PlaceholderPanel({ children }) {
  return (
    <div style={{ ...EB.panel, fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '.92rem' }}>
      {children}
    </div>
  );
}

window.BossGuide = BossGuide;
