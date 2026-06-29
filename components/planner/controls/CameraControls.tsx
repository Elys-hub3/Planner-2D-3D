'use client'

export default function CameraControls() {
  return (
    <div className="bg-white shadow-lg border rounded-2xl p-2 flex flex-col gap-2">
      <button className="w-10 h-10 rounded-xl hover:bg-zinc-100">
        ↑
      </button>

      <button className="w-10 h-10 rounded-xl hover:bg-zinc-100">
        ↓
      </button>

      <button className="w-10 h-10 rounded-xl hover:bg-zinc-100">
        ←
      </button>

      <button className="w-10 h-10 rounded-xl hover:bg-zinc-100">
        →
      </button>
    </div>
  )
}