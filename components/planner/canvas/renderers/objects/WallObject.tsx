'use client'

import {
  Line,
  Circle
} from 'react-konva'

import { usePlannerStore } from '@/store/planner.store'

export default function WallObject({
  object,
}: any) {

  const selectedObjectId =
    usePlannerStore(
      (s) =>
        s.selectedObjectId
    )

  const setSelectedObject =
    usePlannerStore(
      (s) =>
        s.setSelectedObject
    )
    
  const updateObject = usePlannerStore((s) => s.updateObject)

  const selected =
    selectedObjectId ===
    object.id

  const startX =
    object.data?.startX ?? 100

  const startY =
    object.data?.startY ?? 100

  const endX =
    object.data?.endX ?? 300

  const endY =
    object.data?.endY ?? 100

  return (
    <>
      <Line
        points={[
          startX,
          startY,
          endX,
          endY,
        ]}
        stroke={
          selected
            ? '#f97316'
            : '#000'
        }
        strokeWidth={2}
        onClick={() =>
          setSelectedObject(
            object.id
          )
        }
      />

      {selected && (
        <>
          <Circle
            x={startX}
            y={startY}
            radius={3}
            fill="#f97316"
            draggable
            onDragMove={(e) => {

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,
          
                    startX:
                      e.target.x(),
          
                    startY:
                      e.target.y(),
                  },
                }
              );
            }}
            onDragEnd={(e) => {

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,
            
                    startX:
                      e.target.x(),
            
                    startY:
                      e.target.y(),
                  },
                }
              );
            }}
          />

          <Circle
            x={endX}
            y={endY}
            radius={3}
            fill="#f97316"
            draggable
            onDragMove={(e) => {

              updateObject(
                object.id,
                {
                  data: {
                    ...object.data,
          
                    endX:
                      e.target.x(),
          
                    endY:
                      e.target.y(),
                  },
                }
              );
            }}
          />
        </>
      )}
    </>
  )
}
