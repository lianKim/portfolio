'use client'

import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function useTocItems(): TocItem[] {
  const [toc, setToc] = useState<TocItem[]>([])

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

  return toc
}
