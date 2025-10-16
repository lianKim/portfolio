import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  id?: string
  className?: string
}

export function Heading({ level, children, id, className }: HeadingProps) {
  // 텍스트에서 ID 생성 (한글 지원)
  const generateId = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-가-힣]/g, '')
  }

  const headingId = id || generateId(children?.toString() || '')

  const baseStyles = 'scroll-mt-20 transition-colors'

  const styles = {
    1: 'text-4xl font-extrabold tracking-tight text-balance mb-6 text-foreground',
    2: 'text-3xl font-semibold tracking-tight mb-5 mt-10 text-foreground',
    3: 'text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground',
    4: 'text-xl font-semibold tracking-tight mb-3 mt-6 text-foreground',
    5: 'text-base md:text-lg font-medium tracking-tight mb-2 mt-4 text-foreground/80',
    6: 'text-sm md:text-base font-medium tracking-tight mb-2 mt-3 text-foreground/70',
  }

  const Component = `h${level}` as any

  return (
    <Component
      id={headingId}
      className={cn(baseStyles, styles[level], className)}
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
