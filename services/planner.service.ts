import {
    usePlannerStore,
  } from '@/store/planner.store'
  
  export class PlannerService {
    static save() {
      const objects =
        usePlannerStore
          .getState()
          .objects
  
      localStorage.setItem(
        'planner',
        JSON.stringify(
          objects
        )
      )
    }
  
    static load() {
      const json =
        localStorage.getItem(
          'planner'
        )
  
      if (!json) return []
  
      return JSON.parse(json)
    }
  }