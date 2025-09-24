import { useEffect, useMemo, useState } from 'react'
import { initFirebase, firebaseHelpers as fh } from '../firebase'
import { generateNfssUsername } from '../utils/username'

type Category = 'financial' | 'emotional' | 'academical' | 'personal'

type WelfarePost = {
  id?: string
  userId: string
  username: string
  category: Category
  text: string
  anonymous: boolean
  createdAt: any
}

function Welfare() {
  const services = useMemo(() => initFirebase(), [])
  const [userId, setUserId] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [category, setCategory] = useState<Category>('financial')
  const [text, setText] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [posts, setPosts] = useState<WelfarePost[]>([])
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    if (!services) return
    const { auth } = services
    const unsub = fh.onAuth(auth, async (u) => {
      if (!u) {
        const newUser = await fh.signInAnon(auth)
        setUserId(newUser.uid)
        const uname = generateNfssUsername()
        setUsername(uname)
      } else {
        setUserId(u.uid)
        setUsername(generateNfssUsername())
      }
    })
    return () => unsub()
  }, [services])

  useEffect(() => {
    if (!services) return
    const { db } = services
    const q = fh.query(
      fh.collection(db, 'welfarePosts'),
      fh.orderBy('createdAt', 'desc')
    )
    const unsub = fh.onSnapshot(q, (snap) => {
      const list: WelfarePost[] = []
      snap.forEach((doc) => list.push({ id: doc.id, ...(doc.data() as any) }))
      setPosts(list)
    })
    return () => unsub()
  }, [services])

  async function submitPost(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    try {
      if (!services) {
        // Local fallback: store in-memory if Firebase is not configured
        const newPost: WelfarePost = {
          id: Math.random().toString(36).slice(2),
          userId: userId || 'local',
          username,
          category,
          text,
          anonymous,
          createdAt: new Date().toISOString(),
        }
        setPosts((p) => [newPost, ...p])
      } else {
        const { db } = services
        await fh.addDoc(fh.collection(db, 'welfarePosts'), {
          userId,
          username,
          category,
          text,
          anonymous,
          createdAt: fh.serverTimestamp(),
        })
      }
      setText('')
      setAnonymous(false)
      setStatus('Posted successfully')
    } catch (err) {
      setStatus('Failed to post. Please try again.')
    }
  }

  const filteredPosts = posts.filter((p) => (filter === 'all' ? true : p.category === filter))

  return (
    <section>
      <h1>Welfare</h1>
      <p className="muted">Share welfare matters. You can post anonymously or with your generated username.</p>

      <form onSubmit={submitPost} className="card" style={{ margin: '1rem 0' }}>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <label>
              <span style={{ display: 'block', fontSize: '0.9rem' }}>Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                <option value="financial">Financial</option>
                <option value="emotional">Emotional</option>
                <option value="academical">Academical</option>
                <option value="personal">Personal</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              Post anonymously
            </label>
            <span className="badge">{anonymous ? 'Anonymous' : username || 'NFSS-...'}</span>
          </div>
          <label>
            <span style={{ display: 'block', fontSize: '0.9rem' }}>Your message</span>
            <textarea required value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Describe the welfare matter..." style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          </label>
          <div>
            <button type="submit">Post</button>
          </div>
          {status && <div className="muted">{status}</div>}
        </div>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        <span className="muted">Filter:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="financial">Financial</option>
          <option value="emotional">Emotional</option>
          <option value="academical">Academical</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <div className="grid grid-3" style={{ marginTop: '1rem' }}>
        {filteredPosts.map((p) => (
          <article key={p.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--color-primary)' }}>{p.category}</strong>
              <span className="muted" style={{ fontSize: '0.85rem' }}>{p.anonymous ? 'Anonymous' : p.username}</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{p.text}</p>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="muted">No posts yet.</div>
        )}
      </div>
    </section>
  )
}

export default Welfare


