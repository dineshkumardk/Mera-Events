"use client";

import { useQuery } from "@tanstack/react-query";
import AttendeeForm from "./AttendeeForm";
import AttendeeList from "./AttendeeList";

export default function EventList() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      return res.json();
    },
  });

  if (!data?.length) return <p>No events created yet.</p>;

  return (
    <div className="space-y-6">
      {data.map((event: any) => (
        <div key={event.id} className="border p-4 rounded">
          <h3 className="font-bold">{event.title}</h3>
          <p>{event.attendees.length}/{event.capacity} seats filled</p>

          <AttendeeForm eventId={event.id} />
          <AttendeeList eventId={event.id} />
        </div>
      ))}
    </div>
  );
}