'use client'

import type { TocItem } from '@/types/blog'

import { Separator } from './mdx/Separator'
import { TableOfContentsIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { scrollToElement } from '@/lib/utils/scroll'

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToElement(id)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div>
      <nav className={className}>
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
                className={cn(
                  'group flex w-full items-center pr-2 py-1 hover:text-foreground cursor-pointer leading-normal',
                  'text-muted-foreground hover:text-foreground/70',
                  item.level === 3 && 'pl-6',
                  item.level === 4 && 'pl-12',
                  item.level === 5 && 'pl-18',
                  item.level === 6 && 'pl-24',
                )}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <Separator className="mt-12 mb-16" />
    </div>
  )
}
