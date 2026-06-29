'use client'

import LayerPanel from '../panels/LayerPanel'
import ObjectPanel from '../panels/ObjectPanel'

export default function PlannerSidebar() {
  return (
    <aside className="hidden lg:flex w-72 bg-white border-r flex-col overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold">
          Outils
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <LayerPanel />

        <ObjectPanel />
      </div>
    </aside>
  )
}