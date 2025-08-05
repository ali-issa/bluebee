'use client'

import React, { useRef, useLayoutEffect, useState, useId } from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from '@/lib/MorphSVGPlugin' // Keeping your original import
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'

// Register GSAP plugins (Keeping your original registration approach)
gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger)

// --- SVG Path Data ---
const defaultRectPath = 'M0 0 H660 V660 H0 Z'
const randomWavyPaths = [
  'M0 20C0 8.95431 8.95431 0 20 0H640C651.046 0 660 8.95431 660 20V273.428C660 293.345 632.497 302.094 619.824 286.728C592.322 253.379 555.921 217 528 217C476.451 217 447.549 349.5 396 349.5C344.451 349.5 315.549 100 264 100C212.451 100 186.526 470 132 470C80.0222 470 7.19047 174.21 0.49727 146.566C0.130269 145.05 0 143.712 0 142.153V20Z',
  'M0 20C0 8.95431 8.95431 0 20 0H640C651.046 0 660 8.95431 660 20V178.998C660 181.64 659.527 184.139 658.486 186.567C647.205 212.89 575.39 376 528 376C476.451 376 447.549 210.5 396 210.5C344.451 210.5 315.549 484 264 484C212.451 484 190 137.5 119 137.5C88.7592 137.5 62.6909 148.113 42.7269 160.298C26.6953 170.082 0 158.877 0 140.095V20Z',
  'M0 20C0 8.95431 8.95431 0 20 0H640C651.046 0 660 8.95431 660 20V257.791C660 276.718 635.047 285.974 621.649 272.606C593.948 244.966 556.543 214 528 214C476.451 214 447.549 463.5 396 463.5C344.451 463.5 315.549 159 264 159C212.451 159 190 334.5 119 334.5C53.0114 334.5 6.89062 182.901 0.708624 161.5C0.213951 159.787 0 158.097 0 156.314V20Z',
  'M0 20C0 8.95431 8.95431 0 20 0H640C651.046 0 660 8.95431 660 20V187.429C660 191.697 658.676 195.803 656.051 199.169C640.389 219.252 581.334 291 537 291C485.451 291 447.549 117 396 117C344.451 117 315.549 459 264 459C212.451 459 190 272 119 272C95.7351 272 74.9397 287.086 57.4934 307.37C42.755 324.507 0 314.697 0 292.095V20Z',
]
const collapsedPath = 'M0 1 L660 1 L660 2 L0 2 Z'
// --- --- ---

// Function to generate random number in a range
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

interface LiquidMaskImageProps {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  animationSpeed?: number
  scrollTriggerStart?: string
  scrollTriggerOnce?: boolean
  delay?: number // Keep the delay prop
}

const LiquidMaskImage: React.FC<LiquidMaskImageProps> = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  animationSpeed = 1,
  scrollTriggerStart = 'top 85%',
  scrollTriggerOnce = true,
  delay = 0, // Keep the delay
}) => {
  const figureRef = useRef<HTMLElement>(null)
  const maskPathRef = useRef<SVGPathElement>(null)
  const imageRef = useRef<SVGImageElement>(null)
  const hookId = useId()
  const maskId = `mask-${hookId}`

  // Random intermediate shape (per instance)
  const [morphShape] = useState(
    () => randomWavyPaths[Math.floor(Math.random() * randomWavyPaths.length)],
  )

  // --- NEW: Randomize animation durations per instance ---
  const [durationMorphToWavy] = useState(() => randomRange(0.6, 1.0)) // e.g., 0.6s to 1.0s
  const [durationMorphToRect] = useState(() => randomRange(0.5, 0.8)) // e.g., 0.5s to 0.8s
  // --- --- ---

  useLayoutEffect(() => {
    if (!figureRef.current || !maskPathRef.current || !imageRef.current) return
    if (!MorphSVGPlugin || !ScrollTrigger) {
      console.warn('GSAP MorphSVGPlugin or ScrollTrigger not loaded.')
      return
    }

    const ctx = gsap.context(() => {
      // --- Initial Setup ---
      gsap.set(maskPathRef.current, { attr: { d: collapsedPath } })
      gsap.set(imageRef.current, { opacity: 1 })

      // --- Animation Timeline ---
      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power2.out' },
          delay: delay, // Apply instance-specific delay
        })
        .timeScale(animationSpeed)

      // Animation Step 1: Morph from collapsed to the random wavy shape
      tl.to(
        maskPathRef.current,
        {
          morphSVG: morphShape,
          // --- Use randomized duration ---
          duration: durationMorphToWavy,
          ease: 'power1.inOut',
        },
        0,
      )

      // Animation Step 2: Morph from the wavy shape to the final rectangle shape
      tl.to(
        maskPathRef.current,
        {
          morphSVG: defaultRectPath,
          // --- Use randomized duration ---
          duration: durationMorphToRect,
          ease: 'power2.out',
        },
        // Keep overlap relatively consistent, or adjust based on durations if needed
        '>-=0.2',
        // Example: relative overlap: `>-=${durationMorphToWavy * 0.75}`
      )

      // --- ScrollTrigger Setup ---
      ScrollTrigger.create({
        trigger: figureRef.current,
        start: scrollTriggerStart,
        once: scrollTriggerOnce,
        animation: tl,
        // markers: true,
      })
    }, figureRef)

    return () => ctx.revert()
    // --- Add randomized durations to dependency array ---
  }, [
    morphShape,
    animationSpeed,
    scrollTriggerStart,
    scrollTriggerOnce,
    delay,
    durationMorphToWavy, // Add dependency
    durationMorphToRect, // Add dependency
  ])

  return (
    <figure
      ref={figureRef}
      className={cn('relative size-full m-0 p-0 overflow-hidden leading-none', className)}
    >
      <svg
        viewBox="0 0 660 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <mask id={maskId}>
          <path ref={maskPathRef} d={collapsedPath} fill="white" />
        </mask>
        <image
          ref={imageRef}
          width="100%"
          height="100%"
          mask={`url(#${maskId})`}
          href={src} // Use href for SVG image
          // preserveAspectRatio="xMidYMid slice"
          aria-label={alt}
          className={cn(imgClassName)}
        />
      </svg>
    </figure>
  )
}

export default LiquidMaskImage
