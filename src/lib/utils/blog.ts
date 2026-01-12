import type { Post } from '@/types/blog'

/**
 * 포스트를 카테고리별로 그룹화합니다.
 * 클라이언트/서버 모두에서 사용 가능한 순수 함수입니다.
 */
export function groupPostsByCategory(posts: Post[]): Record<string, Post[]> {
  return posts.reduce(
    (acc, post) => {
      const category = post.category || 'uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(post)
      return acc
    },
    {} as Record<string, Post[]>,
  )
}
