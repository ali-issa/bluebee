import React from 'react'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { TextHighlight } from '@/components/animations/text-highlight'
import LiquidMaskImage from '@/components/animations/liquid-mask-image'
import { Icons } from '@/components/svg'
import { CMSLink } from '@/components/Link'
import { PurposeSectionBlock } from '@/payload-types'

type Props = {
  className?: string
} & PurposeSectionBlock

export const PurposeSectionBlockComponent: React.FC<Props> = ({
  heroText,
  description,
  images,
  brandHeadings,
  ctaButton,
  className,
}) => {
  return (
    <StaggerContainer
      as="section"
      className={`py-10 px-5 md:px-10 relative overflow-clip border-t justify-between flex flex-col gap-16 md:gap-32 ${className || ''}`}
    >
      <TextHighlight data-stagger-item className="text-3xl md:text-7xl leading-tight font-light">
        {heroText}
      </TextHighlight>

      <div data-stagger-item className="flex flex-col md:flex-row gap-16">
        <div className="basis-1/2">
          <div className="w-full aspect-[4/3] flex gap-4">
            {images?.map((item, index) => (
              <div key={index} data-stagger-item className="basis-1/2 size-full relative">
                <LiquidMaskImage
                  delay={item.delay || 0}
                  alt={typeof item.image === 'object' ? item.image.alt || '' : ''}
                  className="object-cover size-full"
                  src={typeof item.image === 'object' ? item.image.url || '' : ''}
                />
              </div>
            ))}
          </div>
        </div>
        <div data-stagger-item className="basis-1/2 flex justify-end items-center">
          <div
            data-stagger-item
            className="max-w-2/3 md:max-w-[400px] text-1 leading-tight space-y-4"
          >
            <div>{description}</div>
            <div className="hidden md:block text-2 font-thin animate-bounce-slow w-full text-center">
              &#8595;
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
        {ctaButton?.link && (
          <CMSLink
            {...ctaButton.link}
            data-stagger-item
            className="rounded-full text-lg font-medium text-foreground bg-primary px-6 py-3 group"
            appearance="inline"
          >
            <span className="ml-2 transition-all transform group-hover:translate-x-1 group-hover:translate-y-1">
              &#8599;
            </span>
          </CMSLink>
        )}
        <div className="flex-1 flex flex-col items-end">
          <h2 data-stagger-item className="relative text-[6vw] leading-none">
            <Icons.hexagon className="absolute -top-6 -left-8 text-primary size-16 -z-10" />
            {brandHeadings?.heading1}
          </h2>
          <h2 data-stagger-item className="text-[6vw] leading-none">
            {brandHeadings?.heading2}
          </h2>
        </div>
      </div>
    </StaggerContainer>
  )
}
