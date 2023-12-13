import { getFieldObjects } from "@masters";

export function GET() {
  return Response.json(getFieldObjects());
}
