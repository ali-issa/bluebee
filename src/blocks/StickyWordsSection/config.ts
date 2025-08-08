import type { Block } from 'payload'

export const StickyWordsSection: Block = {
  slug: 'stickyWordsSection',
  interfaceName: 'StickyWordsSectionBlock',
  fields: [
    {
      name: 'keyWords',
      type: 'group',
      fields: [
        {
          name: 'word1',
          type: 'text',
          required: true,
          defaultValue: 'beelieve',
        },
        {
          name: 'word2',
          type: 'text',
          required: true,
          defaultValue: 'create',
        },
        {
          name: 'word3',
          type: 'text',
          required: true,
          defaultValue: 'inspire',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'bluebee is a creative agency with a dynamic blend of passion, creativity, and devotion. We help brands beelieve in the extraordinary impact they can achieve and create powerful experiences that inspire a meaningful connection with their audiences.',
      admin: {
        description: 'Main description text with key words that will be animated',
      },
    },
  ],
}