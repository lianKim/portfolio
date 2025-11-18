import { Calendar, Clock } from 'lucide-react'

import { CategoryMenu } from '@/components/blog/CategoryMenu'
import Giscus from '@/components/blog/Giscus'
import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils/format'
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

  const ogImage = frontmatter.thumbnail || '/images/opengraph-image.webp'

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.title,
    keywords: frontmatter.tags,
    authors: [{ name: '김리안' }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      url: `/blog/${postId}`,
      siteName: '김리안 포트폴리오',
      type: 'article',
      publishedTime: frontmatter.date,
      authors: ['김리안'],
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

  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-x-5">
      {/* 왼쪽 카테고리 메뉴 */}
      <aside className="hidden md:block col-span-5">
        <div className="sticky top-[var(--sticky-top-offset)] max-w-[14rem]">
          <CategoryMenu posts={allPosts} />
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <article className="col-span-1 md:col-span-7 mt-3 md:mt-0 py-12 ">
        {/* 포스트 헤더 */}
        <header className="mb-8">
          <h1 className="text-4xl font-extralight leading-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mt-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(frontmatter.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime}분 읽기</span>
            </div>
          </div>
        </header>

        <Separator className="mb-16" />

        {/* 포스트 본문 */}
        <div className="mb-16 prose prose-lg max-w-none prose-gray dark:prose-invert">
          {content}
        </div>

        <Separator className="mb-12" />

        {/* 포스트 푸터 */}
        <footer className="space-y-6">
          <Giscus />
        </footer>
      </article>
    </div>
  )
}

// 빌드 타임에 모든 블로그 포스트를 정적으로 생성
export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}
