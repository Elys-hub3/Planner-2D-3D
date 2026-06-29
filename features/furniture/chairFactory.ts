import * as THREE from "three";

export const ChairFactory = {
  create() {
    const chair =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          50,
          50,
          50
        ),

        new THREE.MeshStandardMaterial({
          color: "#9b7653",
        })
      );

    chair.userData.type =
      "chair";

    return chair;
  },

  update(mesh: { position: { set: (arg0: any, arg1: any, arg2: any) => void; x: any; y: any; z: any; }; }, data: { position: { x: any; y: any; z: any; }; }) {
    mesh.position.set(
      data.position?.x ?? mesh.position.x,
      data.position?.y ?? mesh.position.y,
      data.position?.z ?? mesh.position.z
    );
  },

  delete(scene: { remove: (arg0: any) => void; }, mesh: any) {
    scene.remove(mesh);
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