import { RefObject } from 'react'
import { cn } from '@/utilities/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(useGSAP)

interface BurgerMenuProps {
  isOpen: boolean
  onClick: () => void
  burgerRef: RefObject<HTMLButtonElement | null>
}

export const BurgerIcon: React.FC<BurgerMenuProps> = ({ isOpen, onClick, burgerRef }) => {
  const pathname = usePathname()

  useGSAP(() => {
    if (!burgerRef.current) return
    // Create timeline with initial states
    gsap.set(burgerRef.current, {
      opacity: 0, // Start hidden
      y: 20, // Start 20px below
    })

    // Animation
    gsap.to(burgerRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      delay: 1.5,
      ease: 'power2.out', // Smoother easing
      overwrite: 'auto', // Prevents conflicts
    })
  })

  return (
    <button
      ref={burgerRef}
      onClick={onClick}
      className={cn(
        'z-50 flex items-center relative size-16 focus:outline-none bg-transparent border-none opacity-0',
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="size-full flex flex-col justify-center items-center text-background">
        {/* Top line */}
        <div
          className={cn(
            'h-0.5 absolute transition-all duration-300 ease-in-out',
            isOpen
              ? 'w-12 md:w-16 transform rotate-45 translate-y-0'
              : 'w-12 md:w-16 transform -translate-y-[8px]',
            pathname === '/' ? 'bg-background' : 'bg-foreground',
          )}
        />
        {/* Bottom line */}
        <div
          className={cn(
            'h-0.5 absolute transition-all duration-300 ease-in-out',
            isOpen
              ? 'w-12 md:w-16 transform -rotate-45 translate-y-0'
              : 'w-12 md:w-16 transform translate-y-[8px]',
            pathname === '/' ? 'bg-background' : 'bg-foreground',
          )}
        />
      </div>
    </button>
  )
}
