export type WorkItemData = {
  Order?: {
    number: number
  }
  Period?: {
    date: {
      start: string
      end: string
    }
  }
  Name?: {
    title: {
      plain_text: string
    }[]
  }
  Description?: {
    rich_text: { plain_text: string }[]
  }
  Stack?: {
    multi_select: {
      name: string
    }[]
  }
  Thumbnail?: {
    files: {
      file: {
        url: string
      }
    }[]
  }
}
