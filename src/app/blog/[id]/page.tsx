import {
  buildDetailMetadata,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'
import { formatDate, toAbsoluteUrl } from '@/lib/utils/format'
import { getAllPosts, getPostById, getPostContent } from '@/lib/server/posts'

import { CATEGORY_NAMES } from '@/lib/constants/blog'
import { DetailLayout } from '@/components/shared/DetailLayout'
import Giscus from '@/components/blog/Giscus'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { ShareButton } from '@/components/blog/ShareButton'
import { notFound } from 'next/navigation'

interface BlogPageProps {
  params: Promise<{ id: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { id: postId } = await params
  const post = getPostById(postId)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const { frontmatter } = await getPostContent(postId)

  return buildDetailMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/blog/${postId}`,
    ogImage: frontmatter.thumbnail || SITE_CONFIG.images.ogImage,
    publishedTime: frontmatter.date,
    tags: frontmatter.tags,
  })
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id: postId } = await params
  const post = getPostById(postId)

  if (!post) {
    notFound()
  }

  const { frontmatter, content, toc } = await getPostContent(postId)

  // JSON-LD 구조화된 데이터 생성
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateBlogPostingSchema(postId, frontmatter),
      generateBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: frontmatter.title, path: `/blog/${postId}` },
      ]),
    ],
  }

  return (
    <>
      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <DetailLayout
        toc={toc}
        header={
          <header>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight">
              {frontmatter.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>
                {CATEGORY_NAMES[frontmatter.category] || frontmatter.category}
              </span>
              <span>・</span>
              <span>{formatDate(frontmatter.date)}</span>
            </div>
          </header>
        }
        footer={
          <>
            {/* 공유 버튼 */}
            <div className="mt-16">
              <ShareButton url={toAbsoluteUrl(`/blog/${postId}`)} />
            </div>
            {/* 댓글 */}
            <footer className="mt-16 space-y-6">
              <Giscus />
            </footer>
          </>
        }
      >
        {content}
      </DetailLayout>
    </>
  )
}

// 빌드 타임에 모든 블로그 포스트를 정적으로 생성
export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}
