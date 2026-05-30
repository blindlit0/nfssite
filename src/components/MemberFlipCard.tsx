
'use client'

import { useState } from 'react'
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

export default function MemberFlipCard({ member, backText }: { member: Member; backText?: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div style={{ perspective: '800px' }} className="w-full">
      <div
        className={`relative w-72 h-80 mx-auto transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
        onClick={() => setFlipped((s) => !s)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl card flex flex-col items-center justify-center p-4 text-center ${flipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <Image src={member.photoUrl || '/placeholder-avatar.png'} alt={member.name} width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-3" />
          <h4 className="font-semibold text-white">{member.name}</h4>
          <div className="text-sm text-white">
            <div>{member.course}</div>
            <div>Year {member.year}</div>
          </div>
          <p className="text-xs text-white mt-2">Click to view</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl card flex items-center justify-center p-4 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <p className="text-sm text-white leading-relaxed">{backText || member.bio || 'No details provided.'}</p>
            <p className="text-xs text-white mt-3">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  )
}
