import { DateType, TextType, TitleType } from './projects'

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

// Timeline
export type TimelineItemData = {
  properties: {
    Name: TitleType
    Period: DateType
    Note: TextType
  }
}
