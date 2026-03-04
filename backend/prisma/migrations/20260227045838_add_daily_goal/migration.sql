/*
  Warnings:

  - Added the required column `dailyAmount` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "dailyAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lastSaveDate" TIMESTAMP(3),
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;
