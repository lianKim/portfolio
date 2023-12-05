import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const WORK_DB_ID = process.env.NEXT_PUBLIC_WORK_DB_ID

const notion = new Client({
  auth: NOTION_API_KEY,
})

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
