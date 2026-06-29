import { SceneManager } from "./SceneManager.service";
import { usePlannerState } from "@/store/planner.store";

export const sceneManager = new SceneManager(
  usePlannerState
);
