import type { AboutData } from '@/types/about'

export const aboutData: AboutData = {
  introduction: {
    name: '김리안',
    position: 'Frontend Engineer',
    contact: {
      email: '5ffcut@gmail.com',
      phone: '+82 10-9001-1250',
    },
    description: [
      'React/TypeScript 기반의 2년 차 프론트엔드 개발자입니다.',
      '스타트업에서 비즈니스 요구사항 분석부터 프로덕션 배포까지 제품 개발 전반을 주도했습니다. Multi-Scope FSD 아키텍처 도입과 체계적 문서화로 신규 개발자 온보딩을 40% 단축했고, Server-Driven UI 시스템으로 파트너사 대응 시간을 30% 단축해 운영 효율성을 크게 개선했습니다.',
      '도메인을 깊이 이해하고 제품 기획과 UI/UX 디자인에 적극 참여하며, 디자인 전공을 바탕으로 시각적 완성도가 높은 인터페이스를 구현합니다. 당장의 구현뿐 아니라 장기적인 생산성과 코드 확장성을 고려하며, 팀과 함께 더 나은 방향을 찾아가고자 합니다.',
    ],
  },
  experiences: [
    {
      company: '윤회주식회사',
      period: '2024.07 - 2025.08',
      position: 'Frontend Engineer',
      description:
        '패션 제품 라이프사이클 추적 및 디지털 제품 여권(DPP) 발행 플랫폼',
      tasks: [
        {
          title: 'Server-Driven UI(SDUI) 시스템 구축',
          problem:
            '파트너사별 상이한 UI 요구사항으로 인한 컴포넌트 코드 폭증 및 배포 의존도 심화',
          process: [
            '**Role 중심 SDUI 스키마 설계** 및 JSON을 해석해 UI를 그리는 **재귀 렌더러 구현**으로 파트너사별 화면 동적 구성',
            'Zod + React Hook Form으로 **JSON 기반 동적 폼 검증 시스템**을 구축하여 하드코딩된 로직 제거',
            '제품 및 소유자 상태에 따른 **조건부 렌더링 로직을 서버 스키마로 관리**하여 프론트엔드 비즈니스 로직 단순화',
            '의사선택자(:hover, :focus)를 포함한 **확장 가능한 스타일 시스템 설계**',
          ],
          results: [
            '파트너사별 커스텀 컴포넌트 파일 **90% 감소**',
            '배포 없는 UI 대응으로 리드타임 **30% 단축**',
          ],
          technologies: [
            'React',
            'TypeScript',
            'React Query',
            'Jotai',
            'Emotion',
            'Zod',
            'React Hook Form',
          ],
        },
        {
          title: '프론트엔드 아키텍처 재구성',
          problem:
            'CRA 레거시 구조의 유지보수 한계 및 유저/어드민 코드 혼재로 인한 관리 효율 저하',
          process: [
            '**FSD(Feature-Sliced Design) 아키텍처 도입**으로 도메인 중심의 계층 분리 및 사이드 이펙트 최소화',
            'ESLint 규칙 기반의 **import 계층 제한**을 통해 아키텍처 위반을 PR 단계에서 차단하여 코드 품질 유지',
            'Atomic Design 기반 디자인 시스템 구축 및 **Storybook을 통한 50+ 공통 컴포넌트 문서화**',
            'CRA에서 Vite로 마이그레이션 진행 및 의존성 라이브러리 버전 최적화',
          ],
          results: [
            '빌드 시간 **82% 감축** (192s → 33s)',
            '번들 크기 **44% 축소** (1.46MB → 0.82MB)',
            '신규 개발자 온보딩 기간 **40% 단축**',
          ],
          technologies: ['Vite', 'Storybook', 'ESLint', 'Husky', 'lint-staged'],
        },
        {
          title: '어드민 백오피스 고도화',
          problem:
            '복잡한 권한별 메뉴 관리 비용 증가 및 70+ 필드 폼 관리의 어려움',
          process: [
            '**메뉴 메타데이터 중심의 라우트 설계**로 사이드바와 라우트를 동기화하여 관리 지점 단일화(SSOT)',
            '**Role 기반 라우트 동적 등록 시스템 구현**으로 권한별 보안 강화 및 초기 로딩 성능 최적화',
            '네이버 클로바 OCR 연동으로 사업자등록증 입력 자동화',
            '글로벌 파트너사 대응을 위한 다국어(ko/en/ja/zh) 시스템 구축',
          ],
          results: [
            'Role 확장 유연성 확보',
            '초기 라우트 로딩 성능 **42% 개선**',
            '사업자등록증 입력 시간 **80% 단축**',
          ],
          technologies: ['React Router', 'i18n', '네이버 클로바 OCR API'],
        },
        {
          title: '의류 케어라벨 WYSIWYG 에디터 개발 (SaaS)',
          problem:
            '외부 디자인 툴 의존으로 라이선스 비용 증가, 파트너사별 맞춤 라벨 요구 대응 한계',
          process: [
            'React Grid Layout 및 Canvas API 기반의 **캔버스 에디터 아키텍처 설계**',
            '드래그&드롭, 다중 선택, 바운딩 박스, 레이어 계층 관리 등 복잡한 인터랙션 구현',
            '인쇄 옵션(흑백/금박/은박 등)별 실시간 프리뷰 시스템 구현',
            '인쇄 업체 연동 가능한 PDF 출력 파이프라인 구축',
          ],
          results: [
            '외부 디자인 툴 의존 제거',
            '실제 출력물 미리보기로 샘플 제작 비용 및 시간 절감',
          ],
          technologies: [
            'Canvas API',
            'React-Grid-Layout',
            'styled-components',
          ],
        },
      ],
    },
    {
      company: 'arffy',
      period: '2023.06 - 2024.01',
      position: 'Project Lead & Frontend Engineer',
      description: '20세기 유럽 조명 및 소품 커머스 브랜드',
      tasks: [
        {
          title: '커머스 웹사이트 구축',
          problem:
            'SNS 기반 판매로 재고 관리 어려움, 주문 처리 수동화, 결제 프로세스 복잡으로 구매 전환 한계',
          process: [
            '브랜드 아이덴티티(BI) 설계부터 UI 디자인, 개발, 배포까지 End-to-End 프로젝트 리딩',
            '커머스 핵심 기능 구현: 상품 카탈로그, 장바구니, 실시간 재고 관리, 주문 상태 추적 시스템',
            '**PortOne 통합 결제 시스템 구축** (토스페이/카카오페이/이니시스)',
            'AWS EC2 + GitHub Actions **CI/CD 파이프라인 구축**',
          ],
          results: [
            'PortOne 연동을 통한 결제 자동화 및 수동 주문 처리 프로세스 개선',
          ],
          technologies: [
            'React',
            'TypeScript',
            'PortOne API',
            'AWS EC2',
            'GitHub Actions',
          ],
        },
      ],
    },
  ],
  skills: [
    {
      category: 'Language',
      skills: ['JavaScript', 'TypeScript'],
    },
    {
      category: 'Frontend',
      skills: [
        'React',
        'Next.js',
        'React Query',
        'Jotai',
        'Styled Components',
        'Emotion',
        'Tailwind CSS',
        'Storybook',
      ],
    },
    {
      category: 'DevOps & Deployment',
      skills: ['GitHub Actions', 'Vercel', 'Amazon EC2', 'Amazon S3'],
    },
    {
      category: 'Collaboration & Tools',
      skills: ['Figma', 'Notion', 'Slack', 'Git', 'Swagger', 'Postman'],
    },
  ],
  education: [
    {
      company: '홍익대학교',
      period: '2013.03 - 2019.02',
      major: '영상·영화 전공',
    },
  ],
}
