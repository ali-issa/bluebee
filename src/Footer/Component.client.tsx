'use client'
import React from 'react'

import type { Footer } from '@/payload-types'
import { Icons } from '@/components/svg'
// import { cn } from '@/utilities/ui'
import { usePathname } from 'next/navigation'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

interface FooterClientProps {
  data: Footer
}

export function FooterClient({ data }: FooterClientProps) {
  const pathname = usePathname()

  return (
    <footer className="mt-auto border-t border-border z-20">
      <ul className="flex justify-between px-5 md:px-10 py-5 tracking-wider text-lg mt-4">
        {pathname !== '/contact' && (
          <>
            {data?.servicesLink?.url && (
              <li className="px-5 py-1 rounded-full font-semibold bg-primary text-background">
                <CMSLink
                  {...data.servicesLink}
                  className="group flex items-center gap-2"
                  appearance="inline"
                >
                  <span className="block mt-1">{data.servicesLink.label}</span>
                  <span className="transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    &#8599;
                  </span>
                </CMSLink>
              </li>
            )}
            <li className="px-5 py-1 rounded-full font-semibold bg-primary text-background">
              <Link className="group flex items-center gap-2" href={'/contact'}>
                <span className="block mt-1">{data.contactLink.label}</span>
                <span className="transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  &#8599;
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="w-full flex items-center justify-center"></div>
      <div className="text-center flex flex-col items-center justify-center h-[440px] space-y-4">
        <Icons.logoWithBee className="w-auto h-16 md:h-28 mb-20" />
        <a
          className="hover:underline text-4 md:text-6"
          href={`mailto:${data?.contactInfo?.email || 'info@bluebeecreation.com'}`}
        >
          {data?.contactInfo?.email || 'info@bluebeecreation.com'}
        </a>
        <div className="text-3 gap-4 flex flex-col md:flex-row items-center">
          {data?.contactInfo?.phoneNumbers?.map((phone, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="hidden md:block">•</span>}
              <a className="hover:underline" href={`tel:${phone.number.replace(/\s+/g, '')}`}>
                {phone.number}
              </a>
            </React.Fragment>
          ))}
        </div>
        <ul className="uppercase flex justify-between px-5 md:px-10 py-5 tracking-wider text-1sm gap-3">
          {data?.socialLinks?.map((socialLink, index) => (
            <li className="hover:underline cursor-pointer" key={index}>
              <CMSLink {...socialLink.link} className="" appearance="inline" />
            </li>
          ))}
        </ul>
      </div>
      <ul className="uppercase flex justify-between px-5 md:px-10 py-5 tracking-wider text-1sm">
        <li>
          © {new Date().getFullYear()} {data?.companyName || 'bluebee Creation'}
        </li>
        <li className="hover:underline">
          {data?.privacyPolicyLink?.url ? (
            <CMSLink {...data.privacyPolicyLink} appearance="inline">
              {data.privacyPolicyLink.label}
            </CMSLink>
          ) : (
            <CMSLink
              type="custom"
              url="/legal/privacy-policy"
              label="Privacy Policy"
              appearance="inline"
            />
          )}
        </li>
      </ul>
    </footer>
  )
}
