'use client'
import React, { useRef } from 'react'
import styles from '@/styles/Section.module.css'
import SectionTitle from './SectionTitle'
import {
  useScroll,
  useTransform,
  MotionValue,
  LazyMotion,
  domAnimation,
  m,
} from 'framer-motion'
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
  const ref = useRef(null)

  const { targetRef, isInView } = useIntersectionObserver({
    threshold: 0.1,
  })
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 160)

  return (
    <LazyMotion features={domAnimation}>
      <section className={styles.section} ref={targetRef}>
        {title && (
          <m.h2
            initial={false}
            style={{ y }}
            className={styles['title-container']}
          >
            <SectionTitle title={title} />
          </m.h2>
        )}
        <m.div
          ref={ref}
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
        </m.div>
      </section>
    </LazyMotion>
  )
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}
