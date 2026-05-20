import { useCardTilt3D } from '../hooks/useCardTilt3D'

export default function TiltButton({
  children,
  className = '',
  href,
  onClick,
  glowColor = 'rgba(153, 194, 77, 0.35)',
  maxTilt = 12,
  style = {},
  ...rest
}) {
  const { cardRef, glowRef, onMouseMove, onMouseLeave } = useCardTilt3D({
    maxTilt,
    scale: 1.06,
    glowColor,
    perspective: 900,
  })

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={cardRef}
      href={href}
      onClick={onClick}
      className={`tilt-btn card-3d ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      <span
        ref={glowRef}
        className="card-3d__glow absolute inset-0 pointer-events-none rounded-[inherit]"
        aria-hidden="true"
      />
      <span className="tilt-btn__label relative z-[1]">{children}</span>
    </Tag>
  )
}
