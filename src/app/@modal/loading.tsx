import React from 'react'
import styles from '@/styles/ProjectDetail.module.css'
import SectionTitle from '@/components/@common/SectionTitle'

export default function LoadingModal() {
  return (
    <div className={styles.loading}>
      <SectionTitle title="Loading..." />
    </div>
  )
}
