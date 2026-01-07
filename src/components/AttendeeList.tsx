"use client";

import { useQuery } from "@tanstack/react-query";

export default function AttendeeList({ eventId }: { eventId: string }) {
  const { data } = useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}/attendees`);
      return res.json();
    },
  });

  if (!data?.length) return <p>No attendees yet.</p>;

  return (
    <ul className="list-disc pl-4">
      {data.map((a: any) => (
        <li key={a.id}>{a.name} — {a.email}</li>
      ))}
    </ul>
  );
}