import { FieldView } from "@/features/adventure/views";

export default async function SampleFieldPage({
  params,
}: {
  params: { field: string };
}) {
  const fieldObjectMaps = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/field_objects?field=${params.field}`
    )
  ).json();

  return <FieldView field={params.field} fieldObjectMap={fieldObjectMaps} />;
}
