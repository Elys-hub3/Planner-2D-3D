import * as THREE from 'three'

export function createScene() {
  const scene = new THREE.Scene()

  scene.background = new THREE.Color(
    '#f4f4f5'
  )

  scene.fog = new THREE.Fog(
    '#f4f4f5',
    10,
    120
  )

  return scene
}