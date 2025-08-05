'use client'

import React, { useRef } from 'react'
import { Logos } from '../svg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(useGSAP)

export const Logo = () => {
  const pathname = usePathname()
  const logoRef = useRef<HTMLDivElement | null>(null)

  // Extract logo logic to a separate function
  const getLogo = () => {
    if (pathname === '/') return <Logos.type className="h-10 w-auto" />
    if (pathname === '/contact') return <Logos.typeBW className="h-10 w-auto" />
    return <Logos.typeDark className="h-10 w-auto" />
  }

  useGSAP(() => {
    if (!logoRef.current) return
    // Create timeline with initial states
    gsap.set(logoRef.current, {
      opacity: 0, // Start hidden
      y: 20, // Start 20px below
    })

    // Animation
    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      delay: 1,
      ease: 'power2.out', // Smoother easing
      overwrite: 'auto', // Prevents conflicts
    })
  })
  return (
    <div className="opacity-0" ref={logoRef}>
      {getLogo()}
    </div>
  )
}
