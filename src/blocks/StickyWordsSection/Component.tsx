'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { memo, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import SplitType from 'split-type'
import Clouds from '@/components/HomeSections/clouds'
import { Icons } from '@/components/svg'
import { StickyWordsSectionBlock } from '@/payload-types'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitType)

type Props = {
  className?: string
} & StickyWordsSectionBlock

function StickyWordsSectionComponent({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollTrackRef = useRef(null)
  const logoRef = useRef(null)

  const beelieveStaticRef = useRef<HTMLSpanElement | null>(null)
  const createStaticRef = useRef<HTMLSpanElement | null>(null)
  const inspireStaticRef = useRef<HTMLSpanElement | null>(null)

  const beelieveAnimatedRef = useRef<HTMLSpanElement | null>(null)
  const createAnimatedRef = useRef<HTMLSpanElement | null>(null)
  const inspireAnimatedRef = useRef<HTMLSpanElement | null>(null)

  const wordsToSplitRef = useRef(null)

  const { width = 0 } = useWindowSize()

  function matchLocation(staticEl: HTMLElement, animatedEl: HTMLElement) {
    if (!staticEl || !animatedEl) return
    const boundsRel = staticEl.getBoundingClientRect()
    const boundsAbs = animatedEl.getBoundingClientRect()

    gsap.set(animatedEl, {
      transformOrigin: 'left top',
      x: '+=' + (boundsRel.left - boundsAbs.left),
      y: '+=' + (boundsRel.top - boundsAbs.top),
    })
  }

  useGSAP(
    () => {
      if (
        !wordsToSplitRef.current ||
        !beelieveAnimatedRef.current ||
        !createAnimatedRef.current ||
        !inspireAnimatedRef.current ||
        !scrollTrackRef.current ||
        !beelieveStaticRef.current ||
        !createStaticRef.current ||
        !inspireStaticRef.current ||
        !logoRef.current
      )
        return

      // Set initial opacity of logo to 0
      gsap.set(logoRef.current, { opacity: 0 })

      let splitTextInstance: SplitType | null = null // Keep track of the instance

      document.fonts.ready.then(() => {
        if (
          !beelieveAnimatedRef.current ||
          !createAnimatedRef.current ||
          !inspireAnimatedRef.current ||
          !beelieveStaticRef.current ||
          !createStaticRef.current ||
          !inspireStaticRef.current ||
          !wordsToSplitRef.current || // Added check
          !scrollTrackRef.current // Added check
        )
          return

        matchLocation(beelieveStaticRef.current, beelieveAnimatedRef.current)
        matchLocation(createStaticRef.current, createAnimatedRef.current)
        matchLocation(inspireStaticRef.current, inspireAnimatedRef.current)
      })

      gsap.set(beelieveAnimatedRef.current, { opacity: 1 })
      gsap.set(createAnimatedRef.current, { opacity: 1 })
      gsap.set(inspireAnimatedRef.current, { opacity: 1 })

      gsap.set(beelieveStaticRef.current, { opacity: 0 })
      gsap.set(createStaticRef.current, { opacity: 0 })
      gsap.set(inspireStaticRef.current, { opacity: 0 })

      splitTextInstance = new SplitType(wordsToSplitRef.current, {
        types: 'words',
        tagName: 'span',
      })

      // Create a separate timeline for the logo animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: 'top top',
            end: '10% top', // Animate logo in the first 10% of scroll
            scrub: true,
          },
        })
        .to(logoRef.current, {
          opacity: 1,
          duration: 1,
        })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      tl.to(splitTextInstance.words, {
        opacity: 0,
        rotationZ: 'random(-15, 15)',
        rotationX: 'random(-20, 20)',
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        scale: 'random(1.2, 2.4)',
        stagger: 0.05,
        filter: 'blur(10px)',
      })
        // Move animated text to original position in x direction
        .to([beelieveAnimatedRef.current, createAnimatedRef.current, inspireAnimatedRef.current], {
          x: 0,
          duration: 2,
        })
        // Animate in y direction with easing for curved motion
        .to(
          [beelieveAnimatedRef.current, createAnimatedRef.current, inspireAnimatedRef.current],
          { y: 0, ease: 'sine.in', duration: 1 },
          '>-1',
        )
        // Show punctuation
        .to('.is-punctuation', { autoAlpha: 1, stagger: 0.5 })

      return () => {
        tl.revert()
        SplitType.clearData()
      }
    },
    { dependencies: [width], revertOnUpdate: true },
  )

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-svh text-center text-[clamp(1.6rem,3.45vw,4rem)] leading-tight bg-gradient-to-b from-primary to-transparent overflow-x-clip ${className || ''}`}
    >
      <div className="relative container z-10">
        <div ref={scrollTrackRef} id="scroll-track" className="relative h-[500vh]">
          <div className="sticky top-0 min-h-svh flex items-center justify-center">
            <div className="relative text-wrap flex flex-col items-center justify-center">
              <div ref={logoRef}>
                <Icons.logoWithBee className="w-auto h-16 md:h-28 mb-20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  ref={beelieveAnimatedRef}
                  id="beelieve-animated"
                  className="opacity-0 inline-block is-slogan font-medium"
                >
                  beelieve
                </span>
                <span className="opacity-0 inline-block is-slogan text-[#00ADEE] font-medium mr-1 is-punctuation">
                  <Icons.hexagon className="size-[clamp(0.7rem,0.8vw,2rem)] rotate-90 mx-2" />
                </span>
                <span
                  ref={createAnimatedRef}
                  id="create-animated"
                  className="opacity-0 inline-block is-slogan font-medium"
                >
                  create
                </span>
                <span className="opacity-0 inline-block is-slogan text-[#00ADEE] font-medium mr-1 is-punctuation">
                  <Icons.hexagon className="size-[clamp(0.7rem,0.8vw,2rem)] rotate-90 mx-2" />
                </span>
                <span
                  ref={inspireAnimatedRef}
                  id="inspire-animated"
                  className="opacity-0 inline-block is-slogan font-medium"
                >
                  inspire
                </span>
                <span className="opacity-0 inline-block is-slogan text-[#00ADEE] font-medium is-punctuation">
                  <Icons.hexagon className="size-[clamp(0.7rem,0.8vw,2rem)] rotate-90 mx-2" />
                </span>
              </div>

              <p
                ref={wordsToSplitRef}
                id="words-to-split"
                className="text-pretty max-w-7xl font-thin"
              >
                <span className="font-medium">bluebee</span> is a creative agency with a dynamic
                blend of passion, creativity, and devotion. We help brands{' '}
                <span
                  ref={beelieveStaticRef}
                  id="beelieve-static"
                  className="inline-block font-medium"
                >
                  beelieve
                </span>{' '}
                in the extraordinary impact they can achieve and{' '}
                <span ref={createStaticRef} id="create-static" className="inline-block font-medium">
                  create
                </span>{' '}
                powerful experiences that{' '}
                <span
                  ref={inspireStaticRef}
                  id="inspire-static"
                  className="inline-block font-medium"
                >
                  inspire{' '}
                </span>{' '}
                a meaningful connection with their audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Clouds />
    </div>
  )
}

export const StickyWordsSectionBlockComponent = memo(StickyWordsSectionComponent)