import * as THREE from "three";

export interface BaseObject {
    id: string
    name: string
  
    x: number
    y: number
    z?: number
  
    rotation?: number
  
    width?: number
    height?: number
    depth?: number
  }
  
  export interface WallObject extends BaseObject {
    thickness: number
  }
  
  export interface DoorObject extends BaseObject {
    isOpen?: boolean
  }
  
  export interface WindowObject extends BaseObject {
    glassType?: string
  }


  export interface PlannerObject {
    id: string;
    type: string;

    position: {
      x: number;
      y: number;
      z: number;
    };

    rotation: {
      x: number;
      y: number;
      z: number;
    };

    scale: {
      x: number;
      y: number;
      z: number;
    };

    metadata?: Record<string, unknown>;
  }

  export interface FeatureFactory {
    create(data?: Partial<PlannerObject>): THREE.Object3D;

    update(
      object: THREE.Object3D,
      data: Partial<PlannerObject>
    ): void;

    delete(
      scene: THREE.Scene,
      object: THREE.Object3D
    ): void;

    serialize(
      object: THREE.Object3D
    ): PlannerObject;

    deserialize(
      data: PlannerObject
    ): THREE.Object3D;
  }