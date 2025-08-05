import type { Page } from '@/payload-types'

import { SpinningText } from '@/components/HomeSections/spinning-text'

export const HomeHero: React.FC<Page['hero']> = ({
  video,
  videoPoster,
  title,
  verticalSliderLines,
  marqueeItems,
}) => {
  return (
    <SpinningText
      title={title}
      lines={verticalSliderLines}
      video={video}
      videoPoster={videoPoster}
      marqueeItems={marqueeItems}
    />
  )
}
