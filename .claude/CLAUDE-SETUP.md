<!-- 
🔍 CONTEXT: 프로젝트 초기 설정, 패키지 설치, 디렉토리 구조 생성, 타입 정의 시 참조
🏷️ KEYWORDS: yarn add, setup, directory, types, configuration, package, shadcn, tailwind
🎯 TRIGGER: "패키지", "설치", "초기 설정", "디렉토리 생성", "환경 설정", "타입 정의"
-->

# 🚀 환경 설정 & 초기 구성

## 명령어 모음

### 1. 패키지 설치

```bash
# MDX 관련 패키지
yarn add next-mdx-remote gray-matter reading-time glob

# MDX 플러그인
yarn add remark-gfm remark-breaks rehype-pretty-code rehype-slug

# 타입 정의
yarn add -D @types/glob

# Tailwind Typography
yarn add @tailwindcss/typography

# 상태관리 (필요시)
yarn add zustand

# 댓글 시스템
yarn add @giscus/react
```

### 2. shadcn/ui 컴포넌트 추가

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add dropdown-menu
```

### 3. 디렉토리 생성

```bash
# 블로그 라우트 디렉토리
mkdir -p src/app/blog/\\[category\\]/\\[slug\\]

# 컴포넌트 디렉토리
mkdir -p src/components/blog
mkdir -p src/components/mdx

# 라이브러리 디렉토리
mkdir -p src/lib/blog

# 콘텐츠 디렉토리
mkdir -p src/content/posts/{tech,review,tutorial}

# 정적 자산 디렉토리
mkdir -p public/blog/images
```

## 타입 정의

### src/types/blog.ts

```typescript
export interface Post {
  slug: string
  title: string
  date: string
  category: string
  description: string
  tags: string[]
  thumbnail?: string
  content: string
  readingTime: number
}

export interface PostMatter {
  title: string
  date: string
  category: string
  description: string
  tags: string[]
  thumbnail?: string
}

export interface Category {
  name: string
  slug: string
  count: number
}

export interface TocItem {
  id: string
  text: string
  level: number
}
```

## MDX 포스트 구조

````mdx
---
title: \"포스트 제목\"
date: \"2024-01-20\"
description: \"포스트 설명\"
tags: [\"nextjs\", \"react\", \"blog\"]
thumbnail: \"/blog/images/thumbnail.jpg\"
---

## 서론

본문 내용...

### 부제목

- 리스트 아이템 1
- 리스트 아이템 2

```javascript
// 코드 블록
console.log(\"Hello, World!\")
```

> 인용문 또는 Callout

![이미지 설명](/blog/images/example.jpg)
````

## Tailwind

### tailwind.config.js

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.mdx',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              paddingTop: theme('spacing.1'),
              paddingBottom: theme('spacing.1'),
              paddingLeft: theme('spacing.1.5'),
              paddingRight: theme('spacing.1.5'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

## 환경 변수 (.env.local)

```bash
# Giscus 설정
NEXT_PUBLIC_GISCUS_REPO=\"your-username/your-repo\"
NEXT_PUBLIC_GISCUS_REPO_ID=\"your-repo-id\"
NEXT_PUBLIC_GISCUS_CATEGORY=\"Announcements\"
NEXT_PUBLIC_GISCUS_CATEGORY_ID=\"your-category-id\"

# 사이트 URL
NEXT_PUBLIC_SITE_URL=\"https://your-domain.com\"
```
