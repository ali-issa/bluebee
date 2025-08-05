'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FC, Fragment, useRef, useState } from 'react'
import SplitType from 'split-type'
import ReelVideo from './reel-video'
import Marquee from './marquee'
import { VerticalTextSlider } from './vertical-text-slider'
import { Icons } from '@/components/svg'
import { Media } from '@/payload-types'
import MotionPath from '../path'
import Link from 'next/link'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitType)

type SpinningTextProps = {
  // Pollinating Creative Solutions
  title?: string | null
  // Buzzing for 17 years
  // Creating extraordinary
  // Delivering excellence
  // Building global visions
  // Buzzing for 17 years
  lines?: { text?: string | null | undefined; id?: string | null | undefined }[] | null
  /* beelieve */
  /* create */
  /* inspire */
  marqueeItems?: { item?: string | null | undefined; id?: string | null | undefined }[] | null

  video?: number | Media | null

  videoPoster?: number | Media | null
}

export const SpinningText: FC<SpinningTextProps> = ({
  title,
  lines,
  marqueeItems,
  video,
  videoPoster,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const splitTextRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)

  useGSAP(
    () => {
      if (!splitTextRef.current) return

      const splitText = SplitType.create(splitTextRef.current, {
        types: 'chars,words',
        tagName: 'span',
      })

      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
          duration: 1.2,
        },
      })

      tl.fromTo(
        splitText.chars,
        {
          rotateY: 'random(180, 360)',
          yPercent: 'random(-50, 50)',
          xPercent: 'random(-50, 50)',
          scale: 0,
        },
        {
          rotateY: 0,
          yPercent: 0,
          xPercent: 0,
          scale: 1,
          stagger: {
            amount: 1,
            from: 'random',
          },
        },
      )
      setIsVisible(true)

      return () => {
        tl.revert()
        SplitType.clearData()
      }
    },
    { dependencies: [setIsVisible] },
  )

  useGSAP(() => {
    gsap.set(marqueeRef.current, {
      translateY: '100%',
    })

    // Animation
    gsap.to(marqueeRef.current, {
      translateY: '0%',
      opacity: 1,
      duration: 2,
      delay: 1.5,
      ease: 'power2.out', // Smoother easing
      overwrite: 'auto', // Prevents conflicts
    })
  })

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-svh flex flex-col md:flex-row items-center justify-center leading-none text-background bg-black"
    >
      <MotionPath />

      <div className="relative container flex">
        <div>
          <h2
            className={`relative pointer-events-none mb-8 md:-ml-2 z-20 text-[min(8vw,9rem)] uppercase max-w-[80%] font-thin ${isVisible ? 'visible' : 'invisible'}`}
            ref={splitTextRef}
          >
            {title}
          </h2>
          <div>
            <Link href={'/'} className=""></Link>
          </div>
          {lines && <VerticalTextSlider lines={lines} />}
        </div>
        {/* <HeroStar /> */}
      </div>
      <Marquee
        ref={marqueeRef}
        className="opacity-0 absolute z-30 bottom-0 border-b border-foreground text-foreground w-full py-2 bg-primary text-lg font-semibold"
      >
        {marqueeItems &&
          marqueeItems.map((marqueeItem, index) => (
            <Fragment key={index}>
              <div>{marqueeItem.item}</div>
              <Icons.hexagon className="size-3 rotate-90" />
            </Fragment>
          ))}
        {marqueeItems &&
          marqueeItems.map((marqueeItem, index) => (
            <Fragment key={index}>
              <div>{marqueeItem.item}</div>
              <Icons.hexagon className="size-3 rotate-90" />
            </Fragment>
          ))}
      </Marquee>
      {video && <ReelVideo video={video} videoPoster={videoPoster} />}
    </div>
  )
}
