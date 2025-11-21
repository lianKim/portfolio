import { SITE_CONFIG } from '@/lib/constants/site'

/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, ' ')
  } catch {
    return dateString
  }
}

/**
 * 날짜 문자열을 ISO8601 형식으로 변환
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열 또는 이미 ISO8601 형식인 문자열
 * @returns ISO8601 형식의 날짜 문자열 (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export function toISO8601(dateString: string): string {
  // 이미 ISO8601 형식이면 그대로 반환
  if (dateString.includes('T')) {
    return dateString
  }

  // YYYY-MM-DD 형식을 ISO8601로 변환
  const date = new Date(dateString)
  return date.toISOString()
}

/**
 * 상대 경로를 절대 URL로 변환
 * @param path - 경로 문자열 (상대 또는 절대)
 * @returns 절대 URL
 */
export function toAbsoluteUrl(path: string): string {
  // 이미 절대 URL이면 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // 슬래시 처리
  const separator = path.startsWith('/') ? '' : '/'
  return `${SITE_CONFIG.url}${separator}${path}`
}
