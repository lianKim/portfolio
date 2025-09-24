import { getAllPosts, getAllTags } from '@/lib/blog/posts'

import { CategoryMenu } from '@/components/blog/CategoryMenu'
import { PostList } from '@/components/blog/PostList'
import { TagList } from '@/components/blog/TagList'

interface BlogPageProps {
  searchParams: {
    tag?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()
  const allTags = getAllTags()

  // 태그 필터링만 적용
  const filteredPosts = posts.filter((post) => {
    const tagMatch = !searchParams.tag || post.tags.includes(searchParams.tag)
    return tagMatch
  })

  return (
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-[1fr_12rem] gap-8">
      {/* 왼쪽 카테고리 메뉴 */}
      {/* <aside className="hidden lg:block">
        <div className="sticky top-[var(--sticky-top-offset)]">
          <CategoryMenu posts={posts} />
        </div>
      </aside> */}

      {/* 중앙 포스트 목록 */}
      <div className="py-12">
        <PostList posts={filteredPosts} />
      </div>

      {/* 오른쪽 태그 목록 */}
      <aside className="hidden lg:block">
        <div className="sticky top-[var(--sticky-top-offset)]">
          <TagList tags={allTags} selectedTag={searchParams.tag} />
        </div>
      </aside>
    </div>
  )
}
