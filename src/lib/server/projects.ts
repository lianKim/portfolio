import { cache } from 'react'
import path from 'path'
import type { Project, ProjectFrontmatter } from '@/types/project'
import { parseMarkdownFile } from '@/lib/server/mdx'
import { loadMarkdownCollection } from '@/lib/server/collection'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

// 전체 프로젝트 목록 (order 오름차순)
export const getAllProjects = cache(() =>
  loadMarkdownCollection<Project>(
    projectsDirectory,
    (slug, data) => ({
      slug,
      label: data.label || '',
      title: data.title || '',
      description: data.description || '',
      order: data.order ?? 0,
    }),
    (a, b) => a.order - b.order,
  ),
)

// slug로 단일 프로젝트 조회 (없으면 undefined)
export const getProjectBySlug = cache((slug: string) =>
  getAllProjects().find((project) => project.slug === slug),
)

// 상세 페이지용: slug로 콘텐츠(frontmatter/content/toc) 파싱
export function getProjectContent(slug: string) {
  return parseMarkdownFile<ProjectFrontmatter>(
    path.join(projectsDirectory, `${slug}.md`),
  )
}
