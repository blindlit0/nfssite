"use client"

import React from 'react'
import Link from 'next/link'

export default function HeroBlurb() {
  return (
    <section className="bg-[#1a1f2e] px-6 md:px-12 py-20">
      
      <div className="max-w-6xl mx-auto">
        
        <div className="rounded-[2rem] border border-white/10 bg-[#0f0f0f] p-8 md:p-14 shadow-2xl relative overflow-hidden">

          {/* subtle background glow */}
          <div className="absolute -top-40 -right-20 w-64 h-64 bg-[#8aa52b]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">

            {/* small tag */}
            <div className="inline-block bg-[#8aa52b] text-black text-xs px-4 py-2 rounded-full font-medium mb-6">
              Welfare Support
            </div>

            {/* heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Here for you — <br className="hidden md:block" />
              anytime, anywhere
            </h1>

            {/* paragraph */}
            <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Share concerns, receive support, and stay informed about
              welfare activities. Anonymous posting is supported, and
              committee-only submissions remain private.
            </p>

            {/* buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                href="/welfare"
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition duration-300 shadow-lg"
              >
                Create a Post
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}