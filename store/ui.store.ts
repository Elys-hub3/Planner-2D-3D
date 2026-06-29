import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean

  rightPanelOpen: boolean

  toggleSidebar: () => void

  toggleRightPanel: () => void
  
  setRightPanelOpen: (
    value: boolean
  ) => void
}

export const useUIStore =
  create<UIStore>((set) => ({
    sidebarOpen: true,

    rightPanelOpen: false,

    setRightPanelOpen: (
      value
    ) =>
      set({
        rightPanelOpen: value,
      }),

    toggleSidebar: () =>
      set((state) => ({
        sidebarOpen:
          !state.sidebarOpen,
      })),

    toggleRightPanel: () =>
      set((state) => ({
        rightPanelOpen:
          !state.rightPanelOpen,
      })),
  }))