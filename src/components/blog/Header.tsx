import { Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto px-4 flex h-[var(--header-height)] max-w-[var(--container-max-width)] items-center justify-between">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/blog">
            <span className="font-bold">Lian Kim</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
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
