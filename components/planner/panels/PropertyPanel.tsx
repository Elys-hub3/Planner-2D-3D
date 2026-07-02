'use client'

import {
  usePlannerStore
} from '@/store/planner.store'

export default function PropertiesPanel() {

  const objects =
    usePlannerStore(
      (s) => s.objects
    )

  const selectedObjectId =
    usePlannerStore(
      (s) => s.selectedObjectId
    )

  const updateObject =
    usePlannerStore(
      (s) => s.updateObject
    )
    
  const object =
    Array.isArray(objects)
      ? objects.find(
          (o) =>
            o.id === selectedObjectId
        )
      : null;

  if (!object) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Aucun objet sélectionné
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">

      <h3 className="font-semibold">
        {object.name}
      </h3>

      {/* Position */}

      <div>
        <label>X</label>

        <input
          type="number"
          value={object.position.x}
          onChange={(e) =>
            updateObject(
              object.id,
              {
                position: {
                  ...object.position,
                  x: Number(
                    e.target.value
                  ),
                },
              }
            )
          }
          className="w-full border rounded p-1"
        />
      </div>

      <div>
        <label>Y</label>

        <input
          type="number"
          value={object.position.y}
          onChange={(e) =>
            updateObject(
              object.id,
              {
                position: {
                  ...object.position,
                  y: Number(
                    e.target.value
                  ),
                },
              }
            )
          }
          className="w-full border rounded p-1"
        />
      </div>

      {/* Rotation */}

      <div>
        <label>Rotation (°)</label>

        <input
          type="number"
          value={
            object.rotation?.z
              ? Math.round(
                  object.rotation.z *
                  180 /
                  Math.PI
                )
              : 0
          }
          onChange={(e) =>
            updateObject(
              object.id,
              {
                rotation: {
                  ...object.rotation,
                  z:
                    Number(
                      e.target.value
                    ) *
                    Math.PI /
                    180,
                },
              }
            )
          }
          className="w-full border rounded p-1"
        />
      </div>

      {/* Round Walls */}

      {(object.type ===
        'round-wall' ||
        object.type ===
        'round-wall-poche') && (

        <>
          <div>
            <label>Rayon</label>

            <input
              type="number"
              value={
                object.data?.radius ??
                120
              }
              onChange={(e) =>
                updateObject(
                  object.id,
                  {
                    data: {
                      ...object.data,
                      radius:
                        Number(
                          e.target.value
                        ),
                    },
                  }
                )
              }
              className="w-full border rounded p-1"
            />
          </div>

          <div>
            <label>Épaisseur</label>

            <input
              type="number"
              value={
                object.data?.thickness ??
                20
              }
              onChange={(e) =>
                updateObject(
                  object.id,
                  {
                    data: {
                      ...object.data,
                      thickness:
                        Number(
                          e.target.value
                        ),
                    },
                  }
                )
              }
              className="w-full border rounded p-1"
            />
          </div>

          <div>
            <label>
              Angle d'arc
            </label>

            <input
              type="range"
              min={5}
              max={360}
              value={
                object.data?.angle ??
                90
              }
              onChange={(e) =>
                updateObject(
                  object.id,
                  {
                    data: {
                      ...object.data,
                      angle:
                        Number(
                          e.target.value
                        ),
                    },
                  }
                )
              }
              className="w-full"
            />
          </div>

          <div className="text-xs text-gray-500">
            {
              object.data?.angle ??
              90
            }°
          </div>
        </>
      )}

    </div>
  )
}