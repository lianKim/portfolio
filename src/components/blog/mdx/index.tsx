import { OrderedList, UnorderedList } from './List'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

import { Blockquote } from './Blockquote'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Heading } from './Heading'
import { Image } from './Image'
import { InlineCode } from './InlineCode'
import { Link } from './Link'
import { Paragraph } from './Paragraph'
import { Separator } from './Separator'
import { Strong } from './Strong'

// MDX 컴포넌트 맵핑
export const mdxComponents = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  pre: (props: any) => <CodeBlock {...props} />,
  code: (props: any) => <InlineCode {...props} />,
  img: (props: any) => <Image alt="" {...props} />,
  a: (props: any) => <Link {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  Callout: (props: any) => <Callout {...props} />,
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
  strong: (props: any) => <Strong {...props} />,
}
