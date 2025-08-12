import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    link({
      overrides: {
        name: 'servicesLink',
        admin: {
          description: 'Services link in footer top section',
        },
      },
    }),
    link({
      overrides: {
        name: 'contactLink',
        admin: {
          description: 'Contact Us link in footer top section',
        },
      },
    }),
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'info@bluebeecreation.com',
        },
        {
          name: 'phoneNumbers',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [{ number: '+971 56 394 1288' }, { number: '+961 78 942 777' }],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      defaultValue: [
        {
          link: {
            type: 'custom',
            url: 'https://www.facebook.com/bluebee.creation/',
            label: 'Facebook',
            newTab: true,
          },
        },
        {
          link: {
            type: 'custom',
            url: 'https://www.instagram.com/bluebeecreation',
            label: 'Instagram',
            newTab: true,
          },
        },
        {
          link: {
            type: 'custom',
            url: 'https://www.linkedin.com/company/bluebee-creation/',
            label: 'LinkedIn',
            newTab: true,
          },
        },
      ],
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Social media links using standard link field',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'bluebee Creation',
    },
    link({
      overrides: {
        name: 'privacyPolicyLink',
        admin: {
          description: 'Privacy policy link in footer bottom',
        },
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
