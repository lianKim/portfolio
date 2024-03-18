export type DesignType = {
  select: {
    name: string
  }
}

export type WorkItemPropData = {
  Order?: {
    number?: number
  }
  Period?: {
    date?: {
      start?: string
      end?: string
    }
  }
  Name?: {
    title?: {
      plain_text?: string
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
  'Design Type'?: {
    select: {
      name: string
    }
  }
  Member?: {
    rich_text?: { plain_text?: string }[]
  }
  Website?: {
    url?: string
  }
  GitHub?: {
    url?: string
  }
  Notion?: {
    url?: string
  }
  Figma?: {
    url?: string
  }
  Thumbnail?: {
    files?: {
      file?: {
        url?: string
      }
    }[]
  }
}

export type NotionBlockData =
  | Heading1Data
  | Heading2Data
  | Heading3Data
  | ParagraphData
  | BulletedListItemData
  | ImageData

export type Heading1Data = BlockCommonData & {
  heading_1: RichText
}

export type Heading2Data = BlockCommonData & {
  heading_2: RichText
}

export type Heading3Data = BlockCommonData & {
  heading_3: LinkedRichText
}

export type ParagraphData = BlockCommonData & {
  paragraph: RichText
}

export type BulletedListItemData = BlockCommonData & {
  bulleted_list_item: RichText
}

export type ImageData = BlockCommonData & {
  image: {
    file: {
      url: string
    }
  }
}

type BlockCommonData = {
  id: string
  type: string
  has_children: boolean
}

type RichText = {
  rich_text?: { plain_text?: string }[]
}

type LinkedRichText = {
  rich_text?: { plain_text?: string; text?: { link?: { url?: string } } }[]
}
