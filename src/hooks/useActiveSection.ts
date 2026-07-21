'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/types/blog'

/**
 * 목차 스크롤스파이: 현재 화면 상단에 걸린 섹션(헤딩) 중 가장 위의 id를 반환합니다.
 * IntersectionObserver로 헤딩의 뷰포트 진입을 추적합니다.
 */
export function useActiveSection(toc: TocItem[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (toc.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // 문서 순서상 가장 위의 보이는 헤딩을 active로 (없으면 직전 값 유지)
        const first = toc.find((item) => visible.has(item.id))
        if (first) setActiveId(first.id)
      },
      // 관측 영역: 헤더 아래(112px) ~ 뷰포트 34% (상단 근처에 걸린 헤딩을 현재 섹션으로)
      { rootMargin: '-112px 0px -66% 0px' },
    )

    toc.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  return activeId
}
