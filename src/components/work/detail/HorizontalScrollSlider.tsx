'use client'
import React, { useEffect, useRef } from 'react'
import styles from '@/styles/HorizontalScrollSlider.module.css'
import Image from 'next/image'
import { ImageData, WorkItemPropData } from '@/types/works'
import { BLUR_DATA_URL_BASE64 } from '@/lib/utils/handleImage'
import {
  getConvertedImages,
  getSelectData,
  getTitleData,
} from '@/lib/utils/handleNotionData'

interface HorizontalScrollSliderProps {
  imageBlockList: ImageData[]
  properties: WorkItemPropData
}

const CONTAINER_POS_TOP = 100
const MODAL_LEFT_RIGHT_PADDING = 80
const OFFSET_FOR_DELAY = 320

export default React.memo(function HorizontalScrollSlider({
  imageBlockList,
  properties,
}: HorizontalScrollSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { 'Design Type': DesignType, Name } = properties
  const title = getTitleData(Name)
  const isMoibleFirstDesign = getSelectData(DesignType)?.startsWith('Mobile')
  const width = isMoibleFirstDesign ? '640' : '1920'
  const imageUrlList = getConvertedImages(imageBlockList, width)

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
          {imageUrlList.map((url, idx) => {
            if (!url) return
            return (
              <div className={styles.item} key={url}>
                <Image
                  src={url}
                  alt={`${title} image${idx + 1}`}
                  width={isMoibleFirstDesign ? 640 : 1280}
                  height={isMoibleFirstDesign ? 1280 : 740}
                  style={{
                    width: 'auto',
                    height: '100%',
                  }}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL_BASE64}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
