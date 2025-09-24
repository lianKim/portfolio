'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 페이지의 모든 heading 요소를 찾아서 목차 생성
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TocItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        // 헤딩 내부에서 '#' 문자 제외하고 텍스트 추출 (앞/뒤 모두)
        const text =
          heading.textContent?.replace(/^\s*#+\s*|\s*#+\s*$/g, '') || ''

        tocItems.push({
          id: heading.id,
          text: text,
          level: parseInt(heading.tagName.charAt(1)),
        })
      }
    })

    setToc(tocItems)
  }, [])

  useEffect(() => {
    // Intersection Observer로 현재 보이는 섹션 추적
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -70% 0px' },
    )

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

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
