import SkillCategory from './SkillCategory'
import type { SkillCategoryData } from '@/types/resume'

interface SkillsSectionProps {
  skills: SkillCategoryData[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="section-grid">
      <h2 className="section-left section-label">/ Skills</h2>
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
