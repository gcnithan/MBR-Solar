import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

/**
 * Mouse-follow 3D tilt for cards (same feel as Services cards).
 * Does not touch opacity — safe for visibility.
 */
export function useCardTilt3D({
  maxTilt = 10,
  scale = 1.03,
  perspective = 800,
  glowColor = 'rgba(146, 200, 62, 0.25)',
} = {}) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -maxTilt
      const rotY = ((x - cx) / cx) * maxTilt

      gsap.to(card, {
        rotationX: rotX,
        rotationY: rotY,
        scale,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: perspective,
      })

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`
      }
    },
    [maxTilt, scale, perspective, glowColor]
  )

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.7)',
    })
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }, [])

  return { cardRef, glowRef, onMouseMove, onMouseLeave }
}
