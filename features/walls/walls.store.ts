import { create } from 'zustand'

import { Wall } from './walls.types'

interface WallStore {
  walls: Wall[]

  addWall: (
    wall: Wall
  ) => void

  removeWall: (
    id: string
  ) => void
}

export const useWallStore =
  create<WallStore>((set) => ({
    walls: [],

    addWall: (wall) =>
      set((state) => ({
        walls: [
          ...state.walls,
          wall,
        ],
      })),

    removeWall: (id) =>
      set((state) => ({
        walls:
          state.walls.filter(
            (wall) =>
              wall.id !== id
          ),
      })),
  }))