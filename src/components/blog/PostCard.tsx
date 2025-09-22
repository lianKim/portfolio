import React from 'react'

interface PostCardProps {
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail?: string
}

export function PostCard({
  title,
  description,
  date,
  tags,
  thumbnail,
}: PostCardProps) {
  return (
    <article className="flex gap-6 py-6 bg-white dark:bg-gray-900 cursor-pointer relative">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-3 text-foreground">{title}</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{date}</span>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-40 h-[107px] aspect-ratio-160-107 rounded-md overflow-hidden bg-muted">
        {/* default thumbnail 필요 */}
        {
          <img
            src={thumbnail || ''}
            alt={title}
            className="w-full h-full object-cover"
          />
        }
      </div>
    </article>
  )
}
