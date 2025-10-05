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

export interface ResumeHeader {
  name: string
  introduction: string
}

export interface ResumeData {
  header: ResumeHeader
  experiences: Experience[]
}