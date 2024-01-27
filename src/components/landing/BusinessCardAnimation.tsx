'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Landing.module.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function BusinessCardAnimation() {
  const [size, setSize] = useState({
    width: window.innerWidth - 40,
    height: window.innerHeight - 20,
  })

  // resize
  useEffect(() => {
    const resizeHandler = () => {
      setSize({
        width: window.innerWidth - 40,
        height: window.innerHeight - 20,
      })
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <div
      className={styles['canvas-container']}
      style={{ width: size.width, height: size.height }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
        }}
      >
        <ambientLight />
        <BusinessCard scale={[9, 5, 0.01]} position={[0, 0, 0]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

function BusinessCard(props: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.BoxGeometry>(null)
  const texture = useTexture(
    '/static/images/texture/black-concrete-texture.jpg',
  )

  useFrame((state) => {
    if (meshRef.current === null) return

    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1,
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1,
    )
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1,
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1,
    )
  })

  return (
    <mesh ref={meshRef} {...props}>
      <boxGeometry ref={boxRef} />
      <meshBasicMaterial map={texture} toneMapped={false} />
      <Html
        occlude
        distanceFactor={1}
        position={[0, 0, 0.51]}
        transform
        className={styles['html-wrapper']}
      >
        <input
          type="text"
          placeholder="귀사의 이름을 입력해주세요"
          className={styles['company_name-input']}
        />
        <div className={styles['contact-wrapper']}>
          <div>
            <div className={styles['contact-item']}>김리안</div>
            <div className={`${styles['contact-item']} ${styles['job']}`}>
              Front-End Web Developer
            </div>
          </div>
          <div>
            <div className={styles['contact-item']}>{`+82(0)1090011250`}</div>
            <div className={styles['contact-item']}>{`5ffcut@gmail.com`}</div>
          </div>
        </div>
      </Html>
    </mesh>
  )
}
