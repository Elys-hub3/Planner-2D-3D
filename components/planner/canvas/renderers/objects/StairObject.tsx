'use client'

import {
  Circle,
  Group,
  Line
} from 'react-konva'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function StairObject({
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

  const steps =
    Array.from({
      length: 8,
    })

  return (
    <Group
      x={object.position.x}
      y={object.position.y}
      rotation={
        (object.rotation?.z ?? 0) * 180 / Math.PI
      }
      
      stroke={
	      selected
	        ? "#f97316"
	        : "#f9e616"
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
    >
      {steps.map(
        (_, index) => (
          <Line
            key={index}
            points={[
              0,
              index * 15,
              80,
              index * 15,
            ]}
            stroke="#f9e616"
          />
        )
      )}
      {/* Poignée centrale */}
      {selected && (
        <Circle
          x={0}
          y={0}
          radius={3}
          fill="#f97316"
        />
      )}
    </Group>
  )
}
