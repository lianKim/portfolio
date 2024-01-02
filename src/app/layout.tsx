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
    <html>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ivl3ywl.css" />
      </head>
      <body>
        <div className="grid-container">
          <Header />
          {children}
          {modal}
        </div>
      </body>
    </html>
  )
}
