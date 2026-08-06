import { PERSONAL_INFO } from './personal'

/**
 * 사이트 설정 상수
 * 전체 사이트에서 공통으로 사용되는 설정값들을 관리
 */
export const SITE_CONFIG = {
  // 기본 정보
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://liankim.kr',
  name: `${PERSONAL_INFO.name} 포트폴리오`,
  title: `${PERSONAL_INFO.name} | Frontend Engineer`,
  description: `프론트엔드 개발자 ${PERSONAL_INFO.name}의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.`,
  locale: 'ko-KR',

  // 작성자 정보
  author: {
    name: PERSONAL_INFO.name,
    nameEn: PERSONAL_INFO.nameEn,
    jobTitle: 'Frontend Engineer',
    github: PERSONAL_INFO.github.url,
    skills: ['React', 'Next.js', 'TypeScript'],
  },

  // 이미지
  images: {
    ogImage: '/images/opengraph-image.webp',
    logo: '/images/logo.png',
    ogSize: { width: 1200, height: 630 },
  },

  // 키워드
  keywords: [
    PERSONAL_INFO.name,
    PERSONAL_INFO.nameEn,
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
} as const
