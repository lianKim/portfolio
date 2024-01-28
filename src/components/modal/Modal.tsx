'use client'
import React, { useEffect } from 'react'
import styles from '@/styles/Modal.module.css'
import CloseIcon from '@icons/close_icon.svg'
import Image from 'next/image'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  // 스크롤 방지
  useEffect(() => {
    if (typeof window === 'undefined') return

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
      `

    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button type="button" className={styles['btn-close']} onClick={onClose}>
          <Image src={CloseIcon} alt="close icon" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
