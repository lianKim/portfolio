## 프로젝트 개요

기존 Next.js 포트폴리오 사이트에 기술 블로그 섹션을 추가하는 프로젝트입니다. MDX 기반 콘텐츠 관리와 SSG 최적화를 통해 높은 성능을 목표로 합니다.

## 기술 스택

- **Framework**: Next.js v14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Content**: MDX (next-mdx-remote)
- **Comments**: Giscus
- **State**: zustand (필요시)

## 주요 기능

1. MDX 기반 포스트 작성
2. 카테고리 시스템
3. 목차(TOC) 자동 생성
4. 댓글 기능 (Giscus)
5. 읽기 시간 표시
6. 스크롤 진행 표시
7. 공유 기능
8. 다크모드 지원

## 디렉토리 구조

```
src/
├── app/
│   ├── blog/
│   │   ├── layout.tsx                 # 블로그 레이아웃
│   │   ├── page.tsx                   # 블로그 메인 (전체 포스트 목록)
│   │   ├── [category]/
│   │   │   └── page.tsx              # 카테고리별 포스트 목록
│   │   └── [category]/[slug]/
│   │       └── page.tsx              # 포스트 상세 페이지
│   └── ...existing pages
│
├── components/
│   ├── blog/
│   │   ├── PostCard.tsx              # 포스트 카드 컴포넌트
│   │   ├── PostList.tsx              # 포스트 목록 컴포넌트
│   │   ├── PostHeader.tsx            # 포스트 헤더 (제목, 날짜, 태그)
│   │   ├── PostBody.tsx              # MDX 렌더링 본문
│   │   ├── TableOfContents.tsx       # 목차 컴포넌트
│   │   ├── CategoryNav.tsx           # 카테고리 네비게이션
│   │   ├── Comments.tsx              # Giscus 댓글
│   │   ├── ScrollProgress.tsx        # 스크롤 진행 바
│   │   └── ShareButtons.tsx          # 공유 버튼
│   │
│   └── mdx/
│       ├── index.tsx                 # MDX 컴포넌트 맵핑
│       ├── CodeBlock.tsx             # 코드 블록 커스텀
│       ├── Callout.tsx               # 콜아웃 박스
│       ├── Image.tsx                 # 이미지 최적화
│       └── Link.tsx                  # 링크 컴포넌트
│
├── lib/
│   └── blog/
│       ├── mdx.ts                    # MDX 파싱 유틸리티
│       ├── posts.ts                  # 포스트 데이터 처리
│       ├── categories.ts             # 카테고리 관리
│       ├── toc.ts                    # 목차 추출
│       ├── utils.ts                  # 유틸리티 함수
│       └── constants.ts              # 상수 정의
│
├── types/
│   └── blog.ts                       # 타입 정의
│
└── content/
    └── posts/                        # MDX 포스트 파일
        ├── tech/                     # 기술 카테고리
        ├── review/                   # 회고 카테고리
        └── tutorial/                 # 튜토리얼 카테고리
```

## 개발 순서

### Phase 1: 환경 설정

1. 패키지 설치
2. 디렉토리 구조 생성
3. 타입 정의
4. MDX 파싱 시스템 구축
5. 샘플 포스트 작성

### Phase 2: 핵심 기능

1. 포스트 목록 페이지
2. 카테고리 시스템
3. 포스트 상세 페이지
4. MDX 렌더링

### Phase 3: UX 향상

1. 목차(TOC) 구현
2. 댓글 시스템
3. 스크롤 진행 표시
4. 공유 기능

### Phase 4: 최적화

1. SSG 구현
2. 이미지 최적화
3. 캐싱 전략

### Phase 5: SEO & 배포

1. 메타데이터
2. sitemap.xml
3. robots.txt

## 📋 문서 인덱스

상황별로 필요한 문서를 참조하세요:

- **🚀 프로젝트 시작/환경설정**: `.claude/CLAUDE-SETUP.md` - 패키지 설치, 디렉토리 구조, 초기 설정
- **🏗️ 핵심 시스템 구현**: `.claude/CLAUDE-CORE.md` - MDX 파싱, 포스트 처리, 라우팅
- **🧩 컴포넌트 개발**: `.claude/CLAUDE-COMPONENTS.md` - 블로그 컴포넌트, UI 구현
- **📝 MDX/콘텐츠 작업**: `.claude/CLAUDE-MDX.md` - MDX 커스텀 컴포넌트, 콘텐츠 최적화
- **🔍 참조/트러블슈팅**: `.claude/CLAUDE-REFERENCE.md` - 성능 최적화, 배포, 문제 해결
