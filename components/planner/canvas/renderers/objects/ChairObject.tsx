'use client'

import {
  Circle,
  Line,
  Group
} from 'react-konva'

import BaseFurnitureObject from './BaseFurnitureObject'
import { usePlannerStore } from '@/store/planner.store'

export default function ChairObject({
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
        {/* Assise */}
        <Circle
          radius={20}
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
          fill={
            selected
              ? '#fed7aa'
              : undefined
          }
        />

        {/* Dossier */}
        <Line
          points={[
            -15, -15,
             15, -15
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
