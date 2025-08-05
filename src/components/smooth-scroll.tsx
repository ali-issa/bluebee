'use client'

import { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        // duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        prevent: (element) => {
          const sidebar = element.id === 'sidebar' // Adjust ID as needed
          const picker = element.id === 'picker' // Adjust ID as needed

          return sidebar || picker
        },
      }}
    >
      {children}
    </ReactLenis>
  )
}
