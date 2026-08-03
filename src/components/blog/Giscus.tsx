'use client'

import { useEffect, useRef } from 'react'

import { GISCUS_CONFIG } from '@/lib/constants/giscus'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// 사이트가 라이트 테마 고정이므로 Giscus도 light 사용
// https://github.com/giscus/giscus/tree/main/styles/themes
const GISCUS_THEME = 'light'

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref, { rootMargin: '200px' })

  // 뷰포트에 진입했을 때만 Giscus 스크립트 로드
  useEffect(() => {
    if (!isIntersecting || !ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', GISCUS_CONFIG.repo)
    scriptElem.setAttribute('data-repo-id', GISCUS_CONFIG.repoId)
    scriptElem.setAttribute('data-category', GISCUS_CONFIG.category)
    scriptElem.setAttribute('data-category-id', GISCUS_CONFIG.categoryId)
    scriptElem.setAttribute('data-mapping', GISCUS_CONFIG.mapping)
    scriptElem.setAttribute('data-strict', GISCUS_CONFIG.strict)
    scriptElem.setAttribute(
      'data-reactions-enabled',
      GISCUS_CONFIG.reactionsEnabled,
    )
    scriptElem.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata)
    scriptElem.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition)
    scriptElem.setAttribute('data-theme', GISCUS_THEME)
    scriptElem.setAttribute('data-lang', GISCUS_CONFIG.lang)

    ref.current.appendChild(scriptElem)
  }, [isIntersecting])

  return <section ref={ref} />
}
