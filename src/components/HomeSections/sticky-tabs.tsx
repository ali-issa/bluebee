import React, { Fragment } from 'react'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRefs } from '@/hooks/use-refs'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { ClientsGrid } from './clients-grid'
import { Icons } from '../svg'

interface Panel {
  title: string
  subTitle: string
  description: string
  media: string
  mediaAlt: string
}

const panels: Panel[] = [
  {
    title: 'Face to Face',
    subTitle: 'Bees Recognize Faces. So Do We.',
    description:
      'Bees can recognize human faces. At bluebee, we see the people behind the brands, not just the logos. We build genuine connections that fuel long-term partnerships.',
    media: '/images/face-to-face.webp',
    mediaAlt: 'Morphing animation between client logos and real human expressions.',
  },
  {
    title: 'A Vision in Full Color',
    subTitle: 'Bees See in Color. We Create in It.',
    description:
      'Bees perceive ultraviolet light, seeing what others can’t. We harness that vision to design vibrant brand identities and campaigns that stand out in any crowd.',
    media: '/images/uv.webp',
    mediaAlt: 'Splash of bright, shifting colors forming brand designs and ad visuals.',
  },
  {
    title: 'Purposeful by Nature',
    subTitle: 'Not All Bees Sting. Ours Spark.',
    description:
      'Not every bee attacks. Ours engage, inspire, and energize. Through event management, team-building, and experiential marketing, we leave a lasting, positive buzz.',
    media: '/images/purposeful.webp',
    mediaAlt: 'Footage of bluebee-led events and joyful crowd reactions.',
  },
  {
    title: 'Fast & Focused',
    subTitle: '20 MPH of Creative Momentum',
    description:
      'Bees fly with speed and direction. So do we. With over 750 projects across 15 countries, our solutions move with precision and purpose.',
    media: '/images/fast.webp',
    mediaAlt: 'Time-lapse of project milestones building across a world map.',
  },
  {
    title: 'Tireless Devotion',
    subTitle: 'Bees Don’t Sleep. Neither Does Passion.',
    description:
      'Driven by purpose, our beez buzz with round-the-clock dedication. From brainstorming to delivery, we never stop until excellence is achieved.',
    media: '/images/tireless.webp',
    mediaAlt: 'A reel showing behind-the-scenes workdays and night edits.',
  },
  {
    title: 'Caffeine Powered',
    subTitle: 'Buzzed on Ideas',
    description:
      'Bees are attracted to caffeine. We’re addicted to fresh concepts and creative sparks. Our campaigns stimulate, surprise, and stick with audiences.',
    media: '/images/caffeine.webp',
    mediaAlt:
      'An energetic transition from coffee to brainstorming boards to final campaign visuals.',
  },
  {
    title: 'Built to Last',
    subTitle: 'Economical. Exceptional.',
    description:
      'Bees engineer perfect hives with minimal resources. We follow the same principle, optimized productivity, maximum impact. Always cost- and time-efficient.',
    media: '/images/workhive.webp',
    mediaAlt: 'Blueprint-style animation of a project forming from wireframes to launch.',
  },
  {
    title: 'Workahive',
    subTitle: 'Busy Bees. Big Results.',
    description:
      'Bees are relentless workers. So are we. With over 100 clients and counting, our team’s devotion brings ideas to life and builds extraordinary legacies.',
    media: '/images/workhive.webp',
    mediaAlt: 'Montage of logos, stats, and buzzing worker bees transforming into team photos.',
  },
]

gsap.registerPlugin(ScrollTrigger, useGSAP)

const StickyTabs = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const { setRef: setTabRefs, refs: tabRefs } = useRefs<HTMLDivElement>()
  const { setRef: setSubTitleHighlightRefs, refs: subTitleHighlightRefs } =
    useRefs<HTMLDivElement>()

  useGSAP(
    () => {
      const tabContentElements = tabRefs
      const subTitleHighlightElements = subTitleHighlightRefs

      if (!tabContentElements || tabContentElements.length === 0 || !containerRef.current) {
        console.warn('GSAP StickyTabs: No tab elements found or container not ready.')
        return
      }

      if (
        !subTitleHighlightElements ||
        subTitleHighlightElements.length === 0 ||
        !containerRef.current
      ) {
        console.warn('GSAP StickyTabs: No subTitle elements found or container not ready.')
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        defaults: {
          ease: 'none',
        },
      })

      const validTabElements = tabContentElements.filter((el) => el)
      const validSubTitleHighlightElements = subTitleHighlightElements.filter((el) => el)

      if (validTabElements.length === 0) {
        console.warn('GSAP StickyTabs: No valid tab elements after filtering.')
        return
      }

      if (validSubTitleHighlightElements.length === 0) {
        console.warn('GSAP StickyTabs: No valid subtitle highlight elements after filtering.')
        return
      }

      gsap.set(validTabElements, { height: '0%' })
      gsap.set(validTabElements[0]!, { height: '100%' })

      gsap.set(validSubTitleHighlightElements, { width: '0%' })
      // gsap.set(validSubTitleHighlightElements[0]!, { width: '100%' })

      for (let i = 0; i < validTabElements.length - 1; i++) {
        tl.to(validTabElements[i]!, { height: '0%' })
          .to(
            validTabElements[i + 1]!,
            { height: '100%' },
            '<', // Position parameter: start at the same time as the previous tween
          )
          .to(validSubTitleHighlightElements[i]!, { width: 'calc(100% + 16px)' }, '<')
          .to(validSubTitleHighlightElements[i - 1]!, { width: '0%' }, '<')
      }

      return () => {
        tl.kill()
      }
    },
    { scope: containerRef },
  )

  return (
    <>
      <section
        ref={containerRef}
        className="sticky-tabs-scroll-section relative"
        style={{ height: `${panels.length * 150}svh` }}
      >
        <div id="tab-wrap" className={cn('sticky top-0 overflow-hidden')}>
          <div id="tab-list" className="flex flex-col h-svh">
            <div className="bg-background w-full flex flex-col">
              {panels.slice(0, -1).map((panel, index) => (
                <Fragment key={index}>
                  <div
                    className={cn(
                      'w-full border-t px-5 md:px-10 py-2 flex flex-col md:flex-row md:items-center justify-between',
                      index === panels.length && 'border-b',
                    )}
                  >
                    <h2 className="text-2xl md:text-3xl uppercase font-semibold flex gap-3 justify-between md:justify-center">
                      <span>{panel.title}</span> <Icons.coloredBee className="h-7 w-auto" />
                    </h2>
                    <div className="relative uppercase">
                      <span className="z-20 relative">{panel.subTitle}</span>
                      <div
                        ref={setSubTitleHighlightRefs(index)}
                        className="absolute  bg-transparent md:bg-primary/15 h-full top-0 -left-[8px] rounded-sm"
                      />
                    </div>
                  </div>
                  <div
                    ref={setTabRefs(index)}
                    className="flex flex-col-reverse md:flex-row overflow-hidden relative px-5 md:px-10 gap-5 bg-gradient-to-b from-background to-primary/5"
                  >
                    <div
                      style={{ maxHeight: `calc(100svh - ${(index + 1) * 53}px)` }}
                      className={cn(
                        'text-xl md:text-3xl font-light basis-1/2 pb-5 text-balance flex flex-col justify-center',
                      )}
                    >
                      {panel.description}
                    </div>
                    <div className="relative basis-1/2 overflow-hidden">
                      <div className="absolute bg-primary/20 inset-0 z-10" />
                      <Image className="object-cover" alt={panel.mediaAlt} src={panel.media} fill />
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div>
        <div
          className={cn(
            'w-full border-t px-5 md:px-10 py-2 flex flex-col md:flex-row md:items-center justify-between',
          )}
        >
          <h2 className="text-2xl md:text-3xl uppercase font-semibold flex gap-3 justify-between md:justify-center">
            {panels[panels.length - 1]?.title} <Icons.coloredBee className="h-7 w-auto" />
          </h2>
          <div className="relative uppercase">
            <span className="z-20 relative">{panels[panels.length - 1]?.subTitle}</span>
            <div className="absolute  bg-transparent md:bg-primary/15 top-0 -left-[8px] rounded-sm" />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row overflow-hidden relative px-5 py-8 md:px-10 gap-5">
          <div
            className={cn(
              'text-xl md:text-3xl font-light basis-1/2 pb-5 text-balance flex flex-col justify-center',
            )}
          >
            <h2 data-stagger-item className="relative text-[6vw] leading-none my-4">
              <Icons.hexagon className="absolute -top-3 -left-3 md:-top-5 md:-left-6 text-primary md:size-16 size-7 -z-10" />
              Our <span className="font-semibold">Beekeepers</span>.
            </h2>
            {panels[panels.length - 1]?.description}
          </div>
          <ClientsGrid />
        </div>
      </div>
    </>
  )
}

export default StickyTabs
