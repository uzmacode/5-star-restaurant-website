import { db } from "../_lib/db";
export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");
  const items = await db.menuItem.findMany({ where: { available: true, ...(category && category !== "all" ? { category } : {}) }, orderBy: { id: "asc" } });
  return Response.json(items);
}
