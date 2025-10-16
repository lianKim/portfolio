import type { Introduction } from '@/types/about'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  return (
    <header className="space-y-8">
      <h1 className="text-4xl font-bold leading-tight">
        안녕하세요,
        <br />
        {data.title}
      </h1>
      <p>{data.description}</p>
    </header>
  )
}
