-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'Amreux1';

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
