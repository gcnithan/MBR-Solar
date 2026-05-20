import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { configureRenderer, defaultGlProps } from '../utils/canvasGl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'
import { glowFromHex } from '../utils/glowFromHex'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { label: 'End-to-end solar solutions', icon: '☀️', desc: 'Installation through maintenance', color: '#99C24D' },
  { label: 'Certified electrical services', icon: '⚡', desc: 'Schneider-trained expertise', color: '#3B82F6' },
  { label: 'Savings & sustainability', icon: '🌱', desc: 'Lower bills, cleaner energy', color: '#22C55E' },
  { label: 'Bangalore & Karnataka', icon: '📍', desc: 'Trusted local partner', color: '#27A8E0' },
]

const quickStats = [
  { value: '200+', label: 'Projects' },
  { value: '150+', label: 'Clients' },
  { value: '6+', label: 'Years' },
]

function EnergyGlobe() {
  const globeRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (globeRef.current) globeRef.current.rotation.y = t * 0.2
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.35
      ring1Ref.current.rotation.z = t * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.25
    }
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#27A8E0" />
      <pointLight position={[-3, -2, 3]} intensity={0.8} color="#99C24D" />

      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1.1, 48, 48]} />
          <meshStandardMaterial
            color="#F0FDF4"
            emissive="#99C24D"
            emissiveIntensity={0.35}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh scale={1.03}>
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshBasicMaterial color="#99C24D" transparent opacity={0.08} wireframe />
        </mesh>
      </group>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.55, 0.025, 16, 80]} />
        <meshStandardMaterial color="#99C24D" emissive="#99C24D" emissiveIntensity={0.9} transparent opacity={0.85} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.85, 0.015, 16, 80]} />
        <meshStandardMaterial color="#27A8E0" emissive="#27A8E0" emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
    </>
  )
}

function GlobeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      className="w-full h-full"
      gl={defaultGlProps}
      onCreated={({ gl }) => configureRenderer(gl)}
    >
      <Suspense fallback={null}>
        <EnergyGlobe />
      </Suspense>
    </Canvas>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          y: 28,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        })
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          y: 24,
          rotateY: -8,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        })
      }
      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section section-transition about-section"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 40%, rgba(153,194,77,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(39,168,224,0.1) 0%, transparent 55%)',
        }}
      />
      <Scene3DAccent variant="solar" className="scene-accent--about" opacity={0.38} />

      <div className="section-inner relative z-10 about-section__inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center min-w-0">
            <div ref={leftRef}>
              <span className="section-badge">About Us</span>
              <h2 className="section-title text-left mx-0 mb-5" style={{ maxWidth: 'none' }}>
                Powering Bangalore with{' '}
                <span className="gradient-text">Clean Energy</span>
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: 'var(--text-muted)', maxWidth: '32rem' }}
              >
                MBR Solar and Electricals delivers installation, maintenance, repairs, and electrical
                services — helping homes and businesses save money while reducing environmental impact
                across Karnataka.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {quickStats.map((s) => (
                  <Card3D key={s.label} className="about-stat-pill" maxTilt={12} glowColor="rgba(153, 194, 77, 0.3)">
                    <span className="about-stat-pill__value">{s.value}</span>
                    <span className="about-stat-pill__label">{s.label}</span>
                  </Card3D>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <Card3D
                    key={item.label}
                    className="about-highlight-card"
                    glowColor={glowFromHex(item.color)}
                    maxTilt={10}
                  >
                    <span className="about-highlight-card__icon">{item.icon}</span>
                    <div>
                      <p className="about-highlight-card__title">{item.label}</p>
                      <p className="about-highlight-card__desc">{item.desc}</p>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>

            <div ref={rightRef} className="about-visual-panel-wrap min-w-0 w-full">
            <Card3D
              className="about-visual-panel"
              maxTilt={6}
              glowColor="rgba(153, 194, 77, 0.2)"
            >
              <div className="about-visual-panel__glow" aria-hidden="true" />
              <div className="about-visual-panel__canvas">
                <GlobeCanvas />
              </div>
              <div className="about-visual-panel__badge">
                <span className="about-visual-panel__badge-dot" />
                Live Energy Network
              </div>
              <div className="about-visual-panel__quote">
                <p>&ldquo;Sustainable energy should be accessible to every home in Karnataka.&rdquo;</p>
                <span>— Mahesh Babu R, Founder</span>
              </div>
            </Card3D>
            </div>
          </div>
      </div>
    </section>
  )
}
