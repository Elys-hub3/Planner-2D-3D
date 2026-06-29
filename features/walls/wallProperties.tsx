'use client'

export default function WallProperties() {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <h3 className="font-semibold mb-4">
        Propriétés Mur
      </h3>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Épaisseur"
          className="w-full border rounded-xl px-3 py-2"
        />

        <input
          type="number"
          placeholder="Hauteur"
          className="w-full border rounded-xl px-3 py-2"
        />
      </div>
    </div>
  )
}