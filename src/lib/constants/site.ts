/**
 * 사이트 설정 상수
 * 전체 사이트에서 공통으로 사용되는 설정값들을 관리
 */
export const SITE_CONFIG = {
  // 기본 정보
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://liankim.kr',
  name: '김리안 포트폴리오',
  title: '김리안 | Frontend Engineer',
  description:
    '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
  locale: 'ko-KR',

  // 작성자 정보
  author: {
    name: '김리안',
    nameEn: 'Lian Kim',
    jobTitle: 'Frontend Engineer',
    github: 'https://github.com/lianKim',
    skills: ['React', 'Next.js', 'TypeScript'],
  },

  // 이미지
  images: {
    ogImage: '/images/opengraph-image.webp',
    logo: '/images/logo.png',
  },

  // 키워드
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
} as const
