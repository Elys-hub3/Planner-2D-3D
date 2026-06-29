'use client'

import {
    ZoomIn
  } from 'lucide-react'

  import { useCameraStore }  from '@/store/camera.store'

export default function ZoomControlPlus() {
  const camera =
    useCameraStore(
      (s) => s.camera
    )

  const zoomIn = () => {

    if (!camera) return

    camera.position.multiplyScalar(
      0.9
    )
  }
  return (
    <button onClick={zoomIn} className="bg-white shadow-lg rounded-2xl w-12 h-12 flex items-center justify-center">
      <ZoomIn />
    </button>
  )
}
