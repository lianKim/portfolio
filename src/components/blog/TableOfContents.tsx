'use client'

import { TableOfContentsIcon } from 'lucide-react'
import type { TocItem } from '@/types/blog'
import { cn } from '@/lib/utils/cn'
import { scrollToElement } from '@/lib/utils/scroll'
import { useActiveSection } from '@/hooks/useActiveSection'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const activeId = useActiveSection(items)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToElement(id)
  }

  if (items.length === 0) {
    return null
  }

  // 최상위 헤딩 레벨 기준 상대 깊이로 들여쓰기 (글마다 시작 레벨이 달라도 계단이 생기도록)
  const minLevel = Math.min(...items.map((item) => item.level))
  const INDENT = ['pl-0', 'pl-4', 'pl-8', 'pl-12', 'pl-16']

  return (
    <nav aria-label="목차">
      <div className="pb-4">
        <div className="mb-1 pr-2 pb-1 flex items-center gap-2">
          <TableOfContentsIcon className="w-4 h-4" />
          <h4 className="text-sm">On this page</h4>
        </div>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              aria-current={item.id === activeId ? 'location' : undefined}
              className={cn(
                'group flex w-full items-center pr-2 py-1 cursor-pointer leading-normal',
                INDENT[Math.min(item.level - minLevel, INDENT.length - 1)],
                item.id === activeId
                  ? 'text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
