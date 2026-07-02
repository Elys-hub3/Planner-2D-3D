'use client'

import {
  Circle,
  Rect
} from 'react-konva'

import BaseFurnitureObject from './BaseFurnitureObject'
import { usePlannerStore } from '@/store/planner.store'

export default function TableObject({
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
       <Rect
        width={120}
        height={80}
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

        <Circle
        x={10}
        y={10}
        radius={3}
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
        fill="#94a3b8"
        />

        <Circle
        x={110}
        y={10}
        radius={3}
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
        fill="#94a3b8"
        />

        <Circle
        x={10}
        y={70}
        radius={3}
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
        fill="#94a3b8"
        />

        <Circle
        x={110}
        y={70}
        radius={3}
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
        fill="#94a3b8"
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