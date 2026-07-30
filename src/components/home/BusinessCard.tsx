'use client'

import * as THREE from 'three'

import {
  CARD_ASPECT_RATIO_H,
  CARD_ASPECT_RATIO_W,
  CONTACT_INFO,
  FONT_DEFAULT,
  FONT_EN,
  TABLET_BREAKPOINT,
  TEXTURE_PATH,
} from '@/lib/constants/businessCard'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'

import { getCardScale } from '@/lib/utils/responsive'

export default function BusinessCardCanvas({
  onReady,
}: {
  onReady?: () => void
}) {
  return (
    <div className="h-[80vh] w-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 30 }}>
        <ambientLight />
        <BusinessCard onReady={onReady} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

function BusinessCard({ onReady }: { onReady?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, TEXTURE_PATH)
  const { viewport } = useThree()

  // 텍스처 로드가 끝나 이 컴포넌트가 렌더되면(=3D 준비 완료) 부모에 알림
  useEffect(() => {
    onReady?.()
  }, [onReady])

  const responsiveScale = useMemo((): [number, number, 0.01] => {
    const deviceWidth =
      typeof window !== 'undefined' ? window.innerWidth : TABLET_BREAKPOINT
    const maxX = getCardScale(deviceWidth)
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
            .card-input {
              box-sizing: border-box;
              border: 0;
              border-bottom: 1.5px solid transparent;
            }
            .card-input:focus {
              outline: none;
              border-bottom-color: rgba(255, 255, 255, 0.7);
            }
            .card-input::placeholder {
              color: #a3a3a3;
            }
          `}</style>
          <input
            type="text"
            placeholder="귀사의 이름을 입력해주세요"
            className="card-input"
            style={{
              padding: '0 0 4px',
              background: 'none',
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
                  color: '#a3a3a3',
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
