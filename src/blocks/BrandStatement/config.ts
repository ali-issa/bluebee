import type { Block } from 'payload'
import { link } from '@/fields/link'

export const BrandStatement: Block = {
  slug: 'brandStatement',
  interfaceName: 'BrandStatementBlock',
  fields: [
    {
      name: 'statement',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brand statement text with highlighted words',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [link()],
    },
  ],
}
