🗓️ Event & Attendee Management Portal

A full-stack event management dashboard built with Next.js, Prisma, TanStack Query, React Hook Form, Zod, and Shadcn/UI.
The application allows users to create events, manage attendees, and enforce capacity constraints with real-time UI updates.

🚀 Features
✅ Event Management

Create events with:

Title

Description

Date

Capacity

View all events in descending order (latest first)

See real-time seat availability (X / Y seats filled)

✅ Attendee Management

Register attendees for a specific event

Prevent duplicate registrations (same email per event)

Enforce event capacity limits

View attendees per event in a relational layout

✅ Robust Validation

Client-side validation using React Hook Form + Zod

Server-side validation in API routes

Meaningful error messages for invalid inputs

✅ UX & Performance

Server-state caching with TanStack Query

Optimistic UI updates

Graceful empty states & loading indicators

Toast notifications for success & error feedback

🛠️ Tech Stack
Layer	Technology
Framework	Next.js (App Router)
UI	Shadcn/UI
Forms	React Hook Form
Validation	Zod
State Management	TanStack Query
Database	SQLite
ORM	Prisma
Notifications	Sonner
📂 Project Structure
src/
├─ app/
│  ├─ api/
│  │  ├─ events/
│  │  │  ├─ route.ts
│  │  │  └─ [id]/attendees/route.ts
│  ├─ page.tsx
│  └─ layout.tsx
│
├─ components/
│  ├─ EventForm.tsx
│  ├─ EventList.tsx
│  ├─ AttendeeForm.tsx
│  ├─ AttendeeList.tsx
│  └─ ui/
│     ├─ button.tsx
│     ├─ input.tsx
│     ├─ textarea.tsx
│     ├─ card.tsx
│     └─ index.ts
│
├─ lib/
│  ├─ prisma.ts
│  └─ validators.ts
│
└─ prisma/
   ├─ schema.prisma
   └─ migrations/

🧬 Database Schema (Prisma)
model Event {
  id          String     @id @default(cuid())
  title       String
  description String
  date        DateTime
  capacity    Int
  createdAt   DateTime   @default(now())
  attendees   Attendee[]
}

model Attendee {
  id        String   @id @default(cuid())
  name      String
  email     String
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  createdAt DateTime @default(now())

  @@unique([email, eventId])
}

⚙️ Setup Instructions
1️⃣ Install Dependencies
npm install

2️⃣ Setup Environment Variables

Create .env file:

DATABASE_URL="file:./dev.db"

3️⃣ Run Prisma Migrations
npx prisma migrate dev
npx prisma generate

4️⃣ Start Development Server
npm run dev


Open: http://localhost:3000

Deployment link: https://mera-events-five.vercel.app/

🧪 API Endpoints
Events

GET /api/events – Fetch all events

POST /api/events – Create a new event

Attendees

GET /api/events/:id/attendees – Fetch attendees for an event

POST /api/events/:id/attendees – Register attendee

🧠 Design Decisions

Server validation mirrors client validation to prevent malformed requests

Capacity logic enforced at API level to avoid race conditions

Unique constraint on (email, eventId) to prevent duplicates

TanStack Query ensures data consistency without prop drilling

🌟 Possible Enhancements

Edit / delete events

Delete attendees

Authentication & role-based access

Pagination for large event lists

Email notifications

📌 Author
Dineshkumar D
Frontend / Full-Stack Developer