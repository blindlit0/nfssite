
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { initFirebase, firebaseHelpers } from '../firebase'

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const firebase = initFirebase()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!firebase) {
        throw new Error('Firebase is not initialized.')
      }
      if (isLogin) {
        await firebaseHelpers.signInWithEmail(firebase.auth, email, password)
        router.push('/')
      } else {
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

        // Verify Student ID
        const res = await fetch('/api/verify-student-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId }),
        });
        const data = await res.json();

        if (!data.isValid) {
          setError(data.message || 'Invalid Student ID');
          setLoading(false);
          return;
        }

        await firebaseHelpers.createUserWithEmail(firebase.auth, firebase.db, email, password, firstName, lastName, studentId)
        router.push('/')
      }
    } catch (err: any) {
      const code = err?.code || ''
      const friendly =
        code === 'auth/wrong-password' || code === 'auth/user-not-found'
          ? 'Invalid email or password'
          : code === 'auth/invalid-email'
          ? 'Invalid email format'
          : code === 'auth/email-already-in-use'
          ? 'That email is already registered'
          : code === 'auth/weak-password'
          ? 'Password is too weak'
          : err?.message || 'An error occurred'
      setError(friendly)
    } finally {
      setLoading(false)
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setStudentId('')
  }

  return {
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
    firebaseInitialized: !!firebase,
  }
}
