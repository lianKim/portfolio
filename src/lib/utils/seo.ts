/**
 * SEO 유틸리티
 * JSON-LD 구조화된 데이터 및 상세 페이지 메타데이터 생성 헬퍼
 */

import { toAbsoluteUrl, toISO8601 } from './format'

import type { Metadata } from 'next'
import type { PostFrontmatter } from '@/types/blog'
import type { ProjectFrontmatter } from '@/types/project'
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
    '@id': `${SITE_CONFIG.url}/resume#person`,
    name: SITE_CONFIG.author.name,
    alternateName: SITE_CONFIG.author.nameEn,
    jobTitle: SITE_CONFIG.author.jobTitle,
    url: toAbsoluteUrl('/resume'),
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
      '@id': `${SITE_CONFIG.url}/resume#person`,
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
 * 프로젝트 기록(Article) 스키마 생성
 */
export function generateProjectSchema(
  slug: string,
  frontmatter: ProjectFrontmatter,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_CONFIG.url}/projects/${slug}#article`,
    headline: frontmatter.title,
    description: frontmatter.description,
    url: toAbsoluteUrl(`/projects/${slug}`),
    image: toAbsoluteUrl(SITE_CONFIG.images.ogImage),
    author: {
      '@id': `${SITE_CONFIG.url}/resume#person`,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/projects/${slug}`),
    },
    inLanguage: SITE_CONFIG.locale,
  }
}

/**
 * ProfilePage 스키마 생성 (Resume 페이지용)
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.url}/resume#profilePage`,
    mainEntity: {
      '@id': `${SITE_CONFIG.url}/resume#person`,
    },
    url: toAbsoluteUrl('/resume'),
    name: `About | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 이력서입니다. React, Next.js, TypeScript를 활용한 웹 개발 경험을 소개합니다.`,
    inLanguage: SITE_CONFIG.locale,
  }
}

/**
 * BreadcrumbList 스키마 생성.
 * 세그먼트 목록(name/path)을 받아 도메인(blog/projects)에 무관하게 재사용한다.
 */
export function generateBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  const last = items[items.length - 1]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${toAbsoluteUrl(last.path)}#breadcrumbs`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

interface DetailMetadataInput {
  title: string
  description?: string
  /** 상대 경로 (예: '/blog/xxx') */
  path: string
  ogImage: string
  publishedTime?: string
  tags?: string[]
}

/**
 * 상세 페이지(blog/projects) 공통 메타데이터 조립.
 * OG/twitter 카드 구성을 한 곳에서 결정한다.
 */
export function buildDetailMetadata({
  title,
  description,
  path,
  ogImage,
  publishedTime,
  tags,
}: DetailMetadataInput): Metadata {
  const desc = description || title

  return {
    title,
    description: desc,
    keywords: tags,
    authors: [{ name: SITE_CONFIG.author.name }],
    alternates: {
      canonical: toAbsoluteUrl(path),
    },
    openGraph: {
      title,
      description: desc,
      url: path,
      siteName: SITE_CONFIG.name,
      type: 'article',
      publishedTime,
      authors: [SITE_CONFIG.author.name],
      tags,
      images: [
        {
          url: ogImage,
          width: SITE_CONFIG.images.ogSize.width,
          height: SITE_CONFIG.images.ogSize.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [ogImage],
    },
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
