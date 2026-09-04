import { db } from "../_lib/db";
export async function GET() { return Response.json((await db.galleryImage.findMany({ orderBy: { id: "asc" } })).map(({ url, ...item }) => ({ ...item, image: url }))); }
