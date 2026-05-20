import * as THREE from 'three'

let cachedTexture = null

/** Procedural PV cell grid texture — reads as real panels at distance */
export function getSolarCellTexture() {
  if (cachedTexture) return cachedTexture

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#060d14'
  ctx.fillRect(0, 0, size, size)

  const cols = 6
  const rows = 10
  const pad = 4
  const cw = size / cols
  const ch = size / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = ((r + c) % 4) * 10
      ctx.fillStyle = `rgb(${14 + v}, ${28 + v}, ${48 + v})`
      ctx.fillRect(c * cw + pad, r * ch + pad, cw - pad * 2, ch - pad * 2)
      ctx.fillStyle = 'rgba(140, 180, 220, 0.12)'
      ctx.fillRect(c * cw + pad, r * ch + pad, cw - pad * 2, 3)
    }
  }

  ctx.strokeStyle = 'rgba(200, 210, 220, 0.85)'
  ctx.lineWidth = 2
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath()
    ctx.moveTo(c * cw, 0)
    ctx.lineTo(c * cw, size)
    ctx.stroke()
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath()
    ctx.moveTo(0, r * ch)
    ctx.lineTo(size, r * ch)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  cachedTexture = texture
  return texture
}
