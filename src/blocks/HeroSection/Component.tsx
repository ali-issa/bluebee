import React from 'react'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { TextHighlight } from '@/components/animations/text-highlight'
// import { HeroSectionBlock } from '@/payload-types'

type Props = {
  className?: string
} & any

export const HeroSectionBlockComponent: React.FC<Props> = ({ title, className }) => {
  return (
    <StaggerContainer
      as="section"
      className={`py-10 px-5 md:px-10 relative overflow-clip border-t justify-between flex flex-col gap-16 md:gap-32 ${className || ''}`}
    >
      <TextHighlight data-stagger-item className="text-3xl md:text-7xl leading-tight font-light">
        {title}
      </TextHighlight>
    </StaggerContainer>
  )
}

