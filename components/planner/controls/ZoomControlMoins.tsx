'use client'

import {
    ZoomOut
  } from 'lucide-react'
import { useCameraStore }  from '@/store/camera.store'
  

export default function ZoomControlMoins() {
  const camera =
    useCameraStore(
      (s) => s.camera
    )

  const zoomOut = () => {

    if (!camera) return

    camera.position.multiplyScalar(
      1.1
    )
  }
  return (
    <button onClick={zoomOut} className="bg-white shadow-lg rounded-2xl w-12 h-12 flex items-center justify-center">
      <ZoomOut />
    </button>
  )
}
      
