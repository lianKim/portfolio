import { Calendar, Clock } from 'lucide-react'
import { formatDate, toAbsoluteUrl } from '@/lib/utils/format'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'

import { CATEGORY_NAMES } from '@/lib/constants/blog'
import { CategoryMenu } from '@/components/blog/CategoryMenu'
import Giscus from '@/components/blog/Giscus'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { Separator } from '@/components/ui/separator'
import { ShareButton } from '@/components/blog/ShareButton'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { getAllPosts } from '@/lib/utils/posts'
import { notFound } from 'next/navigation'
import { parseMarkdownFile } from '@/lib/utils/mdx'
import path from 'path'

interface BlogPageProps {
  params: {
    id: string
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const postId = params.id
  const allPosts = getAllPosts()
  const post = allPosts.find((p) => p.id === postId)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // 포스트 파일 경로 생성하고 파싱
  const postPath = path.join(process.cwd(), 'public/blog/posts', `${postId}.md`)
  const { frontmatter } = await parseMarkdownFile(postPath)

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
  const postId = params.id

  // 해당 ID의 포스트가 존재하는지 확인
  const allPosts = getAllPosts()
  const post = allPosts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  // 포스트 파일 경로 생성하고 파싱
  const postPath = path.join(process.cwd(), 'public/blog/posts', `${postId}.md`)
  const { frontmatter, content, readingTime } =
    await parseMarkdownFile(postPath)

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

      <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-x-5">
        {/* 왼쪽 카테고리 메뉴 */}
        <aside className="hidden md:block col-span-5">
          <div className="sticky top-[var(--sticky-top-offset)] max-w-[14rem]">
            <CategoryMenu posts={allPosts} />
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <article className="col-span-1 md:col-span-7 mt-3 md:mt-0 py-12">
          {/* 포스트 헤더 */}
          <header>
            {/* 포스트 제목 */}
            <h1 className="text-4xl font-extralight leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mt-6 h-4">
              {/* 카테고리 */}
              <span>
                {CATEGORY_NAMES[frontmatter.category] || frontmatter.category}
              </span>

              <Separator orientation="vertical" />

              {/* 작성 날짜 */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(frontmatter.date)}</span>
              </div>

              <Separator orientation="vertical" />

              {/* 읽는 시간 */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime}분</span>
              </div>
            </div>
          </header>

          <Separator className="mt-12 mb-16" />

          {/* 포스트 본문 */}
          <div className="mb-16 prose prose-lg max-w-none prose-gray dark:prose-invert">
            {/* 목차 */}
            <TableOfContents />
            <Separator className="mt-12 mb-16" />
            {/* 본문 */}
            <div>{content}</div>
          </div>

          <Separator />

          {/* 공유 버튼 */}
          <div className="my-6">
            <ShareButton url={toAbsoluteUrl(`/blog/${postId}`)} />
          </div>

          <Separator className="mb-16" />

          {/* 포스트 푸터 */}
          <footer className="space-y-6">
            <Giscus />
          </footer>
        </article>
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
