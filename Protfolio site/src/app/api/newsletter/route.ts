import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  await prisma.subscriber.upsert({
    where: { email },
    update: {},
    create: { email }
  });

  return NextResponse.json({ ok: true });
}
