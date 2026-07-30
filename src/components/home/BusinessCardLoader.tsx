'use client'

import { useCallback, useEffect, useState } from 'react'

import { CardLoadingMotion } from '@/components/home/CardLoadingMotion'
import { Spinner } from '@/components/ui/spinner'
import dynamic from 'next/dynamic'

/**
 * 로딩 모션 최소 노출 시간(ms).
 * 인트로(막대+원 팝업, ~0.666s) 완성 후 펄스 1회 여운까지 보여주기 위해 여유를 둔다.
 */
const MIN_VISIBLE_MS = 1400

/**
 * 이 세션(페이지 로드)에서 홈을 이미 봤는지.
 * 모듈 스코프라 SPA 네비게이션엔 유지되고, 하드 새로고침에만 리셋된다.
 */
let seenHome = false

const BusinessCardCanvas = dynamic(
  () => import('@/components/home/BusinessCard'),
  {
    ssr: false,
    // 번들 캐시 후(재방문)엔 거의 뜨지 않음. 명함 자리에 가벼운 스피너.
    loading: () => (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    ),
  },
)

/**
 * 홈 3D 명함을 클라이언트에서만(dynamic, ssr:false) 로드한다.
 * - 최초 로드: 풀스크린 로고 모션을 최소 노출 시간(약 0.666s)만큼 덮어, 무거운 번들 로딩/워밍업을 가림
 * - 재방문(SPA): 번들이 캐시돼 즉시 렌더되므로 모션 없이 바로 표시(필요 시 명함 자리 스피너)
 */
export default function BusinessCardLoader() {
  const [firstLoad] = useState(() => !seenHome)
  const [minElapsed, setMinElapsed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seenHome = true
    if (!firstLoad) return
    const timer = setTimeout(() => setMinElapsed(true), MIN_VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [firstLoad])

  const handleReady = useCallback(() => setReady(true), [])

  // 최초 로드에만 표시. 최소 노출 시간과 3D 준비가 모두 끝나면 페이드아웃한다.
  // (오버레이는 준비 완료까지 덮어 스피너가 드러날 틈을 없앤다)
  return (
    <>
      <BusinessCardCanvas onReady={handleReady} />
      {firstLoad && <CardLoadingMotion hidden={minElapsed && ready} />}
    </>
  )
}
