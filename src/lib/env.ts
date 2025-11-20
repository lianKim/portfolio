/**
 * 환경변수 헬퍼
 * Next.js 빌드 타임과 런타임에서 모두 사용 가능한 환경변수
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://liankim.kr',
} as const
