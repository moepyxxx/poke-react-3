"use client";

import React, { FC, useState } from "react";
import {
  FieldBase,
  FieldObjectMap,
  FieldOrnamentType,
  ShortFieldPosition,
} from "@types";
import { DndContext, pointerWithin } from "@dnd-kit/core";

import { startsWith } from "lodash-es";
import { FIELD_ALL_TILE_COUNT } from "@constants";
import NextLink from "next/link";
import { link } from "@/app/create_field_map/page";
import { useRouter } from "next/navigation";
import { FieldMapDraggable } from "./FieldMapDraggable";
import { FieldMapDroppable } from "./FieldMapDroppable";

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
  fieldKey: string;
};
export const EditFieldMap: FC<Props> = ({
  initialFieldObjectMap,
  fieldKey,
}) => {
  const router = useRouter();
  const fields: FieldBase[] = ["black", "grass-load", "grass"];
  const ornamentObjects: FieldOrnamentType[] = ["tree", "grass"];
  const mapKeys: ShortFieldPosition[][] = createFieldObjectMapKey();

  const [fieldObjectMap, setFieldObjectMap] = useState<FieldObjectMap>(
    initialFieldObjectMap
  );
  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);

  const onEdit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/field_objects`, {
      method: "POST",
      body: JSON.stringify({
        fieldKey,
        fieldObjectMap,
      }),
    });
    router.push(`/create_field_map`);
  };

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        console.log(event);
      }}
      onDragEnd={(event) => {
        const { over, active } = event;
        if (over == null || active.data.current == null) {
          return;
        }

        const value = active.data.current.key;
        const currentObjects = fieldObjectMap[over.id as ShortFieldPosition];

        if (startsWith(value, "base_")) {
          const baseValue = value.replace("base_", "");
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
              {mapKeys.map((childMapKeys, childIndex) => (
                <div key={`m_${childIndex}`}>
                  {childMapKeys.map((mapKey, index) => (
                    <FieldMapDroppable
                      key={`m_child_${childIndex}_${index}`}
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
                    <FieldMapDraggable
                      id={field}
                      key={`draggable_${index}`}
                      dataKey="base">
                      {field}
                    </FieldMapDraggable>
                  ))}
                </div>
                <p className="ml-3 mt-2">Object Ornament</p>
                <div className="flex">
                  {ornamentObjects.map((object, index) => (
                    <FieldMapDraggable
                      id={object}
                      key={`draggable_${index}`}
                      dataKey="objectOrnament">
                      {object}
                    </FieldMapDraggable>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {confirmEdit ? (
            <>
              <p>本当に良い？</p>
              <button
                className="bg-neutral-400 p-2 text-white rounded m-1"
                onClick={() => {
                  setConfirmEdit(false);
                }}>
                Cancel
              </button>
              <button
                className="bg-neutral-400 p-2 text-white rounded m-1"
                onClick={() => {
                  onEdit();
                  setConfirmEdit(false);
                }}>
                OK
              </button>
            </>
          ) : (
            <button
              className="bg-neutral-400 p-3 text-white rounded"
              onClick={() => setConfirmEdit(true)}>
              Map編集完了!
            </button>
          )}
        </div>
        <div className="mt-4">
          <NextLink className={link()} href={`/create_field_map/${fieldKey}`}>
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

export default EditFieldMap;
