import { CALLOUT_CONFIGS } from '@/lib/constants/mdx'
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
  className,
}: CalloutProps) {
  const config = CALLOUT_CONFIGS[type]
  const Icon = config.icon

  return (
    <div
      className={cn('my-6 p-4 border rounded-lg', config.container, className)}
    >
      <div className="flex gap-2.5">
        <Icon
          className={cn('w-4.5 h-4.5 mt-0.5 flex-shrink-0', config.iconColor)}
        />
        <div className="flex-1 space-y-2">
          {title && (
            <div className={cn('font-semibold text-sm', config.titleColor)}>
              {title}
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
