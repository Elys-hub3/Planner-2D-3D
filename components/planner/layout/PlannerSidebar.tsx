'use client';

import {
  Plus,
  Camera,
  Settings,
  LogOut,
} from 'lucide-react';

import SidebarButton from '../toolbar/SidebarButton';

interface Props {
  onAdd: () => void;
  onCapture: () => void;
  onSettings: () => void;
  onLogout: () => void;

  addOpen: boolean;
}

export default function PlannerSidebar({
  onAdd,
  onCapture,
  onSettings,
  onLogout,
  addOpen,
}: Props) {
  return (
    <aside
      className="
      flex
      w-10
      md:w-15
      bg-orange-400
      flex-col
      justify-between
      py-3
      md:py-6
    "
    >
      <div className="flex flex-col gap-5">
        <SidebarButton
          icon={Plus}
          active={addOpen}
          onClick={onAdd}
        />

        <SidebarButton
          icon={Camera}
          onClick={onCapture}
        />
      </div>

      <div className="flex flex-col gap-5">
        <SidebarButton
          icon={Settings}
          onClick={onSettings}
        />

        <SidebarButton
          icon={LogOut}
          onClick={onLogout}
        />
      </div>
    </aside>
  );
}
