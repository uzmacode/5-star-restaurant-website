import { db, fail } from "../_lib/db";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !Array.isArray(body.items) || !body.items.length) return fail("Customer and items are required");
    const ids = body.items.map((item: { item?: { id?: string }; id?: string }) => item.item?.id || item.id).filter((id: unknown): id is string => typeof id === "string");
    const menu = await db.menuItem.findMany({ where: { id: { in: ids }, available: true } });
    const lineItems = body.items.map((item: { item?: { id?: string }; id?: string; quantity?: number; qty?: number }) => { const id = item.item?.id || item.id; const found = menu.find((entry) => entry.id === id); const qty = Math.max(1, Number(item.quantity || item.qty || 1)); return found ? { name: found.name, price: found.price, qty } : null; }).filter((item: unknown): item is { name: string; price: number; qty: number } => Boolean(item));
    if (lineItems.length !== body.items.length) return fail("One or more menu items are unavailable");
    const total = Number(lineItems.reduce((sum: number, item: { name: string; price: number; qty: number }) => sum + item.price * item.qty, 0).toFixed(2));
    const order = await db.order.create({ data: { customerName: body.name, email: body.email, total, items: { create: lineItems } }, include: { items: true } });
    return Response.json(order, { status: 201 });
  } catch { return fail("Could not create order", 500); }
}
