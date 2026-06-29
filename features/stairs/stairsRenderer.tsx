'use client'

import { useStairStore } from './stairs.store'

export default function StairRenderer() {
  const { stairs } =
    useStairStore()

  return (
    <>
      {stairs.map((stair) => (
        <div
          key={stair.id}
          className="absolute border border-zinc-700"
          style={{
            left: stair.x,
            top: stair.y,
            width: 60,
            height: 60,
          }}
        />
      ))}
    </>
  )
}