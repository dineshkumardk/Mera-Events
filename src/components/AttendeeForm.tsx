"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Input, Button } from "@/components/ui";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

export default function AttendeeForm({ eventId }: { eventId: string }) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`/api/events/${eventId}/attendees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error);
      }

      return json;
    },

    onSuccess: () => {
      toast.success("Attendee registered");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["attendees", eventId] });
      form.reset();
    },

    onError: (err: any) => {
      toast.error(err.message); // 👈 SHOW REAL ERROR
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="flex gap-2"
    >
      <Input placeholder="Name" {...form.register("name")} />
      <Input placeholder="Email" {...form.register("email")} />
      <Button type="submit">Add</Button>
    </form>
  );
}