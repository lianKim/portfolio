import { Card, CardContent } from '@/components/ui/card'

import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail?: string
}

export function PostCard({
  id,
  title,
  description,
  date,
  tags,
  thumbnail,
}: PostCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="p-0 cursor-pointer relative border-none rounded-none shadow-none overflow-hidden space-y-4">
        {/* 콘텐츠 영역 */}
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* 포스트 제목 */}
          <h2 className="text-lg font-light mb-2 text-foreground line-clamp-2">
            {title}
          </h2>

          {/* 포스트 설명/요약 */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* 하단 메타정보 영역 - 날짜 */}
          <div className="flex flex-col gap-1">
            {/* 작성 날짜 */}
            {/* <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString('ko-KR')}</span>
            </span> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
