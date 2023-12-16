import { getFieldObjects, postFieldObjects } from "@masters";
export function GET() {
  return Response.json(getFieldObjects());
}

export async function POST(request: Request) {
  const { fieldKey, fieldObjectMap } = await request.json();
  postFieldObjects(fieldKey, fieldObjectMap);
  return new Response("ok", {
    status: 201,
  });
}
