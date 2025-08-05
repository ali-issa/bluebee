import type { Block } from 'payload'

export const HomePage: Block = {
  slug: 'homePage',
  fields: [
    {
      name: 'firstSectionText',
      type: 'textarea',
    },
  ],
  interfaceName: 'HomePageBlock',
}
