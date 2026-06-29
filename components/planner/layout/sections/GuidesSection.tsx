import Accordion from "@/components/ui/Accordion";
import { Plus, Ruler } from "lucide-react";
import { useState } from "react";
import { usePlannerState } from "@/store/planner.store";
import { v4 as uuid } from "uuid";

export default function GuidesSection() {
  const addGuide = usePlannerState((s) => s.addGuide);

  const [value, setValue] = useState(0);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  return (
    <Accordion title="Guides">
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />

        <select
          className="border rounded px-2 py-1"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as any)}
        >
          <option value="horizontal">H</option>
          <option value="vertical">V</option>
        </select>

        <button
          onClick={() =>
            addGuide({
              id: uuid(),
              value,
              orientation,
            })
          }
          className="bg-orange-500 text-white p-1 rounded"
        >
          <Plus size={16} />
        </button>
      </div>
    </Accordion>
  );
}
