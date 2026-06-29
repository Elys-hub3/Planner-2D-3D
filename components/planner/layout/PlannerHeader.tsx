'use client'

import {
  Home,
  FileText,
  Save,
  LogOut
} from 'lucide-react'

interface PlannerHeaderProps {
  onHome?: () => void
  onSave?: () => void
  onExport?: () => void
}

export default function PlannerHeader({
  onHome,
  onSave,
  onExport,
}: PlannerHeaderProps) {
  return (
    <header className="flex h-10 md:h-15 shrink-0 bg-white items-center justify-between px-6 md:px-8">
      {/* Left */}
      <button
        onClick={onHome}
        className="flex md:flex flex-col items-center text-orange-500"
      >
        <Home size={28} />

        <span className="hidden md:block text-xs">
          Home
        </span>
      </button>

      {/* Center */}
      <div className="flex gap-8 md:gap-12">
        <button className="flex flex-col items-center text-orange-500">
          <FileText size={28} />

          <span className="hidden md:block text-xs">
            File
          </span>
        </button>

        <button
          onClick={onSave}
          className="flex flex-col items-center text-orange-500"
        >
          <Save size={28} />

          <span className="hidden md:block text-xs">
            Save
          </span>
        </button>

        <button
          onClick={onExport}
          className="flex flex-col items-center text-orange-500"
        >
          <LogOut size={28} />

          <span className="hidden md:block text-xs">
            Export
          </span>
        </button>
      </div>

      {/* User */}
      <div className="w-6 md:w-10 h-6 md:h-10 shrink-0 rounded-full bg-orange-400 text-white flex items-center justify-center text-xm md:text-2xl">
        E
      </div>
    </header>
  )
}
