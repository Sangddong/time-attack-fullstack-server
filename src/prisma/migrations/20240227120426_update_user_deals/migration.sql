/*
  Warnings:

  - Added the required column `userId` to the `Deals` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LikeDeals_userId_dealId_key";

-- AlterTable
ALTER TABLE "Deals" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LikeDeals" ADD CONSTRAINT "LikeDeals_pkey" PRIMARY KEY ("userId", "dealId");

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDeals" ADD CONSTRAINT "LikeDeals_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
