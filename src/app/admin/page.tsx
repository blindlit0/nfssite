'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { initFirebase, firebaseHelpers as fh } from '../../firebase'
import Link from 'next/link'
import PrivateRoute from '../../components/auth/PrivateRoute'

interface User {
  id: string
  email: string
  nfsUsername: string
  firstName?: string
  lastName?: string
  fullName?: string
  createdAt: any
}

function Admin() {
  const { isAdmin, user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const services = initFirebase()

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!services || !isAdmin) {
      setLoading(false)
      return
    }

    const { db } = services
    const usersCollection = fh.collection(db, 'users')

    // Use a simple snapshot on the collection (no ordering) to avoid issues when some docs lack `createdAt`.
    const unsub = fh.onSnapshot(usersCollection, (snap) => {
      console.log('Documents returned from Firestore:', snap.size)
      const list: User[] = []
      snap.forEach((doc) => {
        const data = doc.data()
        list.push({
          id: doc.id,
          email: data.email || '',
          nfsUsername: data.nfsUsername || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          fullName: data.fullName || '',
          createdAt: data.createdAt,
        })
      })

      // If only a single (current) user appears, also attempt a one-time getDocs to ensure the collection is readable.
      if (snap.size <= 1) {
        fh.getDocs(usersCollection).then((oneSnap) => {
          if (oneSnap.size > snap.size) {
            const alt: User[] = []
            oneSnap.forEach((d) => {
              const data = d.data()
              alt.push({
                id: d.id,
                email: data.email || '',
                nfsUsername: data.nfsUsername || '',
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                fullName: data.fullName || '',
                createdAt: data.createdAt,
              })
            })
            setUsers(alt)
            setLoading(false)
            return
          }
          setUsers(list)
          setLoading(false)
        }).catch((err) => {
          console.error('Fallback getDocs failed:', err)
          setUsers(list)
          setLoading(false)
        })
      } else {
        setUsers(list)
        setLoading(false)
      }

    }, (err) => {
      console.error('Error fetching users:', err)
      setError('Failed to fetch users. Please check the console for more details.')
      setLoading(false)
    })

    return () => unsub()
  }, [services, isAdmin])

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!services) return
    
    if (!confirm(`Are you sure you want to delete ${userName || 'this user'}'s account? This action cannot be undone.`)) {
      return
    }

    try {
      setStatus('')
      await fh.deleteUserAccount(services.auth, services.db, userId)
      setStatus(`Successfully deleted ${userName || 'user'}'s account.`)
      
      // Clear status after 3 seconds
      setTimeout(() => setStatus(''), 3000)
    } catch (error: any) {
      setStatus(`Failed to delete account: ${error.message}`)
    }
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-[600px] my-8 mx-auto">
        <div className="card text-center p-8">
          <h2 className="text-red-400 mb-4 text-2xl font-bold">
            Access Denied
          </h2>
          <p className="text-gray-400 mb-6">
            You must be an admin to access this page.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl my-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Admin Panel</h1>
        <p className="text-gray-400 text-lg">Manage user accounts</p>
      </div>

      {status && (
        <div className={`mb-6 p-4 rounded-lg ${
          status.includes('Successfully') 
            ? 'bg-green-900/50 text-green-300 border border-green-700' 
            : 'bg-red-900/50 text-red-300 border border-red-700'
        }`}>
          {status}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-900/50 text-red-300 border border-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="card text-center p-8">
          <p className="text-gray-400">Loading users...</p>
        </div>
      ) : (
        <div className="card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              All Users ({users.length})
            </h2>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">NFS Username</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3 text-sm text-gray-100">
                        {user.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'N/A')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{user.nfsUsername}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {user.id === currentUser?.uid ? (
                          <span className="text-gray-500 italic">Current user</span>
                        ) : (
                          <button
                            onClick={() => handleDeleteUser(user.id, user.fullName || user.nfsUsername)}
                            className="text-red-500 hover:text-red-400 font-medium transition-colors"
                          >
                            Delete Account
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function AdminPage() {
    return (
        <PrivateRoute>
            <Admin />
        </PrivateRoute>
    )
}

