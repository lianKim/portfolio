import { DateType, TextType, TitleType } from './works'

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
  properties: {
    Name: TitleType
    Period: DateType
    Note: TextType
  }
}
