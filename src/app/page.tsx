'use client';

import React from 'react';
import NewHeader from '../components/NewHeader';
import Carousel from '../components/Carousel';
import GoodCard from '../components/GoodCard';
import HeroBlurb from '../components/HeroBlurb'
import Image from 'next/image'
import Link from 'next/link';
import JustSoYouKnow from '@/components/JustSoYouKnow';
export default function Home() {
  return (
    <>
  <NewHeader />
  <HeroBlurb />

  <main className="bg-[#1a1f2e] px-6 md:px-12 pb-24 space-y-10">

    {/* TEAM + CAROUSEL SECTION */}
    <section className="max-w-7xl mx-auto">
      <div className="rounded-[2rem] border border-white/10 bg-[1a1f2e] p-6 md:p-10 shadow-2xl">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2">
            <Carousel />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">

            <div className="inline-block bg-[#8aa52b] text-black text-xs px-4 py-2 rounded-full font-medium mb-5">
              Welfare Team
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Meet The People <br />
              Behind The Support
            </h2>

            <p className="mt-5 text-gray-300 max-w-md leading-relaxed">
              Get to know the dedicated members working to improve student welfare,
              organize activities, and support the Nutrition & Food Science community.
            </p>

            <Link href="/welfare/members">
              <button className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
                Meet The Team
              </button>
            </Link>

          </div>

        </div>
      </div>
    </section>

    {/* GOOD CARD SECTION */}
    <section className="max-w-7xl mx-auto">

      <div className="rounded-[2rem] border border-white/10 bg-[#3a5200] p-6 md:p-10 shadow-2xl">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* TEXT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            <div className="inline-block bg-[#8aa52b] text-black text-xs px-4 py-2 rounded-full font-medium mb-5">
              Daily Motivation
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Take A Look Behind <br />
              The Card
            </h2>

            <p className="mt-5 text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              Small reminders and positive messages to help brighten your day
              and encourage a healthier student experience.
            </p>

          </div>
  
          {/* CARD */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <GoodCard />
          </div>

        </div>

      </div>

    </section>
    
  </main>
  <JustSoYouKnow />
</>
  )
}

