"use client";

import { FieldView } from "@/app/features/adventure/views";

export default function SampleFieldPage({
  params,
}: {
  params: { field: string };
}) {
  return <FieldView field={params.field} />;
}
