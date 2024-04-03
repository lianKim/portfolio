export type TitleType = {
  title: {
    plain_text: string
  }[]
}

export type TextType = {
  rich_text: {
    plain_text: string
    text: { link?: { url?: string } }
    annotations: Annotations
  }[]
}

export type NumberType = {
  number?: number
}

export type DateType = {
  date: {
    start: string
    end?: string
  }
}

export type SelectType = {
  select: {
    name?: string
  }
}

export type MultiSelectType = {
  multi_select: {
    name: string
  }[]
}

export type UrlType = {
  url?: string
}

export type FileType = {
  file?: UrlType
}

export type FilesAndMediaType = {
  id: string
  files: {
    file?: UrlType
    external?: UrlType
  }[]
}

export type ProjectItemPropData = {
  Order?: NumberType
  Period?: DateType
  Name?: TitleType
  Description?: TextType
  Stack?: MultiSelectType
  'Design Type'?: SelectType
  Member?: TextType
  Website?: UrlType
  GitHub?: UrlType
  Notion?: UrlType
  Figma?: UrlType
  Thumbnail?: FilesAndMediaType
}

export type NotionBlockData =
  | Heading1Data
  | Heading2Data
  | Heading3Data
  | ParagraphData
  | BulletedListItemData
  | ImageData

export type Heading1Data = BlockCommonData & {
  heading_1: TextType
}

export type Heading2Data = BlockCommonData & {
  heading_2: TextType
}

export type Heading3Data = BlockCommonData & {
  heading_3: TextType
}

export type ParagraphData = BlockCommonData & {
  paragraph: TextType
}

export type BulletedListItemData = BlockCommonData & {
  bulleted_list_item: TextType
}

export type ImageData = BlockCommonData & {
  image: FileType
}

type BlockCommonData = {
  id: string
  type: string
  has_children: boolean
}

type Annotations = {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}
