import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '💰', title: 'Affordable Solutions', desc: 'Competitive pricing and flexible plans so clean energy is accessible for every budget.', color: '#99C24D' },
  { icon: '👷', title: 'Experienced Technicians', desc: 'Schneider-certified professionals with years of hands-on solar and electrical expertise.', color: '#3B82F6' },
  { icon: '⚡', title: 'Fast Support', desc: 'Rapid response for repairs, inspections, and maintenance — minimal downtime guaranteed.', color: '#27A8E0' },
  { icon: '🔧', title: 'Customized Systems', desc: 'Tailored solar designs for residential, commercial, industrial, and agricultural needs.', color: '#22C55E' },
  { icon: '🛡️', title: 'Reliable Maintenance', desc: 'Scheduled upkeep and monitoring to keep your system performing at peak efficiency.', color: '#8B5CF6' },
]

function glowFromHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 0.25)`
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.feature-card')
      if (cards.length) {
        gsap.from(cards, {
          y: 28,
          rotateX: 10,
          duration: 0.6,
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
      id="why"
      ref={sectionRef}
      className="section section-transition"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 50%, rgba(153,194,77,0.06) 0%, transparent 50%)' }}
      />
      <Scene3DAccent variant="energy" className="scene-accent--why" opacity={0.45} />

      <div className="section-inner relative z-10 why-section__inner">
        <div className="section-header">
          <span className="section-badge">Why MBR Solar</span>
          <h2 className="section-title">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="section-desc">
            We combine certified expertise, affordable pricing, and dedicated support to deliver the best solar experience in Bangalore.
          </p>
        </div>

        <div className="section-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card3D
              key={f.title}
              className="feature-card rounded-2xl"
              glowColor={glowFromHex(f.color)}
              style={{ borderTop: `3px solid ${f.color}` }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}30`, transform: 'translateZ(16px)' }}
              >
                {f.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', transform: 'translateZ(12px)' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', transform: 'translateZ(8px)' }}>
                {f.desc}
              </p>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
