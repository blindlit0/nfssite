'use client';

import { useState, useEffect } from 'react';

const shapes = [
  {
    // Square
    d: 'M10,10 L90,10 L90,90 L10,90 L10,10 Z'
  },
  {
    // Circle
    d: 'M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z'
  },
  {
    // Triangle
    d: 'M50,10 L90,90 L10,90 L50,10 Z'
  },
  {
    // Star
    d: 'M50,10 L61.8,38.2 L90,38.2 L68.2,56.8 L79.2,85 L50,66.8 L20.8,85 L31.8,56.8 L10,38.2 L38.2,38.2 Z'
  }
];

export function ShapeShifter() {
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prevShape) => (prevShape + 1) % shapes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      <svg viewBox="0 0 100 100" className="absolute top-1/4 left-1/4 w-24 h-24">
        <path
          d={shapes[currentShape].d}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          style={{ transition: 'd 1s ease-in-out' }}
        />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute top-3/4 left-3/4 w-16 h-16">
        <path
          d={shapes[(currentShape + 1) % shapes.length].d}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          style={{ transition: 'd 1s ease-in-out' }}
        />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 w-20 h-20">
        <path
          d={shapes[(currentShape + 2) % shapes.length].d}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          style={{ transition: 'd 1s ease-in-out' }}
        />
      </svg>
    </div>
  );
}
