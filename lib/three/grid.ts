import * as THREE from 'three'

export function createGrid() {
  const grid =
    new THREE.GridHelper(
      100,
      100,
      '#d4d4d8',
      '#e4e4e7'
    )

  return grid
}