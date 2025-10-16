// 날짜를 한국어 형식으로 포맷팅
export function formatDate(dateString: string): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\./g, '.').replace(/\s/g, ' ')
  } catch {
    return dateString
  }
}
