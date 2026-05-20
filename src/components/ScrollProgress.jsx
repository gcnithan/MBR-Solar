import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    )
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #99C24D, #27A8E0, #2E3192)',
        boxShadow: '0 0 12px rgba(153,194,77,0.6)',
      }}
      aria-hidden="true"
    />
  )
}
