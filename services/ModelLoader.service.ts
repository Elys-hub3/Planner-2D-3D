import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadModel(
  path: string
) {

  const loader =
    new GLTFLoader();

  return new Promise<any>(
    (resolve, reject) => {

      loader.load(
        path,

        (gltf) =>
          resolve(gltf.scene),

        undefined,

        reject
      );
    }
  );
}