import { Badge } from '@/components/ui/badge'
import type { Task } from '@/types/resume'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <li className="space-y-2">
      <h4 className="font-bold">{task.title}</h4>
      <ul className="space-y-1 list-disc pl-4">
        {task.details.map((detail, index) => (
          <li key={index}>
            <div>{detail.content}</div>
            {detail.subContent && (
              <ul className="space-y-1 list-[circle] pl-6 mt-2">
                {detail.subContent.map((subItem, subIndex) => (
                  <li key={subIndex} className="text-sm text-muted-foreground">
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-3">
        {task.technologies.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
    </li>
  )
}