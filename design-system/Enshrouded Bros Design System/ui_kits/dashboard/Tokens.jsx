// Shared style helpers for the Dashboard UI kit.
// Consumed via `window.EB` after this file loads.

const EB = {
  // Card / panel base
  panel: {
    background: 'var(--panel)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '1.2rem',
    position: 'relative',
  },
  // Eyebrow / tiny Cinzel cap label
  eyebrow: {
    fontFamily: 'var(--font-serif)',
    fontSize: '.65rem',
    letterSpacing: '.24em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '.18em',
    textTransform: 'uppercase',
    color: 'var(--gold-light)',
    whiteSpace: 'nowrap',
  },
  rule: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
    opacity: 0.5,
  },
  // Chip / tag — must pass accent color in
  chip: (accent, bright) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-serif)',
    fontSize: '.6rem',
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: 2,
    background: `rgba(${accent},.15)`,
    border: `1px solid rgba(${accent},.4)`,
    color: bright,
  }),
  classes: {
    Ranger:    { rgb: '232,97,42', bright: '#ff8c42', emoji: '🏹' },
    Barbarian: { rgb: '192,57,43', bright: '#e74c3c', emoji: '⚔️' },
    Wizard:    { rgb: '142,109,191', bright: '#a89bd4', emoji: '🔮' },
    Healer:    { rgb: '74,159,212', bright: '#4a9fd4', emoji: '💧' },
  },
};

window.EB = EB;

function SectionTitle({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 14px' }}>
      <div style={EB.sectionTitle}>{icon} {children}</div>
      <div style={EB.rule} />
    </div>
  );
}

window.SectionTitle = SectionTitle;
