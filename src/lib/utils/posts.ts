import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types/blog'
import { formatDate } from './format'

const postsDirectory = path.join(process.cwd(), 'public/blog/posts')

export function getAllPosts(): Post[] {
  try {
    // posts 디렉토리의 모든 .md 파일 읽기
    const fileNames = fs.readdirSync(postsDirectory)
    const mdFiles = fileNames.filter(name => name.endsWith('.md'))

    const posts = mdFiles.map((fileName) => {
      // 파일 이름에서 확장자 제거하여 id로 사용
      const id = fileName.replace(/\.md$/, '')

      // 파일 경로
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // matter로 frontmatter만 추출 (content는 리스트에서 불필요)
      const { data } = matter(fileContents)

      return {
        id,
        title: data.title || '',
        description: data.description || '',
        date: formatDate(data.date) || '',
        category: data.category || 'uncategorized',
        tags: data.tags || [],
        readingTime: data.readingTime,
        thumbnail: data.thumbnail,
      } as Post
    })

    // 날짜 기준 내림차순 정렬
    return posts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}
