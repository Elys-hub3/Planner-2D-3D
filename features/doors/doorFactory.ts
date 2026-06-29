import { DoorMesh }
from "./doorMesh";

export const DoorFactory = {
  create() {
    const door =
      DoorMesh();

    door.userData.type =
      "door";

    return door;
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
      type: "door",
      position: mesh.position,
      rotation: mesh.rotation,
      scale: mesh.scale,
    };
  },

  deserialize(data: { position: { x: number; y: number; z: number; }; }) {
    const door =
      this.create();

    door.position.set(
      data.position.x,
      data.position.y,
      data.position.z
    );

    return door;
  },
};