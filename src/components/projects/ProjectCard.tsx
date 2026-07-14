import Link from 'next/link'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
}

export function ProjectCard({ slug, title, description }: ProjectCardProps) {
  return (
    <article>
      <Link href={`/projects/${slug}`} className="block space-y-2">
        <h3 className="text-subhead text-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </Link>
    </article>
  )
}
