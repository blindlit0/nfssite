import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Dept. of Food Science & Nutrition</span>
            <NavLink to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
            <NavLink to="/welfare" style={{ textDecoration: 'none' }}>Welfare</NavLink>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1rem', textAlign: 'center' }}>
        <small>© {new Date().getFullYear()} Department of Food Science & Nutrition</small>
      </footer>
    </div>
  )
}

export default Layout


