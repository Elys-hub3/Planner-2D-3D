'use client'

import {
  Arc,
  Circle
} from 'react-konva'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function RoundWallObject({
  object,
}: any) {

  const updateObject =
    usePlannerStore(
      (s) => s.updateObject
    )

  const selectedObjectId =
    usePlannerStore(
      (s) => s.selectedObjectId
    )

  const setSelectedObject =
    usePlannerStore(
      (s) => s.setSelectedObject
    )

  const selected =
    selectedObjectId === object.id

  const radius =
    object.data?.radius ?? 120

  const thickness =
    object.data?.thickness ?? 20

  const angle =
    object.data?.angle ?? 90

  return (
    <>
      <Arc
        x={object.position.x}
        y={object.position.y}
        innerRadius={
          radius -
          thickness
        }
        outerRadius={radius}
        angle={angle}
        rotation={
          object.rotation?.z
            ? object.rotation.z *
              180 /
              Math.PI
            : 0
        }
        fill="#555"
        draggable
        onClick={() =>
          setSelectedObject(
            object.id
          )
        }
      />

      {selected && (
        <>
          {/* poignée rayon */}

          <Circle
            x={
              object.position.x +
              radius
            }
            y={
              object.position.y
            }
            radius={5}
            fill="#f97316"
            draggable
            onDragMove={(e) => {

              const newRadius =
                Math.max(
                  20,
                  e.target.x() -
                  object.position.x
                )

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,
                    radius:
                      newRadius,
                  },
                }
              )
            }}
          />

          {/* poignée angle */}

          <Circle
            x={
              object.position.x +
              radius *
              Math.cos(
                angle *
                Math.PI /
                180
              )
            }
            y={
              object.position.y +
              radius *
              Math.sin(
                angle *
                Math.PI /
                180
              )
            }
            radius={5}
            fill="#22c55e"
            draggable
            onDragMove={(e) => {

              const dx =
                e.target.x() -
                object.position.x

              const dy =
                e.target.y() -
                object.position.y

              const newAngle =
                Math.atan2(
                  dy,
                  dx
                ) *
                180 /
                Math.PI

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,
                    angle:
                      Math.max(
                        5,
                        newAngle
                      ),
                  },
                }
              )
            }}
          />
        </>
      )}
    </>
  )
}
