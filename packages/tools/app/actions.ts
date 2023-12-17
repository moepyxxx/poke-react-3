"use server";

import { FieldObjectMap } from "../../types/fields";

export async function getFieldObjects() {
  const fieldObjectMaps: Record<string, FieldObjectMap> = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/field_objects`, {
      next: {
        tags: ["field_objects"],
      },
    })
  ).json();
  return fieldObjectMaps;
}
