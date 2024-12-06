-- CreateTable
CREATE TABLE "Ticket" (
    "row" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "matchid" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("row","col","matchid")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_matchid_fkey" FOREIGN KEY ("matchid") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
