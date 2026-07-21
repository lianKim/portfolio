'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isResumePage = pathname.startsWith('/resume')
  const isProjectsPage = pathname.startsWith('/projects')
  const isBlogPage = pathname.startsWith('/blog')

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto px-4 flex h-header max-w-container items-center justify-between">
        <div className="mr-4 flex">
          <Link className="mr-10 md:mr-22 flex items-center space-x-2" href="/">
            <span className="tracking-tight">LIAN KIM</span>
          </Link>
          <nav
            aria-label="메인 네비게이션"
            className="flex items-center gap-5 md:gap-7 text-sm"
          >
            <Link
              href="/resume"
              aria-current={isResumePage ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground/70',
                isResumePage ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Resume
            </Link>
            <Link
              href="/projects"
              aria-current={isProjectsPage ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground/70',
                isProjectsPage ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              aria-current={isBlogPage ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground/70',
                isBlogPage ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Blog
            </Link>
          </nav>
        </div>
        <a
          href="/files/resume.pdf"
          download="LianKim-Resume.pdf"
          aria-label="이력서 PDF 다운로드"
          className="group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-foreground/80 text-foreground/60"
        >
          이력서
          <svg
            viewBox="0 0 14 14"
            className="size-3.5 transition-transform group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 1.8V9M7 9 4.2 6.2M7 9l2.8-2.8M2.6 11.6h8.8" />
          </svg>
        </a>
      </div>
    </header>
  )
}
