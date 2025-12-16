import './globals.css'

import {
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'

import Header from '@/components/shared/Header'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { SITE_CONFIG } from '@/lib/constants/site'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'
import { Toaster } from 'sonner'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.author.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification':
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.images.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.images.ogImage],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteSchema(),
      generatePersonSchema(),
      generateOrganizationSchema(),
    ],
  }

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/ydp6xrt.css" />
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          {/* 헤더 */}
          <Header />
          {/* 메인 */}
          <main className="flex-1 mx-auto px-4 w-full max-w-[var(--container-max-width)]">
            {children}
          </main>
          {/* 스크롤 탑 버튼 */}
          <ScrollToTopButton />
          {/* 토스트 알림 */}
          <Toaster
            position="top-right"
            offset={{
              top: 'var(--header-height)',
            }}
          />
        </div>
      </body>
    </html>
  )
}
