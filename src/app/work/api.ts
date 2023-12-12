import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const WORK_DB_ID = process.env.NEXT_PUBLIC_WORK_DB_ID

const notion = new Client({
  auth: NOTION_API_KEY,
})

/**
 * Notion에서 작업물 목록 DB 가져오는 함수
 * @returns {Array} work list
 */
export const getWorkList = async () => {
  try {
    const response = await notion.databases.query({
      database_id: WORK_DB_ID,
      sorts: [
        {
          property: 'Order',
          direction: 'descending',
        },
      ],
    })

    return response?.results
  } catch (error) {
    throw new Error('Failed to get work list data')
  }
}

/**
 * Notion에서 작업물의 특정 properties만 가져오는 함수
 * @param pageId
 * @returns 각 항목 properties (Order, Period, Name, Stack)
 */
export const getPageProperties = async (pageId: string) => {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    })

    const { Order, Period, Name, Stack } = (response as any)?.properties
    return {
      Order,
      Period,
      Name,
      Stack,
    }
  } catch (error) {
    throw new Error('Failed to get page properties')
  }
}

/**
 * Notion에서 특정 block의 children blocks 가져오는 함수
 * @param blockId 작업물 개별 page id (= block id)
 * @returns {Array} work detail 페이지의 항목 block list
 */
export const getNotionBlockChildren = async (blockId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
    })

    return response?.results
  } catch (error) {
    throw new Error('Failed to get work detail data')
  }
}
