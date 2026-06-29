import { create } from "zustand";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface CameraStore {
  camera: THREE.PerspectiveCamera | null;
  controls: OrbitControls | null;

  setCamera: (
    camera: THREE.PerspectiveCamera
  ) => void;

  setControls: (
    controls: OrbitControls
  ) => void;
}

export const useCameraStore =
  create<CameraStore>((set) => ({
    camera: null,
    controls: null,

    setCamera: (camera) =>
      set({ camera }),

    setControls: (controls) =>
      set({ controls }),
  }));