import React from 'react'
import styles from '@/styles/About.module.css'
import { EDUCATION_LIST } from '@/data/educationList'

export default function Education() {
  return (
    <div className={styles['grid-container']}>
      <h3 className={styles['sub-title']}>{`(Education)`}</h3>
      <ol className={`${styles.content} ${styles.education}`}>
        {EDUCATION_LIST.map((education) => (
          <li className={styles['education-item']} key={education.order}>
            <span className={`${styles['education-title']} font-kor`}>
              {education.title}
            </span>
            <span className={styles['education-duration']}>
              {education.duration}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
