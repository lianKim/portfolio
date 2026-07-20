import type { Introduction } from '@/types/resume'

interface ResumeHeaderProps {
  data: Introduction
}

export default function ResumeHeader({ data }: ResumeHeaderProps) {
  return (
    <header>
      <div className="section-grid">
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
      </div>

      {/* 이력서 PDF 다운로드 (리더 룰) */}
      {/* 모바일: 액션 좌측(콘텐츠와 정렬)·룰이 뒤를 채움 / 데스크탑: 룰 좌측·액션 우측 */}
      <div className="mt-8 flex flex-row-reverse items-center gap-3.5 pt-5 md:flex-row">
        {/* <span className="text-[13px] text-muted-foreground">이력서 전문</span> */}
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <a
          href="/files/resume.pdf"
          download="LianKim-Resume.pdf"
          className="group inline-flex shrink-0 items-center gap-1.5 text-[13px] text-foreground transition-colors hover:text-accent-foreground"
        >
          이력서 PDF 다운로드
          <svg
            viewBox="0 0 14 14"
            className="size-3.5 text-accent-foreground transition-transform group-hover:translate-y-0.5"
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
