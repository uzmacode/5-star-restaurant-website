import { db, fail } from "../../../_lib/db";
import { requireAdmin } from "../../../_lib/auth";
export async function PUT(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; const body = await request.json(); return Response.json(await db.menuItem.update({ where: { id: params.id }, data: { ...body, price: body.price === undefined ? undefined : Number(body.price), dietary: body.dietary } })); }
export async function DELETE(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; await db.menuItem.delete({ where: { id: params.id } }); return Response.json({ ok: true }); }
