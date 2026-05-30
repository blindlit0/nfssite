
 'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

type Member = {
  id?: string
  name: string
  course?: string
  year?: string
  phone?: string
  bio?: string
  photoUrl?: string
}

export default function MemberCarousel({ members }: { members: Member[] }) {
  const [index, setIndex] = useState(0)
  const membersPerSlide = 3

  // Create slides (each slide contains up to 3 members stacked)
  const slides: Member[][] = useMemo(() => {
    const s: Member[][] = []
    for (let i = 0; i < members.length; i += membersPerSlide) {
      s.push(members.slice(i, i + membersPerSlide))
    }
    return s
  }, [members])

  // auto-advance slides
  useEffect(() => {
    if (!slides || slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3500)
    return () => clearInterval(id)
  }, [slides])

  // Visual sizes
  const itemHeight = 128 // px per member row (increased for larger images)
  const containerHeight = itemHeight * membersPerSlide

  return (
    <div className="w-full flex justify-center">
      <div className="w-full overflow-hidden" style={{ height: `${containerHeight}px` }}>
        <div
          style={{ transform: `translateY(-${index * 100}%)`, transition: 'transform 600ms ease' }}
          className="h-full"
        >
          {slides.map((slide, sIdx) => (
            <div key={sIdx} className="h-full flex flex-col">
              {slide.map((m) => (
                <div key={m.id} className="flex-1 flex items-center justify-center border-b border-slate-100">
                  <div className="w-full px-4 flex items-center gap-4">
                    <Image src={m.photoUrl || '/placeholder-avatar.png'} alt={m.name} width={112} height={112} className="w-28 h-28 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-slate-900 truncate">{m.name}</h5>
                      <div className="text-xs text-slate-500 truncate">{m.course} • Year {m.year}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
