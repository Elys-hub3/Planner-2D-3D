'use client'

import {
  useEffect,
  useRef
} from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
    createFloor,
  } from '@/lib/three/helpers'
  import { usePlannerStore } from '@/store/planner.store'
  
  import {
    ObjectFactory,
  } from '@/features/ObjectFactory'
import { create } from 'zustand'
  

export default function Canvas3D() {
  const containerRef =
    useRef<HTMLDivElement>(null)

  const objects = usePlannerStore(
    (state) => state.objects
    );

  useEffect(() => {
    const scene =
      new THREE.Scene()

    scene.background =
      new THREE.Color(
        '#f8f8f8'
      )

    const camera =
      new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
          window.innerHeight,
        1,
        5000
      )

    camera.position.set(
      500,
      500,
      500
    )

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true
      })

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

    containerRef.current?.appendChild(
      renderer.domElement
    )

    /*
      GRID 3D
    */

    const grid =
      new THREE.GridHelper(
        4000,
        100,
        0x888888,
        0xcccccc
      )

    scene.add(grid)

    /*
      AXES
    */

    const axes =
      new THREE.AxesHelper(
        500
      )

    scene.add(axes)

    /*
      LIGHTS
    */

    const ambient =
      new THREE.AmbientLight(
        0xffffff,
        2
      )

    scene.add(ambient)

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
    
    /*
      Animation
    */
    const animate = () => {
      requestAnimationFrame(
        animate
      )

      renderer.render(
        scene,
        camera
      )
    }

    animate()

    const controls =
        new OrbitControls(
            camera,
            renderer.domElement
        )

    controls.enableDamping = true

    controls.enablePan = true

    controls.enableZoom = true

    ;(objects ?? []).forEach((object) => {
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

  }, [objects])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  )
}