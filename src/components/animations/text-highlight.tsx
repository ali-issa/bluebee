'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HTMLAttributes, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitType)

export const TextHighlight: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wordsToSplitRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(
    () => {
      if (!wordsToSplitRef.current) return

      const splitText = new SplitType(wordsToSplitRef.current, {
        types: 'chars,words',
        tagName: 'span',
      })

      gsap.from(splitText.chars, {
        scrollTrigger: {
          trigger: wordsToSplitRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
        // filter: 'blur(4px)',
        ease: 'power3.inOut',
        opacity: 0.1,
        stagger: 0.1,
      })

      return () => {
        SplitType.clearData()
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} {...props}>
      <p ref={wordsToSplitRef}>{children}</p>
    </div>
  )
}
