export interface Post {
  id: string
  title: string
  description: string
  date: string
  category?: string
  tags: string[]
  thumbnail?: string
}

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  category: string
  lastModified?: string
  tags: string[]
  thumbnail?: string
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface ParsedPost<T = PostFrontmatter> {
  frontmatter: T
  content: React.ReactElement
  toc: TocItem[]
}
