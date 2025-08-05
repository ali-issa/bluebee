'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BurgerIcon } from '@/components/burger-icon'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import gsap from 'gsap'

import type { Header as HeaderType } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'

const menuLinks = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/services',
    label: 'Services',
  },
  // {
  //   path: '/posts',
  //   label: 'Journal',
  // },
  {
    path: '/contact',
    label: 'Contact',
  },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const burgerRef = useRef<HTMLButtonElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null) // Added type for tl

  const [isOpen, setIsOpen] = useState(false)

  // GSAP Animation Setup (targets class names)
  useGSAP(
    () => {
      // Ensure initial state for elements animated by GSAP
      gsap.set('.menu-link-item-holder', { y: 75 })

      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          // Target the .menu-overlay class
          duration: 1.25,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-holder', {
          // Target the .menu-link-item-holder class
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          delay: -0.75,
        })
    },
    { scope: containerRef },
  )

  // Toggle Menu State and Animation
  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (!tl.current) return
    if (isOpen) tl.current.play()
    else tl.current.reverse()
  }, [isOpen])

  return (
    <nav ref={containerRef} className="flex gap-3 items-center">
      <BurgerIcon isOpen={isOpen} onClick={toggleMenu} burgerRef={burgerRef} />
      <div className="menu-overlay fixed top-0 left-0 w-screen h-screen pt-32 md:pt-40 menu-overlay-enhanced  z-20 [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]">
        <div className="container flex h-full">
          {/* --- Content inside the overlay --- */}

          {/* Inner Bar for Logo/Close inside Overlay */}
          <div className="absolute top-0 left-0 w-full flex justify-between items-center h-32">
            <div className="container">
              <Link href={'/'} className="cursor-pointer">
                <Logo />
              </Link>
            </div>
          </div>

          {/* Main Menu Content Section (Flex Item) */}
          <div className="menu-copy w-full flex flex-col justify-between py-5 gap-8">
            <ul className="menu-links space-y-8">
              {menuLinks.map((link, index) => (
                <li className="overflow-hidden" onClick={toggleMenu} key={index}>
                  <div className="menu-link-item-holder">
                    <Link
                      href={link.path}
                      className="relative cursor-pointer text-background text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[85%] hover:border-b-[5px] hover:text-primary border-dashed hover:font-medium"
                    >
                      {link.label}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex text-background font-light">
              {/* Info Column 1 */}
              <div className="flex-1 flex flex-col justify-end space-y-1">
                <a href="https://www.instagram.com/bluebeecreation">Instagram &#8599;</a>
                <a href="https://www.linkedin.com/company/bluebee-creation/">LinkedIn &#8599;</a>
                <a href="https://www.behance.net/bluebeecreation">Behance &#8599;</a>
                <a href="https://www.facebook.com/bluebee.creation/">Facebook &#8599;</a>
              </div>
              {/* Info Column 2 */}
              <div className="flex-1 flex flex-col justify-end space-y-1">
                <a className="hover:underline" href="mailto:info@bluebeecreation.com">
                  info@bluebeecreation.com
                </a>
                <a className="hover:underline" href="tel:+971563941288">
                  +971 56 394 1288
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
