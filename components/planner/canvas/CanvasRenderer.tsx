'use client'

import { useEffect, useRef } from 'react'

import * as THREE from 'three'

import { createScene } from '@/lib/three/scene'
import { createCamera } from '@/lib/three/camera'
import { createRenderer } from '@/lib/three/renderer'
import { createControls } from '@/lib/three/controls'
import { createLights } from '@/lib/three/lights'
import { createGrid } from '@/lib/three/grid'
import {
  createAxesHelper,
  createFloor,
} from '@/lib/three/helpers'
import { usePlannerStore } from '@/store/planner.store'

import {
  ObjectFactory,
} from '@/features/ObjectFactory'


export default function CanvasRenderer() {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null
    )

    const objects = usePlannerStore(
      (state) => state.objects
    );

  useEffect(() => {
    if (!containerRef.current)
      return

    // Scene
    const scene = createScene()

    // Camera
    const camera = createCamera(
      window.innerWidth,
      window.innerHeight
    )

    // Renderer
    const renderer =
      createRenderer()

    // Controls
    const controls =
      createControls(
        camera,
        renderer
      )

    // Lights
    createLights(scene)

    // Grid
    const grid = createGrid()

    scene.add(grid)

    // Axes
    scene.add(createAxesHelper())

    // Floor
    scene.add(createFloor())

    // Demo Cube
    const geometry =
      new THREE.BoxGeometry()

    const material =
      new THREE.MeshStandardMaterial(
        {
          color: '#f97316',
        }
      )

    const cube = new THREE.Mesh(
      geometry,
      material
    )

    cube.position.y = 0.5

    cube.castShadow = true

    scene.add(cube)

    // Append renderer
    containerRef.current.appendChild(
      renderer.domElement
    )

    // Resize
    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight

      camera.updateProjectionMatrix()

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      )
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    // Animation
    const animate = () => {
      requestAnimationFrame(
        animate
      )

      controls.update()

      renderer.render(
        scene,
        camera
      )
    }

    animate()

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )

      renderer.dispose()

      if (
        containerRef.current &&
        renderer.domElement
      ) {
        containerRef.current.removeChild(
          renderer.domElement
        )
      }
    }

    scene.clear();

    objects.forEach((object) => {
      const mesh = ObjectFactory.create(
        object.type
      );

      if (!mesh) return;

      mesh.position.set(
        object.position.x,
        object.position.y,
        object.position.z
      );

      scene.add(mesh);
    });

  }, [objects])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  )
}