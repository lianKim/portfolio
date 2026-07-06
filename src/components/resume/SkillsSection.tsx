import SkillCategory from './SkillCategory'
import type { SkillCategory as SkillCategoryType } from '@/types/resume'

interface SkillsSectionProps {
  skills: SkillCategoryType[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="section-grid">
      <h2 className="section-left text-muted-foreground">/ Skills</h2>
      <div className="section-right section-content space-y-8">
        {skills.map((skillCategory) => (
          <SkillCategory
            key={skillCategory.category}
            skillCategory={skillCategory}
          />
        ))}
      </div>
    </div>
  )
}
