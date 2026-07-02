'use client'

import {
  Rect
} from 'react-konva'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function FurnitureObject({
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

      width={60}
      height={60}

      fill="#94a3b8"
      cornerRadius={8}
      
      stroke={
	  selectedObjectId === object.id
	    ? "#f97316"
	    : "ffa07a"
	}

      strokeWidth={
	  selectedObjectId === object.id
	    ? 2
	    : 0
	}

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
