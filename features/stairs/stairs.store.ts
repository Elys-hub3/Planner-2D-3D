import { create } from 'zustand'

import { Stair } from './stairs.types'

interface StairStore {
  stairs: Stair[]

  addStair: (
    stair: Stair
  ) => void
}

export const useStairStore =
  create<StairStore>((set) => ({
    stairs: [],

    addStair: (stair) =>
      set((state) => ({
        stairs: [
          ...state.stairs,
          stair,
        ],
      })),
  }))