import React from 'react'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { ServicesHeroBlock } from '@/payload-types'

type Props = {
  className?: string
} & ServicesHeroBlock

export const ServicesHeroBlockComponent: React.FC<Props> = ({
  tagline,
  heading,
  description,
  subtitle,
  className,
}) => {
  return (
    <section className={`z-20 pointer-events-none h-svh relative overflow-clip text-center container flex items-center justify-center ${className || ''}`}>
      <StaggerContainer
        as="div"
        className="relative space-y-6 flex flex-col justify-center h-full"
      >
        <h2 data-stagger-item className="text-1sm md:text-1 uppercase tracking-wider">
          {tagline}
        </h2>
        <p data-stagger-item className="text-6 md:text-7">
          {heading}
        </p>
        <p data-stagger-item className="text-3 md:text-5 leading-tight text-balance">
          {description}
        </p>
        <p data-stagger-item className="text-1sm text-balance leading-tight mb-5">
          {subtitle}
        </p>
        <div className="text-2 font-thin animate-bounce-slow">&#8595;</div>
      </StaggerContainer>
    </section>
  )
}