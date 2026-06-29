'use client'

import {
  Rect
} from 'react-konva'

export default function FurnitureObject({
  object,
}: any) {

  return (
    <Rect
      x={object.position.x}
      y={object.position.y}
      width={60}
      height={60}
      fill="#94a3b8"
      cornerRadius={8}
    />
  )
}
