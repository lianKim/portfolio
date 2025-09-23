import './globals.css'

import { CategoryMenu } from '@/components/blog/CategoryMenu'
import Header from '@/components/blog/Header'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { getAllPosts } from '@/lib/blog/posts'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Lian Kim | Blog',
  description: '프론트엔드 개발자 김리안의 블로그입니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  // 서버에서 포스트 데이터 가져오기
  const posts = getAllPosts()

  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhv3fvd.css" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mx-auto px-4 w-full max-w-[var(--container-max-width)] flex">
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-12">
              {/* 왼쪽 카테고리 메뉴 */}
              <aside className="hidden lg:block">
                <div className="sticky top-[var(--sticky-top-offset)]">
                  <CategoryMenu posts={posts} />
                </div>
              </aside>

              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
