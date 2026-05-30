'use client'

import { useState, useEffect } from 'react'

// Ensure consistent ordering to avoid hydration issues
const frontMessages = [
  'Wanna know something cool?',
  'Tap on me!',
  'Click me for a surprise!',
  'Something amazing awaits...',
  'Curious? Tap me!',
  'You\'re in for a treat!',
  'Discover something great!',
  'Ready for inspiration?',
  'Tap to reveal!',
  'Click for motivation!',
  'Something special awaits...',
  'Ready to be inspired?',
]

const motivationalQuotes = [
  "Believe you can and you're halfway there. —Theodore Roosevelt",
  "The only way to do great work is to love what you do. —Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. —Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. —Eleanor Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. —Winston Churchill",
  "In the middle of difficulty lies opportunity. —Albert Einstein",
  "The only impossible journey is the one you never begin. —Tony Robbins",
  "It does not matter how slowly you go as long as you do not stop. —Confucius",
  "You are never too old to set another goal or to dream a new dream. —C.S. Lewis",
  "Success is the sum of small efforts repeated day in and day out. —Robert Collier",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream big and dare to fail. —Norman Vaughan",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big things happen. —John Wooden",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "The way to get started is to quit talking and begin doing. —Walt Disney",
  "Innovation distinguishes between a leader and a follower. —Steve Jobs",
  "Life is what happens to you while you're busy making other plans. —John Lennon",
  "People who are crazy enough to think they can change the world, are the ones who do. —Rob Siltanen",
  "Failure will never overtake me if my determination to succeed is strong enough. —Og Mandino",
  "We may encounter many defeats but we must not be defeated. —Maya Angelou",
  "The only person you are destined to become is the person you decide to be. —Ralph Waldo Emerson",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Stop wishing. Start doing.",
  "Motivation comes from working on things we care about. —Sheryl Sandberg",
  "Be yourself; everyone else is already taken. —Oscar Wilde",
  "Whatever you are, be a good one. —Abraham Lincoln",
]

export default function Flipbox() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [frontMessage, setFrontMessage] = useState(frontMessages[0]) // Use first message as default to avoid hydration mismatch
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]) // Use first quote as default
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted and set random front message (client-side only)
    setMounted(true)
    setFrontMessage(frontMessages[Math.floor(Math.random() * frontMessages.length)])
  }, [])

  const handleFlip = () => {
    if (!isFlipped) {
      // Flipping to back - generate new quote
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      setCurrentQuote(randomQuote)
    } else {
      // Flipping back to front - generate new front message
      const randomMessage = frontMessages[Math.floor(Math.random() * frontMessages.length)]
      setFrontMessage(randomMessage)
    }
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="mb-12" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-64 transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 w-full h-full cursor-pointer ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div className="card h-full flex items-center justify-center bg-gradient-to-br from-red-600/10 via-blue-600/10 to-green-600/10 hover:from-red-600/15 hover:via-blue-600/15 hover:to-green-600/15 border-2 border-red-500/20 hover:border-red-500/30 transition-all duration-300">
            <div className="text-center px-6">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-xl font-bold text-red-600 mb-2">
                {mounted ? frontMessage : frontMessages[0]}
              </p>
              <p className="text-sm text-slate-500">Click to flip</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 w-full h-full cursor-pointer ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="card h-full flex items-center justify-center bg-gradient-to-br from-blue-600/10 via-green-600/10 to-red-600/10 hover:from-blue-600/15 hover:via-green-600/15 hover:to-red-600/15 border-2 border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
            <div className="text-center px-6 max-w-md">
              <div className="text-4xl mb-4">💡</div>
              <p className="text-lg font-semibold text-slate-800 mb-2 leading-relaxed">
                {currentQuote}
              </p>
              <p className="text-sm text-slate-500 mt-4">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

