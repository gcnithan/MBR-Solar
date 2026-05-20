import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SectionSpotlight({ activeIndex = 0 }) {
  const beamRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const sections = document.querySelectorAll('main .section-transition')
    const section = sections[activeIndex]
    if (!section || !beamRef.current || !glowRef.current) return

    const rect = section.getBoundingClientRect()
    const centerY = rect.top + rect.height * 0.35 + window.scrollY

    gsap.to(beamRef.current, {
      top: centerY,
      duration: 1.1,
      ease: 'power3.inOut',
    })

    gsap.fromTo(
      glowRef.current,
      { opacity: 0.4, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    )
  }, [activeIndex])

  if (activeIndex === 0) return null

  return (
    <div className="section-spotlight" aria-hidden="true">
      <div ref={beamRef} className="section-spotlight__beam" />
      <div ref={glowRef} className="section-spotlight__glow" />
    </div>
  )
}
