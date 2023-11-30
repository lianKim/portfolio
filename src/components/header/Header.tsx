import React from 'react'
import styles from '@/styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['grid-container']}>
        <h1 className={styles.logo}>
          <Link href="/">Lian Kim</Link>
        </h1>
        <nav className={styles.nav}>
          <ol>
            <li className={styles['nav-item']}>
              <Link href="/about">About</Link>
            </li>
            <li className={`${styles['nav-item']} ${styles.active}`}>
              <Link href="/work">Work</Link>
            </li>
          </ol>
        </nav>
        <p className={styles['date-updated']}>{`Last Updated (23.11.24)`}</p>
      </div>
    </header>
  )
}
