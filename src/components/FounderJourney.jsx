import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2018', icon: '🎓', title: 'MBA Student', desc: 'Built business foundations and an entrepreneurial mindset in sustainable industries.', color: '#3B82F6' },
  { year: '2019', icon: '🌱', title: 'Sustainability Drive', desc: 'Deep research into clean energy and Karnataka’s solar opportunity.', color: '#22C55E' },
  { year: '2020', icon: '☀️', title: 'Solar Focus', desc: 'Specialized in residential, commercial, and agricultural solar systems.', color: '#27A8E0' },
  { year: '2021', icon: '🏆', title: 'Schneider Certified', desc: 'Completed Schneider Electric’s Solar Entrepreneurship Program.', color: '#99C24D' },
  { year: '2022', icon: '📋', title: 'MSME Registered', desc: 'Formalized operations to serve Bangalore and statewide clients.', color: '#8B5CF6' },
  { year: '2023', icon: '🚀', title: 'MBR Solar Founded', desc: 'Launched MBR Solar and Electricals — mission-led, certified, customer-first.', color: '#EC4899' },
]

function glowFromHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 0.28)`
}

export default function FounderJourney() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const steps = section.querySelectorAll('.journey-step')
      if (steps.length) {
        gsap.from(steps, {
          y: 40,
          rotateX: 12,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        })
      }

      if (track) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.2,
          onUpdate: (self) => {
            const max = track.scrollWidth - track.clientWidth
            if (max > 0) track.scrollLeft = self.progress * max
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="section section-transition journey-section"
    >
      <Scene3DAccent variant="timeline" className="scene-accent--journey-left" opacity={0.5} />
      <Scene3DAccent variant="energy" className="scene-accent--journey-right" opacity={0.35} />

      <div className="section-inner journey-section__inner">
        <div className="section-header">
          <span className="section-badge">The Founder&apos;s Path</span>
          <h2 className="section-title">
            Mahesh Babu R&apos;s <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-desc">
            Six milestones from business school to building Bangalore&apos;s trusted solar brand.
          </p>
        </div>

        <Card3D
          className="journey-founder-card"
          glowColor="rgba(153, 194, 77, 0.3)"
          maxTilt={8}
        >
          <div className="journey-founder-card__avatar">MBR</div>
          <div>
            <p className="journey-founder-card__label">Founder &amp; CEO</p>
            <h3 className="journey-founder-card__name">Mahesh Babu R</h3>
            <p className="journey-founder-card__tagline">
              Schneider-certified entrepreneur powering homes and businesses with clean, affordable solar.
            </p>
          </div>
        </Card3D>

        <div ref={trackRef} className="journey-track" role="list">
          {milestones.map((m, i) => (
            <Card3D
              key={m.year}
              className="journey-step"
              role="listitem"
              glowColor={glowFromHex(m.color)}
              maxTilt={12}
              style={{ '--step-color': m.color, borderTop: `4px solid ${m.color}` }}
            >
              <span className="journey-step__year">{m.year}</span>
              <span className="journey-step__icon">{m.icon}</span>
              <h3 className="journey-step__title">{m.title}</h3>
              <p className="journey-step__desc">{m.desc}</p>
              {i < milestones.length - 1 && (
                <span className="journey-step__arrow" aria-hidden="true">→</span>
              )}
            </Card3D>
          ))}
        </div>

        <p className="journey-hint">← Scroll to explore the timeline →</p>
      </div>
    </section>
  )
}
