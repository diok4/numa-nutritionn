'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame }          from '@react-three/fiber'
import { Float }                     from '@react-three/drei'
import * as THREE                    from 'three'
import { useLowPerformanceMode }     from '@/shared/lib/useLowPerformanceMode'

function Particles({ count = 160 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const color     = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const r     = 2.8 + Math.random() * 2.7
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      // NUMA green palette
      color.setHSL(0.38 + Math.random() * 0.06, 0.75, 0.55 + Math.random() * 0.2)
      colors[i * 3]     = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.04
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.025) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

function InnerCapsule({ lowPerformanceMode }: { lowPerformanceMode: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.6
  })

  return (
    <mesh ref={ref}>
      <capsuleGeometry args={[0.52, 0.75, 4, lowPerformanceMode ? 12 : 20]} />
      <meshStandardMaterial
        color="#D4F7E8"
        roughness={0.25}
        metalness={0.05}
        transparent
        opacity={0.92}
      />
    </mesh>
  )
}

function OuterShell({ lowPerformanceMode }: { lowPerformanceMode: boolean }) {
  const ref  = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.06
    }
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.08 + Math.sin(clock.elapsedTime * 0.7) * 0.04
    }
  })

  return (
    <group>
      <mesh ref={glow}>
        <sphereGeometry args={[1.7, lowPerformanceMode ? 18 : 28, lowPerformanceMode ? 18 : 28]} />
        <meshStandardMaterial
          color="#D4F7E8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={ref}>
        <capsuleGeometry args={[0.62, 0.92, 4, lowPerformanceMode ? 16 : 28]} />
        <meshPhysicalMaterial
          color="#3DDC84"
          transmission={0.78}
          roughness={0.04}
          metalness={0}
          ior={1.45}
          thickness={0.6}
          transparent
          opacity={0.88}
          envMapIntensity={1.6}
        />
      </mesh>

      {[0.58, -0.58].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.625, 0.028, 8, lowPerformanceMode ? 18 : 30]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingPills({ lowPerformanceMode }: { lowPerformanceMode: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.elapsedTime * 0.18
  })

  const pills = useMemo(() => {
    const total = lowPerformanceMode ? 4 : 6
    return Array.from({ length: total }, (_, i) => ({
        angle:   (i / total) * Math.PI * 2,
        radius:  lowPerformanceMode ? 2 : 2.15,
        yOffset: Math.sin(i * 1.05) * 0.5,
        scale:   0.14 + (i % 3) * 0.03,
        color:   i % 2 === 0 ? '#3DDC84' : '#D4F7E8',
        rotX:    Math.random() * Math.PI,
        rotZ:    Math.random() * Math.PI,
      }))
  }, [lowPerformanceMode])

  return (
    <group ref={group}>
      {pills.map((p, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(p.angle) * p.radius,
            p.yOffset,
            Math.sin(p.angle) * p.radius,
          ]}
          scale={p.scale}
          rotation={[p.rotX, 0, p.rotZ]}
        >
          <capsuleGeometry args={[1, 1.6, 4, lowPerformanceMode ? 8 : 12]} />
          <meshStandardMaterial color={p.color} roughness={0.3} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ lowPerformanceMode }: { lowPerformanceMode: boolean }) {
  return (
    <>
      <ambientLight intensity={0.65} color="#D4F7E8" />
      <directionalLight position={[5, 8, 4]}    intensity={1.8}  color="#ffffff" />
      <directionalLight position={[-4, -2, -4]}  intensity={0.45} color="#3DDC84" />
      <pointLight       position={[3, 2, 4]}     intensity={0.9}  color="#3DDC84" />
      <pointLight       position={[-3, -1, -3]}  intensity={0.35} color="#0A0A0A" />

      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
        <InnerCapsule lowPerformanceMode={lowPerformanceMode} />
        <OuterShell lowPerformanceMode={lowPerformanceMode} />
      </Float>

      <OrbitingPills lowPerformanceMode={lowPerformanceMode} />
      <Particles count={lowPerformanceMode ? 70 : 120} />
    </>
  )
}

export default function CapsuleScene() {
  const lowPerformanceMode = useLowPerformanceMode()

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      gl={{ antialias: !lowPerformanceMode, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={lowPerformanceMode ? [1, 1] : [1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene lowPerformanceMode={lowPerformanceMode} />
      </Suspense>
    </Canvas>
  )
}
