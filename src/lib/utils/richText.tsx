import type { ReactNode } from 'react'

/**
 * 리치 텍스트 문법(**bold**)을 파싱하여 React 노드로 변환
 * @param text - 파싱할 텍스트
 * @returns React 노드 배열
 */
export function parseRichText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
