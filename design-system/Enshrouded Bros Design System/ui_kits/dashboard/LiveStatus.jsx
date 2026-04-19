function LiveStatus() {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionTitle icon="📡">Live Server Status</SectionTitle>

      <div style={{
        ...EB.panel,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        padding: 0,
        overflow: 'hidden',
      }}>
        <LiveTile label="Status" valueColor="#5cb85c"
          value={<><span style={dot('#5cb85c', true)} />Active</>}
          sub="ha-tinker @ 192.168.1.42" />
        <LiveTile label="Party" value="3 / 4" sub="Ranger, Wiz, Healer online" valueColor="var(--gold)" border />
        <LiveTile label="Last Save" value="2h ago" sub="Apr 19 · 14:22" valueColor="var(--gold)" border />
        <LiveTile label="Uptime" value="14d 6h" sub="since Apr 5 patch" valueColor="var(--gold)" border />
      </div>
    </section>
  );
}

function LiveTile({ label, value, sub, valueColor, border }) {
  return (
    <div style={{
      padding: '14px 18px',
      borderLeft: border ? '1px solid var(--border)' : 'none',
      background: 'rgba(255,255,255,.015)',
    }}>
      <div style={EB.eyebrow}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.3rem',
        color: valueColor, margin: '6px 0 2px', display: 'flex', alignItems: 'center', gap: 8,
      }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '.75rem', color: 'var(--text-dim)' }}>{sub}</div>
    </div>
  );
}

function dot(color, pulse) {
  return {
    display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
    background: color,
    boxShadow: pulse ? `0 0 8px ${color}` : 'none',
    animation: pulse ? 'pulse 2s infinite' : 'none',
  };
}

window.LiveStatus = LiveStatus;
