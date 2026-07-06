'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isResumePage = pathname.startsWith('/resume')
  const isBlogPage = pathname.startsWith('/blog')

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto px-4 flex h-header max-w-container items-center justify-between">
        <div className="mr-4 flex">
          <Link className="mr-12 md:mr-16 flex items-center space-x-2" href="/">
            <span className="tracking-tight">LIAN KIM</span>
          </Link>
          {/* <nav
            aria-label="메인 네비게이션"
            className="flex items-center gap-6 text-sm"
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
              href="/blog"
              aria-current={isBlogPage ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground/70',
                isBlogPage ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Blog
            </Link>
          </nav> */}
        </div>
        <a
          href="https://github.com/lianKim"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          aria-label="Github"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}
