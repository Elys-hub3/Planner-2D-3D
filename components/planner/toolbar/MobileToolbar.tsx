'use client'

import { FileText } from 'lucide-react'

import { useUIStore }
from '@/store/ui.store'

export default function MobileToolbar() {
  const {
    setRightPanelOpen,
  } = useUIStore()

  return (
    <div
      className="
      lg:hidden
      fixed
      bottom-8
      left-1/2
      -translate-x-1/2
      z-[100]
    "
    >
      <button
        onClick={() =>
          setRightPanelOpen(true)
        }
        className="
          flex
          items-center
          gap-3
          px-3
          py-2
          rounded-full
          bg-orange-400
          text-white
          shadow-xl
          font-medium
          text-md
        "
      >
        <FileText size={20} />

        Propriétés
      </button>
    </div>
  )
}
