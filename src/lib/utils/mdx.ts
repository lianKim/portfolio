import type { ParsedPost, PostFrontmatter } from '@/types/blog'
import { ReactNode, isValidElement } from 'react'

import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import { mdxComponents } from '@/components/blog/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

export async function parseMarkdownFile(filePath: string): Promise<ParsedPost> {
  const source = fs.readFileSync(filePath, 'utf-8')

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [
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
  }
}

/**
 * 텍스트에서 heading ID를 생성합니다. (한글 지원)
 * @param text - 변환할 텍스트
 * @returns kebab-case 형식의 ID
 */
export function generateHeadingId(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
}

/**
 * CodeBlock children에서 코드 텍스트를 추출합니다.
 * @param children - React children
 * @returns 추출된 코드 텍스트
 */
export function extractCodeText(children: ReactNode): string {
  if (typeof children === 'string') return children

  if (isValidElement(children) && typeof children.props.children === 'string') {
    return children.props.children
  }

  return ''
}
