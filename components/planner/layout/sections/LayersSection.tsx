import Accordion from "@/components/ui/Accordion";
import { Eye, EyeOff, Trash2, GripVertical, Plus, Edit, Search } from "lucide-react";
import { usePlannerState, usePlannerStore } from "@/store/planner.store";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function LayerItem({ layer, toggle, remove, add, edit, objects, activeLayerId, setActiveLayer, removeObject }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: layer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() =>
        setActiveLayer(layer.id)
      }
      className={`
      flex items-center 
      justify-between 
      p-2 
      rounded 
      cursor-pointer
      ${
        activeLayerId === layer.id
          ? "bg-orange-100 border border-orange-400"
          : "bg-gray-50 hover:bg-orange-50"
      }
      `}
    >
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4 cursor-grab" />
        </div>

        <div>
          <div className="text-sm font-medium">{layer.name}</div>
          <div className="text-xs text-gray-500">
            Alt: {layer.altitude}
          </div>
          <div className="flex gap-2">
            <button onClick={() => edit(layer.id)}>
              <Edit size={16} />
            </button>
          
            <button onClick={() => toggle(layer.id)}>
              {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <button onClick={() => remove(layer.id)}>
              <Trash2 size={16} />
            </button>
          </div>
          {Array.isArray(objects) &&
            objects
              .filter(
                  (obj) =>
                    obj.layerId === layer.id
                )
              .map((obj) => (
                <div
                  key={obj.id}
                  className="
                    flex
                    items-center
                    justify-between
                    mt-1
                    px-2
                    py-1
                    rounded
                    bg-white
                    border
                  "
                >
                    <span
                        className="
                        ml-3
                        text-xs
                        text-gray-600
                        "
                      >
                      • {obj.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        removeObject(
                          obj.id
                        );
                      }}
                    >
                      <Trash2
                        size={12}
                        className="
                        text-red-500
                        "
                      />
                    </button>
                </div>
              ))
            }
        </div>

        <span className="text-xs bg-orange-400 text-white px-2 rounded-full">
          {Array.isArray(objects) &&
            objects.filter(
              (obj) =>
                obj.layerId === layer.id
            ).length
          }
        </span>
      </div>
    </div>
  );
}

export default function LayersSection() {
  const layers = usePlannerState((s) => s.layers);
  const toggle = usePlannerState((s) => s.toggleLayer);
  const remove = usePlannerState((s) => s.deleteLayer);
  const edit = usePlannerState((s) => s.editLayer);
  const add = usePlannerState((s) => s.addLayer);
  const [search, setSearch] = useState("");
  const objects = usePlannerStore((state) => state.objects);
  const activeLayerId = usePlannerStore((s) => s.activeLayerId);
  const setActiveLayer = usePlannerStore((s) => s.setActiveLayer);
  const removeObject = usePlannerStore((s) => s.removeObject);

  const filteredLayers = layers.filter((l) =>
       l.name.toLowerCase().includes(search.toLowerCase())
  );

    function highlightLayer(id: string) {
        throw new Error("Function not implemented.");
    }

    function clearHighlight() {
        throw new Error("Function not implemented.");
    }

  return (
    <Accordion title="Couches" badge={layers.length}>
      <div className="flex items-center gap-2 mb-2">
	  <div className="relative flex-1">
	    <Search
	      size={14}
	      className="
		absolute
		left-2
		top-1/2
		-translate-y-1/2
		text-gray-400
	      "
	    />

	    <input
	      type="text"
	      placeholder="Rechercher un élément"
	      value={search}
	      onChange={(e) => setSearch(e.target.value)}
	      className="
		w-full
		pl-8
		pr-2
		py-1.5
		text-sm
		border
		rounded-md
		focus:outline-none
		focus:ring-1
		focus:ring-orange-400
	      "
	    />
	  </div>

	  <button
	    onClick={() =>
	      add({
		id: crypto.randomUUID(),
		name: `Couche ${layers.length + 1}`,
		altitude: 0,
		visible: true,
		elementIds: [],
	      })
	    }
	    className="
	      p-2
	      rounded-md
	      bg-orange-500
	      text-white
	      hover:bg-orange-600
	    "
	  >
	    <Plus size={16} />
	  </button>
	</div>
      <div className="flex flex-col gap-2">
        {filteredLayers.map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            toggle={toggle}
            remove={remove}
            edit={edit}
            objects={objects}
            activeLayerId={activeLayerId}
            setActiveLayer={setActiveLayer}
            removeObject={removeObject}
            onMouseEnter={() => highlightLayer(layer.id)}
            onMouseLeave={() => clearHighlight()}
          />
        ))}
      </div>
    </Accordion>
  );
}
