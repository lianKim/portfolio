<!-- 
🔍 CONTEXT: 핵심 시스템 구현, MDX 파싱, 포스트 데이터 처리, 라우팅, SSG 구현 시 참조
🏷️ KEYWORDS: mdx, parse, posts, blog, ssg, routing, lib, core, data processing
🎯 TRIGGER: "MDX 파싱", "포스트 처리", "라우팅", "SSG", "핵심 기능", "데이터 처리"
-->

# 🏗️ 핵심 시스템 구현

## 핵심 구현 코드

### MDX 파싱 (lib/blog/mdx.ts)

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts')

export function parseMDX(filePath: string) {
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  const readingMinutes = Math.ceil(readingTime(content).minutes)

  return {
    frontmatter: data,
    content,
    readingMinutes,
  }
}
```

### 포스트 데이터 처리 (lib/blog/posts.ts)

```typescript
import { glob } from 'glob'
import path from 'path'
import { parseMDX } from './mdx'
import type { Post } from '@/types/blog'

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts')

export async function getAllPosts(): Promise<Post[]> {
  const paths = await glob(`${POSTS_PATH}/**/*.mdx`)

  const posts = await Promise.all(
    paths.map(async (filePath) => {
      const { frontmatter, content, readingMinutes } = parseMDX(filePath)

      // 경로에서 카테고리와 슬러그 추출
      const pathParts = filePath.split('/')
      const category = pathParts[pathParts.length - 3]
      const slug = pathParts[pathParts.length - 2]

      return {
        ...frontmatter,
        slug,
        category,
        content,
        readingTime: readingMinutes,
      } as Post
    }),
  )

  // 날짜 기준 내림차순 정렬
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getPostBySlug(category: string, slug: string) {
  const posts = await getAllPosts()
  return posts.find((post) => post.category === category && post.slug === slug)
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}
```

### SSG 구현 (app/blog/[category]/[slug]/page.tsx)

```typescript
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { PostHeader } from '@/components/blog/PostHeader'
import { PostBody } from '@/components/blog/PostBody'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { Comments } from '@/components/blog/Comments'
import { extractTOC } from '@/lib/blog/toc'
import { notFound } from 'next/navigation'

export default async function PostPage({
  params
}: {
  params: { category: string; slug: string }
}) {
  const post = await getPostBySlug(params.category, params.slug)

  if (!post) {
    notFound()
  }

  const toc = extractTOC(post.content)

  return (
    <div className=\"max-w-7xl mx-auto px-4\">
      <div className=\"flex gap-8\">
        {/* 메인 콘텐츠 */}
        <article className=\"flex-1 max-w-4xl\">
          <PostHeader post={post} />
          <PostBody content={post.content} />
          <Comments />
        </article>

        {/* 사이드바 TOC */}
        <aside className=\"hidden lg:block w-64\">
          <TableOfContents toc={toc} />
        </aside>
      </div>
    </div>
  )
}

// 정적 페이지 생성
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    category: post.category,
    slug: post.slug
  }))
}

// 메타데이터 생성
export async function generateMetadata({
  params
}: {
  params: { category: string; slug: string }
}) {
  const post = await getPostBySlug(params.category, params.slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Lian Kim'],
      images: post.thumbnail ? [post.thumbnail] : []
    }
  }
}
```
