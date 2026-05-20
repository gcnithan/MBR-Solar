import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Homeowner, Whitefield',
    text: 'MBR Solar installed a 5KW system on our rooftop. Our electricity bill dropped by 80%. Professional team and excellent after-sales support.',
    rating: 5,
    color: '#99C24D',
  },
  {
    name: 'Priya Sharma',
    role: 'Factory Owner, Peenya',
    text: 'Industrial solar installation was seamless. They handled permits, installation, and commissioning. Highly recommend for commercial projects.',
    rating: 5,
    color: '#3B82F6',
  },
  {
    name: 'Anil Reddy',
    role: 'Farmer, Kolar',
    text: 'Solar pump installation transformed our irrigation. Zero diesel costs now. MBR team was knowledgeable and completed work on schedule.',
    rating: 5,
    color: '#22C55E',
  },
  {
    name: 'Meera Nair',
    role: 'Apartment Association, Koramangala',
    text: 'Solar street lights for our community were installed perfectly. Great pricing and the maintenance contract gives us peace of mind.',
    rating: 5,
    color: '#8B5CF6',
  },
]

export default function Testimonials() {
  const sectionRef = useRef()
  const trackRef = useRef()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.testimonial-panel'), {
        y: 32,
        rotateX: 10,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track?.children[0]) return
    const slideWidth = track.children[0].offsetWidth
    gsap.to(track, {
      x: -active * slideWidth,
      duration: 0.8,
      ease: 'power3.inOut',
    })
  }, [active])

  const goTo = (index) => {
    setActive((index + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="section section-transition"
      style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.06) 0%, transparent 50%)' }} />
      <Scene3DAccent variant="stars" className="scene-accent--testimonials" opacity={0.42} />
      <div className="section-inner max-w-4xl relative z-10 testimonials-section__inner">
        <div className="section-header">
          <span className="section-badge">Client Stories</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="testimonial-panel relative overflow-hidden rounded-3xl" style={{ perspective: '1200px' }}>
          <div ref={trackRef} className="flex">
            {testimonials.map((t, i) => {
              const isActive = i === active
              return (
                <div key={t.name} className="min-w-full flex-shrink-0 px-2">
                  <Card3D
                    className={`p-8 md:p-10 rounded-3xl glass testimonial-slide ${isActive ? 'is-active' : ''}`}
                    glowColor={`${t.color}44`}
                    maxTilt={isActive ? 8 : 4}
                    style={{
                      border: `1px solid ${t.color}30`,
                      boxShadow: isActive ? `0 20px 60px ${t.color}20` : 'none',
                      opacity: isActive ? 1 : 0.65,
                    }}
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={16} fill="#F9AD42" color="#F49021" />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-6 italic"
                      style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>
                      "{t.text}"
                    </p>
                    <div>
                      <p className="font-bold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>{t.name}</p>
                      <p className="text-sm" style={{ color: t.color, fontFamily: 'var(--font-sans)' }}>{t.role}</p>
                    </div>
                  </Card3D>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-12">
          <button type="button" onClick={() => goTo(active - 1)} data-cursor
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 transition-colors"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} type="button" onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === active ? '#99C24D' : 'rgba(153,194,77,0.25)',
                  width: i === active ? '24px' : '8px',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(active + 1)} data-cursor
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 transition-colors"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
