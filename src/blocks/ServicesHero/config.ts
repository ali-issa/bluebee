import type { Block } from 'payload'

export const ServicesHeroBlock: Block = {
  slug: 'servicesHero',
  interfaceName: 'ServicesHeroBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Crafted by Passion. Driven by Purpose.',
      admin: {
        description: 'Small uppercase tagline text',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Powered by Creativity',
      admin: {
        description: 'Main large heading',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        "Every service we offer is a reflection of our hive's spirit, buzzing with energy, shaped by imagination, and built with care.",
      admin: {
        description: 'Main description paragraph',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Explore how BlueBee transforms ideas into experiences that inspire, connect, and leave a lasting impression.',
      admin: {
        description: 'Subtitle paragraph below main description',
      },
    },
  ],
}

