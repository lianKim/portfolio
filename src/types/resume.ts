export interface ProcessItem {
  text: string
  href?: string
}

export interface Task {
  title: string
  problem?: string
  process: ProcessItem[]
  results?: string[]
  technologies?: string[]
  /** 연결된 프로젝트 기록(에세이)의 slug. 있으면 task 헤더에 링크로 노출 */
  projectSlug?: string
}

export interface Experience {
  company: string
  period: string
  position: string
  /** 직무 옆 비고 (ex. 'FE 1인 → 3인') */
  note?: string
  description: string
  tasks: Task[]
}

export interface Education {
  company: string
  period: string
  major: string
  description?: string
}

export interface SkillCategoryData {
  category: string
  skills: string[]
}

export interface Introduction {
  name: string
  position: string
  contact: {
    email: string
    phone: string
    github: string
  }
  description: {
    title: string
    content: string[]
  }
}

export interface ResumeData {
  introduction: Introduction
  experiences: Experience[]
  skills: SkillCategoryData[]
  education: Education[]
}
