import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Lian Kim | Portfolio',
  description: '프론트엔드 개발자 김리안의 포트폴리오입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ivl3ywl.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
