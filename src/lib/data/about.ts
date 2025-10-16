import type { AboutData } from '@/types/about'

export const aboutData: AboutData = {
  introduction: {
    title: '프론트엔드 개발자 김리안입니다.',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
    quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Quisquam, quos.`,
  },
  experiences: [
    {
      company: '회사 이름',
      period: '2025.01 - 2025.02',
      position: 'Frontend Engineer',
      description:
        '패션 제품 라이프사이클 추적 및 디지털 제품 여권(DPP) 발행 플랫폼',
      tasks: [
        {
          title: '주요 업무 타이틀',
          details: [
            {
              content:
                'CRA Vite 마이그레이션 및 Feature-Sliced Design(FSD) 아키텍처 도입',
              subContent: [
                '빌드 시간: 82% 감축 (192.63초 -> 33.82초)',
                '번들 크기: 44% 축소 (1.46MB -> 0.82MB)',
              ],
            },
            {
              content:
                'Atomic Design 기반 디자인 시스템 구축 및 Storybook으로 50+ 공통 컴포넌트 문서화',
            },
            {
              content: 'Husky·lint-staged·ESLint로 코드 품질 표준화 및 자동화',
            },
          ],
          technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
          title: '주요 업무 타이틀',
          details: [
            {
              content:
                '업무 내용 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. sit amet consectetur adipisicing elit. Quisquam, quos.',
            },
            {
              content:
                '업무 내용 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            },
            {
              content:
                '업무 내용 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            },
          ],
          technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
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
