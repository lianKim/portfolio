<!--
🔍 CONTEXT: 프로젝트 초기 설정, 패키지 설치, 디렉토리 구조 생성, 타입 정의 시 참조
🏷️ KEYWORDS: yarn add, setup, directory, types, configuration, package, shadcn, tailwind
🎯 TRIGGER: "패키지", "설치", "초기 설정", "디렉토리 생성", "환경 설정", "타입 정의"
-->

# 🚀 환경 설정 & 초기 구성

## 명령어 모음

### 1. 패키지 설치

```bash
# Tailwind CSS
yarn add tailwindcss @tailwindcss/postcss postcss autoprefixer

# MDX 관련 패키지
yarn add next-mdx-remote gray-matter reading-time glob @tailwindcss/typography

# MDX 플러그인
yarn add remark-gfm remark-breaks rehype-pretty-code rehype-slug

# 코드 하이라이팅 (rehype-pretty-code의 peer dependency)
yarn add shiki

# 아이콘 라이브러리
yarn add lucide-react

# 상태관리 (필요시)
yarn add zustand

# 댓글 시스템
yarn add @giscus/react
```

### 2. shadcn/ui 설치 및 컴포넌트 추가

```bash
# shadcn/ui 초기화 (Tailwind v4 호환)
npx shadcn@latest init
# 색상: Neutral 선택

# 필요한 컴포넌트 추가
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add scroll-area
npx shadcn@latest add tooltip
npx shadcn@latest add dropdown-menu
```

### 3. PostCSS 설정 파일 생성

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 4. 디렉토리 생성

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

## Tailwind CSS v4 설정

### src/app/globals.css

**주의**: 이 프로젝트는 Tailwind CSS v4를 사용합니다. v4에서는 설정 파일 대신 CSS 파일에서 직접 설정합니다.

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-*: initial;
  --radius: 0.5rem;
  /* shadcn/ui 색상 변수들이 자동으로 추가됩니다 */
}

:root {
  --radius: 0.625rem;
  /* 색상 변수들이 자동으로 추가됩니다 */
}

.dark {
  /* 다크모드 색상 변수들이 자동으로 추가됩니다 */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind Typography 플러그인 적용

Tailwind Typography는 자동으로 적용되며, MDX 콘텐츠에 `prose` 클래스를 사용하면 됩니다:

```jsx
<article className="prose prose-lg max-w-none dark:prose-invert">
  {/* MDX 콘텐츠 */}
</article>
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
