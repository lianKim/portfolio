import { ReactNode, isValidElement } from 'react'

/**
 * 텍스트에서 heading ID를 생성합니다.
 * @param text - 변환할 텍스트
 * @returns kebab-case 형식의 ID
 */
export function generateHeadingId(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
}

/**
 * CodeBlock children에서 코드 텍스트를 재귀적으로 추출합니다.
 * rehype-pretty-code로 인해 중첩된 span 구조를 처리합니다.
 * @param children - React children
 * @returns 추출된 코드 텍스트
 */
export function extractCodeText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (children == null) return ''

  if (Array.isArray(children)) {
    return children.map(extractCodeText).join('')
  }

  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode }
    return extractCodeText(props.children)
  }

  return ''
}
