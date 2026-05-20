import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 200, suffix: '+', label: 'Solar Projects Completed', icon: '☀️', color: '#99C24D' },
  { value: 150, suffix: '+', label: 'Happy Clients Served', icon: '🤝', color: '#7DA83A' },
  { value: 80, suffix: '+', label: '5KW Installations', icon: '⚡', color: '#27A8E0' },
  { label: 'Schneider Solar Entrepreneurship Program', icon: '🏆', color: '#99C24D', display: 'Certified' },
  { label: 'MSME Registered Company', icon: '📋', color: '#7DA83A', display: 'Registered' },
]

function CountUpValue({ value, suffix, color }) {
  const elRef = useRef(null)
  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        if (el.isConnected) el.textContent = `${Math.floor(counter.val)}${suffix}`
      },
      onComplete: () => {
        if (el.isConnected) el.textContent = `${value}${suffix}`
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value, suffix])

  return (
    <div ref={elRef} className="stat-value stat-value--number relative mb-3" style={{ color }}>
      {`${value}${suffix}`}
    </div>
  )
}

function glowFromHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 0.22)`
}

function StatCard({ stat }) {
  return (
    <Card3D
      className="stat-card achievement-card rounded-2xl text-center p-5 sm:p-7 md:p-10"
      glowColor={glowFromHex(stat.color)}
      maxTilt={10}
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span className="text-3xl mb-5 block" style={{ transform: 'translateZ(20px)' }}>{stat.icon}</span>
      {stat.display ? (
        <div className="stat-value stat-value--label relative mb-3" style={{ color: stat.color, transform: 'translateZ(14px)' }}>
          {stat.display}
        </div>
      ) : (
        <CountUpValue value={stat.value} suffix={stat.suffix} color={stat.color} />
      )}
      <p className="text-sm leading-relaxed max-w-[min(14rem,100%)] mx-auto" style={{ color: 'var(--text-muted)', transform: 'translateZ(8px)' }}>
        {stat.label}
      </p>
    </Card3D>
  )
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.achievement-card')
      if (cards.length) {
        gsap.from(cards, {
          y: 32,
          rotateX: 14,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section section-transition"
      style={{ background: '#FFFFFF' }}
    >
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(153,194,77,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(153,194,77,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <Scene3DAccent variant="trophy" className="scene-accent--achievements" opacity={0.48} />

      <div className="section-inner relative z-10 achievements-section__inner">
        <div className="section-header">
          <span className="section-badge">Our Impact</span>
          <h2 className="section-title">
            Proven <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-desc">
            Trusted across Bangalore and Karnataka for quality solar installations and certified electrical expertise.
          </p>
        </div>

        <div className="section-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
