import SkillCategory from './SkillCategory'
import type { SkillCategory as SkillCategoryType } from '@/types/about'

interface SkillsSectionProps {
  skills: SkillCategoryType[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Skills</h2>
      <div className="space-y-6">
        {skills.map((skillCategory, index) => (
          <SkillCategory key={index} skillCategory={skillCategory} />
        ))}
      </div>
    </div>
  )
}
