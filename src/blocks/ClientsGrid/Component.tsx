'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { ClientsGridBlock } from '@/payload-types'

type Props = {
  className?: string
} & ClientsGridBlock

type Client = {
  name: string
  logo: string
  padding: number
}

export const ClientsGridBlockComponent: React.FC<Props> = ({ clients, className }) => {
  const { width } = useWindowSize()
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!clients || clients.length === 0) return null

  // Convert CMS clients to the format needed for rendering
  const processedClients: Client[] = clients.map((client) => ({
    name: client.name,
    logo: typeof client.logo === 'object' ? client.logo?.url || '' : '',
    padding: client.padding || 5,
  }))

  const rows: Client[][] = []
  let currentRow: Client[] = []

  processedClients.forEach((client) => {
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
    <div className={`mx-auto py-10 ${className || ''}`}>
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
                  {client.logo && (
                    <Image
                      className="object-contain grayscale max-w-full max-h-full"
                      style={{ padding: client.padding }}
                      width={100}
                      height={100}
                      src={client.logo}
                      alt={client.name}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
