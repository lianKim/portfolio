import type { Introduction } from '@/types/resume'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <section>
      <div className="section-grid">
        {/* 연락처 정보 - 임시 숨김 (name / position / contact)
        <div>
          <h3 className="mb-1 text-2xl font-semibold">{data.name}</h3>
          <p className="mb-4">{data.position}</p>
          <address className="lg:h-5 flex flex-col gap-x-2 gap-y-1.5 text-sm leading-tight text-muted-foreground not-italic">
            <div className="inline-flex items-center gap-2">
              <span className="w-12">Email.</span>
              <a href={`mailto:${data.contact.email}`} className="underline">
                {data.contact.email}
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="w-12">Phone.</span>
              <a href={`tel:${data.contact.phone}`} className="underline">
                {data.contact.phone}
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="w-12">GitHub.</span>
              <a
                href={`https://${data.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {data.contact.github}
              </a>
            </div>
          </address>
        </div> */}
        <h2 className="section-left section-label">/ About</h2>

        {/* 소개글 */}
        <div className="section-right mt-10 md:mt-0">
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-subhead">
              {data.description.title}
            </h4>
            <div className="space-y-4">
              {data.description.content.map((item, index) => (
                <p
                  key={`description-${index}`}
                  className="text-sm leading-loose"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
