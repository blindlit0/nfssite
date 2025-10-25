import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { initFirebase, firebaseHelpers } from '../firebase'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const firebase = initFirebase()
  if (!firebase) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Firebase configuration missing</h2>
        <p>Please check your environment variables.</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        await firebaseHelpers.signInWithEmail(firebase.auth, email, password)
        navigate('/')
      } else {
        // Sign up
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          setLoading(false)
          return
        }
        await firebaseHelpers.createUserWithEmail(firebase.auth, firebase.db, email, password)
        navigate('/')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '420px', margin: '2rem auto' }}>
      <div className="card" style={{ 
        padding: '2.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        boxShadow: '0 20px 60px rgba(220, 38, 38, 0.15)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            NFS
          </div>
          <h2 style={{ 
            marginBottom: '0.5rem', 
            color: 'var(--color-primary)',
            fontSize: '1.75rem',
            fontWeight: '700'
          }}>
            {isLogin ? 'Welcome Back' : 'Join NFS'}
          </h2>
          <p className="muted" style={{ fontSize: '0.95rem' }}>
            {isLogin ? 'Sign in to your account' : 'Create your NFS member account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="email" style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '600',
              color: 'var(--color-text)',
              fontSize: '0.9rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '600',
              color: 'var(--color-text)',
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                color: 'var(--color-text)',
                fontSize: '0.9rem'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
                placeholder="Confirm your password"
              />
            </div>
          )}

          {error && (
            <div style={{ 
              padding: '1rem',
              borderRadius: '12px',
              background: 'rgba(220, 38, 38, 0.05)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              color: 'var(--color-primary)',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              padding: '1rem 1.5rem'
            }}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create NFS Account')}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid rgba(220, 38, 38, 0.1)' 
        }}>
          <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an NFS account?" : 'Already have an NFS account?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
            style={{
              background: 'transparent',
              color: 'var(--color-secondary)',
              border: '2px solid var(--color-secondary)',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-secondary)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-secondary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {isLogin ? 'Create NFS Account' : 'Sign In'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link 
            to="/" 
            style={{ 
              color: 'var(--color-muted)', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
