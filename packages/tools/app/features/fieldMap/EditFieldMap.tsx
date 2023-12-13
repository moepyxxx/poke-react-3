"use client";

import React, { FC } from "react";
import { FieldObjectMap } from "@types";
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
} from "@dnd-kit/core";

type Props = {
  fieldObjectMap: FieldObjectMap;
};
export const EditFieldMap: FC<Props> = ({ FieldObjectMap }) => {
  //   const ids = ["hoge", "fuga", "piyo"];

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        console.log(event);
      }}
      onDragEnd={(event) => {
        const { over } = event;
        console.log(over);
        if (over == null) {
          return;
        }
        console.log(over.id);
      }}>
      <div className="border-black border-2">
        <Droppable id="sample" />
        <div>
          <Draggable id="hoge">hoge</Draggable>
        </div>
      </div>
    </DndContext>
  );
};

type DraggableProps = {
  children: React.ReactNode;
  id: string;
};
const Draggable: React.FC<DraggableProps> = ({ children, id }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: id,
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
  //   children: React.ReactNode;
  id: string;
};
export const Droppable: FC<DroppableProps> = ({ id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="w-40 h-40 border-black border-2 m-3 p-2 cursor-pointer">
      {isOver ? "over" : "not over"}
    </div>
  );
};
