import { Calendar, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getTestPost } from '@/lib/blog/mdx'

export default async function BlogPage() {
  // 테스트용 마크다운 파일 파싱
  const { frontmatter, content } = await getTestPost()

  return (
    <article className="w-full mx-auto">
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
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-foreground/60">태그:</span>
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="text-center text-sm text-foreground/60">
          이 글이 도움이 되셨다면 공유해 주세요!
        </div>
      </footer>
    </article>
  )
}
