'use client'

export default function LayerPanel() {
  return (
    <div className="bg-zinc-50 border rounded-2xl p-4">
      <h3 className="font-semibold mb-4">
        Couches
      </h3>

      <div className="space-y-2">
        <button className="w-full text-left bg-white border rounded-xl px-3 py-2">
          Default
        </button>

        <button className="w-full text-left bg-white border rounded-xl px-3 py-2">
          Étage 1
        </button>
      </div>
    </div>
  )
}