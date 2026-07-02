'use client'

import { Line } from 'react-konva'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function WindowObject({
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

  const selected =
    selectedObjectId === object.id

  return (
    <Line
      points={[
        0,
        0,
        80,
        0,
      ]}

      x={object.position.x}
      y={object.position.y}
      rotation={
        (object.rotation?.z ?? 0) * 180 / Math.PI
      }

      stroke={
	      selected
	        ? "#f97316"
	        : "#9af916"
	}
      strokeWidth={2}

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
