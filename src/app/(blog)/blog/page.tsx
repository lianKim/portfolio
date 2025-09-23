import { getAllPosts, getAllTags } from '@/lib/blog/posts'

import { PostList } from '@/components/blog/PostList'
import { TagList } from '@/components/blog/TagList'

export default function BlogPage() {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-8">
      {/* 왼쪽 태그 목록 */}
      <aside className="hidden lg:block">
        <div className="w-56 sticky top-[var(--sticky-top-offset)]">
          <TagList tags={allTags} />
        </div>
      </aside>

      {/* 오른쪽 포스트 목록 */}
      <div className="py-12">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
