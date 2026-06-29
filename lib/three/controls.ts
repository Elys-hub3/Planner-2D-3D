import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createControls(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const controls =
    new OrbitControls(
      camera,
      renderer.domElement
    )

  controls.enableDamping = true

  controls.dampingFactor = 0.08

  controls.enablePan = true

  controls.enableZoom = true

  controls.minDistance = 2

  controls.maxDistance = 80

  controls.maxPolarAngle =
    Math.PI / 2.05

  return controls
}