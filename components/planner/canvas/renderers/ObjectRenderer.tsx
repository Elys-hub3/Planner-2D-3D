'use client'

import { usePlannerState, usePlannerStore } from '@/store/planner.store'

import WallObject from './objects/WallObject'
import DoorObject from './objects/DoorObject'
import WindowObject from './objects/WindowObject'
import StairObject from './objects/StairObject'
import FurnitureObject from './objects/FurnitureObject'
import WallPocheObject from './objects/WallPocheObject'
import AreaObject from './objects/AreaObject'
import ChairObject from './objects/ChairObject'
import TableObject from './objects/TableObject'
import RoundWallPocheObject from './objects/RoundWallPocheObject'
import RoundWallObject from './objects/RoundWallObject'

export default function ObjectRenderer() {
  const objects = usePlannerStore(
    (state) => state.objects
  )
  const layers =
    usePlannerState(
      (s) => s.layers
    )

  const visibilityMap =
    new Map(
      layers.map((l) => [
        l.id,
        l.visible,
      ])
    )

  return (
    <>
      {Array.isArray(objects) && 
        objects
        .filter(
            (object) =>
              visibilityMap.get(
                object.layerId
              ) !== false
          )
        .map((object) => {
          switch (true) {
            case object.type.startsWith('wall') &&
                 object.type !== 'wall-poche':
                return(
                  <WallObject
                    key={object.id}
                    object={object}
                  />
                )

            case object.type === 'wall-poche':
              return(
                <WallPocheObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type === 'round-wall':
              return(
                <RoundWallObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type === 'round-wall-poche':
              return(
                <RoundWallPocheObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type.startsWith('door'):
              return (
                <DoorObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type.startsWith('window'):
              return (
                <WindowObject
                  key={object.id}
                  object={object}
                />
              )
              
            case object.type.startsWith('stair'):
              return (
                <StairObject
                  key={object.id}
                  object={object}
                />
              )
            
            case object.type.startsWith('area'):
              return (
                <AreaObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type === 'chair':
              return (
                <ChairObject
                  key={object.id}
                  object={object}
                />
              )

            case object.type === 'table':
              return (
                <TableObject
                  key={object.id}
                  object={object}
                />
              )

            default:
              return null
          }
        })}
    </>
  )
}
