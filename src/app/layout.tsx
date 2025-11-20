import './globals.css'

import Header from '@/components/shared/Header'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'
import { siteConfig } from '@/lib/env'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: '김리안 | Frontend Engineer',
    template: '%s | 김리안',
  },
  description:
    '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
  keywords: [
    '김리안',
    'Lian Kim',
    '프론트엔드 개발자',
    'Frontend Engineer',
    '포트폴리오',
    '이력서',
    'React',
    'Next.js',
    'TypeScript',
    '웹 개발',
    '기술 블로그',
  ],
  authors: [{ name: '김리안', url: siteConfig.url }],
  creator: '김리안',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    siteName: '김리안 포트폴리오',
    title: '김리안 | Frontend Engineer',
    description:
      '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
    images: [
      {
        url: '/images/opengraph-image.webp',
        width: 1200,
        height: 630,
        alt: '김리안 | Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '김리안 | Frontend Engineer',
    description:
      '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
    images: ['/images/opengraph-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/ydp6xrt.css" />
      </head>
      <body>
        {/*  */}
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
