/**
 * @react-three/fiber v9 still constructs THREE.Clock internally (deprecated in three r183+).
 * @see https://github.com/pmndrs/react-three-fiber/issues/3741
 * Remove this filter after upgrading to @react-three/fiber v10+.
 */
if (import.meta.env.DEV) {
  const originalWarn = console.warn.bind(console)

  console.warn = (...args) => {
    const first = args[0]
    if (typeof first === 'string') {
      if (first.includes('THREE.Clock: This module has been deprecated')) return
      if (first.includes('PCFSoftShadowMap has been deprecated')) return
    }
    originalWarn(...args)
  }
}
