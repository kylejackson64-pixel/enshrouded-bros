function Party() {
  const heroes = [
    { klass: 'Ranger',    initials: 'RG', name: 'Kyle',   role: 'Mobility · DPS',   lv: 45, weap: 'Eagle Eye · 3★', ult: 71 },
    { klass: 'Barbarian', initials: 'BB', name: 'Devin',  role: 'Frontline Tank',   lv: 42, weap: 'Greatsword · 2★', ult: 55 },
    { klass: 'Wizard',    initials: 'WZ', name: 'Marco',  role: 'AoE · Boss Burn',  lv: 47, weap: 'Staff of Cinders · 4★', ult: 88 },
    { klass: 'Healer',    initials: 'HL', name: 'Jalen',  role: 'Water Aura',       lv: 44, weap: 'Druid Wand · 2★', ult: 42 },
  ];
  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionTitle icon="🧑‍🤝‍🧑">The Bros</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {heroes.map(h => <HeroCard key={h.initials} {...h} />)}
      </div>
    </section>
  );
}

function HeroCard({ klass, initials, name, role, lv, weap, ult }) {
  const c = EB.classes[klass];
  return (
    <div style={{
      ...EB.panel,
      textAlign: 'center',
      padding: '1rem .8rem',
      transition: 'transform .2s, border-color .2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.borderColor = 'rgba(232,97,42,.4)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border)';
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, rgba(${c.rgb},1), ${c.bright})`,
      }} />
      <div style={{
        width: 54, height: 54, borderRadius: '50%',
        margin: '4px auto 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `rgba(${c.rgb},.15)`, border: `2px solid ${c.bright}`,
        color: c.bright,
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', letterSpacing: '.06em',
      }}>{initials}</div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '.85rem',
        letterSpacing: '.12em', textTransform: 'uppercase',
        color: 'var(--text)', marginBottom: 2,
      }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '.72rem', color: 'var(--text-dim)', marginBottom: 8 }}>
        {c.emoji} {klass} · {role}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1 }}>{lv}</div>
      <div style={{ ...EB.eyebrow, marginTop: 2 }}>Level</div>

      <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 10, textAlign: 'left' }}>
        <div style={{ ...EB.eyebrow, marginBottom: 3 }}>Weapon</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ash)', marginBottom: 8 }}>{weap}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <div style={EB.eyebrow}>Ult</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.72rem', color: c.bright, fontWeight: 600 }}>{ult}%</div>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${ult}%`, borderRadius: 3,
            background: `linear-gradient(90deg, rgba(${c.rgb},.5), ${c.bright})`,
          }} />
        </div>
      </div>
    </div>
  );
}

window.Party = Party;
