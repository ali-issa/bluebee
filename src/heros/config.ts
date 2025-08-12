import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { kill } from 'process'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Home Hero',
          value: 'homeHero',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      maxLength: 30,
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
      defaultValue: 'Pollinating Creative Solutions',
    },
    {
      name: 'marqueeItems',
      label: 'Marquee Items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          maxLength: 25,
        },
      ],
      defaultValue: [{ item: 'beelieve' }, { item: 'create' }, { item: 'inspire' }],
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
    {
      name: 'verticalSliderLines',
      label: 'Vertical Slider Lines',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          maxLength: 25,
        },
      ],
      defaultValue: [
        { text: 'Creating extraordinary' },
        { text: 'Delivering excellence' },
        { text: 'Building global visions' },
        { text: 'Buzzing for 17 years' },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },

    {
      name: 'video',
      type: 'upload',
      filterOptions: { mimeType: { contains: 'video' } },
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
      relationTo: 'media',
      required: true,
    },

    {
      name: 'videoPoster',
      label: 'Video Poster',
      type: 'upload',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
      relationTo: 'media',
      required: true,
    },

    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type !== 'homeHero',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
