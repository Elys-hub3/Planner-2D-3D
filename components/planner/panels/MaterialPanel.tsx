'use client'

const materials = [
  'Bois',
  'Béton',
  'Verre',
  'Métal',
]

export default function MaterialPanel() {
  return (
    <div className="bg-zinc-50 border rounded-2xl p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">
        Matériaux
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {materials.map((material) => (
          <button
            key={material}
            className="bg-white border rounded-xl py-3 text-sm hover:bg-zinc-100"
          >
            {material}
          </button>
        ))}
      </div>
    </div>
  )
}
