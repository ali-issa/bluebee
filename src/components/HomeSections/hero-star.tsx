'use client'

import gsap from 'gsap'
import { Illustrations } from '@/components/svg'
import { useGSAP } from '@gsap/react'
import React from 'react'

gsap.registerPlugin(useGSAP)

const HeroStar = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
      },
    })

    // Fade in with rotation
    tl.fromTo(
      '.star',
      {
        opacity: 0,
        scale: 0.5,
        rotateZ: 0,
      },
      {
        opacity: 1,
        scale: 1,
        rotateZ: 360, // One full rotation during fade-in
        duration: 4, // 3 seconds for 360 degrees
        ease: 'linear',
      },
    )

    // Continue infinite rotation at same speed
    tl.to('.star', {
      rotateZ: '+=360', // Continue with another 360 degrees
      duration: 4, // Same 3 seconds per rotation
      repeat: -1, // Infinite repeats
      ease: 'linear',
    })
  })

  return <Illustrations.star className="star size-24 absolute right-8 md:right-32 opacity-0" />
}

export default HeroStar
