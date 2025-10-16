'use client'

import { cn } from '@/lib/utils/cn'
import { useTocItems } from '@/hooks/useTocItems'
import { useActiveSection } from '@/hooks/useActiveSection'

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const toc = useTocItems()
  const activeId = useActiveSection(toc)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    const element = document.getElementById(id)
    if (element) {
      // URL에 해시 추가
      window.history.pushState(null, '', `#${id}`)

      // CSS 변수에서 헤더 높이 가져오기
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')
          .replace('px', ''),
      )

      // 헤더 높이 + 여백(24px)만큼 오프셋
      const offset = headerHeight + 24
      const y = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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
