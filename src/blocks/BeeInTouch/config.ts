import type { Block } from 'payload'

export const BeeInTouchBlock: Block = {
  slug: 'beeInTouch',
  interfaceName: 'BeeInTouch',
  fields: [
    {
      name: 'heroImageSrc',
      type: 'text',
      label: 'Hero Image Source',
      defaultValue: '/images/bluebee_phone.png',
      required: true,
    },
    {
      name: 'heroImageAlt',
      type: 'text',
      label: 'Hero Image Alt Text',
      defaultValue: 'A hand holding a rotary phone speaker',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Contact Form',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Form Intro Content',
      defaultValue: false,
    },
  ],
  graphQL: {
    singularName: 'BeeInTouch',
  },
  labels: {
    plural: 'Bee In Touch Blocks',
    singular: 'Bee In Touch Block',
  },
}