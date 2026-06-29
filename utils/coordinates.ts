  import * as THREE from 'three';

  export function screenToWorld(
    x: number,
    y: number,
    zoom: number,
    camera: THREE.Camera
  ) {
    const mouse =
      new THREE.Vector2();
  
    mouse.x =
      (x /
        window.innerWidth) *
        2 -
      1;
  
    mouse.y =
      -(y /
        window.innerHeight) *
        2 +
      1;
  
    const raycaster =
      new THREE.Raycaster();
  
    raycaster.setFromCamera(
      mouse,
      camera
    );
  
    const plane =
      new THREE.Plane(
        new THREE.Vector3(
          0,
          1,
          0
        ),
        0
      );
  
    const point =
      new THREE.Vector3();
  
    raycaster.ray.intersectPlane(
      plane,
      point
    );

    return {
      point,
      x: x / zoom,
      y: y / zoom,
    }
  }