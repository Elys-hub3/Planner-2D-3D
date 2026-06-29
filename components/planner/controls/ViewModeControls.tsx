'use client'

interface Props {
  viewMode: '2D' | '3D'
  setViewMode: (
    mode: '2D' | '3D'
  ) => void
}

export default function ViewModeControls({
  viewMode,
  setViewMode,
}: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-1 flex">
      <button
        onClick={() =>
          setViewMode('2D')
        }
        className={`px-6 py-2 rounded-xl font-semibold ${
          viewMode === '2D'
            ? 'bg-orange-400 text-white'
            : 'bg-white'
        }`}
      >
        2D
      </button>

      <button
        onClick={() =>
          setViewMode('3D')
        }
        className={`px-6 py-2 rounded-xl font-semibold ${
          viewMode === '3D'
            ? 'bg-orange-400 text-white'
            : 'bg-white'
        }`}
      >
        3D
      </button>
    </div>
  )
}
