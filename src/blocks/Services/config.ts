import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      ...link({
        appearances: false,
        overrides: {
          name: 'ctaLink',
          admin: {
            description: 'Link shown when hovering over service panels',
          },
        },
      }),
    },
    {
      name: 'servicesPanels',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Main service title (e.g., "Advertising & Branding")',
          },
        },
        {
          name: 'subTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Service tagline (e.g., "Shaping Identities. Spreading Buzz.")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Detailed service description',
          },
        },
        {
          name: 'cta',
          type: 'text',
          required: true,
          admin: {
            description: 'Call-to-action text that appears on hover',
          },
        },
        {
          name: 'offerings',
          type: 'array',
          fields: [
            {
              name: 'offering',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'List of service offerings with bullet points',
          },
        },
        {
          name: 'testimonials',
          type: 'array',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'author',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
              required: true,
            },
            {
              name: 'avatar',
              type: 'text',
              admin: {
                description: 'Avatar URL (optional)',
              },
            },
          ],
          admin: {
            description: 'Client testimonials for this service',
          },
        },
      ],
      admin: {
        description: 'List of all services offered',
      },
      defaultValue: [
        {
          title: 'Advertising & Branding',
          subTitle: 'Shaping Identities. Spreading Buzz.',
          description:
            'We craft brands that are impossible to ignore. From bold campaigns to unforgettable visuals, we turn ideas into living, breathing experiences that leave a lasting sting, the good kind.',
          cta: 'Transform your brand',
          offerings: [
            { offering: '360° advertising campaigns that spark conversations' },
            { offering: 'Distinctive brand identity designs that capture hearts' },
            { offering: 'Story-driven visuals that stand the test of time' },
          ],
          testimonials: [
            {
              quote:
                'bluebee captured our brand essence like no one else. Our identity finally feels alive.',
              author: 'Alex Carter',
              position: 'Marketing Director @ BloomCorp',
              avatar: 'https://i.pravatar.cc/300?img=1',
            },
          ],
        },
        {
          title: 'Digital & B2B Marketing',
          subTitle: 'Buzzing Across Every Channel',
          description:
            'In a world of noise, we help brands speak louder, smarter, and clearer. Our digital and B2B marketing strategies connect brands to audiences, and to opportunity.',
          cta: 'Amplify your reach',
          offerings: [
            { offering: 'Powerful digital and traditional content that resonates' },
            { offering: 'Business and event strategies that drive real-world results' },
            { offering: 'Intelligent campaigns crafted to expand your reach' },
          ],
          testimonials: [
            {
              quote:
                "bluebee's digital strategy opened doors we did not even know existed. The results speak for themselves.",
              author: 'Victor Stone',
              position: 'Head of Growth @ Orion Enterprises',
              avatar: 'https://i.pravatar.cc/300?img=21',
            },
          ],
        },
        {
          title: 'Video & Animation',
          subTitle: 'Bringing Stories to Life, Frame by Frame',
          description:
            'We turn ideas into motion, blending storytelling with stunning visuals. From 2D magic to 3D worlds, we create videos and animations that move hearts, and brands forward.',
          cta: 'Bring your story to life',
          offerings: [
            { offering: '2D animations that captivate and communicate' },
            { offering: '3D animations that build immersive worlds' },
            { offering: 'Video production that turns vision into visual impact' },
          ],
          testimonials: [
            {
              quote:
                'The animation bluebee produced for us captured more than our message, it captured imaginations.',
              author: 'Daniel Reed',
              position: 'Creative Lead @ Horizon Media',
              avatar: 'https://i.pravatar.cc/300?img=7',
            },
          ],
        },
        {
          title: 'Experiential Engagement',
          subTitle: 'Where Experience Meets Emotion',
          description:
            'We turn moments into movements. Our experiential marketing creates immersive worlds that captivate senses, spark joy, and build unforgettable bonds with your audience.',
          cta: 'Create memorable moments',
          offerings: [
            { offering: 'Mall activations that stop shoppers in their tracks' },
            { offering: 'Immersive experiences that transport and inspire' },
            { offering: 'Custom engagements designed to leave a lasting impression' },
          ],
          testimonials: [
            {
              quote:
                "bluebee's experiential activations turned our campaign into a phenomenon. People are still talking about it months later.",
              author: 'Emily Sanchez',
              position: 'Brand Manager @ PulseWear',
              avatar: 'https://i.pravatar.cc/300?img=10',
            },
          ],
        },
        {
          title: 'Event Management',
          subTitle: 'Crafted Moments. Lasting Impressions.',
          description:
            'We bring ideas to life with precision and passion. From concept to curtain call, our events are built to captivate, engage, and create unforgettable memories.',
          cta: 'Elevate your events',
          offerings: [
            { offering: 'Theme creation that sets the perfect tone' },
            { offering: 'Flawless planning and seamless execution' },
            { offering: 'Bespoke experiences designed for maximum impact' },
          ],
          testimonials: [
            {
              quote:
                "Our event exceeded every expectation. Every detail reflected our brand beautifully, thanks to bluebee's magic.",
              author: 'Maya Al Farsi',
              position: 'Event Director @ Lumina Group',
              avatar: 'https://i.pravatar.cc/300?img=13',
            },
          ],
        },
        {
          title: 'Team Building Activities',
          subTitle: 'Energize Your Hive',
          description:
            "Great teams don't just happen, they're nurtured. We design dynamic team-building experiences that inspire connection, ignite energy, and strengthen every link in the hive.",
          cta: 'Energize your team',
          offerings: [
            { offering: 'Lifestyle coaching sessions that unlock true potential' },
            { offering: 'Energy workshops that fuel motivation and creativity' },
            { offering: 'Tailor-made activities that turn coworkers into collaborators' },
          ],
          testimonials: [
            {
              quote:
                'Our team came back more united, energized, and motivated than ever before. A truly transformative experience.',
              author: 'Sophie Lin',
              position: 'HR Manager @ Nexora Solutions',
              avatar: 'https://i.pravatar.cc/300?img=16',
            },
          ],
        },
      ],
    },
  ],
}
