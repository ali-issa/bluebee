'use client'

import Image from 'next/image'
import { FormBlock } from '@/blocks/Form/Component'
import { Icons } from '@/components/svg'
import type { BeeInTouch } from '@/payload-types'

type BeeInTouchBlockProps = {
  disableInnerContainer?: boolean
} & BeeInTouch

export const BeeInTouchBlockComponent: React.FC<BeeInTouchBlockProps> = ({
  heroImageSrc = '/images/bluebee_phone.png',
  heroImageAlt = 'A hand holding a rotary phone speaker',
  form,
  enableIntro = false,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 bg-primary md:grid-cols-2 gap-0 md:gap-8">
        <div className="relative h-[700px] lg:h-[100svh]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[100vw] h-[100vw] md:w-[40vw] md:h-[40vw]">
              <Image
                fill
                className="object-contain object-left-bottom"
                src={heroImageSrc}
                alt={heroImageAlt}
              />
            </div>
          </div>

          <div className="relative z-10 container text-[15vw] md:text-[9vw] -mt-20 leading-none h-full flex flex-col items-center justify-center font-bold pt-0 md:pt-24 lg:pt-0">
            <div>
              <span className="text-black">BEE</span> <span className="text-white">IN</span>
            </div>
            <div>
              <span className="text-white pl-[19vw]">TOUCH</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 border-t md:border-none">
          {form && <FormBlock enableIntro={enableIntro ?? false} form={form as any} />}
        </div>
      </div>

      {/* Static hardcoded section per user request */}
      <div className="bg-black text-white py-36">
        <div className="container text-6 font-medium leading-tight uppercase">
          <span className="text-primary">Bees</span> never sleep. Neither do we.
          <br />
          Fueled by <span className="text-primary">passion</span>. Driven by{' '}
          <span className="text-primary">purpose</span>. <br />
          <span className="font-semibold">
            Blue
            <span className="text-primary">Bee</span>{' '}
            <span>
              <Icons.darkBee className="h-auto w-[clamp(2rem,4vw,4vw)] inline-block mb-2" />
            </span>{' '}
            always on the <span className="text-primary">glow</span>
          </span>
          .
        </div>
      </div>
    </>
  )
}
