import type { Post } from '@/types/blog'
import { PostCard } from './PostCard'
import { Separator } from './mdx/Separator'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div>
        <Separator className="mt-0 mb-12" />
        <p className="text-sm text-muted-foreground">
          작성된 포스트가 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div>
      <Separator className="mt-0 mb-12" />
      <ul className="flex flex-col">
        {posts.map((post, index) => (
          <li key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              thumbnail={post.thumbnail}
            />
            {index < posts.length - 1 && <Separator className="my-12" />}
          </li>
        ))}
      </ul>
      <Separator className="mt-12" />
    </div>
  )
}
