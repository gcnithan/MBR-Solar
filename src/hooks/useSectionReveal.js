import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSectionReveal() {
  useEffect(() => {
    const sections = gsap.utils.toArray('main .section-reveal')
    if (!sections.length) return

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.from(section, {
          y: 28,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
          },
        })
      })
      ScrollTrigger.refresh()
    }, document.querySelector('main'))

    return () => ctx.revert()
  }, [])
}
