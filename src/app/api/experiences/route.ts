import { db } from "../_lib/db";
export async function GET() { return Response.json(await db.experience.findMany({ orderBy: { year: "asc" } })); }
