'use client'

import {
  Rect,
  Line,
  Circle
} from 'react-konva'

import BaseFurnitureObject from './BaseFurnitureObject'
import { usePlannerStore } from '@/store/planner.store'

export default function BedDoubleObject({
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
        width={180}
        height={200}
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

      <Line
        points={[
          0,50,
          180,50
        ]}
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
        x={20}
        y={10}
        width={60}
        height={30}
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
        x={100}
        y={10}
        width={60}
        height={30}
        stroke={
          selected
            ? '#f97316'
            : '#94a3b8'
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