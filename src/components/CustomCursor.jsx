import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)')
    setEnabled(!coarse.matches)

    const onChange = (e) => setEnabled(!e.matches)
    coarse.addEventListener('change', onChange)
    return () => coarse.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = cursorDot.current
    const ring = cursorRing.current
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let frameId

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frameId = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', moveCursor)
    frameId = requestAnimationFrame(animateRing)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    const onEnter = () => {
      ring.style.width = '50px'
      ring.style.height = '50px'
      ring.style.borderColor = '#99C24D'
      ring.style.background = 'rgba(153,194,77,0.1)'
    }
    const onLeave = () => {
      ring.style.width = '30px'
      ring.style.height = '30px'
      ring.style.borderColor = 'rgba(153,194,77,0.6)'
      ring.style.background = 'transparent'
    }

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(frameId)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '6px',
          height: '6px',
          background: '#99C24D',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          marginLeft: '-3px',
          marginTop: '-3px',
        }}
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: '30px',
          height: '30px',
          border: '1.5px solid rgba(153,194,77,0.6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          marginLeft: '-15px',
          marginTop: '-15px',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
        }}
      />
    </>
  )
}
