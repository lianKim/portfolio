import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

// Callout 컴포넌트 설정
export const CALLOUT_CONFIGS = {
  info: {
    container:
      'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800/50',
    icon: Info,
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200',
  },
  warning: {
    container:
      'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/50 dark:border-yellow-800/50',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-800 dark:text-yellow-200',
  },
  error: {
    container:
      'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800/50',
    icon: AlertCircle,
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200',
  },
  success: {
    container:
      'bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800/50',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200',
  },
} as const

// Heading 컴포넌트 스타일
// scroll-mt-*: 목차 클릭 시 착지 오프셋 = 헤더높이(56) + 헤딩 상단여백(mt)
export const HEADING_STYLES = {
  1: 'scroll-mt-24 text-xl font-semibold tracking-tight mb-4 mt-10 text-foreground',
  2: 'scroll-mt-20 text-lg font-semibold tracking-tight mb-3 mt-6 text-foreground',
  3: 'scroll-mt-18 text-base font-semibold tracking-tight mb-3 mt-4 text-foreground',
  4: 'scroll-mt-18 text-subhead font-semibold tracking-tight mb-2 mt-4 text-foreground',
  5: 'scroll-mt-17 text-subhead font-medium tracking-tight mb-2 mt-3 text-foreground',
  6: 'scroll-mt-17 text-subhead font-medium tracking-tight mb-2 mt-3 text-foreground',
} as const
