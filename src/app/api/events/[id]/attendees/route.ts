import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attendees = await prisma.attendee.findMany({
      where: { eventId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(attendees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attendees" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: { attendees: true },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (event.attendees.length >= event.capacity) {
      return NextResponse.json(
        { error: "Event capacity reached" },
        { status: 400 }
      );
    }

    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId: id,
      },
    });

    return NextResponse.json(attendee, { status: 201 });
  } catch (error: any) {
    // ✅ UNIQUE EMAIL HANDLING
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This email is already registered for this event" },
        { status: 409 }
      );
    }

    console.error("Attendee error:", error);

    return NextResponse.json(
      { error: "Failed to register attendee" },
      { status: 500 }
    );
  }
}
