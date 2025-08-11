'use client'

import React, { Fragment, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRefs } from '@/hooks/use-refs'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { ClientsGridBlockComponent } from '@/blocks/ClientsGrid/Component'
import { Icons } from '@/components/svg'
import { StickyTabsSectionBlock, Media } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  className?: string
} & StickyTabsSectionBlock

export const StickyTabsSectionBlockComponent: React.FC<Props> = ({
  panels,
  finalHeading,
  clients,
  className,
}) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const { setRef: setTabRefs, refs: tabRefs } = useRefs<HTMLDivElement>()
  const { setRef: setSubTitleHighlightRefs, refs: subTitleHighlightRefs } =
    useRefs<HTMLDivElement>()

  useGSAP(
    () => {
      const tabContentElements = tabRefs
      const subTitleHighlightElements = subTitleHighlightRefs

      if (!tabContentElements || tabContentElements.length === 0 || !containerRef.current) {
        return
      }

      if (
        !subTitleHighlightElements ||
        subTitleHighlightElements.length === 0 ||
        !containerRef.current
      ) {
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

      if (validTabElements.length === 0 || validSubTitleHighlightElements.length === 0) {
        return
      }

      gsap.set(validTabElements, { height: '0%' })
      gsap.set(validTabElements[0]!, { height: '100%' })
      gsap.set(validSubTitleHighlightElements, { width: '0%' })

      for (let i = 0; i < validTabElements.length - 1; i++) {
        tl.to(validTabElements[i]!, { height: '0%' })
          .to(validTabElements[i + 1]!, { height: '100%' }, '<')
          .to(validSubTitleHighlightElements[i]!, { width: 'calc(100% + 16px)' }, '<')
          .to(validSubTitleHighlightElements[i - 1]!, { width: '0%' }, '<')
      }

      return () => {
        tl.kill()
      }
    },
    { scope: containerRef },
  )

  if (!panels || panels.length === 0) return null

  const mainPanels = panels.slice(0, -1)
  const lastPanel = panels[panels.length - 1]

  return (
    <>
      <section
        ref={containerRef}
        className={`sticky-tabs-scroll-section relative ${className || ''}`}
        style={{ height: `${panels.length * 150}svh` }}
      >
        <div id="tab-wrap" className={cn('sticky top-0 overflow-hidden')}>
          <div id="tab-list" className="flex flex-col h-svh">
            <div className="bg-background w-full flex flex-col">
              {mainPanels.map((panel, index) => (
                <Fragment key={index}>
                  <div
                    className={cn(
                      'w-full border-t px-5 md:px-10 py-2 flex flex-col md:flex-row md:items-center justify-between',
                    )}
                  >
                    <h2 className="text-2xl md:text-3xl uppercase font-semibold flex gap-3 justify-between md:justify-center">
                      <span>{panel.title}</span> <Icons.coloredBee className="h-7 w-auto" />
                    </h2>
                    <div className="relative uppercase">
                      <span className="z-20 relative">{panel.subTitle}</span>
                      <div
                        ref={setSubTitleHighlightRefs(index)}
                        className="absolute bg-transparent md:bg-primary/15 h-full top-0 -left-[8px] rounded-sm"
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
                      <Image
                        className="object-cover"
                        alt={typeof panel.media === 'object' ? panel.media.alt || '' : ''}
                        src={typeof panel.media === 'object' ? panel.media.url || '' : ''}
                        fill
                      />
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lastPanel && (
        <div>
          <div
            className={cn(
              'w-full border-t px-5 md:px-10 py-2 flex flex-col md:flex-row md:items-center justify-between',
            )}
          >
            <h2 className="text-2xl md:text-3xl uppercase font-semibold flex gap-3 justify-between md:justify-center">
              {lastPanel.title} <Icons.coloredBee className="h-7 w-auto" />
            </h2>
            <div className="relative uppercase">
              <span className="z-20 relative">{lastPanel.subTitle}</span>
              <div className="absolute bg-transparent md:bg-primary/15 top-0 -left-[8px] rounded-sm" />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row overflow-hidden relative px-5 py-8 md:px-10 gap-5">
            <div
              className={cn(
                'text-xl md:text-3xl font-light basis-1/2 pb-5 text-balance flex flex-col justify-center',
              )}
            >
              {finalHeading && (
                <h2 data-stagger-item className="relative text-[6vw] leading-none my-4">
                  <Icons.hexagon className="absolute -top-3 -left-3 md:-top-5 md:-left-6 text-primary md:size-16 size-7 -z-10" />
                  {finalHeading}
                </h2>
              )}
              {lastPanel.description}
            </div>
            {clients && <ClientsGridBlockComponent blockType="clientsGrid" clients={clients} />}
          </div>
        </div>
      )}
    </>
  )
}
