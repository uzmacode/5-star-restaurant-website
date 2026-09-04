import { db, fail } from "../_lib/db";
export async function POST(request: Request) { try { const { email } = await request.json(); if (!email) return fail("Email is required"); const subscriber = await db.subscriber.upsert({ where: { email }, update: {}, create: { email } }); return Response.json(subscriber, { status: 201 }); } catch { return fail("Could not subscribe", 500); } }
