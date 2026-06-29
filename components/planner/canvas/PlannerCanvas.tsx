'use client'

//import CanvasRenderer from './CanvasRenderer'

//import WallRenderer from '@/features/walls/wallsRenderer'
//import DoorRenderer from '@/features/doors/doorRenderer'
//import WindowRenderer from '@/features/windows/windowsRenderer'
//import StairRenderer from '@/features/stairs/stairsRenderer'
//import FurnitureRenderer from '@/features/furniture/furnitureRenderer'

//import CanvasGrid from './CanvasGrid'
import Canvas2D from './Canvas2D'
import Canvas3D from './Canvas3D'
//import { useEffect } from "react";
//mport { initSceneSync } from "@/utils/syncScene";

interface PlannerCanvasProps {
  viewMode: '2D' | '3D'
}

export default function PlannerCanvas({
  viewMode,
}: PlannerCanvasProps) {

  {/*useEffect(() => {
    initSceneSync();
  }, []);*/}
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 2D Mode */}
      {viewMode === '2D' && (
        <div className="relative w-full h-full">
          {/* Grid */}
          {/*<CanvasGrid /> */}
          <Canvas2D />

          {/* Features Renderers 
          <WallRenderer />

          <DoorRenderer />

          <WindowRenderer />

          <StairRenderer />*/}

          {/*<FurnitureRenderer /> */}
        </div>
      )}

      {/* 3D Mode */}
      {viewMode === '3D' && (
        <div className="w-full h-full">
          {/*<CanvasRenderer />*/}
          <Canvas3D />
        </div>
      )}
    </div>
  )
}
