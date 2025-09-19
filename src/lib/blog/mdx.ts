import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import matter from 'gray-matter'
import { mdxComponents } from '@/components/blog/mdx'
import path from 'path'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
}

export interface ParsedPost {
  frontmatter: PostFrontmatter
  content: React.ReactElement
}

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

// 테스트용 함수
export async function getTestPost(): Promise<ParsedPost> {
  const testPath = path.join(process.cwd(), 'public/blog/posts/test.md')
  return await parseMarkdownFile(testPath)
}
