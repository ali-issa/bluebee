'use client'

import React, { useRef, ReactElement, Ref, isValidElement, cloneElement } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMergeRefs } from '@/hooks/use-merge-refs' // Adjust path

type MagneticProps<T extends HTMLElement> = {
  children: ReactElement<{ ref?: Ref<T> }>
  disabled?: boolean
}

export function Magnetic<T extends HTMLElement = HTMLElement>({
  children,
  disabled = false,
}: MagneticProps<T>) {
  const internalRef = useRef<T | null>(null)

  const originalChildRef = isValidElement<{ ref?: Ref<T> }>(children)
    ? children.props.ref
    : undefined

  const mergedRef = useMergeRefs<T>(internalRef, originalChildRef)

  // --- CORRECTED GSAP LOGIC ---
  useGSAP(
    () => {
      const element = internalRef.current
      if (!element) return

      // --- DISABLED STATE ---
      if (disabled) {
        // Instantly reset position and kill ANY active tweens from previous (enabled) state
        gsap.set(element, { x: 0, y: 0 })
        gsap.killTweensOf(element)
        // Return here, do not setup any listeners or quickTo functions
        return
        // NOTE: No cleanup function is needed specifically for the disabled state,
        // because no listeners or ongoing tweens are created here.
      }

      // --- ENABLED STATE ---
      // Only create quickTo and add listeners if NOT disabled
      const xTo = gsap.quickTo(element, 'x', {
        duration: 1.5, // Keep duration for the elastic effect when enabled
        ease: 'elastic.out(1, 0.3)',
      })
      const yTo = gsap.quickTo(element, 'y', {
        duration: 1.5, // Keep duration for the elastic effect when enabled
        ease: 'elastic.out(1, 0.3)',
      })

      const mouseMove = (e: MouseEvent) => {
        // Check element existence again just in case, though unlikely needed
        if (!element) return
        const { clientX, clientY } = e
        const { width, height, top, left } = element.getBoundingClientRect()
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        xTo(x * 0.5) // Apply magnetic effect
        yTo(y * 0.5)
      }

      const mouseLeave = () => {
        // Animate back to 0 using the elastic ease defined in quickTo
        xTo(0)
        yTo(0)
      }

      element.addEventListener('mousemove', mouseMove)
      element.addEventListener('mouseleave', mouseLeave)

      // --- Cleanup for the ENABLED state ---
      // This runs when the component unmounts OR when 'disabled' becomes true
      return () => {
        element?.removeEventListener('mousemove', mouseMove)
        element?.removeEventListener('mouseleave', mouseLeave)

        // Crucially, when cleaning up the enabled state, we now check AGAIN
        // if the component is currently becoming disabled. If so, we don't
        // want the elastic reset. We let the main setup logic for the disabled
        // state handle the instant reset via gsap.set().
        // If simply unmounting while enabled, you might *want* the reset,
        // but to ensure no elastic effect when disabled, we kill tweens.
        gsap.killTweensOf(element)

        // If you absolutely needed an elastic reset ONLY on unmount while enabled,
        // it would require more complex state tracking. Killing tweens is safer.
        // For example, adding xTo(0), yTo(0) here would cause the elastic effect
        // when transitioning from enabled -> disabled.
      }
    },
    // Re-run when 'disabled' changes
    { scope: internalRef, dependencies: [disabled] },
  )

  // --- Validation & Cloning (no changes needed here) ---
  if (!isValidElement(children) || React.Children.count(children) !== 1) {
    console.error('Magnetic component requires a single valid ReactElement child.')
    return isValidElement(children) ? children : null
  }

  return cloneElement(children, {
    ref: mergedRef,
  })
}
