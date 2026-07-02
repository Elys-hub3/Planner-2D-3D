'use client'

import {
  X,
} from 'lucide-react'

import {
  useUIStore,
} from '@/store/ui.store'


//import PropertyPanel from '../panels/PropertyPanel'
//import MaterialPanel from '../panels/MaterialPanel'
import GuidesSection from "./sections/GuidesSection";
import LayersSection from "./sections/LayersSection";
import GroupsSection from "./sections/GroupsSection";
import PropertyPanel from '../panels/PropertyPanel';

export default function PlannerRightPanel() {
  const {
    rightPanelOpen,
    setRightPanelOpen,
  } = useUIStore()
  return (
    <>
    {/* DESKTOP */}
    <aside className="hidden lg:flex flex-col w-[250px] shrink-0 h-full overflow-hidden">
      
      {/*<div className="flex-1 overflow-y-auto p-4 space-y-4">
        <PropertyPanel />

        <MaterialPanel />
        <PropertyPanel />
      </div> */}
      {/*<div className="flex flex-col gap-2 p-2">
        <GuidesSection />
        <LayersSection />
        <GroupsSection />
      </div>*/}
       <div className="flex-1 overflow-y-auto p-2">
	  <div className="flex flex-col gap-2">
	     <GuidesSection />
             <LayersSection />
             <GroupsSection />
             <PropertyPanel />
	  </div>
       </div>

    </aside>
    {/* MOBILE MODAL */}

    {rightPanelOpen && (
        <div
          className="
          lg:hidden
          fixed
          inset-0
          bg-black/30
          z-[110]
          flex
          items-center
          justify-center
          p-4
        "
        >
          <div
            className="
            bg-white
            rounded-[32px]
            shadow-2xl
            w-70
            max-w-70
            min-h-50
            max-h-[80vh]
            overflow-hidden
          "
          >
            {/* HEADER */}

            <div
              className="
              bg-orange-500
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
            "
            >
              <h2
                className="
                text-lg
                font-medium
                tracking-wide
              "
              >
                PROPRIÉTÉS
              </h2>

              <button
                onClick={() =>
                  setRightPanelOpen(
                    false
                  )
                }
              >
                <X size={15} />
              </button>
            </div>

            {/* CONTENT */}

            <div
              className="
              p-4
              overflow-y-auto
              max-h-[30vh]
              min-h-[15vh]
            "
            >
              <div className="flex flex-col gap-2">
                <GuidesSection />
                <LayersSection />
                <GroupsSection />
                <PropertyPanel />
              </div>
            </div>
          </div>
        </div>
      )}
    </>  
  )
}
