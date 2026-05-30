'use client'

import MemberFlipCard from '@/components/MemberFlipCard'
import { sampleMembers } from '@/data/members'

export default function WelfareMembersPage() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleMembers.map((member) => (
            <MemberFlipCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}