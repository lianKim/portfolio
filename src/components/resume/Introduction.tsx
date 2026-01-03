import type { Introduction } from '@/types/resume'
import { Separator } from '../ui/separator'
import { Mail, Phone } from 'lucide-react'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <section>
      {/* <h2 className="text-[1.8rem] font-thin mb-8">Introduction</h2> */}
      <div className="grid md:grid-cols-12 gap-x-5">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[var(--sticky-top-offset)]">
            {/* 이름 */}
            <h3 className="mb-1 text-2xl font-semibold">{data.name}</h3>
            {/* 직무 */}
            <p className="mb-4">{data.position}</p>
            {/* 연락처 */}
            <address className="lg:h-5 flex flex-col gap-x-2 gap-y-1.5 text-sm leading-tight text-muted-foreground not-italic">
              {/* 이메일 */}
              <div className="inline-flex items-center gap-2">
                <span className="w-12">Email.</span>
                <a href={`mailto:${data.contact.email}`} className="underline">
                  {data.contact.email}
                </a>
              </div>
              {/* 전화번호 */}
              <div className="inline-flex items-center gap-2">
                <span className="w-12">Phone.</span>
                <a href={`tel:${data.contact.phone}`} className="underline">
                  {data.contact.phone}
                </a>
              </div>
              {/* GitHub */}
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
          </div>
        </div>

        {/* 소개글 */}
        <div className="md:col-span-7 mt-10 md:mt-0">
          <div className="flex flex-col gap-6 leading-relaxed">
            {data.description.map((item, index) => (
              <div key={`description-${index}`}>
                <h4 className="font-semibold mb-1.5">{item.title}</h4>
                <p className="leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
