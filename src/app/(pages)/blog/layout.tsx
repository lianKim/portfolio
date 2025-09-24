import { CategoryMenu } from '@/components/blog/CategoryMenu'
import type { ReactNode } from 'react'
import { getAllPosts } from '@/lib/blog/posts'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-12">
      {/* 왼쪽 카테고리 메뉴 */}
      <aside className="hidden lg:block">
        <div className="sticky top-[var(--sticky-top-offset)]">
          <CategoryMenu posts={posts} />
        </div>
      </aside>

      {children}
    </div>
  )
}