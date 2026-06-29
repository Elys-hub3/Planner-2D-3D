'use client'

import { usePlannerStore } from '@/store/planner.store'

export function usePlanner() {
  return usePlannerStore()
}