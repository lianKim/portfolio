import React from 'react'
import Modal from '@/components/modal/Modal'
import { getNotionBlockChildren, getPageProperties } from '@/app/work/api'
import BlockContainer from '@/components/work/detail/BlockContainer'
import { Heading1Data, ImageData, NotionBlockData } from '@/types/workDetail'
import Content from '@/components/work/detail/Content'
import ImageCarousel from '@/components/work/detail/ImageCarousel'
import styles from '@/styles/WorkDetail.module.css'
import MainContent from '@/components/work/detail/MainContent'

interface WorkDetailModalProps {
  params: {
    id: string
  }
}

export default async function WorkDetailModal({
  params,
}: WorkDetailModalProps) {
  const workProperties = await getPageProperties(params.id)
  const workDetailBlocks = await getNotionBlockChildren(params.id)

  const [imageBlock, ...contentBlocks] = workDetailBlocks
  const imageBlockList = await getNotionBlockChildren(imageBlock.id)
  const filteredImageBlockList = (imageBlockList as NotionBlockData[]).filter(
    (block) => block.type === 'image',
  )

  return (
    <Modal>
      <div className={styles.container}>
        {/* 이미지 */}
        <div className={styles['carousel-container']}>
          <ImageCarousel blockList={filteredImageBlockList as ImageData[]} />
        </div>
        {/* 내용 */}
        <div className={styles['content-container']}>
          <MainContent properties={workProperties} />
          <Content blockList={contentBlocks as NotionBlockData[]} />
        </div>
      </div>
    </Modal>
  )
}
