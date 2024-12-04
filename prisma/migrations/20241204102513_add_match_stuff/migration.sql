-- CreateTable
CREATE TABLE "LinesMan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LinesMan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "homeTeamid" INTEGER NOT NULL,
    "awayTeamid" INTEGER NOT NULL,
    "stadiumid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "refereeid" INTEGER NOT NULL,
    "linesMan1id" INTEGER NOT NULL,
    "linesMan2id" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamid_fkey" FOREIGN KEY ("homeTeamid") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamid_fkey" FOREIGN KEY ("awayTeamid") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_stadiumid_fkey" FOREIGN KEY ("stadiumid") REFERENCES "Stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_refereeid_fkey" FOREIGN KEY ("refereeid") REFERENCES "Referee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_linesMan1id_fkey" FOREIGN KEY ("linesMan1id") REFERENCES "LinesMan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_linesMan2id_fkey" FOREIGN KEY ("linesMan2id") REFERENCES "LinesMan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
