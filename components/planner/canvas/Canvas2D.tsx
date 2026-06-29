'use client'

import {
  Stage,
  Layer,
  Line
} from 'react-konva'

import { snapToGrid } from '@/utils/snap'

import ObjectRenderer from './renderers/ObjectRenderer'

import { useEffect, useState } from 'react'
import { usePlannerState } from '@/store/planner.store'

const GRID_SIZE = 40

export default function Canvas2D() {

  const guides =
    usePlannerState(
      (s) => s.guides
    )
  
  const [scale, setScale] =
    useState({
      width: 0,
      height: 0,
    })

  useEffect(() => {
    const updateSize = () => {
      setScale({
        width:
          window.innerWidth,
        height:
          window.innerHeight,
      })
    }

    updateSize()

    window.addEventListener(
      'resize',
      updateSize
    )

    return () =>
      window.removeEventListener(
        'resize',
        updateSize
      )
  }, [])
  
  if (
    scale.width === 0 ||
    scale.height === 0
  ) {
    return null
  }  


  const lines = []

  for (
    let i = 0;
    i < scale.width;
    i += GRID_SIZE
  ) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i, 0, i, scale.height]}
        stroke="#ddd"
      />
    )
  }

  for (
    let i = 0;
    i < scale.height;
    i += GRID_SIZE
  ) {
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i, scale.width, i]}
        stroke="#ddd"
      />
    )
  }

  return (
    <Stage
      width={scale.width}
      height={scale.height}
      draggable
    >
      <Layer>
        {lines}
        {guides.map((guide) => (
          <Line
            key={guide.id}
            points={
              guide.orientation ===
              'horizontal'
                ? [
                    0,
                    guide.value,
                    scale.width,
                    guide.value,
                  ]
                : [
                    guide.value,
                    0,
                    guide.value,
                    scale.height,
                  ]
            }
            stroke="#f97316"
            dash={[10, 5]}
          />
        ))}
        <ObjectRenderer />
      </Layer>
    </Stage>
  )
}
