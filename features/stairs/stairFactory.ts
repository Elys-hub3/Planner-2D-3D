import * as THREE from "three";

export const StairFactory = {
  create() {
    const group = new THREE.Group();

    const stepMaterial =
      new THREE.MeshStandardMaterial({
        color: "#888888",
      });

    const stepCount = 8;

    for (let i = 0; i < stepCount; i++) {
      const step =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            80,
            10,
            20
          ),
          stepMaterial
        );

      step.position.set(
        0,
        i * 10,
        i * 20
      );

      group.add(step);
    }

    group.userData.type =
      "stair";

    return group;
  },
};