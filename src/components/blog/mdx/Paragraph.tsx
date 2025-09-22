import { cn } from '@/lib/utils'

interface ParagraphProps {
  children: React.ReactNode
  className?: string
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p
      className={cn(
        'leading-7 [&:not(:first-child)]:mt-6',
        className,
      )}
    >
      {children}
    </p>
  )
}