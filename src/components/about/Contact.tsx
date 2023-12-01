import React from 'react'
import styles from '@/styles/About.module.css'
import { CONTACT_LIST } from '@/data/contactList'

export default function Contact() {
  return (
    <div className={styles['grid-container']}>
      <h3 className={styles['sub-title']}>{`(Contact)`}</h3>
      <ul className={`${styles.content} ${styles.contact}`}>
        <li>
          <div className={`${styles['contact-type']} font-sans`}>Name</div>
          <div className={`${styles['contact-value']} font-kor`}>김리안</div>
        </li>
        {CONTACT_LIST.map((item) => (
          <li key={item.type}>
            <div className={`${styles['contact-type']} font-sans`}>
              {item.type}
            </div>
            <div className={`${styles['contact-value']}`}>{item.value}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
