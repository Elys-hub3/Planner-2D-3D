'use client'

export default function PropertyPanel() {
  return (
    <div className="bg-zinc-50 border rounded-2xl p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">
        Dimensions
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-zinc-500 block mb-1">
            Largeur
          </label>

          <input
            type="number"
            className="w-full border rounded-xl px-3 py-2"
            placeholder="120"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-500 block mb-1">
            Hauteur
          </label>

          <input
            type="number"
            className="w-full border rounded-xl px-3 py-2"
            placeholder="240"
          />
        </div>
      </div>
    </div>
  )
}
