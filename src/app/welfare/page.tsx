'use client'

import { useEffect, useMemo, useState } from 'react'
import { initFirebase, firebaseHelpers as fh } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import PrivateRoute from '../../components/auth/PrivateRoute'

type Category =
  | 'general'
  | 'financial'
  | 'emotional'
  | 'academical'
  | 'personal'

type WelfarePost = {
  id?: string
  userId: string
  userName?: string
  category: Category
  text: string
  anonymous: boolean
  createdAt: any
  toCommittee?: boolean
}

function Welfare() {
  const services = useMemo(() => initFirebase(), [])
  const { isAdmin, userData, loading } = useAuth()

  const [userId, setUserId] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  const [category, setCategory] =
    useState<Category>('financial')

  const [text, setText] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [toCommittee, setToCommittee] = useState(false)

  const [filter, setFilter] =
    useState<Category | 'all'>('all')

  const [posts, setPosts] = useState<WelfarePost[]>([])
  const [status, setStatus] = useState<string>('')

  const [committeeOnly, setCommitteeOnly] =
    useState(false)

  useEffect(() => {
    if (!services) return

    const { auth } = services

    const unsub = fh.onAuth(auth, async (u) => {
      if (!u) {
        const newUser = await fh.signInAnon(auth)

        setUserId(newUser.uid)
        setUserName('Anonymous User')
      } else {
        setUserId(u.uid)

        if (userData?.fullName) {
          setUserName(userData.fullName)
        } else if (
          userData?.firstName &&
          userData?.lastName
        ) {
          setUserName(
            `${userData.firstName} ${userData.lastName}`
          )
        } else {
          setUserName('User')
        }
      }
    })

    return () => unsub()
  }, [services, userData])

  useEffect(() => {
    if (loading || !isAdmin) return
    if (!services) return

    const { db } = services

    const q = fh.query(
      fh.collection(db, 'welfarePosts'),
      fh.orderBy('createdAt', 'desc')
    )

    const unsub = fh.onSnapshot(q, (snap) => {
      const list: WelfarePost[] = []

      snap.forEach((doc) =>
        list.push({
          id: doc.id,
          ...(doc.data() as any),
        })
      )

      setPosts(list)
    })

    return () => unsub()
  }, [services, isAdmin, loading])

  async function submitPost(e: React.FormEvent) {
    e.preventDefault()

    setStatus('')

    if (!text.trim()) {
      setStatus('Please write a message.')
      return
    }

    try {
      if (!services) {
        const newPost: WelfarePost = {
          id: Math.random().toString(36).slice(2),
          userId: userId || 'local',
          userName: anonymous
            ? undefined
            : userName,
          category,
          text,
          anonymous,
          toCommittee,
          createdAt: new Date().toISOString(),
        }

        if (isAdmin) {
          setPosts((p) => [newPost, ...p])
        }

        setText('')
        setAnonymous(false)

        setStatus(
          'Posted successfully. Thank you for sharing your concern.'
        )
      } else {
        const { db } = services

        const postData: any = {
          userId,
          category,
          text,
          anonymous,
          toCommittee,
          createdAt: fh.serverTimestamp(),
        }

        if (!anonymous) {
          postData.userName = userName
        }

        const docRef = await fh.addDoc(
          fh.collection(db, 'welfarePosts'),
          postData
        )

        console.log('Post created:', docRef.id)

        setText('')
        setAnonymous(false)
        setToCommittee(false)

        setStatus(
          'Posted successfully. Thank you for sharing your concern.'
        )
      }
    } catch (err) {
      console.error('Post error:', err)

      setStatus(
        'Failed to post. Please try again.'
      )
    }
  }

  const filteredPosts = posts.filter((p) =>
    filter === 'all'
      ? true
      : p.category === filter
  )

  const counts = useMemo(() => {
    const base: Record<Category, number> = {
      general: 0,
      financial: 0,
      emotional: 0,
      academical: 0,
      personal: 0,
    }

    for (const p of posts) {
      base[p.category as Category] += 1
    }

    return base
  }, [posts])

  function CategoryChip({
    active,
    onClick,
    label,
    count,
  }: {
    active: boolean
    onClick: () => void
    label: string
    count?: number
  }) {
    return (
      <button
        type="button"
        className={`px-4 py-2 rounded-full border transition duration-300 text-sm font-medium ${
          active
            ? 'bg-black text-white border-black'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={onClick}
        aria-pressed={active}
      >
        <div className="flex items-center gap-2">
          <span>{label}</span>

          {typeof count === 'number' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#dce8b0] text-[#2d3f00] font-semibold">
              {count}
            </span>
          )}
        </div>
      </button>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#2d3f00] via-[#445f05] to-white px-4 md:px-8 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-10">

        <div className="inline-block bg-black text-white text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          Welfare Support
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Share Your Concerns
        </h1>

        <p className="text-gray-200 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          This platform allows students to safely express welfare concerns,
          request support, and communicate privately with the committee.
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={submitPost}
        className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 mb-10"
      >

        <div className="grid gap-6">

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-3">

            <CategoryChip
              label="General"
              active={category === 'general'}
              onClick={() => setCategory('general')}
            />

            <CategoryChip
              label="Financial"
              active={category === 'financial'}
              onClick={() => setCategory('financial')}
            />

            <CategoryChip
              label="Emotional"
              active={category === 'emotional'}
              onClick={() => setCategory('emotional')}
            />

            <CategoryChip
              label="Academical"
              active={category === 'academical'}
              onClick={() => setCategory('academical')}
            />

            <CategoryChip
              label="Personal"
              active={category === 'personal'}
              onClick={() => setCategory('personal')}
            />

          </div>

          {/* CHECKBOXES */}
          <div className="flex flex-wrap gap-6">

            <label className="flex items-center gap-2 cursor-pointer text-gray-700">

              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) =>
                  setAnonymous(e.target.checked)
                }
                className="w-4 h-4"
              />

              <span>Post anonymously</span>

            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-700">

              <input
                type="checkbox"
                checked={toCommittee}
                onChange={(e) =>
                  setToCommittee(e.target.checked)
                }
                className="w-4 h-4"
              />

              <span>
                Send to committee (private)
              </span>

            </label>

          </div>

          {/* INFO */}
          <div className="text-sm text-gray-500 leading-relaxed">
            Private posts are visible only to site administrators
            and will not be shown publicly.
          </div>

          {/* TEXTAREA */}
          <label>

            <span className="block text-sm mb-3 font-semibold text-gray-700">
              Your message
            </span>

            <textarea
              required
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              rows={5}
              placeholder="Describe your welfare concern..."
              className="w-full resize-none min-h-[180px] bg-gray-100 text-black px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6b8f00] transition"
            />

          </label>

          {/* BUTTON */}
          <div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-2xl hover:scale-105 transition duration-300 shadow-xl"
            >
              Submit Concern
            </button>

          </div>

          {/* STATUS */}
          {status && (
            <div
              className={`text-sm p-4 rounded-2xl ${
                status.includes('successfully')
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {status}
            </div>
          )}

        </div>

      </form>

      {/* ADMIN SECTION */}
      {isAdmin && (
        <div className="max-w-7xl mx-auto">

          {/* FILTERS */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl mb-10">

            <div className="flex flex-col gap-6">

              <div className="text-gray-600">
                Filter welfare submissions by category
                or show only committee-directed posts.
              </div>

              <div className="flex flex-wrap gap-3">

                <CategoryChip
                  label="All"
                  active={filter === 'all'}
                  onClick={() => setFilter('all')}
                  count={posts.length}
                />

                <CategoryChip
                  label="General"
                  active={filter === 'general'}
                  onClick={() => setFilter('general')}
                  count={counts.general}
                />

                <CategoryChip
                  label="Financial"
                  active={filter === 'financial'}
                  onClick={() => setFilter('financial')}
                  count={counts.financial}
                />

                <CategoryChip
                  label="Emotional"
                  active={filter === 'emotional'}
                  onClick={() => setFilter('emotional')}
                  count={counts.emotional}
                />

                <CategoryChip
                  label="Academical"
                  active={filter === 'academical'}
                  onClick={() => setFilter('academical')}
                  count={counts.academical}
                />

                <CategoryChip
                  label="Personal"
                  active={filter === 'personal'}
                  onClick={() => setFilter('personal')}
                  count={counts.personal}
                />

              </div>

              <div>

                <button
                  type="button"
                  className={`px-6 py-3 rounded-2xl text-white transition duration-300 ${
                    committeeOnly
                      ? 'bg-[#6b8f00]'
                      : 'bg-black'
                  }`}
                  onClick={() =>
                    setCommitteeOnly((s) => !s)
                  }
                >
                  {committeeOnly
                    ? 'Hide Committee Posts'
                    : 'Show Committee Posts'}
                </button>

              </div>

            </div>

          </div>

          {/* POSTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredPosts
              .filter((p) =>
                committeeOnly
                  ? !!(p as any).toCommittee
                  : true
              )
              .map((p) => (

                <article
                  key={p.id}
                  className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 hover:translate-y-[-4px] transition duration-300"
                >

                  <div className="flex justify-between items-center">

                    <div className="bg-[#dce8b0] text-[#2d3f00] text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {p.category}
                    </div>

                    <span className="text-gray-500 text-sm">
                      {p.anonymous
                        ? 'Anonymous'
                        : p.userName}
                    </span>

                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-4">
                    {p.text}
                  </p>

                  {(p as any).toCommittee && (
                    <div className="text-xs text-[#6b8f00] mt-4 font-semibold">
                      Committee Only
                    </div>
                  )}

                </article>

              ))}

            {filteredPosts.length === 0 && (

              <div className="col-span-full bg-white rounded-[2rem] p-12 text-center shadow-xl">

                <p className="text-gray-500 text-lg">
                  No welfare posts yet.
                </p>

              </div>

            )}

          </div>

        </div>
      )}

      {/* NON ADMIN */}
      {!isAdmin && (

        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl p-10 text-center">

          <div className="text-5xl mb-5">
            🔒
          </div>

          <h3 className="text-3xl font-bold text-black mb-4">
            Submissions Are Private
          </h3>

          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Your submissions to the committee are confidential
            and only visible to the site administrators.
            The welfare committee will review your concern
            and provide appropriate support where possible.
          </p>

        </div>

      )}

    </section>
  )
}

export default function WelfarePage() {
  return (
    <PrivateRoute>
      <Welfare />
    </PrivateRoute>
  )
}