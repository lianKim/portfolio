import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export const MY_NOTION_DOMAIN = process.env.NEXT_PUBLIC_NOTION_PAGE_BASE_URL
const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const PROJECT_DB_ID = process.env.NEXT_PUBLIC_PROJECT_DB_ID
const PROJECT_LIST_QUERY_OPTIONS = {
  sorts: [
    {
      property: 'Order',
      direction: 'descending',
    },
  ],
}

/**
 * Notion에서 작업물 목록 DB 가져오는 함수
 * @returns project list
 */
export const getProjectList = async () => {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${PROJECT_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(PROJECT_LIST_QUERY_OPTIONS),
        next: { revalidate: 3500 },
        mode: 'cors',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      },
    )

    if (!res?.ok) {
      throw new Error(
        `Failed to fetch data. Error: ${res.status} - ${await res.text()}`,
      )
    }

    const data: QueryDatabaseResponse = await res.json()
    const result: unknown = data?.results

    return result
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get project list data')
  }
}

/**
 * Notion에서 작업물의 특정 properties만 가져오는 함수
 * @param pageId
 * @returns 각 항목 properties (Order, Period, Name, Stack)
 */
export const getPageProperties = async (pageId: string) => {
  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
      next: { revalidate: 3500 },
    }).then((r) => r.json())

    return res?.properties
  } catch (err) {
    console.error(err)
    throw new Error('Failed to get page properties')
  }
}

/**
 * Notion에서 특정 block의 children blocks 가져오는 함수
 * @param blockId 작업물 개별 page id (= block id)
 * @returns project detail 페이지의 항목 block list
 */
export const getNotionBlockChildren = async (blockId: string) => {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
        next: { revalidate: 3500 },
      },
    ).then((r) => r.json())

    return res?.results
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get notion block children')
  }
}
