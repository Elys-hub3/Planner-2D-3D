'use client'

import {
  Arc
} from 'react-konva'

export default function DoorObject({
  object,
}: any) {

  return (
    <Arc
      x={object.position.x}
      y={object.position.y}
      innerRadius={0}
      outerRadius={40}
      angle={90}
      fill="#92400e"
    />
  )
}