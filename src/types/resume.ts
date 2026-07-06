export interface ProcessItem {
  text: string
  href?: string
}

export interface Task {
  title: string
  problem?: string
  process: ProcessItem[]
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
  skills: SkillCategory[]
  education: Education[]
}
