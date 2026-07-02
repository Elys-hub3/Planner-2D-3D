'use client'

import { Group } from 'react-konva'
import { usePlannerStore } from '@/store/planner.store'

export default function BaseFurnitureObject({
  object,
  children,
}: any) {

  const updateObject =
    usePlannerStore(
      (s) => s.updateObject
    )

  const setSelectedObject =
    usePlannerStore(
      (s) => s.setSelectedObject
    )

  return (
    <Group
      x={object.position.x}
      y={object.position.y}
      rotation={
        object.rotation?.z
          ? object.rotation.z *
            180 /
            Math.PI
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
          }
        )
      }
    >
      {children}
    </Group>
  )
}