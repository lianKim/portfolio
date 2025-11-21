import { cn } from '@/lib/utils/cn'

interface ParagraphProps {
  children: React.ReactNode
  className?: string
}

export function Paragraph({ children, className }: ParagraphProps) {
  return <p className={cn('leading-7 mb-3', className)}>{children}</p>
}
