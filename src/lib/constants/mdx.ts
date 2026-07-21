import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

// Callout 컴포넌트 설정
// 사이트 팔레트(뉴트럴 + 붉은 accent 하나)에 맞춰, 배경은 투명·보더만 중립으로 두고
// 종류는 아이콘으로 구분. 주의가 필요한 warning·error만 accent 아이콘으로 최소 강조.
export const CALLOUT_CONFIGS = {
  info: {
    container: 'border-border',
    icon: Info,
    iconColor: 'text-muted-foreground',
    titleColor: 'text-foreground',
  },
  warning: {
    container: 'border-border',
    icon: AlertTriangle,
    iconColor: 'text-accent-foreground',
    titleColor: 'text-foreground',
  },
  error: {
    container: 'border-border',
    icon: AlertCircle,
    iconColor: 'text-accent-foreground',
    titleColor: 'text-foreground',
  },
  success: {
    container: 'border-border',
    icon: CheckCircle,
    iconColor: 'text-muted-foreground',
    titleColor: 'text-foreground',
  },
} as const

// Heading 컴포넌트 스타일
// scroll-mt-*: 목차 클릭 시 착지 오프셋 = 헤더높이(56) + 헤딩 상단여백(mt)
// 본문 최상위는 h2부터 사용(h1은 페이지 제목 전용) → h1은 제목과 동일 스타일로 두고, 나머지를 한 단계씩 사용
export const HEADING_STYLES = {
  1: 'scroll-mt-24 text-2xl font-semibold tracking-tight leading-tight mb-4 mt-10 text-foreground',
  2: 'scroll-mt-24 text-xl font-semibold tracking-tight mb-4 mt-10 text-foreground',
  3: 'scroll-mt-20 text-lg font-semibold tracking-tight mb-3 mt-6 text-foreground',
  4: 'scroll-mt-18 text-base font-semibold tracking-tight mb-3 mt-4 text-foreground',
  5: 'scroll-mt-18 text-subhead font-semibold tracking-tight mb-2 mt-4 text-foreground',
  6: 'scroll-mt-17 text-subhead font-medium tracking-tight mb-2 mt-3 text-foreground',
} as const
