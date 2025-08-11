'use client'

import { useRef, FC, HTMLAttributes, Fragment } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'
import { useGSAP } from '@gsap/react'
import { useRefs } from '@/hooks/use-refs'
import { Icons } from '@/components/svg'
import { ServicesScene } from '@/components/HomeSections/services-scene'
import { useWindowSize } from 'usehooks-ts'
import { ServicesBlock } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

// Transform CMS data to match the Panel interface expected by ServicesScene
interface Panel {
  title: string
  subTitle: string
  description: string
  media: string
  mediaAlt: string
  cta: string
  offerings: string[]
  testimonials: any[]
}

type Props = {
  className?: string
} & ServicesBlock

export const ServicesBlockComponent: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  ctaLink,
  servicesPanels,
  className,
  blockName,
  blockType,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width } = useWindowSize()

  const { refs: panelRefs, setRef: setPanelRefs } = useRefs<HTMLDivElement, string>()

  // Transform CMS data to Panel format for ServicesScene
  const panels: Panel[] =
    servicesPanels?.map((panel) => ({
      title: panel.title,
      subTitle: panel.subTitle,
      description: panel.description,
      media: '',
      mediaAlt: '',
      cta: panel.cta,
      offerings: panel.offerings?.map((o) => o.offering) || [],
      testimonials: panel.testimonials || [],
    })) || []

  useGSAP(
    () => {
      const currentWidth = window.innerWidth

      panelRefs.forEach((panelRef, index) => {
        if (!panelRef) return

        const isLast = index === panels.length - 1

        if (currentWidth > 1280) {
          gsap.fromTo(
            panelRef,
            {
              xPercent: -100,
              rotation: -45,
              backgroundColor: 'transparent',
            },
            {
              xPercent: 150,
              rotation: gsap.utils.random(-1, 1),
              opacity: 1,
              backgroundColor: 'rgba(255,255,255,1)',
              scrollTrigger: {
                trigger: panelRef,
                start: 'top top',
                end: isLast ? '+=100%' : 'bottom top',
                scrub: true,
                markers: false,
              },
            },
          )
        }

        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      })
    },
    { scope: containerRef, dependencies: [panels, width] },
  )

  useGSAP(
    () => {
      gsap.fromTo(
        '.testimonial',
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          stagger: 0.7,
          opacity: 1,
          ease: 'power1.inOut',
        },
      )
    },
    { scope: containerRef, dependencies: [panels] },
  )

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      <div className="relative">
        <ServicesScene panels={panels} panelRefs={panelRefs} ctaLink={ctaLink} />

        {panels.map((panel, index) => (
          <Fragment key={index}>
            <div className="min-h-svh sticky top-0 grid grid-cols-5 px-5 md:px-10 pb-5 md:pb-10 pt-[128px] pointer-events-none">
              <div
                ref={setPanelRefs(index)}
                className="col-span-5 xl:col-span-2 p-7 md:p-12 shadow-xl bg-background border-2 border-primary panel-trigger"
              >
                <div className="relative flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-1sm uppercase tracking-wider mb-6">{panel.subTitle}</h2>
                    <p className="text-3 md:text-6xl font-medium mb-6 relative mt-10">
                      <Icons.hexagon className="text-primary absolute -z-10 -mt-5 -ml-5" />
                      {panel.title}
                    </p>
                    <p className="text-lg md:text-xl leading-tight mb-8">{panel.description}</p>
                    <ul className="md:text-lg mb-10 space-y-1">
                      {panel.offerings.map((offering, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <Icons.hexagon className="text-primary size-3 mt-2" />
                          <div>{offering}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="h-[130svh]" />
          </Fragment>
        ))}
      </div>
      <div className="py-16" />
    </div>
  )
}
