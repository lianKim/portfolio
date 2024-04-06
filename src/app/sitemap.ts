import { getProjectList } from '@/lib/api/projectApi'
import { getNumberData } from '@/lib/utils/handleNotionData'
import { ProjectItemData } from '@/types/projects'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectList()
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    ...(projects as ProjectItemData[])?.map((project) => {
      const { properties, last_edited_time } = project
      const projectId = getNumberData(properties.Order)

      return {
        url: `${BASE_URL}/project/${projectId}`,
        lastModified: new Date(last_edited_time),
      }
    }),
  ]
}
