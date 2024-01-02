'use client'
import {
  BulletedListItemData,
  Heading1Data,
  Heading2Data,
  Heading3Data,
  ImageData,
  NotionBlockData,
  ParagraphData,
} from '@/types/workDetail'
import React from 'react'
import styles from '@/styles/WorkDetail.module.css'
import Image from 'next/image'

interface BlockContainerProps {
  data: NotionBlockData
  children?: React.ReactNode
}

interface BlockProps<T> {
  data: T
  children?: React.ReactNode
}

// heading1 다음의 배열이 넘어옴
export default function BlockContainer({
  data,
  children,
}: BlockContainerProps) {
  if (data.type === 'heading_1') {
    return <Heading1 data={data as Heading1Data}>{children}</Heading1>
  }

  if (data.type === 'heading_2') {
    return <Heading2 data={data as Heading2Data}>{children}</Heading2>
  }

  if (data.type === 'heading_3') {
    return <Heading3 data={data as Heading3Data}>{children}</Heading3>
  }

  if (data.type === 'paragraph') {
    return <Paragraph data={data as ParagraphData}>{children}</Paragraph>
  }

  if (data.type === 'bulleted_list_item') {
    return (
      <BulletedListItem data={data as BulletedListItemData}>
        {children}
      </BulletedListItem>
    )
  }

  if (data.type === 'image') {
    return <ImageFile data={data as ImageData} />
  }

  return <></>
}

function Heading1({ data, children }: BlockProps<Heading1Data>) {
  const heading = data.heading_1.rich_text?.at(0)?.plain_text || ''

  return (
    <div
      className={`${styles['block-wrapper']} ${styles[heading.toLowerCase()]}`}
    >
      <h4 className={styles['block-title']}>{heading}</h4>
      {children}
    </div>
  )
}

function Heading2({ data, children }: BlockProps<Heading2Data>) {
  const heading = data.heading_2.rich_text?.at(0)?.plain_text || ''

  return (
    <div>
      <h5 className={styles['block-sub-title']}>{heading}</h5>
      {children}
    </div>
  )
}

// 외부 URL 필요할 경우 Heading3 link에 주소 값 있음
function Heading3({ data, children }: BlockProps<Heading3Data>) {
  const heading = data.heading_3.rich_text?.at(0)?.plain_text || ''
  const url = data.heading_3.rich_text?.at(0)?.text?.link?.url || ''

  return (
    <div className={styles.heading3}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h6 className={styles['block-link']}>{heading}</h6>
        </a>
      ) : (
        <h6 className={styles['block-sub-title']}>{heading}</h6>
      )}
      {children}
    </div>
  )
}

function Paragraph({ data, children }: BlockProps<ParagraphData>) {
  const textList =
    data.paragraph.rich_text?.map((text) => text.plain_text) || []

  return (
    <div className={`font-kor`}>
      {!!textList?.length && <div>{textList.join(' ')}</div>}
      {children}
    </div>
  )
}

function BulletedListItem({
  data,
  children,
}: BlockProps<BulletedListItemData>) {
  console.log(data)
  const textList = data.bulleted_list_item.rich_text?.map(
    (text) => text.plain_text,
  )

  return (
    <span className={`font-kor`}>
      {!!textList?.length && (
        <span className={`${styles['bulleted-item']}`}>
          <span className={styles['bullted-item-divider']}> | </span>
          {textList.join(' ')}
        </span>
      )}
      {children}
    </span>
  )
}

function ImageFile({ data }: BlockProps<ImageData>) {
  const imageUrl = data.image?.file?.url || ''

  return (
    <div className={styles['image-container']}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="project image"
          width={200}
          height={100}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}
