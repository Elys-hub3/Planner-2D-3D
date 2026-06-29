'use client'

import { Crosshair } from 'lucide-react'

import {
  useCameraStore
} from '@/store/camera.store'

export default function CenterCameraControls() {
  const camera =
    useCameraStore(
      (s) => s.camera
    )

  const controls =
    useCameraStore(
      (s) => s.controls
    )

  const centerCamera = () => {

    if (
      !camera ||
      !controls
    ) {
      return
    }

    camera.position.set(
      500,
      500,
      500
    )

    controls.target.set(
      0,
      0,
      0
    )

    controls.update()
  }
  return (
    <button onClick={centerCamera} className="bg-white shadow-lg rounded-2xl w-12 h-12 flex items-center justify-center">
      <Crosshair />
    </button>
  )
}
