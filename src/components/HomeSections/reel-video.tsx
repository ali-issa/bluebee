'use client'

import { Icons } from '@/components/svg' // Adjust path
import { Media } from '@/payload-types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useLayoutEffect, FC } from 'react'
import { getClientSideURL } from '@/utilities/getURL'

gsap.registerPlugin(useGSAP)

type ReelVideoProps = {
  video?: Media | number | null

  videoPoster?: Media | number | null
}

const ReelVideo: FC<ReelVideoProps> = ({ video, videoPoster }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const animation = useRef<gsap.core.Timeline | null>(null)
  const originalBounds = useRef<DOMRect | null>(null) // Use DOMRect from getBoundingClientRect

  // --- Initial Fade-in Animation ---
  useGSAP(
    () => {
      // Set initial state directly here, NOT via className="opacity-0"
      if (!containerRef.current) return
      gsap.set(containerRef.current, { y: 20 }) // Start invisible and slightly down
      gsap.to(containerRef.current, {
        opacity: 1, // Fade in
        y: 0, // Move up
        duration: 1.5,
        delay: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    },
    { scope: containerRef }, // Scope ensures cleanup on unmount
  )

  // --- Click Handler for Expand/Collapse ---
  const handleToggleExpand = () => {
    if (!containerRef.current || !backdropRef.current) return

    // Kill previous animation
    if (animation.current) {
      animation.current.kill()
    }

    const target = containerRef.current
    const backdrop = backdropRef.current
    const duration = 0.6
    const ease = 'power3.inOut'
    const margin = 40
    const videoAspectRatio = 16 / 9

    if (!isExpanded) {
      // --- Expand Animation ---
      originalBounds.current = target.getBoundingClientRect() // Capture bounds relative to viewport

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const availableWidth = viewportWidth - margin * 2
      const availableHeight = viewportHeight - margin * 2

      let targetWidth = availableWidth
      let targetHeight = targetWidth / videoAspectRatio
      if (targetHeight > availableHeight) {
        targetHeight = availableHeight
        targetWidth = targetHeight * videoAspectRatio
      }
      const targetTop = (viewportHeight - targetHeight) / 2
      const targetLeft = (viewportWidth - targetWidth) / 2

      animation.current = gsap.timeline({
        onComplete: () => setIsExpanded(true),
        // Prevent potential flashes by preparing styles immediately
        onStart: () => {
          // Ensure target is positioned fixed right away for calculations
          gsap.set(target, { position: 'fixed', zIndex: 50, margin: 0 })
          // Ensure backdrop is ready to fade in
          gsap.set(backdrop, { display: 'block', opacity: 0 })
        },
      })

      // Animate backdrop
      animation.current.to(
        backdrop,
        {
          opacity: 1,
          duration: duration * 0.8,
          ease: ease,
        },
        0,
      )

      // Animate video container FROM captured state TO calculated state
      animation.current.fromTo(
        target,
        {
          // Start exactly where it was
          top: originalBounds.current.top,
          left: originalBounds.current.left,
          width: originalBounds.current.width,
          height: originalBounds.current.height,
          borderRadius: window.getComputedStyle(target).borderRadius, // Get actual current border radius
        },
        {
          // Animate TO calculated centered state
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
          borderRadius: '0.5rem',
          duration: duration,
          ease: ease,
          overwrite: 'auto',
        },
        0,
      )
    } else {
      // --- Collapse Animation ---

      if (!originalBounds.current) {
        console.warn('Original bounds not captured, attempting fallback collapse.')
        // Minimal fallback (might jump)
        gsap.to(target, {
          scale: 0.95, // Slight scale down for visual cue
          opacity: 0,
          duration: duration * 0.5,
          ease: ease,
          onComplete: () => {
            gsap.set(target, { clearProps: 'all' }) // Try to reset everything
            setIsExpanded(false)
          },
        })
        gsap.to(backdrop, {
          opacity: 0,
          duration: duration * 0.5,
          ease: ease,
          onComplete: () => {
            gsap.set(backdrop, { display: 'none' })
          },
        })
        return
      }

      animation.current = gsap.timeline({
        onComplete: () => {
          const propsToClear = 'position,top,left,width,height,zIndex,borderRadius,margin' // Be specific
          gsap.set(target, { clearProps: propsToClear })

          // Hide backdrop AFTER container animation is done and props are cleared
          gsap.set(backdrop, { display: 'none', opacity: 0 }) // Ensure it's hidden

          originalBounds.current = null // Clear saved bounds
          setIsExpanded(false) // Update state LAST
        },
      })

      // Animate backdrop fade out first or concurrently
      animation.current.to(
        backdrop,
        {
          opacity: 0,
          duration: duration * 0.8, // Fade out slightly faster
          ease: ease,
        },
        0,
      )

      // Animate video container back TO original bounds
      animation.current.to(
        target,
        {
          top: originalBounds.current.top,
          left: originalBounds.current.left,
          width: originalBounds.current.width,
          height: originalBounds.current.height,
          borderRadius: '1rem', // Animate back to original radius (adjust if needed)
          zIndex: 49, // Lower zIndex slightly during transition (optional)
          duration: duration,
          ease: ease,
          overwrite: 'auto',
        },
        0,
      )
    }
  }

  // Resize handling (keep as is)
  useLayoutEffect(() => {
    const handleResize = () => {
      if (isExpanded && containerRef.current) {
        const margin = 40
        const videoAspectRatio = 16 / 9
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const availableWidth = viewportWidth - margin * 2
        const availableHeight = viewportHeight - margin * 2
        let targetWidth = availableWidth
        let targetHeight = targetWidth / videoAspectRatio
        if (targetHeight > availableHeight) {
          targetHeight = availableHeight
          targetWidth = targetHeight * videoAspectRatio
        }
        const targetTop = (viewportHeight - targetHeight) / 2
        const targetLeft = (viewportWidth - targetWidth) / 2
        gsap.to(containerRef.current, {
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isExpanded])

  return (
    <>
      {/* Backdrop Element */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 hidden bg-black/80 backdrop-blur-md pointer-events-none" // pointer-events-none is usually correct
        onClick={handleToggleExpand} // Allow click to close
        // Ensure initial opacity is 0 even if display:block is set by GSAP early
        style={{ opacity: 0 }}
      />

      {/* Video Container */}

      <div
        ref={containerRef}
        onClick={handleToggleExpand}
        // REMOVED opacity-0 from here! Initial state set by useGSAP.
        // Base layout styles remain.
        className={`opacity-0 cursor-pointer rounded-2xl aspect-video overflow-hidden flex items-center justify-center
md:absolute right-[20%] bottom-[20%] md:w-[30%] w-[90%] mt-8 md:mt-0 h-auto
${isExpanded ? 'z-50' : 'z-10'}
`}
        // REMOVED inline style for position. Rely on CSS and GSAP/clearProps.
        // Add position:absolute IF NEEDED by your base CSS structure, but often the classes handle it.
        // style={{ position: 'absolute' }} // Example if your CSS requires it explicitly
      >
        {/* Video Element */}
        <video
          className="absolute size-full object-contain"
          muted
          playsInline
          autoPlay
          loop
          // @ts-ignore to fix
          poster={videoPoster?.url}
        >
          {/* @ts-ignore to fix */}
          <source src={video?.url} />
        </video>

        {/* Play Icon */}
        {!isExpanded && (
          <Icons.play className="opacity-45 size-12 text-background pointer-events-none relative z-10" />
        )}

        {/* Close Button */}
        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleExpand()
            }}
            className="absolute top-5 right-5 z-[51] text-white bg-black/60 rounded-full p-2 transition-opacity hover:opacity-80" // Ensure button is above container (z-50)
            aria-label="Close video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}

export default ReelVideo
