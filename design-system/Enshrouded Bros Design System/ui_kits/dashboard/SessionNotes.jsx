function SessionNotes() {
  const [notes, setNotes] = React.useState(
    "Ranger: Lead the route.\nBarbarian: Frontline the adds outside his building.\nWizard: Fill meter on trash, release on boss.\nHealer: Keep everyone above 50% HP."
  );
  const [loot, setLoot] = React.useState([
    { t: 'Iron Bar', q: 3, who: 'Wizard' },
    { t: 'Berry',    q: 2, who: 'Healer' },
    { t: 'Ember Shard', q: 1, who: 'Ranger' },
  ]);
  const [newT, setNewT] = React.useState('');
  const add = () => {
    if (!newT.trim()) return;
    setLoot(l => [...l, { t: newT, q: 1, who: 'Group' }]);
    setNewT('');
  };
  const remove = i => setLoot(l => l.filter((_, idx) => idx !== i));

  return (
    <section style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
      {/* Notes */}
      <div>
        <SectionTitle icon="📝">Session Notes</SectionTitle>
        <div style={EB.panel}>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            style={{
              width: '100%', minHeight: 160, boxSizing: 'border-box',
              fontFamily: 'var(--font-body)', fontSize: '.95rem',
              color: 'var(--text)', background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(212,168,75,.25)', borderRadius: 4,
              padding: '10px 12px', outline: 'none', resize: 'vertical',
              lineHeight: 1.5,
            }} />
        </div>
      </div>

      {/* Loot */}
      <div>
        <SectionTitle icon="💎">Loot Log</SectionTitle>
        <div style={EB.panel}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input value={newT} onChange={e => setNewT(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && add()}
              placeholder="Add item…"
              style={{
                flex: 1, fontFamily: 'var(--font-body)', fontSize: '.9rem',
                color: 'var(--text)', background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(212,168,75,.25)', borderRadius: 4,
                padding: '7px 10px', outline: 'none',
              }} />
            <button onClick={add} style={{
              background: 'var(--ember-dim)', border: '1px solid var(--ember)',
              color: '#fff', padding: '7px 14px', borderRadius: 4,
              fontFamily: 'var(--font-serif)', fontSize: '.7rem',
              letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer',
            }}>+ Log</button>
          </div>
          {loot.length === 0
            ? <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '.85rem' }}>No items logged yet.</div>
            : loot.map((l, i) => <LootRow key={i} {...l} onRemove={() => remove(i)} />)
          }
        </div>
      </div>
    </section>
  );
}

function LootRow({ t, q, who, onRemove }) {
  const [hov, setHov] = React.useState(false);
  const c = EB.classes[who] || { rgb: '212,168,75', bright: '#f0c96a', emoji: '' };
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '7px 10px', borderRadius: 4,
        background: hov ? 'rgba(255,255,255,.04)' : 'transparent',
      }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--text)', flex: 1 }}>
        {t} <span style={{ color: 'var(--gold)', fontFamily: 'ui-monospace, monospace', fontSize: '.8rem' }}>×{q}</span>
      </div>
      <span style={EB.chip(c.rgb, c.bright)}>{c.emoji} {who}</span>
      <button onClick={onRemove} style={{
        opacity: hov ? 1 : 0, transition: 'opacity .15s',
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: '#e74c3c', fontSize: '.9rem',
      }}>✕</button>
    </div>
  );
}

window.SessionNotes = SessionNotes;
