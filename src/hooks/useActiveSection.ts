'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from './useTocItems'

export function useActiveSection(toc: TocItem[]): string {
  const [activeId, setActiveId] = useState<string>('')

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

  return activeId
}
