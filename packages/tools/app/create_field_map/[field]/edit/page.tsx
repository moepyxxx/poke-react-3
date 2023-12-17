import { getFieldObjects } from "@/app/actions";
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
  // TODO: 一度保存以降にrevalidateTagのキャッシュが効かない。edit→topの時にはrevalidateが効いてるのに…
  const fieldObjectMaps = await getFieldObjects();

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
