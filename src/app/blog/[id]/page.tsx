import { Calendar, Clock } from 'lucide-react'

import { CategoryMenu } from '@/components/blog/CategoryMenu'
import Giscus from '@/components/blog/Giscus'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/blog/TableOfContents'
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
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-[1fr_12rem] xl:grid-cols-[14rem_1fr_12rem] gap-12">
      {/* 왼쪽 카테고리 메뉴 */}
      <aside className="hidden xl:block">
        <div className="sticky top-[var(--sticky-top-offset)]">
          <CategoryMenu posts={allPosts} />
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <article className="py-12">
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

      {/* 사이드바 목차 - absolute 위치 */}
      <aside className="hidden lg:block">
        <div className="sticky top-[var(--sticky-top-offset)]">
          <TableOfContents />
        </div>
      </aside>
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
