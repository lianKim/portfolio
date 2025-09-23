import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  title: string
  category?: string
}

interface CategoryMenuProps {
  className?: string
  posts: Post[]
}

export function CategoryMenu({ className, posts }: CategoryMenuProps) {
  // 카테고리별로 포스트 그룹화
  const postsByCategory = posts.reduce(
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

  // 카테고리 이름 매핑
  const categoryNames: { [key: string]: string } = {
    development: '개발',
    review: '리뷰',
    learning: '학습',
    retrospective: '회고',
    uncategorized: '미분류',
  }

  return (
    <nav className={cn('w-56', className)}>
      <div className="space-y-6 text-sm pb-4">
        {Object.entries(postsByCategory).map(
          ([categorySlug, categoryPosts]) => (
            <div key={categorySlug}>
              {/* 카테고리 제목 */}
              <h3 className="font-bold text-foreground mb-2 px-2">
                {categoryNames[categorySlug] || categorySlug}
              </h3>

              {/* 해당 카테고리의 포스트 목록 */}
              <div className="space-y-1">
                {categoryPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer leading-normal">
                      {post.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </nav>
  )
}
