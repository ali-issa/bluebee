'use client'

import { useRef, FC, HTMLAttributes, Fragment } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'
import { useGSAP } from '@gsap/react'
import { useRefs } from '@/hooks/use-refs'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { Icons } from '@/components/svg'
import { ServicesScene } from './services-scene'
import { useWindowSize } from 'usehooks-ts'
// import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  quote: string
  author: string
  position: string
  avatar?: string
}

// Define panel interface
export interface Panel {
  title: string
  subTitle: string
  description: string
  media: string
  mediaAlt: string
  cta: string
  offerings: string[]
  testimonials: Testimonial[]
}

const panels: Panel[] = [
  {
    title: 'Advertising & Branding',
    subTitle: 'Shaping Identities. Spreading Buzz.',
    description:
      'We craft brands that are impossible to ignore. From bold campaigns to unforgettable visuals, we turn ideas into living, breathing experiences that leave a lasting sting, the good kind.',
    media: '',
    mediaAlt: 'Morphing animation between client logos and real human expressions.',
    cta: 'Transform your brand',
    offerings: [
      '360° advertising campaigns that spark conversations',
      'Distinctive brand identity designs that capture hearts',
      'Story-driven visuals that stand the test of time',
    ],
    testimonials: [
      {
        quote:
          'bluebee captured our brand essence like no one else. Our identity finally feels alive.',
        author: 'Alex Carter',
        position: 'Marketing Director @ BloomCorp',
        avatar: 'https://i.pravatar.cc/300?img=1',
      },
      {
        quote:
          'bluebee’s branding work brought clarity and power to our story. We finally look as strong as we feel.',
        author: 'Laura Jensen',
        position: 'CEO @ Solara Health',
        avatar: 'https://i.pravatar.cc/300?img=20',
      },
      {
        quote:
          'The campaign bluebee designed didn’t just turn heads — it opened new doors for our business.',
        author: 'Marcus Trent',
        position: 'Founder @ Elevate Goods',
        avatar: 'https://i.pravatar.cc/300?img=3',
      },
    ],
  },
  {
    title: 'Digital & B2B Marketing',
    subTitle: 'Buzzing Across Every Channel',
    description:
      'In a world of noise, we help brands speak louder, smarter, and clearer. Our digital and B2B marketing strategies connect brands to audiences, and to opportunity.',
    media: '',
    mediaAlt: 'Dynamic animation of marketing funnels, digital ads, and business growth charts.',
    cta: 'Amplify your reach',

    offerings: [
      'Powerful digital and traditional content that resonates',
      'Business and event strategies that drive real-world results',
      'Intelligent campaigns crafted to expand your reach',
    ],
    testimonials: [
      {
        quote:
          'bluebee’s digital strategy opened doors we did not even know existed. The results speak for themselves.',
        author: 'Victor Stone',
        position: 'Head of Growth @ Orion Enterprises',
        avatar: 'https://i.pravatar.cc/300?img=21',
      },
      {
        quote: 'From strategy to execution, bluebee helped us communicate smarter and win bigger.',
        author: 'Fatima Noor',
        position: 'Marketing Head @ Nova Industries',
        avatar: 'https://i.pravatar.cc/300?img=5',
      },
      {
        quote:
          'Thanks to bluebee, we achieved record engagement levels and turned prospects into partners.',
        author: 'Jason Myers',
        position: 'VP of Sales @ Vertex Systems',
        avatar: 'https://i.pravatar.cc/300?img=6',
      },
    ],
  },
  {
    title: 'Video & Animation',
    subTitle: 'Bringing Stories to Life, Frame by Frame',
    description:
      'We turn ideas into motion, blending storytelling with stunning visuals. From 2D magic to 3D worlds, we create videos and animations that move hearts, and brands forward.',
    media: '',
    mediaAlt: 'Showreel of animated graphics transforming into real-world video scenes.',
    cta: 'Bring your story to life',

    offerings: [
      '2D animations that captivate and communicate',
      '3D animations that build immersive worlds',
      'Video production that turns vision into visual impact',
    ],
    testimonials: [
      {
        quote:
          'The animation bluebee produced for us captured more than our message, it captured imaginations.',
        author: 'Daniel Reed',
        position: 'Creative Lead @ Horizon Media',
        avatar: 'https://i.pravatar.cc/300?img=7',
      },
      {
        quote: 'Every frame was crafted with heart. bluebee made our vision leap off the screen.',
        author: 'Amira Khalid',
        position: 'Content Manager @ Brightwave Studios',
        avatar: 'https://i.pravatar.cc/300?img=8',
      },
      {
        quote:
          'bluebee’s video production brought our campaign to life in ways we never imagined possible.',
        author: 'Tom Bennett',
        position: 'Marketing Strategist @ CoreVision',
        avatar: 'https://i.pravatar.cc/300?img=9',
      },
    ],
  },
  {
    title: 'Experiential Engagement',
    subTitle: 'Where Experience Meets Emotion',
    description:
      'We turn moments into movements. Our experiential marketing creates immersive worlds that captivate senses, spark joy, and build unforgettable bonds with your audience.',
    media: '',
    mediaAlt: 'Footage of mall activations with interactive displays and crowds engaging joyfully.',
    cta: 'Create memorable moments',

    offerings: [
      'Mall activations that stop shoppers in their tracks',
      'Immersive experiences that transport and inspire',
      'Custom engagements designed to leave a lasting impression',
    ],
    testimonials: [
      {
        quote:
          'bluebee’s experiential activations turned our campaign into a phenomenon. People are still talking about it months later.',
        author: 'Emily Sanchez',
        position: 'Brand Manager @ PulseWear',
        avatar: 'https://i.pravatar.cc/300?img=10',
      },
      {
        quote:
          'bluebee built an immersive brand world that customers still remember and talk about.',
        author: 'Isabelle Grant',
        position: 'Experiential Marketing Lead @ Urban Pulse',
        avatar: 'https://i.pravatar.cc/300?img=11',
      },
      {
        quote:
          'The buzz generated by bluebee’s activations completely transformed our brand’s public image.',
        author: 'Carlos Mendez',
        position: 'Retail Director @ LuxeHaus',
        avatar: 'https://i.pravatar.cc/300?img=12',
      },
    ],
  },
  {
    title: 'Event Management',
    subTitle: 'Crafted Moments. Lasting Impressions.',
    description:
      'We bring ideas to life with precision and passion. From concept to curtain call, our events are built to captivate, engage, and create unforgettable memories.',
    media: '',
    mediaAlt: 'Highlight reel of themed events with smiling guests and stunning setups.',
    cta: 'Elevate your events',

    offerings: [
      'Theme creation that sets the perfect tone',
      'Flawless planning and seamless execution',
      'Bespoke experiences designed for maximum impact',
    ],
    testimonials: [
      {
        quote:
          'Our event exceeded every expectation. Every detail reflected our brand beautifully, thanks to bluebee’s magic.',
        author: 'Maya Al Farsi',
        position: 'Event Director @ Lumina Group',
        avatar: 'https://i.pravatar.cc/300?img=13',
      },
      {
        quote:
          'bluebee turned our annual event into an unforgettable experience. Guests are already asking about the next one.',
        author: 'Nadia Boulos',
        position: 'Communications Manager @ Ardent Global',
        avatar: 'https://i.pravatar.cc/300?img=14',
      },
      {
        quote:
          'Everything ran seamlessly from start to finish. bluebee’s event management is truly next level.',
        author: 'Patrick Doyle',
        position: 'COO @ Velocity Networks',
        avatar: 'https://i.pravatar.cc/300?img=15',
      },
    ],
  },
  {
    title: 'Team Building Activities',
    subTitle: 'Energize Your Hive',
    description:
      'Great teams don’t just happen, they’re nurtured. We design dynamic team-building experiences that inspire connection, ignite energy, and strengthen every link in the hive.',
    media: '',
    mediaAlt: 'A vibrant team workshop filled with laughter, collaboration, and energy.',
    cta: 'Energize your team',

    offerings: [
      'Lifestyle coaching sessions that unlock true potential',
      'Energy workshops that fuel motivation and creativity',
      'Tailor-made activities that turn coworkers into collaborators',
    ],
    testimonials: [
      {
        quote:
          'Our team came back more united, energized, and motivated than ever before. A truly transformative experience.',
        author: 'Sophie Lin',
        position: 'HR Manager @ Nexora Solutions',
        avatar: 'https://i.pravatar.cc/300?img=16',
      },
      {
        quote:
          'We saw a complete shift in morale and collaboration after bluebee’s team-building program.',
        author: 'Hannah Lee',
        position: 'Director of People @ SummitWorks',
        avatar: 'https://i.pravatar.cc/300?img=17',
      },
      {
        quote:
          'bluebee delivered more than activities — they gave us a renewed sense of purpose and unity.',
        author: 'Chris Fulton',
        position: 'Team Lead @ AeroSystems',
        avatar: 'https://i.pravatar.cc/300?img=18',
      },
    ],
  },
]

export const StickySections: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width } = useWindowSize()

  const { refs: panelRefs, setRef: setPanelRefs } = useRefs<HTMLDivElement, string>()

  useGSAP(
    () => {
      const currentWidth = window.innerWidth

      panelRefs.forEach((panelRef, index) => {
        if (!panelRef) return

        const isLast = index === panels.length - 1

        if (currentWidth > 1280) {
          gsap.fromTo(
            panelRef,
            {
              xPercent: -100,
              rotation: -45,
              backgroundColor: 'transparent',
            },
            {
              xPercent: 150,
              rotation: gsap.utils.random(-1, 1),
              opacity: 1,
              backgroundColor: 'rgba(255,255,255,1)',
              scrollTrigger: {
                trigger: panelRef,
                start: 'top top',
                end: isLast ? '+=100%' : 'bottom top',
                scrub: true,
                markers: false,
              },
            },
          )
        }

        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      })
    },
    { scope: containerRef, dependencies: [panels, width] },
  )

  useGSAP(
    () => {
      gsap.fromTo(
        '.testimonial',
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          stagger: 0.7,
          opacity: 1,
          ease: 'power1.inOut',
        },
      )
    },
    { scope: containerRef, dependencies: [panels] },
  )

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      <section className="z-20 pointer-events-none h-svh relative overflow-clip text-center container flex items-center justify-center">
        <StaggerContainer
          as="div"
          className="relative space-y-6 flex flex-col justify-center h-full"
        >
          <h2 data-stagger-item className="text-1sm md:text-1 uppercase tracking-wider">
            Crafted by Passion. Driven by Purpose.
          </h2>
          <p data-stagger-item className="text-6 md:text-7">
            Powered by Creativity
          </p>
          <p data-stagger-item className="text-3 md:text-5 leading-tight text-balance">
            Every service we offer is a reflection of our hive’s spirit, buzzing with energy, shaped
            by imagination, and built with care.
          </p>
          <p data-stagger-item className="text-1sm text-balance leading-tight mb-5">
            Explore how BlueBee transforms ideas into experiences that inspire, connect, and leave a
            lasting impression.
          </p>
          <div className="text-2 font-thin animate-bounce-slow">&#8595;</div>
        </StaggerContainer>
      </section>
      <div className="relative">
        <ServicesScene panels={panels} panelRefs={panelRefs} />

        {/* <ServicesScene /> */}
        {panels.map((panel, index) => (
          <Fragment
            key={index} // Added key prop for list items
          >
            <div className="min-h-svh sticky top-0 grid grid-cols-5 px-5 md:px-10 pb-5 md:pb-10 pt-[128px] pointer-events-none">
              <div
                ref={setPanelRefs(index)}
                className="col-span-5 xl:col-span-2 p-7 md:p-12 shadow-xl bg-background  border-2 border-primary panel-trigger"
              >
                <div className="relative flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-1sm uppercase tracking-wider mb-6">{panel.subTitle}</h2>
                    <p className="text-3 md:text-6xl font-medium mb-6 relative mt-10">
                      <Icons.hexagon className="text-primary absolute -z-10 -mt-5 -ml-5" />
                      {panel.title}
                    </p>
                    <p className="text-lg md:text-xl leading-tight mb-8">{panel.description}</p>
                    <ul className="md:text-lg mb-10 space-y-1">
                      {panel.offerings.map((offering, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <Icons.hexagon className="text-primary size-3 mt-2" />
                          <div>{offering}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="space-y-8 hidden sm:block"> */}
                  {/*   {panel.testimonials.slice(0, 1).map((testimonial, index) => ( */}
                  {/*     <div key={index} className="flex gap-5 testimonial"> */}
                  {/*       <div className="h-10 min-w-10 aspect-square rounded-full bg-primary/10 relative overflow-hidden border border-primary"> */}
                  {/*         {testimonial.avatar && ( */}
                  {/*           <Image */}
                  {/*             className="size-10 object-cover" */}
                  {/*             fill */}
                  {/*             src={testimonial.avatar} */}
                  {/*             alt={testimonial.author} */}
                  {/*           /> */}
                  {/*         )} */}
                  {/*       </div> */}
                  {/*       <p className="text-1sm leading-tight"> */}
                  {/*         <span className="italic">&quot;{testimonial.quote}&quot;</span> */}
                  {/*         <span> */}
                  {/*           {' '} */}
                  {/*           — {testimonial.author}, {testimonial.position} */}
                  {/*         </span> */}
                  {/*       </p> */}
                  {/*     </div> */}
                  {/*   ))} */}
                  {/* </div> */}
                </div>
                <div></div>
              </div>
            </div>
            <div className="h-[130svh]" />
          </Fragment>
        ))}
      </div>
      <div className="py-16" />

      {/* <section className="min-h-svh bg-black relative overflow-clip"></section> */}
    </div>
  )
}
