/**
 * SEO 유틸리티
 * JSON-LD 구조화된 데이터 생성 헬퍼
 */

import type { PostFrontmatter } from '@/types/blog'
import { siteConfig } from '@/lib/env'

/**
 * WebSite 스키마 생성
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '김리안 포트폴리오',
    url: siteConfig.url,
    description:
      '프론트엔드 개발자 김리안의 포트폴리오. React, Next.js, TypeScript를 활용한 웹 개발 경험과 기술 블로그를 공유합니다.',
    inLanguage: 'ko-KR',
    author: {
      '@type': 'Person',
      name: '김리안',
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
    name: '김리안',
    alternateName: 'Lian Kim',
    jobTitle: 'Frontend Engineer',
    url: siteConfig.url,
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
    name: '김리안',
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
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
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${siteConfig.url}${image}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastModified || frontmatter.date,
    author: {
      '@type': 'Person',
      name: '김리안',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: '김리안',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${postId}`,
    },
    keywords: frontmatter.tags.join(', '),
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
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: `${siteConfig.url}/blog/${postId}`,
      },
    ],
  }
}

/**
 * JSON-LD 스크립트 태그를 위한 안전한 직렬화
 * XSS 공격을 방지하기 위해 '<' 문자를 유니코드로 대체
 */
export function serializeJsonLd<T = unknown>(jsonLd: T): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c')
}
