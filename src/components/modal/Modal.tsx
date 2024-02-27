'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Modal.module.css'
import { useRouter } from 'next/navigation'
import CloseIcon from '@icons/close_icon.svg'
import Image from 'next/image'

interface ModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const HandleModalClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    setIsOpen(false)

    setTimeout(() => {
      router.back()
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }, [])

  // 스크롤 방지
  useEffect(() => {
    if (typeof window === 'undefined') return

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 100%;
      `

    return () => {
      if (typeof window === 'undefined') return

      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles['active'] : ''}`}>
      <button
        type="button"
        className={styles['btn-close']}
        onClick={HandleModalClose}
      >
        <Image src={CloseIcon} alt="close icon" />
      </button>
      <div className={styles.container}>
        <div className={styles['modal-header']}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
