import type { Experience } from '@/types/resume'
import { Separator } from '../ui/separator'
import TaskItem from './TaskItem'

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="section-grid">
      <div className="section-left">
        <div className="md:sticky top-below-header">
          <h3 className="mb-3 lg:mb-2 font-semibold text-[15px]">
            {experience.company}
          </h3>
          <p className="mb-3 lg:mb-2">{experience.description}</p>
          <div className="lg:h-5 flex flex-col lg:flex-row lg:items-center gap-x-2 gap-y-1.5 text-sm leading-tight text-muted-foreground">
            <p>{experience.period}</p>
            <span className="hidden lg:inline-block">・</span>
            <p>{experience.position}</p>
          </div>
        </div>
      </div>

      <div className="section-right mt-4 md:mt-0">
        <ol className="space-y-14">
          {experience.tasks.map((task) => (
            <TaskItem key={`${experience.company}-${task.title}`} task={task} />
          ))}
        </ol>
      </div>
    </div>
  )
}
