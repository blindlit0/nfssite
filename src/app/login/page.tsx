
'use client'

import Link from 'next/link'
import { useAuthForm } from '../../hooks/useAuthForm'
import EyeIcon from '../../components/EyeIcon'

export default function Login() {
  const {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    studentId,
    setStudentId,
    loading,
    error,
    handleSubmit,
    toggleForm,
    firebaseInitialized,
  } = useAuthForm()

  if (!firebaseInitialized) {
    return (
      <div className="container max-w-[500px] my-8 mx-auto">
        <div className="card text-center bg-white/95 backdrop-blur-xl border-red-500/10 p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
            NFS
          </div>
          <h2 className="text-red-600 mb-4 text-2xl font-bold">
            Firebase Configuration Required
          </h2>
          <p className="text-slate-500 mb-6">
            To use the login system, you need to configure Firebase. Please create a <code className="bg-slate-100 px-2 py-1 rounded">.env.local</code> file in your project root with the following variables:
          </p>
          <div className="bg-slate-50 p-4 rounded-lg text-left font-mono text-sm mb-6">
            <div>NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key</div>
            <div>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com</div>
            <div>NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id</div>
            <div>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com</div>
            <div>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id</div>
            <div>NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id</div>
            <div>NEXT_PUBLIC_ADMIN_EMAIL=your_admin@email.com</div>
          </div>
          <p className="text-sm text-slate-500">
            Get these values from your Firebase project settings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-[420px] my-8 mx-auto">
      <div className="card p-10 bg-white/95 backdrop-blur-xl border-red-500/10 shadow-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
            NFS
          </div>
          <h2 className="mb-2 text-red-600 text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500">
            {isLogin ? 'Sign in to your account' : 'Create your membership account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-slate-900">
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
            <label htmlFor="studentId" className="block mb-2 font-semibold text-slate-900">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              placeholder="Enter your student ID"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-slate-900">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="firstName" className="block mb-2 font-semibold text-slate-900">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 font-semibold text-slate-900">
                  Last Name (Surname)
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter your surname"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-slate-900">
                  Confirm Password
                </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                  />
              </div>
            </>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-red-500/10">
          <p className="mb-4 text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={toggleForm}
            className="bg-transparent text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-slate-500 text-sm font-medium transition-colors duration-200 hover:text-red-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
