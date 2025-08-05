'use client'

import dynamic from 'next/dynamic'
import { StickyWords } from '@/components/HomeSections/sticky-words'
import StickyTabs from '@/components/HomeSections/sticky-tabs'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { TextHighlight } from '@/components/animations/text-highlight'
import LiquidMaskImage from '@/components/animations/liquid-mask-image'
import { Icons } from '@/components/svg'
import Link from 'next/link'
import { FC } from 'react'
import { HomePageBlock as HomePageBlockProps } from '@/payload-types'

const HexTrail = dynamic(() => import('@/components/HomeSections/hex-trail'), {
  loading: () => <></>,
  ssr: false,
})

export const HomePageBlock: FC<HomePageBlockProps> = () => {
  return (
    <>
      <HexTrail />
      <StickyWords />
      {/* <StickySections /> */}
      <StaggerContainer
        as="section"
        className="py-10 px-5 md:px-10 relative overflow-clip border-t justify-between flex flex-col gap-16 md:gap-32"
      >
        <TextHighlight data-stagger-item className="text-3xl md:text-7xl leading-tight font-light">
          Everything we do is rooted in purpose, just like the bees that inspire us. Each move,
          every detail, there’s intention behind it.
        </TextHighlight>
        <div data-stagger-item className="flex flex-col md:flex-row gap-16">
          <div className="basis-1/2 ">
            <div className="w-full aspect-[4/3] flex gap-4">
              <div data-stagger-item className="basis-1/2 size-full relative">
                <LiquidMaskImage
                  alt=""
                  className="object-cover size-full"
                  src={'/images/team-1.webp'}
                />
              </div>
              <div data-stagger-item className="basis-1/2 size-full relative">
                <LiquidMaskImage
                  delay={0.4}
                  alt=""
                  className="object-cover size-full"
                  src={'/images/team-2.webp'}
                />
              </div>
            </div>
          </div>
          <div data-stagger-item className="basis-1/2 flex justify-end items-center">
            <div
              data-stagger-item
              className="max-w-2/3 md:max-w-[400px] text-1 leading-tight space-y-4"
            >
              <div>
                Keep scrolling to discover how the spirit of the hive shapes who we are, what we do,
                and how we deliver.
              </div>
              <div className="hidden md:block text-2 font-thin animate-bounce-slow w-full text-center">
                &#8595;
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col items-end">
            <h2 data-stagger-item className="relative text-[6vw] leading-none">
              <Icons.hexagon className="absolute -top-6 -left-8 text-primary size-16 -z-10" />
              Inspired by <span className="font-semibold">Bees</span>.
            </h2>
            <h2 data-stagger-item className="text-[6vw] leading-none">
              Built for <span className="font-semibold">Impact</span>.
            </h2>
          </div>
        </div>
      </StaggerContainer>

      <StickyTabs />

      <section className="py-16 md:py-20 px-5 md:px-10 relative overflow-clip border-t bg-primary space-y-16">
        {/* <div className="relative overflow-hidden aspect-video"> */}
        {/*   <div className="absolute bg-primary/20 inset-0 z-10" /> */}
        {/*   <LiquidMaskImage src={'/images/office-main.webp'} alt="" /> */}
        {/* </div> */}
        <StaggerContainer as="div" className="relative">
          <TextHighlight
            data-stagger-item
            className="text-3xl md:text-5xl text-background font-light"
          >
            From <span className="font-medium">brand ideation</span> to{' '}
            <span className="font-medium">global activation</span>, bluebee is more than an agency,
            we’re your hive of <span className="font-medium">innovation</span>,{' '}
            <span className="font-medium">connection</span>, and{' '}
            <span className="font-medium">success</span>.{' '}
            <span className="font-medium">Let’s build the future with purpose — together.</span>
          </TextHighlight>
        </StaggerContainer>

        <div className="flex flex-col-reverse md:flex-row gap-16">
          <div className="basis-1/2 flex items-end">
            <Link
              data-stagger-item
              href={'/services'}
              className="text-lg rounded-full font-medium text-background bg-black px-6 py-3 space-x-2 group"
            >
              <span>Discover our services</span>
              <span className="transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                &#8599;
              </span>
            </Link>
          </div>

          {/* <div className="basis-1/2"> */}
          {/*   <div className="w-full aspect-[4/3] flex gap-4"> */}
          {/*     <div className="basis-1/2 size-full relative"> */}
          {/*       <div className="absolute bg-primary/20 inset-0 z-10" /> */}
          {/**/}
          {/*       <LiquidMaskImage */}
          {/*         alt="" */}
          {/*         className="object-cover size-full" */}
          {/*         src={'/images/vr.webp'} */}
          {/*       /> */}
          {/*     </div> */}
          {/*     <div className="basis-1/2 size-full relative"> */}
          {/*       <div className="absolute bg-primary/20 inset-0 z-10" /> */}
          {/**/}
          {/*       <LiquidMaskImage */}
          {/*         delay={0.4} */}
          {/*         alt="" */}
          {/*         className="object-cover size-full" */}
          {/*         src={'/images/installation.webp'} */}
          {/*       /> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </section>
    </>
  )
}
