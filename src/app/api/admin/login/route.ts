import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { db, fail } from "../../_lib/db";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password || "", admin.password))) return fail("Invalid email or password", 401);
  const token = randomUUID();
  await db.adminSession.create({ data: { token, adminId: admin.id } });
  return Response.json({ token });
}
