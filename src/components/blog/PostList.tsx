import type { Post } from '@/types/blog'
import { PostCard } from './PostCard'
import { Separator } from './mdx/Separator'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  // 포스트가 없을 때 Empty UI 표시
  if (posts.length === 0) {
    return (
      <div>
        <Separator className="mt-0 mb-12" />
        <p className="text-sm text-muted-foreground">
          아직 작성된 글이 없습니다
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Separator className="mt-0 mb-12" />
      {/* 포스트 목록 */}
      {posts.map((post) => (
        <>
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            thumbnail={post.thumbnail}
          />
          <Separator className="my-12" />
        </>
      ))}
    </div>
  )
}
