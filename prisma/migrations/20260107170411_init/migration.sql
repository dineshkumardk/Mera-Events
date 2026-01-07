-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendee" ("createdAt", "email", "eventId", "id", "name") SELECT "createdAt", "email", "eventId", "id", "name" FROM "Attendee";
DROP TABLE "Attendee";
ALTER TABLE "new_Attendee" RENAME TO "Attendee";
CREATE UNIQUE INDEX "Attendee_email_eventId_key" ON "Attendee"("email", "eventId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
