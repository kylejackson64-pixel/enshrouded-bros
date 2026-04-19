function Footer() {
  return (
    <footer style={{
      marginTop: '3rem', padding: '1.5rem 0 2rem',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
      fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '.8rem',
      color: 'var(--text-dim)', lineHeight: 1.7,
    }}>
      Update 8 · Forging the Path · April 21 2026 · <a href="https://enshrouded.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>enshrouded.com</a><br />
      Saves to localStorage · Free forever on GitHub Pages
    </footer>
  );
}

window.Footer = Footer;
