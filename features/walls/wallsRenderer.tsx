'use client'

import { useWallStore } from './walls.store'

export default function WallRenderer() {
  const { walls } = useWallStore()

  return (
    <>
      {walls.map((wall) => (
        <div
          key={wall.id}
          className="absolute bg-zinc-800"
          style={{
            left: wall.startX,
            top: wall.startY,
            width: 120,
            height: wall.thickness,
          }}
        />
      ))}
    </>
  )
}