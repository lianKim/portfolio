---
title: 'Next.js 14 App Router 완벽 가이드'
description: 'Next.js 14의 새로운 App Router에 대해 자세히 알아보고, 실제 프로젝트에 적용하는 방법을 살펴보겠습니다.'
date: '2024-01-20'
category: 'development'
tags: ['Next.js', 'React', 'App Router', 'TypeScript']
readingTime: 8
---

## 서론

`Next.js 14`에서 도입된 App Router는 React의 최신 기능들을 활용하여 더욱 강력하고 유연한 라우팅 시스템을 제공합니다. 이 글에서는 App Router의 핵심 개념부터 실제 프로젝트에 적용하는 방법까지 상세히 다루어보겠습니다.

### App Router의 주요 특징

- **서버 컴포넌트**: 기본적으로 서버에서 렌더링
- **레이아웃**: 중첩된 레이아웃 지원
- **로딩 UI**: 내장된 로딩 상태 관리
- **에러 처리**: 컴포넌트 레벨 에러 경계

### 실제 구현 예제

다음은 간단한 App Router 구조의 예제입니다:

```
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
└── blog/
    ├── layout.tsx
    ├── page.tsx
    └── [slug]/
        └── page.tsx
```

#### 레이아웃 파일 예제

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <header>
          <nav>네비게이션</nav>
        </header>
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  )
}
```

#### 동적 라우팅 예제

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      <h1>블로그 포스트: {params.slug}</h1>
    </article>
  )
}
```

## 주요 개념

### 1. 서버 컴포넌트 vs 클라이언트 컴포넌트

App Router에서는 기본적으로 모든 컴포넌트가 **서버 컴포넌트**입니다. 클라이언트에서 실행되어야 하는 컴포넌트만 `'use client'` 지시어를 사용합니다.

<Callout type="info" title="서버 컴포넌트 장점">
서버 컴포넌트는 초기 로딩 속도를 크게 향상시키고, SEO에도 유리합니다.
</Callout>

<Callout type="warning">
클라이언트 컴포넌트에서는 useState, useEffect 같은 React 훅을 사용할 수 있지만, 서버 컴포넌트에서는 사용할 수 없습니다.
</Callout>

```tsx
// 서버 컴포넌트 (기본)
export default function ServerComponent() {
  return <div>서버에서 렌더링됩니다</div>
}

// 클라이언트 컴포넌트
'use client'
export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 2. 데이터 페칭

서버 컴포넌트에서는 `async/await`를 직접 사용할 수 있습니다:

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### 3. 로딩 및 에러 처리

#### 순서없는 리스트 테스트

- 첫 번째 아이템 (•)
- 두 번째 아이템 (•)
  - 중첩된 아이템 1 (○)
  - 중첩된 아이템 2 (○)
    - 더 깊은 아이템 1 (■)
    - 더 깊은 아이템 2 (■)
- 세 번째 아이템 (•)

#### 순서있는 리스트 테스트

1. 첫 번째 단계
2. 두 번째 단계
   1. 세부 단계 A
   2. 세부 단계 B
      1. 더 세부 단계 1
      2. 더 세부 단계 2
3. 세 번째 단계

---

여기는 구분선 아래입니다.

---

#### 테이블 테스트

| 기능              | Next.js 13 | Next.js 14 | 설명             |
| ----------------- | ---------- | ---------- | ---------------- |
| App Router        | ✅ 안정화  | ✅ 개선    | 파일 기반 라우팅 |
| Server Components | ✅ 베타    | ✅ 안정화  | 서버에서 렌더링  |
| Turbopack         | 🚧 개발중  | ✅ 안정화  | 빠른 번들러      |
| 성능              | 좋음       | 매우 좋음  | 향상된 최적화    |

---

```tsx
// loading.tsx
export default function Loading() {
  return <div>로딩 중...</div>
}

// error.tsx
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>에러가 발생했습니다!</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}
```

## 마이그레이션 가이드

<Callout type="error" title="중요한 변경사항">
기존 Pages Router에서 App Router로 마이그레이션할 때는 많은 변경이 필요합니다.
</Callout>

기존 Pages Router에서 App Router로 마이그레이션할 때 주의사항:

1. **파일 구조 변경**: `pages/` → `app/`
2. **라우팅 방식**: 파일 기반 → 폴더 기반
3. **API Routes**: `pages/api/` → `app/api/`
4. **데이터 페칭**: `getServerSideProps` → `fetch` in 서버 컴포넌트

<Callout type="success">
단계적으로 마이그레이션하면 기존 코드를 유지하면서 새로운 기능을 점진적으로 도입할 수 있습니다.
</Callout>

## 성능 최적화

> **"성능은 기능이다"** - 웹 개발에서 성능 최적화는 선택이 아닌 필수입니다. 사용자 경험에 직접적인 영향을 미치기 때문입니다.

### 스트리밍과 Suspense

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>페이지 제목</h1>
      <Suspense fallback={<div>로딩...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

### 병렬 라우팅

```tsx
// app/dashboard/@analytics/page.tsx
// app/dashboard/@team/page.tsx
// app/dashboard/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      {analytics}
      {team}
    </div>
  )
}
```

## 결론

App Router는 Next.js 개발을 한 단계 더 발전시킨 혁신적인 기능입니다. 서버 컴포넌트와 클라이언트 컴포넌트의 적절한 조합으로 성능과 개발자 경험 모두를 크게 향상시킬 수 있습니다.

주요 장점:

- **더 나은 성능**: 서버 컴포넌트로 초기 로딩 속도 개선
- **향상된 DX**: 직관적인 파일 구조와 데이터 페칭
- **유연한 레이아웃**: 중첩 레이아웃과 병렬 라우팅 지원
- **점진적 도입**: 기존 프로젝트에서 단계적으로 마이그레이션 가능

더 자세한 정보는 [Next.js 공식 문서](https://nextjs.org/docs)에서 확인할 수 있으며, 이 블로그의 [홈페이지](/)에서 다른 글들도 읽어보세요.

App Router를 활용하여 더욱 현대적이고 효율적인 Next.js 애플리케이션을 구축해보세요!
