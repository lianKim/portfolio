<!-- 
🔍 CONTEXT: 성능 최적화, 배포, 트러블슈팅, 참조 자료가 필요할 때 참조
🏷️ KEYWORDS: performance, optimization, deploy, troubleshooting, reference, seo, build
🎯 TRIGGER: "최적화", "성능", "배포", "트러블슈팅", "문제 해결", "참조", "SEO"
-->

# 🔍 참조 & 최적화

## 참고 사이트

1. [limtong.com](https://www.limtong.com/post/create-a-blog-with-nextjs) - 사이트 UI, SSG 최적화, 렌더링 성능
2. [d5br5.dev](https://d5br5.dev/blog/nextjs_blog/setup) - 사이트 UI, 체계적인 구조, glob 파일 탐색

## 성능 최적화 체크리스트

- [x] SSG (Static Site Generation) 구현
- [x] 이미지 최적화 (next/image 사용)
- [x] 코드 스플리팅 (동적 임포트)
- [x] 폰트 최적화
- [ ] 번들 사이즈 분석
- [ ] Lighthouse 성능 테스트
- [ ] sitemap 자동 생성
- [ ] RSS 피드 생성

## 주의사항

1. 기존 포트폴리오는 CSS Modules 사용 중이지만, 블로그는 Tailwind/shadcn으로 작성
2. 검색 기능은 MVP 이후 추가 예정
3. 애니메이션은 CSS/Tailwind만 사용 (별도 라이브러리 없음)
4. 날짜 처리는 JavaScript 내장 함수 사용
5. 상태관리는 필요한 경우에만 zustand 사용

## 트러블슈팅

### MDX 렌더링 속도 문제

- 문제: SSR 시 MDX 파싱으로 인한 속도 저하
- 해결: generateStaticParams를 사용한 SSG 구현

### 이미지 경로 문제

- 문제: MDX 내 이미지 경로 처리
- 해결: public/blog 폴더 활용, next/image 커스텀 컴포넌트

### 코드 하이라이팅 다크모드

- 문제: 다크모드 전환 시 코드 테마 변경
- 해결: CSS 변수를 활용한 동적 테마 전환

## 배포 체크리스트

- [ ] 환경 변수 설정 (Giscus, 사이트 URL)
- [ ] 빌드 테스트 (`next build`)
- [ ] 정적 페이지 생성 확인
- [ ] 이미지 최적화 확인
- [ ] SEO 메타데이터 검증
- [ ] sitemap.xml 생성
- [ ] robots.txt 설정
- [ ] 성능 테스트 (Lighthouse)
- [ ] 모바일 반응형 테스트
- [ ] 다크모드 전환 테스트
- [ ] 404 페이지 커스터마이징 (추가 권장)
- [ ] 에러 페이지 (500) 커스터마이징 (추가 권장)
- [ ] Open Graph 이미지 생성 (추가 권장)
- [ ] Google Analytics 또는 Vercel Analytics 설정 (추가 권장)
