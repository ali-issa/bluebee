'use client'

import React, { useRef, type ReactNode, type HTMLAttributes } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins - it's safer to do this outside the component render cycle
// if possible, e.g., in your app's entry point or a layout file.
// But doing it here is okay for client components.
gsap.registerPlugin(ScrollTrigger) // Removed useGSAP from registration, it's a hook

// --- Default Animation Properties ---
const defaultFromVars: gsap.TweenVars = {
  y: 24,
  opacity: 0,
  filter: 'blur(8px)',
  transformOrigin: 'center center',
}

const defaultToVars: gsap.TweenVars = {
  y: 0,
  opacity: 1,
  filter: 'blur(0px)',
  duration: 1,
  ease: 'power2.out',
}

// --- Component Props ---
type StaggerOnScrollContainerProps<T extends keyof HTMLElementTagNameMap = 'div'> = {
  as?: T
  children: ReactNode
  // Removed staggerDelay and staggerAmount as they are not used in this individual trigger pattern
  fromVars?: gsap.TweenVars
  toVars?: gsap.TweenVars
  animateOnce?: boolean
  scrollTriggerStart?: string // Keep this for individual item trigger start
  scrollTriggerEnd?: string // Keep this for individual item trigger end (less critical if once=true)
  debugMarkers?: boolean
  childSelector?: string
} & Omit<HTMLAttributes<HTMLElementTagNameMap[T]>, 'children' | 'as'>

// --- Component Implementation ---
export const StaggerContainer = <T extends keyof HTMLElementTagNameMap = 'div'>(
  props: StaggerOnScrollContainerProps<T>, // Renamed props type for clarity
) => {
  const {
    as,
    children,
    // Removed staggerDelay, staggerAmount
    fromVars: customFromVars = {},
    toVars: customToVars = {},
    animateOnce = true,
    scrollTriggerStart = 'top bottom-=100px', // Start when item top is 50px above viewport bottom
    scrollTriggerEnd = 'bottom top+=50px', // End when item bottom is 50px below viewport top
    debugMarkers = false,
    childSelector = '[data-stagger-item]',
    ...restProps
  } = props

  const Component = as ?? 'div'
  const containerRef = useRef<HTMLElement>(null)

  const mergedFromVars = { ...defaultFromVars, ...customFromVars }
  const mergedToVars = { ...defaultToVars, ...customToVars }

  useGSAP(
    () => {
      // No need to check for ScrollTrigger if registered globally/reliably
      // const tl = gsap.timeline(); // No timeline needed for this approach

      const elements = gsap.utils.toArray<Element>(
        containerRef.current?.querySelectorAll(childSelector) ?? [],
      )

      if (elements.length === 0) {
        return
      }

      // --- Create individual animations and ScrollTriggers for each element ---
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          mergedFromVars, // Starting state for this element
          {
            ...mergedToVars, // Ending state & common tween properties
            scrollTrigger: {
              trigger: element, // *** KEY CHANGE: Trigger based on the element itself ***
              start: scrollTriggerStart,
              end: scrollTriggerEnd,
              once: animateOnce,
              markers: debugMarkers && process.env.NODE_ENV === 'development',
              // toggleActions: defaults are fine for 'once: true' ('play none none none')
              // If animateOnce is false, you might want:
              // toggleActions: "play reverse play reverse",
            },
            // *** REMOVED: No need for stagger or delay properties here anymore ***
            // delay: ...,
            // stagger: ...,
          },
        )
      })
    },
    {
      scope: containerRef,
      dependencies: [
        // Dependencies that affect the animation or triggering
        animateOnce,
        scrollTriggerStart,
        scrollTriggerEnd,
        childSelector,
        customFromVars, // Use stringify for deep comparison if needed
        customToVars, // Use stringify for deep comparison if needed
      ],
      revertOnUpdate: true, // Cleans up animations/triggers if dependencies change
    },
  )

  return React.createElement(
    Component,
    {
      ref: containerRef,
      ...restProps,
    },
    children,
  )
}

// Usage Example (assuming you have elements with the data attribute):
// <StaggerOnScrollContainer as="ul" className="my-list">
//   <li data-stagger-item>Item 1</li>
//   <li data-stagger-item>Item 2</li>
//   <li data-stagger-item>Item 3</li>
//   {/* ... more items ... */}
// </StaggerOnScrollContainer>
