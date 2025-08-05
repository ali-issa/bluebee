'use client'

import React, { useEffect, useRef } from 'react' // Added React import for completeness
import p5 from 'p5'

// Constants
const HEX_SIZE = 32 // Radius (distance from center to vertex)
const COLOR_R = 0
const COLOR_G = 173
const COLOR_B = 238
const STARTING_ALPHA = 0 // Alpha for the *stroke* of the current hex under mouse
const NEIGHBOR_START_ALPHA = 128 // Starting alpha for new neighbors
const BACKGROUND_COLOR = 'HSL(222, 0%, 0%)'
const PROB_OF_NEIGHBOR = 0.5
const AMT_FADE_PER_FRAME = 5
const STROKE_WEIGHT = 1

// --- Interface for neighbor data ---
interface Neighbor {
  q: number
  r: number
  x: number // Precomputed pixel coordinate
  y: number // Precomputed pixel coordinate
  opacity: number
}

const HexTrail = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Ensure container is mounted
    if (!containerRef.current) return

    // Keep track of the p5 instance
    let sketchInstance: p5 | null = null

    // --- p5 Sketch Definition ---
    const sketchFactory = (p: p5) => {
      let currentHex = { q: -1, r: -1 } // Axial coordinates of current hex
      const allNeighbors: Neighbor[] = [] // Use the interface
      let colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA)

      // Hexagon neighbor offsets (axial coordinates)
      const neighborOffsets = [
        { q: 1, r: 0 },
        { q: 1, r: -1 },
        { q: 0, r: -1 },
        { q: -1, r: 0 },
        { q: -1, r: 1 },
        { q: 0, r: 1 },
      ]

      // Convert axial coordinates (q, r) to pixel coordinates (x, y)
      function axialToPixel(q: number, r: number): { x: number; y: number } {
        const x = ((HEX_SIZE * 3) / 2) * q
        const y = HEX_SIZE * Math.sqrt(3) * (r + q / 2)
        return { x, y }
      }

      // Find the nearest hexagon axial coordinates to a pixel coordinate
      function pixelToAxial(px: number, py: number): { q: number; r: number } {
        const q = ((2 / 3) * px) / HEX_SIZE
        const r = ((-1 / 3) * px + (Math.sqrt(3) / 3) * py) / HEX_SIZE
        return hexRound(q, r) // Use hexagonal rounding
      }

      // Helper function for rounding to the nearest hex center
      function hexRound(qf: number, rf: number): { q: number; r: number } {
        const sf = -qf - rf

        let q = Math.round(qf)
        let r = Math.round(rf)
        const s = Math.round(sf)

        const q_diff = Math.abs(q - qf)
        const r_diff = Math.abs(r - rf)
        const s_diff = Math.abs(s - sf)

        if (q_diff > r_diff && q_diff > s_diff) {
          q = -r - s
        } else if (r_diff > s_diff) {
          r = -q - s
        } // else s is largest diff, do nothing as s = -q - r implicitly handled

        return { q, r }
      }

      // Calculate pixel coords ONCE when creating neighbors
      function getRandomNeighbors(q: number, r: number): Neighbor[] {
        const neighbors: Neighbor[] = []
        for (const offset of neighborOffsets) {
          const neighborQ = q + offset.q
          const neighborR = r + offset.r
          if (Math.random() < PROB_OF_NEIGHBOR) {
            const { x, y } = axialToPixel(neighborQ, neighborR) // Calculate coords here
            neighbors.push({
              q: neighborQ,
              r: neighborR,
              x: x, // Store precomputed coordinate
              y: y, // Store precomputed coordinate
              opacity: NEIGHBOR_START_ALPHA,
            })
          }
        }
        return neighbors
      }

      // Draw a hexagon at (x, y)
      function drawHexagon(x: number, y: number) {
        // Opacity set via p.stroke before calling
        p.beginShape()
        for (let i = 0; i < 6; i++) {
          const angle = (p.TWO_PI / 6) * i
          const px = x + HEX_SIZE * Math.cos(angle)
          const py = y + HEX_SIZE * Math.sin(angle)
          p.vertex(px, py)
        }
        p.endShape(p.CLOSE)
      }

      // --- p5 Setup ---
      p.setup = () => {
        // Use containerRef.current dimensions for initial setup if available, otherwise window
        const initialWidth = containerRef.current?.offsetWidth ?? p.windowWidth
        const initialHeight = containerRef.current?.offsetHeight ?? p.windowHeight
        const cnv = p.createCanvas(initialWidth, initialHeight)
        if (containerRef.current) {
          cnv.parent(containerRef.current) // Attach canvas to the container div
        }
        cnv.style('position', 'absolute')
        cnv.style('inset', '0')
        cnv.style('z-index', '-1')
        p.noFill()
        p.strokeWeight(STROKE_WEIGHT)
        colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA)
        p.stroke(colorWithAlpha)
        p.background(BACKGROUND_COLOR) // Initial background clear
      }

      // --- p5 Window Resize Handling ---
      p.windowResized = () => {
        if (typeof p === 'undefined') return
        // Use containerRef.current dimensions if available on resize
        const newWidth = containerRef.current?.offsetWidth ?? p.windowWidth
        const newHeight = containerRef.current?.offsetHeight ?? p.windowHeight
        p.resizeCanvas(newWidth, newHeight)
        p.background(BACKGROUND_COLOR) // Clear background on resize
      }

      // --- p5 Draw Loop ---
      p.draw = () => {
        p.background(BACKGROUND_COLOR)

        // Mouse Interaction
        if (p.mouseX >= 0 && p.mouseX < p.width && p.mouseY >= 0 && p.mouseY < p.height) {
          const { q, r } = pixelToAxial(p.mouseX, p.mouseY)

          if (q !== currentHex.q || r !== currentHex.r) {
            currentHex = { q, r }
            allNeighbors.push(...getRandomNeighbors(q, r))
          }

          const { x, y } = axialToPixel(currentHex.q, currentHex.r)
          p.stroke(colorWithAlpha) // Use the base color with low alpha
          drawHexagon(x, y)
        } else {
          currentHex = { q: -1, r: -1 } // Reset current hex if mouse leaves canvas
        }

        // Draw and Update Neighbors (Optimized Loop)
        for (let i = allNeighbors.length - 1; i >= 0; i--) {
          const neighbor = allNeighbors[i]

          if (!neighbor) return

          neighbor.opacity = p.max(0, neighbor.opacity - AMT_FADE_PER_FRAME)

          if (neighbor.opacity <= 0) {
            allNeighbors.splice(i, 1) // Remove faded neighbors efficiently
          } else {
            p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity)
            drawHexagon(neighbor.x, neighbor.y) // Use precomputed coordinates
          }
        }
      }

      // NOTE: The custom p.remove function that caused the error has been removed.
      // p5's own p.remove() will be called during cleanup.
    } // End of sketchFactory

    // --- Create and Cleanup p5 Instance ---
    sketchInstance = new p5(sketchFactory)

    // Cleanup function for useEffect
    return () => {
      if (sketchInstance) {
        // Call the original p5 remove method on the instance
        sketchInstance.remove()
      }
    }
  }, []) // Empty dependency array ensures this runs only on mount/unmount

  // Container div for the p5 canvas
  // Ensure the container itself takes up the space where you want the canvas
  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}></div>
}

export default HexTrail
