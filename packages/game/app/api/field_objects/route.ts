import { getFieldObjectsByFieldName } from "@masters";

export function GET(request: Request) {
  const params = new URLSearchParams(request.url.split("?")[1]);
  const fieldParam = params.get("field");
  if (!fieldParam) {
    return new Response("No field parameter provided", { status: 400 });
  }

  return Response.json(getFieldObjectsByFieldName(fieldParam));
}
