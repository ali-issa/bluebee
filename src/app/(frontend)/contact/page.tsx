'use client'

// import LiquidMaskImage from '@/components/animations/liquid-mask-image'
import Image from 'next/image'
import { StaggerContainer } from '@/components/animations/stagger-container'

const Contactpge = () => {
  return (
    <>
      <div className="relative bg-primary h-[500px] lg:h-[100svh]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw]">
            <Image
              fill
              className="object-contain object-left-bottom"
              src="/images/bluebee_phone.png"
              alt="A hand holding a rotary phone speaker"
            />
          </div>
        </div>

        <div className="relative z-10 container text-[15vw] leading-none h-full flex flex-col items-center justify-center font-bold">
          <div>
            <span className="text-black">BEE</span> <span className="text-white">IN</span>
          </div>
          <div>
            <span className="text-white pl-[30vw]">TOUCH</span>
          </div>
        </div>
      </div>
      <StaggerContainer className="pt-40 md:pt-72 px-5 md:px-10">
        {/* <div data-stagger-item className="text-7 md:text-8 max-w-[15ch] text-balance mb-5 md:mb-10"> */}
        {/*   Let&apos;s get this conversation started. */}
        {/* </div> */}

        {/* <div className="grid grid-cols-9 md:grid-cols-12 gap-4 mb-10 md:mb-40"> */}
        {/*   <div data-stagger-item className="col-span-3 md:col-span-2 aspect-square"> */}
        {/*     <LiquidMaskImage src="/images/phone.webp" alt="Project thumbnail" /> */}
        {/*   </div> */}
        {/*   <div */}
        {/*     data-stagger-item */}
        {/*     className="relative col-span-6 md:col-span-7 md:col-start-6 aspect-[3/4]" */}
        {/*   > */}
        {/*     <LiquidMaskImage src="/images/office.webp" alt="Project thumbnail" /> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div data-stagger-item id="email" className="border-t pt-4 pb-32"> */}
        {/*   <div data-stagger-item className="text-1sm uppercase tracking-wider mb-2"> */}
        {/*     Email */}
        {/*   </div> */}
        {/*   <div className="grid grid-cols-1 md:grid-cols-2"> */}
        {/*     <div></div> */}
        {/*     <a */}
        {/*       href="mailto:info@bluebeecreation.com" */}
        {/*       data-stagger-item */}
        {/*       className="block text-5 md:text-6 hover:underline" */}
        {/*     > */}
        {/*       info@bluebeecreation.com */}
        {/*     </a> */}
        {/*   </div> */}
        {/* </div> */}
        <div data-stagger-item className="border-t pt-4 pb-32">
          <div data-stagger-item className="text-1sm uppercase tracking-wider mb-2">
            Our Offices
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div></div>
            <div>
              <div data-stagger-item className="text-3 mb-10">
                Unit 695, Level 1, Jewellery & Gemplex 3, DMCC Business Centre, Dubai, UAE
              </div>
              <a
                href="https://maps.app.goo.gl/zRdx77f37sLP7YgN8"
                target="_blank"
                rel="noopener noreferrer"
                data-stagger-item
                className="block text-1sm uppercase mb-20 tracking-wider hover:underline"
              >
                Get Directions
              </a>
              <div data-stagger-item className="text-3 mb-10">
                1st Floor, La Perle de Kaslik Bldg, Kaslik Road, Lebanon
              </div>
              <a
                href="https://maps.app.goo.gl/McYAj4sFh7rGwtv6A"
                target="_blank"
                rel="noopener noreferrer"
                data-stagger-item
                className="block text-1sm uppercase mb-20 tracking-wider hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
        <div data-stagger-item className="border-t pt-4 pb-32">
          <div data-stagger-item className="text-1sm uppercase tracking-wider mb-2">
            Careers
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div></div>
            <div className="">
              <div data-stagger-item className="text-3 leading-tight mb-20">
                Curiosity fuels our creativity, and fresh perspectives keep us buzzing. If you are
                passionate and ready to grow with us, get in touch!
              </div>

              <a
                href="mailto:jobs@bluebeecreation.com"
                data-stagger-item
                className="block text-4 md:text-4 lg:text-6 hover:underline"
              >
                jobs@bluebeecreation.com
              </a>
            </div>
          </div>
        </div>
      </StaggerContainer>
    </>
  )
}

export default Contactpge
