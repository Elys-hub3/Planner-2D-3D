'use client';

import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
}

export default function SidebarButton({
  icon: Icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
      w-10
      md:w-14
      h-10
      md:h-14
      rounded-xl
      flex
      items-center
      justify-center
      transition
      ${
        active
          ? 'bg-white text-orange-400'
          : 'text-white hover:bg-orange-400'
      }
    `}
    >
      <Icon size={28} />
    </button>
  );
}
