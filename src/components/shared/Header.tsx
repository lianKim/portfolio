'use client'

import { Github } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/blog') {
      return pathname.startsWith('/blog')
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto px-4 flex h-[var(--header-height)] max-w-[var(--container-max-width)] items-center justify-between">
        <div className="mr-4 flex">
          <a className="mr-12 flex items-center space-x-2" href="/about">
            <span className="tracking-tight">LIAN KIM</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a
              className={cn(
                'transition-colors hover:text-foreground/70',
                isActive('/about')
                  ? 'text-foreground'
                  : 'text-muted-foreground',
              )}
              href="/about"
            >
              About
            </a>
            <a
              className={cn(
                'transition-colors hover:text-foreground/70',
                isActive('/blog') ? 'text-foreground' : 'text-muted-foreground',
              )}
              href="/blog"
            >
              Blog
            </a>
          </nav>
        </div>
        <a
          href="https://github.com/lianKim"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}
