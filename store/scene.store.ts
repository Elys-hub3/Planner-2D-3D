import { create } from 'zustand'

interface SceneStore {
  zoom: number

  gridVisible: boolean

  snapEnabled: boolean

  setZoom: (
    zoom: number
  ) => void

  toggleGrid: () => void

  toggleSnap: () => void
}

export const useSceneStore =
  create<SceneStore>((set) => ({
    zoom: 1,

    gridVisible: true,

    snapEnabled: true,

    setZoom: (zoom) =>
      set({
        zoom,
      }),

    toggleGrid: () =>
      set((state) => ({
        gridVisible:
          !state.gridVisible,
      })),

    toggleSnap: () =>
      set((state) => ({
        snapEnabled:
          !state.snapEnabled,
      })),
  }))