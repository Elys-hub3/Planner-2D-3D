import * as THREE from "three";


export const AreaFactory = {

  create(object: any) {

    const texture =
      new THREE.TextureLoader().load(
        object.texture
      );

    texture.wrapS =
      THREE.RepeatWrapping;

    texture.wrapT =
      THREE.RepeatWrapping;

    texture.repeat.set(
      10,
      10
    );

    const material =
      new THREE.MeshStandardMaterial({
        map: texture,
      });

    const geometry =
      new THREE.PlaneGeometry(
        500,
        500
      );

    const floor =
      new THREE.Mesh(
        geometry,
        material
      );

    floor.rotation.x =
      -Math.PI / 2;

    floor.userData.type =
      "area";

    return floor;
  },

  serialize(mesh: { uuid: any; position: { x: any; y: any; z: any; }; rotation: { x: any; y: any; z: any; }; scale: { x: any; y: any; z: any; }; userData: any; }) {
    return {
      id: mesh.uuid,
      type: "area",

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
    const floor =
      this.create(Object);  

    floor.position.set(
      data.position.x,
      data.position.y,
      data.position.z
    );

    return floor;
  },
}
