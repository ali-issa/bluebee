import React from 'react'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { TextHighlight } from '@/components/animations/text-highlight'
import { CMSLink } from '@/components/Link'
import { BrandStatementBlock } from '@/payload-types'

type Props = {
  className?: string
} & BrandStatementBlock

export const BrandStatementBlockComponent: React.FC<Props> = ({
  statement,
  ctaButton,
  className,
}) => {
  return (
    <section
      className={`py-16 md:py-20 px-5 md:px-10 relative overflow-clip border-t bg-primary space-y-16 ${className || ''}`}
    >
      <StaggerContainer as="div" className="relative">
        <TextHighlight
          data-stagger-item
          className="text-3xl md:text-5xl text-background font-light"
        >
          {statement}
        </TextHighlight>
      </StaggerContainer>

      <div className="flex flex-col-reverse md:flex-row gap-16">
        <div className="basis-1/2 flex items-end">
          {ctaButton?.link && (
            <CMSLink
              {...ctaButton.link}
              className="text-lg rounded-full font-medium text-background bg-black px-6 py-3 group"
              appearance="inline"
            >
              <span className="ml-2 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                &#8599;
              </span>
            </CMSLink>
          )}
        </div>
      </div>
    </section>
  )
}

