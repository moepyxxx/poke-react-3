import { FieldView } from "@/features/adventure/views";

export default async function FieldPage({
  params,
}: {
  params: { field: string };
}) {
  const fieldObjectMaps = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/field_objects?field=${params.field}`
    )
  ).json();
  const fieldTalkMap = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/field_talks?field=${params.field}`
    )
  ).json();

  return (
    <FieldView
      field={params.field}
      fieldObjectMap={fieldObjectMaps}
      fieldTalkMap={fieldTalkMap}
    />
  );
}
