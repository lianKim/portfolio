import type { Introduction } from '@/types/resume'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <section>
      <div className="section-grid">
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
