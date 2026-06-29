'use client'

import {
  Line
} from 'react-konva'

export default function StairObject({
  object,
}: any) {

  const steps =
    Array.from({
      length: 8,
    })

  return (
    <>
      {steps.map(
        (_, index) => (
          <Line
            key={index}
            points={[
              object.position.x,

              object.position.y +
                index * 15,

              object.position.x +
                80,

              object.position.y +
                index * 15,
            ]}
            stroke="#555"
          />
        )
      )}
    </>
  )
}
