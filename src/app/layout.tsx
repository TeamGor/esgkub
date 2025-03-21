'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import Navbar from './components/Navbar'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
