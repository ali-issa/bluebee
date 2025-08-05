'use client'

import { useRef, useEffect, FC } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

// Register GSAP plugins
gsap.registerPlugin(useGSAP, SplitType)

// Extend HTMLLIElement to include a `letters` property for SplitText
interface SlideElement extends HTMLLIElement {
  letters?: HTMLElement[]
}

type VerticalTextSliderProps = {
  lines: { text?: string | null | undefined; id?: string | null | undefined }[]
}

export const VerticalTextSlider: FC<VerticalTextSliderProps> = ({ lines }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const slidesRef = useRef<SlideElement[]>([])
  const vSlide = useRef<gsap.core.Timeline | null>(null)

  // Animation function with typed parameters
  const animateTitle = (height: number) => {
    const vsOpts = {
      slides: slidesRef.current,
      list: listRef.current,
      duration: 0.3,
      lineHeight: height,
    }

    // Record current progress if animation exists
    const progress = vSlide.current ? vSlide.current.progress() : 0

    // Revert existing animation if it exists
    if (vSlide.current) {
      vSlide.current.revert()
    }

    // Create a new GSAP timeline
    vSlide.current = gsap.timeline({ repeat: -1 })

    vsOpts.slides.forEach((slide: SlideElement, i: number) => {
      if (!vSlide.current) return

      // Initial positioning
      gsap.set(slide, { y: i * -2 * vsOpts.lineHeight })

      // Create a label for each slide
      const label = `slide${i}`
      vSlide.current.add(label)

      // Split text into characters if not already done, with a fallback
      let letters: HTMLElement[] = slide.letters || []
      if (!letters.length && slide) {
        const split = new SplitType(slide, { types: 'chars' })
        letters = slide.letters = split.chars as HTMLElement[]
      }

      // Animate the whole list upward
      if (i > 0 && vsOpts.list) {
        vSlide.current.to(
          vsOpts.list,
          {
            duration: vsOpts.duration,
            y: i * vsOpts.lineHeight,
          },
          label,
        )

        // Animate each letter coming up (only if letters exist)
        if (letters.length) {
          vSlide.current.from(
            letters,
            {
              duration: vsOpts.duration,
              y: -height,
              stagger: vsOpts.duration / 30,
            },
            label,
          )
        }
      }

      // Animate letters moving down (except for the last slide, only if letters exist)
      if (i < vsOpts.slides.length - 1 && letters.length) {
        vSlide.current.to(
          letters,
          {
            delay: 2,
            duration: vsOpts.duration,
            y: height,
            stagger: vsOpts.duration / 30,
          },
          '+=1',
        )
      }
    })

    // Restore progress
    if (vSlide.current) {
      vSlide.current.progress(progress)
    }
  }

  // GSAP Animation Hook with TypeScript
  useGSAP(
    () => {
      const elementHeight = slidesRef.current[0]?.clientHeight || 0
      if (elementHeight) {
        animateTitle(elementHeight)
      }
    },
    { scope: containerRef },
  )

  // Handle window resize with TypeScript
  useEffect(() => {
    const handleResize = () => {
      const elementHeight = slidesRef.current[0]?.clientHeight || 0
      if (elementHeight) {
        animateTitle(elementHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array since this only runs on mount/unmount

  useGSAP(() => {
    if (!containerRef.current) return
    // Create timeline with initial states
    gsap.set(containerRef.current, {
      opacity: 0, // Start hidden
      y: 20, // Start 20px below
    })

    // Animation
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      delay: 1.5,
      ease: 'power2.out', // Smoother easing
      overwrite: 'auto', // Prevents conflicts
    })
  })

  return (
    <div
      ref={containerRef}
      className="md:h-[24px] h-[15px] overflow-hidden opacity-0 relative z-10"
    >
      <ul ref={listRef} className="v-slides list-none p-0 m-0">
        {[...lines, lines[0]].map((line, index) => (
          <li
            key={index}
            ref={(el) => {
              if (el) slidesRef.current[index] = el // Type-safe ref assignment
            }}
            className="md:text-[24px] text-[15px] leading-[15px]  md:leading-[24px] text-[#4BB3FD] uppercase tracking-widest"
          >
            {line?.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
