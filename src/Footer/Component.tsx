'use client'
// import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { Icons } from '@/components/svg'
import { cn } from '@/utilities/ui'
import { usePathname } from 'next/navigation'

const menuLinks = [
  {
    path: '/posts',
    label: 'Journal',
    bgColor: '',
  },
  {
    path: '/services',
    label: 'Services',
    className: 'bg-primary text-background',
  },
  {
    path: '/contact',
    label: 'Contact Us',
    className: 'bg-primary text-background',
  },
]

const socialLinks = [
  {
    path: 'https://www.instagram.com/bluebeecreation',
    label: 'Instagram',
  },
  {
    path: 'https://www.facebook.com/bluebee.creation/',
    label: 'Facebook',
  },
  {
    path: 'https://www.linkedin.com/company/bluebee-creation/',
    label: 'LinkedIn',
  },
]

export function Footer() {
  // const footerData: Footer = await getCachedGlobal('footer', 1)()

  // const navItems = footerData?.navItems || []

  const pathname = usePathname()

  return (
    <footer className="mt-auto border-t border-border z-20">
      <ul className="flex justify-between px-5 md:px-10 py-5 tracking-wider text-lg mt-4">
        {pathname !== '/contact' &&
          menuLinks.slice(2).map((link, index) => (
            <li className={cn('px-5 py-1 rounded-full font-semibold', link.className)} key={index}>
              <Link className="group flex items-center gap-2" href={link.path}>
                <span className="block mt-1">{link.label}</span>
                <span className="transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  &#8599;
                </span>
              </Link>
            </li>
          ))}
      </ul>
      <div className="w-full flex items-center justify-center"></div>
      <div className="text-center flex flex-col items-center justify-center h-[440px] space-y-4">
        <Icons.logoWithBee className="w-auto h-16 md:h-28 mb-20" />
        <a className="hover:underline text-4 md:text-6" href="mailto:info@bluebeecreation.com">
          info@bluebeecreation.com
        </a>
        <div className="text-3 gap-4 flex flex-col md:flex-row items-center">
          <a className="hover:underline" href="tel:+971563941288">
            +971 56 394 1288
          </a>
          <span className="hidden md:block">•</span>
          <a className="hover:underline" href="tel:+96178942777">
            +961 78 942 777
          </a>
        </div>
        <ul className="uppercase flex justify-between px-5 md:px-10 py-5 tracking-wider text-1sm gap-3">
          {socialLinks.map((link, index) => (
            <li className="hover:underline cursor-pointer" key={index}>
              <a target="_blank" rel="noopener noreferrer" href={link.path}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="uppercase flex justify-between px-5 md:px-10 py-5 tracking-wider text-1sm">
        <li>© {new Date().getFullYear()} bluebee Creation</li>
        <li className="hover:underline">
          <Link href={'/legal/privacy-policy'}>Privacy Policy</Link>
        </li>
      </ul>
    </footer>
  )
}
