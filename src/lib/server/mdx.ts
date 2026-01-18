import type { ParsedPost, PostFrontmatter, TocItem } from '@/types/blog'

import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import { mdxComponents } from '@/components/blog/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import getReadingTime from 'reading-time'

/**
 * 마크다운 소스에서 heading을 추출하여 목차 생성
 */
function extractToc(source: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TocItem[] = []

  let match
  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // rehype-slug와 동일한 방식으로 id 생성
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')

    toc.push({ id, text, level })
  }

  return toc
}

export async function parseMarkdownFile(filePath: string): Promise<ParsedPost> {
  // 파일 읽기
  let source: string
  try {
    source = fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`마크다운 파일을 읽을 수 없습니다: ${filePath}\n${message}`)
  }

  // 읽기 시간 계산
  const { minutes } = getReadingTime(source)
  const readingTime = Math.ceil(minutes)

  // 목차 추출
  const toc = extractToc(source)

  // MDX 컴파일
  try {
    const { content, frontmatter } = await compileMDX<PostFrontmatter>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [
            rehypeUnwrapImages,
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
      toc,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`MDX 컴파일 실패: ${filePath}\n${message}`)
  }
}
