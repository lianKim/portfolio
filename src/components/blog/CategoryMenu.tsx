'use client'

import { CATEGORY_NAMES } from '@/lib/constants/blog'
import Link from 'next/link'
import type { Post } from '@/types/blog'
import { cn } from '@/lib/utils/cn'
import { groupPostsByCategory } from '@/lib/utils/posts'
import { usePathname } from 'next/navigation'

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
  const postsByCategory = groupPostsByCategory(posts)

  return (
    <nav className={className}>
      <div className="space-y-6 pb-4 text-sm">
        {Object.entries(postsByCategory).map(
          ([categorySlug, categoryPosts]) => (
            <div key={categorySlug}>
              {/* 카테고리 제목 */}
              <h3 className="text-foreground mb-2 pr-2">
                {CATEGORY_NAMES[categorySlug] || categorySlug}
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
                            ? 'text-accent-foreground'
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
