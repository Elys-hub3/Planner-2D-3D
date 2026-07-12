'use client'

import {
  useEffect,
  useRef
} from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  TransformControls,
} from 'three/examples/jsm/controls/TransformControls.js'

import {
    createFloor,
  } from '@/lib/three/helpers'
  import { usePlannerStore } from '@/store/planner.store'
  
  import {
    ObjectFactory,
  } from '@/features/ObjectFactory'
import { create } from 'zustand'
import { useCameraStore } from "@/store/camera.store";
  

export default function Canvas3D() {
    const sceneRef =
      useRef<THREE.Scene | null>(null)

    const cameraRef =
      useRef<THREE.PerspectiveCamera | null>(null)

    const rendererRef =
      useRef<THREE.WebGLRenderer | null>(null)

    const containerRef =
      useRef<HTMLDivElement>(null)

    const controlsRef =
      useRef<OrbitControls | null>(
        null
      )
    const raycaster =
      new THREE.Raycaster()
    
    const mouse =
      new THREE.Vector2()
  
    const transformRef =
      useRef<TransformControls | null>(
        null
      )

    const objects = usePlannerStore(
    (state) => state.objects
    );

    const selectedObjectId =
    usePlannerStore(
      (state) =>
        state.selectedObjectId
    )

  const updateObject =
    usePlannerStore(
      (state) => state.updateObject
    )

    const createScene = () => {
        const {
          setCamera,
          setControls,
        } = useCameraStore.getState();

        const scene = new THREE.Scene();
      
        scene.background =
          new THREE.Color("#f8f8f8");
      
        const camera =
          new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
              window.innerHeight,
            1,
            5000
          );
      
        camera.position.set(
          500,
          500,
          500
        );
      
        const renderer =
          new THREE.WebGLRenderer({
            antialias: true,
          });
      
        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

        renderer.shadowMap.enabled = true
      
        containerRef.current?.appendChild(
          renderer.domElement
        );

        /*
        * GRID
        */
      
        scene.add(
          new THREE.GridHelper(
            4000,
            100,
            0x888888,
            0xcccccc
          )
        );

        /*
        * AXES
        */
      
        scene.add(
          new THREE.AxesHelper(
            500
          )
        );

        /*
        * LIGHTS
        */
      
        scene.add(
          new THREE.AmbientLight(
            0xffffff,
            2
          )
        );

        const directional =
          new THREE.DirectionalLight(
            0xffffff,
            2
          )

        directional.position.set(
          500,
          500,
          500
        )

        scene.add(directional)

        /*
        * FLOOR
        */
      
        scene.add(createFloor());

        /*
        * ORBIT
        */
      
        const controls = new OrbitControls(camera, renderer.domElement);
      
        controls.enableDamping = true;
        controls.enablePan = true
        controls.enableZoom = true
        
        /*
        * TRANSFORM
        */

        const transform =
          new TransformControls(
            camera,
            renderer.domElement
          )

        transform.setMode(
          "translate"
        )
        
        transform.setTranslationSnap(
          10
        )
        
        transform.setRotationSnap(
          THREE.MathUtils.degToRad(
            15
          )
        )
        
        transform.setScaleSnap(
          0.1
        )

        scene.add(transform.getHelper())

        transform.addEventListener(
          'dragging-changed',
          (event) => {
            controls.enabled =
              !event.value
          }
        )

        transform.addEventListener(
          'objectChange',
          () => {
            const mesh =
              transform.object

            if (!mesh) return

            const id =
              mesh.userData.id

            if (!id) return

            usePlannerStore
              .getState()
              .updateObject(
                id,
                {
                  position: {
                    x: mesh.position.x,
                    y: mesh.position.y,
                    z: mesh.position.z,
                  },
        
                  rotation: {
                    x: mesh.rotation.x,
                    y: mesh.rotation.y,
                    z: mesh.rotation.z,
                  },
        
                  scale: {
                    x: mesh.scale.x,
                    y: mesh.scale.y,
                    z: mesh.scale.z,
                  },
                }
              )
          }
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

        //click sur le mesh

        const handleClick = (
          event: MouseEvent
        ) => {
        
          const renderer =
            rendererRef.current
        
          const camera =
            cameraRef.current
        
          const scene =
            sceneRef.current
        
          if (
            !renderer ||
            !camera ||
            !scene
          ) return
        
          mouse.x =
            (event.clientX /
              renderer.domElement
                .clientWidth) *
              2 -
            1
        
          mouse.y =
            -(event.clientY /
              renderer.domElement
                .clientHeight) *
              2 +
            1
        
          raycaster.setFromCamera(
            mouse,
            camera
          )
        
          const intersects =
            raycaster.intersectObjects(
              scene.children,
              true
            )
        
          if (
            intersects.length > 0
          ) {
        
            const mesh =
              intersects[0]
                .object
        
            const id =
              mesh.userData.id
        
            if (id) {
              usePlannerStore
                .getState()
                .setSelectedObject(
                  id
                )
            }
          }
        }
        renderer.domElement.addEventListener(
          "click",
          handleClick
        )

        /*
        * SAVE REFS
        */
        setCamera(camera);

        setControls(controls);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        controlsRef.current = controls;

        transformRef.current = transform

        /*
        * ANIMATION
        */
      
        const animate = () => {
      
          requestAnimationFrame(
            animate
          );
      
          controls.update();
      
          renderer.render(
            scene,
            camera
          );
        };
      
        animate();
        // RETURN CLEANUP
        return () => {

          window.removeEventListener(
            "resize",
            handleResize
          );

          renderer.domElement.removeEventListener(
            "click",
            handleClick
          )

          renderer.dispose();

          if (
            containerRef.current &&
            renderer.domElement.parentNode
          ) {
            containerRef.current.removeChild(
              renderer.domElement
            );
          }
        };
      };

    /*
    * SYNC OBJECTS
    */

    const syncObjects = () => {

        const scene =
            sceneRef.current;
        
        if (!scene) return;

        /*
        * Remove old planner meshes
        */
        
        scene.children
            .filter(
            (child) =>
                child.userData?.planner
            )
            .forEach((child) =>
            scene.remove(child)
            );
        
        /*
        * Recreate objects
        */
        (objects ?? []).forEach(async (object) => {
        
            const mesh =
              ObjectFactory.create(
                object.type,
                object
              );
        
            if (!mesh) {
            console.warn(
                "Factory introuvable :",
                object.type
            );
            return;
            }
        
            mesh.userData = {
                planner: true,
                id: object.id,
              }

            mesh.name =
              object.id
        
            mesh.position.set(
              object.position.x,
              object.position.y,
              object.position.z
            );

            if (object.rotation) {

              mesh.rotation.set(
                object.rotation.x,
                object.rotation.y,
                object.rotation.z
              )
            }

            if (object.scale) {

              mesh.scale.set(
                object.scale.x,
                object.scale.y,
                object.scale.z
              )
            }
        
            scene.add(mesh);
            /*
            * Selected object
            */

            if (
              object.id ===
              selectedObjectId
            ) {
              mesh.traverse(
                (child: any) => {
            
                  if (
                    child.material
                  ) {
                    child.material =
                      child.material.clone()
            
                    child.material.color.set(
                      "#f97316"
                    )
                  }
                }
              )
              transformRef.current?.attach(
                mesh
              )
            }
        });
    };

    useEffect(() => {

      const cleanup =
        createScene();
    
      return () => {
        cleanup?.();
      };
      
    }, []);

    useEffect(() => {

        syncObjects();
    
    }, [objects, selectedObjectId,]);

    useEffect(() => {

      const scene =
        sceneRef.current
    
      const transform =
        transformRef.current
    
      if (
        !scene ||
        !transform
      )
        return
    
      if (!selectedObjectId) {
    
        transform.detach()
    
        return
      }
    
      const mesh =
        scene.getObjectByName(
          selectedObjectId
        )
    
      if (mesh) {
    
        transform.attach(mesh)
    
      } else {
    
        transform.detach()
      }
    
    }, [selectedObjectId])

    useEffect(() => {

      const handleKeyDown =
        (
          event: KeyboardEvent
        ) => {
    
          const transform =
            transformRef.current
    
          if (!transform)
            return
    
          switch (
            event.key
          ) {
    
            case "t":
    
              transform.setMode(
                "translate"
              )
    
              break
    
            case "r":
    
              transform.setMode(
                "rotate"
              )
    
              break
    
            case "s":
    
              transform.setMode(
                "scale"
              )
    
              break
          }
        }
    
      window.addEventListener(
        "keydown",
        handleKeyDown
      )
    
      return () =>
        window.removeEventListener(
          "keydown",
          handleKeyDown
        )
    
    }, [])

    return (
        <div
          ref={containerRef}
          className="w-full h-full"
        />
    )

}
