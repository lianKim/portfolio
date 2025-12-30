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

export interface DescriptionItem {
  title: string
  content: string
}

export interface Introduction {
  name: string
  position: string
  contact: {
    email: string
    phone: string
    github: string
  }
  description: DescriptionItem[]
}

export interface AboutData {
  introduction: Introduction
  experiences: Experience[]
  skills: SkillCategory[]
  education: Education[]
}
