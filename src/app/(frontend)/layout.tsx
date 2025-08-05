import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'
import localFont from 'next/font/local'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { SmoothScroll } from '@/components/smooth-scroll'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
// import Cursor from '@/components/cursor'

const Mori = localFont({
  variable: '--font-mori',
  src: '../../fonts/PPMori-VariableVF.woff2',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(Mori.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />

        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        {/* <Cursor /> */}
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  minimumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@bluebeecreation',
  },
}
