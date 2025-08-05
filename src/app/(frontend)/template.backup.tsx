'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { HTMLAttributes, useRef } from 'react'

const Template: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const pathname = usePathname()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const rec1Ref = useRef<HTMLDivElement | null>(null)
  const rec2Ref = useRef<HTMLDivElement | null>(null)
  const rec3Ref = useRef<HTMLDivElement | null>(null)
  const rec4Ref = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!rec1Ref.current || !rec2Ref.current || !rec3Ref.current || !rec4Ref.current) return

      const tl = gsap.timeline()

      tl.set([rec1Ref.current, rec2Ref.current, rec3Ref.current, rec4Ref.current], {
        yPercent: 0,
      }).to([rec1Ref.current, rec2Ref.current, rec3Ref.current, rec4Ref.current], {
        yPercent: 100,
        stagger: 0.2,
      })
    },
    { scope: containerRef, dependencies: [pathname] },
  )

  return (
    <div ref={containerRef}>
      <div ref={rec1Ref} className="min-h-svh bg-primary z-50 fixed top-0 left-0 w-1/4" />
      <div ref={rec2Ref} className="min-h-svh bg-primary z-50 fixed top-0 left-1/4 w-1/4" />
      <div ref={rec3Ref} className="min-h-svh bg-primary z-50 fixed top-0 left-2/4 w-1/4" />
      <div ref={rec4Ref} className="min-h-svh bg-primary z-50 fixed top-0 left-3/4 w-1/4" />
      {children}
    </div>
  )
}

export default Template
