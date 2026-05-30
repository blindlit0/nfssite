"use client"

import React from 'react'
import Image from 'next/image'

type Props = {
  title?: string
  description?: string
  imageUrl?: string
  reverse?: boolean
}

export default function FEvent({
  title = 'Food Bank Initiative',
  description = 'The Welfare Committee is launching a structured food bank to support students facing food shortages during the semester. Donations will be collected and distributed to students in need later in the term.',
  imageUrl = '/foodbank.jpg',
  reverse = false,
}: Props) {

  const textBlock = (
    <div className="flex items-center justify-center p-8 md:p-14">

      <div className="max-w-2xl text-center lg:text-left">

        {/* SMALL LABEL */}
        <div className="inline-block bg-black text-white text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          Welfare Update
        </div>

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          {description}
        </p>


      </div>

    </div>
  )

  const imageBlock = (
    <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden">

      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover hover:scale-105 transition duration-700"
        unoptimized
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

    </div>
  )

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-white to-white py-16">


      {/* MAIN EVENT CARD */}
      <div className="w-full rounded-none md:rounded-[2rem] overflow-hidden bg-white shadow-2xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {reverse ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}

        </div>

      </div>

    </section>
  )
}