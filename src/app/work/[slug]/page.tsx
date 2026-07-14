import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { WorkMenu } from '@/components/work/WorkMenu'
import type { WorkFrontmatter } from '@/types/work'
import { getAllWorks } from '@/lib/server/works'
import { notFound } from 'next/navigation'
import { parseMarkdownFile } from '@/lib/server/mdx'
import path from 'path'
import { toAbsoluteUrl } from '@/lib/utils/format'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const works = getAllWorks()
  const work = works.find((w) => w.slug === slug)

  if (!work) {
    return {
      title: 'Work Not Found',
    }
  }

  // 기록 파일 경로 생성하고 파싱
  const workPath = path.join(process.cwd(), 'src/content/works', `${slug}.md`)
  const { frontmatter } = await parseMarkdownFile<WorkFrontmatter>(workPath)

  const ogImage = SITE_CONFIG.images.ogImage

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.title,
    authors: [{ name: SITE_CONFIG.author.name }],
    alternates: {
      canonical: toAbsoluteUrl(`/work/${slug}`),
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.title,
      url: `/work/${slug}`,
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

export default async function WorkDetailPage({ params }: WorkPageProps) {
  // URL 파라미터에서 slug 가져오기
  const { slug } = await params

  // 해당 slug의 기록이 존재하는지 확인
  const works = getAllWorks()
  const work = works.find((w) => w.slug === slug)

  if (!work) {
    notFound()
  }

  // 기록 파일 경로 생성하고 파싱
  const workPath = path.join(process.cwd(), 'src/content/works', `${slug}.md`)
  const { frontmatter, content, toc } =
    await parseMarkdownFile<WorkFrontmatter>(workPath)

  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        {/* 왼쪽 기록 메뉴 */}
        <aside className="section-left hidden md:block">
          <div className="sticky top-below-header max-w-aside">
            <WorkMenu works={works} />
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <article className="section-right mt-3 md:mt-0 min-w-0">
          {/* 헤더 */}
          <header>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight">
              {frontmatter.title}
            </h1>
          </header>

          {/* 본문 */}
          <div className="mt-20 space-y-16 prose prose-lg max-w-none prose-gray dark:prose-invert">
            {/* 목차 */}
            <TableOfContents items={toc} />
            {/* 본문 */}
            <div>{content}</div>
          </div>
        </article>
      </div>
    </div>
  )
}

// 빌드 타임에 모든 기록을 정적으로 생성
export async function generateStaticParams() {
  const works = getAllWorks()

  return works.map((work) => ({
    slug: work.slug,
  }))
}
