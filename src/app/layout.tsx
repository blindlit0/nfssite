import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { ShapeShifter } from '@/components/ShapeShifter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Department of Food Science & Nutrition',
  description: 'Advancing food science, human nutrition, and public health through research, education, and community impact.',
  icons: {
    icon: '/nfssslogo.jpg',
    apple: '/favicon.svg',
  },
}

import StyledComponentsRegistry from '../lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <ShapeShifter />
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

