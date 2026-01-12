import type { ParsedPost, PostFrontmatter } from '@/types/blog'

import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import { mdxComponents } from '@/components/blog/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import getReadingTime from 'reading-time'

export async function parseMarkdownFile(filePath: string): Promise<ParsedPost> {
  const source = fs.readFileSync(filePath, 'utf-8')

  // 읽기 시간 계산
  const { minutes } = getReadingTime(source)
  const readingTime = Math.ceil(minutes)

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [
          rehypeUnwrapImages, // 이미지를 p 태그에서 제거
          [
            rehypePrettyCode,
            {
              theme: 'one-light',
              keepBackground: false,
            },
          ],
          rehypeSlug,
        ],
      },
    },
  })

  return {
    frontmatter,
    content,
    readingTime,
  }
}
