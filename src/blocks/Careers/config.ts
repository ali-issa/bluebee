import type { Block } from 'payload'

export const CareersBlock: Block = {
  slug: 'careers',
  interfaceName: 'Careers',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Careers',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Curiosity fuels our creativity, and fresh perspectives keep us buzzing. If you are passionate and ready to grow with us, get in touch!',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Careers Email',
      defaultValue: 'jobs@bluebeecreation.com',
      required: true,
    },
  ],
  graphQL: {
    singularName: 'Careers',
  },
  labels: {
    plural: 'Careers Blocks',
    singular: 'Careers Block',
  },
}