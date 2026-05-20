import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Tracks active section for spotlight only — no transform/opacity on content
 * (3D fall-off was clipping content inside overflow:hidden sections).
 */
export function useSectionTransitions(onSectionChange) {
  const onChangeRef = useRef(onSectionChange)
  onChangeRef.current = onSectionChange

  useEffect(() => {
    const sections = document.querySelectorAll('main .section-transition')
    if (!sections.length) return

    const triggers = []

    sections.forEach((section, index) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => onChangeRef.current?.(index),
        onEnterBack: () => onChangeRef.current?.(index),
      })
      triggers.push(st)
    })

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((st) => st.kill())
    }
  }, [])
}
