import { formatDate, toAbsoluteUrl } from '@/lib/utils/format'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'

import { CATEGORY_NAMES } from '@/lib/constants/blog'
import Giscus from '@/components/blog/Giscus'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { ShareButton } from '@/components/blog/ShareButton'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { getAllPosts, getPostById, getPostContent } from '@/lib/server/posts'
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

  const ogImage = frontmatter.thumbnail || SITE_CONFIG.images.ogImage

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.title,
    keywords: frontmatter.tags,
    authors: [{ name: SITE_CONFIG.author.name }],
    alternates: {
      canonical: toAbsoluteUrl(`/blog/${postId}`),
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      url: `/blog/${postId}`,
      siteName: SITE_CONFIG.name,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [SITE_CONFIG.author.name],
      tags: frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      images: [ogImage],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  // URL 파라미터에서 포스트 ID 가져오기
  const { id: postId } = await params

  // 해당 ID의 포스트가 존재하는지 확인
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
      generateBreadcrumbSchema(frontmatter.title, postId),
    ],
  }

  return (
    <>
      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <div className="relative w-full pt-20 pb-12">
        <div className="section-grid">
          {/* 왼쪽 목차 */}
          <aside className="section-left hidden md:block">
            <div className="sticky top-below-header max-w-aside">
              <TableOfContents items={toc} />
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <article className="section-right mt-3 md:mt-0 min-w-0">
            {/* 포스트 헤더 */}
            <header>
              {/* 포스트 제목 */}
              <h1 className="text-2xl font-semibold tracking-tight leading-tight">
                {frontmatter.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {/* 카테고리 */}
                <span>
                  {CATEGORY_NAMES[frontmatter.category] || frontmatter.category}
                </span>
                <span>・</span>
                {/* 작성 날짜 */}
                <span>{formatDate(frontmatter.date)}</span>
              </div>
            </header>

            {/* 포스트 본문 */}
            <div className="mt-18 prose prose-lg max-w-none prose-gray dark:prose-invert">
              <div>{content}</div>
            </div>

            {/* 공유 버튼 */}
            <div className="mt-16">
              <ShareButton url={toAbsoluteUrl(`/blog/${postId}`)} />
            </div>

            {/* 포스트 푸터 */}
            <footer className="mt-16 space-y-6">
              <Giscus />
            </footer>
          </article>
        </div>
      </div>
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
