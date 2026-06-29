import * as THREE from "three";
import { WallMesh } from "./wallMesh";

export const WallFactory = {
  create() {
    const wall = WallMesh();

    wall.userData = {
      type: "wall",
      width: 300,
      height: 250,
      thickness: 20,
    };

    return wall;
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

  serialize(mesh: { uuid: any; position: { x: any; y: any; z: any; }; rotation: { x: any; y: any; z: any; }; scale: { x: any; y: any; z: any; }; userData: any; }) {
    return {
      id: mesh.uuid,
      type: "wall",

      position: {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
      },

      rotation: {
        x: mesh.rotation.x,
        y: mesh.rotation.y,
        z: mesh.rotation.z,
      },

      scale: {
        x: mesh.scale.x,
        y: mesh.scale.y,
        z: mesh.scale.z,
      },

      metadata: mesh.userData,
    };
  },

  deserialize(data: { position: { x: number; y: number; z: number; }; }) {
    const wall =
      this.create();

    wall.position.set(
      data.position.x,
      data.position.y,
      data.position.z
    );

    return wall;
  },
};