import { MY_NOTION_DOMAIN } from '../api/workApi'

export const BLUR_DATA_URL_BASE64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8+58BAzAOZUEATNMSo0SmzPsAAAAASUVORK5CYII='

// Notion Image URL 만료시간 없는 외부 URL로 변경
export const getNotionUrlNonExp = (
  imageUrl?: string,
  id?: string,
  width = '640',
) => {
  if (!id || !imageUrl) return ''

  return `${MY_NOTION_DOMAIN}/image/${encodeURIComponent(imageUrl)}?table=block&id=${id}&cache=v2&width=${width}`
}
