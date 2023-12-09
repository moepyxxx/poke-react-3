"use client";

import { FieldView } from "@/features/adventure/views";

export default function SampleFieldPage({
  params,
}: {
  params: { field: string };
}) {
  return <FieldView field={params.field} />;
}
