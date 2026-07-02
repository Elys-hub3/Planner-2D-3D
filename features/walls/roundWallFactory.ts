import * as THREE from "three";

export const RoundWallFactory = {
  create(object: any) {

    const radius =
      object.data?.radius ?? 120;

    const thickness =
      object.data?.thickness ?? 20;

    const startAngle =
      (object.data?.startAngle ?? 0)
      * Math.PI / 180;

    const endAngle =
      (object.data?.endAngle ?? 180)
      * Math.PI / 180;

    const shape =
      new THREE.Shape();

    shape.absarc(
      0,
      0,
      radius,
      startAngle,
      endAngle,
      false
    );

    shape.absarc(
      0,
      0,
      radius - thickness,
      endAngle,
      startAngle,
      true
    );

    const geometry =
      new THREE.ExtrudeGeometry(
        shape,
        {
          depth: 250,
          bevelEnabled: false,
        }
      );

    const material =
      new THREE.MeshStandardMaterial({
        color: "#d6d3d1",
      });

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    mesh.rotation.x =
      -Math.PI / 2;

    mesh.userData = {
      type: "round-wall",
      planner: true,
    };

    return mesh;
  },
};