import { loadModel } from '@/services/ModelLoader.service';

export const ChairFactory1 = {

  async create() {

    const model =
      await loadModel(
        "/planner/catalog/models/chair.glb"
      );

    model.userData = {
      type: "chair",
      planner: true,
    };

    return model;
  },
};