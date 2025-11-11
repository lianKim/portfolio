import { Badge } from '@/components/ui/badge'
import type { Task } from '@/types/about'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <li className="space-y-8 leading-relaxed">
      {/* 주요 업무 타이틀 */}
      <h4 className="text-accent-foreground">{task.title}</h4>

      {/* 문제 상황 */}
      {task.problem && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">문제 상황</p>
          <p>{task.problem}</p>
        </div>
      )}

      {/* 해결 과정 */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">해결 과정</p>
        <ul className="space-y-2 list-disc pl-4">
          {task.process.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 결과 */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">결과</p>
        <ul className="space-y-2 list-disc pl-4">
          {task.results.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 기술 스택 */}
      {task.technologies && task.technologies.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">기술 스택</p>
          <div className="flex flex-wrap gap-2">
            {task.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
