'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import styles from '@/styles/HorizontalScrollSlider.module.css'
import Image from 'next/image'
import { ImageData, PagePropertiesData } from '@/types/workDetail'
import {
  BLUR_DATA_URL_BASE64,
  getNotionUrlNonExp,
} from '@/lib/utils/handleImage'

interface HorizontalScrollSliderProps {
  imageBlockList: ImageData[]
  properties: PagePropertiesData
}

const CONTAINER_POS_TOP = 100
const MODAL_LEFT_RIGHT_PADDING = 80
const OFFSET_FOR_DELAY = 320

export default React.memo(function HorizontalScrollSlider({
  imageBlockList,
  properties,
}: HorizontalScrollSliderProps) {
  const { 'Design Type': DesignType } = properties
  const isMoibleFirstDesign = DesignType?.select?.name.startsWith('Mobile')

  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const imageUrlList = useMemo(
    () =>
      imageBlockList
        .filter(
          (block) =>
            block.type === 'image' && !!(block as ImageData).image?.file?.url,
        )

        .map((block) => {
          const imageBlockId = block.id
          const imageUrl = block.image?.file?.url
          const url = getNotionUrlNonExp(imageUrl, imageBlockId)

          return url
        }),
    [imageBlockList],
  )

  useEffect(() => {
    const wrapper = wrapperRef?.current
    const container = containerRef?.current
    const content = contentRef?.current
    if (!wrapper || !container || !content) return

    const containerVisibleHeight = container.scrollHeight - container.offsetTop
    const contentInvisibleWidth = content.scrollWidth - content.offsetWidth
    const wrapperHeight =
      contentInvisibleWidth +
      containerVisibleHeight +
      CONTAINER_POS_TOP -
      MODAL_LEFT_RIGHT_PADDING
    /**
     * wrapper height 값 이미지 개수에 따라 동적으로 할당하여
     * 수평 스크롤바 길이만큼 수직 스크롤바 길이 추가
     */
    wrapper.style.height = `${wrapperHeight + OFFSET_FOR_DELAY}px`

    const handleScroll = () => {
      // offsetParent(=wrapper) 기준 아래쪽으로 얼마나 떨어져 있는지 (px)
      const nextOffset = container.offsetTop - OFFSET_FOR_DELAY
      container.scrollLeft = nextOffset > 0 ? nextOffset : 0
    }

    /**
     * 세로 스크롤바가 있는 Modal container
     * 없으면 window에 wheel event 등록
     */
    const parentElem = wrapper.offsetParent
    if (!parentElem) {
      window.addEventListener('wheel', handleScroll, { passive: true })
      return
    }

    parentElem.addEventListener('scroll', handleScroll)

    return () => {
      if (!parentElem) {
        window.removeEventListener('wheel', handleScroll)
        return
      }

      parentElem.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          {imageUrlList.map((url) => (
            <div className={styles.item} key={url}>
              <Image
                src={url}
                alt="project image"
                priority
                width={isMoibleFirstDesign ? 400 : 1280}
                height={isMoibleFirstDesign ? 800 : 740}
                style={{
                  width: 'auto',
                  height: '100%',
                }}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL_BASE64}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
