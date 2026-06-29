import * as THREE from "three";

export function WallMesh(
  width = 300,
  height = 250,
  thickness = 20
) {
  const geometry =
    new THREE.BoxGeometry(
      width,
      height,
      thickness
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: "#d8d8d8",
    });

  return new THREE.Mesh(
    geometry,
    material
  );
}