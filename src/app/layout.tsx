import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/header/Header'

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Lian Kim | Portfolio',
  description: '프론트엔드 개발자 김리안의 포트폴리오입니다.',
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect stylesheet"
          href="https://use.typekit.net/uhv3fvd.css"
        />
      </head>
      <body>
        <div className="grid-container">
          <Header />
          <main className="main">{children}</main>
          {modal}
        </div>
      </body>
    </html>
  )
}
