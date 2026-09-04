import { db } from "../_lib/db";
export async function GET() { return Response.json(await db.testimonial.findMany({ orderBy: { id: "asc" } })); }
