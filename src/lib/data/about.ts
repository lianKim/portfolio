import type { AboutData } from '@/types/about'

export const aboutData: AboutData = {
  introduction: {
    title: '김리안',
    subtitles: ['2년 차 프론트엔드 개발자', 'React·TypeScript 기반'],
    description: [
      // 'React/TypeScript 기반의 2년 차 프론트엔드 개발자입니다.',
      '스타트업에서 비즈니스 요구사항 분석부터 프로덕션 배포까지 제품 개발 전반을 주도했습니다. Multi-Scope FSD 아키텍처 도입과 체계적 문서화로 신규 개발자 온보딩을 40% 단축했고, Server-Driven UI 시스템으로 파트너사 대응 시간을 30% 단축해 운영 효율성을 크게 개선했습니다.',
      '도메인을 깊이 이해하고 제품 기획과 UI/UX 디자인에 적극 참여하며, 디자인 전공을 바탕으로 시각적 완성도가 높은 인터페이스를 구현합니다. 당장의 구현뿐 아니라 장기적인 생산성과 코드 확장성을 고려하며, 팀과 함께 더 나은 방향을 찾아가는 개발자입니다.',
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
            '파트너사별 UI 커스터마이징으로 컴포넌트 파일 급증 → 번들 비대화, 유지보수 복잡도 상승, 변경 시마다 전체 배포 필요',
          process: [
            'TypeScript 기반 타입 안전한 SDUI 스키마 시스템 설계 - ElementBase 상속 구조로 확장 가능한 컴포넌트 타입 체계 구축, 실시간 서버 데이터 동적 바인딩, 상태별 스타일 및 pseudo selector 지원',
            '설계한 스키마를 해석하는 재귀 렌더러 구현 → 20+ 컴포넌트 타입 동적 처리',
            'Zod + React Hook Form 연동으로 JSON 기반 동적 폼 검증 시스템 구현 - 타입별 검증 규칙 및 다국어 에러 메시지 지원',
            '실시간 UI 미리보기 도구로 비개발자도 UI 수정 가능',
          ],
          results: [
            '파트너사별 커스텀 컴포넌트 파일 90% 감소로 번들 크기 최적화',
            '배포 없이 UI 변경 가능 → 요구사항 대응 시간 30% 단축',
            '기획/디자인 협업 효율성 60% 향상',
          ],
          technologies: [
            'React',
            'TypeScript',
            'React Query',
            'Jotai',
            'Emotion',
            'Three.js',
          ],
        },
        {
          title: '프론트엔드 아키텍처 재구성',
          problem:
            'CRA 레거시로 인한 라이브러리 버전 충돌, 파일 분산으로 개발 효율성 저하, 유저/어드민 영역 혼재로 관리 복잡도 증가',
          process: [
            'Multi-Scope FSD 아키텍처 도입: 유저/어드민 독립 스코프 분리',
            'ESLint로 FSD 단방향 참조 자동화 + import 계층별 자동 정렬로 코드 품질 유지',
            'Atomic Design 기반 디자인 시스템 구축 및 Storybook으로 50+ 공통 컴포넌트 문서화',
            'Vite 마이그레이션으로 라이브러리 호환성 문제 해결',
          ],
          results: [
            '빌드 시간: 82% 감축 (192.63초 → 33.82초)',
            '번들 크기: 44% 축소 (1.46MB → 0.82MB)',
            '체계적인 온보딩 문서로 신규 개발자 적응 기간 40% 단축',
          ],
          technologies: ['Vite', 'Storybook', 'Husky', 'lint-staged', 'ESLint'],
        },
        {
          title: '의류 케어라벨 WYSIWYG 에디터(SaaS) 개발',
          problem:
            '외부 디자인 툴 의존으로 라이선스 비용 증가, 파트너사별 맞춤 라벨 요구 대응 한계, 비개발자 접근성 부족',
          process: [
            'React Grid Layout 기반 캔버스 에디터 아키텍처 설계 - 드래그 앤 드롭, 다중 선택, 바운딩 박스 등 인터랙션 시스템 구현, 레이어 계층 구조로 렌더링 순서 관리',
            '실제 출력물 시뮬레이션 미리보기 시스템 구현 - 흰색/검은색 라벨, 흑백/금박/은박 인쇄 옵션별 실시간 프리뷰, HTML to Image 변환 후 원단/질감 이미지와 CSS filter 활용하여 실물 효과 구현',
            '뷰포트 줌/팬 기능 구현',
            'FontFace API 활용 커스텀 폰트 시스템 구축 - 폰트 업로드 및 실시간 동적 로딩',
          ],
          results: [
            '외부 툴 라이선스 비용 100% 절감 및 커스터마이징 자유도 확보',
            'Adobe/Figma 단축키 호환으로 디자이너 작업 효율성 40% 향상',
            '실제 출력물 미리보기로 샘플 제작 비용 및 시간 절감',
            'PDF 내보내기 기능으로 인쇄 업체 직접 연동 가능',
          ],
          technologies: [
            'Canvas API',
            'react-grid-layout',
            'FontFace API',
            'styled-components',
          ],
        },
        {
          title: '어드민 백오피스 개발 및 고도화',
          problem: '3개 역할별 접근 제어 필요, 70+ 필드 복잡한 폼 관리',
          process: [
            '역할 기반 동적 라우팅 아키텍처 설계 - role별 라우트 맵 동적 생성 시스템 구축, 유틸리티 함수로 라우트 관리 및 사이드바 메뉴 구성 자동화',
            '라우트별 코드 스플리팅으로 초기 번들 최적화',
            'React Hook Form + Zod 도입으로 복잡한 폼 관리 체계화',
            '네이버 클로바 OCR 연동으로 사업자등록증 자동 인식',
          ],
          results: [
            '역할별 완전 독립된 어드민 환경 구축 → 보안성·유지보수성 향상, 신규 역할 확장 용이',
            '초기 로딩 성능 42% 개선',
            '사업자등록증 입력 시간 80% 단축',
          ],
          technologies: [
            'React Router',
            'React Hook Form',
            'Zod',
            'i18n',
            '네이버 클로바 OCR API',
          ],
        },
        {
          title: '프론트엔드 신입 채용 사전과제 기획·출제',
          problem: '신입 개발자의 실무 역량을 검증할 수 있는 과제 필요',
          process: [
            'Canvas 에디터 시뮬레이션 과제 설계 - 실제 프로덕트(케어라벨 에디터) 핵심 기능 반영',
            '레이어 패널 + 뷰포트 구조로 실제 디자인 툴 UX 구현',
            '세부 요구사항: 요소 생성, 다중 선택, Drag&Drop, 그룹화, 정렬, 이미지 내보내기 등',
          ],
          results: [
            '실제 프로덕트와 유사한 과제로 입사 후 업무 적응도 예측 가능',
            '명확한 요구사항으로 평가 일관성 확보 및 채용 결정 시간 50% 단축',
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
          title: '자체 브랜드 커머스 웹사이트 구축 및 운영',
          problem:
            'SNS 기반 판매의 한계 - 재고 관리 어려움, 주문 처리 수동화, 결제 프로세스 복잡',
          process: [
            '브랜딩부터 배포까지 End-to-End 프로젝트 리딩',
            'PortOne 통합 결제 시스템 구축 (토스페이/카카오페이/이니시스)',
            'AWS EC2 + GitHub Actions CI/CD 파이프라인 구축',
          ],
          results: [
            '주문 처리 자동화로 운영 시간 80% 단축',
            '통합 결제 시스템으로 구매 프로세스 간소화',
          ],
          technologies: [
            'React',
            'TypeScript',
            'AWS EC2',
            'GitHub Actions',
            'PortOne API',
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
