import {
  DateType,
  FileType,
  FilesAndMediaType,
  ImageData,
  MultiSelectType,
  NumberType,
  SelectType,
  TextType,
  TitleType,
  UrlType,
} from '@/types/works'
import { getPeriodOfWork } from './handleString'
import { MY_NOTION_DOMAIN } from '../api/workApi'
import { getNotionUrlNonExp } from './handleImage'

export const getTitleData = (block?: TitleType) =>
  block?.title.reduce((prev, curr) => prev + curr.plain_text, '') || ''

export const getTextData = (block?: TextType) =>
  block?.rich_text.reduce((prev, curr) => prev + curr.plain_text, '') || ''

export const getBoldTextData = (block?: TextType) =>
  block?.rich_text.map((text) => ({
    content: text.plain_text,
    isBold: text.annotations?.bold === true,
  })) || []

export const getLinkedTextUrl = (block?: TextType) => {
  const link = block?.rich_text.at(0)?.text.link?.url || ''
  const url = !link || link.startsWith('http') ? link : MY_NOTION_DOMAIN + link

  return url
}
export const getNumberData = (block?: NumberType) => block?.number || 0

export const getPeriodData = (block?: DateType) => {
  if (!block) return

  return getPeriodOfWork(block.date.start, block.date.end)
}

export const getDateData = (block?: DateType) => {
  return [block?.date?.start || '', block?.date?.end || '']
}

export const getSelectData = (block?: SelectType) => block?.select.name || ''

export const getMultiSelectDataList = (block?: MultiSelectType) =>
  block?.multi_select.map((item) => item.name) || []

export const getUrlData = (block?: UrlType) => block?.url || ''

export const getFileDataList = (block?: FilesAndMediaType) =>
  block?.files.map((item) => item.file?.url || item.external?.url) || []

export const getImageData = (block?: FileType) => block?.file?.url || ''

export const getConvertedImages = (blockList?: ImageData[], width?: string) =>
  blockList
    ?.filter((block) => block.type === 'image' && !!block.image?.file?.url)
    .map((block) => {
      const imageBlockId = block.id
      const imageUrl = block.image?.file?.url
      const url = getNotionUrlNonExp(imageUrl, imageBlockId, width)

      return url
    }) || []

// Text Style (ex. color, bold, ...)
export const getAnnotations = (block?: TextType) =>
  block?.rich_text.at(0)?.annotations
