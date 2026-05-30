"use client"

import { useEffect, useMemo, useState } from 'react'
import { initFirebase, firebaseHelpers as fh } from '@/firebase'
import { useAuth } from '../../../contexts/AuthContext'
import AdminPrivateRoute from '../../../components/auth/AdminPrivateRoute'

type EventItem = {
  id?: string
  title: string
  date: string // ISO date
  time?: string
  description?: string
}

function EventsPage() {
  const services = initFirebase()
  const { isAdmin, user } = useAuth()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  
  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      if (!services) {
        // Sample events when Firebase not configured
        if (!mounted) return
        setEvents([
          { id: 'e1', title: 'Welcome Mixer', date: new Date().toISOString().slice(0, 10), time: '15:00', description: 'Meet the committee' },
        ])
        setLoading(false)
        return
      }

      try {
        const { db } = services
        const q = fh.collection(db, 'events')
        const snap = await fh.getDocs(q)
        const list: EventItem[] = []
        snap.forEach((d: any) => list.push({ id: d.id, ...(d.data() as any) }))
        if (!mounted) return
        // sort by date
        list.sort((a, b) => (a.date > b.date ? 1 : -1))
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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')
    
    if (!title.trim() || !date) {
      setSubmitError('Please fill in at least title and date.')
      return
    }

    if (!services) {
      setSubmitError('Firebase is not configured.')
      return
    }

    try {
      const { db } = services
      if (editId) {
        // update existing
        await fh.updateDoc(fh.doc(db, 'events', editId), {
          title,
          date,
          time,
          description,
          updatedAt: fh.serverTimestamp(),
        })
        setSubmitSuccess('Event updated successfully!')
      } else {
        await fh.addDoc(fh.collection(db, 'events'), {
          title,
          date,
          time,
          description,
          createdAt: fh.serverTimestamp(),
          createdBy: user?.uid || null,
        })
        setSubmitSuccess('Event added successfully!')
      }
      
      // simple refresh
      const snap = await fh.getDocs(fh.collection(services.db, 'events'))
      const list: EventItem[] = []
      snap.forEach((d: any) => list.push({ id: d.id, ...(d.data() as any) }))
      list.sort((a, b) => (a.date > b.date ? 1 : -1))
      setEvents(list)
      
      // Reset form
      setTitle('')
      setDate('')
      setTime('')
      setDescription('')
      setEditId(null)
    } catch (err) {
      console.error('Failed to add event', err)
      setSubmitError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleEdit = (ev: EventItem) => {
    setEditId(ev.id || null)
    setTitle(ev.title || '')
    setDate(ev.date || '')
    setTime(ev.time || '')
    setDescription(ev.description || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id?: string) => {
    if (!id || !services) return
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await fh.deleteDoc(fh.doc(services.db, 'events', id))
      setSubmitSuccess('Event deleted')
      // refresh
      const snap = await fh.getDocs(fh.collection(services.db, 'events'))
      const list: EventItem[] = []
      snap.forEach((d: any) => list.push({ id: d.id, ...(d.data() as any) }))
      list.sort((a, b) => (a.date > b.date ? 1 : -1))
      setEvents(list)
    } catch (err) {
      console.error(err)
      setSubmitError('Failed to delete event')
    }
  }

  const upcoming = useMemo(() => events.filter((ev) => ev.date >= new Date().toISOString().slice(0, 10)), [events])

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">Events & Calendar</h1>
        <p className="text-slate-500">View upcoming events. Admins can add new events.</p>
      </div>

      {isAdmin && services && (
        <form onSubmit={handleAdd} className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input required placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <textarea placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} className="md:col-span-3" />
            
            <div className="md:col-span-3 flex flex-col gap-2">
              <button className="btn-primary" type="submit">{editId ? 'Save Changes' : 'Add Event'}</button>
              {submitError && <span className="text-red-600 text-sm">{submitError}</span>}
              {submitSuccess && <span className="text-green-600 text-sm">{submitSuccess}</span>}
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold text-lg mb-3">Upcoming</h2>
          {loading ? (
            <div>Loading…</div>
          ) : upcoming.length === 0 ? (
            <div className="text-slate-500">No upcoming events.</div>
          ) : (
            <ul className="flex flex-col gap-3">
              {upcoming.map((ev) => (
                <li key={ev.id} className="border border-slate-100 rounded-lg p-3">
                  <div className="flex items-start gap-4">
                    
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{ev.title}</div>
                      <div className="text-sm text-slate-500">{ev.date} {ev.time ? ` · ${ev.time}` : ''}</div>
                      {ev.description && <p className="text-sm text-slate-700 mt-2">{ev.description}</p>}
                    </div>
                    {isAdmin && (
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleEdit(ev)} className="text-sm text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(ev.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-lg mb-3">All Events</h2>
          {events.length === 0 ? (
            <div className="text-slate-500">No events available.</div>
          ) : (
            <ol className="list-decimal list-inside space-y-3">
              {events.map((ev) => (
                <li key={ev.id} className="text-sm flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">{ev.title}</strong>
                    <span className="text-slate-500"> — {ev.date} {ev.time ? ` · ${ev.time}` : ''}</span>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(ev)} className="text-sm text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(ev.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Events() {
    return (
        <AdminPrivateRoute>
            <EventsPage />
        </AdminPrivateRoute>
    )
}
