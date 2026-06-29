'use client'

import ToolButton from './ToolButton'

const tools = [
  'Sélection',
  'Mur',
  'Porte',
  'Fenêtre',
  'Escalier',
  'Meuble',
]

export default function MainToolbar() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 hidden lg:flex">
      <div className="bg-white border shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
        {tools.map((tool, index) => (
          <ToolButton
            key={tool}
            label={tool}
            active={index === 0}
          />
        ))}
      </div>
    </div>
  )
}