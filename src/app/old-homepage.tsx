 
'use client'
 
 
 
 import Link from 'next/link'
 
 import Flipbox from '@/components/Flipbox'
 
 import MemberCarousel from '@/components/MemberCarousel'
 
 import { sampleMembers } from '@/data/members'
 
 import { useEffect, useState } from 'react'
 
 import { initFirebase, firebaseHelpers as fh } from '../firebase'
 
 import Loader from '@/components/Loader';
 
import { useAuth } from '../contexts/AuthContext'
 
import InteractiveGrid from '@/components/Pattern';
 
 
 
 type EventItem = { 
    id?: string
 
    title: string
 
    date: string // ISO date
 
    time?: string
 
    description?: string
 
  }
 
  
 
  export default function Home() {
 
    const { loading } = useAuth()
 
    const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([])
 
  
 
    useEffect(() => {
 
      if (loading) return
 
      const services = initFirebase()
 
      if (!services) return
 
  
 
      const { db } = services
 
      const q = fh.query(
 
        fh.collection(db, 'events'),
 
        fh.where('date', '>=', new Date().toISOString().split('T')[0]),
 
        fh.orderBy('date', 'asc'),
 
        fh.limit(3)
 
      )
 
  
 
      const unsubscribe = fh.onSnapshot(q, (snapshot) => {
 
        const events: EventItem[] = []
 
        snapshot.forEach((doc) => {
 
          events.push({ id: doc.id, ...doc.data() } as EventItem)
 
        })
 
        setUpcomingEvents(events)
 
      })
 
  
 
      return () => unsubscribe()
 
    }, [loading])
 
  
 
    return (
 
      <InteractiveGrid>
 
        {/* Hero + Layout */}
 
        <section className="py-12">
 
          <div className="container text-center">
 
            <Loader />
 
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">Department of Food Science & Nutrition</h1>
 
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">Advancing food science, human nutrition, and public health through research, education, and community impact.</p>
 
            <div className="mt-6 flex flex-col items-center justify-center gap-3">
 
              <Link href="/welfare" className="btn-primary">Go to Welfare Posts</Link>
 
              <Link href="/events" className="chip">View Events</Link>
 
            </div>
 
          </div>
 
        </section>
 
  
 
        {/* Main content + Sidebar */}
 
        <section className="container grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
 
          {/* Main column (longer content) */}
 
          <div className="lg:col-span-2 space-y-6">
 
            <div className="card">
 
              <h2 className="text-2xl font-semibold mb-3 text-slate-900">About the Welfare Committee</h2>
 
              <p className="text-slate-700 leading-relaxed">The Welfare Committee is dedicated to supporting the well-being of all members of our community. We focus on providing assistance, promoting a positive environment, and ensuring that everyone feels heard, valued, and supported. Through proactive initiatives, open communication, and care-driven programs, we work to improve the welfare and overall experience of every individual we serve.</p>
 
            </div>
 
  
 
            <div>
 
              <Flipbox />
 
            </div>
 
  
 
            <div className="card">
 
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Need Help? Make a Post</h3>
 
              <p className="text-slate-700 leading-relaxed">Do you have any problems or need help? The best way to start is to let it out — make a post and tell us what you are going through. <Link href="/welfare" className="text-emerald-600 font-semibold">Create a post</Link>. Only members of the committee can see your posts; you may also choose to post anonymously.</p>
 
            </div>
 
  
 
            {/* Additional long content placeholder - you can add reports, resources, links */}
 
            <div className="card">
 
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Resources & Support</h3>
 
              <p className="text-slate-700">Find support services, referral contacts, and guidance documents here. (Add links or files as needed.)</p>
 
            </div>
 
          </div>
 
  
 
          {/* Sidebar */}
 
          <aside className="space-y-6">
 
            <div className="card">
 
              <h4 className="font-semibold mb-3 text-slate-900">Upcoming Events</h4>
 
              <div className="text-sm text-slate-700">
 
                {upcomingEvents.length > 0 ? (
 
                  <ul className="space-y-4">
 
                    {upcomingEvents.map((event) => (
 
                      <li key={event.id} className="border-b last:border-b-0 pb-2 last:pb-0">
 
                        <p className="font-bold">{event.title}</p>
 
                        <p className="text-slate-500">{new Date(event.date).toDateString()} {event.time}</p>
 
                      </li>
 
                    ))}
 
                  </ul>
 
                ) : (
 
                  <p className="text-slate-500">No upcoming events at the moment.</p>
 
                )}
 
                <div className="mt-3">
 
                  <Link href="/events" className="chip">See all events</Link>
 
                </div>
 
              </div>
 
            </div>
 
  
 
            <Link href="/welfare/members">
 
             <div className="card">
 
              <h4 className="font-semibold mb-3 text-slate-900">Meet the teams</h4>
 
              <MemberCarousel members={sampleMembers} />
 
            </div>
 
            </Link>
 
          </aside>
 
        </section>
 
      </InteractiveGrid>
 
    )
 
  } 