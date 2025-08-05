'use client'
import React, { useEffect, useState } from 'react'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false) // New state for pressed

  // Update cursor position
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateCursorPosition)
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  // Detect hover over interactive elements
  useEffect(() => {
    const handleHover = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    const interactiveElements = document.querySelectorAll('a, button')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  // Detect mouse press and release
  useEffect(() => {
    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      className={`cursor-dot shadow blur-sm border ${isHovering ? 'hover' : ''} ${isPressed ? 'pressed' : ''}`}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    />
  )
}

export default Cursor
