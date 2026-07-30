import BusinessCardLoader from '@/components/home/BusinessCardLoader'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <BusinessCardLoader />

      <nav aria-label="바로가기" className="flex items-center gap-6 text-sm">
        <Link
          href="/resume"
          className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Resume
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Projects
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Blog
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </nav>
    </div>
  )
}
