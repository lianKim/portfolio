import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'
import type { Project } from '@/types/project'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

export const getAllProjects = cache(function getAllProjects(): Project[] {
  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(projectsDirectory)) {
    console.warn(`Projects directory not found: ${projectsDirectory}`)
    return []
  }

  // projects 디렉토리의 모든 .md 파일 읽기
  const fileNames = fs.readdirSync(projectsDirectory)
  const mdFiles = fileNames.filter((name) => name.endsWith('.md'))

  const projects: Project[] = []

  for (const fileName of mdFiles) {
    try {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      projects.push({
        slug,
        label: data.label || '',
        title: data.title || '',
        description: data.description || '',
        order: data.order ?? 0,
      } as Project)
    } catch (error) {
      // 개별 파일 에러는 로깅 후 건너뛰기
      console.error(`Failed to parse project: ${fileName}`, error)
    }
  }

  // order 기준 오름차순 정렬
  return projects.sort((a, b) => a.order - b.order)
})

// slug로 단일 프로젝트 조회 (없으면 undefined)
export const getProjectBySlug = cache((slug: string): Project | undefined =>
  getAllProjects().find((project) => project.slug === slug),
)
