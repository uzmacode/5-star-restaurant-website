import { db } from "../../_lib/db";
import { requireAdmin } from "../../_lib/auth";
export async function GET(request: Request) { const auth = await requireAdmin(request); if (auth.error) return auth.error; return Response.json(await db.reservation.findMany({ orderBy: { createdAt: "desc" } })); }
