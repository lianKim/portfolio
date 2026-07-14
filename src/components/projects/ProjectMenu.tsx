'use client'

import Link from 'next/link'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils/cn'
import { usePathname } from 'next/navigation'

interface ProjectMenuProps {
  className?: string
  projects: Project[]
}

export function ProjectMenu({ className, projects }: ProjectMenuProps) {
  const pathname = usePathname()

  // /projects/[slug] 패턴에서 현재 slug 추출
  const currentSlug =
    pathname.startsWith('/projects/') && pathname !== '/projects'
      ? pathname.split('/projects/')[1]
      : undefined

  return (
    <nav aria-label="기록 메뉴" className={className}>
      <div className="space-y-1 pb-4 text-sm">
        {projects.map((project) => {
          const isCurrent = currentSlug === project.slug

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'block pr-2 py-1 text-sm leading-normal',
                isCurrent
                  ? 'text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
            >
              {project.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
