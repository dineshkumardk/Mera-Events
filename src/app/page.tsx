import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

export default function Home() {
  return (
    <main className="p-6 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Event Management Portal</h1>
      <EventForm />
      <EventList />
    </main>
  );
}