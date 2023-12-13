export type ContactItemData = {
  properties?: {
    Option: {
      title?: {
        plain_text?: string
      }[]
    }
    Value: {
      rich_text?: {
        plain_text?: string
        text?: {
          content: string
          link?: {
            url?: string
          }
        }
      }[]
    }
  }
}
