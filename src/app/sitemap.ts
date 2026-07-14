import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/server/posts'
import { getAllWorks } from '@/lib/server/works'
import { toAbsoluteUrl } from '@/lib/utils/format'

export default function sitemap(): MetadataRoute.Sitemap {
  // 사이트 최종 업데이트 날짜 (배포 시 자동 갱신됨)
  const lastModified = new Date()

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified,
      priority: 1.0,
    },
    {
      url: toAbsoluteUrl('/resume'),
      lastModified,
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified,
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl('/work'),
      lastModified,
      priority: 0.9,
    },
  ]

  // 동적 블로그 포스트 페이지
  const posts = getAllPosts()
  const blogPosts: MetadataRoute.Sitemap = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 최신 순 정렬
    .map((post) => ({
      url: toAbsoluteUrl(`/blog/${post.id}`),
      lastModified: new Date(post.date),
      priority: 0.7,
    }))

  // 동적 기록(work) 페이지 (날짜 없음 → 배포 시각 사용)
  const works = getAllWorks()
  const workPages: MetadataRoute.Sitemap = works.map((work) => ({
    url: toAbsoluteUrl(`/work/${work.slug}`),
    lastModified,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts, ...workPages]
}
