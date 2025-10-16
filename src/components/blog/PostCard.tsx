import { Calendar, ImageIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import NextImage from 'next/image'

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
      <Card className="p-0 cursor-pointer relative border-none rounded-none shadow-none overflow-hidden h-full flex flex-col gap-4">
        {/* 상단 썸네일 영역 */}
        <div className="w-full h-48 bg-muted relative flex items-center justify-center">
          {thumbnail ? (
            <NextImage
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
          )}
        </div>

        {/* 하단 콘텐츠 영역 */}
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* 포스트 제목 */}
          <h2 className="text-lg font-bold mb-2 text-foreground line-clamp-2">
            {title}
          </h2>

          {/* 포스트 설명/요약 */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* 하단 메타정보 영역 - 날짜와 태그 */}
          <div className="flex flex-col gap-1">
            {/* 작성 날짜 */}
            <span className="text-xs text-muted-foreground tracking-tight mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString('ko-KR')}</span>
            </span>

            {/* 태그 목록 */}
            <div className="flex gap-2 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
