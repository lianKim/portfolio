import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * 마크다운 컬렉션 로더 뼈대.
 * 디렉토리의 `.md` 파일을 읽어 frontmatter를 파싱하고, `map`으로 항목을 만든 뒤 `sort`로 정렬한다.
 * 개별 파일 파싱 실패는 로깅 후 건너뛴다(부분 목록 반환).
 *
 * @param directory 콘텐츠 디렉토리 절대 경로
 * @param map 파일 id(확장자 제외)와 frontmatter 데이터로 항목 생성
 * @param sort 정렬 비교 함수
 */
export function loadMarkdownCollection<T>(
  directory: string,
  map: (id: string, data: Record<string, any>) => T,
  sort: (a: T, b: T) => number,
): T[] {
  if (!fs.existsSync(directory)) {
    console.warn(`Content directory not found: ${directory}`)
    return []
  }

  const items: T[] = []
  for (const fileName of fs.readdirSync(directory)) {
    if (!fileName.endsWith('.md')) continue
    try {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(directory, fileName)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))
      items.push(map(id, data))
    } catch (error) {
      // 개별 파일 에러는 로깅 후 건너뛰기
      console.error(`Failed to parse markdown: ${fileName}`, error)
    }
  }

  return items.sort(sort)
}
