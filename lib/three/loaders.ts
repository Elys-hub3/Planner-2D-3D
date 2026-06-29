import {
    TextureLoader,
  } from 'three'
  
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  
  export const textureLoader =
    new TextureLoader()
  
  export const gltfLoader =
    new GLTFLoader()