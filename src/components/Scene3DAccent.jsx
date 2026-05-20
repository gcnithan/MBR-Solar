import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { configureRenderer, defaultGlProps } from '../utils/canvasGl'

function SolarCell({ color = '#99C24D' }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.35
    group.current.rotation.x = Math.sin(t * 0.4) * 0.15 + 0.4
  })

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.4, 0.06, 0.9]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.32, 0.02, 0.82]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive={color}
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.05, -0.25 + i * 0.25]}>
          <boxGeometry args={[1.3, 0.004, 0.006]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

function EnergyOrb() {
  const core = useRef()
  const ring = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (core.current) core.current.rotation.y = t * 0.5
    if (ring.current) {
      ring.current.rotation.x = t * 0.6
      ring.current.rotation.z = t * 0.3
    }
  })

  return (
    <>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#27A8E0"
          emissive="#99C24D"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.9, 0.02, 16, 64]} />
        <meshStandardMaterial color="#99C24D" emissive="#99C24D" emissiveIntensity={0.9} />
      </mesh>
    </>
  )
}

/** Ascending path of nodes — founder journey */
function TimelinePath() {
  const group = useRef()
  const count = 6

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.getElapsedTime() * 0.12
  })

  const positions = Array.from({ length: count }, (_, i) => {
    const angle = (i / (count - 1)) * Math.PI * 0.85 - Math.PI * 0.425
    const r = 1.1
    return [Math.sin(angle) * r, i * 0.28 - 0.7, Math.cos(angle) * r * 0.4]
  })

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === count - 1 ? 0.14 : 0.09, 20, 20]} />
          <meshStandardMaterial
            color="#27A8E0"
            emissive={i === count - 1 ? '#99C24D' : '#27A8E0'}
            emissiveIntensity={i === count - 1 ? 1.4 : 0.7}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
      {positions.slice(0, -1).map((pos, i) => {
        const next = positions[i + 1]
        const mid = [(pos[0] + next[0]) / 2, (pos[1] + next[1]) / 2, (pos[2] + next[2]) / 2]
        const dx = next[0] - pos[0]
        const dy = next[1] - pos[1]
        const dz = next[2] - pos[2]
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
        return (
          <mesh key={`line-${i}`} position={mid} rotation={[0, 0, Math.atan2(dy, dx)]}>
            <cylinderGeometry args={[0.012, 0.012, len, 8]} />
            <meshStandardMaterial color="#99C24D" emissive="#99C24D" emissiveIntensity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

/** Trophy / achievement accent */
function TrophyAccent() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.getElapsedTime() * 0.35
  })

  return (
    <group ref={group}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.5, 32]} />
        <meshStandardMaterial color="#27A8E0" emissive="#99C24D" emissiveIntensity={0.8} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.42, 0.06, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#99C24D" emissive="#7DA83A" emissiveIntensity={1} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.25, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

/** Floating stars — testimonials */
function StarCluster() {
  const group = useRef()
  const stars = useRef([])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) group.current.rotation.y = t * 0.2
    stars.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.y = Math.sin(t * 1.2 + i * 1.1) * 0.15
      mesh.rotation.x = t * (0.3 + i * 0.05)
      mesh.rotation.z = t * 0.2
    })
  })

  const positions = [
    [-0.6, 0.2, 0.1],
    [0.5, -0.15, 0.2],
    [0, 0.45, -0.15],
    [-0.3, -0.4, 0],
    [0.65, 0.35, -0.1],
  ]

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { stars.current[i] = el }}
          position={pos}
          scale={0.08 + (i % 2) * 0.04}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#27A8E0"
            emissive="#99C24D"
            emissiveIntensity={1.1}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ variant }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#27A8E0" />
      <pointLight position={[-2, -1, 2]} intensity={0.5} color="#99C24D" />
      {variant === 'energy' && <EnergyOrb />}
      {variant === 'timeline' && <TimelinePath />}
      {variant === 'trophy' && <TrophyAccent />}
      {variant === 'stars' && <StarCluster />}
      {variant === 'solar' && <SolarCell />}
    </>
  )
}

const CAMERA = {
  solar: [0, 0, 3.2],
  energy: [0, 0, 3.2],
  timeline: [0, 0, 3.8],
  trophy: [0, 0, 3.4],
  stars: [0, 0, 3.5],
}

export default function Scene3DAccent({
  variant = 'solar',
  className = '',
  opacity = 0.55,
}) {
  const camZ = CAMERA[variant]?.[2] ?? 3.2

  return (
    <div
      className={`scene-accent ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, camZ], fov: 45 }}
        dpr={[1, 1.5]}
        gl={defaultGlProps}
        onCreated={({ gl }) => configureRenderer(gl)}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  )
}
