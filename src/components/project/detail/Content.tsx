import { NotionBlockData } from '@/types/projects'
import React from 'react'
import BlockContainer from './BlockContainer'
import { getNotionBlockChildren } from '@/lib/api/projectApi'

interface ContentProps {
  blockList: NotionBlockData[]
}

export default async function Content({ blockList }: ContentProps) {
  return (
    <>
      {blockList.map(async (data) => {
        if (!data?.id) return

        if (!data.has_children) {
          return <BlockContainer data={data} key={data.id} />
        }

        const nextBlockList = await getNotionBlockChildren(data.id)
        return (
          <BlockContainer data={data} key={data.id}>
            <Content blockList={nextBlockList as NotionBlockData[]} />
          </BlockContainer>
        )
      })}
    </>
  )
}
