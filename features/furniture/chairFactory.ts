import * as THREE from "three";

export const ChairFactory = {
  create() {
    const group =
      new THREE.Group();

    const material =
      new THREE.MeshStandardMaterial({
        color: "#9b7653",
      });

    /*
      Assise
    */

    const seat =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          40,
          5,
          40
        ),
        material
      );

    seat.position.y = 25;

    group.add(seat);

    /*
      Dossier
    */

    const back =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          40,
          40,
          5
        ),
        material
      );

    back.position.set(
        0,
        45,
        -17
    );

    group.add(back);

    /*
      Pieds
    */

    const legGeo =
      new THREE.BoxGeometry(
        4,
        25,
        4
      );

    [
      [-18,12,-18],
      [18,12,-18],
      [-18,12,18],
      [18,12,18],
    ].forEach((p) => {

      const leg =
        new THREE.Mesh(
          legGeo,
          material
        );

      leg.position.set(
        p[0],
        p[1],
        p[2]
      );

      group.add(leg);
    });

    group.userData.type =
      "chair";

    return group;
  },

  serialize(mesh: { uuid: any; position: any; rotation: any; scale: any; }) {
    return {
      id: mesh.uuid,
      type: "chair",
      position: mesh.position,
      rotation: mesh.rotation,
      scale: mesh.scale,
    };
  },

  deserialize(data: { position: { x: number; y: number; z: number; }; }) {
    const chair =
      this.create();

    chair.position.set(
      data.position.x,
      data.position.y,
      data.position.z
    );

    return chair;
  },
};