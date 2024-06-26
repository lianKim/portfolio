import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const SKILL_DB_ID = process.env.NEXT_PUBLIC_SKILL_DB_ID
const TIMELINE_DB_ID = process.env.NEXT_PUBLIC_TIMELINE_DB_ID
const TIMELINE_LIST_QUERY_OPTIONS = {
  sorts: [
    {
      property: 'Period',
      direction: 'descending',
    },
  ],
}
const SKILL_SORT_TYPE = {
  sorts: [
    {
      property: 'Order',
      direction: 'ascending',
    },
  ],
}

const SKILL_TYPE_FILTER_LIST = [
  {
    filter: {
      property: 'Type',
      select: {
        equals: 'FrontEnd Development',
      },
    },
  },
  {
    filter: {
      property: 'Type',
      select: {
        equals: 'Third-Party Libraries',
      },
    },
  },
  {
    filter: {
      property: 'Type',
      select: {
        equals: 'Web Deployment',
      },
    },
  },
  {
    filter: {
      property: 'Type',
      select: {
        equals: 'Team Collaboration',
      },
    },
  },
]

/**
 * Notion에서 Skill 목록 타입별로 묶어 가져오는 함수
 * @returns skill list
 */

export const getSkillLists = async () => {
  try {
    const resList = SKILL_TYPE_FILTER_LIST.map(async (filter) => {
      return fetch(`https://api.notion.com/v1/databases/${SKILL_DB_ID}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...filter, ...SKILL_SORT_TYPE }),
        // 하루
        next: { revalidate: 86400 },
        mode: 'cors',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
        .then((res) => res.json())
        .then((data) => data?.results)
    })

    const results = await Promise.all(resList)

    return results
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get skill list data')
  }
}

/**
 * Notion에서 Timeline 목록 가져오는 함수
 * @returns timeline list
 */
export const getTimelineList = async () => {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${TIMELINE_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(TIMELINE_LIST_QUERY_OPTIONS),
        next: { revalidate: false },
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
    throw new Error('Failed to get timeline list data')
  }
}
