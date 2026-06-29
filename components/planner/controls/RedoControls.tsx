'use client'

import { Redo2 }
from 'lucide-react'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function RedoControls() {

  const redo =
    usePlannerStore(
      (s) => s.redo
    )

  return (
    <button
      onClick={redo}
      className="
      bg-white
      shadow-lg
      rounded-2xl
      w-12
      h-12
      flex
      items-center
      justify-center
      "
    >
      <Redo2 />
    </button>
  )
}