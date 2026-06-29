import { create } from 'zustand'

import { Door } from './doors.types'

interface DoorStore {
  doors: Door[]

  addDoor: (
    door: Door
  ) => void
}

export const useDoorStore =
  create<DoorStore>((set) => ({
    doors: [],

    addDoor: (door) =>
      set((state) => ({
        doors: [
          ...state.doors,
          door,
        ],
      })),
  }))