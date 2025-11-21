import { cn } from '@/lib/utils/cn'

interface SeparatorProps {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return (
    <hr
      className={cn(
        'my-8 border-0 h-px bg-border',
        className,
      )}
    />
  )
}