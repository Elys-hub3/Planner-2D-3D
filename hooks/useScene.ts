'use client'

import { useSceneStore } from '@/store/scene.store'

export function useScene() {
  return useSceneStore()
}