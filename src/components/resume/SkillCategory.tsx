import { Badge } from '../ui/badge'
import type { SkillCategory as SkillCategoryType } from '@/types/resume'

interface SkillCategoryProps {
  skillCategory: SkillCategoryType
}

export default function SkillCategory({ skillCategory }: SkillCategoryProps) {
  return (
    <div className="gap-4">
      <h3 className="text-sm text-muted-foreground mb-3">
        {skillCategory.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skillCategory.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="px-2 py-1 text-sm">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}
