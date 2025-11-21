/**
 * SEO 유틸리티
 * JSON-LD 구조화된 데이터 생성 헬퍼
 */

import type { PostFrontmatter } from '@/types/blog'
import { siteConfig } from '@/lib/env'
import { toISO8601, toAbsoluteUrl } from './format'

/**
 * WebSite 스키마 생성
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: '김리안 포트폴리오',
    url: toAbsoluteUrl('/'),
    description:
      '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
    inLanguage: 'ko-KR',
    publisher: {
      '@id': `${siteConfig.url}#organization`,
    },
  }
}

/**
 * Person 스키마 생성
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/about#person`,
    name: '김리안',
    alternateName: 'Lian Kim',
    jobTitle: 'Frontend Engineer',
    url: toAbsoluteUrl('/about'),
    sameAs: ['https://github.com/lianKim'],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Development',
    ],
  }
}

/**
 * Organization 스키마 생성
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: '김리안',
    url: toAbsoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/images/logo.png'),
      width: 512,
      height: 512,
    },
  }
}

/**
 * BlogPosting 스키마 생성
 */
export function generateBlogPostingSchema(
  postId: string,
  frontmatter: PostFrontmatter,
) {
  const image = frontmatter.thumbnail || '/images/opengraph-image.webp'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/blog/${postId}#blogPosting`,
    headline: frontmatter.title,
    description: frontmatter.description,
    url: toAbsoluteUrl(`/blog/${postId}`),
    image: toAbsoluteUrl(image),
    datePublished: toISO8601(frontmatter.date),
    dateModified: toISO8601(frontmatter.lastModified || frontmatter.date),
    author: {
      '@id': `${siteConfig.url}/about#person`,
    },
    publisher: {
      '@id': `${siteConfig.url}#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/blog/${postId}`),
    },
    keywords: frontmatter.tags.join(', '),
    inLanguage: 'ko-KR',
  }
}

/**
 * ProfilePage 스키마 생성 (About 페이지용)
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/about#profilePage`,
    mainEntity: {
      '@id': `${siteConfig.url}/about#person`,
    },
    url: toAbsoluteUrl('/about'),
    name: 'About | 김리안',
    description:
      '프론트엔드 개발자 김리안의 이력서입니다. React, Next.js, TypeScript를 활용한 웹 개발 경험을 소개합니다.',
    inLanguage: 'ko-KR',
  }
}

/**
 * BreadcrumbList 스키마 생성
 */
export function generateBreadcrumbSchema(postTitle: string, postId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${siteConfig.url}/blog/${postId}#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: toAbsoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: toAbsoluteUrl('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: toAbsoluteUrl(`/blog/${postId}`),
      },
    ],
  }
}

/**
 * JSON-LD 스크립트 태그를 위한 안전한 직렬화
 * XSS 공격을 방지하기 위해 위험한 문자를 유니코드로 대체
 */
export function serializeJsonLd<T = unknown>(jsonLd: T): string {
  return JSON.stringify(jsonLd)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/<\//g, '<\\/')
}
