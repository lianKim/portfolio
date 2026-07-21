/**
 * 특정 요소로 부드럽게 스크롤하고 URL 해시를 업데이트합니다.
 *
 * 착지 오프셋은 각 헤딩에 지정된 CSS `scroll-margin-top`이 담당합니다.
 * (레벨별 값은 HEADING_STYLES 참고 — 헤더/목차 높이와 헤딩 여백을 고려해 설정)
 *
 * @param id - 스크롤할 요소의 ID
 */
export function scrollToElement(id: string): void {
  const element = document.getElementById(id)
  if (!element) return

  element.scrollIntoView({ behavior: 'smooth' })
  window.history.pushState(null, '', `#${id}`)
}
