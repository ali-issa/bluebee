'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

type Client = {
  name: string
  logo: string
  padding: number
}

const DEFAULT_CLIENTS_GRID_PADDING = 5

const clients: Client[] = [
  { name: 'Abbott', logo: '/client-logos/abbott.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'Abbvie', logo: '/client-logos/abbvie.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'Algorithm', logo: '/client-logos/algorithm.svg', padding: 0 },
  { name: 'Allergan', logo: '/client-logos/allergan.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'Astra', logo: '/client-logos/astra.svg', padding: 0 },
  { name: 'Biogen', logo: '/client-logos/biogen.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'Biologi', logo: '/client-logos/biologi.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  {
    name: 'Boehringet',
    logo: '/client-logos/boehringet.svg',
    padding: 0,
  },
  { name: 'Bristol', logo: '/client-logos/bristol.png', padding: 7 },
  { name: 'Gilead', logo: '/client-logos/gilead.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'GSK', logo: '/client-logos/gsk.svg', padding: 20 },
  {
    name: 'Ministry of Public Health',
    logo: '/client-logos/health-ministry.svg',
    padding: 0,
  },
  { name: 'Insulet', logo: '/client-logos/insulet.svg', padding: 15 },
  { name: 'Janssen', logo: '/client-logos/janssen.svg', padding: DEFAULT_CLIENTS_GRID_PADDING },
  { name: 'Maamora', logo: '/client-logos/maamora.png', padding: 15 },
  { name: 'MSD', logo: '/client-logos/msd.svg', padding: 0 },
  { name: 'Novartis', logo: '/client-logos/novartis.svg', padding: 0 },
  { name: 'Novo', logo: '/client-logos/novo.svg', padding: 15 },
  { name: 'Phi', logo: '/client-logos/phi.svg', padding: 25 },
  { name: 'Roche', logo: '/client-logos/roche.svg', padding: 15 },
  { name: 'Sanofi', logo: '/client-logos/sanofi.svg', padding: 13 },
]

export const ClientsGrid = () => {
  const rows: Client[][] = []
  let currentRow: Client[] = []
  const { width } = useWindowSize()
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  clients.forEach((client) => {
    currentRow.push(client)

    const r = () => {
      if (width < 768) {
        return rows.length % 2 === 0 ? 3 : 2
      } else {
        return rows.length % 2 === 0 ? 5 : 4
      }
    }

    if (currentRow.length === r()) {
      rows.push(currentRow)
      currentRow = []
    }
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  // Use default styles for server-side rendering
  // Only apply dynamic styles when component has mounted on client
  const getHexWidth = () => (mounted ? `${140 * Math.max(width / 1920, 0.7)}px` : 'auto')
  const getHexHeight = () => (mounted ? `${150 * Math.max(width / 1920, 0.7)}px` : 'auto')
  const getRowMargin = (rowIndex: number) => {
    if (rowIndex === 0) return '0'
    return mounted ? `${-35 * Math.max(width / 1920, 0.7)}px` : '0'
  }

  return (
    <div className="mx-auto py-10">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center"
          style={{
            marginTop: getRowMargin(rowIndex),
          }}
        >
          {row.map((client, index) => (
            <div
              className="relative m-0.5"
              key={index}
              style={{
                width: getHexWidth(),
                height: getHexHeight(),
              }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <Image
                    className="object-contain grayscale max-w-full max-h-full"
                    style={{ padding: client.padding }}
                    width={100}
                    height={100}
                    src={client.logo}
                    alt={client.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
