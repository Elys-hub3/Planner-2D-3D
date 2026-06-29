'use client';

import Image from 'next/image';
import { OBJECTS } from '@/constants/objects';
import { usePlannerStore } from '@/store/planner.store';

interface Props {
  onSelect?: () => void
}

export default function ObjectLibraryPanel({
  onSelect,
}: Props) {

  const addObject =
    usePlannerStore(
      (state) => state.addObject
    );
  
  const activeLayerId =
    usePlannerStore(
      (state) => state.activeLayerId
    );
    
  
  return (
    <div
      className="
      absolute
      left-24
      top-15
      md:top-6
      z-50
      w-[220px]
      md:w-[320px]
      h-[300px]
      md:h-[500px]
      bg-white
      rounded-2xl
      shadow-xl
      overflow-y-auto
    "
    >
      <div className="p-5">
        <h2 className="font-bold text-lg mb-6">
          Éléments de construction
        </h2>

        {Object.entries(OBJECTS).map(
          ([category, items]) => (
            <div
              key={category}
              className="mb-8"
            >
              <h3 className="font-semibold mb-1 md:mb-2 capitalize">
                {category}
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {items.map((item) => (
                  
                  <button
                    key={item.id}
                    onClick={() => {
                      addObject({
                        id:crypto.randomUUID(),
                  
                        type: item.id,

                        name: item.name,

                        layerId: activeLayerId ?? "default",

                        visible:true,

                        locked: false,
                  
                        position: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                  
                        rotation: {
                          x:0,
                          y:0,
                          z:0,
                        },
                        
                        scale: {
                          x:1,
                          y:1,
                          z:1,
                        },

                        data:{}
                      });
                      onSelect?.()
                    }}
                    className="
                      border
                      rounded-xl
                      p-2
                      hover:border-orange-400
                    "
                  >
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.name}
                    />

                    <p className="text-xs mt-2">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
