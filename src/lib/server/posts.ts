import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/utils/format'

const postsDirectory = path.join(process.cwd(), 'public/blog/posts')

export function getAllPosts(): Post[] {
  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`)
    return []
  }

  // posts 디렉토리의 모든 .md 파일 읽기
  const fileNames = fs.readdirSync(postsDirectory)
  const mdFiles = fileNames.filter((name) => name.endsWith('.md'))

  const posts: Post[] = []

  for (const fileName of mdFiles) {
    try {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      posts.push({
        id,
        title: data.title || '',
        description: data.description || '',
        date: formatDate(data.date) || '',
        category: data.category || 'uncategorized',
        tags: data.tags || [],
        readingTime: data.readingTime,
        thumbnail: data.thumbnail,
      } as Post)
    } catch (error) {
      // 개별 파일 에러는 로깅 후 건너뛰기
      console.error(`Failed to parse post: ${fileName}`, error)
    }
  }

  // 날짜 기준 내림차순 정렬
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}
