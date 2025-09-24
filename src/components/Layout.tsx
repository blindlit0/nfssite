import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '0.75rem 0' }}>
        <nav className="container nav" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>Dept. of Food Science & Nutrition</span>
          </div>
          <div className="nav-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
            <NavLink to="/welfare" style={{ textDecoration: 'none' }}>Welfare</NavLink>
          </div>
          <button className="hamburger" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} style={{ background: 'transparent', border: 0, display: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-primary)' }}>
              {menuOpen ? (
                <path d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12 10.59 13.42 4.29 19.71 5.7 21.12 12 14.83 18.3 21.12 19.71 19.71 13.41 13.42 19.71 7.12z"/>
              ) : (
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
              )}
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div className="mobile-menu" style={{ borderTop: '1px solid #e5e5e5' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem 0', gap: '0.5rem' }}>
              <NavLink to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/welfare" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Welfare</NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="container" style={{ flex: 1, padding: '2rem 0' }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1rem 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <small className="muted">© {new Date().getFullYear()} Department of Food Science & Nutrition</small>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/company/nutrition-and-food-science-students-society-nfsss/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BWBLr2tfvT5G%2FLp%2Bf9rwgdA%3D%3D" target="_blank" aria-label="LinkedIn" rel="noreferrer" style={{ display: 'inline-flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-primary)' }}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.025-3.059-1.865-3.059-1.868 0-2.154 1.459-2.154 2.967v5.696h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.839-1.563 3.038 0 3.6 2.001 3.6 4.604v5.592z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram" rel="noreferrer" style={{ display: 'inline-flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                <circle cx="12" cy="12" r="3.2"></circle>
                <path d="M16.5 7.5h.01"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout


