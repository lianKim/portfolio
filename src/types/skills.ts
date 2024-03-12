export type SkillItemData = {
  properties?: {
    Name: {
      title?: {
        plain_text?: string
      }[]
    }
    Type?: {
      select: {
        name: string
      }
    }
  }
}
