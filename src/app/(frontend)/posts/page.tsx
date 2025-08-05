import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { StaggerContainer } from '@/components/animations/stagger-container'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-32 pb-48">
      <PageClient />
      <div className="px-5 md:px-10 mt-40 mb-10">
        <StaggerContainer className="max-w-none">
          <h1 data-stagger-item className="text-8">
            Journal
          </h1>
        </StaggerContainer>
      </div>

      {/* <div className="container mb-8"> */}
      {/*   <PageRange */}
      {/*     collection="posts" */}
      {/*     currentPage={posts.page} */}
      {/*     limit={12} */}
      {/*     totalDocs={posts.totalDocs} */}
      {/*   /> */}
      {/* </div> */}

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `bluebee Creation`,
  }
}
