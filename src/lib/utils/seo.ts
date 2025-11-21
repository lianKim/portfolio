/**
 * SEO 유틸리티
 * JSON-LD 구조화된 데이터 생성 헬퍼
 */

import { toAbsoluteUrl, toISO8601 } from './format'

import type { PostFrontmatter } from '@/types/blog'
import { SITE_CONFIG } from '@/lib/constants/site'

/**
 * WebSite 스키마 생성
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}#website`,
    name: SITE_CONFIG.name,
    url: toAbsoluteUrl('/'),
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.locale,
    publisher: {
      '@id': `${SITE_CONFIG.url}#organization`,
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
    '@id': `${SITE_CONFIG.url}/about#person`,
    name: SITE_CONFIG.author.name,
    alternateName: SITE_CONFIG.author.nameEn,
    jobTitle: SITE_CONFIG.author.jobTitle,
    url: toAbsoluteUrl('/about'),
    sameAs: [SITE_CONFIG.author.github],
    knowsAbout: SITE_CONFIG.author.skills,
  }
}

/**
 * Organization 스키마 생성
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.author.name,
    url: toAbsoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl(SITE_CONFIG.images.logo),
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
  const image = frontmatter.thumbnail || SITE_CONFIG.images.ogImage

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_CONFIG.url}/blog/${postId}#blogPosting`,
    headline: frontmatter.title,
    description: frontmatter.description,
    url: toAbsoluteUrl(`/blog/${postId}`),
    image: toAbsoluteUrl(image),
    datePublished: toISO8601(frontmatter.date),
    dateModified: toISO8601(frontmatter.lastModified || frontmatter.date),
    author: {
      '@id': `${SITE_CONFIG.url}/about#person`,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/blog/${postId}`),
    },
    keywords: frontmatter.tags.join(', '),
    inLanguage: SITE_CONFIG.locale,
  }
}

/**
 * ProfilePage 스키마 생성 (About 페이지용)
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.url}/about#profilePage`,
    mainEntity: {
      '@id': `${SITE_CONFIG.url}/about#person`,
    },
    url: toAbsoluteUrl('/about'),
    name: `About | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 이력서입니다. React, Next.js, TypeScript를 활용한 웹 개발 경험을 소개합니다.`,
    inLanguage: SITE_CONFIG.locale,
  }
}

/**
 * BreadcrumbList 스키마 생성
 */
export function generateBreadcrumbSchema(postTitle: string, postId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_CONFIG.url}/blog/${postId}#breadcrumbs`,
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
