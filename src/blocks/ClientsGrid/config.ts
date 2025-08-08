import type { Block } from 'payload'

export const ClientsGrid: Block = {
  slug: 'clientsGrid',
  interfaceName: 'ClientsGridBlock',
  fields: [
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