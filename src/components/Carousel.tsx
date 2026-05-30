"use client";

import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect
import Image from 'next/image';

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0); // 0-indexed
  const [visible, setVisible] = useState(false)

  const slides = [
    {
      imgSrc: "/deborah.jpg",
      alt: "Motorbike Smoke"
    },
    {
      imgSrc: "/pearl.jpg",
      alt: "Mountaintop"
    },
    {
      imgSrc: "/jude.jpg",
      alt: "Woman Reading a Book"
    },
    {
      imgSrc: "/eunice.jpg",
      alt: "Woman Reading a Book"
    },
    {
      imgSrc: "/krystle.jpg",
      alt: "Woman Reading a Book"
    },
    {
      imgSrc: "/eli.jpg",
      alt: "Woman Reading a Book"
    }
  ];

  // Functions to handle next/prev slides (stable with useCallback)
  const goToNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [goToNextSlide]); // Dependency array: restart effect if goToNextSlide changes

  // mount fade-in (use a slightly longer delay for reliable transition)
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(id)
  }, [])

  return (
    <div
      id="carouselDarkVariant"
      className={`relative rounded-lg overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} 
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 600ms ease' }}
    
    >
      {/* Carousel indicators */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${
              activeSlide === index ? 'opacity-100' : ''
            }`}
            aria-current={activeSlide === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel items */}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-[460px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
              activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full"> {/* Fill parent height */}
              <Image
                src={slide.imgSrc}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Label and description removed */}
          </div>
        ))}
      </div>

      {/* Carousel controls - prev item*/}
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={goToPrevSlide}
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Previous</span>
      </button>
      {/* Carousel controls - next item*/}
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={goToNextSlide}
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Next</span>
      </button>
    </div>
  );
}
