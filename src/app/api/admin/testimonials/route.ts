import { db, fail } from "../../_lib/db";
import { requireAdmin } from "../../_lib/auth";
export async function GET(request: Request) { const auth = await requireAdmin(request); if (auth.error) return auth.error; return Response.json(await db.testimonial.findMany({ orderBy: { id: "asc" } })); }
export async function POST(request: Request) { const auth = await requireAdmin(request); if (auth.error) return auth.error; const body = await request.json(); return Response.json(await db.testimonial.create({ data: { id: body.id || `testimonial-${Date.now()}`, quote: body.quote, author: body.author, role: body.role || "Guest", rating: Number(body.rating || 5), source: body.source || "Verified Guest", date: body.date || new Date().toLocaleDateString() } }), { status: 201 }); }
