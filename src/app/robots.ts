import { MetadataRoute } from 'next'
import { toAbsoluteUrl } from '@/lib/utils/format'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: toAbsoluteUrl('/sitemap.xml'),
  }
}
