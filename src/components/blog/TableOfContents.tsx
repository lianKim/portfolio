'use client'

import { TableOfContentsIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { scrollToElement } from '@/lib/utils/scroll'
// import { useActiveSection } from '@/hooks/useActiveSection'
import { useTocItems } from '@/hooks/useTocItems'

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const toc = useTocItems()
  /**
   * @description 목차가 본문 안에 들어갔기 때문에 활성화 상태에 따른 스타일 임시 주석 처리
   */
  // const activeId = useActiveSection(toc)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToElement(id)
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className={className}>
      <div className="pb-4">
        <div className="mb-1 pr-2 pb-1 flex items-center gap-2">
          <TableOfContentsIcon className="w-4 h-4" />
          <h4 className="text-sm">On this page</h4>
        </div>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group flex w-full items-center pr-2 py-1 hover:text-foreground cursor-pointer leading-normal',
                // 활성화 스타일 임시 주석 처리
                // activeId === item.id
                //   ? 'text-foreground'
                //   : 'text-muted-foreground hover:text-foreground/70',
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
  )
}
