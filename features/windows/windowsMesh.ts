import * as THREE from "three";

export function WindowMesh() {
  return new THREE.Mesh(
    new THREE.BoxGeometry(
      120,
      120,
      5
    ),

    new THREE.MeshStandardMaterial({
      color: "#8fd3ff",
      transparent: true,
      opacity: 0.5,
    })
  );
}