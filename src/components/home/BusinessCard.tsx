'use client'

import * as THREE from 'three'

import {
  CARD_ASPECT_RATIO_H,
  CARD_ASPECT_RATIO_W,
  CONTACT_INFO,
  DEFAULT_VIEWPORT_WIDTH,
  DESKTOP_CARD_SCALE,
  FONT_DEFAULT,
  FONT_EN,
  MOBILE_BREAKPOINT,
  MOBILE_CARD_SCALE,
  TEXTURE_PATH,
} from '@/lib/constants/businessCard'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'

export default function BusinessCardCanvas() {
  return (
    <div className="h-[80vh] w-full">
      <Canvas>
        <ambientLight />
        <BusinessCard />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

function BusinessCard() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, TEXTURE_PATH)
  const { viewport } = useThree()

  const responsiveScale = useMemo((): [number, number, 0.01] => {
    const deviceWidth =
      typeof window !== 'undefined' ? window.innerWidth : DEFAULT_VIEWPORT_WIDTH
    const maxX =
      deviceWidth < MOBILE_BREAKPOINT ? MOBILE_CARD_SCALE : DESKTOP_CARD_SCALE
    const nextX = Math.min(viewport.width * 0.8, maxX)

    return [nextX, (nextX / CARD_ASPECT_RATIO_W) * CARD_ASPECT_RATIO_H, 0.01]
  }, [viewport])

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
      (-1.2 + Math.sin(t / 2)) / 5,
      0.1,
    )
  })

  return (
    <mesh ref={meshRef} scale={responsiveScale}>
      <boxGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
      <Suspense fallback="명함 컴포넌트">
        <Html
          occlude
          distanceFactor={1}
          position={[0, 0, 0.51]}
          transform
          style={{
            width: 372,
            height: 356,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: FONT_DEFAULT,
            fontSize: 16,
            fontWeight: 300,
            color: '#ffffff',
            userSelect: 'none',
          }}
        >
          <style>{`
            .card-input:focus {
              outline: 1.5px dashed #caa4cc;
              outline-offset: 4px;
            }
            .card-input::placeholder {
              color: #9ca3af;
            }
          `}</style>
          <input
            type="text"
            placeholder="귀사의 이름을 입력해주세요"
            className="card-input"
            style={{
              padding: 0,
              background: 'none',
              border: 0,
              fontSize: 18,
              fontWeight: 300,
              letterSpacing: '0.05em',
              color: '#ffffff',
            }}
          />
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <div style={{ marginTop: 8 }}>{CONTACT_INFO.name}</div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT_EN,
                  color: '#9ca3af',
                }}
              >
                {CONTACT_INFO.job}
              </div>
            </div>
            <div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT_EN,
                }}
              >
                {CONTACT_INFO.phone}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT_EN,
                }}
              >
                {CONTACT_INFO.email}
              </div>
            </div>
          </div>
        </Html>
      </Suspense>
    </mesh>
  )
}
