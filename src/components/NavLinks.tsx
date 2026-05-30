
'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import StyledButton from './StyledButton'
import NavButton from './NavButton'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export default function NavLinks({ isMobile, onLinkClick }: NavLinksProps) {
  const { user, userData, signOut, isAdmin } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const linkProps = (href: string) => ({
    href,
    onClick: onLinkClick,
  })

  return (
    <>
      <Link {...linkProps("/")}><NavButton>Home</NavButton></Link>
      <Link {...linkProps("/welfare")}><NavButton>Posts</NavButton></Link>
      <Link {...linkProps("/events")}><NavButton>Events</NavButton></Link>
      {isAdmin && <Link {...linkProps("/admin")}><NavButton>Admin</NavButton></Link>}
      {user ? (
        isMobile ? (
          <>
            <div className="px-3 py-2 rounded-lg border border-gray-700 my-2 bg-emerald-900/50">
              <span className="text-sm font-semibold text-emerald-300">
                {userData?.nfsUsername || user.displayName || user.email}
              </span>
            </div>
            <StyledButton
              onClick={() => {
                handleSignOut()
                if (onLinkClick) onLinkClick()
              }}
            >
              Sign Out
            </StyledButton>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <div className="px-4 py-2 rounded-full border border-gray-700 bg-emerald-900/50">
              <span className="text-sm font-semibold text-emerald-300">
                {userData?.nfsUsername || user.displayName || user.email}
              </span>
            </div>
            <StyledButton onClick={handleSignOut}>
              Sign Out
            </StyledButton>
          </div>
        )
      ) : (
        <Link href="/login" onClick={onLinkClick}>
          <StyledButton onClick={onLinkClick}>Login</StyledButton>
        </Link>
      )}
    </>
  )
}
