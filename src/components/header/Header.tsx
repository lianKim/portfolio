import React from 'react'
import styles from '@/styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['grid-container']}>
        <h1 className={styles.logo}>
          <Link href="/">
            Lian Kim,
            <br />
            Front-End
            <br />
            Web Developer
          </Link>
        </h1>
        <nav className={styles.nav}>
          <ol>
            <li className={styles['nav-item']}>
              <Link href="/about">Home</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href="/about">About</Link>
            </li>
            <li className={`${styles['nav-item']} ${styles.active}`}>
              <Link href="/work">Work</Link>
            </li>
          </ol>
        </nav>
        <div className={styles['contact-list']}>
          <a href={`tel:+82(0)1090011250`}>{'+82(0)1090011250'}</a>
          <a href={`mailto:5ffcut@gmail.com`}>{'5ffcut@gmail.com'}</a>
        </div>
      </div>
    </header>
  )
}
