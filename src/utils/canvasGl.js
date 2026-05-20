import * as THREE from 'three'

export function configureRenderer(gl, { shadows = false } = {}) {
  if (shadows) {
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFShadowMap
  }
}

export const defaultGlProps = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
}
