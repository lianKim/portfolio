import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY
const CONTACT_DB_ID = process.env.NEXT_PUBLIC_CONTACT_DB_ID
const SKILL_DB_ID = process.env.NEXT_PUBLIC_SKILL_DB_ID
const EDUCATION_DB_ID = process.env.NEXT_PUBLIC_EDUCATION_DB_ID

const notion = new Client({
  auth: NOTION_API_KEY,
})

export const getContactList = async () => {
  try {
    const response = await notion.databases.query({
      database_id: CONTACT_DB_ID,
    })

    return response?.results
  } catch (error) {
    throw new Error('Failed to get contact list')
  }
}

export const getSkillList = async () => {
  try {
    const response = await notion.databases.query({
      database_id: SKILL_DB_ID,
    })

    return response?.results
  } catch (error) {
    throw new Error('Failed to get skill list')
  }
}

export const getEducationList = async () => {
  try {
    const response = await notion.databases.query({
      database_id: EDUCATION_DB_ID,
      sorts: [
        {
          property: 'Period',
          direction: 'descending',
        },
      ],
    })

    return response?.results
  } catch (error) {
    throw new Error('Failed to get education list')
  }
}
