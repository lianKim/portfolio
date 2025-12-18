import type { Introduction } from '@/types/about'
import { Separator } from '../ui/separator'
import { Mail, Phone } from 'lucide-react'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <section>
      <h2 className="text-[1.8rem] font-thin mb-8">Introduction</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[var(--sticky-top-offset)]">
            {/* 이름 */}
            <h3 className="mb-3 lg:mb-2 font-bold">{data.name}</h3>
            {/* 연락처 */}
            <address className="lg:h-5 flex flex-col lg:flex-row lg:items-center gap-x-2 gap-y-1.5 text-sm leading-tight text-muted-foreground not-italic">
              {/* 이메일 */}
              <div className="inline-flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <a href={`mailto:${data.contact.email}`}>
                  {data.contact.email}
                </a>
              </div>
              <Separator
                orientation="vertical"
                className="hidden lg:inline-block"
              />
              {/* 전화번호 */}
              <div className="inline-flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
              </div>
            </address>
          </div>
        </div>

        {/* 소개글 */}
        <div className="md:col-span-7 mt-10 md:mt-0">
          <div className="flex flex-col gap-4 leading-relaxed">
            {data.description.map((line, index) => (
              <p key={`description-line-${index}`}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
