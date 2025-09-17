import './globals.css'

import Header from '@/components/@common/Header'
import type { Metadata } from 'next'

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Lian Kim | Blog',
  description: '프론트엔드 개발자 김리안의 블로그입니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uhv3fvd.css" />
      </head>
      <body>
        <div className="grid-container">
          <header>임시 헤더</header>
          <main className="main">{children}</main>
          {modal}
        </div>
      </body>
    </html>
  )
}
