import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PurposeSectionBlockComponent } from '@/blocks/PurposeSection/Component'
import { StickyTabsSectionBlockComponent } from '@/blocks/StickyTabsSection/Component'
import { BrandStatementBlockComponent } from '@/blocks/BrandStatement/Component'
import { StickyWordsSectionBlockComponent } from '@/blocks/StickyWordsSection/Component'
import { ClientsGridBlockComponent } from '@/blocks/ClientsGrid/Component'
import { ServicesHeroBlockComponent } from '@/blocks/ServicesHero/Component'
import { ServicesBlockComponent } from '@/blocks/Services/Component'
import { BeeInTouchBlockComponent } from '@/blocks/BeeInTouch/Component'
import { OurOfficesBlockComponent } from '@/blocks/OurOffices/Component'
import { CareersBlockComponent } from '@/blocks/Careers/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  stickyWordsSection: StickyWordsSectionBlockComponent,
  purposeSection: PurposeSectionBlockComponent,
  stickyTabsSection: StickyTabsSectionBlockComponent,
  brandStatement: BrandStatementBlockComponent,
  clientsGrid: ClientsGridBlockComponent,
  servicesHero: ServicesHeroBlockComponent,
  services: ServicesBlockComponent,
  beeInTouch: BeeInTouchBlockComponent,
  ourOffices: OurOfficesBlockComponent,
  careers: CareersBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <Fragment key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </Fragment>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
