import * as THREE from 'three'

export function createCamera(
  width: number,
  height: number
) {
  const camera =
    new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      1000
    )

  camera.position.set(10, 10, 10)

  camera.lookAt(0, 0, 0)

  return camera
}