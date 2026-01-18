import type { Metadata } from 'next'
import { PostList } from '@/components/blog/PostList'
import { SITE_CONFIG } from '@/lib/constants/site'
import { getAllPosts } from '@/lib/server/posts'
import { toAbsoluteUrl } from '@/lib/utils/format'

export const metadata: Metadata = {
  title: 'Blog',
  description: `프론트엔드 개발 경험과 기술을 공유하는 ${SITE_CONFIG.author.name}의 기술 블로그. React, Next.js, TypeScript 등 웹 개발 관련 글을 확인하세요.`,
  alternates: {
    canonical: toAbsoluteUrl('/blog'),
  },
  openGraph: {
    title: `Blog | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발 경험과 기술을 공유하는 ${SITE_CONFIG.author.name}의 기술 블로그. React, Next.js, TypeScript 등 웹 개발 관련 글을 확인하세요.`,
    url: '/blog',
  },
}

export default function BlogPage() {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-title">Posts</h2>
        <div className="section-right section-content space-y-6">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  )
}
