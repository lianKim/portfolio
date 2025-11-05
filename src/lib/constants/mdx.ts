import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react'

// Callout 컴포넌트 설정
export const CALLOUT_CONFIGS = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800/50',
    icon: Info,
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/50 dark:border-yellow-800/50',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-800 dark:text-yellow-200'
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800/50',
    icon: AlertCircle,
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200'
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800/50',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200'
  }
} as const

export const CALLOUT_DEFAULT_TITLES = {
  info: '정보',
  warning: '주의',
  error: '오류',
  success: '성공'
} as const

// Heading 컴포넌트 스타일
export const HEADING_STYLES = {
  1: 'text-4xl font-extrabold tracking-tight text-balance mb-6 text-foreground',
  2: 'text-3xl font-semibold tracking-tight mb-5 mt-10 text-foreground',
  3: 'text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground',
  4: 'text-xl font-semibold tracking-tight mb-3 mt-6 text-foreground',
  5: 'text-base md:text-lg font-medium tracking-tight mb-2 mt-4 text-foreground/80',
  6: 'text-sm md:text-base font-medium tracking-tight mb-2 mt-3 text-foreground/70',
} as const
