import { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { configureRenderer, defaultGlProps } from '../utils/canvasGl'
import HeroSolarScene from './HeroSolarScene'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '200+', label: 'Projects' },
  { value: '150+', label: 'Clients' },
  { value: '6+', label: 'Years' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.hero__brand > *', {
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
      })
      gsap.from('.hero__tagline', {
        y: 36,
        duration: 0.85,
        ease: 'power4.out',
        clearProps: 'transform',
        delay: 0.12,
      })
      gsap.from('.hero__desc, .hero__actions, .hero__stats > *', {
        y: 24,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
        delay: 0.28,
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" ref={sectionRef} className="hero section-transition">
      <div className="hero__grid-pattern" aria-hidden="true" />
      <div className="hero__accent-arc" aria-hidden="true" />
      <div className="hero__accent-bar" aria-hidden="true" />

      <div className="hero__canvas" aria-hidden="true">
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 11], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ ...defaultGlProps, alpha: false }}
          onCreated={({ gl }) => configureRenderer(gl, { shadows: true })}
        >
          <Suspense fallback={null}>
            <HeroSolarScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero__sun" aria-hidden="true">
        <div className="hero__sun-core" />
        <div className="hero__sun-rays" />
      </div>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__brand">
            <span className="brand-lockup__mbr">MBR</span>
            <span className="brand-lockup__sub">Solar Solutions</span>
          </div>

          <h1 className="hero__tagline">
            Switchin&apos; on the <span className="hero__tagline-sun">sunshine</span>
          </h1>

          <p className="hero__desc">
            Affordable solar installation, maintenance, and electrical services for homes,
            businesses, and farms across Karnataka.
          </p>

          <div className="hero__actions">
            <a
              href="#services"
              className="hero__btn hero__btn--primary"
              onClick={(e) => { e.preventDefault(); scrollTo('services') }}
              data-cursor
            >
              Explore Services
              <ArrowRight size={18} aria-hidden />
            </a>
            <a
              href="#contact"
              className="hero__btn hero__btn--outline"
              onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
              data-cursor
            >
              Free Consultation
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollTo('services')}
        aria-label="Scroll to services"
        data-cursor
      >
        <ChevronDown size={22} />
      </button>
    </section>
  )
}
