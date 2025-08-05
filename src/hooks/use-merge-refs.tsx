import { useCallback, Ref, RefObject } from 'react'

// Define a type for possible ref types React accepts
type PossibleRef<T> = Ref<T> | undefined | null

/**
 * Merges multiple refs into a single callback ref.
 * Useful for components that need to apply both a forwarded ref and a local ref to the same DOM element.
 * Handles both RefObject and callback refs.
 *
 * @param refs - An array of refs (RefObject or callback function) to be merged.
 * @returns A single callback ref function.
 */
export function useMergeRefs<T>(...refs: PossibleRef<T>[]) {
  return useCallback(
    (element: T | null) => {
      refs.forEach((ref) => {
        if (!ref) {
          return // Skip null or undefined refs
        }
        if (typeof ref === 'function') {
          // If it's a callback ref, call it with the element
          ref(element)
        } else {
          // If it's a ref object (RefObject), assign the element to its .current property
          // Type assertion is safe here because we know 'ref' is a RefObject
          ;(ref as RefObject<T | null>).current = element
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs, // Dependency array: Re-create the callback if the array of refs changes
  )
}
