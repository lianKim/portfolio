import type { Introduction } from '@/types/resume'
import { RESUME_PDF_URL } from '@/lib/constants/resume'

interface ResumeHeaderProps {
  data: Introduction
}

export default function ResumeHeader({ data }: ResumeHeaderProps) {
  return (
    <header className="section-grid">
      <div className="section-left">
        <h1 className="mb-1 text-xl font-semibold">{data.name}</h1>
        <p>{data.position}</p>
      </div>

      <address className="section-right section-content flex flex-col items-start gap-y-2 text-sm leading-tight text-muted-foreground not-italic md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-4">
        <div className="flex flex-row gap-2 md:flex-col">
          <span>Email.</span>
          <a
            href={`mailto:${data.contact.email}`}
            className="text-foreground hover:underline focus-visible:underline"
          >
            {data.contact.email}
          </a>
        </div>
        <div className="flex flex-row gap-2 md:flex-col">
          <span>GitHub.</span>
          <a
            href={`https://${data.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline focus-visible:underline"
          >
            {data.contact.github}
          </a>
        </div>
        <div className="flex flex-row gap-2 md:flex-col">
          <span>Resume.</span>
          <a
            href={RESUME_PDF_URL}
            className="group inline-flex items-center gap-1 text-foreground hover:underline focus-visible:underline"
          >
            PDF 다운로드
            <svg
              viewBox="0 0 14 14"
              className="size-3 transition-transform group-hover:translate-y-0.5"
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
      </address>
    </header>
  )
}
