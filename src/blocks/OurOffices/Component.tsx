'use client'

import { StaggerContainer } from '@/components/animations/stagger-container'
import type { OurOffices } from '@/payload-types'

type OurOfficesBlockProps = {
  disableInnerContainer?: boolean
} & OurOffices

export const OurOfficesBlockComponent: React.FC<OurOfficesBlockProps> = ({
  title = 'Our Offices',
  offices = [],
}) => {
  return (
    <StaggerContainer className="pt-24 px-5 md:px-10">
      <div data-stagger-item className="pb-24">
        <div data-stagger-item className="text-1sm uppercase tracking-wider mb-2">
          {title}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div></div>
          <div>
            {offices &&
              offices.map((office, index) => (
                <div key={index} className={index < offices.length - 1 ? 'mb-20' : ''}>
                  <div data-stagger-item className="text-3 mb-10">
                    {office.address}
                  </div>
                  <a
                    href={office.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-stagger-item
                    className="block text-1sm uppercase tracking-wider hover:underline"
                  >
                    {office.directionsLabel || 'Get Directions'}
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </StaggerContainer>
  )
}

