import type { Education } from '@/types/about'

interface EducationCardProps {
  education: Education
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="gap-4">
      <h3 className="font-bold text-foreground mb-1">{education.company}</h3>
      <div className="flex items-center gap-2 text-sm leading-tight">
        <p className="text-muted-foreground text-sm">{education.period}</p>
        <span className="text-muted-foreground text-sm">|</span>
        <p className="text-muted-foreground text-sm">{education.major}</p>
      </div>
      {education.description && (
        <p className="mt-2 text-muted-foreground">{education.description}</p>
      )}
    </div>
  )
}
