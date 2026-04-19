function Header() {
  return (
    <header style={{
      textAlign: 'center',
      padding: '2.5rem 1rem 1.5rem',
      position: 'relative',
    }}>
      <h1 style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontWeight: 900,
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        lineHeight: 1.05,
        margin: '0 0 .6rem',
        background: 'var(--grad-title)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '.02em',
      }}>
        Enshrouded Bros
      </h1>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '.75rem',
        letterSpacing: '.4em',
        color: 'var(--ash)',
      }}>
        B · R · O · S &nbsp;·&nbsp; UPDATE 8 · APR 21 · 2 DAYS 4 HRS
      </div>
    </header>
  );
}

window.Header = Header;
