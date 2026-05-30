'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { initFirebase, firebaseHelpers as fh } from '@/firebase'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import EventCard from '@/components/EventCardFinal'
import { useRouter } from 'next/navigation'

export default function CalendarPage() {
  const services = initFirebase()
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      if (!services) {
        // sample events
        if (!mounted) return
        setEvents([
          { id: 's1', title: 'Welcome Mixer', date: new Date().toISOString().slice(0, 10), time: '15:00', imageUrl: '', description: 'Meet the committee' },
        ])
        setLoading(false)
        return
      }

      try {
        const q = fh.collection(services.db, 'events')
        const snap = await fh.getDocs(q)
        const list: any[] = []
        snap.forEach((d: any) => list.push({ id: d.id, ...(d.data() as any) }))
        list.sort((a, b) => (a.date > b.date ? 1 : -1))
        if (!mounted) return
        setEvents(list)
      } catch (err) {
        console.error('Failed to load events', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [services])

  const today = new Date().toISOString().slice(0, 10)
  const upcoming = useMemo(() => events.filter((e) => e.date >= today), [events, today])
  const past = useMemo(() => events.filter((e) => e.date < today).reverse(), [events, today])

  // Calendar page removed — keep a small placeholder that points to Events
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Calendar Removed</h1>
      <p className="text-slate-500 mt-2">This page has been removed. Use the Events page instead.</p>
    </div>
  )
}
