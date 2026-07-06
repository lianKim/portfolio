import { ReactNode } from 'react'

interface ErrorFallbackProps {
  title: string
  message: string
  description?: string
  children?: ReactNode
}

export function ErrorFallback({
  title,
  message,
  description,
  children,
}: ErrorFallbackProps) {
  return (
    <div className="relative w-full py-12">
      <div className="section-grid">
        <h2 className="section-left section-label">{title}</h2>
        <div className="section-right section-content">
          <div className="space-y-2">
            <p>{message}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {children && <div className="pt-6 flex gap-4">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
