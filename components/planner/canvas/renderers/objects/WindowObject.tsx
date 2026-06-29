'use client'

import { Line } from 'react-konva'

export default function WindowObject({
  object,
}: any) {

  return (
    <Line
      points={[
        object.position.x,
        object.position.y,

        object.position.x + 80,
        object.position.y,
      ]}
      stroke="#3b82f6"
      strokeWidth={2}
    />
  )
}
