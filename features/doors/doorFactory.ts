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