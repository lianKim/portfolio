import { compileMDX } from 'next-mdx-remote/rsc'
import fs from 'fs'
import { mdxComponents } from '@/components/blog/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import type { PostFrontmatter, ParsedPost } from '@/types/blog'

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
