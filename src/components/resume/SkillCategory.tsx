import { Badge } from '../ui/badge'
import type { SkillCategoryData } from '@/types/resume'

interface SkillCategoryProps {
  skillCategory: SkillCategoryData
}

export default function SkillCategory({ skillCategory }: SkillCategoryProps) {
  return (
    <div>
      <h3 className="text-xs text-muted-foreground mb-3">
        {skillCategory.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skillCategory.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="px-2 py-1">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}
