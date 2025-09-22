import { PostCard } from './PostCard'

interface Post {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail?: string
  category?: string
}

interface PostListProps {
  posts: Post[]
  selectedTag?: string | null
}

export function PostList({ posts }: PostListProps) {
  // 날짜 기준 내림차순 정렬
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="space-y-8">
      {/* 포스트 목록 */}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          tags={post.tags}
          thumbnail={post.thumbnail}
        />
      ))}
    </div>
  )
}
