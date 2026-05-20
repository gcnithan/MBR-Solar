import { useCardTilt3D } from '../hooks/useCardTilt3D'

export default function Card3D({
  children,
  className = '',
  glowColor = 'rgba(153, 194, 77, 0.25)',
  maxTilt = 10,
  style = {},
  ...rest
}) {
  const { cardRef, glowRef, onMouseMove, onMouseLeave } = useCardTilt3D({
    maxTilt,
    glowColor,
  })

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      <div
        ref={glowRef}
        className="card-3d__glow absolute inset-0 pointer-events-none rounded-[inherit] transition-all duration-200"
        aria-hidden="true"
      />
      <div className="card-3d__content relative z-[1]">{children}</div>
    </div>
  )
}
