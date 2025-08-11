import type { Block } from 'payload'

export const OurOfficesBlock: Block = {
  slug: 'ourOffices',
  interfaceName: 'OurOffices',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Our Offices',
      required: true,
    },
    {
      name: 'offices',
      type: 'array',
      label: 'Office Locations',
      minRows: 1,
      defaultValue: [
        {
          address: 'Unit 695, Level 1, Jewellery & Gemplex 3, DMCC Business Centre, Dubai, UAE',
          directionsUrl: 'https://maps.app.goo.gl/zRdx77f37sLP7YgN8',
          directionsLabel: 'Get Directions',
        },
        {
          address: '1st Floor, La Perle de Kaslik Bldg, Kaslik Road, Lebanon',
          directionsUrl: 'https://maps.app.goo.gl/McYAj4sFh7rGwtv6A',
          directionsLabel: 'Get Directions',
        },
      ],
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Office Address',
          required: true,
        },
        {
          name: 'directionsUrl',
          type: 'text',
          label: 'Google Maps URL',
          required: true,
        },
        {
          name: 'directionsLabel',
          type: 'text',
          label: 'Directions Link Label',
          defaultValue: 'Get Directions',
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'OurOffices',
  },
  labels: {
    plural: 'Our Offices Blocks',
    singular: 'Our Offices Block',
  },
}