"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { eventSchema } from "@/lib/validators";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

type EventFormData = z.infer<typeof eventSchema>;

/**
 * ✅ DEFAULT EXPORT
 */
export default function EventForm() {
  const queryClient = useQueryClient();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        date: data.date,
        capacity: Number(data.capacity),
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create event");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Event created");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      form.reset();
    },

    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
          className="space-y-4"
        >
          <Input placeholder="Title" {...form.register("title")} />
          <Textarea placeholder="Description" {...form.register("description")} />
          <Input type="date" {...form.register("date")} />
          <Input
            type="number"
            placeholder="Capacity"
            {...form.register("capacity")}
          />
          <Button type="submit">Create Event</Button>
        </form>
      </CardContent>
    </Card>
  );
}