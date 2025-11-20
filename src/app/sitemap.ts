import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/utils/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://liankim.kr'

  // 사이트 최종 업데이트 날짜 (배포 시 자동 갱신됨)
  const lastModified = new Date()

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      priority: 0.9,
    },
  ]

  // 동적 블로그 포스트 페이지
  const posts = getAllPosts()
  const blogPosts: MetadataRoute.Sitemap = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 최신 순 정렬
    .map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.date),
      priority: 0.7,
    }))

  return [...staticPages, ...blogPosts]
}
