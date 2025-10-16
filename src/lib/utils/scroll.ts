/**
 * 특정 요소로 부드럽게 스크롤하고 URL 해시를 업데이트합니다.
 * 헤더 높이를 고려하여 오프셋을 자동으로 계산합니다.
 *
 * @param id - 스크롤할 요소의 ID
 * @param additionalOffset - 헤더 외 추가 오프셋 (기본값: 24px)
 */
export function scrollToElement(id: string, additionalOffset = 24): void {
  const element = document.getElementById(id)
  if (!element) return

  // URL 해시 업데이트
  window.history.pushState(null, '', `#${id}`)

  // CSS 변수에서 헤더 높이 가져오기
  const headerHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height')
      .replace('px', ''),
  )

  // 헤더 높이 + 여백만큼 오프셋
  const offset = headerHeight + additionalOffset
  const y = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}
