import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Main hero text that will be highlighted',
      },
    },
  ],
}