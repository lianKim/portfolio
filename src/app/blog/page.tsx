import { PostList } from '@/components/blog/PostList'
import { getAllPosts } from '@/lib/utils/posts'

export default function BlogPage() {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <div className="relative w-full">
      {/* 중앙 포스트 목록 */}
      <div className="py-12">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
