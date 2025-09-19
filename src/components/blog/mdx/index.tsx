import { Heading } from './Heading'
import { CodeBlock } from './CodeBlock'
import { Image } from './Image'
import { Link } from './Link'
import { Callout } from './Callout'
import { Blockquote } from './Blockquote'
import { UnorderedList, OrderedList } from './List'
import { Separator } from './Separator'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './Table'
import { Paragraph } from './Paragraph'

// MDX 컴포넌트 맵핑
export const mdxComponents = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  pre: (props: any) => <CodeBlock {...props} />,
  img: (props: any) => <Image {...props} />,
  a: (props: any) => <Link {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  callout: (props: any) => <Callout {...props} />,
  ul: (props: any) => <UnorderedList {...props} />,
  ol: (props: any) => <OrderedList {...props} />,
  hr: (props: any) => <Separator {...props} />,
  table: (props: any) => <Table {...props} />,
  thead: (props: any) => <TableHeader {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  td: (props: any) => <TableCell {...props} />,
  th: (props: any) => <TableHead {...props} />,
  p: (props: any) => <Paragraph {...props} />,
}