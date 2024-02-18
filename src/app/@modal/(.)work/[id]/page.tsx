import React from 'react'
import Modal from '@/components/modal/Modal'
import BlockContainer from '@/components/work/detail/BlockContainer'
import { ImageData, NotionBlockData } from '@/types/workDetail'
import Content from '@/components/work/detail/Content'
import ImageCarousel from '@/components/work/detail/ImageCarousel'
import styles from '@/styles/WorkDetail.module.css'
import MainContent from '@/components/work/detail/MainContent'
import { getNotionBlockChildren, getPageProperties } from '@/lib/api/workApi'

interface WorkDetailModalProps {
  params: {
    id: string
  }
}

export default async function WorkDetailModal({
  params,
}: WorkDetailModalProps) {
  const workDetailPageId = process.env[`NEXT_PUBLIC_WORK_${params.id}_ID`]
  if (typeof workDetailPageId !== 'string') return

  const workProperties = await getPageProperties(workDetailPageId)
  const workDetailBlocks = await getNotionBlockChildren(workDetailPageId)

  const [imageBlock, ...contentBlocks] = workDetailBlocks
  const imageBlockList = imageBlock?.id
    ? await getNotionBlockChildren(imageBlock.id)
    : []
  const filteredImageBlockList = (imageBlockList as NotionBlockData[]).filter(
    (block) => block.type === 'image',
  )

  return (
    <>
      {/* {!!params.id && ( */}
      <Modal>
        <div className={styles.container}>
          {/* 이미지 */}
          {/* {!!filteredImageBlockList?.length && (
          <div className={styles['carousel-container']}>
            <ImageCarousel blockList={filteredImageBlockList as ImageData[]} />
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
          {!!contentBlocks?.length && (
            <div className={styles['content-container']}>
              <MainContent properties={workProperties} />
              <div className={styles['sub-content-container']}>
                <Content blockList={contentBlocks as NotionBlockData[]} />
              </div>
            </div>
          )}
        </div>
      </Modal>
      {/* )} */}
    </>
  )
}
