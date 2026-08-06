import { cache } from 'react'
import path from 'path'
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/utils/format'
import { parseMarkdownFile } from '@/lib/server/mdx'
import { loadMarkdownCollection } from '@/lib/server/collection'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

// 전체 포스트 목록 (날짜 내림차순)
export const getAllPosts = cache(() =>
  loadMarkdownCollection<Post>(
    postsDirectory,
    (id, data) => ({
      id,
      title: data.title || '',
      description: data.description || '',
      date: formatDate(data.date) || '',
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      thumbnail: data.thumbnail,
    }),
    (a, b) => (a.date < b.date ? 1 : -1),
  ),
)

// id로 단일 포스트 조회 (없으면 undefined)
export const getPostById = cache((id: string) =>
  getAllPosts().find((post) => post.id === id),
)

// 상세 페이지용: id로 콘텐츠(frontmatter/content/toc) 파싱
// parseMarkdownFile이 요청 단위로 캐시되므로 별도 cache 불필요
export function getPostContent(id: string) {
  return parseMarkdownFile(path.join(postsDirectory, `${id}.md`))
}
