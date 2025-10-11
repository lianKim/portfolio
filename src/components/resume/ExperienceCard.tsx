import TaskItem from './TaskItem'
import type { Experience } from '@/types/resume'

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="gap-4">
      <h3 className="text-lg font-bold text-foreground mb-1">
        {experience.company}
      </h3>
      <div className="flex items-center gap-2 text-sm leading-tight">
        <p className="text-muted-foreground text-sm">
          {experience.period}
        </p>
        <span className="text-muted-foreground text-sm">|</span>
        <p className="text-muted-foreground text-sm">
          {experience.position}
        </p>
      </div>
      <p className="mt-2">
        {experience.description}
      </p>

      <ol className="space-y-8 mt-8">
        {experience.tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ol>
    </div>
  )
}