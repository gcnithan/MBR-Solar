import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { getSolarCellTexture } from '../utils/solarCellTexture'

const PANEL_W = 1.0
const PANEL_D = 0.65
const FRAME = 0.035

function SolarModule({ position, rotation = [0, 0, 0], scale = 1 }) {
  const cellMap = useMemo(() => getSolarCellTexture(), [])

  const faceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: cellMap,
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 1.1,
      }),
    [cellMap]
  )

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.9, roughness: 0.25 }),
    []
  )

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0.04,
        transparent: true,
        opacity: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
      }),
    []
  )

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={frameMat}>
        <boxGeometry args={[PANEL_W + FRAME * 2, 0.04, PANEL_D + FRAME * 2]} />
      </mesh>
      <mesh position={[0, 0.022, 0]} material={faceMat}>
        <boxGeometry args={[PANEL_W, 0.018, PANEL_D]} />
      </mesh>
      <mesh position={[0, 0.034, 0]} material={glassMat}>
        <boxGeometry args={[PANEL_W * 0.99, 0.003, PANEL_D * 0.99]} />
      </mesh>
    </group>
  )
}

function SolarRack({ position, rotation, rows = 2, cols = 4, scale = 1 }) {
  const railMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.85, roughness: 0.35 }),
    []
  )

  const spacingX = PANEL_W + 0.06
  const spacingZ = PANEL_D + 0.06
  const modules = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      modules.push(
        <SolarModule
          key={`${r}-${c}`}
          position={[
            (c - (cols - 1) / 2) * spacingX,
            0.12 + r * 0.05,
            (r - (rows - 1) / 2) * spacingZ,
          ]}
        />
      )
    }
  }

  const railW = (cols - 1) * spacingX + PANEL_W + 0.5

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {modules}
      <mesh position={[0, 0.04, 0]} material={railMat}>
        <boxGeometry args={[railW, 0.05, 0.1]} />
      </mesh>
      <mesh position={[-railW / 2 - 0.12, -0.35, 0]} material={railMat}>
        <cylinderGeometry args={[0.035, 0.045, 0.7]} />
      </mesh>
      <mesh position={[railW / 2 + 0.12, -0.35, 0]} material={railMat}>
        <cylinderGeometry args={[0.035, 0.045, 0.7]} />
      </mesh>
    </group>
  )
}

/** Bright sun with corona, rays, and scene lighting */
function BrightSun() {
  const sunRef = useRef()
  const raysRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (sunRef.current) sunRef.current.rotation.y = t * 0.08
    if (raysRef.current) raysRef.current.rotation.z = t * 0.12
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.06
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={[6, 7, -14]}>
      <pointLight color="#F9AD42" intensity={4.5} distance={60} decay={1.2} />
      <pointLight color="#F49021" intensity={2.5} distance={40} position={[0, 0, 2]} />

      <mesh ref={glowRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#F49021" transparent opacity={0.14} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#F8EC1D" transparent opacity={0.22} />
      </mesh>

      <mesh ref={raysRef}>
        <ringGeometry args={[1.4, 3.5, 48]} />
        <meshBasicMaterial
          color="#F9AD42"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color="#FFF8E7"
          emissive="#F49021"
          emissiveIntensity={4.5}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

/** Distant panel farms across the hero background */
function BackgroundSolarField() {
  const racks = useMemo(() => {
    const items = []
    const positions = [
      [-4, -1.2, -3], [0, -1.4, -2], [4, -1.1, -3.5], [7, -1.3, -2.5],
      [-2, -1.5, -5], [3, -1.6, -5.5], [6, -1.4, -6], [-5, -1.3, -7],
      [1, -1.7, -8], [5, -1.5, -8.5], [-1, -1.4, -10], [4, -1.6, -11],
    ]
    positions.forEach((pos, i) => {
      items.push({
        position: pos,
        rotation: [0.5 + (i % 3) * 0.04, -0.25 + (i % 2) * 0.1, 0],
        cols: 4 + (i % 3),
        scale: 0.55 + (i % 4) * 0.08,
      })
    })
    return items
  }, [])

  return (
    <group>
      {racks.map((rack, i) => (
        <SolarRack
          key={i}
          position={rack.position}
          rotation={rack.rotation}
          rows={2}
          cols={rack.cols}
          scale={rack.scale}
        />
      ))}
    </group>
  )
}

export default function HeroSolarScene({ scrollProgress }) {
  const foregroundRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const scroll = scrollProgress?.current ?? 0

    if (foregroundRef.current) {
      foregroundRef.current.rotation.y = -0.3 + mouse.current.x * 0.06 + scroll * 0.1
      foregroundRef.current.rotation.x = 0.38 + mouse.current.y * 0.03
      foregroundRef.current.position.y = Math.sin(t * 0.45) * 0.04 + 0.2
    }
  })

  return (
    <>
      <color attach="background" args={['#FFFFFF']} />
      <fog attach="fog" args={['#FFFFFF', 22, 55]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#EFF6FF', '#2C388B', 0.35]} />
      <directionalLight
        position={[6, 12, 8]}
        intensity={1.4}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <BrightSun />
      <Environment preset="sunset" environmentIntensity={0.4} />

      <BackgroundSolarField />

      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.12}>
        <group ref={foregroundRef} position={[1.5, 0.1, 1]}>
          <SolarRack position={[0, 0, 0]} rotation={[0, 0, 0]} rows={2} cols={5} />
          <SolarRack position={[0.4, -0.85, 1]} rotation={[0.1, -0.15, 0]} rows={2} cols={4} />
        </group>
      </Float>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.92} metalness={0.05} />
      </mesh>

      <ContactShadows position={[0, -1.78, 0]} opacity={0.3} scale={18} blur={2.5} far={5} color="#1c1917" />
    </>
  )
}
