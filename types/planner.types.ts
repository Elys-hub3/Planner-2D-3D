export type ViewMode = '2D' | '3D'

export type ToolType =
  | 'select'
  | 'wall'
  | 'door'
  | 'window'
  | 'stairs'
  | 'furniture'

export interface PlannerState {
  currentTool: ToolType
  selectedObjectId: string | null
  viewMode: ViewMode
}

export type Guide = {
  id: string;
  orientation: "horizontal" | "vertical";
  value: number; // position
};

export type Layer = {
  id: string;
  name: string;
  altitude: number;
  visible: boolean;
  elementIds: string[]; // ids des objets
  locked?: boolean;
  opacity?: number;
  mode?: "2D" | "3D";
};

export type Group = {
  id: string;
  name: string;
  elementIds: string[];
  visible: boolean;
  linked: boolean;
};