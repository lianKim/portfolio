import { PERSONAL_INFO } from '@/lib/constants/personal'
import type { ResumeData } from '@/types/resume'

export const resumeData: ResumeData = {
  introduction: {
    name: PERSONAL_INFO.name,
    position: '프론트엔드 개발자',
    contact: {
      email: PERSONAL_INFO.email,
      phone: PERSONAL_INFO.phone,
      github: PERSONAL_INFO.github.display,
    },
    description: {
      title: '만들고 팔아본 프론트엔드 개발자',
      content: [
        '빈티지 조명 브랜드를 직접 운영하며, 고객이 상품을 보고 결제하는 화면과 운영자가 주문·상품을 관리하는 관리자 페이지를 만들고, 배포까지 맡았습니다. 이후 패션 산업 플랫폼에서는 성격이 다른 서비스들이 한 코드베이스에 섞이며 생기는 문제를 줄이기 위해, 프론트엔드 구조를 재편하고 팀이 같은 기준으로 개발할 수 있도록 문서화했습니다.',
        'React·TypeScript를 주로 사용하며, 화면을 만들 때 사용자가 보는 흐름과 운영자가 관리하는 흐름을 함께 확인합니다. 기능을 더하기 전에, 지금 구조에서 줄일 수 있는 복잡도가 있는지 먼저 봅니다.',
      ],
    },
  },
  experiences: [
    {
      company: '윤회주식회사',
      period: '2024.07 - 2025.08',
      position: 'Frontend Engineer',
      note: 'FE 1인 → 3인',
      description:
        '패션 제품 라이프사이클 추적 및 디지털 제품 여권(DPP) 발행 플랫폼',
      tasks: [
        {
          title: '프론트엔드 아키텍처 재구성',
          projectSlug: 'multi-scope-fsd',
          problem:
            '권한·사용자 유형이 다른 독립 도메인들이 단일 CRA 구조에 혼재해, 도메인 간 사이드 이펙트 위험이 큰 상태',
          process: [
            {
              text: '표준 단일 스코프 FSD(Feature-Sliced Design)로는 도메인 격리가 부족하다고 판단해, 영역·권한 단위로 상위를 나눈 **멀티 스코프 구조**를 구성',
            },
            {
              text: '레이어 단방향 의존 원칙을 **ESLint 규칙으로 강제**하고, 아키텍처 위반을 PR 단계에서 자동 차단',
              href: '/blog/fsd-with-eslint',
            },
            {
              text: '반복적인 파일 이동·import 수정은 AI 도구로 자동화하고, 도메인 경계와 의존 방향은 직접 검증·교정',
            },
            {
              text: 'Atomic Design 기반 공통 컴포넌트를 정리하고 Storybook으로 50+ 컴포넌트 문서화',
            },
            {
              text: '팀이 같은 기준으로 구조를 판단할 수 있도록 FSD 개요·구조 가이드·체크리스트를 문서화',
            },
          ],
          results: [
            '빌드 시간 **58% 단축** (81s → 34s, CRA → Vite 전환 포함)',
            '아키텍처 위반을 리뷰어 판단이 아닌 CI에서 자동 검출',
          ],
          technologies: [
            'React',
            'TypeScript',
            'Vite',
            'ESLint',
            'Storybook',
            'Husky',
            'lint-staged',
          ],
        },
        {
          title: 'Server-Driven UI(SDUI) 시스템 설계',
          projectSlug: 'sdui',
          problem:
            '브랜드마다 레이아웃·정보 구조·인터랙션 요구가 달라, 브랜드별 분기 컴포넌트가 늘며 번들과 유지보수 부담이 커지는 구조',
          process: [
            {
              text: '테마 시스템·마이크로 프론트엔드를 검토했으나 확장 비용이 커, **UI 구조 자체를 JSON으로 표현**하는 SDUI를 설계',
            },
            {
              text: 'JSON의 role을 React 컴포넌트로 매핑하는 재귀 렌더러를 설계, element를 union 타입으로 모델링해 role별 속성을 **컴파일 타임에 검증**',
              href: '/blog/sdui-architecture',
            },
            {
              text: 'element를 HTML 태그 수준의 최소 단위로 설계하고 변형은 새 컴포넌트가 아닌 prop으로 흡수해, 요구사항이 늘어도 컴포넌트 수가 늘지 않도록 유지',
            },
            {
              text: '서버 JSON의 검증 규칙을 **런타임에 Zod 스키마로 변환**해 폼 검증을 동적으로 구성',
            },
            {
              text: '상태·의사 선택자(hover 등)를 포함한 확장형 스타일 시스템을 설계해, 브랜드별 인터랙션·조건부 스타일을 JSON으로 제어',
              href: '/blog/sdui-style-system',
            },
          ],
          results: [
            '신규 브랜드 화면 추가 시 기존 element를 JSON으로 조합해 대응',
            '**배포 없이** 서버 JSON 수정만으로 UI 변경을 즉시 반영',
          ],
          technologies: [
            'React Query',
            'Jotai',
            'Emotion',
            'Zod',
            'React Hook Form',
          ],
        },
        {
          title: '어드민 백오피스 구축 및 고도화',
          projectSlug: 'role-based-routing',
          problem:
            '라우트·사이드바·접근 권한을 따로 관리해, 페이지 하나를 추가할 때 세 곳을 모두 수정해야 하는 구조',
          process: [
            {
              text: '라우트 정의에 메뉴 메타데이터를 함께 선언하는 구조를 만들어, 라우트·사이드바·접근 권한을 **단일 정의로 동기화(SSOT)**',
              href: '/blog/role-based-routing',
            },
            {
              text: '로그인 시점에 **권한별 라우트만 동적으로 등록**해, 허용되지 않은 경로를 라우터에서 제외',
            },
            {
              text: '라우트 단위 코드 스플리팅으로 초기 로드 JS 축소',
            },
            {
              text: '70+ 필드 폼 검증, 4개 언어(ko/en/ja/zh) 입력, OCR 기반 사업자등록증 자동 입력 등 운영 기능 구축',
            },
          ],
          results: [
            '페이지·권한 추가를 단일 정의 수정으로 처리',
            '초기 로드 JS **48% 경량화** (gzip 713KB → 373KB)',
          ],
          technologies: [
            'React Router',
            'React Hook Form',
            'Zod',
            'react-i18next',
            'CLOVA OCR API',
          ],
        },
        {
          title: '의류 케어라벨 WYSIWYG 에디터 (SaaS)',
          projectSlug: 'care-label-editor',
          problem:
            '케어라벨 제작이 디자인 툴, 라벨 규격 지식, 라벨사와의 수기 소통으로 분절돼, 파일 관리와 커뮤니케이션 비용이 큰 상태',
          process: [
            {
              text: '편집 좌표를 **실측 mm에 1:1**로 맞춘 그리드 기반 에디터 개발 (화면 px ↔ mm ↔ 그리드 단위를 300 DPI 기준 상호 변환)',
            },
            {
              text: 'react-grid-layout이 지원하지 않는 다중 선택·바운딩 박스 그룹 변형과 배치 전 영역 검증을 **직접 구현**',
            },
            {
              text: '디자인을 JSON으로 직렬화해 재편집 가능하게 저장하고, 폰트 깨짐 없는 출력을 위해 사용 폰트를 임베딩한 고해상도 이미지로 캡처',
            },
          ],
          results: ['사내 검증 단계까지 개발'],
          technologies: [
            'react-grid-layout',
            'Jotai',
            'html-to-image',
            'FontFace API',
            'styled-components',
          ],
        },
      ],
    },
    {
      company: 'arffy',
      period: '2023.06 - 2024.01',
      position: 'Co-Founder & Frontend Engineer',
      description: '20세기 유럽 빈티지 조명·소품 커머스 브랜드',
      tasks: [
        {
          title: '커머스 웹사이트 구축',
          projectSlug: 'arffy-commerce',
          problem:
            '기성 쇼핑몰 플랫폼은 브랜드 아이덴티티를 담기 어렵고, SNS 기반 판매는 구매 안내·주문 취합을 매번 수기로 처리해야 해 운영 부담이 큰 구조',
          process: [
            {
              text: '기획·디자인·프론트엔드·배포·운영 전반을 맡아, **고객 스토어와 관리자 페이지**를 갖춘 커머스 서비스를 구축',
            },
            {
              text: '백엔드 개발자와 에러 케이스를 정의하고, API 영역과 전역의 2단 Error Boundary로 상태별 분기·복구 처리',
            },
            {
              text: 'PortOne 연동으로 카카오·토스·이니시스 **다중 PG 결제**를 구현해 실주문 결제 처리',
            },
            {
              text: 'AWS EC2 + GitHub Actions 배포 자동화',
            },
          ],
          technologies: [
            'React',
            'TypeScript',
            'React Query',
            'Jotai',
            'styled-components',
            'PortOne',
            'AWS EC2',
            'GitHub Actions',
          ],
        },
      ],
    },
  ],
  skills: [
    {
      category: 'Frontend',
      skills: [
        'TypeScript',
        'React',
        'Next.js',
        'React Query',
        'Jotai',
        'styled-components',
        'Emotion',
        'Tailwind CSS',
        'Storybook',
      ],
    },
    {
      category: 'DevOps & Deployment',
      skills: ['GitHub Actions', 'Vercel', 'AWS EC2'],
    },
    {
      category: 'Collaboration & Tools',
      skills: ['Git', 'Figma', 'Slack', 'Notion', 'Swagger', 'Postman'],
    },
  ],
  education: [
    {
      company: '홍익대학교',
      period: '2013.03 - 2019.02',
      major: '디자인영상학부',
    },
  ],
}
