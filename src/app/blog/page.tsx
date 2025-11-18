import type { Metadata } from 'next'
import { PostList } from '@/components/blog/PostList'
import { getAllPosts } from '@/lib/utils/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    '프론트엔드 개발 경험과 기술을 공유하는 김리안의 기술 블로그. React, Next.js, TypeScript 등 웹 개발 관련 글을 확인하세요.',
  openGraph: {
    title: 'Blog | 김리안',
    description:
      '프론트엔드 개발 경험과 기술을 공유하는 김리안의 기술 블로그. React, Next.js, TypeScript 등 웹 개발 관련 글을 확인하세요.',
    url: '/blog',
  },
}

export default function BlogPage() {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <div className="relative w-full py-12">
      {/* 중앙 포스트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
        <h2 className="text-3xl font-thin col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)]">
          Posts
        </h2>
        <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-6">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  )
}
