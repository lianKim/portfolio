'use client'
import React from 'react'
import styles from '@/styles/Section.module.css'
import SectionTitle from './SectionTitle'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'

interface SectionContainerProps {
  children: React.ReactNode
  title?: string
}

const variants = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: { y: 0, opacity: 1 },
}

export default function SectionContainer({
  children,
  title,
}: SectionContainerProps) {
  const { targetRef: ref, isInView } = useIntersectionObserver()
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 160)

  return (
    <section className={styles.section} ref={ref}>
      {title && (
        <motion.h2 initial={false} style={{ y }}>
          <SectionTitle title={title} />
        </motion.h2>
      )}
      <motion.div
        className={styles['content-wrapper']}
        variants={variants}
        initial={false}
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.6,
          ease: [0.005, 0.61, 0.115, 0.86],
          delay: 0.1,
        }}
      >
        <div className={styles.content}>{children}</div>
      </motion.div>
    </section>
  )
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}
