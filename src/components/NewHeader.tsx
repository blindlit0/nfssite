"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; 

import Welcome from './Welcome';
import Link from 'next/link';
export default function NewHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <header className="bg-[#1a1f2e] text-white min-h-screen">
    
    {/* NAVBAR */}
    <nav className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
      
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8h16M4 16h16"
            />
          )}
        </svg>
      </button>
    </nav>

    {/* MOBILE MENU */}
    {isOpen && (
      <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-200">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Events</a>
        <a href="#">Contact</a>
      </div>
    )}

    {/* HERO SECTION */}
    <section className="px-6 md:px-12 pt-10 md:pt-20 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* LEFT SIDE */}
        <div className="max-w-xl">
          
          <div className="inline-block bg-[#8aa52b] text-black text-xs px-3 py-1 rounded-full mb-6 font-medium">
            Welcome
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome To The <br />
            NFSSS Welfare Page
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Our welfare team is here to support your wellbeing and
            academic success.
          </p>
      
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/events">
                <button className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition duration-300">
                Updates
                </button>
              </Link>

            {/*<button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition duration-300">
              Submit Concern
            </button>*/}

          </div>
        </div>

        {/* RIGHT SIDE */}
        {/*<div className="w-full max-w-[550px]">
          <div className="bg-[#7b9620] rounded-sm h-[420px] flex items-start justify-start p-6 relative overflow-hidden">

            <div className="bg-white text-black px-4 py-2 text-sm rounded shadow-md">
              NFSSS Welfare
            </div>

          </div>
        </div>
          */}
      </div>
    </section>
  </header>
);
}