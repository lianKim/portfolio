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
        // 헤딩 내부의 앵커 링크에서 '#' 문자 제외하고 텍스트 추출
        const text = heading.textContent?.replace(/\s*#\s*$/, '') || ''
        tocItems.push({
          id: heading.id,
          text,
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
    <nav className={cn('w-56', className)}>
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 pb-1 text-sm font-semibold">
          On this page
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                activeId === item.id
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
                item.level > 2 && 'pl-6',
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
