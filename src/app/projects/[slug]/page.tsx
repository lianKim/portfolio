import {
  buildDetailMetadata,
  generateBreadcrumbSchema,
  generateProjectSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectContent,
} from '@/lib/server/projects'

import { DetailLayout } from '@/components/shared/DetailLayout'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const { frontmatter } = await getProjectContent(slug)

  return buildDetailMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/projects/${slug}`,
    ogImage: SITE_CONFIG.images.ogImage,
  })
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { frontmatter, content, toc } = await getProjectContent(slug)

  // JSON-LD 구조화된 데이터 생성
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateProjectSchema(slug, frontmatter),
      generateBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: frontmatter.title, path: `/projects/${slug}` },
      ]),
    ],
  }

  return (
    <>
      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <DetailLayout
        toc={toc}
        header={
          <header>
            <p className="mb-2 text-sm text-muted-foreground">
              {frontmatter.label}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight">
              {frontmatter.title}
            </h1>
          </header>
        }
      >
        {content}
      </DetailLayout>
    </>
  )
}

// 빌드 타임에 모든 프로젝트 기록을 정적으로 생성
export async function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}
