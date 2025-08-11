import type { Block } from 'payload'
import { link } from '@/fields/link'

export const PurposeSection: Block = {
  slug: 'purposeSection',
  interfaceName: 'PurposeSectionBlock',
  fields: [
    {
      name: 'heroText',
      type: 'textarea',
      required: true,
      defaultValue:
        "Everything we do is rooted in purpose, just like the bees that inspire us. Each move, every detail, there's intention behind it.",
      admin: {
        description: 'Main hero text that will be highlighted with TextHighlight animation',
      },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'delay',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Animation delay for liquid mask effect',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Keep scrolling to discover how the spirit of the hive shapes who we are, what we do, and how we deliver.',
      admin: {
        description: 'Description text that appears next to images',
      },
    },
    {
      name: 'brandHeadings',
      type: 'group',
      fields: [
        {
          name: 'heading1',
          type: 'text',
          required: true,
          defaultValue: 'Inspired by Bees.',
        },
        {
          name: 'heading2',
          type: 'text',
          required: true,
          defaultValue: 'Built for Impact.',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      required: true,
      fields: [link()],
    },
  ],
}

