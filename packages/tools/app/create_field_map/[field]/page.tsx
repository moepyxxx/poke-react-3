import { getFieldObjects } from "@/app/actions";
import { FieldObjectMap } from "@types";

export default async function CreateFieldMapDetail({
  params,
}: {
  params: { field: string };
}) {
  const fieldObjectMaps = await getFieldObjects();

  const fieldObjectMap = fieldObjectMaps[params.field];

  return (
    <>
      <h1 className="mb-4">フィールド詳細（{params.field}）</h1>
      <p>{JSON.stringify(fieldObjectMap)}</p>
    </>
  );
}
