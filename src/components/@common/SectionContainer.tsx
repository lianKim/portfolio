'use client'
import React, { useRef } from 'react'
import styles from '@/styles/Section.module.css'
import SectionTitle from './SectionTitle'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface SectionContainerProps {
  children: React.ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className={styles.section}>
      <div ref={ref} className={styles['content-wrapper']}>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  )
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}
