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
