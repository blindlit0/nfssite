'use client'

import { useState } from 'react'
import Image from 'next/image'
import NavLinks from './NavLinks'
import MenuIcon from './MenuIcon'
import SocialMediaIcons from './SocialMediaIcons'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false) // Restore useState

  return (
    <div className="min-h-screen flex flex-col">
      {/* Original Header */}
      <header className="border-b border-gray-700 py-4 sticky top-0 z-50 bg-transparent backdrop-blur-sm">
        <nav className="container flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src="/nfssslogo.jpg"
              alt="NFS Logo"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="font-extrabold text-lg text-gray-100">Dept. of Food Science & Nutrition</span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <NavLinks />
          </div>
          <button
            className="md:hidden bg-transparent border-0 flex items-center"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#10b981' }}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-transparent">
            <div className="container flex flex-col py-4 gap-3">
              <NavLinks isMobile onLinkClick={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 py-0">{children}</main>

        <footer className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between px-1 mx-auto space-y-0 sm:space-y-0 sm:flex-row py-2">
          <a href="#">
            <Image className="w-auto h-14" src="/nfssslogo.jpg" alt="NFS Logo" width={56} height={56} />
          </a>

            <p className="text-sm text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} Department of Food Science & Nutrition. All Rights Reserved.</p>

            <SocialMediaIcons />
        </div>
      </footer>
    </div>
  )
}