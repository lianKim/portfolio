import type { Introduction } from '@/types/resume'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <section>
      <div className="section-grid">
        <div className="section-left text-sm text-muted-foreground">
          {/* <div> */}
          {/* 이름 */}
          {/* <h3 className="mb-1 text-2xl font-semibold">{data.name}</h3> */}
          {/* 직무 */}
          {/* <p className="mb-4">{data.position}</p> */}
          {/* 연락처 */}
          {/* <address className="lg:h-5 flex flex-col gap-x-2 gap-y-1.5 text-sm leading-tight text-muted-foreground not-italic">
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
          / About
        </div>

        {/* 소개글 */}
        <div className="section-right mt-10 md:mt-0">
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-[15px]">
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
