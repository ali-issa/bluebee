import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { StaggerContainer } from '../animations/stagger-container'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <StaggerContainer className={cn('px-5 md:px-10')}>
      <div className="grid grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-6 xl:gap-x-6">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-3" key={index}>
                <Card
                  className="h-full"
                  doc={result}
                  showDescription={false}
                  relationTo="posts"
                  showCategories
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </StaggerContainer>
  )
}
