import { FieldObjectMap } from "@types";

// see: https://github.com/clauderic/dnd-kit/issues/926#issuecomment-1509761002
// see: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
import dynamic from "next/dynamic";
const EditFieldMap = dynamic(
  () => import("../../../features/fieldMap/EditFieldMap"),
  {
    ssr: false,
  }
);

export default async function CreateFieldMapEdit({
  params,
}: {
  params: { field: string };
}) {
  const fieldObjectMaps: Record<string, FieldObjectMap> = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/field_objects`, {
      next: {
        tags: ["field_objects"],
      },
    })
  ).json();

  const fieldObjectMap = fieldObjectMaps[params.field];

  return (
    <>
      <h1 className="mb-4">フィールド編集（{params.field}）</h1>
      <EditFieldMap
        fieldKey={params.field}
        initialFieldObjectMap={fieldObjectMap}
      />
    </>
  );
}
