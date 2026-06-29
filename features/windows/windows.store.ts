import { create } from 'zustand'

import { WindowObject } from './windows.types'

interface WindowStore {
  windows: WindowObject[]

  addWindow: (
    window: WindowObject
  ) => void
}

export const useWindowStore =
  create<WindowStore>((set) => ({
    windows: [],

    addWindow: (window) =>
      set((state) => ({
        windows: [
          ...state.windows,
          window,
        ],
      })),
  }))