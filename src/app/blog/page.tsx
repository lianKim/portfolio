import { PostList } from '@/components/blog/PostList'
import { getAllPosts } from '@/lib/utils/posts'

export default function BlogPage() {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <div className="relative w-full py-12">
      {/* 중앙 포스트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
        <h2 className="text-3xl font-thin col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)]">
          Posts
        </h2>
        <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-6">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  )
}
