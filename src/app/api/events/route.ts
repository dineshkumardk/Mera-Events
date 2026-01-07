import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: { attendees: true },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      typeof body?.title !== "string" ||
      typeof body?.description !== "string" ||
      typeof body?.date !== "string" ||
      body?.capacity === undefined
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: body.title.trim(),
        description: body.description.trim(),
        date: new Date(body.date),
        capacity: Number(body.capacity),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}