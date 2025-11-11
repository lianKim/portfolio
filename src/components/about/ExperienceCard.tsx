import type { Experience } from '@/types/about'
import { Separator } from '../ui/separator'
import TaskItem from './TaskItem'

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
      <div className="col-span-1 md:col-span-5">
        <div className="md:sticky md:top-[var(--sticky-top-offset)]">
          <h3 className="text-md font-bold text-foreground mb-2">
            {experience.company}
          </h3>
          <div className="lg:h-5 flex flex-col lg:flex-row lg:items-center gap-x-2 gap-y-1 text-sm font-medium leading-tight text-muted-foreground">
            <p>{experience.period}</p>
            <Separator
              orientation="vertical"
              className="hidden lg:inline-block"
            />
            <p>{experience.position}</p>
          </div>
        </div>
      </div>

      <div className="col-span-1 mt-3 md:col-span-7 md:mt-0">
        <Separator />
        <p className="text-sm font-medium my-3 md:my-5">
          {experience.description}
        </p>
        <Separator />

        <ol className="space-y-14 mt-10 md:mt-14">
          {experience.tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </ol>
      </div>
    </div>
  )
}
