import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      defaultValue: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: null,
            },
            label: 'Home',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/services',
            label: 'Services',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Social media links shown in the navigation overlay',
      },
      defaultValue: [
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
        {
          link: {
            type: 'custom',
            url: 'https://www.behance.net/bluebeecreation',
            label: 'Behance',
            newTab: true,
          },
        },
        {
          link: {
            type: 'custom',
            url: 'https://www.facebook.com/bluebee.creation/',
            label: 'Facebook',
            newTab: true,
          },
        },
      ],
    },
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
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+971 56 394 1288',
          admin: {
            description: 'Phone number shown in navigation overlay',
          },
        },
      ],
      admin: {
        description: 'Contact information shown in the navigation overlay',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
