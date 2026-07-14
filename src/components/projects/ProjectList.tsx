import type { Project } from '@/types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">작성된 기록이 없습니다.</p>
    )
  }

  return (
    <ul className="flex flex-col space-y-18">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard
            slug={project.slug}
            title={project.title}
            description={project.description}
          />
        </li>
      ))}
    </ul>
  )
}
