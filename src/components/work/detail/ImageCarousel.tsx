'use client'
import { ImageData, NotionBlockData } from '@/types/workDetail'
import React from 'react'
import BlockContainer from './BlockContainer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/styles/carousel.css'

interface ImageCarouselProps {
  blockList: ImageData[]
}

interface CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ImageCarousel({ blockList }: ImageCarouselProps) {
  const carouselSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  console.log(blockList)

  return (
    <Slider {...carouselSetting}>
      {blockList.map((data) => (
        <BlockContainer data={data as NotionBlockData} key={data.id} />
      ))}
    </Slider>
  )
}

function CustomPrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="custom-arrow btn-prev" onClick={onClick} />
  )
}

function CustomNextArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="custom-arrow btn-next" onClick={onClick} />
  )
}
