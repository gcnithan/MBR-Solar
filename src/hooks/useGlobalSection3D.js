import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Subtle scroll depth + header entrances for all main sections.
 * Uses transform only (no opacity) to keep content visible.
 */
export function useGlobalSection3D() {
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('main .section-header').forEach((header) => {
        gsap.from(header, {
          y: 36,
          rotateX: 10,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            once: true,
          },
        })
      })

      gsap.utils.toArray('main .section').forEach((section) => {
        if (section.id === 'home') return
        const accent = section.querySelector('.scene-accent')
        if (accent) {
          gsap.fromTo(
            accent,
            { y: 30, scale: 0.92 },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'center center',
                scrub: 1.2,
              },
            }
          )
        }
      })
    }, main)

    return () => ctx.revert()
  }, [])
}
