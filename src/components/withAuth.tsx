'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="container max-w-[500px] my-8 mx-auto">
          <div className="card text-center bg-white/95 backdrop-blur-xl border-red-500/10 p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
              NFS
            </div>
            <h2 className="text-red-600 mb-4 text-2xl font-bold">
              Loading...
            </h2>
          </div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
