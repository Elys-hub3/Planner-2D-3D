import { create } from 'zustand'
//import {SceneManager } from "@/services/SceneManager.service"

import {
  ToolType,
  ViewMode,
  Group,
  Guide,
  Layer
} from '@/types/planner.types'

type PlannerState = {
  guides: Guide[];
  layers: Layer[];
  groups: Group[];

  addGuide: (g: Guide) => void;
  addLayer: (l: Layer) => void;
  addGroup: (g: Group) => void;

  toggleLayer: (id: string) => void;
  deleteLayer: (id: string) => void;
  editLayer: (id: string, updates: Partial<Layer>) => void;

  toggleGroup: (id: string) => void;
  deleteGroup: (id: string) => void;
  editGroup: (id: string, updates: Partial<Layer>) => void;
  toggleGroupVisibility: (id: string) => void;
};

export interface HistoryState {
  objects: PlannerObject[];
}

export interface PlannerObject {
  id: string

  type: string

  name: string

  visible: boolean

  locked: boolean

  layerId: string

  position: {
    x: number
    y: number
    z: number
  }

  rotation: {
    x:number
    y:number
    z:number
  }

  scale: {
    x:number
    y:number
    z:number
  }

  data: any
}

interface PlannerStore {
  currentTool: ToolType

  selectedObjectId: string | null

  viewMode: ViewMode

  objects: PlannerObject[]

  activeLayerId: string

  history: HistoryState[];

  future: HistoryState[]

  saveHistory: () => void

  undo: () => void

  redo: () => void

  setTool: (
    tool: ToolType
  ) => void

  setSelectedObject: (
    id: string | null
  ) => void

  setViewMode: (
    mode: ViewMode
  ) => void

  setActiveLayer: (
    id: string
  ) => void

  addObject: (
    object: PlannerObject
  ) => void

  updateObject: (
    id: string,
    updates: Partial<PlannerObject>
  ) => void

  removeObject: (
    id: string
  ) => void

  loadObjects: (
    objects: PlannerObject[]
  ) => void

  loadTemplate: (
    objects: PlannerObject[]
  ) => void
}

export const usePlannerStore =
  create<PlannerStore>((set) => ({
    currentTool: 'select',

    selectedObjectId: null,

    viewMode: '2D',

    objects: [],

    activeLayerId: "default",

    history: [],

    future: [],

    setTool: (tool) =>
      set({
        currentTool: tool,
      }),

    setSelectedObject: (id) =>
      set({
        selectedObjectId: id,
      }),

    setViewMode: (mode) =>
      set({
        viewMode: mode,
      }),

    setActiveLayer: (id) =>
      set({
        activeLayerId: id,
      }),

    //addObject: (object) =>
      //set((state) => ({
        //objects: Array.isArray(state.objects)
         // ? [...state.objects, object]
          //: [object],
      //})),

    addObject: (object) =>
      set((state) => ({
        history: [
          ...state.history,
          {
            objects: structuredClone(
              Array.isArray(state.objects)
                ? state.objects
                : []
            ),
          },
        ],
    
        future: [],
    
        objects: Array.isArray(
          state.objects
        )
          ? [...state.objects, object]
          : [object],
      })),

    updateObject: (id, updates) =>
      set((state) => ({
        history: [
          ...state.history,
          {
            objects:
              structuredClone(
                state.objects
              ),
          },
        ],
    
        future: [],
    
        objects:
          state.objects.map(
            (obj) =>
              obj.id === id
                ? {
                    ...obj,
                    ...updates,
                    data: {
                      ...obj.data,
                      ...updates.data,
                    },
                  }
                : obj
          ),
      })),

    removeObject: (id) =>
      set((state) => ({
        history: [
          ...state.history,
          {
            objects:
              structuredClone(
                state.objects
              ),
          },
        ],
    
        future: [],
    
        objects:
          state.objects.filter(
            (obj) =>
              obj.id !== id
          ),
      })),

    loadObjects: (objects) =>
      set({
        objects: Array.isArray(objects) ? objects : [],
      }),
    loadTemplate: (objects) =>
      set({
        objects,
      }),

    saveHistory: () =>
      set((state) => ({
        history: [
          ...state.history,
          {
            objects: structuredClone(
              state.objects
            ),
          },
        ],
        future: [],
      })),

    undo: () =>
      set((state) => {
    
        if (
          state.history.length === 0
        ) {
          return {}
        }
    
        const previous =
          state.history[
            state.history.length - 1
          ]
    
        return {
          objects:
            previous.objects,
    
          history:
            state.history.slice(
              0,
              -1
            ),
    
          future: [
            {
              objects:
                state.objects,
            },
            ...state.future,
          ],
        }
      }),

    redo: () =>
      set((state) => {
    
        if (
          state.future.length === 0
        ) {
          return {}
        }
    
        const next =
          state.future[0]
    
        return {
          objects:
            next.objects,
    
          future:
            state.future.slice(1),
    
          history: [
            ...state.history,
            {
              objects:
                state.objects,
            },
          ],
        }
      }),
  }))

export const usePlannerState = create<PlannerState>((set) => ({
  guides: [],
  layers: [
  {
    id: "default",
    name: "Default",
    altitude: 0,
    visible: true,
    elementIds: [],
    locked: true,
    opacity: 0.5,
    mode: "2D",
  },
  {
    id: "default1",
    name: "Default1",
    altitude: 0,
    visible: true,
    elementIds: [],
    locked: true,
    opacity: 0.5,
    mode: "3D",
  },
  {
    id: "default2",
    name: "Default2",
    altitude: 0,
    visible: true,
    elementIds: [],
    locked: true,
    opacity: 0.5,
    mode: "2D",
  },
  ],
  groups: [
  {
    id: "default",
    name: "Default",
    elementIds: [],
    visible: true,
    linked: true,
  },
  {
    id: "default1",
    name: "Default1",
    elementIds: [],
    visible: true,
    linked: true,
  },
  {
    id: "default2",
    name: "Default2",
    elementIds: [],
    visible: true,
    linked: true,
  }
  ],

  addGuide: (g) =>
    set((state) => ({ guides: [...state.guides, g] })),

  addLayer: (l) =>
    set((state) => ({ layers: [...state.layers, l] })),

  addGroup: (g) =>
    set((state) => ({ groups: [...state.groups, g] })),

  toggleLayer: (id) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, visible: !l.visible } : l
      ),
    })),

  deleteLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((l) => l.id !== id),
    })),
  
  editLayer: (id,updates) =>
    set((state) => ({
      layers: state.layers.map(
        (layer) =>
          layer.id === id
            ? {
                ...layer,
                ...updates,
              }
            : layer
      ),
    })),

  toggleGroup: (id) =>
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === id ? { ...g, visible: !g.visible } : g
      ),
    })),

  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    })),

  editGroup: (
    id,
    updates
  ) =>
    set((state) => ({
      groups: state.groups.map(
        (group) =>
          group.id === id
            ? {
                ...group,
                ...updates,
              }
            : group
      ),
    })),
    
  toggleGroupVisibility: (id) =>
  set((state) => ({
    groups: state.groups.map((g) =>
      g.id === id ? { ...g, visible: !g.visible } : g
    ),
  })),
  
}));
