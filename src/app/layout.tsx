import './globals.css'

import Header from '@/components/shared/Header'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: '김리안 | 프론트엔드 개발자',
  /**
   * @todo description 수정 예정
   */
  description: 'Lian Kim | Frontend Developer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mx-auto px-4 w-full max-w-[var(--container-max-width)]">
            {children}
          </main>
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  )
}
