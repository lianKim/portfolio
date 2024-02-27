import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const SKILL_DB_ID = process.env.NEXT_PUBLIC_SKILL_DB_ID
const EDUCATION_DB_ID = process.env.NEXT_PUBLIC_EDUCATION_DB_ID
const EDUCATION_LIST_QUERY_OPTIONS = {
  sorts: [
    {
      property: 'Period',
      direction: 'descending',
    },
  ],
}

/**
 * Notion에서 Skill 목록 가져오는 함수
 * @returns skill list
 */
export const getSkillList = async () => {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${SKILL_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        // 하루
        // next: { revalidate: 86400 },
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

    return data?.results
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get skill list data')
  }
}

/**
 * Notion에서 Education 목록 가져오는 함수
 * @returns education list
 */
export const getEducationList = async () => {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${EDUCATION_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(EDUCATION_LIST_QUERY_OPTIONS),
        // next: { revalidate: false },
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

    return data?.results
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get education list data')
  }
}
