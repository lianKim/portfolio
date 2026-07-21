import Link from 'next/link'

interface ProjectCardProps {
  slug: string
  label: string
  title: string
  description: string
}

export function ProjectCard({
  slug,
  label,
  title,
  description,
}: ProjectCardProps) {
  return (
    <article>
      <Link href={`/projects/${slug}`} className="block">
        <p className="mb-1 text-sm text-muted-foreground">{label}</p>
        <h3 className="text-subhead text-foreground line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </Link>
    </article>
  )
}
