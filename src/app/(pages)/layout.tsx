import './globals.css'

import Header from '@/components/blog/Header'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Lian Kim',
  description: '프론트엔드 개발자 김리안의 포트폴리오 사이트입니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhv3fvd.css" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mx-auto px-4 w-full max-w-[var(--container-max-width)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
