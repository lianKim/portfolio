import type { Task } from '@/types/resume'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/server/projects'
import { parseRichText } from '@/lib/utils/richText'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  // 연결된 프로젝트 기록(에세이)이 있으면 제목 아래 링크로 노출
  const project = task.projectSlug
    ? getProjectBySlug(task.projectSlug)
    : undefined

  return (
    <li className="space-y-8 leading-relaxed">
      {/* 주요 업무 타이틀 + 프로젝트 기록 링크(리더 룰) */}
      <div className="flex items-center gap-3.5">
        <h4 className="font-semibold text-subhead">{task.title}</h4>
        {project && (
          <>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex shrink-0 items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              설계 기록
              <svg
                viewBox="0 0 12 12"
                className="size-3 text-accent-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.6 8.4 8.4 3.6M4.6 3.6H8.4V7.4" />
              </svg>
            </Link>
          </>
        )}
      </div>

      {/* 문제 상황 */}
      {task.problem && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">문제 상황</p>
          <p>{parseRichText(task.problem)}</p>
        </div>
      )}

      {/* 해결 과정 */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">해결 과정</p>
        <ul className="space-y-2 list-disc pl-4">
          {task.process.map((item, index) => (
            <li key={index}>
              {/* {item.href ? (
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {parseRichText(item.text)}
                </Link>
              ) : (
                parseRichText(item.text)
              )} */}
              {parseRichText(item.text)}
            </li>
          ))}
        </ul>
      </div>

      {/* 결과 */}
      {task.results && task.results.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">결과</p>
          <ul className="space-y-2 list-disc pl-4">
            {task.results.map((item, index) => (
              <li key={index}>{parseRichText(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 기술 스택 */}
      {task.technologies && task.technologies.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">기술 스택</p>
          <div className="flex flex-wrap gap-2">
            {task.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
