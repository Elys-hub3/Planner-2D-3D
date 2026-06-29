'use client'

const objects = [
  'Mur',
  'Porte',
  'Fenêtre',
  'Escalier',
]

export default function ObjectPanel() {
  return (
    <div className="bg-zinc-50 border rounded-2xl p-4">
      <h3 className="font-semibold mb-4">
        Objets
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {objects.map((object) => (
          <button
            key={object}
            className="bg-white border rounded-xl py-3 text-sm hover:bg-zinc-100"
          >
            {object}
          </button>
        ))}
      </div>
    </div>
  )
}