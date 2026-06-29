'use client'

import { useDoorStore } from './doors.store'

export default function DoorRenderer() {
  const { doors } = useDoorStore()

  return (
    <>
      {doors.map((door) => (
        <div
          key={door.id}
          className="absolute bg-orange-500 rounded-full"
          style={{
            left: door.x,
            top: door.y,
            width: door.width,
            height: 10,
          }}
        />
      ))}
    </>
  )
}