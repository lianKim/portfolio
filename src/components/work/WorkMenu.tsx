'use client'

import Link from 'next/link'
import type { Work } from '@/types/work'
import { cn } from '@/lib/utils/cn'
import { usePathname } from 'next/navigation'

interface WorkMenuProps {
  className?: string
  works: Work[]
}

export function WorkMenu({ className, works }: WorkMenuProps) {
  const pathname = usePathname()

  // /work/[slug] 패턴에서 현재 slug 추출
  const currentSlug =
    pathname.startsWith('/work/') && pathname !== '/work'
      ? pathname.split('/work/')[1]
      : undefined

  return (
    <nav aria-label="기록 메뉴" className={className}>
      <div className="space-y-1 pb-4 text-sm">
        {works.map((work) => {
          const isCurrent = currentSlug === work.slug

          return (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'block pr-2 py-1 text-sm leading-normal',
                isCurrent
                  ? 'text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
            >
              {work.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
