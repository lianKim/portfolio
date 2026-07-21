import type { Metadata } from 'next'
import type { ProjectFrontmatter } from '@/types/project'
import { SITE_CONFIG } from '@/lib/constants/site'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { getAllProjects } from '@/lib/server/projects'
import { notFound } from 'next/navigation'
import { parseMarkdownFile } from '@/lib/server/mdx'
import path from 'path'
import { toAbsoluteUrl } from '@/lib/utils/format'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const projects = getAllProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  // 프로젝트 기록 파일 경로 생성하고 파싱
  const projectPath = path.join(
    process.cwd(),
    'src/content/projects',
    `${slug}.md`,
  )
  const { frontmatter } =
    await parseMarkdownFile<ProjectFrontmatter>(projectPath)

  const ogImage = SITE_CONFIG.images.ogImage

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.title,
    authors: [{ name: SITE_CONFIG.author.name }],
    alternates: {
      canonical: toAbsoluteUrl(`/projects/${slug}`),
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      url: `/projects/${slug}`,
      siteName: SITE_CONFIG.name,
      type: 'article',
      authors: [SITE_CONFIG.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      images: [ogImage],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  // URL 파라미터에서 slug 가져오기
  const { slug } = await params

  // 해당 slug의 프로젝트 기록이 존재하는지 확인
  const projects = getAllProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // 프로젝트 기록 파일 경로 생성하고 파싱
  const projectPath = path.join(
    process.cwd(),
    'src/content/projects',
    `${slug}.md`,
  )
  const { frontmatter, content, toc } =
    await parseMarkdownFile<ProjectFrontmatter>(projectPath)

  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        {/* 왼쪽 목차 */}
        <aside className="section-left hidden md:block">
          <div className="sticky top-below-header max-w-aside">
            <TableOfContents items={toc} />
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <article className="section-right mt-3 md:mt-0 min-w-0">
          {/* 헤더 */}
          <header>
            <p className="mb-2 text-sm text-muted-foreground">
              {frontmatter.label}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight">
              {frontmatter.title}
            </h1>
          </header>

          {/* 본문 */}
          <div className="mt-18 prose prose-lg max-w-none prose-gray dark:prose-invert">
            <div>{content}</div>
          </div>
        </article>
      </div>
    </div>
  )
}

// 빌드 타임에 모든 프로젝트 기록을 정적으로 생성
export async function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}
