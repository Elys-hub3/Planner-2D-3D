import { WallFactory } from "./walls/wallFactory";
import { DoorFactory } from "./doors/doorFactory";
import { WindowFactory } from "./windows/windowFactory";
import { ChairFactory } from "./furniture/chairFactory";
import { AreaFactory } from "./areas/areaFactory";
import { StairFactory } from "./stairs/stairFactory";
import { RoundWallFactory } from "./walls/roundWallFactory";
import { RoundWallPocheFactory } from "./walls/roundWallPocheFactory";

export const ObjectFactory = {
  create(type: string, object?: any) {

    // WALLS
    if (type.startsWith("wall")) {
      return WallFactory.create(object);
    }

    if (type === 'round-wall') {
      return RoundWallFactory.create(
        object
      );
    }

    if (type === 'round-wall-poche') {
      return RoundWallPocheFactory.create(
        object
      );
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
    if (type.startsWith("chair")) {
      return ChairFactory.create();
    }

    //area
    if (type.startsWith("area")) {
      return AreaFactory.create(object)
    }

    //
    if (type.startsWith("stair")) {
      return StairFactory.create()
    }

    return null;
  },
};
