import { EditFieldMap } from "@/app/features/fieldMap";
import { FieldObjectMap } from "@types";

export default async function CreateFieldMapEdit({
  params,
}: {
  params: { field: string };
}) {
  const fieldObjectMaps: Record<string, FieldObjectMap> = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/field_objects`)
  ).json();

  const fieldObjectMap = fieldObjectMaps[params.field];

  return (
    <>
      <h1 className="mb-4">フィールド編集（{params.field}）</h1>
      <EditFieldMap
        field={params.field}
        initialFieldObjectMap={fieldObjectMap}
      />
    </>
  );
}
