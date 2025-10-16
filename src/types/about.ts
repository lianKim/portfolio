export interface TaskDetail {
  content: string
  subContent?: string[]
}

export interface Task {
  title: string
  details: TaskDetail[]
  technologies: string[]
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
  description: string
}

export interface AboutData {
  introduction: Introduction
  experiences: Experience[]
  skills: SkillCategory[]
  education: Education[]
}
