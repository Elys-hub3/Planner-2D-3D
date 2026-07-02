'use client'

import {
  Circle,
  Ellipse,
  Rect
} from 'react-konva'

import BaseFurnitureObject from './BaseFurnitureObject'
import { usePlannerStore } from '@/store/planner.store'

export default function ToiletObject({
  object,
}: any) {

  const selectedObjectId =
    usePlannerStore(
      (s) => s.selectedObjectId
    )

  const selected =
    selectedObjectId === object.id

  return (
    <BaseFurnitureObject
      object={object}
    >
      <Ellipse
        x={20}
        y={20}
        radiusX={20}
        radiusY={25}
        stroke={
          selected
            ? '#f97316'
            : '#94a3b8'
        }
        strokeWidth={
          selected
            ? 3
            : 1
        }
    />

    <Rect
        x={5}
        y={40}
        width={30}
        height={20}
        stroke={
          selected
            ? '#f97316'
            : '#94a3b8'
        }
        strokeWidth={
          selected
            ? 3
            : 1
        }
    />

    {/* Poignée centrale */}
    {selected && (
          <Circle
            x={0}
            y={0}
            radius={3}
            fill="#f97316"
          />
        )}
    </BaseFurnitureObject>
  )
}