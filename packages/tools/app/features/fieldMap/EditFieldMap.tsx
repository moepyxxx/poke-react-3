"use client";

import React, { FC } from "react";
import {
  FieldBase,
  FieldObject,
  FieldObjectMap,
  FieldOrnamentType,
  ShortFieldPosition,
} from "@types";
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
} from "@dnd-kit/core";
import { startsWith } from "lodash-es";
import { FIELD_ALL_TILE_COUNT } from "@constants";
import NextLink from "next/link";
import { link } from "@/app/create_field_map/page";

function createFieldObjectMapKey(): ShortFieldPosition[][] {
  const keys: ShortFieldPosition[][] = [];
  for (let i = 1; i <= FIELD_ALL_TILE_COUNT; i++) {
    const childKeys: ShortFieldPosition[] = [];
    for (let j = 1; j <= FIELD_ALL_TILE_COUNT; j++) {
      childKeys.push(`${i}-${j}` as ShortFieldPosition);
    }
    keys.push(childKeys);
  }
  return keys;
}

type Props = {
  initialFieldObjectMap: FieldObjectMap;
  field: string;
};
export const EditFieldMap: FC<Props> = ({ initialFieldObjectMap, field }) => {
  const fields: FieldBase[] = ["black", "grass-load", "grass"];
  const ornamentObjects: FieldOrnamentType[] = ["tree", "grass"];
  const mapKeys: ShortFieldPosition[][] = createFieldObjectMapKey();

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
        const currentObjects = fieldObjectMap[over.id as ShortFieldPosition];

        if (startsWith(value, "base_")) {
          const baseValue = value.replace("base_", "");
          console.log({
            ...fieldObjectMap,
            [over.id]: {
              ...currentObjects,
              base: baseValue,
            },
          });
          setFieldObjectMap({
            ...fieldObjectMap,
            [over.id]: {
              ...currentObjects,
              base: baseValue,
            },
          });
          return;
        }
        if (startsWith(value, "objectOrnament_")) {
          const ornamentValue = value.replace("objectOrnament_", "");
          setFieldObjectMap({
            ...fieldObjectMap,
            [over.id]: {
              ...currentObjects,
              objects: [
                {
                  type: "ornament",
                  ornamentType: ornamentValue,
                },
              ],
            },
          });
          return;
        }
      }}>
      <>
        <div>
          <div className="flex gap-4 items-start">
            <div className="flex">
              {mapKeys.map((childMapKeys, index) => (
                <div key={`m_${index}`}>
                  {childMapKeys.map((mapKey, index) => (
                    <Droppable
                      key={`m_child_${index}`}
                      id={mapKey}
                      fieldParts={fieldObjectMap[mapKey]}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2">parts</p>
              <div className="border-2 border-black">
                <p className="ml-3 mt-2">Base</p>
                <div className="flex">
                  {fields.map((field, index) => (
                    <Draggable
                      id={field}
                      key={`draggable_${index}`}
                      dataKey="base">
                      {field}
                    </Draggable>
                  ))}
                </div>
                <p className="ml-3 mt-2">Object Ornament</p>
                <div className="flex">
                  {ornamentObjects.map((object, index) => (
                    <Draggable
                      id={object}
                      key={`draggable_${index}`}
                      dataKey="objectOrnament">
                      {object}
                    </Draggable>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="bg-neutral-400 p-3 text-white rounded">
            Map編集完了!
          </button>
        </div>
        <div className="mt-4">
          <NextLink className={link()} href={`/create_field_map/${field}`}>
            詳細へ
          </NextLink>
          <br />
          <NextLink className={link()} href={`/create_field_map`}>
            一覧へ
          </NextLink>
        </div>
      </>
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
    id: `${dataKey}_${id}`,
    data: {
      key: `${dataKey}_${id}`,
    },
  });

  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  const dataPath = dataKey === "base" ? "base" : "ornament";
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transformStyle,
        height: "fit-content",
      }}
      className="w-10 h-10 m-3 cursor-pointer bg-neutral-200">
      <picture>
        <img
          width={36}
          height={36}
          src={require(`@masters/images/${dataPath}/${children}.svg`).default}
          alt="base"
        />
      </picture>
    </div>
  );
};

type DroppableProps = {
  id: string;
  fieldParts: {
    base: FieldBase;
    objects?: FieldObject[];
  };
};
export const Droppable: FC<DroppableProps> = ({ id, fieldParts }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-10 relative h-10 m-1 cursor-pointer text-xs ${
        isOver ? "opacity-25" : ""
      }`}>
      <picture>
        <img
          className="absolute top-0 left-0"
          width={36}
          height={36}
          src={require(`@masters/images/base/${fieldParts.base}.svg`).default}
          alt="base"
        />
      </picture>
      {fieldParts.objects?.map((object, index) => {
        switch (object.type) {
          case "ornament":
            return (
              <picture key={`object_${index}`}>
                <img
                  className="absolute top-0 left-0"
                  width={36}
                  height={36}
                  src={
                    require(`@masters/images/ornament/${object.ornamentType}.svg`)
                      .default
                  }
                  alt="ornament"
                />
              </picture>
            );
        }
        return <></>;
      })}
    </div>
  );
};
