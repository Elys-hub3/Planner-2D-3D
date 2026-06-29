import * as THREE from "three";

export function DoorMesh() {
  return new THREE.Mesh(
    new THREE.BoxGeometry(
      90,
      210,
      5
    ),

    new THREE.MeshStandardMaterial({
      color: "#7A5230",
    })
  );
}