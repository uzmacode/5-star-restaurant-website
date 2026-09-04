import { db, fail } from "./db";

export async function requireAdmin(request: Request) {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return { error: fail("Authentication required", 401) };
  const session = await db.adminSession.findUnique({ where: { token } });
  if (!session) return { error: fail("Invalid session", 401) };
  return { adminId: session.adminId };
}
