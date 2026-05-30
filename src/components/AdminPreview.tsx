"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { initFirebase, firebaseHelpers as fh } from '../firebase'

export default function AdminPreview() {
  const { isAdmin } = useAuth()
  const [counts, setCounts] = useState<{ users?: number; posts?: number; events?: number } | null>(null)

  useEffect(() => {
    if (!isAdmin) return
    const services = initFirebase()
    if (!services) return
    const { db } = services
    let mounted = true
    ;(async () => {
      try {
        const [uSnap, pSnap, eSnap] = await Promise.all([
          fh.getDocs(fh.collection(db, 'users')),
          fh.getDocs(fh.collection(db, 'welfarePosts')),
          fh.getDocs(fh.collection(db, 'events')),
        ])
        if (!mounted) return
        setCounts({ users: uSnap.size, posts: pSnap.size, events: eSnap.size })
      } catch (err) {
        console.error('Admin preview counts failed', err)
      }
    })()
    return () => { mounted = false }
  }, [isAdmin])

  if (!isAdmin) return null

  return (
    <section className="max-w-6xl mx-auto my-6 px-4 sm:px-6 fade-in">
      <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800/30 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Admin Dashboard</h3>
          <Link href="/admin" className="text-sm text-blue-600">Open panel</Link>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="p-3 bg-white dark:bg-gray-900/50 rounded shadow-sm min-w-[140px]">
            <div className="text-sm text-gray-500">Users</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts?.users ?? '—'}</div>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900/50 rounded shadow-sm min-w-[140px]">
            <div className="text-sm text-gray-500">Public Posts</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts?.posts ?? '—'}</div>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900/50 rounded shadow-sm min-w-[140px]">
            <div className="text-sm text-gray-500">Events</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{counts?.events ?? '—'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
