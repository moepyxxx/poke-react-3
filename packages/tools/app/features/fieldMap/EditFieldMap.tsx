"use client";

import React, { FC } from "react";
import { FieldObjectMap, ShortFieldPosition } from "@types";
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
} from "@dnd-kit/core";
import { startsWith } from "lodash-es";
import { FIELD_ALL_TILE_COUNT } from "@constants";

function createFieldObjectMapKey(): ShortFieldPosition[][] {
  const keys: ShortFieldPosition[][] = [];
  for (let i = 1; i <= FIELD_ALL_TILE_COUNT; i++) {
    const childKeys: ShortFieldPosition[] = [];
    for (let j = 1; j <= FIELD_ALL_TILE_COUNT; j++) {
      childKeys.push(`${j}-${i}` as ShortFieldPosition);
    }
    keys.push(childKeys);
  }
  return keys;
}

type Props = {
  initialFieldObjectMap: FieldObjectMap;
};
export const EditFieldMap: FC<Props> = ({ initialFieldObjectMap }) => {
  const fields = ["black", "load", "grass"];
  const ornamentObjects = ["tree", "fence"];
  const mapKeys: ShortFieldPosition[][] = createFieldObjectMapKey();
  console.log(mapKeys);

  const [fieldObjectMap, setFieldObjectMap] = React.useState<FieldObjectMap>(
    initialFieldObjectMap
  );

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        console.log(event);
      }}
      onDragEnd={(event) => {
        const { over, active } = event;
        console.log(event);
        if (over == null || active.data.current == null) {
          return;
        }
        console.log(active);
        console.log(over.id, "is over [ graggable id ]");

        const value = active.data.current.key;
        if (startsWith(value, "base_")) {
          const baseValue = value.replace("base_", "");
          setFieldObjectMap({
            ...fieldObjectMap,
            [over.id]: {
              base: baseValue,
            },
          });
          return;
        }
        if (startsWith(value, "objectOrnament_")) {
          const baseValue = value.replace("objectOrnament_", "");
          setFieldObjectMap({
            ...fieldObjectMap,
            [over.id]: {
              base: baseValue,
            },
          });
          return;
        }
      }}>
      <div className="border-black border-2 p-2">
        <div className="flex">
          {mapKeys.map((childMapKeys, index) => (
            <div key={`m_${index}`}>
              {childMapKeys.map((mapKey, index) => (
                <Droppable key={`m_child_${index}`} id={mapKey}>
                  {fieldObjectMap[mapKey].base}
                </Droppable>
              ))}
            </div>
          ))}
        </div>
        <p className="ml-3 mt-2">Base</p>
        <div className="flex">
          {fields.map((field, index) => (
            <Draggable id={field} key={`draggable_${index}`} dataKey="base">
              {field}
            </Draggable>
          ))}
        </div>
        <p className="ml-3 mt-2">Object Ornament</p>
        <div className="flex">
          {ornamentObjects.map((field, index) => (
            <Draggable
              id={field}
              key={`draggable_${index}`}
              dataKey="objectOrnament">
              {field}
            </Draggable>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

type DraggableProps = {
  children: React.ReactNode;
  id: string;
  dataKey: string;
};
const Draggable: React.FC<DraggableProps> = ({ children, id, dataKey }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id,
    data: {
      key: `${dataKey}_${id}`,
    },
  });

  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transformStyle,
        height: "fit-content",
      }}
      className="w-16 h-16 border-black border-2 m-3 p-2 cursor-pointer bg-neutral-200">
      {children}
    </div>
  );
};

type DroppableProps = {
  children: React.ReactNode;
  id: string;
};
export const Droppable: FC<DroppableProps> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-10 h-10 border-black border-2 m-1 cursor-pointer text-xs ${
        isOver ? "bg-slate-400	" : ""
      }`}>
      {children}
    </div>
  );
};
