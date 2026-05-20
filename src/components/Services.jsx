import { useEffect, useRef, useCallback } from 'react'
import Scene3DAccent from './Scene3DAccent'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '☀️',
    title: 'Solar Installation',
    desc: 'End-to-end residential, commercial & industrial solar panel installation with premium components.',
    color: '#99C24D',
    glow: 'rgba(153,194,77,0.25)',
  },
  {
    icon: '🔧',
    title: 'Solar Maintenance',
    desc: 'Scheduled maintenance plans to keep your solar system performing at peak efficiency year-round.',
    color: '#2C388B',
    glow: 'rgba(44,56,139,0.25)',
  },
  {
    icon: '⚙️',
    title: 'Solar Repair',
    desc: 'Fast and reliable repair services for any solar system fault, panel damage, or inverter issue.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
  },
  {
    icon: '🔍',
    title: 'Solar Inspection',
    desc: 'Comprehensive system audits and performance inspections with detailed health reports.',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: '💧',
    title: 'Solar Pumps',
    desc: 'Solar-powered water pumps for agriculture, irrigation and rural water supply systems.',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.25)',
  },
  {
    icon: '🌙',
    title: 'Solar Street Lights',
    desc: 'Smart solar street lighting solutions for roads, colonies, and commercial complexes.',
    color: '#27A8E0',
    glow: 'rgba(39,168,224,0.25)',
  },
  {
    icon: '🌿',
    title: 'Solar Fences',
    desc: 'Energized solar electric fences for agricultural land and property security.',
    color: '#22C55E',
    glow: 'rgba(34,197,94,0.25)',
  },
  {
    icon: '📷',
    title: 'Solar Cameras',
    desc: 'Solar-powered CCTV surveillance systems — zero electricity cost, 24/7 monitoring.',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.25)',
  },
  {
    icon: '⚡',
    title: 'Electrical Work',
    desc: 'Complete electrical installations, wiring, panel upgrades and certified electrical services.',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.25)',
  },
]

function ServiceCard({ service, index, onCardMount }) {
  const cardRef = useRef(null)
  const glowRef = useRef()

  useEffect(() => {
    onCardMount(cardRef.current, index)
    return () => onCardMount(null, index)
  }, [index, onCardMount])

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -10
    const rotY = ((x - cx) / cx) * 10

    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })

    // Move glow to mouse position
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${service.glow}, transparent 70%)`
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.7)',
    })
    glowRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card relative rounded-2xl p-5 sm:p-6 md:p-7 cursor-default overflow-hidden"
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-200 rounded-2xl"
      />

      {/* Animated border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${service.color}22, transparent, ${service.color}11)`,
          border: `1px solid ${service.color}33`,
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 relative"
        style={{
          background: `${service.color}15`,
          border: `1px solid ${service.color}30`,
          boxShadow: `0 0 20px ${service.glow}`,
          transform: 'translateZ(20px)',
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-3"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-primary)',
          transform: 'translateZ(15px)',
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-muted)',
          transform: 'translateZ(10px)',
        }}
      >
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        }}
        ref={el => {
          if (el) {
            cardRef.current?.addEventListener('mouseenter', () => {
              gsap.to(el, { width: '100%', duration: 0.4 })
            })
            cardRef.current?.addEventListener('mouseleave', () => {
              gsap.to(el, { width: '0%', duration: 0.4 })
            })
          }
        }}
      />

      {/* Index number */}
      <div
        className="absolute top-4 right-5 font-mono text-xs"
        style={{
          color: `${service.color}50`,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const cardsRef = useRef([])

  const onCardMount = useCallback((el, i) => {
    cardsRef.current[i] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true },
        })
      }

      const cards = cardsRef.current.filter(Boolean)
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        })
      }
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section section-transition"
      style={{ background: '#FFFFFF' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(153,194,77,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(153,194,77,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,600px)] h-[min(100vw,600px)] max-w-[100vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(153,194,77,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-transition-inner relative services-section__wrap">
        <Scene3DAccent className="scene-accent--services-right top-8 -right-8 md:right-4" variant="solar" opacity={0.45} />
        <Scene3DAccent className="scene-accent--services-left" variant="energy" opacity={0.32} />
      <div className="section-inner relative z-10 services-section__inner">
        {/* Section header */}
        <div ref={headingRef} className="section-header">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              fontFamily: 'var(--font-sans)',
              color: '#99C24D',
              border: '1px solid rgba(153,194,77,0.3)',
              background: 'rgba(153,194,77,0.08)',
            }}
          >
            What We Offer
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}
          >
            Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #99C24D, #27A8E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Services
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: 1.8,
            }}
          >
            From installation to maintenance — complete solar and electrical solutions
            tailored for every need in Bangalore and beyond.
          </p>
        </div>

        {/* Cards grid */}
        <div className="section-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              onCardMount={onCardMount}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}