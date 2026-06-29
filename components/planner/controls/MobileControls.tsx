'use client'

import ViewModeControls from './ViewModeControls'
import ZoomControlPlus from './ZoomControlPlus'
import ZoomControlMoins from './ZoomControlMoins'
import ReturnControls from './ReturnControls'
import CenterCameraControls from './CenterCameraControls'
import RedoControls from './RedoControls'

interface Props {
  viewMode: '2D' | '3D'
  setViewMode: (
    mode: '2D' | '3D'
  ) => void
}

export default function MobileControls({
  viewMode,
  setViewMode,
}: Props) {
  return (
    <div
      className="
      lg:hidden
      fixed
      top-20
      left-16
      bottom-28
      z-50
      flex
      flex-col
      gap-3
    "
    >
      <div className="scale-75 origin-left">
        <ViewModeControls
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      <div className="scale-75 origin-left">
        <ZoomControlPlus />
      </div>
      
      <div className="scale-75 origin-left">
        <ZoomControlMoins />
      </div>

      <div className="scale-75 origin-left">
        <ReturnControls />
      </div>

      <div className="scale-75 origin-left">
        <RedoControls />
      </div>

      <div className="scale-75 origin-left">
        <CenterCameraControls />
      </div>
    </div>
  )
}
