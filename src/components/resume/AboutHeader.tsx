import type { ResumeHeader } from '@/types/resume'

interface AboutHeaderProps {
  data: ResumeHeader
}

export default function AboutHeader({ data }: AboutHeaderProps) {
  return (
    <header className="space-y-8">
      <h1 className="text-4xl font-bold leading-tight">
        안녕하세요,
        <br />
        {data.name}
      </h1>
      <p>
        {data.introduction}
      </p>
    </header>
  )
}