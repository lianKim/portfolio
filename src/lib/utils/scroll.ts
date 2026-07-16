/**
 * 특정 요소로 부드럽게 스크롤하고 URL 해시를 업데이트합니다.
 *
 * 착지 위치는 "헤더 + 헤딩 상단 간격"과 "목차 높이(top-below-header)" 중 더 위쪽(작은 값)입니다.
 * - 상단 여백이 큰 헤딩(h1 등)은 목차와 같은 높이에 정렬됩니다.
 * - 상단 여백이 작은 헤딩은 자기 간격만큼만 띄워, 윗 요소가 헤더 아래로 삐져나오지 않습니다.
 *
 * @param id - 스크롤할 요소의 ID
 */
export function scrollToElement(id: string): void {
  const element = document.getElementById(id)
  if (!element) return

  // URL 해시 업데이트
  window.history.pushState(null, '', `#${id}`)

  // CSS 변수에서 레이아웃 값 읽기
  const rootStyle = getComputedStyle(document.documentElement)
  const px = (name: string) =>
    parseInt(rootStyle.getPropertyValue(name).replace('px', ''), 10) || 0
  const headerHeight = px('--header-height')
  // 목차(sticky 사이드바)가 위치한 높이
  const topBelowHeader = headerHeight + px('--content-padding-y')

  const scrollY = window.scrollY
  const rect = element.getBoundingClientRect()

  // 헤딩과 바로 위 요소 사이의 실제 간격(collapsed margin 포함)
  const previous = element.previousElementSibling
  const gap = previous
    ? rect.top - previous.getBoundingClientRect().bottom
    : parseFloat(getComputedStyle(element).marginTop) || 0

  // 윗 요소가 헤더 뒤로 숨는 선(header + gap)과 목차 높이 중 더 위쪽으로 정렬
  const target = Math.min(headerHeight + gap, topBelowHeader)
  const y = rect.top + scrollY - target

  window.scrollTo({ top: y, behavior: 'smooth' })
}
