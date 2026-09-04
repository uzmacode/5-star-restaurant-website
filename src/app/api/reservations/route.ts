import { db, fail } from "../_lib/db";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.phone || !body.date || !body.time || !Number(body.guests)) return fail("Please complete all required fields");
    const reservation = await db.reservation.create({ data: { name: body.name, email: body.email, phone: body.phone, date: body.date, time: body.time, guests: Number(body.guests), seatingArea: body.seatingArea || "Main Dining Salon", specialRequests: body.specialRequests || null, dietaryRequirements: body.dietaryRequirements || [], occasion: body.occasion || null } });
    return Response.json(reservation, { status: 201 });
  } catch { return fail("Could not create reservation", 500); }
}
