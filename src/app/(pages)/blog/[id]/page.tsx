import { Calendar, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import Giscus from '@/components/blog/Giscus'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { getAllPosts } from '@/lib/blog/posts'
import { notFound } from 'next/navigation'
import { parseMarkdownFile } from '@/lib/blog/mdx'
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
  const { frontmatter, content } = await parseMarkdownFile(postPath)

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_12rem] gap-8 w-full">
      {/* 메인 콘텐츠 */}
      <article className="py-12">
        {/* 포스트 헤더 */}
        <header className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {frontmatter.title}
          </h1>

          <p className="text-l text-foreground/70 mt-4 leading-relaxed">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mt-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(frontmatter.date).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{frontmatter.readingTime}분 읽기</span>
            </div>
          </div>
        </header>

        <Separator className="mb-12" />

        {/* 포스트 본문 */}
        <div className="prose prose-lg max-w-none prose-gray dark:prose-invert">
          {content}
        </div>

        <Separator className="my-12" />

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
