import Accordion from "@/components/ui/Accordion";
import { Eye, EyeOff, Trash2, Link2, Plus, Edit } from "lucide-react";
import { usePlannerState } from "@/store/planner.store";

export default function GroupsSection() {
  const groups = usePlannerState((s) => s.groups);
  const toggle = usePlannerState((s) => s.toggleGroup);
  const remove = usePlannerState((s) => s.deleteGroup);
  const add = usePlannerState((s) => s.addGroup);
  const edit = usePlannerState((s) => s.editGroup);

  return (
    <Accordion title="Groupes" badge={groups.length}>
       <button
	  onClick={() =>
	    add({
	      id: crypto.randomUUID(),
	      name: `Groupe ${groups.length + 1}`,
	      visible: true,
	      linked: false,
	      elementIds: [],
	    })
	  }
	  className="p-1 rounded bg-orange-500 text-white hover:bg-orange-600"
	>
	  <Plus size={16} />
	</button>
      <div className="flex flex-col gap-2">
        {groups.map((g) => (
          <div
            key={g.id}
            className="flex justify-between p-2 bg-gray-50 rounded hover:bg-orange-50"
          >
            <div>
              <div className="text-sm font-medium">{g.name}</div>
              <div className="text-xs text-gray-500">
                {g.elementIds.length} éléments
              </div>
            </div>

            <div className="flex gap-2">
              {/*<button onClick={() => edit(g.id)}>
                <Edit size={16} />
        </button>*/}
              <button onClick={() => toggle(g.id)}>
                {g.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>

              <button>
                <Link2 size={16} />
              </button>

              <button onClick={() => remove(g.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
