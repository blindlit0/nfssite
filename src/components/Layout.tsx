import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '0.75rem 0' }}>
        <nav className="container" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>Dept. of Food Science & Nutrition</span>
            <NavLink to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
            <NavLink to="/welfare" style={{ textDecoration: 'none' }}>Welfare</NavLink>
          </div>
        </nav>
      </header>

      <main className="container" style={{ flex: 1, padding: '2rem 0' }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1rem 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <small className="muted">© {new Date().getFullYear()} Department of Food Science & Nutrition</small>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn" rel="noreferrer" style={{ display: 'inline-flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-primary)' }}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.025-3.059-1.865-3.059-1.868 0-2.154 1.459-2.154 2.967v5.696h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.839-1.563 3.038 0 3.6 2.001 3.6 4.604v5.592z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram" rel="noreferrer" style={{ display: 'inline-flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-accent)' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.16 0-3.526.012-4.767.069-1.022.047-1.577.216-1.946.36-.49.19-.84.416-1.207.783-.367.367-.594.717-.783 1.207-.144.369-.313.924-.36 1.946-.057 1.241-.069 1.607-.069 4.767s.012 3.526.069 4.767c.047 1.022.216 1.577.36 1.946.19.49.416.84.783 1.207.367.367.717.594 1.207.783.369.144.924.313 1.946.36 1.241.057 1.607.069 4.767.069s3.526-.012 4.767-.069c1.022-.047 1.577-.216 1.946-.36.49-.19.84-.416 1.207-.783.367-.367.594-.717.783-1.207.144-.369.313-.924.36-1.946.057-1.241.069-1.607.069-4.767s-.012-3.526-.069-4.767c-.047-1.022-.216-1.577-.36-1.946-.19-.49-.416-.84-.783-1.207-.367-.367-.717-.594-1.207-.783-.369-.144-.924-.313-1.946-.36-1.241-.057-1.607-.069-4.767-.069zm0 3.905a5.095 5.095 0 1 1 0 10.19 5.095 5.095 0 0 1 0-10.19zm0 1.837a3.258 3.258 0 1 0 0 6.516 3.258 3.258 0 0 0 0-6.516zm5.406-3.204a1.188 1.188 0 1 1 0 2.376 1.188 1.188 0 0 1 0-2.376z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout


