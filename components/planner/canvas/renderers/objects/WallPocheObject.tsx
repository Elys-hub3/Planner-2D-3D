'use client'

import {
  Line,
  Group,
  Circle,
} from 'react-konva'

import {
  usePlannerStore,
} from '@/store/planner.store'

export default function WallPocheObject({
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

  const startX =
    object.data?.startX ?? 100

  const startY =
    object.data?.startY ?? 100

  const endX =
    object.data?.endX ?? 300

  const endY =
    object.data?.endY ?? 100

  const wallWidth =
    object.data?.width ?? 20

  const angle =
    Math.atan2(
      endY - startY,
      endX - startX
    )

  return (
    <>
      <Group
        draggable
        onClick={() =>
          setSelectedObject(
            object.id
          )
        }
        onDragEnd={(e) => {

          const dx = e.target.x()
          const dy = e.target.y()

          updateObject(
            object.id,
            {
              data: {
                ...object.data,

                startX:
                  startX + dx,

                startY:
                  startY + dy,

                endX:
                  endX + dx,

                endY:
                  endY + dy,
              },

              rotation: {
                ...object.rotation,
                z: angle,
              },
            }
          )

          e.target.position({
            x: 0,
            y: 0,
          })
        }}
      >
        {/* contour */}

        <Line
          points={[
            startX,
            startY,
            endX + wallWidth,
            endY,
          ]}
          stroke={
            selected
              ? '#f97316'
              : '#169af9'
          }
          strokeWidth={4}
        />

        {/* vide intérieur */}

        <Line
          points={[
            startX,
            startY,
            endX + wallWidth,
            endY,
          ]}
          stroke="#ffffff"
          strokeWidth={2}
        />
      </Group>

      {selected && (
        <>
          {/* poignée début */}

          <Circle
            x={startX}
            y={startY}
            radius={5}
            fill="#f97316"
            draggable
            onDragMove={(e) => {

              const newStartX =
                e.target.x()

              const newStartY =
                e.target.y()

              const newAngle =
                Math.atan2(
                  endY - newStartY,
                  endX - newStartX
                )

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,

                    startX:
                      newStartX,

                    startY:
                      newStartY,
                  },

                  rotation: {
                    ...object.rotation,
                    z: newAngle,
                  },
                }
              )
            }}
          />

          {/* poignée fin */}

          <Circle
            x={endX}
            y={endY}
            radius={5}
            fill="#f97316"
            draggable
            onDragMove={(e) => {

              const newEndX =
                e.target.x()

              const newEndY =
                e.target.y()

              const newAngle =
                Math.atan2(
                  newEndY - startY,
                  newEndX - startX
                )

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,

                    endX:
                      newEndX,

                    endY:
                      newEndY,
                  },

                  rotation: {
                    ...object.rotation,
                    z: newAngle,
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
