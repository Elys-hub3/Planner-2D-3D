import * as THREE from "three";

export const RoundWallPocheFactory = {
  create(object: any) {

    const radius =
      object.data.radius;

    const thickness =
      object.data.thickness;

    const start =
      object.data.startAngle
      * Math.PI / 180;

    const end =
      object.data.endAngle
      * Math.PI / 180;

    const shape =
      new THREE.Shape();

    shape.absarc(
      0,
      0,
      radius,
      start,
      end
    );

    shape.absarc(
      0,
      0,
      radius - thickness,
      end,
      start,
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
        color: "#169af9",
      });

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    mesh.rotation.x =
      -Math.PI / 2;

    mesh.userData = {
      type: "round-wall-poche",
      planner: true,
    };

    return mesh;
  },
};