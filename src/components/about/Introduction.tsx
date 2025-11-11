import type { Introduction } from '@/types/about'
import { Fragment } from 'react'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <header className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
      {/* 타이틀 */}
      <h2 className="col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)] text-3xl font-thin"></h2>
      {/* 소개글 */}
      <p className="col-span-1 md:col-span-7 mt-8 md:mt-0 flex flex-col gap-4 leading-relaxed">
        {data.description.map((line, index) => (
          <span key={`description-line-${index}`}>{line}</span>
        ))}
      </p>
    </header>
  )
}
