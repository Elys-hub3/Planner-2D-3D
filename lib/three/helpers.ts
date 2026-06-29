import * as THREE from 'three'

export function createAxesHelper() {
  return new THREE.AxesHelper(5)
}

export function createFloor() {
  const geometry =
    new THREE.PlaneGeometry(
      200,
      200
    )

  const material =
    new THREE.MeshStandardMaterial({
      color: '#ffffff',
    })

  const floor = new THREE.Mesh(
    geometry,
    material
  )

  floor.rotation.x = -Math.PI / 2

  floor.receiveShadow = true

  return floor
}