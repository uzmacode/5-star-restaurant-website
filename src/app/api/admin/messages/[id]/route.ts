import { db } from "../../../_lib/db";
import { requireAdmin } from "../../../_lib/auth";
export async function PUT(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; const { read } = await request.json(); return Response.json(await db.contactMessage.update({ where: { id: params.id }, data: { read: Boolean(read) } })); }
export async function DELETE(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; await db.contactMessage.delete({ where: { id: params.id } }); return Response.json({ ok: true }); }
