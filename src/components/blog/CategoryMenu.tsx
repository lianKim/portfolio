'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

  // /blog/[id] 패턴에서 현재 포스트 ID 추출
  const currentPostId =
    pathname.startsWith('/blog/') && pathname !== '/blog'
      ? pathname.split('/blog/')[1]
      : undefined
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
    retrospective: '회고',
    web: 'Web',
    nextjs: 'Next.js',
    react: 'React',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    html: 'HTML',
    css: 'CSS',
  }

  return (
    <nav className={className}>
      <div className="space-y-6 text-sm pb-4">
        {Object.entries(postsByCategory).map(
          ([categorySlug, categoryPosts]) => (
            <div key={categorySlug}>
              {/* 카테고리 제목 */}
              <h3 className="font-bold text-foreground mb-2 pr-2">
                {categoryNames[categorySlug] || categorySlug}
              </h3>

              {/* 해당 카테고리의 포스트 목록 */}
              <div className="space-y-1">
                {categoryPosts.map((post) => {
                  const isCurrentPost = currentPostId === post.id

                  return (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div
                        className={cn(
                          'pr-2 py-1 text-sm cursor-pointer leading-normal',
                          isCurrentPost
                            ? 'text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {post.title}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </nav>
  )
}
