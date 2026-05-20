import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
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

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default function Testimonials() {
  const sectionRef = useRef()
  const trackRef = useRef()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.testimonial-panel'), {
        y: 28,
        duration: 0.8,
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
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track?.children[0]) return
    const slideWidth = track.children[0].offsetWidth
    gsap.to(track, {
      x: -active * slideWidth,
      duration: 0.65,
      ease: 'power2.out',
    })
  }, [active])

  useEffect(() => {
    const track = trackRef.current
    if (!track?.children[0]) return
    const onResize = () => {
      const w = track.children[0]?.offsetWidth ?? 0
      gsap.set(track, { x: -active * w })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  const goTo = useCallback((index) => {
    setActive((index + testimonials.length) % testimonials.length)
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section section-transition testimonials-section"
    >
      <div
        className="absolute inset-0 pointer-events-none testimonials-section__bg"
        aria-hidden="true"
      />
      <Scene3DAccent variant="stars" className="scene-accent--testimonials" opacity={0.35} />

      <div className="section-inner testimonials-section__inner relative z-10 max-w-3xl lg:max-w-4xl">
        <header className="section-header testimonials-section__head">
          <span className="section-badge">Client Stories</span>
          <h2 className="section-title">
            What our <span className="gradient-text">clients say</span>
          </h2>
          <p className="section-desc testimonials-section__sub">
            Real feedback from homeowners, businesses, and communities we&apos;ve helped switch to solar across Karnataka.
          </p>
        </header>

        <div className="testimonial-panel">
          <div className="testimonial-panel__viewport">
            <div ref={trackRef} className="testimonial-panel__track flex">
              {testimonials.map((t, i) => {
                const isActive = i === active
                return (
                  <div
                    key={t.name}
                    className="testimonial-slide-wrap min-w-full w-full shrink-0 box-border px-0.5 sm:px-1"
                  >
                    <Card3D
                      className={`testimonial-card rounded-2xl sm:rounded-3xl ${isActive ? 'testimonial-card--active' : 'testimonial-card--idle'}`}
                      glowColor={`${t.color}33`}
                      maxTilt={isActive ? 6 : 3}
                      style={{ '--tc': t.color }}
                    >
                      <div className="testimonial-card__top">
                        <Quote className="testimonial-card__mark" size={28} strokeWidth={1.25} aria-hidden />
                        <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} size={15} fill="#F49021" color="#E87A1A" aria-hidden />
                          ))}
                        </div>
                      </div>

                      <blockquote className="testimonial-card__quote">
                        <span className="testimonial-card__quote-text">{t.text}</span>
                      </blockquote>

                      <footer className="testimonial-card__author">
                        <div
                          className="testimonial-card__avatar"
                          style={{
                            background: `linear-gradient(145deg, ${t.color}, #2E3192)`,
                          }}
                          aria-hidden
                        >
                          {initialsFromName(t.name)}
                        </div>
                        <div className="testimonial-card__meta min-w-0">
                          <cite className="testimonial-card__name not-italic">{t.name}</cite>
                          <p className="testimonial-card__role" style={{ color: t.color }}>
                            {t.role}
                          </p>
                        </div>
                      </footer>
                    </Card3D>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <nav className="testimonial-controls" aria-label="Testimonial carousel">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            data-cursor
            className="testimonial-controls__btn"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <div className="testimonial-controls__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`testimonial-controls__dot ${i === active ? 'is-active' : ''}`}
                aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            data-cursor
            className="testimonial-controls__btn"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </nav>
      </div>
    </section>
  )
}
