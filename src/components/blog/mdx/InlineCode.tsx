import { cn } from '@/lib/utils'

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] mx-0.5 font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  )
}
