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
      defaultValue:
        'From brand ideation to global activation, bluebee is more than an agency, we’re your hive of innovation, connection, and success. Let’s build the future together.',
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
