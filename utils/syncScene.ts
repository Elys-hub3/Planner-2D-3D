import { usePlannerState } from "@/store/planner.store";
import { sceneManager } from "@/services/sceneManagerInstance.service";

export function initSceneSync() {
  usePlannerState.subscribe(
    (state) => state.layers,
    () => {
      sceneManager.renderLayers();
    }
  );
}
