'use client'

import { useWindowStore } from './windows.store'

export default function WindowRenderer() {
  const { windows } =
    useWindowStore()

  return (
    <>
      {windows.map((window) => (
        <div
          key={window.id}
          className="absolute bg-sky-400"
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: 8,
          }}
        />
      ))}
    </>
  )
}