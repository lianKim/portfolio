import React from 'react'
import Modal from '@/components/modal/Modal'
import BlockContainer from '@/components/work/detail/BlockContainer'
import { ImageData, NotionBlockData } from '@/types/workDetail'
import Content from '@/components/work/detail/Content'
import styles from '@/styles/WorkDetail.module.css'
import MainContent from '@/components/work/detail/MainContent'
import { getNotionBlockChildren, getPageProperties } from '@/lib/api/workApi'
import dynamic from 'next/dynamic'
import { getPeriodOfWork } from '@/lib/utils/handleString'

const ImageCarousel = dynamic(
  async () => await import('@/components/work/detail/ImageCarousel'),
  {
    ssr: false,
  },
)

interface WorkDetailModalProps {
  pageId: string
}

export default async function WorkDetailModal({
  pageId,
}: WorkDetailModalProps) {
  const workProperties = await getPageProperties(pageId)
  const workDetailBlocks = await getNotionBlockChildren(pageId)

  const [imageBlock, wilBlock, ...contentBlocks] = workDetailBlocks

  const imageBlockList = imageBlock?.id
    ? await getNotionBlockChildren(imageBlock.id)
    : []
  const filteredImageBlockList = (imageBlockList as NotionBlockData[]).filter(
    (block) => block.type === 'image',
  )

  return (
    <Modal>
      <div className={styles.container}>
        <MainContent properties={workProperties} />
        {/* 이미지 */}
        {/* {!!filteredImageBlockList?.length && (
            <div className={styles['carousel-container']}>
              <ImageCarousel
                blockList={filteredImageBlockList as ImageData[]}
              />
            </div>
          )} */}
        {/* 임시 이미지 */}
        {!!filteredImageBlockList?.length &&
          filteredImageBlockList.map((data) => (
            <div className={styles['image-container']} key={data.id}>
              <BlockContainer data={data as NotionBlockData} />
            </div>
          ))}
        {/* 내용 */}
        <div className={styles['content-container']}>
          <div className={styles['sub-content-container']}>
            <Content blockList={contentBlocks as NotionBlockData[]} />
          </div>
          <div className={styles['wil-container']}>
            <Content blockList={[wilBlock] as NotionBlockData[]} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
