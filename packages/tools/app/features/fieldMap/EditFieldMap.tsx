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

type Props = {
  fieldObjectMap: FieldObjectMap;
};
export const EditFieldMap: FC<Props> = () => {
  const fields = ["black", "load", "grass"];
  const maps: ShortFieldPosition[] = ["1-1", "1-2", "1-3"];

  const [fieldObjectMap, setFieldObjectMap] = React.useState<FieldObjectMap>({
    "1-1": {
      base: "black",
    },
    "1-2": {
      base: "black",
    },
    "1-3": {
      base: "black",
    },
  });

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
      }}>
      <div className="border-black border-2 p-2">
        <div className="flex">
          {maps.map((map, index) => (
            <Droppable key={`droppable_${index}`} id={map}>
              {fieldObjectMap[map].base}
            </Droppable>
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
      className="w-16 h-16 border-black border-2 m-3 p-2 cursor-pointer">
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
      className="w-40 h-40 border-black border-2 m-3 p-2 cursor-pointer">
      {id}
      <br />
      {isOver ? "over" : "not over"}
      <br />
      {children}
    </div>
  );
};
