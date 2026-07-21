import type { Post } from '@/types/blog'
import { PostCard } from './PostCard'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">작성된 포스트가 없습니다.</p>
    )
  }

  return (
    <ul className="flex flex-col space-y-18">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard
            id={post.id}
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            thumbnail={post.thumbnail}
          />
        </li>
      ))}
    </ul>
  )
}
