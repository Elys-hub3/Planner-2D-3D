'use client'

import { useFurnitureStore } from './furniture.store'

export default function FurnitureRenderer() {
  const { furnitures } =
    useFurnitureStore()

  return (
    <>
      {furnitures.map(
        (furniture) => (
          <div
            key={furniture.id}
            className="absolute bg-amber-700 rounded-lg"
            style={{
              left: furniture.x,
              top: furniture.y,
              width:
                furniture.width,
              height:
                furniture.height,
            }}
          />
        )
      )}
    </>
  )
}