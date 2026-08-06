import { ReactNode, isValidElement } from 'react'
import GithubSlugger from 'github-slugger'

/**
 * 텍스트에서 heading ID를 생성합니다.
 * 실제 헤딩 id를 부여하는 rehype-slug와 동일한 github-slugger를 사용해,
 * rehype-slug가 id를 채우지 못한 경우의 폴백으로도 일관된 값을 만듭니다.
 * @param text - 변환할 텍스트
 * @returns slug 형식의 ID
 */
export function generateHeadingId(text: string): string {
  return new GithubSlugger().slug(text)
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
