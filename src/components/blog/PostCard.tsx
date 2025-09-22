import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageIcon } from 'lucide-react'
import NextImage from 'next/image'
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
  // 첫번째 Card는 padding-top 제거
  return (
    <Link href={`/blog/${id}`}>
      <Card className="cursor-pointer relative border-none shadow-none hover:shadow-none pt-0 [&+&]:pt-6">
      <CardContent className="flex gap-6 px-0">
        {/* 왼쪽 콘텐츠 영역 - 제목, 설명, 메타정보 */}
        <div className="flex-1">
          {/* 포스트 제목 */}
          <h2 className="text-xl font-bold mb-2 text-foreground">{title}</h2>

          {/* 포스트 설명/요약 */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          {/* 하단 메타정보 영역 - 날짜와 태그 */}
          <div className="flex items-center gap-4">
            {/* 작성 날짜 */}
            <span className="text-xs text-muted-foreground tracking-tight">
              {date}
            </span>

            {/* 태그 목록 */}
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 썸네일 영역 */}
        <div className="w-40 h-[107px] rounded-md overflow-hidden bg-muted relative flex items-center justify-center">
          {thumbnail ? (
            <NextImage
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-muted-foreground/20" />
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
