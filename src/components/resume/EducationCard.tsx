import type { Education } from '@/types/resume'

interface EducationCardProps {
  education: Education
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div>
      <h3 className="text-foreground mb-1">{education.company}</h3>
      <div className="flex items-center gap-2 text-sm leading-tight text-muted-foreground">
        <p>{education.period}</p>
        <span>・</span>
        <p>{education.major}</p>
      </div>
      {education.description && (
        <p className="mt-2 text-muted-foreground">{education.description}</p>
      )}
    </div>
  )
}
