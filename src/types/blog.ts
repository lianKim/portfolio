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

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
}

export interface ParsedPost {
  frontmatter: PostFrontmatter
  content: React.ReactElement
}
