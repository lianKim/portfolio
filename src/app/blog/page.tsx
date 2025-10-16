import { PostList } from '@/components/blog/PostList'
import { getAllPosts } from '@/lib/utils/posts'

interface BlogPageProps {
  searchParams: {
    tag?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  // 태그 필터링만 적용
  const filteredPosts = posts.filter((post) => {
    const tagMatch = !searchParams.tag || post.tags.includes(searchParams.tag)
    return tagMatch
  })

  return (
    <div className="relative w-full">
      {/* 중앙 포스트 목록 */}
      <div className="py-12">
        <PostList posts={filteredPosts} />
      </div>
    </div>
  )
}
