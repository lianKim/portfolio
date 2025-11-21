export interface Task {
  title: string
  problem?: string
  process: string[]
  results: string[]
  technologies?: string[]
}

export interface Experience {
  company: string
  period: string
  position: string
  description: string
  tasks: Task[]
}

export interface Education {
  company: string
  period: string
  major: string
  description?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Introduction {
  title: string
  subtitles: string[]
  description: string[]
}

export interface AboutData {
  introduction: Introduction
  experiences: Experience[]
  skills: SkillCategory[]
  education: Education[]
}
