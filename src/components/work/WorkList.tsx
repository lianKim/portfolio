import type { Work } from '@/types/work'
import { WorkCard } from './WorkCard'

interface WorkListProps {
  works: Work[]
}

export function WorkList({ works }: WorkListProps) {
  if (works.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">작성된 기록이 없습니다.</p>
    )
  }

  return (
    <ul className="flex flex-col space-y-18">
      {works.map((work) => (
        <li key={work.slug}>
          <WorkCard
            slug={work.slug}
            title={work.title}
            description={work.description}
          />
        </li>
      ))}
    </ul>
  )
}
