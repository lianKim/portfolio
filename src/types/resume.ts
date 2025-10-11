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

export interface ResumeHeader {
  name: string
  introduction: string
}

export interface ResumeData {
  header: ResumeHeader
  experiences: Experience[]
  education: Education[]
  skills: SkillCategory[]
}
