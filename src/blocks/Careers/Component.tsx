'use client'

import { StaggerContainer } from '@/components/animations/stagger-container'
import type { Careers } from '@/payload-types'

type CareersBlockProps = {
  disableInnerContainer?: boolean
} & Careers

export const CareersBlockComponent: React.FC<CareersBlockProps> = ({
  title = "Careers",
  description = "Curiosity fuels our creativity, and fresh perspectives keep us buzzing. If you are passionate and ready to grow with us, get in touch!",
  email = "jobs@bluebeecreation.com",
}) => {
  return (
    <StaggerContainer className="pt-0 px-5 md:px-10">
      <div data-stagger-item className="border-t pt-4 pb-32">
        <div data-stagger-item className="text-1sm uppercase tracking-wider mb-2">
          {title}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div></div>
          <div>
            <div data-stagger-item className="text-3 leading-tight mb-20">
              {description}
            </div>
            <a
              href={`mailto:${email}`}
              data-stagger-item
              className="block text-4 md:text-4 lg:text-6 hover:underline"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </StaggerContainer>
  )
}