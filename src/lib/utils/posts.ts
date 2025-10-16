import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  id: string
  title: string
  description: string
  date: string
  category?: string
  tags: string[]
  readingTime?: number
  thumbnail?: string
}

const postsDirectory = path.join(process.cwd(), 'public/blog/posts')

// 날짜를 한국어 형식으로 포맷팅
function formatDate(dateString: string): string {
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

// 특정 태그를 포함한 포스트들만 반환
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

// 모든 태그와 개수 반환
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const tagCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count) // 개수 내림차순
}

// 모든 카테고리와 개수 반환
export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts()
  const categoryCount: { [key: string]: number } = {}
  
  posts.forEach(post => {
    const category = post.category || 'uncategorized'
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })
  
  // 카테고리 이름 매핑
  const categoryNames: { [key: string]: string } = {
    'development': '개발',
    'review': '리뷰',
    'learning': '학습',
    'retrospective': '회고',
    'uncategorized': '미분류'
  }
  
  return Object.entries(categoryCount)
    .map(([slug, count]) => ({ 
      name: categoryNames[slug] || slug, 
      slug, 
      count 
    }))
    .sort((a, b) => b.count - a.count) // 개수 내림차순
}