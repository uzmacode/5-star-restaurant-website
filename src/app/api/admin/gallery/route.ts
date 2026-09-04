import { db } from "../../_lib/db";
import { requireAdmin } from "../../_lib/auth";
export async function GET(request: Request) { const auth = await requireAdmin(request); if (auth.error) return auth.error; return Response.json(await db.galleryImage.findMany({ orderBy: { id: "asc" } })); }
export async function POST(request: Request) { const auth = await requireAdmin(request); if (auth.error) return auth.error; const body = await request.json(); return Response.json(await db.galleryImage.create({ data: { id: body.id || `gallery-${Date.now()}`, url: body.url || body.image, title: body.title || "Garden Table", category: body.category || "Food", aspect: body.aspect || "aspect-[4/3]", caption: body.caption || "" } }), { status: 201 }); }
