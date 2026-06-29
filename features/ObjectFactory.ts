import { WallFactory } from "./walls/wallFactory";
import { DoorFactory } from "./doors/doorFactory";
import { WindowFactory } from "./windows/windowFactory";
import { ChairFactory } from "./furniture/chairFactory";

export const ObjectFactory = {
  create(type: string) {

    // WALLS
    if (type.startsWith("wall")) {
      return WallFactory.create();
    }

    // DOORS
    if (type.startsWith("door")) {
      return DoorFactory.create();
    }

    // WINDOWS
    if (type.startsWith("window")) {
      return WindowFactory.create();
    }

    // CHAIR
    if (type === "chair") {
      return ChairFactory.create();
    }

    return null;
  },
};
