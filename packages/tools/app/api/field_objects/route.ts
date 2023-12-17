import { getFieldObjects, postFieldObjects } from "@masters";
import { revalidateTag } from "next/cache";

export function GET() {
  console.log("GET");
  return Response.json(getFieldObjects());
}

export async function POST(request: Request) {
  const { fieldKey, fieldObjectMap } = await request.json();
  postFieldObjects(fieldKey, fieldObjectMap);
  // console.log("revalidateTag");
  revalidateTag("field_objects");
  return new Response("ok", {
    status: 201,
  });
}
