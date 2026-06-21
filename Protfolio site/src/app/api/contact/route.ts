import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      message: String(body.message).trim()
    }
  });

  if (process.env.SMTP_HOST && process.env.CONTACT_TO_EMAIL) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        : undefined
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New message from ${submission.name}`,
      replyTo: submission.email,
      text: submission.message
    });
  }

  return NextResponse.json({ ok: true });
}
