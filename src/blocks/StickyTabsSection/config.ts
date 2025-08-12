import type { Block } from 'payload'

export const StickyTabsSection: Block = {
  slug: 'stickyTabsSection',
  interfaceName: 'StickyTabsSectionBlock',
  fields: [
    {
      name: 'panels',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          title: 'Face to Face',
          subTitle: 'Bees Recognize Faces. So Do We.',
          description:
            'Bees can recognize human faces. At bluebee, we see the people behind the brands, not just the logos. We build genuine connections that fuel long-term partnerships.',
        },
        {
          title: 'A Vision in Full Color',
          subTitle: 'Bees See in Color. We Create in It.',
          description:
            'Bees perceive ultraviolet light, seeing what others can’t. We harness that vision to design vibrant brand identities and campaigns that stand out in any crowd.',
        },
        {
          title: 'Purposeful by Nature',
          subTitle: 'Not All Bees Sting. Ours Spark.',
          description:
            'Not every bee attacks. Ours engage, inspire, and energize. Through event management, team-building, and experiential marketing, we leave a lasting, positive buzz.',
        },
        {
          title: 'Fast & Focused',
          subTitle: '20 MPH of Creative Momentum',
          description:
            'Bees fly with speed and direction. So do we. With over 750 projects across 15 countries, our solutions move with precision and purpose.',
        },
        {
          title: 'Tireless Devotion',
          subTitle: 'Bees Don’t Sleep. Neither Does Passion.',
          description:
            'Driven by purpose, our beez buzz with round-the-clock dedication. From brainstorming to delivery, we never stop until excellence is achieved.',
        },
        {
          title: 'Caffeine Powered',
          subTitle: 'Buzzed on Ideas',
          description:
            'Bees are attracted to caffeine. We’re addicted to fresh concepts and creative sparks. Our campaigns stimulate, surprise, and stick with audiences.',
        },
        {
          title: 'Built to Last',
          subTitle: 'Economical. Exceptional.',
          description:
            'Bees engineer perfect hives with minimal resources. We follow the same principle, optimized productivity, maximum impact. Always cost- and time-efficient.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'finalHeading',
      type: 'text',
      defaultValue: 'Our Beekeepers.',
      admin: {
        description: 'Special heading for the final panel (e.g. "Our Beekeepers")',
      },
    },
    {
      name: 'clients',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'padding',
          type: 'number',
          defaultValue: 5,
          admin: {
            description: 'Padding around the logo in pixels',
          },
        },
      ],
      defaultValue: [
        { name: 'Abbott', padding: 5 },
        { name: 'Abbvie', padding: 5 },
        { name: 'Algorithm', padding: 0 },
        { name: 'Allergan', padding: 5 },
        { name: 'Astra', padding: 0 },
        { name: 'Biogen', padding: 5 },
        { name: 'Biologi', padding: 5 },
        { name: 'Boehringet', padding: 0 },
        { name: 'Bristol', padding: 7 },
        { name: 'Gilead', padding: 5 },
        { name: 'GSK', padding: 20 },
        { name: 'Ministry of Public Health', padding: 0 },
        { name: 'Insulet', padding: 15 },
        { name: 'Janssen', padding: 5 },
        { name: 'Maamora', padding: 15 },
        { name: 'MSD', padding: 0 },
        { name: 'Novartis', padding: 0 },
        { name: 'Novo', padding: 15 },
        { name: 'Phi', padding: 25 },
        { name: 'Roche', padding: 15 },
        { name: 'Sanofi', padding: 13 },
      ],
      admin: {
        description: 'Client logos displayed in hexagonal grid layout',
      },
    },
  ],
}
