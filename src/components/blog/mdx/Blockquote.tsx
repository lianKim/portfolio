import { cn } from '@/lib/utils'

interface BlockquoteProps {
  children: React.ReactNode
  className?: string
}

export function Blockquote({ children, className }: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        'my-6 p-4 bg-transparent border border-border rounded-lg',
        'text-sm text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className,
      )}
    >
      {children}
    </blockquote>
  )
}
