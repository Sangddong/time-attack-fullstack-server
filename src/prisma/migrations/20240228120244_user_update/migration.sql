/*
  Warnings:

  - The primary key for the `LikeDeals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeDeals" DROP CONSTRAINT "LikeDeals_userId_fkey";

-- AlterTable
ALTER TABLE "Deals" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LikeDeals" DROP CONSTRAINT "LikeDeals_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LikeDeals_pkey" PRIMARY KEY ("userId", "dealId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDeals" ADD CONSTRAINT "LikeDeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
