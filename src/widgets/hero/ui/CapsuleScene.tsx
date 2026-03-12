'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame }          from '@react-three/fiber'
import { Float, Environment }        from '@react-three/drei'
import * as THREE                    from 'three'

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

      color.setHSL(0.38 + Math.random() * 0.08, 0.45, 0.55 + Math.random() * 0.2)
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

function InnerCapsule() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.6
  })

  return (
    <mesh ref={ref}>
      <capsuleGeometry args={[0.52, 0.75, 4, 24]} />
      <meshStandardMaterial
        color="#DCEFE6"
        roughness={0.25}
        metalness={0.05}
        transparent
        opacity={0.92}
      />
    </mesh>
  )
}

function OuterShell() {
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
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshStandardMaterial
          color="#DCEFE6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={ref}>
        <capsuleGeometry args={[0.62, 0.92, 4, 32]} />
        <meshPhysicalMaterial
          color="#3B6F57"
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
          <torusGeometry args={[0.625, 0.028, 8, 32]} />
          <meshStandardMaterial color="#0F3D2E" roughness={0.2} metalness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingPills() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.elapsedTime * 0.18
  })

  const pills = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        angle:   (i / 6) * Math.PI * 2,
        radius:  2.15,
        yOffset: Math.sin(i * 1.05) * 0.5,
        scale:   0.14 + (i % 3) * 0.03,
        color:   i % 2 === 0 ? '#3B6F57' : '#DCEFE6',
        rotX:    Math.random() * Math.PI,
        rotZ:    Math.random() * Math.PI,
      })),
    []
  )

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
          <capsuleGeometry args={[1, 1.6, 4, 12]} />
          <meshStandardMaterial color={p.color} roughness={0.3} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.65} color="#DCEFE6" />
      <directionalLight position={[5, 8, 4]}    intensity={1.8}  color="#ffffff" castShadow />
      <directionalLight position={[-4, -2, -4]}  intensity={0.45} color="#3B6F57" />
      <pointLight       position={[3, 2, 4]}     intensity={0.9}  color="#DCEFE6" />
      <pointLight       position={[-3, -1, -3]}  intensity={0.35} color="#0F3D2E" />

      <Environment preset="forest" />

      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
        <InnerCapsule />
        <OuterShell />
      </Float>

      <OrbitingPills />
      <Particles count={160} />
    </>
  )
}

export default function CapsuleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
