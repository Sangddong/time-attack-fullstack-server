/*
  Warnings:

  - Made the column `views` on table `Deals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deals" ALTER COLUMN "views" SET NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0;
