import {
    usePlannerStore,
  } from '@/store/planner.store'
  
  export class ExportService {
    static exportJSON() {
      const objects =
        usePlannerStore
          .getState()
          .objects
  
      const blob =
        new Blob(
          [
            JSON.stringify(
              objects,
              null,
              2
            ),
          ],
          {
            type: 'application/json',
          }
        )
  
      const url =
        URL.createObjectURL(
          blob
        )
  
      const a =
        document.createElement(
          'a'
        )
  
      a.href = url
  
      a.download =
        'plan.json'
  
      a.click()
    }
  }