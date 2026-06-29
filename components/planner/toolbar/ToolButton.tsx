'use client'

interface ToolButtonProps {
  label: string
  active?: boolean
}

export default function ToolButton({
  label,
  active,
}: ToolButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm transition ${
        active
          ? 'bg-orange-400 text-white'
          : 'bg-white hover:bg-zinc-100'
      }`}
    >
      {label}
    </button>
  )
}
