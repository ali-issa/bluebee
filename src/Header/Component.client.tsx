'use client'
import Link from 'next/link'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Logo } from '@/components/Logo/Logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */

  const pathname = usePathname()

  return (
    <header
      className={cn('top-0 left-0 z-40 w-full', pathname === '/services' ? 'fixed' : 'absolute')}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-32">
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
