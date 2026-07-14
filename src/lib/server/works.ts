import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Work } from '@/types/work'

const worksDirectory = path.join(process.cwd(), 'src/content/works')

export function getAllWorks(): Work[] {
  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(worksDirectory)) {
    console.warn(`Works directory not found: ${worksDirectory}`)
    return []
  }

  // works 디렉토리의 모든 .md 파일 읽기
  const fileNames = fs.readdirSync(worksDirectory)
  const mdFiles = fileNames.filter((name) => name.endsWith('.md'))

  const works: Work[] = []

  for (const fileName of mdFiles) {
    try {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(worksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      works.push({
        slug,
        title: data.title || '',
        description: data.description || '',
        order: data.order ?? 0,
      } as Work)
    } catch (error) {
      // 개별 파일 에러는 로깅 후 건너뛰기
      console.error(`Failed to parse work: ${fileName}`, error)
    }
  }

  // order 기준 오름차순 정렬
  return works.sort((a, b) => a.order - b.order)
}
