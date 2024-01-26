/**
 * 한 자리 수에 0을 붙여 두 자리로 만들어주는 함수 (ex. 01)
 * @param number
 * @returns {string} 두 자리 수
 */
export const makeNumberToTwoLetter = (number: number | string): string => {
  if (typeof number === 'string') {
    return number
  }

  return number < 10 ? `0${number}` : `${number}`
}

/**
 * 시작 날짜, 마감 날짜를 받아 작업 기간을 반환해주는 함수
 * @param startDate
 * @param endDate
 * @returns  작업 기간 (YYYY.MM - YYYY.MM)
 */
export const getPeriodOfWork = (
  startDate: string,
  endDate?: string,
): string => {
  if (!startDate && !endDate) {
    return 'unknown'
  }

  const startYearMonth = startDate.slice(0, 4) + '.' + startDate.slice(5, 7)
  const endYearMonth = endDate
    ? endDate.slice(0, 4) + '.' + endDate.slice(5, 7)
    : 'present'

  return `${startYearMonth} - ${endYearMonth}`
}
