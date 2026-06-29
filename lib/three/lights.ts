import * as THREE from 'three'

export function createLights(
  scene: THREE.Scene
) {
  // Ambient Light
  const ambientLight =
    new THREE.AmbientLight(
      0xffffff,
      0.8
    )

  scene.add(ambientLight)

  // Directional Light
  const directionalLight =
    new THREE.DirectionalLight(
      0xffffff,
      1.2
    )

  directionalLight.position.set(
    20,
    30,
    20
  )

  directionalLight.castShadow = true

  directionalLight.shadow.mapSize.width =
    2048

  directionalLight.shadow.mapSize.height =
    2048

  directionalLight.shadow.camera.near =
    0.5

  directionalLight.shadow.camera.far =
    100

  scene.add(directionalLight)

  return {
    ambientLight,
    directionalLight,
  }
}