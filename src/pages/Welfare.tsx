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
  const counts = useMemo(() => {
    const base = { financial: 0, emotional: 0, academical: 0, personal: 0 }
    for (const p of posts) base[p.category] += 1
    return base
  }, [posts])

  function CategoryChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count?: number }) {
    return (
      <button type="button" className={`chip ${active ? 'active' : ''}`} onClick={onClick} aria-pressed={active}>
        <span>{label}</span>
        {typeof count === 'number' && <span className="badge" style={{ fontSize: '0.75rem' }}>{count}</span>}
      </button>
    )
  }

  return (
    <section>
      <div style={{ marginBottom: '1rem' }}>
        <h1 style={{ marginBottom: 4 }}>Welfare</h1>
        <p className="muted">Share welfare matters. Post anonymously or with your generated NFSS username.</p>
      </div>

      <form onSubmit={submitPost} className="card" style={{ margin: '1rem 0' }}>
        <div className="grid" style={{ gap: '0.9rem' }}>
          <div>
            <div className="chips" role="group" aria-label="Category">
              <CategoryChip label="Financial" active={category==='financial'} onClick={() => setCategory('financial')} />
              <CategoryChip label="Emotional" active={category==='emotional'} onClick={() => setCategory('emotional')} />
              <CategoryChip label="Academical" active={category==='academical'} onClick={() => setCategory('academical')} />
              <CategoryChip label="Personal" active={category==='personal'} onClick={() => setCategory('personal')} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              Post anonymously
            </label>
            <span className="badge">{anonymous ? 'Anonymous' : username || 'NFSS-...'}</span>
          </div>
          <label>
            <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6 }}>Your message</span>
            <textarea required value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Describe the welfare matter..." />
          </label>
          <div>
            <button type="submit">Post</button>
          </div>
          {status && <div className="muted">{status}</div>}
        </div>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        <div className="chips" role="group" aria-label="Filter">
          <CategoryChip label="All" active={filter==='all'} onClick={() => setFilter('all')} count={posts.length} />
          <CategoryChip label="Financial" active={filter==='financial'} onClick={() => setFilter('financial')} count={counts.financial} />
          <CategoryChip label="Emotional" active={filter==='emotional'} onClick={() => setFilter('emotional')} count={counts.emotional} />
          <CategoryChip label="Academical" active={filter==='academical'} onClick={() => setFilter('academical')} count={counts.academical} />
          <CategoryChip label="Personal" active={filter==='personal'} onClick={() => setFilter('personal')} count={counts.personal} />
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: '1rem' }}>
        {filteredPosts.map((p) => (
          <article key={p.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--color-primary)', textTransform: 'capitalize' }}>{p.category}</strong>
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


