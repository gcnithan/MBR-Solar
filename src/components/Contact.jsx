import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { configureRenderer, defaultGlProps } from '../utils/canvasGl'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react'
import Scene3DAccent from './Scene3DAccent'

gsap.registerPlugin(ScrollTrigger)

function ContactOrb() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.25
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4
  })

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color="#27A8E0"
          emissive="#99C24D"
          emissiveIntensity={0.9}
          distort={0.3}
          speed={2.5}
        />
      </mesh>
    </Float>
  )
}

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#27A8E0" />
      <ContactOrb />
    </>
  )
}

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@mbrsolar.com',
    href: 'mailto:info@mbrsolar.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bangalore, Karnataka, India',
    href: null,
  },
]

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll(
        '.contact-form-panel, .contact-info-card, .contact-map-card'
      )
      gsap.from(blocks, {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Website enquiry — MBR Solar Solutions')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@mbrsolar.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section section-transition contact-section"
    >
      <Scene3DAccent variant="energy" className="scene-accent--contact-left" opacity={0.32} />

      <div
        className="contact-3d-bg"
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={defaultGlProps}
          onCreated={({ gl }) => configureRenderer(gl)}
        >
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="section-inner relative z-[2]">
        <header className="contact-page-head section-header">
          <span className="section-badge">Get in touch</span>
          <h2 className="section-title">
            Start your{' '}
            <span className="gradient-text">solar journey</span>
          </h2>
          <p className="section-desc">
            Book a free consultation and site visit across Bangalore. Tell us what you need — we&apos;ll
            reply within one business day.
          </p>
          <p
            className="section-desc"
            style={{
              marginTop: '0.5rem',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'var(--brand-blue-secondary)',
            }}
          >
            Switchin&apos; on the sunshine
          </p>
        </header>

        <div className="contact-layout">
          <div className="contact-form-panel">
            <div className="contact-form-panel__header">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-green), var(--brand-blue-light))',
                  boxShadow: '0 8px 20px rgba(153, 194, 77, 0.35)',
                }}
              >
                <MessageSquare size={22} strokeWidth={2} aria-hidden />
              </div>
              <div>
                <h3
                  className="text-lg font-bold md:text-xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Send a message
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Fields marked with your details help us prepare an accurate quote.
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label className="contact-field">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={setField('name')}
                    required
                    data-cursor
                  />
                </label>
                <label className="contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={setField('email')}
                    required
                    data-cursor
                  />
                </label>
              </div>
              <label className="contact-field">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+91 …"
                  value={form.phone}
                  onChange={setField('phone')}
                  data-cursor
                />
              </label>
              <label className="contact-field">
                <span>How can we help?</span>
                <textarea
                  name="message"
                  placeholder="Rooftop size, timeline, or questions about solar / electrical work…"
                  value={form.message}
                  onChange={setField('message')}
                  rows={5}
                  required
                  data-cursor
                />
              </label>
              <button type="submit" className="contact-submit" data-cursor>
                <Send size={18} aria-hidden />
                Send message
              </button>
            </form>
          </div>

          <aside className="contact-sidebar">
            <div className="contact-info-cards">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="contact-info-card__icon">
                      <Icon size={20} strokeWidth={2} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="contact-info-card__label">{label}</div>
                      {href ? (
                        <span className="contact-info-card__value block contact-info-card__value--clip">{value}</span>
                      ) : (
                        <span className="contact-info-card__value block">{value}</span>
                      )}
                    </div>
                  </>
                )

                const isWide = label === 'Location'

                if (href) {
                  return (
                    <a
                      key={label}
                      href={href}
                      className={`contact-info-card${isWide ? ' contact-info-card--wide' : ''}`}
                      data-cursor
                    >
                      {inner}
                    </a>
                  )
                }

                return (
                  <div key={label} className={`contact-info-card${isWide ? ' contact-info-card--wide' : ''}`}>
                    {inner}
                  </div>
                )
              })}
            </div>

            <div className="contact-map-card">
              <div className="contact-map-card__header">
                <h3>Visit us in Bangalore</h3>
                <p>Explore options in person — we&apos;re happy to walk you through designs and savings.</p>
              </div>
              <iframe
                title="MBR Solar Solutions location"
                src="https://maps.google.com/maps?q=Bangalore%2C%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
