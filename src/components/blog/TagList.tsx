'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Tag {
  name: string
  count: number
}

interface TagListProps {
  className?: string
  selectedTag?: string | null
  onTagSelect?: (tag: string | null) => void
  tags?: Tag[]
}

export function TagList({ className, selectedTag, onTagSelect, tags = [] }: TagListProps) {

  const handleTagClick = (tagName: string) => {
    // 이미 선택된 태그를 클릭하면 선택 해제
    if (selectedTag === tagName) {
      onTagSelect?.(null)
    } else {
      onTagSelect?.(tagName)
    }
  }

  const handleAllClick = () => {
    onTagSelect?.(null)
  }

  return (
    <nav className={cn('w-56', className)}>
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 pb-1 text-sm font-semibold">
          태그 목록
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {/* 전체보기 옵션 */}
          <button
            onClick={handleAllClick}
            className={cn(
              'group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1 hover:underline text-left cursor-pointer',
              !selectedTag
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            )}
          >
            <span>전체보기</span>
            <span className="text-xs text-muted-foreground">
              ({tags.reduce((sum, tag) => sum + tag.count, 0)})
            </span>
          </button>

          {/* 태그 목록 */}
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagClick(tag.name)}
              className={cn(
                'group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1 hover:underline text-left cursor-pointer',
                selectedTag === tag.name
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <span>{tag.name}</span>
              <span className="text-xs text-muted-foreground">
                ({tag.count})
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
