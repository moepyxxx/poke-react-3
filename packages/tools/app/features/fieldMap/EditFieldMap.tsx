"use client";

import React, { FC } from "react";
import { FieldObjectMap, ShortFieldPosition } from "@types";
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
} from "@dnd-kit/core";

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
        console.log(over);
        if (over == null || active.data.current == null) {
          return;
        }
        console.log(
          active.data.current.field,
          "is over [ droppable field data ]"
        );
        console.log(over.id, "is over [ graggable id ]");
        setFieldObjectMap({
          ...fieldObjectMap,
          [over.id]: {
            base: active.data.current.field,
          },
        });
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
            <BaseDraggable id={field} key={`draggable_${index}`}>
              {field}
            </BaseDraggable>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

type BaseDraggableProps = {
  children: React.ReactNode;
  id: string;
};
const BaseDraggable: React.FC<BaseDraggableProps> = ({ children, id }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: id,
    data: {
      field: id,
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
