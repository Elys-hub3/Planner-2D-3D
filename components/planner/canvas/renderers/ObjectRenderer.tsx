'use client'

import { usePlannerState, usePlannerStore } from '@/store/planner.store'

import WallObject from './objects/WallObject'
import DoorObject from './objects/DoorObject'
import WindowObject from './objects/WindowObject'
import StairObject from './objects/StairObject'
import FurnitureObject from './objects/FurnitureObject'

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
            case object.type.startsWith('wall'):
              return (
                <WallObject
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

            case object.type === 'chair':
            case object.type === 'table':
              return (
                <FurnitureObject
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
