'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

interface Tag {
  name: string
  count: number
}

interface TagListProps {
  className?: string
  selectedTag?: string | null
  tags?: Tag[]
}

export function TagList({ className, selectedTag, tags = [] }: TagListProps) {
  // 태그 필터링 URL 생성
  const createTagUrl = (tag?: string) => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    return `/blog${params.toString() ? '?' + params.toString() : ''}`
  }

  return (
    <nav className={cn('w-56', className)}>
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 pb-1 text-sm font-semibold">
          태그 목록
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {/* 태그 목록 */}
          {tags.map((tag) => (
            <Link key={tag.name} href={createTagUrl(tag.name)}>
              <div
                className={cn(
                  'group w-full px-2 py-1 cursor-pointer leading-normal',
                  selectedTag === tag.name
                    ? 'font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span>{tag.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
