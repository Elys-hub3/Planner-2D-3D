'use client'

import { useState } from 'react'

export function useCamera() {
  const [position, setPosition] =
    useState({
      x: 0,
      y: 10,
      z: 10,
    })

  return {
    position,
    setPosition,
  }
}