import { create } from 'zustand'

import { Furniture } from './furnitures.types'

interface FurnitureStore {
  furnitures: Furniture[]

  addFurniture: (
    furniture: Furniture
  ) => void
}

export const useFurnitureStore =
  create<FurnitureStore>(
    (set) => ({
      furnitures: [],

      addFurniture: (
        furniture
      ) =>
        set((state) => ({
          furnitures: [
            ...state.furnitures,
            furniture,
          ],
        })),
    })
  )