'use client'

import { Undo2 } from 'lucide-react'
import {
  usePlannerStore
} from '@/store/planner.store'

export default function ReturnControls() {
  const undo =
    usePlannerStore(
      (s) => s.undo
    )
  return (
    <button onClick={undo} className="bg-white shadow-lg rounded-2xl w-12 h-12 flex items-center justify-center">
      <Undo2 />
    </button>
  )
}
