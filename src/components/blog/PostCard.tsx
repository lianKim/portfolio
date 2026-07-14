import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail?: string
}

export function PostCard({
  id,
  title,
  description,
  // date,
  // tags,
  // thumbnail,
}: PostCardProps) {
  return (
    <article>
      <Link href={`/blog/${id}`} className="block space-y-2">
        <h3 className="text-subhead text-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </Link>
    </article>
  )
}
