import { db } from "../../../_lib/db";
import { requireAdmin } from "../../../_lib/auth";
export async function PUT(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; return Response.json(await db.testimonial.update({ where: { id: params.id }, data: await request.json() })); }
export async function DELETE(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; await db.testimonial.delete({ where: { id: params.id } }); return Response.json({ ok: true }); }
