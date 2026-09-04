import { db } from "../../../_lib/db";
import { requireAdmin } from "../../../_lib/auth";
export async function PUT(request: Request, { params }: { params: { id: string } }) { const auth = await requireAdmin(request); if (auth.error) return auth.error; const { status } = await request.json(); return Response.json(await db.reservation.update({ where: { id: params.id }, data: { status } })); }
