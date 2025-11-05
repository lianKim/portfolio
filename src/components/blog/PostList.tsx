import { PostCard } from './PostCard'
import type { Post } from '@/types/blog'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* 포스트 목록 */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
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
