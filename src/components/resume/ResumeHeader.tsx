import type { Introduction } from '@/types/resume'

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
            className="text-foreground underline"
          >
            {data.contact.email}
          </a>
        </div>
        <div className="flex flex-row gap-2 md:flex-col">
          <span>Phone.</span>
          <a
            href={`tel:${data.contact.phone}`}
            className="text-foreground underline"
          >
            {data.contact.phone}
          </a>
        </div>
        <div className="flex flex-row gap-2 md:flex-col">
          <span>GitHub.</span>
          <a
            href={`https://${data.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            {data.contact.github}
          </a>
        </div>
      </address>
    </header>
  )
}
