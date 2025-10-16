import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({ 
  type = 'info', 
  title,
  children, 
  className 
}: CalloutProps) {
  const configs = {
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
  }

  const config = configs[type]
  const Icon = config.icon

  const defaultTitles = {
    info: '정보',
    warning: '주의',
    error: '오류',
    success: '성공'
  }

  const displayTitle = title || defaultTitles[type]

  return (
    <div className={cn(
      'my-6 p-4 border rounded-lg',
      config.container,
      className
    )}>
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconColor)} />
        <div className="flex-1 space-y-2">
          {displayTitle && (
            <div className={cn('font-semibold text-sm', config.titleColor)}>
              {displayTitle}
            </div>
          )}
          <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}