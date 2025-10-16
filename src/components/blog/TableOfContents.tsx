'use client'

import { cn } from '@/lib/utils/cn'
import { useTocItems } from '@/hooks/useTocItems'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToElement } from '@/lib/utils/scroll'

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const toc = useTocItems()
  const activeId = useActiveSection(toc)

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
        <h4 className="mb-1 pr-2 pb-1 text-sm font-semibold">On this page</h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group flex w-full items-center pr-2 py-1 hover:text-foreground cursor-pointer leading-normal',
                activeId === item.id
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
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
