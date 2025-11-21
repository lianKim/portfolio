import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { generateHeadingId } from '@/lib/utils/mdx'
import { HEADING_STYLES } from '@/lib/constants/mdx'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  id?: string
  className?: string
}

export function Heading({ level, children, id, className }: HeadingProps) {
  const headingId = id || generateHeadingId(children?.toString() || '')
  const baseStyles = 'scroll-mt-20 transition-colors'
  const Component = `h${level}` as any

  return (
    <Component
      id={headingId}
      className={cn(baseStyles, HEADING_STYLES[level], className)}
    >
      <a
        href={`#${headingId}`}
        className="group no-underline hover:text-foreground/80"
      >
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-foreground/30 select-none">
          #
        </span>
      </a>
    </Component>
  )
}
