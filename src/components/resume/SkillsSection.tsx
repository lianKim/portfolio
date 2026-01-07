import SkillCategory from './SkillCategory'
import type { SkillCategory as SkillCategoryType } from '@/types/resume'

interface SkillsSectionProps {
  skills: SkillCategoryType[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
      <h2 className="text-3xl font-thin col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)]">
        Skills
      </h2>
      <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-8">
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
