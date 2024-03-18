// Skills
export type SkillItemData = {
  properties?: {
    Name: {
      title?: {
        plain_text?: string
      }[]
    }
    Type: {
      select?: {
        name?: string
      }
    }
  }
}

// Education
export type EducationItemData = {
  properties?: {
    Name: {
      title?: {
        plain_text?: string
      }[]
    }
    Period: {
      date?: {
        start?: string
        end?: string
      }
    }
  }
}
