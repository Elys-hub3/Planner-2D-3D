'use client'

import { usePlannerStore } from '@/store/planner.store'
import {
  Rect
} from 'react-konva'

export default function AreaObject({
  object,
}: any) {

  const updateObject =
    usePlannerStore(
      (s) => s.updateObject
    )

  const setSelectedObject =
    usePlannerStore(
      (s) => s.setSelectedObject
    )
    
  const selectedObjectId =
    usePlannerStore(
      (s) => s.selectedObjectId
    )

  return (
    <Rect
      x={object.position.x}
      y={object.position.y}
      rotation={
        (object.rotation?.z ?? 0) * 180 / Math.PI
      }

      width={150}
      height={150}

      fill="#cd5d5c"
      stroke={
        selectedObjectId === object.id
          ? "#8b3a3a"
          : "#000"
        }
      strokeWidth={1}

      dash={[5,5]}
      draggable

      onClick={() =>
        setSelectedObject(
          object.id
        )
      }

      onDragEnd={(e) =>
        updateObject(
          object.id,
          {
            position: {
              ...object.position,
              x: e.target.x(),
              y: e.target.y(),
            },
            rotation: {
              ...object.rotation,
              z: e.target.rotation() * Math.PI / 180,
            }
          }
        )
      }
    />
  )
}