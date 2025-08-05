import { useCallback, useRef } from 'react'

/**
 * Hook for managing multiple element references
 *
 * @template T - The type of elements being referenced (e.g., HTMLDivElement)
 * @template K - The type of keys used for identification (defaults to string | number)
 *
 * @returns An object containing methods and data for managing refs
 */
export function useRefs<T, K extends string | number = string | number>() {
  // Use Map to store refs with their keys for better lookup performance
  const refsMap = useRef<Map<K, T>>(new Map())

  // Array to store refs in order (for index-based access)
  const refsArray = useRef<T[]>([])

  /**
   * Set a ref by index position in an array
   *
   * @param index - The position in the array
   * @returns A callback ref function for React
   */
  const setRef = useCallback(
    (index: number) => (element: T | null) => {
      if (element) {
        refsArray.current[index] = element
      } else if (refsArray.current[index]) {
        // Handle unmounting: create a new array without the removed element
        refsArray.current = refsArray.current.filter((_, i) => i !== index)
      }
    },
    [],
  )

  /**
   * Set a ref by a stable key
   *
   * @param key - Unique identifier for the element
   * @returns A callback ref function for React
   */
  const setKeyedRef = useCallback(
    (key: K) => (element: T | null) => {
      if (element) {
        refsMap.current.set(key, element)
      } else {
        // Handle unmounting
        refsMap.current.delete(key)
      }
    },
    [],
  )

  /**
   * Get a ref by key
   *
   * @param key - The key for the referenced element
   * @returns The referenced element or undefined if not found
   */
  const getRef = useCallback((key: K): T | undefined => {
    return refsMap.current.get(key)
  }, [])

  /**
   * Get a ref by index
   *
   * @param index - The index of the referenced element
   * @returns The referenced element or undefined if not found
   */
  const getRefByIndex = useCallback((index: number): T | undefined => {
    return refsArray.current[index]
  }, [])

  /**
   * Check if a specific key has a reference
   *
   * @param key - The key to check
   * @returns Boolean indicating if the ref exists
   */
  const hasRef = useCallback((key: K): boolean => {
    return refsMap.current.has(key)
  }, [])

  return {
    setRef, // For array/index-based refs
    setKeyedRef, // For key-based refs
    getRef, // Get element by key
    getRefByIndex, // Get element by index
    hasRef, // Check if key exists
    refs: refsArray.current, // All refs as array
    refsMap: refsMap.current, // All refs as map
  }
}
